package net.swordie.ms.world.partyquest;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.client.social.Party.PartyMember;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.enums.UIType;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.world.field.Instance;

public class DragonRider implements PartyQuest {

    private final ScriptManagerImpl sm;
    private final Char chr;
    private final Party party;
    private final int entryQuest = 1210;

    public DragonRider(Char chr) {
        this.sm = chr.getScriptManager();
        this.chr = chr;
        this.party = chr.getParty();
    }

    private boolean isPartyEligible(short lowLevel, short highLevel, Party party) {
        for (PartyMember member : party.getMembers()) {
            if (member.getLevel() < lowLevel || member.getLevel() > highLevel) {
                return false;
            }
        }
        return true;
    }

    @Override
    public void start() {
        sm.setSpeakerID(9020016);
        int selection = sm.sendNext("#e<Nhi½m vî nhóm: Cïåi rÓng>#n\r\nGiúp mØt ông già ra ngoài, «ïæc không? Ðánh b¢i Dragon Rider và mang l¢i hÆa b¾nh cho Leafre!\r\n\r\n#b" +
                "#L0#1. BïÜc vào Crimson Sky Dock. (C¬p «Ø 150+ / nhóm ít nh¬t 3 ngïßi)#l\r\n" +
                "#L1#2. Tìm nhóm.#l\r\n" +
                "#L2#3. Tôi muÑn t¾m hiºu thêm#l\r\n" +
                "#L3#4. Tôi cÆn «i «ïæc bao nhiêu lïæt nøa hôm nay?#l#k");
        switch (selection) {
            case 0:
                if (party == null) {
                    sm.sendSayOkay("Hãy tạo nhóm để tiếp tục.");
                } else if (!party.isLeader(chr)) {
                    sm.sendSayOkay("in hãy để người lãnh đạo nhóm của bạn nói chuyện với tôi.");
                } else if (sm.checkPartyForPQ()) {
                    if (isPartyEligible((short) 150, (short) 275, party)) {
                        if (sm.checkAttempt(entryQuest, party)) {
                            sm.warpInstanceIn(chr, GameConstants.DRAGON_RIDER_FIRST_STAGE, true);
                            sm.setInstanceTime(GameConstants.DRAGON_RIDER_TIME, 910002000);
                            sm.setAchieveRatio(0);
                            chr.getParty().setPartyQuest(this);
                            sm.addAttempt(entryQuest, party);
                            return;
                        } else {
                            sm.sendSayOkay("MØt trong nhøng thành viên trong nhóm «» hªt lïæt vào nhi½m vî nóm này.");
                        }
                    } else {
                        sm.sendSayOkay("Ai «ó trong nhóm cça b¢n không «¢t c¬p 150 chïa. B¢n ph¡i «¢t c¬p 150 ho¶c cao hÛn!");
                    }
                }
                break;
            case 1:
                sm.openUI(UIType.UI_PARTY_INVITATION);
                break;
            case 2:
                sm.sendSayOkay("Vào #bCrimson Sky Doorway#k và t¾m hiºu danh tính cça #rCïåi rÓng#k. S÷ dîng k¸ n£ng #bFlying#k «º bay vút qua b®u trßi và «uÖi theo lë Wyvern «º t¾m h¤n.\r\n #e- C¬p «Ø#n: 150 trä lên #r(C¬p «Ø khuyªn nghÅ: 150 - 169)#k\r\n#e- GiÜi h¢n thßi gian#n: 30 phút\r\n#e- Ngïßi chÛi#n: 3-6 \r\n#e- Yêu c®u#n: K¸ n£ng bay");
                break;
            case 3:
                int count = 5;
                if (chr.hasQuest(entryQuest)) {
                    count = 5 - Integer.parseInt(chr.getQRValueByKey(entryQuest, "count"));
                }
                sm.sendSayOkay("B¢n có thº th÷ thách thêm " + count + " l®n nøa.");
                break;
        }
    }

    @Override
    public void exit() {
        if (sm.sendAskYesNo("Bạn có muốn rút lui không?")) {
            sm.setAchieveRatio(0, false);
            sm.warpInstanceOut(chr, 910002000);
        }
    }

    @Override
    public void event() {
        if (sm.getFieldID() == 240080400) {
            sm.warpParty(sm.getFieldID() + 100, party);
        } else {
            Instance instance = party.getInstance();
            int stage = (sm.getFieldID() % 1000) / 100;
            if (instance.hasProperty("escape" + stage + "clear")) {
                sm.warpParty(sm.getFieldID() + 100, party);
            } else {
                sm.chat("Chïa thº tiªp tîc, h»y hoàn thành màn này «».");
            }
        }
    }

    @Override
    public void end(Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.setAchieveRatio(0);
        sm.warpInstanceOut(chr, 910002000);
    }

    @Override
    public void clear(Char chr) {
    }

    @Override
    public void leftOrDisband(Char chr) {
        end(chr);
    }
}