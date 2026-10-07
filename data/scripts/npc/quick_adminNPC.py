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
selection = sm.sendNext("#fs13#Hello, #h0#. I am the Maple Administrator. How may I assist you today?\r\n" +
                        "#b" +
                        "#L20#Claim Starter / Testing Gift Package.#l\r\n" +
                        "#L21#Unlock 5th Job (Job V).#l\r\n" +
                        "#L22#Unlock 6th Job (Job VI).#l\r\n" +
                        "#L16#Max all skills (1st - 4th Job).#l\r\n" +
                        "#L14#Fast Job Advancement.#l\r\n" +
                        "#L5#Complete all Boss Prequests.#l\r\n" +
                        "#L9#Purchase items with #eDonation Points.#n#l\r\n" +
                        "#L10#Change Hairstyle with #eDonation Points.#n#l\r\n" +
                        "#L11#Change Face Style with #eDonation Points.#n#l\r\n" +
                        "#L12#Check Your #e#rMVP#k#n #bStatus.#l\r\n" +
                        "#L13#Upgrade Mechanical Heart (Required: #i1672020#).#l\r\n" +
                        "#L0#Remove Cash Item(s).#l\r\n\r\n" +
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
    chr.addItemToInventory(5002396, 1, "day", 30)
    sm.sendSayOkay("You have received 3M Maple Points (NX), 10B Mesos, and a Vac Pet (30 Days)!")
elif selection == 21:
    for qid in range(1460, 1466):
        sm.completeQuest(qid)
    sm.sendSayOkay("5th Job prequests have been unlocked!")
elif selection == 22:
    chr.completeQuest(1488)
    sm.sendSayOkay("6th Job prequests have been unlocked!")
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
    sm.sendSayOkay("All Boss prequests have been successfully completed!")
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
    if chr.getLevel() >= 200 and not sm.hasQuestCompleted(1465):
        chr.completeQuest(1465)
    chr.getJobHandler().handleJobAdvance()
elif selection == 16:
    chr.maxSkills()
    sm.sendSayOkay("All skills (1st - 4th Job) have been maxed!")