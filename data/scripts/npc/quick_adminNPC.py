from net.swordie.ms.enums import UIType
from net.swordie.ms.constants import ItemConstants
from net.swordie.ms.constants import JobConstants
from net.swordie.ms.constants import QuestConstants
from net.swordie.ms.enums import InvType
from net.swordie.ms.client.character.items import EquipAttribute
from net.swordie.ms.loaders import StringData
from net.swordie.ms.loaders import ItemData
from net.swordie.ms.constants import FieldConstants
import sys
for p in ["data/scripts/npc", "data/scripts"]:
    if p not in sys.path:
        sys.path.append(p)

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
menu_text = "#fs13#Hello, #h0#! I am the Maple Administrator. How may I assist you today?\r\n\r\n"
menu_text += "#e#d=== Travel & Warping Services (Warp Center) ===#k#n\r\n"
menu_text += "#b#L26##e#b[Universal Warp Service]#k#n Fast Travel to Major Towns, Grandis, Arcane River & Popular Training Fields.#l\r\n"
menu_text += "#L30##e#r[Boss Arena & Boss Warp]#k#n Fast Warp to all Bosses up to Kaling Extreme (Scaled Meso Fee).#l\r\n"
menu_text += "#L25##e#g[Dimensional Mirror]#k#n Fast Travel to Party Quests, Theme Dungeons & Event Areas.#l\r\n\r\n"
menu_text += "#e#d=== Featured Services ===#k#n\r\n"
menu_text += "#b#L50##e#d[Cash & Point Shop]#k#n Cubes, Flames, Pets, Beauty & Fashion (Male / Female / Unisex).#l\r\n"
menu_text += "#L40##e#g[Potion & Buff Depot]#k#n Bulk Potions (x1000) & Combat Buffs.#l\r\n"
menu_text += "#L20##e#r[Starter Package]#k#n 100k DP, 1M Cash Points, Vac Pet #r(1x per account)#k.#l\r\n\r\n"
menu_text += "#e#d=== Character & System Tools ===#k#n\r\n"
menu_text += "#b#L14#Fast Job Advancement.#l\r\n"
menu_text += "#L21#Unlock 5th Job (Job V).#l\r\n"
menu_text += "#L22#Unlock 6th Job (Job VI).#l\r\n"
menu_text += "#L16#Max all skills (1st - 4th Job).#l\r\n"
menu_text += "#L5#Complete all Boss Prequests.#l\r\n"
menu_text += "#L13#Upgrade Mechanical Heart (Required: #i1672020#).#l\r\n"
menu_text += "#L12#Check Your MVP Status.#l\r\n"
menu_text += "#L0#Remove Cash Item(s).#l\r\n"
is_ohk = False
try:
    is_ohk = chr.isOneHitKill()
except:
    is_ohk = False
menu_text += "#L99##r[Toggle One-Hit Kill Mode]#k (Current: #e" + ("#rON#k" if is_ohk else "#gOFF (Normal Real Damage)#k") + "#n)#l\r\n"
selection = sm.sendNext(menu_text)

if selection == 50:
    import sys
    for p in ["data/scripts/npc", "data/scripts"]:
        if p not in sys.path:
            sys.path.append(p)
    if 'point_shop' in sys.modules:
        reload(sys.modules['point_shop'])
        import point_shop
    else:
        import point_shop
    point_shop.open_point_shop(sm, chr)
elif selection == 30:
    import sys
    for p in ["data/scripts/npc", "data/scripts"]:
        if p not in sys.path:
            sys.path.append(p)
    if 'boss_arena' in sys.modules:
        reload(sys.modules['boss_arena'])
        import boss_arena
    else:
        import boss_arena
    boss_arena.open_boss_arena(sm, chr)
elif selection == 26:
    import sys
    for p in ["data/scripts/npc", "data/scripts"]:
        if p not in sys.path:
            sys.path.append(p)
    if 'warp_service' in sys.modules:
        reload(sys.modules['warp_service'])
        import warp_service
    else:
        import warp_service
    warp_service.open_warp_service(sm, chr)
elif selection == 40:
    import sys
    for p in ["data/scripts/npc", "data/scripts"]:
        if p not in sys.path:
            sys.path.append(p)
    if 'potion_shop' in sys.modules:
        reload(sys.modules['potion_shop'])
        import potion_shop
    else:
        import potion_shop
    potion_shop.open_potion_shop(sm, chr)
elif selection == 25:
    open_dimensional_mirror()
elif selection == 0:
    sm.removeCashItems()
elif selection == 1:
    open_ignored_items()
elif selection == 2:
    open_background_setting()
elif selection == 20:
    STARTER_QUEST = 99990
    user = chr.getUser()
    already_claimed = False

    if chr.getQRValueByKey(STARTER_QUEST, "claimed") == "1" or sm.hasQuestCompleted(STARTER_QUEST):
        already_claimed = True
    if user != None and user.getMsg2() == 1:
        already_claimed = True

    if already_claimed:
        sm.sendSayOkay("#fs13##e#r[Starter Package Already Claimed]#k#n\r\n\r\n"
                       "You have already claimed your Starter Package on this account!\r\n\r\n"
                       "#d(Notice: The 100,000 DP, 1,000,000 Cash Points, and Vac Pet can only be claimed once per account.)#k")
    else:
        if user != None:
            user.addDonationPoint(100000)
            user.setMsg2(1)
            user.updateUserToSQL()
        chr.addMaplePoint(1000000)
        chr.addItemToInventory(5002396, 1, "day", 30)
        chr.setQRValueByKey(STARTER_QUEST, "claimed", "1")
        sm.completeQuest(STARTER_QUEST)

        sm.sendSayOkay("#fs13##e#b[Starter Package Claimed Successfully!]#k#n\r\n\r\n"
                       "You have received:\r\n"
                       "- #b100,000 Donation Points (DP)#k\r\n"
                       "- #b1,000,000 Cash Points (NX / Maple Points)#k\r\n"
                       "- #b1x Vac Pet (30 Days)#k #i5002396#\r\n\r\n"
                       "#r* Note: This package has been registered to your account and cannot be claimed again.#k")
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
    if chr != None and chr.getJobHandler() != None:
        chr.getJobHandler().handleJobAdvance()
    else:
        sm.sendSayOkay("Unable to process Job Advancement at this time.")
elif selection == 16:
    chr.maxSkills()
    sm.sendSayOkay("All skills (1st - 4th Job) have been maxed!")
elif selection == 99:
    current_ohk = False
    try:
        current_ohk = chr.isOneHitKill()
    except:
        current_ohk = False
    new_ohk = not current_ohk
    try:
        chr.setOneHitKill(new_ohk)
    except:
        pass
    status_str = "#rENABLED (ON)#k" if new_ohk else "#bDISABLED (OFF - Real Damage Mode)#k"
    sm.sendSayOkay("#fs13##e[One-Hit Kill Mode]#n\r\n\r\n"
                   "One-Hit Kill mode is now: " + status_str + "\r\n\r\n"
                   "#d(When OFF: Attacks use normal, real damage calculated from character stats & gear.)#k")