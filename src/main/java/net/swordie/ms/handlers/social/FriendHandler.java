package net.swordie.ms.handlers.social;

import net.swordie.ms.Server;
import net.swordie.ms.client.Account;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.CharacterStat;
import net.swordie.ms.client.social.Friend.Friend;
import net.swordie.ms.enums.social.Friend.FriendFlag;
import net.swordie.ms.enums.social.Friend.FriendType;
import net.swordie.ms.client.social.Friend.FriendResult;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.constants.FriendConstant;
import net.swordie.ms.enums.AccountType;
import net.swordie.ms.handlers.Handler;
import net.swordie.ms.handlers.header.InHeader;

public class FriendHandler {

    @Handler(op = InHeader.FRIEND_REQUEST)
    public static void handleFriendRequest(Char chr, InPacket inPacket) {
        Char other;
        byte type = inPacket.decodeByte();
        FriendType friendType = FriendType.getTypeByVal(type);
        if (friendType == null) {
            System.out.println("Unknown friend request type " + type);
            return;
        }
        //System.out.println(friendType);
        switch (friendType) {
            case Request_Set: {
                String characterName = inPacket.decodeString();
                String groupName = inPacket.decodeString();
                String memo = inPacket.decodeString();
                String nickName = "";

                boolean isAccountFriend = inPacket.decodeByte() != 0;
                if (isAccountFriend) {
                    nickName = inPacket.decodeString();
                    if (nickName.equalsIgnoreCase("")) {
                        nickName = characterName;
                    }
                }
                other = chr.getClient().getChannelInstance().getCharByName(characterName);
                boolean online = true;
                if (other == null) {
                    other = Char.getCharDataByName(characterName);
                    online = false;
                    if (other == null) {
                        //chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_Set_UnknownUser)));
                        chr.chatPopup(String.format("Nhân vật %s không tồn tại.", characterName));
                        chr.dispose();
                        return;
                    }
                }
                if (other.getId() == chr.getId()) {
                    //chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_Set_CantAddYourSelf)));
                    chr.chatPopup("Bạn không thể thêm chính mình vào danh sách bạn bè.");
                    chr.dispose();
                    return;
                }
                if (other.getUser() != null) {
                    if (other.getUser().getAccountType() != AccountType.Player && chr.getUser().getAccountType() == AccountType.Player) {
                        //chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_Set_isGameMaster)));
                        chr.chatPopup("Bạn không thể thêm nhân vật GM vào danh sách bạn bè.");
                        chr.dispose();
                        return;
                    }
                }
                if (chr.getFriends().size() == chr.getAvatarData().getCharacterStat().getMaxFriends()) {
                    //chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_Set_CurrentSlotFull)));
                    chr.chatPopup("Danh sách bạn bè của bạn đã đầy.");
                    chr.dispose();
                    return;
                } else if (other.getFriends().size() == other.getAvatarData().getCharacterStat().getMaxFriends()) {
                    //chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_Set_TargetSlotFull)));
                    chr.chatPopup("Danh sách bạn bè của nhân vật này đã đầy.");
                    chr.dispose();
                    return;
                }
                //Nếu friend của character hiện tại mà có ID của other Character.
                if (chr.getFriendByCharID(other.getId()) != null) {
                    //Nếu friend của account Character hiện tại mà có ID của other Character.
                    if (chr.getAccountFriendByCharID(other.getId()) != null) {
                        //chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_Set_AlreadyRequested)));
                        chr.chatPopup("Nhân vật này đã nhận lời mời kết bạn từ tài khoản của bạn.");
                        chr.dispose();
                    } else {
                        //chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_Set_Ready)));
                        chr.chatPopup("Nhân vật này đã nhận lời mời kết bạn từ nhân vật của bạn.");
                        chr.dispose();
                    }
                    return;
                    //Hoặc nếu friend của other Character mà có ID của character hiện tại
                } else if (other.getFriendByCharID(chr.getId()) != null) {
                    //Nếu friend của Other Character mà có có Flag == FriendRequest
                    //Nếu friend của Other Character mà có có Flag == AccountFriendRequest
                    if (other.getFriendByCharID(chr.getId()).getFlag() == FriendFlag.FriendRequest.getVal() || other.getAccountFriendByCharID(chr.getId()).getFlag() == FriendFlag.AccountFriendRequest.getVal()) {
                        //chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_Set_AlreadyRequested)));
                        chr.chatPopup("Nhân vật này đã nhận lời mời kết bạn từ tài khoản của bạn.");
                        chr.dispose();
                        return;
                    }
                }
                //Set Friend for Current Character.
                Friend friend = new Friend();
                friend.setFriendID(other.getId()); //Target Character ID
                friend.setFriendAccountID(other.getAccId()); //Target Account ID
                friend.setGroup(groupName);
                friend.setMemo(memo);
                friend.setName(characterName);

                if (isAccountFriend) {
                    friend.setOwnerAccID(chr.getAccId());
                    friend.setNickname(nickName);
                    friend.setFlag(FriendFlag.AccountFriendOffline);
                    chr.getAccount().addFriend(friend);
                } else {
                    friend.setOwnerID(chr.getId());
                    friend.setFlag(FriendFlag.FriendOffline);
                    chr.getFriends().add(friend);
                }
                friend.saveToSQL();
                //Set Friend for Target Character.
                Friend otherFriend = new Friend();
                otherFriend.setFriendID(chr.getId());
                otherFriend.setName(chr.getName());
                otherFriend.setFriendAccountID(chr.getAccId());
                otherFriend.setGroup(groupName);
                otherFriend.setMemo(memo);
                if (isAccountFriend) {
                    otherFriend.setOwnerAccID(other.getAccId());
                    otherFriend.setNickname(chr.getName());
                    otherFriend.setFlag(FriendFlag.AccountFriendRequest);
                    other.getAccount().addFriend(otherFriend);
                } else {
                    otherFriend.setOwnerID(other.getId());
                    otherFriend.setFlag(FriendFlag.FriendRequest);
                    other.addFriend(otherFriend);
                }
                if (online) {
                    //Send Popup Notice Add Friend to other Character.
                    other.write(WvsContext.friendResult(FriendResult.response_Invite(otherFriend, isAccountFriend, chr.getLevel(), chr.getJob(), chr.getSubJob())));
                }
                otherFriend.saveToSQL();

                //chr.write(WvsContext.friendResult(FriendResult.response_Set(characterName)));
                chr.write(WvsContext.friendResult(FriendResult.response_Load_Success(chr.getAllFriends())));
                chr.chatPopup(String.format("Bạn đã thêm nhân vật '%s' vào danh sách '%s' kèm ghi chú '%s' với nick name là '%s'.", characterName, groupName, memo, nickName));
                break;
            }
            case Request_Accept: {
                int friendID = inPacket.decodeInt();
                boolean isOnline = true;
                Char targetChar = Server.get().getWorld().getCharById(friendID);
                //If cant find character in any channel then get from Database and online is false
                if (targetChar == null) {
                    targetChar = Char.getCharDataByID(friendID);
                    isOnline = false;
                    if (targetChar == null) {
                        //chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_Accept_Messenger)));
                        chr.chatPopup(String.format("Nhân vật %s không tồn tại.", friendID));
                        chr.dispose();
                        return;
                    }
                }
                Friend currentFriend = chr.getFriendByCharID(friendID);
                Friend targetFriend = targetChar.getFriendByCharID(chr.getId());
                if (currentFriend == null || targetFriend == null) {
                    chr.chatPopup(String.format("Nhân vật %s không tồn tại.", friendID));
                    chr.dispose();
                    return;
                }
                currentFriend.setFlag(isOnline ? FriendFlag.FriendOnline : FriendFlag.FriendOffline);
                if (isOnline) {
                    //If same channel then set 0
                    if (chr.getClient().getChannel() == targetChar.getClient().getChannel()) {
                        currentFriend.setChannelID(0);
                        targetFriend.setChannelID(0);
                    } else if (chr.getClient().getChannel() != targetChar.getClient().getChannel()) {
                        currentFriend.setChannelID(targetChar.getClient().getChannel());
                        targetFriend.setChannelID(chr.getClient().getChannel());
                    }
                    targetFriend.setFlag(FriendFlag.FriendOnline);
                    targetChar.chatPopup(String.format("%s đã đồng ý lời mời kết bạn của bạn.", chr.getName()));
                    targetChar.write(WvsContext.friendResult(FriendResult.response_Load_Success(targetChar.getAllFriends())));
                }
                chr.write(WvsContext.friendResult(FriendResult.response_Load_Success(chr.getAllFriends())));
                currentFriend.saveToSQL();
                targetFriend.saveToSQL();
                break;
            }
            case Request_AccountAccept: {
                int accountID = inPacket.decodeInt();
                boolean isOnline = true;
                Account targetAccount = Server.get().getWorld().getAccountByID(accountID);
                if (targetAccount == null) {
                    targetAccount = Account.getAccountFromSQLForFriendsByAccountID(accountID);
                    isOnline = false;
                    if (targetAccount == null) {
                        //chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_Accept_Unknown)));
                        chr.chatPopup(String.format("Nhân vật %s không tồn tại.", accountID));
                        chr.dispose();
                        return;
                    }
                }
                Account currentAccount = chr.getAccount();
                if (currentAccount == null) {
                    chr.chatPopup("Dữ liệu của bạn đã bị lỗi.");
                    chr.dispose();
                    return;
                }
                Friend currentFriend = currentAccount.getFriendByAccID(accountID);
                Friend targetFriend = targetAccount.getFriendByAccID(currentAccount.getId());
                if (currentFriend == null || targetFriend == null) {
                    chr.chatPopup(String.format("Tài khoản %s không tồn tại.", accountID));
                    chr.dispose();
                    return;
                }
                Char targetChar = targetAccount.getCurrentChr();
                if (targetChar == null && isOnline) {
                    chr.chatPopup("Nhân vật này đang ngoại tuyến hoặc không tồn tại.");
                    chr.dispose();
                    return;
                }
                currentFriend.setFlag(isOnline ? FriendFlag.AccountFriendOnline : FriendFlag.AccountFriendOffline);
                if (isOnline) {
                    //If same channel then set 0
                    if (chr.getClient().getChannel() == targetChar.getClient().getChannel()) {
                        currentFriend.setChannelID(0);
                        targetFriend.setChannelID(0);
                    } else if (chr.getClient().getChannel() != targetChar.getClient().getChannel()) {
                        currentFriend.setChannelID(targetChar.getClient().getChannel());
                        targetFriend.setChannelID(chr.getClient().getChannel());
                    }
                    targetFriend.setFlag(FriendFlag.AccountFriendOnline);
                    targetChar.chatPopup(String.format("%s đã đồng ý lời mời kết bạn của bạn.", chr.getName()));
                    targetChar.write(WvsContext.friendResult(FriendResult.response_Load_Success(targetChar.getAllFriends())));

                }
                chr.write(WvsContext.friendResult(FriendResult.response_Load_Success(chr.getAllFriends())));
                currentFriend.saveToSQL();
                targetFriend.saveToSQL();
                break;
            }
            case Request_Delete: //Đéo sài fuck Nexon
                break;
            case Request_AccountDelete: {
                int accountID = inPacket.decodeInt();
                boolean isOnline = true;
                boolean isCharacterFriend = false;

                //Get Friend Account (If not online get from Database)
                Account targetAccount = Server.get().getWorld().getAccountByID(accountID);
                if (targetAccount == null) {
                    targetAccount = Account.getAccountFromSQLForFriendsByAccountID(accountID);
                    isOnline = false;
                    if (targetAccount == null) {
                        //chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_Accept_Messenger)));
                        chr.chatPopup(String.format("Nhân vật %s không tồn tại.", accountID));
                        chr.dispose();
                        return;
                    }
                }
                //Get Your Account.
                Account currentAccount = chr.getAccount();
                if (currentAccount == null) {
                    chr.chatPopup("Dữ liệu của bạn đã bị lỗi.");
                    chr.dispose();
                    return;
                }
                //Get Your Friend.
                Friend currentFriend = currentAccount.getFriendByAccID(accountID);
                //Get You as a Friend.
                Friend targetFriend = targetAccount.getFriendByAccID(currentAccount.getId());
                //If null Check Friend from Character
                if (currentFriend == null) {
                    isCharacterFriend = true;
                    //Get Friend From Character.
                    for (Friend friend : chr.getAllFriends()) {
                        if (friend.getFriendAccountID() == accountID) {
                            currentFriend = friend;
                            break;
                        }
                    }
                    //Get You as Friend Character From that Account.
                    for (Friend friend : targetAccount.getAllFriends()) {
                        if (friend.getFriendAccountID() == currentAccount.getId()) {
                            targetFriend = friend;
                            break;
                        }
                    }
                    if (currentFriend == null) {
                        chr.chatPopup("Dữ liệu của bạn đã bị lỗi.");
                        chr.dispose();
                        return;
                    }
                } else if (targetFriend == null) {
                    chr.chatPopup("Dữ liệu của bạn đã bị lỗi.");
                    chr.dispose();
                    return;
                }
                if (!isCharacterFriend) {
                    currentAccount.removeFriend(currentFriend);
                    currentFriend.deleteFriendFromSQL();
                    chr.write(WvsContext.friendResult(FriendResult.response_Delete_Success(currentFriend)));
                    chr.write(WvsContext.friendResult(FriendResult.response_Load_Success(chr.getAllFriends())));

                    targetFriend.deleteFriendFromSQL();
                    if (isOnline) {
                        targetAccount.removeFriend(targetFriend);
                        targetAccount.getCurrentChr().write(WvsContext.friendResult(FriendResult.response_Delete_Success(targetFriend)));
                        targetAccount.getCurrentChr().write(WvsContext.friendResult(FriendResult.response_Load_Success(targetAccount.getCurrentChr().getAllFriends())));
                    }
                } else {
                    chr.removeFriend(currentFriend);
                    currentFriend.deleteFriendFromSQL();
                    chr.write(WvsContext.friendResult(FriendResult.response_Delete_Success(currentFriend)));
                    chr.write(WvsContext.friendResult(FriendResult.response_Load_Success(chr.getAllFriends())));

                    targetFriend.deleteFriendFromSQL();
                    if (isOnline) {
                        targetAccount.getCurrentChr().removeFriend(targetFriend);
                        targetAccount.getCurrentChr().write(WvsContext.friendResult(FriendResult.response_Delete_Success(targetFriend)));
                        targetAccount.getCurrentChr().write(WvsContext.friendResult(FriendResult.response_Load_Success(targetAccount.getCurrentChr().getAllFriends())));
                    }
                }
                break;
            }
            case Request_Rejected: {
                int friendID = inPacket.decodeInt();
                Friend currentFriend = chr.getFriendByCharID(friendID);
                if (currentFriend == null) {
                    //chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_Set_UnknownUser)));
                    chr.chatPopup(String.format("Nhân vật %d không tồn tại.", friendID));
                    chr.dispose();
                    return;
                }
                Char targetChar = Server.get().getWorld().getCharById(friendID);
                if (targetChar == null) {
                    targetChar = Char.getCharDataByID(friendID);
                    if (targetChar == null) {
                        //chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_Accept_Messenger)));
                        chr.chatPopup(String.format("Nhân vật %d không tồn tại.", friendID));
                        chr.dispose();
                        return;
                    }
                }
                Friend targetFriend = targetChar.getFriendByCharID(chr.getId());
                if (targetFriend == null) {
                    chr.chatPopup("Dữ liệu của bạn đã bị lỗi.");
                    chr.dispose();
                    return;
                }
                if (targetChar != null) {
                    targetChar.removeFriend(targetFriend);
                    targetChar.write(WvsContext.friendResult(FriendResult.response_Delete_Success(currentFriend)));
                }
                targetFriend.deleteFriendFromSQL();
                chr.write(WvsContext.friendResult(FriendResult.response_Delete_Success(currentFriend)));
                chr.removeFriend(currentFriend);
                currentFriend.deleteFriendFromSQL();
                break;
            }
            case Request_AccountRejected: {
                int accountID = inPacket.decodeInt();
                Account targetAccount = Server.get().getWorld().getAccountByID(accountID);
                if (targetAccount == null) {
                    targetAccount = Account.getAccountFromSQLForFriendsByAccountID(accountID);
                    if (targetAccount == null) {
                        //chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_Accept_Messenger)));
                        chr.chatPopup(String.format("Tài khoản %d không tồn tại.", accountID));
                        chr.dispose();
                        return;
                    }
                }
                Friend currentFriend = chr.getAccount().getFriendByAccID(accountID);
                if (currentFriend == null) {
                    //chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_Set_UnknownUser)));
                    chr.chatPopup(String.format("Tài khoản %d không tồn tại.", accountID));
                    chr.dispose();
                    return;
                }
                Friend targetFriend = targetAccount.getFriendByAccID(chr.getAccId());
                if (targetFriend == null) {
                    chr.chatPopup(String.format("Tài khoản %d không tồn tại.", chr.getAccId()));
                    chr.dispose();
                    return;
                }
                Char targetFriendChr = targetAccount.getCurrentChr();
                if (targetFriendChr != null) {
                    targetFriendChr.write(WvsContext.friendResult(FriendResult.response_Delete_Success(targetFriend)));
                }
                targetAccount.removeFriend(targetFriend);
                targetFriend.deleteFriendFromSQL();

                chr.write(WvsContext.friendResult(FriendResult.response_Delete_Success(currentFriend)));
                chr.getAccount().removeFriend(currentFriend);
                currentFriend.deleteFriendFromSQL();
                break;
            }
            case Request_AccountGroupModify: {
                int accountID = inPacket.decodeInt();
                Friend friend = chr.getAccount().getFriendByAccID(accountID);
                if (friend == null) {
                    chr.chatPopup(String.format("Tài khoản %d không tồn tại.", accountID));
                    chr.dispose();
                    return;
                }
                String groupName = inPacket.decodeString();
                friend.setGroup(groupName);
                friend.saveToSQL();
                chr.chatPopup(String.format("Thành công chuyển nhân vật '%s' vào danh sách '%s'.", friend.getName(), friend.getGroup()));
                chr.write(WvsContext.friendResult(FriendResult.response_Load_Success(chr.getAllFriends())));
                break;
            }
            case Request_Modify:
                break;
            case Request_LoginSet: {
                //Not sure about this need more information.
                break;
            }
            case Request_LogoutSet: {
                //Not sure about this need more information.
//                for(Friend friend : chr.getAllFriends()){
//                    boolean isOnline = true;
//                    Account targetAccount = Server.getInstance().getWorld().getAccountByID(friend.getFriendAccountID());
//                    if(targetAccount == null){
//                        targetAccount = Account.getFromDBById(friend.getFriendAccountID());
//                        isOnline = false;
//                        if (targetAccount == null) {
//                            chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_Accept_Unknown)));
//                            return;
//                        }
//                    }
//                    Friend targetFriend = targetAccount.getFriendByAccID(chr.getAccId());
//                    if(targetFriend == null){
//                        return;
//                    }
//                    if(targetFriend.isAccount()){
//                        targetFriend.setFlag(FriendFlag.AccountFriendOffline);
//                    }
//                    else if(!targetFriend.isAccount()){
//                        targetFriend.setFlag(FriendFlag.FriendOffline);
//                    }
//                    if(isOnline){
//                        targetAccount.getCurrentChr().write(WvsContext.friendResult(FriendResult.response_Load_Success(targetAccount.getCurrentChr().getAllFriends())));
//                    }
//                }
                break;
            }
            case Request_AccountConvert: {
                int targetCharID = inPacket.decodeInt();
                Char targetChar = Server.get().getWorld().getCharById(targetCharID);
                boolean isOnline = true;
                if (targetChar == null) {
                    isOnline = false;
                    targetChar = Char.getCharDataByID(targetCharID);
                    if (targetChar == null) {
                        chr.chatPopup(String.format("Nhân vật %d không tồn tại.", targetCharID));
                        chr.dispose();
                        return;
                    }
                }
                Friend currentFriend = chr.getFriendByCharID(targetCharID);
                if (currentFriend == null) {
                    chr.chatPopup(String.format("Nhân vật %d không tồn tại.", targetCharID));
                    chr.dispose();
                    return;
                }
                Friend targetFriend = targetChar.getFriendByCharID(chr.getId());
                if (targetFriend == null) {
                    chr.chatPopup("Dữ liệu của bạn đã bị lỗi.");
                    chr.dispose();
                    return;
                }
                chr.removeFriend(currentFriend);
                currentFriend.deleteFriendFromSQL();

                targetChar.removeFriend(targetFriend);
                targetFriend.deleteFriendFromSQL();

                Friend newCurrentFriend = new Friend();
                newCurrentFriend.setOwnerAccID(chr.getAccId());
                newCurrentFriend.setFriendID(targetChar.getId());
                newCurrentFriend.setFriendAccountID(targetChar.getAccId());
                newCurrentFriend.setGroup(currentFriend.getGroup());
                newCurrentFriend.setMemo(currentFriend.getMemo());
                newCurrentFriend.setName(currentFriend.getName());
                newCurrentFriend.setNickname(currentFriend.getName());
                newCurrentFriend.setFlag(currentFriend.getFlag() == 3 ? (byte) 7 : (byte) 8);
                newCurrentFriend.setMobile(currentFriend.getMobile());
                chr.getAccount().addFriend(newCurrentFriend);
                newCurrentFriend.saveToSQL();

                Friend newTargetFriend = new Friend();
                newTargetFriend.setOwnerAccID(targetChar.getAccId());
                newTargetFriend.setFriendID(chr.getId());
                newTargetFriend.setFriendAccountID(chr.getAccId());
                newTargetFriend.setGroup(targetFriend.getGroup());
                newTargetFriend.setMemo(targetFriend.getMemo());
                newTargetFriend.setName(targetFriend.getName());
                newTargetFriend.setNickname(targetFriend.getName());
                newTargetFriend.setFlag(targetFriend.getFlag() == 3 ? (byte) 7 : (byte) 8);
                newTargetFriend.setMobile(targetFriend.getMobile());
                targetChar.getAccount().addFriend(newTargetFriend);
                newTargetFriend.saveToSQL();

                chr.chatPopup(String.format("Thành công chuyển %s vào Bạn bè của cả tài khoản!", currentFriend.getName()));
                chr.write(WvsContext.friendResult(FriendResult.response_Load_Success(chr.getAllFriends())));
                if (isOnline) {
                    targetChar.write(WvsContext.friendResult(FriendResult.response_Load_Success(targetChar.getAllFriends())));
                }
                break;
            }
            case Request_IncreaseMaxSlot: {
                CharacterStat characterStat = chr.getAvatarData().getCharacterStat();
                if (characterStat.getMaxFriends() == FriendConstant.MAX_FRIEND_SLOT) {
                    //chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_Set_CurrentSlotFull)));
                    chr.chatPopup("Nhân vật của bạn đã có số lượng bạn bè tối đa.");
                    chr.dispose();
                    return;
                }
                if (chr.getMoney() < FriendConstant.MESO_COST) {
                    //chr.write(WvsContext.friendResult(FriendResult.msg(FriendType.Response_IncreaseMaxSlot_Messenger)));
                    chr.chatPopup("Bạn không đủ tiền meso để mở rộng số lượng bạn bè.");
                    chr.dispose();
                    return;
                }
                characterStat.addMaxFriends(FriendConstant.EXTEND_SLOT_PER_TIME);
                chr.deductMoney(FriendConstant.MESO_COST);
                chr.write(WvsContext.friendResult(FriendResult.response_IncreaseMaxSlot_Success((byte) characterStat.getMaxFriends())));
                characterStat.updateCharacterMaxFriendsToSQL();
                break;
            }
            default:
                System.out.printf("Unhandled friend request type %s%n", friendType);
                break;
        }
        chr.dispose();
    }
}
