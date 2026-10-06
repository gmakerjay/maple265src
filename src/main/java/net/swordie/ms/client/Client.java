package net.swordie.ms.client;

import net.swordie.ms.Server;
import net.swordie.ms.ServerConfig;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.TradeRoom;
import net.swordie.ms.client.social.Alliance.Alliance;
import net.swordie.ms.client.social.Alliance.AllianceResult;
import net.swordie.ms.client.social.Friend.Friend;
import net.swordie.ms.client.social.Friend.FriendResult;
import net.swordie.ms.client.social.Guild.Guild;
import net.swordie.ms.client.social.Guild.GuildMember;
import net.swordie.ms.client.social.Guild.GuildResult;
import net.swordie.ms.connection.OutPacket;
import net.swordie.ms.connection.crypto.TripleDESCipher;
import net.swordie.ms.connection.netty.NettyClient;
import net.swordie.ms.connection.packet.Login;
import net.swordie.ms.connection.packet.MiniroomPacket;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.constants.FieldConstants;
import net.swordie.ms.enums.social.Friend.FriendFlag;
import net.swordie.ms.handlers.ClientSocket;
import net.swordie.ms.handlers.header.InHeader;
import net.swordie.ms.handlers.header.OutHeader;
import net.swordie.ms.util.DataPrinter;
import net.swordie.ms.util.FileTime;
import net.swordie.ms.util.Util;
import net.swordie.ms.world.Channel;
import net.swordie.ms.world.World;
import net.swordie.ms.world.field.Field;
import org.python.jline.internal.Log;

import java.time.LocalDateTime;
import java.util.*;

public class Client extends NettyClient {

    public static final byte LOGOUT = 0,
            LOGIN_TRANSITION = 1,
            IN_FIELD = 2,
            IN_CASH_SHOP = 3,
            IN_AUCTION_HOUSE = 4,
            CHANGING_CHANNEL = 5,
            NONE = 6;
    private byte currentState = NONE;
    private byte nextState = NONE;
    private Char chr;
    private Account account;
    private User user;
    private byte channel;
    private byte worldId;
    private boolean authorized;
    private Channel channelInstance;
    private byte oldChannel;
    private final Map<Short, Short> encryptedHeaderToNormalHeaders = new HashMap<>();
    private long ping;
    private long lastPingTime;
    private boolean waitingForAliveAck;
    private long lastAPIAttempt = 0;

    public Client(io.netty.channel.Channel channel) {
        super(channel);
    }

    public void dispose() {
        write(WvsContext.exclRequest());
    }

    public void sendPing() {
        this.lastPingTime = System.currentTimeMillis();
        this.waitingForAliveAck = true;
        write(Login.sendAliveReq());
    }

    public void setPing(long ping) {
        this.ping = ping;
    }

    public long getPing() {
        return ping;
    }

    public long getLastPingTime() {
        return lastPingTime;
    }

    public void setLastPingTime(long lastPingTime) {
        this.lastPingTime = lastPingTime;
    }

