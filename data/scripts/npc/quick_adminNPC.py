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
NPC = 9010000 # Maple Administrator (Classic standard NPC)
BOSS_PREQUEST = [40905, 30007, 3170, 31198, 31179, 7313, 31851, 31833, 31686, 31498, 3521, 31152, 33294, 33565, 34015, 17523, 58913, 58955]

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

    while True:
        menu_text = "#fs13#Where would you like to travel via the #bDimensional Mirror#k?\r\n\r\n"
        for i, (cat_name, items) in enumerate(CATEGORIES):
            menu_text += "#L" + str(i) + "##b" + cat_name + "#k (" + str(len(items)) + " locations)#l\r\n"
        menu_text += "#L99##dShow All Destinations (A-Z)#k#l\r\n"
        menu_text += "#L1000##r[Back to Main NPC Menu]#k#l\r\n"

        cat_sel = sm.sendNext(menu_text)
        if cat_sel == 1000 or cat_sel < 0:
            return

        selected_list = []
        category_title = ""
        if cat_sel == 99:
            category_title = "All Destinations (A - Z)"
            for _, items in CATEGORIES:
                selected_list.extend(items)
            selected_list.sort(key=lambda x: x[0])
        elif 0 <= cat_sel < len(CATEGORIES):
            category_title = CATEGORIES[cat_sel][0]
            selected_list = CATEGORIES[cat_sel][1]
        else:
            return

        if selected_list:
            while True:
                dest_text = "#fs14##e#b[" + category_title + "]#k#n\r\n"
                dest_text += "#fs12#Select your destination:\r\n\r\n"
                for idx, (name, map_id, desc) in enumerate(selected_list):
                    dest_text += "#L" + str(idx) + "##e#b" + name + "#k#n - #fs11#" + desc + "#fs12##l\r\n"
                dest_text += "#L999##r[Back to Mirror Categories]#k#l\r\n"
                
                dest_sel = sm.sendNext(dest_text)
                if dest_sel == 999 or dest_sel < 0:
                    break
                if 0 <= dest_sel < len(selected_list):
                    dest_name, dest_map, _ = selected_list[dest_sel]
                    if chr.getFieldID() != dest_map:
                        sm.setReturnField(chr.getFieldID())
                        sm.warp(dest_map)
                        return
                    else:
                        sm.sendSayOkay("You are already at #b" + dest_name + "#k.")

sm.setSpeakerID(NPC)

