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

def open_dimensional_mirror():
    CATEGORIES = [
        ("Daily Dungeons & Boss Areas", [
            ("Monster Park", 951000000, "Massive daily EXP and coin rewards"),
            ("Root Abyss", 910700200, "Pierre, Von Bon, Crimson Queen, Vellum"),
            ("Gollux", 863010000, "Corrupted Tree Titan & Superior Accessories"),
            ("Ursus the Destroyer", 970072200, "18-Player Boss Raiding Field"),
            ("Mu Lung Dojo", 925020000, "Test your limits against 80 floors of bosses"),
        ]),
        ("Party Quests & Special Challenges", [
            ("Party Quest Entrance", 910002000, "Hub for Tangyoon, Romeo, Lord Pirate, etc."),
            ("Tower of Oz", 992000000, "Undersea dungeon tower with Ring rewards"),
            ("Dimension Invasion", 940020000, "Defend Maple World against invading troops"),
            ("Ghost Park", 956100000, "Survival challenge against folk ghosts"),
            ("Princess No Party Quest", 811000000, "Challenge Princess No for secondary weapons"),
            ("Evolution Lab", 957000000, "Customizable virtual training grounds"),
        ]),
        ("Theme Dungeons & Story Areas", [
            ("The Afterlands", 867113100, "Lands of Rest, Warriors, Riches, and Contemplation"),
            ("FriendStory", 100000004, "Modern Maple spin-off adventure"),
            ("Commerci Republic", 865000001, "Commerci trade expeditions & Sweetwater gear"),
            ("Crimsonheart Castle", 610030010, "Masteria fortress & Demon training grounds"),
            ("Ereve Conference Pavilion", 913050010, "Black Heaven & Heroes of Maple Blockbusters"),
            ("Mushroom Shrine (Zipangu)", 800000000, "Japanese town & Mushroom Shrine Tales"),
            ("New Leaf City", 600000000, "Masteria futuristic metropolis"),
            ("Alien Visitor", 861000000, "Alien invasion mini-dungeon"),
            ("Grand Athenaeum", 302000000, "Historical records & quest storylines"),
            ("Event Hall", 820000000, "Event NPCs and reward exchanges"),
            ("Fight for Azwan", 262010000, "Ancient underground city of Azwan"),
        ])
    ]

    menu_text = "#fs13#Where would you like to travel via the #bDimensional Mirror#k?\r\n\r\n"
    for i, (cat_name, items) in enumerate(CATEGORIES):
        menu_text += "#L" + str(i) + "##b" + cat_name + "#k (" + str(len(items)) + " locations)#l\r\n"
    menu_text += "#L99##dShow All Destinations (A-Z)#k#l\r\n"

    cat_sel = sm.sendNext(menu_text)

    selected_list = []
    if cat_sel == 99:
        for _, items in CATEGORIES:
            selected_list.extend(items)
        selected_list.sort(key=lambda x: x[0])
    elif 0 <= cat_sel < len(CATEGORIES):
        selected_list = CATEGORIES[cat_sel][1]

    if selected_list:
        dest_text = "#fs13#Select your destination:\r\n\r\n"
        for idx, (name, map_id, desc) in enumerate(selected_list):
            dest_text += "#L" + str(idx) + "##e#b" + name + "#k#n - #fs11#" + desc + "#fs13##l\r\n"
        
        dest_sel = sm.sendNext(dest_text)
        if 0 <= dest_sel < len(selected_list):
            dest_name, dest_map, _ = selected_list[dest_sel]
            if chr.getFieldID() != dest_map:
                sm.setReturnField(chr.getFieldID())
                sm.warp(dest_map)
            else:
                sm.sendSayOkay("You are already at #b" + dest_name + "#k.")

sm.setSpeakerID(NPC)
selection = sm.sendNext("#fs13#Hello, #h0#. I am the Maple Administrator. How may I assist you today?\r\n" +
                        "#b" +
                        "#L30##e#r[Offline Boss Arena]#k#n Instant Boss Battles (Solo / No Limits).#l\r\n" +
                        "#L25##e#r[Dimensional Mirror]#k#n Fast Travel (Bosses, Dungeons, Cities).#l\r\n" +
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
if selection == 30:
    import boss_arena
    boss_arena.open_boss_arena(sm, chr)
elif selection == 25:
    open_dimensional_mirror()
elif selection == 0:
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