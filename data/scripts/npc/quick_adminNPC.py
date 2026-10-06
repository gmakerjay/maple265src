from net.swordie.ms.enums import UIType
from net.swordie.ms.constants import ItemConstants
from net.swordie.ms.constants import JobConstants
from net.swordie.ms.constants import QuestConstants
from net.swordie.ms.enums import InvType
from net.swordie.ms.client.character.items import EquipAttribute
from net.swordie.ms.loaders import StringData
from net.swordie.ms.loaders import ItemData
from net.swordie.ms.constants import FieldConstants

DAME = 9010106
NPC = 9010000
BOSS_PREQUEST = [40905, 30007, 3170, 31198, 31179, 7313 ,31851, 31833, 31686, 31498, 3521 ,31152, 33294, 33565, 34015, 17523, 58913, 58955]

# Function definitions...

sm.setSpeakerID(NPC)
selection = sm.sendNext("#fs13#Xin chào, #h0#. Tôi là Maple Administrator. Bạn muốn tôi giúp gì nào?\r\n" +
                        "#b" +
                        #"#L1#Adjust Equipment.#l\r\n" +
                        #"#L2#Adjust Background.#l\r\n" +
                        #"#L3#Open Event Name Tag.#l\r\n" +
                        #"#L14#Chuyển nghề nhanh.#l\r\n" +
                        "#L20#Nhận quà thử nghiệm.#l\r\n" +
                        "#L21#Mở khoá Job V.#l\r\n" +
                        "#L22#Mở khoá Job VI.#l\r\n" +
                        "#L16#Tối đa các kỹ năng của bạn (Chỉ từ nghề I - IV).#l\r\n" +
                        #"#L0#Remove Cash Item(s).#l\r\n" +
                        #"#L4#Remove Eqp for Kaiser and Mihile.#l\r\n" +
                        "#L5#Hoàn thành tất cả nhiệm vụ yêu cầu của Boss.#l\r\n" +
                        #"#L6#Adjust Tradeable Items.#l\r\n" +
                        #"#L9#Purchase Items with #eDonation Points.#n#l\r\n" +
                        #"#L10#Change Hair Color with #eDonation Points.#n#l\r\n" +
                        #"#L11#Change Outfit with #eDonation Points.#n#l\r\n" +
                        #"#L12#Check Your #e#rMVP#k#n #bStatus.#l\r\n" +
                        #"#L13#Upgrade Mechanical Heart. (Required: #i1672020#)#l\r\n\r\n" +
                        "#k")
if selection == 0:
    sm.removeCashItems()
elif selection == 1:
    open_ignored_items()
elif selection == 2:
    open_background_setting()
elif selection == 20:
    chr.addMaplePoint(3000000)
    sm.giveMesos(10000000000)
    chr.addItemToInventory(5002396,1,"day",30)
    sm.sendSayOkay("Bạn đã nhận 3M nx, 10B và Pet Vac (30 ngày)")
elif selection == 21:
    for qid in range(1460, 1466):
        sm.completeQuest(qid)
elif selection == 22:
    chr.completeQuest(1488)
elif selection == 3:
    sm.openUI(UIType.UI_EVENT_NAME_TAG)
elif selection == 4:
    if JobConstants.isKaiser(chr.getJob()) or JobConstants.isMihile(chr.getJob()):
        if chr.getLevel() < 30:
            sm.sendSayOkay("Please level up to 30.")
        else:
            for item in chr.getEquippedInventory().getItems():
                if item.getItemId() == 1352500 or item.getItemId() == 1098000 or item.getItemId() == 1098001 or item.getItemId() == 1098002:
                    chr.consumeItem(item)
                    break
    else:
        sm.sendSayOkay("You are not a Kaiser or Mihile!")
elif selection == 5:
    for quest in BOSS_PREQUEST:
        if not sm.hasQuestCompleted(quest):
            sm.completeQuestNoRewards(quest)
    if sm.hasQuest(34331) or sm.hasQuestCompleted(34330):
        sm.completeQuest(34331)
elif selection == 6:
    open_make_item_tradable()
elif selection == 7:
    if chr.getLevel() >= 33:
        sm.warp(FieldConstants.MAPLE_GALAXY)
    else:
        sm.sendSayOkay("Only characters level 33 or above can participate in the Maple Galaxy event.")
elif selection == 9:
    sm.openShop(9010038)
elif selection == 10:
    sm.giveCharacterLookByXuVang(True)
elif selection == 11:
    sm.giveCharacterLookByXuVang(False)
elif selection == 12:
    sm.checkMVPStatus()
elif selection == 13:
    sm.upgradeMechanicalHeart()
elif selection == 14:
    if chr.getLevel >= 200 and not sm.hasQuestCompleted(1465):
        chr.completeQuest(1465)
    chr.getJobHandler().handleJobAdvance()
elif selection == 16:
    chr.maxSkills()