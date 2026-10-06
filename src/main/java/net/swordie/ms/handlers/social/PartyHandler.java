package net.swordie.ms.handlers.social;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Friend.Friend;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.client.social.Party.PartyMember;
import net.swordie.ms.client.social.Party.PartyResult;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.connection.packet.UserRemote;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.enums.social.Party.PartyType;
import net.swordie.ms.handlers.Handler;
import net.swordie.ms.handlers.header.InHeader;
import net.swordie.ms.world.field.Field;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import static net.swordie.ms.enums.ChatType.SystemNotice;

public class PartyHandler {

    @Handler(op = InHeader.PARTY_INVITABLE_SET)
    public static void handlePartyInvitableSet(Char chr, InPacket inPacket) {
        boolean isInvitable = inPacket.decodeByte() != 0;
        chr.setPartyInvitable(isInvitable);
    }

    @Handler(op = InHeader.PARTY_REQUEST)
    public static void handlePartyRequest(Char chr, InPacket inPacket) {
        byte type = inPacket.decodeByte();
        PartyType partyType = PartyType.getByVal(type);
        if (partyType == null) {
            System.out.printf("Unknown party request type %d.%n", type);
            chr.dispose();
            return;
        }
        Party party = chr.getParty();
        switch (partyType) {
            case Request_Create -> {
                String partyName = inPacket.decodeString();
                byte isPrivateParty = inPacket.decodeByte();
                int settingType = inPacket.decodeInt();

                if (party == null) {
                    if (JobConstants.isBeginnerJob(chr.getJob())) {
                        chr.chatPopup("Bạn không thể mở nhóm.");
                        chr.dispose();
                        return;
                    }
                    party = Party.createNewParty(isPrivateParty, partyName, chr.getWorld());
                    party.setPartyAcquisitionPermission(Party.PartyAcquisitionPermission.getByVal(settingType));
                    party.addPartyMember(chr);
                    chr.write(WvsContext.partyResult(PartyResult.create(party)));
                } else if (party.getPartyLeader().getCharID() == chr.getId() && !party.isEmpty()) {
                    party.setPartyAcquisitionPermission(Party.PartyAcquisitionPermission.getByVal(settingType));
                    chr.write(WvsContext.partyResult(PartyResult.create(party)));
                } else {
                    chr.write(WvsContext.partyResult(PartyResult.msg(PartyType.Response_Create_AlreadyJoined)));
                }
            }
            case Request_Leave -> {
                if (party != null) {
                    if (party.getMembers().size() == 1) {
                        party.disband();
                    } else {
                        party.leave(chr.getId());
                    }
                } else {
                    chr.write(WvsContext.partyResult(PartyResult.response_Leave_Success(null, null, false, false)));
                }
            }
            case Request_Kick -> {
                int expelID = inPacket.decodeInt();
                if (party != null) {
                    party.expel(expelID);
                } else {
                    chr.write(WvsContext.partyResult(PartyResult.response_Leave_Success(null, null, false, false)));
                }
            }
            case Request_ChangeLeader -> {
                int newLeaderID = inPacket.decodeInt();
                PartyMember newLeader = null;
                for (PartyMember partyMember : party.getOnlineMembers()) {
                    if (partyMember != null) {
                        if (partyMember.getCharID() == newLeaderID) {
                            newLeader = partyMember;
                            break;
                        }
                    }
                }
                if (newLeader == null) {
                    party.broadcast(WvsContext.partyResult(PartyResult.msg(PartyType.Response_ChangeLeader_NoMemberInSameField)));
                    return;
                }
                if (newLeader.getFieldID() != chr.getFieldID()) {
                    party.broadcast(WvsContext.partyResult(PartyResult.msg(PartyType.Response_ChangeLeader_NotSameField)));
                    return;
                }
                if (newLeader.getChannel() != chr.getClient().getChannel()) {
                    party.broadcast(WvsContext.partyResult(PartyResult.msg(PartyType.Response_ChangeLeader_NotSameChannel)));
                    return;
                }
                party.setPartyLeaderID(newLeaderID);
                party.broadcast(UserLocal.chatMsg(SystemNotice, String.format("%s đã trở thành trưởng nhóm mới.", newLeader.getCharName())));
                party.updateFull();
            }
            case Request_Apply -> {
                int partyID = inPacket.decodeInt();
                if (party != null) {
                    chr.write(WvsContext.partyResult(PartyResult.msg(PartyType.Response_Join_AlreadyJoined)));
                    return;
                }
                if (chr.getInstance() != null) {
                    chr.chatPopup("Bạn đang trong bản đồ ẩn không thể đồng ý.");
                    return;
                }
                party = chr.getWorld().getPartyByPartyID(partyID);
                if (party == null) {
                    chr.write(WvsContext.partyResult(PartyResult.msg(PartyType.Response_UnexpectedError)));
                    return;
                }
                if (party.isFull()) {
                    chr.write(WvsContext.partyResult(PartyResult.msg(PartyType.Response_Join_AlreadyFull)));
                    return;
                }
                PartyMember leader = party.getPartyLeader();
                if (leader.getChr() != null) {
                    leader.getChr().write(WvsContext.partyResult(PartyResult.request_Apply(party, leader)));
                }
            }
            case Request_Invite -> {
                String invitedName = inPacket.decodeString();
                int unk = inPacket.decodeInt();
                Char invited = chr.getWorld().getCharByName(invitedName);
                if (invited == null) {
                    chr.write(WvsContext.partyResult(PartyResult.msg(PartyType.Response_InAnotherChannelOrBlockedUser)));
                    return;
                }
                if (party == null) {
                    party = Party.createNewParty((byte) 1, "Let's Party", chr.getWorld());
                    party.addPartyMember(chr);
                    chr.write(WvsContext.partyResult(PartyResult.create(party)));
                }
                //Character UnCheck invite Party Setting.
                PartyMember inviter = party.getPartyLeader();
                if (invited.getInstance() != null) {
                    chr.chatPopup("Đối phương đang trong bản đồ ẩn không thể mời.");
                } else if (!invited.isPartyInvitable()) {
                    chr.chatMessage(String.format("%s hiện đang từ chối tất cả lời mời vào nhóm.", invitedName));
                } else if (invited.getParty() == null) {
                    invited.write(WvsContext.partyResult(PartyResult.request_Apply(party, inviter)));
                    chr.chatMessage(SystemNotice, String.format("Bạn đã gửi lời mời %s vào nhóm bạn.", invitedName));
                } else {
                    chr.chatPopup("Đối phương đã trong nhóm rồi.");
                }
            }
            case Request_Setting -> {
                String newPartyName = inPacket.decodeString();
                boolean isPrivateParty = inPacket.decodeByte() == 1;
                int settingType = inPacket.decodeInt();
                if (party == null) {
                    return;
                }
                party.setAppliable(isPrivateParty);
                party.setName(newPartyName);
                party.setPartyAcquisitionPermission(Party.PartyAcquisitionPermission.getByVal(settingType));
                chr.write(WvsContext.partyResult(PartyResult.response_Setting_Success(party.getName(), !isPrivateParty, settingType)));
                party.updateFull();
            }
            default -> System.out.printf("Unhandled party request type %s | %s%n", partyType, type);
        }
        chr.dispose();
    }

