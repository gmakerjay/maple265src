package net.swordie.ms.client.social.Party;

import net.swordie.ms.Server;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.connection.Encodable;
import net.swordie.ms.connection.OutPacket;
import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.util.Position;
import net.swordie.ms.util.Util;
import net.swordie.ms.world.World;
import net.swordie.ms.world.field.Instance;
import net.swordie.ms.world.partyquest.PartyQuest;

import java.util.*;
import java.util.stream.Collectors;

import static net.swordie.ms.enums.ChatType.SystemNotice;

public class Party implements Encodable {
    private int id;
    private PartyMember[] partyMembers = new PartyMember[6];
    private boolean appliable = true;
    private PartyAcquisitionPermission partyAcquisitionPermission = PartyAcquisitionPermission.All;
    private String name;
    private int partyLeaderID;
    private World world;
    private Char applyingChar;
    private Instance instance;
    private int avgPartyLevel = 1;

    public enum PartyAcquisitionPermission {
        All(1),
        PartyLeader(2),
        Distribution(3);

        public int val;

        PartyAcquisitionPermission(int val) {
            this.val = val;
        }

        public int getVal() {
            return this.val;
        }

        public static PartyAcquisitionPermission getByVal(int val) {
            return Arrays.stream(values()).filter(t -> t.getVal() == val).findAny().orElse(null);
        }
    }

    public void encodeMembers(OutPacket outPacket) {
        for (PartyMember pm : partyMembers) {
            int charID = pm != null ? pm.getCharID() : 0;
            outPacket.encodeInt(charID);
            if (charID != 0) {
                outPacket.encodeInt(charID);
                outPacket.encodeString(pm.getCharName());
                outPacket.encodeInt(pm.getJob());
                outPacket.encodeInt(pm.getSubJob());
                outPacket.encodeInt(pm.getLevel());
                outPacket.encodeInt(getWorld().getWorldId());
                outPacket.encodeInt(pm.isOnline() ? 1 : 0);
                outPacket.encodeInt(pm.isOnline() ? pm.getChannel() - 1 : -2); // -1 for cash shop
                outPacket.encodeByte(0);
                outPacket.encodeByte(0);
                outPacket.encodeInt(pm.getArcaneForce());
                outPacket.encodeInt(pm.getSacredForce());
                outPacket.encodeInt(pm.getDojangRank());
                outPacket.encodeLong(pm.getDojangRankTime());
                outPacket.encodeArr(pm.getPackedAvatar());
            }
        }
    }