while True:
    menu_text = "#fs13#Greetings, #h0#! I am the #bMaple Administrator#k.\r\n"
    menu_text += "Welcome to the central server operations and utility hub! How may I assist you today?\r\n\r\n"
    menu_text += "#e#d=== Travel & Warping Services (Warp Center) ===#k#n\r\n"
    menu_text += "#b#L26##e[Universal Warp Center]#n#k Fast travel to Major Towns, Grandis, Arcane River & Training Maps (by Hoyoung).#l\r\n"
    menu_text += "#r#L30##e[Boss Arena & Boss Warp]#n#k Instant warp and challenge all bosses up to Kaling Extreme & Limbo (by Seren).#l\r\n"
    menu_text += "#g#L25##e[Dimensional Mirror]#n#k Dimensional Gate for Party Quests, Monster Park & Theme Dungeons.#l\r\n\r\n"
    menu_text += "#e#d=== Merchant & Specialty Services (Shops) ===#k#n\r\n"
    menu_text += "#g#L40##e[General Store & Boss Buff Depot]#n#k Utility supplies, balanced 100% Elixirs & 10x Boss Buff bundles (by Adele).#l\r\n"
    menu_text += "#b#L60##e[Pet Sanctuary & Pet Skills]#n#k Vacuum Pets, Pet Food, Water of Life & Auto Pet Skills (by Lara).#l\r\n"
    menu_text += "#d#L50##e[Cash & Fashion Boutique]#n#k Cubes, Rebirth Flames, Massive Fashion Outfits & Royal Beauty (by Lucid).#l\r\n"
    menu_text += "#r#L20##e[Starter Package]#n#k Claim 100k DP, 1M Cash Points, and a 30-Day Vac Pet #r(1x per account)#k.#l\r\n\r\n"
    menu_text += "#e#d=== Character & Progression Tools ===#k#n\r\n"
    menu_text += "#r#L23##e[Super Buff All (2 Hours)]#n#k Apply all 20+ God-Tier Combat & Farming Buffs in 1 Click!#l\r\n"
    menu_text += "#b#L14#Fast Job Advancement.#l\r\n"
    menu_text += "#L21#Unlock 5th Job (V-Matrix System).#l\r\n"
    menu_text += "#L22#Unlock 6th Job (HEXA Matrix System).#l\r\n"
    menu_text += "#L5#Complete All Boss Prequests.#l\r\n"
    menu_text += "#L13#Upgrade Mechanical Heart (Requires #i1672020#).#l\r\n"
    menu_text += "#L12#Check Your MVP Tier & Status.#l\r\n"
    menu_text += "#L0#Remove Unwanted Cash Items.#l\r\n"
    is_ohk = False
    try:
        is_ohk = chr.isOneHitKill()
    except:
        is_ohk = False
    menu_text += "#L99##r[Admin One-Hit Kill Mode]#k (Status: #e" + ("#rENABLED (ON)#k" if is_ohk else "#gDISABLED (OFF - Real Damage)#k") + "#n)#l\r\n"
    menu_text += "#L1000##r[Close Menu / Exit]#k#l\r\n"

    selection = sm.sendNext(menu_text)
    if selection == 1000 or selection < 0:
        break

    if selection == 50:
        if 'point_shop' in sys.modules:
            reload(sys.modules['point_shop'])
            import point_shop
        else:
            import point_shop
        point_shop.open_point_shop(sm, chr)
    elif selection == 30:
        if 'boss_arena' in sys.modules:
            reload(sys.modules['boss_arena'])
            import boss_arena
        else:
            import boss_arena
        boss_arena.open_boss_arena(sm, chr)
    elif selection == 26:
        if 'warp_service' in sys.modules:
            reload(sys.modules['warp_service'])
            import warp_service
        else:
            import warp_service
        warp_service.open_warp_service(sm, chr)
    elif selection == 40:
        if 'potion_shop' in sys.modules:
            reload(sys.modules['potion_shop'])
            import potion_shop
        else:
            import potion_shop
        potion_shop.open_potion_shop(sm, chr)
    elif selection == 60:
        if 'pet_shop' in sys.modules:
            reload(sys.modules['pet_shop'])
            import pet_shop
        else:
            import pet_shop
        pet_shop.open_pet_shop(sm, chr)
    elif selection == 25:
        open_dimensional_mirror()
    elif selection == 0:
        sm.removeCashItems()
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
        try:
            chr.initMatrixSlots()
            if chr.getJobHandler() != None:
                chr.getJobHandler().GiveVSkills()
        except:
            pass
        sm.sendSayOkay("5th Job (V Matrix) has been unlocked and V Skills granted!")
    elif selection == 22:
        chr.completeQuest(1488)
        try:
            from net.swordie.ms.connection import OutPacket
            from net.swordie.ms.handlers.header import OutHeader
            from net.swordie.ms.enums import MessageType
            from net.swordie.ms.util import FileTime
            outPacket = OutPacket(OutHeader.MESSAGE)
            outPacket.encodeByte(MessageType.QUEST_RECORD_MESSAGE.getVal())
            outPacket.encodeInt(1488)
            outPacket.encodeByte(2)
            outPacket.encodeFT(FileTime.currentTime())
            chr.write(outPacket)
        except:
            pass
        try:
            if chr.getJobHandler() != None and JobConstants.isSia(chr.getJob()):
                chr.getJobHandler().unlockErdaLink()
        except:
            pass
        sm.sendSayOkay("6th Job (HEXA Matrix) has been unlocked!")
    elif selection == 23:
        try:
            from net.swordie.ms.client.character.commands import AdminCommands
            AdminCommands.giveBuffAll(chr)
            sm.sendSayOkay("#fs13##e#b[Super Buff All Applied Successfully!]#k#n\r\n\r\n"
                           "All 20+ God-Tier Combat, Farming, and Bossing buffs have been granted for #r2 Hours#k!\r\n\r\n"
                           "- #b+260+ Weapon & Magic ATT#k (Onyx Apple, Adv Hero, Extreme Red/Blue, MVP, Guild)\r\n"
                           "- #r+50% Boss Damage & +50% IED#k (Adv Boss Rush, Penetrating, Noblesse)\r\n"
                           "- #g+2 Attack Speed Stages#k (Decent SI + Extreme Green - Breaks Cap)\r\n"
                           "- #d+55% Bonus EXP & +44% Item Drop Rate#k (Decent HS, EAP, Gold, WAP)\r\n"
                           "- #e+60% Max HP/MP + 4,700 HP/MP#n, 140% Speed, 120% Jump, +15% All Stats\r\n"
                           "- 100% HP/MP Restored & All Negative Debuffs Cleansed!")
        except Exception, e:
            sm.sendSayOkay("Error applying buffs: " + str(e))
    elif selection == 5:
        for quest in BOSS_PREQUEST:
            if not sm.hasQuestCompleted(quest):
                sm.completeQuestNoRewards(quest)
        if sm.hasQuest(34331) or sm.hasQuestCompleted(34330):
            sm.completeQuest(34331)
        sm.sendSayOkay("All Boss prequests have been successfully completed!")
    elif selection == 12:
        sm.checkMVPStatus()
    elif selection == 13:
        sm.upgradeMechanicalHeart()
    elif selection == 14:
        if chr != None and chr.getJobHandler() != None:
            chr.getJobHandler().handleJobAdvance()
        else:
            sm.sendSayOkay("Unable to process Job Advancement at this time.")
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