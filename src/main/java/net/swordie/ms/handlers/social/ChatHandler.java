package net.swordie.ms.handlers.social;

import net.swordie.ms.Server;
import net.swordie.ms.ServerConfig;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.commands.*;
import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.client.social.Friend.Friend;
import net.swordie.ms.client.social.Guild.Guild;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.OutPacket;
import net.swordie.ms.connection.packet.FieldPacket;
import net.swordie.ms.connection.packet.UserPacket;
import net.swordie.ms.enums.*;
import net.swordie.ms.handlers.Handler;
import net.swordie.ms.handlers.header.InHeader;
import net.swordie.ms.loaders.StringData;
import net.swordie.ms.util.DataPrinter;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static net.swordie.ms.enums.ChatType.*;
import static net.swordie.ms.enums.InvType.EQUIP;
import static net.swordie.ms.enums.InvType.EQUIPPED;


public class ChatHandler {

    @Handler(op = InHeader.USER_CHAT)
    public static void handleUserChat(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // timestamp
        String msg = inPacket.decodeString();
        if (msg.length() <= 0) {
            chr.dispose();
            return;
        }
        char prefix = msg.charAt(0);
        boolean isCmd = (prefix == ServerConfig.PLAYER_COMMAND || prefix == ServerConfig.ADMIN_COMMAND || prefix == ServerConfig.ADMIN_COMMAND_2);
        if (!isCmd) {
            if (chr.isGM()) {
                chr.getField().broadcast(UserPacket.chat(chr, ChatUserType.Admin, msg, 3, 0, chr.getClient().getWorldId()));
            } else {
                chr.getField().broadcast(UserPacket.chat(chr, ChatUserType.User, msg, 3, 0, chr.getClient().getWorldId()));
                DataPrinter.send(DataPrinter.LOG_CHAT, chr.getName() + ": " + msg);
            }
            return;
        }

        String command = msg.split(" ")[0].substring(1);
        List<Class<?>> commandClasses = new ArrayList<>();
        // Search PlayerCommands first
        Collections.addAll(commandClasses, PlayerCommands.class.getClasses());
        // If sender is GM or account has privileges or used admin prefix (!, #), also allow AdminCommands
        if (chr.isGM() || (chr.getUser() != null && chr.getUser().getAccountType().ordinal() >= AccountType.Tester.ordinal())
                || prefix == ServerConfig.ADMIN_COMMAND || prefix == ServerConfig.ADMIN_COMMAND_2) {
            Collections.addAll(commandClasses, AdminCommands.class.getClasses());
        }

        for (Class<?> commandClass : commandClasses) {
            Command cmd = commandClass.getAnnotation(Command.class);
            if (cmd == null) continue;
            for (String name : cmd.names()) {
                if (!name.equalsIgnoreCase(command)) {
                    continue;
                }
                if (chr.getUser() != null && chr.getUser().getAccountType().ordinal() < cmd.requiredType().ordinal()) {
                    chr.chatMessage(Expedition, "Bạn không có quyền sử dụng lệnh này (Cần quyền: " + cmd.requiredType() + ").");
                    return;
                }
                try {
                    ICommand iCommand = null;
                    if (PlayerCommand.class.isAssignableFrom(commandClass)) {
                        iCommand = (PlayerCommand) commandClass.getConstructor().newInstance();
                    } else if (AdminCommand.class.isAssignableFrom(commandClass)) {
                        iCommand = (AdminCommand) commandClass.getConstructor().newInstance();
                    }
                    commandClass.getDeclaredMethod("execute", Char.class, String[].class).invoke(iCommand, chr, msg.split(" "));
                } catch (Exception e) {
                    DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, e);
                    if (e instanceof InvocationTargetException ite && ite.getCause() != null) {
                        chr.chatMessage(Expedition, "Lỗi thực thi lệnh: " + ite.getCause().getMessage());
                    } else {
                        chr.chatMessage(Expedition, "Lỗi thực thi lệnh: " + e.getMessage());
                    }
                }
                return;
            }
        }
        // only reaches this point if no matching command was found
        chr.chatMessage(Expedition, "Sai cú pháp hoặc không tìm thấy lệnh \"" + command + "\"");
    }

    @Handler(op = InHeader.USER_ITEM_LINKED_CHAT)
    public static void handleUserItemLinkedChat(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        String msg = inPacket.decodeString();
        byte type = inPacket.decodeByte();
        InvType invType = InvType.getInvTypeByVal(inPacket.decodeInt());
        inPacket.decodeInt();
        int pos = inPacket.decodeInt();
        if (invType == EQUIP && pos < 0) {
            invType = EQUIPPED;
            pos = -pos;
        }
        Item item = chr.getInventoryByType(invType).getItemBySlot(pos);
        if (item == null) {
            chr.chatMessage("Vật phẩm không tồn tại.");
            return;
        }
        chr.getField().broadcast(UserPacket.itemLinkedChat(chr, ChatUserType.User, msg,
                type, 0, chr.getClient().getWorldId(), item));
    }

    @Handler(op = InHeader.WHISPER)
    public static void handleWhisper(Char chr, InPacket inPacket, InHeader header) {
        byte type = inPacket.decodeByte();
        inPacket.decodeInt(); // tick
        String destName = inPacket.decodeString();
        Char other = Server.get().getWorld().getCharByName(destName);
        if (other == null) {
            chr.chatMessage("Không thể tìm thấy nhân vật " + destName + ".");
            return;
        }
        switch (type) {
            case 5: // /find command
            case 68:
                int fieldId = other.getField().getId();
                int channel = other.getClient().getChannel();
                if (channel != chr.getClient().getChannel()) {
                    chr.chatMessage(ChatType.Tip, "%s đang ở trong kênh %d.", other.getName(), channel);
                } else {
                    if (chr.getField().getSN() == other.getField().getSN()) {
                        chr.chatMessage(ChatType.Tip, "%s đang cùng ở chung bản đồ với bạn.", destName);
                        break;
                    }
                    String fieldString = StringData.getMapStringById(fieldId);
                    if (fieldString == null) {
                        fieldString = "Lỗi không xác định";
                    }
                    chr.chatMessage(ChatType.Tip, "%s đang ở trong bản đồ %s.", destName, fieldString);
                }
                break;
            case 6: // whisper
                String msg = inPacket.decodeString();
                if (header == InHeader.WHISPER_ITEM) {
                    final String itemText = inPacket.decodeString();
                }
                other.write(FieldPacket.whisper(chr, (byte) (chr.getClient().getChannel() - 1), msg, false, null));
                chr.chatMessage(Whisper, String.format("%s<< %s", destName, msg));
                break;
        }

    }

    @Handler(op = InHeader.GROUP_MESSAGE)
    public static void handleGroupMessage(Char chr, InPacket inPacket) {
        byte type = inPacket.decodeByte(); // party = 1, alliance = 3
        short loopSize = inPacket.decodeShort();
        Set<Integer> charIds = new HashSet<>();
        for (int i = 0; i < loopSize; i++) {
            charIds.add(inPacket.decodeInt());
        }
        String msg = inPacket.decodeString();
        if (msg.length() > 1000) {
            return;
        }
        DataPrinter.send(DataPrinter.LOG_CHAT, chr.getName() + ": " + msg);
        OutPacket packet;
        GroupMessageType groupMessageType;
        switch (type) {
            case 0:
                groupMessageType = GroupMessageType.Buddy;
                break;
            case 1:
                groupMessageType = GroupMessageType.Party;
                break;
            case 2:
                groupMessageType = GroupMessageType.Guild;
                break;
            case 3:
                groupMessageType = GroupMessageType.Alliance;
                break;
            default:
                System.out.println("Unhandled group message type " + type);
                return;
        }
        packet = FieldPacket.groupMessage(groupMessageType, chr, msg);
        for (Integer charId : charIds) {
            Char other = chr.getWorld().getCharById(charId);
            if (other != null) {
                other.write(packet);
            }
        }
    }

    @Handler(op = InHeader.ITEM_LINKED_GROUP_MESSAGE)
    public static void handleItemLinkedGroupMessage(Char chr, InPacket inPacket) {
        byte type = inPacket.decodeByte(); // party = 1, alliance = 3
        short loopSize = inPacket.decodeShort();
        Set<Integer> charIds = new HashSet<>();
        for (int i = 0; i < loopSize; i++) {
            charIds.add(inPacket.decodeInt());
        }
        String msg = inPacket.decodeString();
        if (msg.length() > 1000) {
            return;
        }
        InvType invType = InvType.getInvTypeByVal(inPacket.decodeInt());
        int pos = inPacket.decodeInt();
        if (invType == EQUIP && pos < 0) {
            invType = EQUIPPED;
            pos = -pos;
        }
        Item item = chr.getInventoryByType(invType).getItemBySlot(pos);
        if (item == null) {
            chr.chatMessage("Could not find that item.");
            return;
        }
        switch (type) {
            case 0: // buddy
                for (Friend friend : chr.getAllFriends()) {
                    Char friendChr = chr.getWorld().getCharById(friend.getOwnerID());
                    if (friendChr != null) {
                        friendChr.write(FieldPacket.groupMessage(GroupMessageType.Buddy, chr, msg));
                    }
                }
                break;
            case 1: // party
                if (chr.getParty() != null) {
                    chr.getParty().broadcast(FieldPacket.itemLinkedGroupMessage(GroupMessageType.Party, chr, msg, item), chr);
                }
                break;
            case 2: // guild
                if (chr.getGuild() != null) {
                    chr.getGuild().broadcast(FieldPacket.itemLinkedGroupMessage(GroupMessageType.Guild, chr, msg, item), chr);
                }
                break;
            case 3: // alliance
                if (chr.getGuild() != null && chr.getGuild().getAlliance() != null) {
                    chr.getGuild().getAlliance().broadcast(FieldPacket.itemLinkedGroupMessage(GroupMessageType.Alliance, chr, msg, item), chr);
                }
                break;
            default:
                System.out.println("Unhandled group message type " + type);
                break;
        }
        OutPacket packet;
        GroupMessageType groupMessageType;
        switch (type) {
            case 0:
                groupMessageType = GroupMessageType.Buddy;
                break;
            case 1:
                groupMessageType = GroupMessageType.Party;
                break;
            case 2:
                groupMessageType = GroupMessageType.Guild;
                break;
            case 3:
                groupMessageType = GroupMessageType.Alliance;
                break;
            default:
                System.out.println("Unhandled group message type " + type);
                return;
        }
        packet = FieldPacket.itemLinkedGroupMessage(groupMessageType, chr, msg, item);
        for (Integer charId : charIds) {
            Char other = chr.getWorld().getCharById(charId);
            if (other != null) {
                other.write(packet);
            }
        }
    }

    @Handler(op = InHeader.FRIEND_CHAT)
    public static void handleFriendChat(Char chr, InPacket inPacket) {
        int accID = inPacket.decodeInt();
        String msg = inPacket.decodeString();
        int size = inPacket.decodeInt();
        for (int i = 0; i < size; i++) {
            if (chr.getWorld().getConnectedChatClients().containsKey(i)) {
                //chr.getWorld().getConnectedChatClients().get(i).write(ChatSocket.friendChatMessage(accID, chr.getId(), null, msg, false));
            }
        }
    }

    @Handler(op = InHeader.GUILD_CHAT)
    public static void handleGuildChat(Char chr, InPacket inPacket) {
        int charID = inPacket.decodeInt();
        int guildID = inPacket.decodeInt();
        String msg = inPacket.decodeString();
        Guild g = chr.getGuild();
        if (g != null) {
            g.broadcast(FieldPacket.groupMessage(GroupMessageType.Guild, chr, msg));
            DataPrinter.send(DataPrinter.LOG_CHAT, "[Guild " + g.getName() + " ] " + chr.getName() + ": " + msg);
        }
    }
}