    public boolean isWaitingForAliveAck() {
        return waitingForAliveAck;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public byte getChannel() {
        return channel;
    }

    public void setChannel(byte channel) {
        this.channel = channel;
    }

    public byte getWorldId() {
        return worldId;
    }

    public void setWorldId(byte worldId) {
        this.worldId = worldId;
    }

    public Char getChr() {
        return chr;
    }

    public void setChr(Char chr) {
        if (chr != null) {
            Server.get().addChar(chr);
        }
        this.chr = chr;
    }

    public boolean isAuthorized() {
        return authorized;
    }

    public void setAuthorized(boolean authorized) {
        this.authorized = authorized;
    }

    public Channel getChannelInstance() {
        return channelInstance;
    }

    public void setChannelInstance(Channel channelInstance) {
        this.channelInstance = channelInstance;
    }

    public World getWorld() {
        return Server.get().getWorld();
    }

    public byte getOldChannel() {
        return oldChannel;
    }

    public void setOldChannel(byte oldChannel) {
        this.oldChannel = oldChannel;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void handleChannelInactive() {
        System.out.printf("[ChannelInactive] Client %s: Current state: %s, Next state: %s.%n", getIP(), getState(currentState), getState(nextState));
        if (nextState != NONE) {
            System.out.println("[ChannelInactive] Client " + getIP() + " đã ngắt kết nối trong quá trình chuyển trạng thái.");
        } else {
            switch (currentState) {
                case IN_FIELD:
                case IN_CASH_SHOP:
                case IN_AUCTION_HOUSE:
                    System.out.println("[ChannelInactive] Client " + getIP() + " đang ở trạng thái ổn định, đã đăng nhập. Đang thực hiện đăng xuất hoàn toàn.");
                    finalizeSession();
                    break;
                case LOGOUT:
                case NONE:
                    System.out.println("[ChannelInactive] Client " + getIP() + " chưa đăng nhập. Không cần hành động nào.");
                    break;
                case LOGIN_TRANSITION:
                    System.out.println("[ChannelInactive] Client " + getIP() + " đang chọn nhân vật / kênh / thế giới nhưng bị mất kết nối.");
                    finalizeSession();
                    break;
                default:
                    System.out.printf("[ChannelInactive] Client " + getIP() + " đang trong trạng thái hiện tại chưa được xử lý %d. Đang thực hiện đăng xuất an toàn.", getState(currentState));
                    finalizeSession();
                    break;
            }
        }
    }

    private String getState(int state) {
        switch (state) {
            case 0:
                return "LOGOUT";
            case 1:
                return "LOGIN_TRANSITION";
            case 2:
                return "IN_FIELD";
            case 3:
                return "IN_CASH_SHOP";
            case 4:
                return "IN_AUCTION_HOUSE";
            case 5:
                return "CHANGING_CHANNEL";
            default:
                return "NONE";
        }
    }

    public void migrateIn(boolean isAuctionHouse) {
        this.chr.punishLieDetectorEvasion();
        this.chr.getField().removeChar(this.chr.getId());
        this.chr.initParty(true);
        byte state = isAuctionHouse ? IN_AUCTION_HOUSE : IN_CASH_SHOP;
        this.user.setClientState(state);
        this.currentState = state;
        this.nextState = NONE;
        this.user.saveToSQL(false);
        if (isAuctionHouse) {
            write(Login.pingCheckResult());
            write(Login.authMessage());
            write(WvsContext.setMapleCoin(LocalDateTime.now()));
        }
    }

    public void migrateOut(Char chr) {
        user.setClientState(Client.CHANGING_CHANNEL);
        setCurrentState(Client.CHANGING_CHANNEL);
        setNextState(Client.IN_FIELD);
        user.saveToSQL(false);
        Channel channel = getChannelInstance();
        channel.addClientInTransfer(getChannel(), chr.getId(), this);
        chr.getTimer().addEvent(() -> write(ClientSocket.migrateCommand(true, (short) channel.getPort())), 1000);
        DataPrinter.send(DataPrinter.LOGIN, String.format("[IP: %s] [Tài khoản: %s] [Nhân vật: %s] đang rời khỏi cashshop %d.", getIP(), user.getName(), chr.getName(), getChannel()));
    }

    public void auctionHouseOut(Char chr) {
        user.setClientState(Client.CHANGING_CHANNEL);
        setCurrentState(Client.CHANGING_CHANNEL);
        setNextState(Client.IN_FIELD);
        user.saveToSQL(false);
        Channel channel = getChannelInstance();
        channel.addClientInTransfer(getChannel(), chr.getId(), this);
        chr.getTimer().addEvent(() -> write(ClientSocket.auctionHouseOut((short) channel.getPort())), 1000);
        DataPrinter.send(DataPrinter.LOGIN, String.format("[IP: %s] [Tài khoản: %s] [Nhân vật: %s] đang rời khỏi auction house %d.", getIP(), user.getName(), chr.getName(), getChannel()));
    }

    public void finalizeSession() {
        if (chr == null) {
            setCurrentState(LOGOUT);
            setNextState(NONE);
            if (user != null) {
                user.setClientState(LOGOUT);
                user.saveToSQL(true);
                user.setCurrentChr(null);
            }
            if (ServerConfig.IP_LOG) {
                DataPrinter.send(DataPrinter.LOGIN, String.format("[IP: %s] đã ngắt kết nối với máy chủ.", getIP()));
            }
            return;
        }
        int charID = chr.getId();
        chr.updateBuffDataList();
        chr.punishLieDetectorEvasion();
        chr.setOnline(false);
        if (!chr.getFriends().isEmpty()) {
            for (Friend friend : chr.getAllFriends()) {
                Char yourFriend = getWorld().getCharById(friend.getOwnerID());
                if (yourFriend != null) {
                    Friend thisCharFriend = yourFriend.getFriendByCharID(chr.getId());
                    if (thisCharFriend != null) {
                        byte flag = thisCharFriend.getFlag();
                        if (flag == FriendFlag.AccountFriendOnline.getVal()) {
                            thisCharFriend.setFlag(FriendFlag.AccountFriendOffline);
                        } else if (flag == FriendFlag.FriendOnline.getVal()) {
                            thisCharFriend.setFlag(FriendFlag.FriendOffline);
                        }
                        yourFriend.write(WvsContext.friendResult(FriendResult.response_Load_Success(yourFriend.getAllFriends())));
                    }
                }
            }
        }
        Guild guild = chr.getGuild();
        if (guild != null) {
            GuildMember gm = guild.getMemberByCharID(chr.getId());
            if (gm != null) {
                gm.updateInfoFromChar(chr);
                guild.broadcast(WvsContext.guildResult(GuildResult.response_GuildNotify_LoginOrLogout(guild, gm, false, true)), chr);
                Alliance ally = guild.getAlliance();
                if (ally != null) {
                    ally.broadcast(WvsContext.allianceResult(AllianceResult.notifyLoginOrLogout(ally, guild, gm, true)), chr);
                }
            }
        }
        if (currentState == IN_FIELD || currentState == IN_CASH_SHOP || currentState == IN_AUCTION_HOUSE) {
            Field field = chr.getField();
            if (field != null) {
                if (field.getForcedReturn() != FieldConstants.NO_MAP_ID) {
                    chr.setFieldID(chr.getField().getForcedReturn());
                }
                if (field.getId() == FieldConstants.SUB_ZERO_HUNT) {
                    field.removeMobsByOnlyChar(chr);
                }
                field.removeChar(chr.getId());
            }
            TradeRoom tradeRoom = chr.getTradeRoom();
            if (tradeRoom != null) {
                tradeRoom.cancelTrade();
                Char other = tradeRoom.getOtherChar(chr.getId());
                if (other != null) { // không thể xảy ra nhưng cho chắc
                    other.write(MiniroomPacket.cancelTrade());
                    other.chatMessage("Đối tác giao dịch của bạn đã ngắt kết nối.");
                }
            }
            if (chr.getShop() != null) {
                chr.getShop().setChar(null);
                chr.setShop(null);
            }
            if (chr.getMobZoneDebuff() != null) {
                chr.setMobZoneDebuff(null);
            }
            if (chr.getScriptManager() != null) {
                chr.getScriptManager().dispose();
            }
            chr.cancelTimers();
            if (chr.getScriptManager() != null) {
                chr.getScriptManager().stopEvents();
            }
            chr.getAvatarData().getCharacterStat().setLastLogout(FileTime.currentTime());
            chr.chatPopup("Bạn đã ngắt kết nối khỏi máy chủ.");
        }
        if (getNextState() == NONE) {
            this.currentState = LOGOUT;
            this.nextState = NONE;
        }
        if (account != null) {
            account.saveToSQL();
        } else {
            if (chr.getAccount() != null) {
                chr.getAccount().saveToSQL();
            } else if (user != null && user.getCurrentAcc() != null) {
                user.getCurrentAcc().saveToSQL();
            }
        }
        if (user != null) {
            user.setClientState(LOGOUT);
            user.setCurrentChr(null);
            if (user.getCurrentAcc() != null) {
                user.getCurrentAcc().setCurrentChr(null);
            }
            user.saveToSQL(true);
        }
        chr.saveToSQL();
        chr.setClient(null);
        Server.get().removeChar(charID);
        setChr(null);
        if (ServerConfig.IP_LOG) {
            DataPrinter.send(DataPrinter.LOGIN, String.format("[IP: %s] đã ngắt kết nối với máy chủ.", getIP()));
        }
    }

    public Map<Short, Short> getEncryptedHeaderToNormalHeaders() {
        return encryptedHeaderToNormalHeaders;
    }

    public void sendOpcodeEncryption() {
        byte[] key = new byte[24];
        System.arraycopy("N3x@nGLEUH@ckEr!".getBytes(), 0, key, 0, 16);
        System.arraycopy(key, 0, key, 16, 8);
        TripleDESCipher cipher = new TripleDESCipher(key);
        StringBuilder content = new StringBuilder();
        List<Integer> possibleNums = new ArrayList<>();
        for (int i = InHeader.B_E_G_I_N__U_S_E_R.getValue(); i < 9999; i++) {
            possibleNums.add(i);
        }
        for (short header = InHeader.B_E_G_I_N__U_S_E_R.getValue(); header < InHeader.NO.getValue(); header++) {
            int randNum = Util.getRandomFromCollection(possibleNums);
            possibleNums.remove((Integer) randNum);
            String num = String.format("%04d", randNum);
            encryptedHeaderToNormalHeaders.put((short) randNum, header);
            content.append(num);
        }
        content.append(" ");
        byte[] buf = new byte[Short.MAX_VALUE + 1];
        byte[] encryptedBuf = cipher.encrypt(content.toString().getBytes());
        System.arraycopy(encryptedBuf, 0, buf, 0, encryptedBuf.length);
        Random random = new Random();
        for (int i = encryptedBuf.length; i < buf.length; i++) {
            buf[i] = (byte) random.nextInt();
        }
        write(ClientSocket.opcodeEncryption(buf));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NettyClient c = (NettyClient) o;
        return getIP().equals(c.getIP()) && getPort().equals(c.getPort()) && getCh().equals(c.getCh());
    }

    @Override
    public int hashCode() {
        return Objects.hash(ch);
    }

    public long getLastAPIAttempt() {
        return lastAPIAttempt;
    }

    public void setLastAPIAttempt(long lastAPIAttempt) {
        this.lastAPIAttempt = lastAPIAttempt;
    }

    public byte getCurrentState() {
        return currentState;
    }

    public void setCurrentState(byte currentState) {
        this.currentState = currentState;
    }

    public byte getNextState() {
        return nextState;
    }

    public void setNextState(byte nextState) {
        this.nextState = nextState;
    }
}
