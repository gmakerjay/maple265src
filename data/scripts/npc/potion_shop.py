# ==============================================================================
# General Store, Potions & Boss Buff Depot (Adele - 3003940)
# General Supplies, Balanced 100% Recovery Potions & 10x Boss Buff Bundles
# ==============================================================================
from net.swordie.ms.util import Util
from net.swordie.ms.enums import InvType

NPC_ID = 3003940 # Adele

def format_num(val):
    return Util.getNumberFormat(val)

# (id, name, qty, cost, description)
GENERAL_SUPPLIES = [
    (2030000, "Town Return Scroll (x100)", 100, 50000, "Instantly warps to the nearest town (100 scrolls)."),
    (2030004, "Return to Nearest Town Scroll (x100)", 100, 50000, "Instantly warps to the regional capital city (100 scrolls)."),
    (2050004, "All-Cure Potion (x100)", 100, 500000, "Cures and clears all abnormal status ailments (100 bottles)."),
    (2060000, "Bow Arrow (x2,000)", 2000, 2000, "Standard arrows for bows (2,000 arrows)."),
    (2061000, "Crossbow Arrow (x2,000)", 2000, 2000, "Standard bolts for crossbows (2,000 bolts)."),
    (2070000, "Subi Throwing-Stars", 1, 500, "Basic throwing-star (Weapon ATT +15)."),
    (2070006, "Ilbi Throwing-Stars", 1, 3000000, "High-tier iconic throwing-star (Weapon ATT +21)."),
    (2000002, "White Potion (x100)", 100, 32000, "Recovers 300 HP (100 bottles)."),
    (2000006, "Mana Elixir (x100)", 100, 62000, "Recovers 300 MP (100 bottles).")
]

RECOVERY_POTIONS = [
    # Ginger Ale (75% HP/MP)
    (2022000, "Ginger Ale (x100)", 100, 1500000, "Recovers 75% Max HP & 75% Max MP (100 bottles - 15,000 each)"),
    (2022000, "Ginger Ale (x1,000)", 1000, 12000000, "Recovers 75% Max HP & 75% Max MP (Bulk 1,000 bottles - 12,000 each)"),
    # Power Elixir (100% HP/MP)
    (2000005, "Power Elixir (x100)", 100, 5000000, "Recovers 100% Max HP & 100% Max MP (100 bottles - 50,000 each)"),
    (2000005, "Power Elixir (x1,000)", 1000, 45000000, "Recovers 100% Max HP & 100% Max MP (Bulk 1,000 bottles - 45,000 each)"),
    # Elixir (50% HP/MP)
    (2000004, "Elixir (x100)", 100, 800000, "Recovers 50% Max HP & 50% Max MP (100 bottles - 8,000 each)"),
    (2000004, "Elixir (x1,000)", 1000, 7000000, "Recovers 50% Max HP & 50% Max MP (Bulk 1,000 bottles - 7,000 each)")
]

# Boss Buff Potions - Sold in 10-packs
BOSS_BUFF_10PACKS = [
    (2022179, "Onyx Apple (x10)", 10, 10000000, "Weapon ATT +100, Magic ATT +100 (10 min) [10 pieces]"),
    (2003596, "Adv. Boss Rush Boost Potion (x10)", 10, 8000000, "Boss Damage +20% (Duration: 2 Hours) [10 bottles]"),
    (2003598, "Adv. Penetrating Boost Potion (x10)", 10, 8000000, "Ignore Monster DEF (IED) +20% (Duration: 2 Hours) [10 bottles]"),
    (2003597, "Adv. Great Hero Boost Potion (x10)", 10, 5000000, "Weapon ATT +30, Magic ATT +30 (Duration: 2 Hours) [10 bottles]"),
    (2023125, "Extreme Red Potion (x10)", 10, 4000000, "Weapon ATT +30, Max HP +2,000 (Duration: 30 min) [10 bottles]"),
    (2023126, "Extreme Green Potion (x10)", 10, 5000000, "Attack Speed +1 Stage (Breaks soft cap, 30 min) [10 bottles]"),
    (2023127, "Extreme Blue Potion (x10)", 10, 4000000, "Magic ATT +30, Max MP +2,000 (Duration: 30 min) [10 bottles]"),
    (2023128, "Extreme Gold Potion (x10)", 10, 5000000, "Bonus EXP +10%, Max HP/MP +2,000 (Duration: 30 min) [10 bottles]"),
    (2003550, "EXP Accumulation Potion (EAP) (x10)", 10, 8000000, "Bonus EXP +10% stackable (Duration: 2 Hours) [10 bottles]"),
    (2003551, "Wealth Acquisition Potion (WAP) (x10)", 10, 8000000, "Item Drop Rate +20%, Mesos +20% (Duration: 2 Hours) [10 bottles]"),
    (2023544, "MVP Superpower Buff (x10)", 10, 5000000, "Weapon ATT +30, Magic ATT +30 (Duration: 30 min) [10 bottles]")
]