    public void encode(OutPacket outPacket) {
        outPacket.encodeInt(getId());
        outPacket.encodeByte(0); // unk
        encodeMembers(outPacket); // 6
        outPacket.encodeInt(getPartyLeaderID());
        outPacket.encodeInt(0);
        // 24 bytes
        for (PartyMember pm : partyMembers) {
            if (pm != null) {
                outPacket.encodeInt(pm.getFieldID());
            } else {
                outPacket.encodeInt(999999999);
            }
        }
        // 120 bytes
        for (PartyMember pm : partyMembers) {
            if (pm != null && pm.getTownPortal() != null) {
                pm.getTownPortal().encode(outPacket, false);
            } else {
                new TownPortal(999999999, 999999999, 0, new Position(-1, -1)).encode(outPacket, false);
            }
        }
        outPacket.encodeByte(false);
        outPacket.encodeShort(30);
        outPacket.encodeString(getName(), 30);
        outPacket.encodeByte(isAppliable() && !isFull());
        outPacket.encodeInt(getPartyAcquisitionPermission() != null ? getPartyAcquisitionPermission().getVal() : 1);
        outPacket.encodeInt(-1);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isAppliable() {
        return appliable;
    }

    public void setAppliable(boolean appliable) {
        this.appliable = appliable;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PartyMember[] getPartyMembers() {
        return partyMembers;
    }

    public boolean isFull() {
        return Arrays.stream(getPartyMembers()).noneMatch(Objects::isNull);
    }

    public boolean isEmpty() {
        return Arrays.stream(getPartyMembers()).allMatch(Objects::isNull);
    }

    public int getPartyLeaderID() {
        return partyLeaderID;
    }

    public void setPartyLeaderID(int partyLeaderID) {
        this.partyLeaderID = partyLeaderID;
    }

    public TownPortal getTownPortal() {
        PartyMember pm = Arrays.stream(getPartyMembers()).filter(Objects::nonNull)
                .filter(p -> p.getTownPortal() != null)
                .findFirst().orElse(null);
        return pm != null ? pm.getTownPortal() : new TownPortal(999999999, 999999999, 0, new Position(-1, -1));
    }

    public PartyMember getPartyLeader() {
        return Arrays.stream(getPartyMembers()).filter(p -> p != null && p.getCharID() == getPartyLeaderID()).findFirst().orElse(null);
    }

    public boolean isLeader(Char chr) {
        return getPartyLeaderID() == chr.getId();
    }

    public Collection<Char> getOnlineChars() {
        return Server.get().getCharsByPartyId(getId());
    }

    public List<PartyMember> getOnlineMembers() {
        return Arrays.stream(getPartyMembers()).filter(pm -> pm != null && pm.isOnline()).collect(Collectors.toList());
    }

    public List<PartyMember> getMembers() {
        return Arrays.stream(getPartyMembers()).filter(Objects::nonNull).collect(Collectors.toList());
    }

    public void updateFull() {
        broadcast(WvsContext.partyResult(PartyResult.load(this)));
    }

    public PartyMember getPartyMemberByID(int charID) {
        return Arrays.stream(getPartyMembers()).filter(p -> p != null && p.getCharID() == charID).findFirst().orElse(null);
    }

    public void broadcast(OutPacket outPacket) {
        broadcast(outPacket, null);
    }

    public void broadcast(OutPacket outPacket, Char exceptChar) {
        Server.get().broadcastForParty(outPacket, this, exceptChar);
    }

    public void removeInstance(boolean isDisband, Char remove) {
        if (this.instance != null) {
            int forcedReturn = this.instance.getForcedReturn();
            int forcedReturnPortal = this.instance.getForcedReturnPortalId();
            if (isDisband) {
                for (Char chr : getOnlineChars()) {
                    chr.setInstance(null);
                    chr.warp(forcedReturn, Math.max(forcedReturnPortal, 0), false);
                }
                this.instance.stopEvents();
                this.instance.getFields().clear();
                this.instance.getChars().clear();
                this.instance.getProperties().clear();
                this.instance = null;
            } else if (remove != null) {
                remove.setInstance(null);
                remove.warp(forcedReturn, Math.max(forcedReturnPortal, 0), false);
            }
        }
    }

    public void disband() {
        broadcast(UserLocal.chatMsg(SystemNotice, String.format("Nhóm của %s đã được giải tán.", getPartyLeader().getCharName())));
        broadcast(WvsContext.partyResult(PartyResult.response_Leave_Success(this, getPartyLeader(), false, false)));
        for (PartyMember pm : getMembers()) {
            int id = pm.getCharID();
            Char chr = getWorld().getCharById(id);
            if (chr != null) {
                chr.setPartyID(0);
                chr.setParty(null);
                chr.updateCharacterPartyIDToSQL();
            } else {
                chr = Char.getCharDataByID(id);
                if (chr != null) {
                    chr.setPartyID(0);
                    chr.updateCharacterPartyIDToSQL();
                }
            }
        }
        removeInstance(true,null);
        Arrays.fill(getPartyMembers(), null);
        getWorld().removeParty(getId());
        setWorld(null);
    }

    public void expel(int expelID) {
        PartyMember leaver = getPartyMemberByID(expelID);
        if (leaver != null) {
            broadcast(UserLocal.chatMsg(SystemNotice, String.format("%s đã bị xoá khỏi nhóm.", leaver.getCharName())), leaver.getChr());
            leaver.getChr().write(WvsContext.partyResult(PartyResult.response_Leave_Success(this, leaver, true, true)));
            removePartyMember(leaver);
        }
        updateFull();
        calAvgPartyLevel();
        removeInstance(false, Server.get().getWorld().getCharById(expelID));
    }

    public void leave(int expelID) {
        PartyMember leaver = getPartyMemberByID(expelID);
        if (leaver != null) {
            if (leaver.getCharID() == getPartyLeaderID()) {
                List<PartyMember> members = new ArrayList<>();
                for (PartyMember partyMember : getMembers()) {
                    if (partyMember.getCharID() != leaver.getCharID()) {
                        members.add(partyMember);
                    }
                }
                PartyMember newLeader = Util.getRandomFromCollection(members);
                if (newLeader != null) {
                    setPartyLeaderID(newLeader.getCharID());
                    broadcast(UserLocal.chatMsg(SystemNotice, String.format("%s đã trở thành trưởng nhóm mới.", newLeader.getCharName())), leaver.getChr());
                } else {
                    disband();
                    return;
                }
            }
            broadcast(UserLocal.chatMsg(SystemNotice, String.format("%s đã thoát khỏi nhóm.", leaver.getCharName())), leaver.getChr());
            leaver.getChr().write(WvsContext.partyResult(PartyResult.response_Leave_Success(this, leaver, true, false)));
            removePartyMember(leaver);
        }
        updateFull();
        calAvgPartyLevel();
        removeInstance(false, Server.get().getWorld().getCharById(expelID));
    }

    public static Party createNewParty(byte appliable, String name, World world) {
        Party party = new Party();
        party.setAppliable(appliable == 1);
        party.setName(name);
        party.setWorld(world);
        world.addParty(party);
        return party;
    }

    public void addPartyMember(Char chr) {
        if (isFull()) {
            return;
        }
        PartyMember pm = new PartyMember(chr);
        if (isEmpty()) {
            setPartyLeaderID(chr.getId());
        }
        PartyMember[] partyMembers = getPartyMembers();
        boolean added = false;
        for (int i = 0; i < partyMembers.length; i++) {
            if (partyMembers[i] == null) {
                partyMembers[i] = pm;
                chr.setPartyID(getId());
                chr.setParty(this);
                chr.updateCharacterPartyIDToSQL();
                added = true;
                break;
            }
        }
        calAvgPartyLevel();
        if (added && getPartyLeaderID() != chr.getId()) {
            broadcast(WvsContext.partyResult(PartyResult.response_Join_Success(this, chr.getName())));
        }
    }

    public void removePartyMember(PartyMember partyMember) {
        for (int i = 0; i < getPartyMembers().length; i++) {
            PartyMember pm = getPartyMembers()[i];
            if (pm != null && pm.equals(partyMember)) {
                int id = pm.getCharID();
                Char chr = getWorld().getCharById(id);
                if (chr != null) {
                    chr.setPartyID(0);
                    chr.setParty(null);
                    chr.updateCharacterPartyIDToSQL();
                } else {
                    chr = Char.getCharDataByID(id);
                    if (chr != null) {
                        chr.setPartyID(0);
                        chr.updateCharacterPartyIDToSQL();
                    }
                }
                getPartyMembers()[i] = null;
                break;
            }
        }
    }

    public void setWorld(World world) {
        this.world = world;
    }

    public World getWorld() {
        return world;
    }

    public Char getApplyingChar() {
        return applyingChar;
    }

    public void setApplyingChar(Char applyingChar) {
        this.applyingChar = applyingChar;
    }

    public boolean isPartyMember(Char chr) {
        return getPartyMemberByID(chr.getId()) != null;
    }

    public void updatePartyMemberInfoByChr(Char chr) {
        if (!isPartyMember(chr)) {
            return;
        }
        PartyMember partyMember = getPartyMemberByID(chr.getId());
        List<Integer> changedTypes = partyMember.getChangedTypes(chr);
        for (int type : changedTypes) {
            broadcast(WvsContext.partyResult(PartyResult.response_UpdateDataMember(chr, partyMember, type)), chr);
        }
        partyMember.updateInfoByChar(chr);
        updateFull();
    }

    /**
     * Returns the average party member's level, according to the given Char's field.
     *
     * @return the average level of the party in the Char's field
     */
    public int getAvgPartyLevel() {
        return avgPartyLevel;
    }

    public void calAvgPartyLevel() {
        int avgLevel = 0;
        final Collection<Char> chars = getOnlineChars();
        for (Char chr : chars) {
            avgLevel += chr.getLevel();
        }
        int size = chars.size();
        if (size > 0) {
            this.avgPartyLevel = avgLevel / chars.size();
        } else {
            this.avgPartyLevel = avgLevel;
        }
    }

    /**
     * Gets a list of party members in the same Field instance as the given Char, excluding the given Char.
     *
     * @param exceptChr the given Char
     * @return a set of Characters that are in the same field as the given Char
     */
    public Set<Char> getPartyMembersInSameField(Char exceptChr) {
        // 1. Kiểm tra điều kiện đầu tiên: Char có tồn tại, có nhóm và có Field không.
        if (exceptChr == null || exceptChr.getParty() == null || exceptChr.getField() == null) {
            return Collections.emptySet();
        }
        int fieldSerialNumberId = exceptChr.getField() != null ? exceptChr.getField().getSN() : -1;
        return Server.get().getWorld().getChars().stream()
                .filter(chr -> chr.getId() != exceptChr.getId()
                        && chr.getField() != null
                        && chr.getField().getSN() == fieldSerialNumberId
                        && chr.getPartyID() == exceptChr.getPartyID())
                .collect(Collectors.toSet());
    }

    /**
     * Gets a list of party members in the same Field instance as the given Char, excluding the given Char.
     *
     * @param chr the given Char
     * @return a set of Characters that are in the same field as the given Char
     */
    public Set<Char> getPartyMembersInSameFieldWithChr(Char chr) {
        Set<Char> chars = new HashSet<>(getPartyMembersInSameField(chr));
        chars.add(chr);
        return chars;
    }

    /**
     * Checks if this Party has a member with the given character id.
     *
     * @param charID the charID to look for
     * @return if the corresponding char is in the party
     */
    public boolean hasPartyMember(int charID) {
        return getPartyMemberByID(charID) != null;
    }

    public Instance getInstance() {
        return instance;
    }

    public void setInstance(Instance instance) {
        this.instance = instance;
    }

    public void setPartyQuest(PartyQuest partyQuest) {
        for (Char chr : getOnlineChars()) {
            chr.getPartyQuestManager().setPartyQuest(partyQuest);
        }
    }

    public PartyAcquisitionPermission getPartyAcquisitionPermission() {
        return partyAcquisitionPermission;
    }

    public void setPartyAcquisitionPermission(PartyAcquisitionPermission partyAcquisitionPermission) {
        this.partyAcquisitionPermission = partyAcquisitionPermission;
    }
}