    @Handler(op = InHeader.PARTY_RESULT)
    public static void handlePartyResult(Char chr, InPacket inPacket) {
        byte type = inPacket.decodeByte();
        PartyType partyType = PartyType.getByVal(type);
        if (partyType == null) {
            System.out.printf("Unknown party request result type %d%n", type);
            chr.dispose();
            return;
        }
        switch (partyType) {
            case Response_Invite_Success -> {
                int resultType = inPacket.decodeInt();
                int charID = inPacket.decodeInt();
                Char inviter = chr.getWorld().getCharById(charID);
                if (inviter == null) {
                    return;
                }
                Party party = inviter.getParty();
                if (party == null) {
                    return;
                }
                if (resultType == 0) {
                    chr.chatMessage(String.format("Bạn được mời vào nhóm của %s.", inviter.getName()));
                } else if (resultType == 4) {
                    if (party.getPartyLeader() == null || party.getPartyLeader().getChr() == null) {
                        return;
                    }
                    party.getPartyLeader().getChr().chatPopup(String.format("%s đã không đồng ý vào nhóm của bạn.", chr.getName()));
                } else if (resultType == 5) {
                    if (chr.getParty() != null) {
                        chr.write(WvsContext.partyResult(PartyResult.msg(PartyType.Response_Join_AlreadyJoined)));
                        return;
                    }
                    if (party.isFull()) {
                        chr.write(WvsContext.partyResult(PartyResult.msg(PartyType.Response_Join_AlreadyFull)));
                        return;
                    }
                    party.addPartyMember(chr);
                    party.broadcast(WvsContext.partyResult(PartyResult.response_Join_Success(party, chr.getName())));
                    party.broadcast(UserRemote.receiveHP(chr));
                }
            }
            /*case Response_Invite_AlreadyInvited -> {
                if (party.getPartyLeader() == null || party.getPartyLeader().getChr() == null) {
                    return;
                }
                party.getPartyLeader().getChr().chatPopup(String.format("Bạn đã mời '%s' vào trong nhóm của bạn.", chr.getName()));
            }
            case Response_Invite_Rejected -> {
                if (party.getPartyLeader() == null || party.getPartyLeader().getChr() == null) {
                    return;
                }
                party.getPartyLeader().getChr().chatPopup(String.format("%s đã không đồng ý vào nhóm của bạn.", chr.getName()));
            }
            case Response_Apply_Accepted -> {
                if (chr.getParty() != null) {
                    chr.write(WvsContext.partyResult(PartyResult.msg(PartyType.Response_Join_AlreadyJoined)));
                    return;
                }
                if (party.isFull()) {
                    chr.write(WvsContext.partyResult(PartyResult.msg(PartyType.Response_Join_AlreadyFull)));
                    return;
                }
                party.addPartyMember(chr);
                party.broadcast(WvsContext.partyResult(PartyResult.response_Join_Success(party, chr.getName())));
                party.broadcast(UserRemote.receiveHP(chr));
            }
            case Response_Apply_AlreadyAppliedByApplier -> party.broadcast(WvsContext.broadcastMsg(BroadcastMsg.popUpMessage(
                    String.format("Bạn được mời vào nhóm của %s.", chr.getName()))));
            case Response_Apply_Rejected -> party.broadcast(WvsContext.broadcastMsg(BroadcastMsg.popUpMessage(
                    String.format("%s đã không đồng ý vào nhóm của bạn.", chr.getName()))));
            case Response_Apply_Success -> {
                if (party != null && party.getPartyLeader() != null) {
                    party.broadcast(WvsContext.partyResult(
                            PartyResult.response_Apply_Success(party.getPartyLeader().getCharName())));
                }
            }*/
            default -> System.out.printf("Unhandled party request result type %s | %s%n", partyType, type);
        }
        chr.dispose();
    }

    @Handler(op = InHeader.PARTY_MEMBER_CANDIDATE_REQUEST)
    public static void handlePartyMemberCandidateRequest(Char chr, InPacket inPacket) {
        Field field = chr.getField();
        chr.write(WvsContext.partyMemberCandidateResult(field.getChars().stream()
                .filter(ch -> ch.isPartyInvitable() && !ch.equals(chr) && ch.getParty() == null)
                .collect(Collectors.toSet())));
    }

    @Handler(op = InHeader.PARTY_CANDIDATE_REQUEST)
    public static void handlePartyCandidateRequest(Char chr, InPacket inPacket) {
        //Disable Party Search until find problem get -38.
        Party party = chr.getParty();
        Set<Friend> friends = chr.getFriends();
        Field field = chr.getField();
        if (party != null) {
            //chr.write(WvsContext.partyCandidateResult(new HashSet<>()));
        } else {
            Set<Party> parties = new HashSet<>();
            for (Char ch : field.getChars()) {
                if (ch.getParty() != null && ch.getParty().isLeader(ch) && !ch.getParty().isAppliable()) {
                    parties.add(ch.getParty());
                }
            }
            //chr.write(WvsContext.partyCandidateResult(parties));
        }
    }

}