ALL_IN_ONE_BUFFS = [
    (2022179, "Onyx Apple", 10),
    (2003596, "Adv. Boss Rush Boost Potion", 10),
    (2003598, "Adv. Penetrating Boost Potion", 10),
    (2003597, "Adv. Great Hero Boost Potion", 10),
    (2023125, "Extreme Red Potion", 10),
    (2023126, "Extreme Green Potion", 10),
    (2023127, "Extreme Blue Potion", 10),
    (2023128, "Extreme Gold Potion", 10)
]
ALL_IN_ONE_COST = 45000000

def open_potion_shop(sm, chr):
    sm.setSpeakerID(NPC_ID)
    while True:
        cur_mesos = chr.getMoney()
        menu = "#fs13#Greetings, #h0#! I am #bAdele#k.\r\n"
        menu += "Welcome to the Knight's Military General Store & Combat Buff Depot.\r\n\r\n"
        menu += "Current Meso Balance: #e#y" + format_num(cur_mesos) + " Mesos#k#n\r\n\r\n"
        menu += "#b#L1##e[1] General Utility Supplies#n#k\r\n"
        menu += "   #d#fs11#Town Scrolls, Arrows, Throwing-Stars, All-Cure Potions (Standard Prices)#k#fs13#\r\n"
        menu += "#b#L2##e[2] HP / MP Recovery Potions (Elixirs)#n#k\r\n"
        menu += "   #d#fs11#Ginger Ale (75%), Power Elixir (100%), Elixir (50%) in 100 / 1,000 packs#k#fs13#\r\n"
        menu += "#b#L3##e[3] Boss Combat Buff Bundles (10-Bottle Sets)#n#k\r\n"
        menu += "   #d#fs11#Onyx Apple, Adv Boss Rush, IED, Extreme Potions, EAP, WAP in sets of 10#k#fs13#\r\n"
        menu += "#b#L4##e[4] Ultimate All-in-One Bossing Bundle#n#k\r\n"
        menu += "   #d#fs11#Complete bundle of 8 top bossing buffs (10x each = 80 bottles) for 45M Mesos#k#fs13#\r\n"
        menu += "#d#L99#[Back to Main NPC Menu]#k#l\r\n"

        cat = sm.sendNext(menu)

        if cat == 1:
            # General supplies
            while True:
                gen_menu = "Select utility supplies to purchase:\r\n"
                gen_menu += "Current Mesos: #e#d" + format_num(chr.getMoney()) + " Mesos#k#n\r\n\r\n"
                for idx, (g_id, g_name, g_qty, g_cost, g_desc) in enumerate(GENERAL_SUPPLIES):
                    gen_menu += "#L" + str(idx) + "##i" + str(g_id) + "# #e#b" + g_name + "#k#n - #r" + format_num(g_cost) + " Mesos#k\r\n    #fs11#" + g_desc + "#fs13##l\r\n"
                gen_menu += "#L99##d[Back to Store Categories]#k#l\r\n"

                g_sel = sm.sendNext(gen_menu)
                if g_sel == 99 or g_sel < 0 or g_sel >= len(GENERAL_SUPPLIES):
                    break

                g_id, g_name, g_qty, g_cost, g_desc = GENERAL_SUPPLIES[g_sel]
                if chr.getMoney() < g_cost:
                    sm.sendSayOkay("You do not have enough mesos!\r\nRequired: #r" + format_num(g_cost) + " Mesos#k")
                elif not sm.canHold(g_id, g_qty):
                    sm.sendSayOkay("Your inventory is full! Please make some space.")
                else:
                    chr.deductMoney(g_cost)
                    chr.addItemToInventory(g_id, g_qty)
                    sm.sendSayOkay("Purchase completed!\r\nReceived: #i" + str(g_id) + "# #b" + g_name + "#k\r\nDeducted: #r" + format_num(g_cost) + " Mesos#k")

        elif cat == 2:
            # Recovery potions
            while True:
                rec_menu = "Select recovery potion package to purchase:\r\n"
                rec_menu += "Current Mesos: #e#d" + format_num(chr.getMoney()) + " Mesos#k#n\r\n\r\n"
                for idx, (r_id, r_name, r_qty, r_cost, r_desc) in enumerate(RECOVERY_POTIONS):
                    rec_menu += "#L" + str(idx) + "##i" + str(r_id) + "# #e#b" + r_name + "#k#n - #r" + format_num(r_cost) + " Mesos#k\r\n    #fs11#" + r_desc + "#fs13##l\r\n"
                rec_menu += "#L99##d[Back to Store Categories]#k#l\r\n"

                r_sel = sm.sendNext(rec_menu)
                if r_sel == 99 or r_sel < 0 or r_sel >= len(RECOVERY_POTIONS):
                    break

                r_id, r_name, r_qty, r_cost, r_desc = RECOVERY_POTIONS[r_sel]
                if chr.getMoney() < r_cost:
                    sm.sendSayOkay("You do not have enough mesos!\r\nRequired: #r" + format_num(r_cost) + " Mesos#k")
                elif not sm.canHold(r_id, r_qty):
                    sm.sendSayOkay("Your USE inventory tab is full! Please make some space.")
                else:
                    chr.deductMoney(r_cost)
                    chr.addItemToInventory(r_id, r_qty)
                    sm.sendSayOkay("Supplies delivered!\r\nReceived: #i" + str(r_id) + "# #b" + r_name + "#k\r\nDeducted: #r" + format_num(r_cost) + " Mesos#k")

        elif cat == 3:
            # Boss buff 10-packs
            while True:
                buff_menu = "Select a boss combat buff set (10 bottles per set):\r\n"
                buff_menu += "Current Mesos: #e#d" + format_num(chr.getMoney()) + " Mesos#k#n\r\n\r\n"
                for idx, (b_id, b_name, b_qty, b_cost, b_desc) in enumerate(BOSS_BUFF_10PACKS):
                    buff_menu += "#L" + str(idx) + "##i" + str(b_id) + "# #e#b" + b_name + "#k#n - #r" + format_num(b_cost) + " Mesos#k\r\n    #fs11#" + b_desc + "#fs13##l\r\n"
                buff_menu += "#L99##d[Back to Store Categories]#k#l\r\n"

                b_sel = sm.sendNext(buff_menu)
                if b_sel == 99 or b_sel < 0 or b_sel >= len(BOSS_BUFF_10PACKS):
                    break

                b_id, b_name, b_qty, b_cost, b_desc = BOSS_BUFF_10PACKS[b_sel]
                if chr.getMoney() < b_cost:
                    sm.sendSayOkay("You do not have enough mesos!\r\nRequired: #r" + format_num(b_cost) + " Mesos#k")
                elif not sm.canHold(b_id, b_qty):
                    sm.sendSayOkay("Your USE inventory tab is full! Please make some space.")
                else:
                    chr.deductMoney(b_cost)
                    chr.addItemToInventory(b_id, b_qty)
                    sm.sendSayOkay("Buff pack received!\r\nReceived: #i" + str(b_id) + "# #b" + b_name + "#k\r\nDeducted: #r" + format_num(b_cost) + " Mesos#k")

        elif cat == 4:
            # All-in-one bundle
            bundle_text = "Would you like to purchase the #e#b[Ultimate All-in-One Bossing Bundle]#k#n?\r\n\r\n"
            bundle_text += "The bundle contains 10 bottles of each essential buff (80 bottles total):\r\n"
            for b_id, b_name, b_qty in ALL_IN_ONE_BUFFS:
                bundle_text += "- #i" + str(b_id) + "# #b" + b_name + "#k x" + str(b_qty) + "\r\n"
            bundle_text += "\r\nSpecial Package Price: #r" + format_num(ALL_IN_ONE_COST) + " Mesos#k\r\n"

            if sm.sendAskYesNo(bundle_text):
                if chr.getMoney() < ALL_IN_ONE_COST:
                    sm.sendSayOkay("You do not have enough mesos!\r\nRequired: #r" + format_num(ALL_IN_ONE_COST) + " Mesos#k")
                else:
                    can_hold_all = True
                    for b_id, b_name, b_qty in ALL_IN_ONE_BUFFS:
                        if not sm.canHold(b_id, b_qty):
                            can_hold_all = False
                            break
                    if not can_hold_all:
                        sm.sendSayOkay("You need at least 8 free slots in your USE inventory tab!")
                    else:
                        chr.deductMoney(ALL_IN_ONE_COST)
                        for b_id, b_name, b_qty in ALL_IN_ONE_BUFFS:
                            chr.addItemToInventory(b_id, b_qty)
                        sm.sendSayOkay("Combat provisions delivered! May victory follow your blades in battle!")

        elif cat == 99 or cat < 0:
            return
