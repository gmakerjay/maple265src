# Admin Potion & Buff Supply Depot
# Special bulk shop for 50% HP/MP recovery elixirs and 500k combat buffs
from net.swordie.ms.util import Util

POTION_PACKS = [
    # (id, name, qty, cost, description)
    (2000004, "Elixir", 1000, 20000000, "Recovers 50% Max HP & 50% Max MP (Economical Bulk Pack)"),
    (2000004, "Elixir", 100, 2500000, "Recovers 50% Max HP & 50% Max MP (Small Pack)"),
    (2022000, "Ginger Ale", 1000, 50000000, "Recovers 75% Max HP & 75% Max MP (High Recovery)"),
    (2000005, "Power Elixir", 1000, 100000000, "Recovers 100% Max HP & 100% Max MP (End-Game Luxury - 100M)"),
    (2000005, "Power Elixir", 100, 12000000, "Recovers 100% Max HP & 100% Max MP (Premium Pack - 12M)"),
    (2050004, "All-Cure Potion", 100, 1000000, "Cures all abnormal status conditions (100 bottles - 1M)")
]

BUFF_POTIONS = [
    # (id, name, desc)
    (2022179, "Onyx Apple", "Weapon ATT +100, Magic ATT +100, Avoid +20 (10 min)"),
    (2003596, "Adv. Boss Rush Boost Potion", "Boss Damage +20% (2 Hours)"),
    (2003598, "Adv. Penetrating Boost Potion", "Ignore Monster DEF +20% (2 Hours)"),
    (2003597, "Adv. Great Hero Boost Potion", "Weapon ATT +30, Magic ATT +30 (2 Hours)"),
    (2023125, "Extreme Red Potion", "Weapon ATT +30, Max HP +2,000 (30 min)"),
    (2023126, "Extreme Green Potion", "Attack Speed +1 stage (30 min)"),
    (2023127, "Extreme Blue Potion", "Magic ATT +30, Max MP +2,000 (30 min)"),
    (2023128, "Extreme Gold Potion", "Bonus EXP +10%, Max HP/MP +2,000 (30 min)"),
    (2003550, "EXP Accumulation Potion (EAP)", "Bonus EXP +10% (2 Hours)"),
    (2003551, "Wealth Acquisition Potion (WAP)", "Item Drop Rate +20%, Mesos +20% (2 Hours)"),
    (2023544, "MVP Superpower Buff", "Weapon ATT +30, Magic ATT +30 (30 min)")
]

ALL_BUFF_IDS = [2022179, 2003596, 2003598, 2003597, 2023125, 2023126, 2023127, 2023128, 2003550, 2003551]

def format_num(val):
    return Util.getNumberFormat(val)

def open_potion_shop(sm, chr):
    while True:
        cur_mesos = chr.getMoney()
        shop_menu = "#fs13#=== #e#bAdmin Potion & Combat Buff Supply Depot#k#n ===\r\n"
        shop_menu += "Current Mesos: #e#d" + format_num(cur_mesos) + " Mesos#k#n\r\n\r\n"
        shop_menu += "#b#L1##e[HP / MP & Recovery Potions]#n#k\r\n"
        shop_menu += "   #fs11#Elixirs (50%), Power Elixirs (100%), and All-Cure Potions (x100).#fs13#\r\n"
        shop_menu += "#b#L2##e[Combat Buff Potions - 500,000 Mesos Each]#n#k\r\n"
        shop_menu += "   #fs11#Onyx Apple, Adv Boss Rush, Penetrating, Extreme potions, etc.#fs13#\r\n"
        shop_menu += "#b#L3##e[All-in-One Bossing Buff Supply Package]#n#k\r\n"
        shop_menu += "   #fs11#Bundle of all top 10 buffs (10x each = 100 bottles) for 50,000,000 Mesos.#fs13#\r\n"
        shop_menu += "#d#L99#Exit Shop#l#k\r\n"

        category = sm.sendNext(shop_menu)

        if category == 1:
            # Bulk Potions Menu
            pot_menu = "#fs13#Select recovery potion package to purchase:\r\n"
            pot_menu += "Current Mesos: #e#d" + format_num(chr.getMoney()) + " Mesos#k#n\r\n\r\n"

            for idx, (p_id, p_name, p_qty, p_cost, p_desc) in enumerate(POTION_PACKS):
                pot_menu += "#L" + str(idx) + "##i" + str(p_id) + "# #e#b" + p_name + " x" + str(p_qty) + "#k#n - #r" + format_num(p_cost) + " Mesos#k\r\n    #fs11#" + p_desc + "#fs13##l\r\n"
            pot_menu += "#L99##d[Back to Main Menu]#k#l\r\n"

            p_sel = sm.sendNext(pot_menu)
            if p_sel == 99 or p_sel < 0 or p_sel >= len(POTION_PACKS):
                continue

            p_id, p_name, p_qty, p_cost, p_desc = POTION_PACKS[p_sel]
            if chr.getMoney() < p_cost:
                sm.sendSayOkay("#fs13#You do not have enough mesos!\r\n\r\n"
                               "Required: #r" + format_num(p_cost) + " Mesos#k\r\n"
                               "You have: #b" + format_num(chr.getMoney()) + " Mesos#k")
            elif not sm.canHold(p_id, p_qty):
                sm.sendSayOkay("#fs13#You do not have enough free space in your USE inventory tab!\r\n\r\n"
                               "Please free up some slots and try again.")
            else:
                chr.deductMoney(p_cost)
                chr.addItemToInventory(p_id, p_qty)
                sm.sendSayOkay("#fs13##e#b[Purchase Successful!]#k#n\r\n\r\n"
                               "You received: #i" + str(p_id) + "# #b" + p_name + " x" + str(p_qty) + "#k\r\n"
                               "Deducted: #r" + format_num(p_cost) + " Mesos#k\r\n"
                               "Remaining Mesos: #d" + format_num(chr.getMoney()) + " Mesos#k")

        elif category == 2:
            # Buff Potions Menu (500k each)
            buff_menu = "#fs13#Select a combat buff potion to purchase (#r500,000 Mesos / bottle#k):\r\n"
            buff_menu += "Current Mesos: #e#d" + format_num(chr.getMoney()) + " Mesos#k#n\r\n\r\n"
            for b_idx, (b_id, b_name, b_desc) in enumerate(BUFF_POTIONS):
                buff_menu += "#L" + str(b_idx) + "##i" + str(b_id) + "# #e#b" + b_name + "#k#n - #fs11#" + b_desc + "#fs13##l\r\n"
            buff_menu += "#L99##d[Back to Main Menu]#k#l\r\n"

            b_sel = sm.sendNext(buff_menu)
            if b_sel == 99 or b_sel < 0 or b_sel >= len(BUFF_POTIONS):
                continue

            b_id, b_name, b_desc = BUFF_POTIONS[b_sel]

            # Quantity selection
            qty_menu = "#fs13#How many #i" + str(b_id) + "# #e#b" + b_name + "#k#n would you like to buy?\r\n"
            qty_menu += "Price: #r500,000 Mesos#k per bottle.\r\n"
            qty_menu += "Current Mesos: #d" + format_num(chr.getMoney()) + " Mesos#k\r\n\r\n"
            qty_menu += "#L1#Buy 1 bottle (500,000 Mesos)#l\r\n"
            qty_menu += "#L10#Buy 10 bottles (5,000,000 Mesos)#l\r\n"
            qty_menu += "#L50#Buy 50 bottles (25,000,000 Mesos)#l\r\n"
            qty_menu += "#L100#Buy 100 bottles (50,000,000 Mesos)#l\r\n"
            qty_menu += "#L999#Custom Quantity (1 - 1,000)...#l\r\n"
            qty_menu += "#L0##dCancel#k#l\r\n"

            qty_choice = sm.sendNext(qty_menu)
            buy_qty = 0
            if qty_choice in [1, 10, 50, 100]:
                buy_qty = qty_choice
            elif qty_choice == 999:
                buy_qty = sm.sendAskNumber("Enter quantity to purchase (1 - 1,000):", 1, 1, 1000)
            else:
                continue

            if buy_qty <= 0:
                continue

            total_buff_cost = int(buy_qty) * 500000
            if chr.getMoney() < total_buff_cost:
                sm.sendSayOkay("#fs13#You do not have enough mesos!\r\n\r\n"
                               "Required: #r" + format_num(total_buff_cost) + " Mesos#k\r\n"
                               "You have: #b" + format_num(chr.getMoney()) + " Mesos#k")
            elif not sm.canHold(b_id, buy_qty):
                sm.sendSayOkay("#fs13#You do not have enough free space in your USE inventory tab!\r\n\r\n"
                               "Please free up some slots and try again.")
            else:
                chr.deductMoney(total_buff_cost)
                chr.addItemToInventory(b_id, buy_qty)
                sm.sendSayOkay("#fs13##e#b[Purchase Successful!]#k#n\r\n\r\n"
                               "You received: #i" + str(b_id) + "# #b" + b_name + " x" + str(buy_qty) + "#k\r\n"
                               "Deducted: #r" + format_num(total_buff_cost) + " Mesos#k\r\n"
                               "Remaining Mesos: #d" + format_num(chr.getMoney()) + " Mesos#k")

        elif category == 3:
            # All-in-One Bossing Buff Supply Package
            pack_cost = 50000000

            pack_info = "#fs13#=== #e#gAll-in-One Bossing Buff Supply Package#k#n ===\r\n\r\n"
            pack_info += "Contains #b10 bottles each#k of the top 10 combat buffs (Total: 100 bottles):\r\n"
            for aid in ALL_BUFF_IDS:
                pack_info += "#i" + str(aid) + "# #b#z" + str(aid) + "# x10\r\n"
            pack_info += "\r\nPrice: #e#r50,000,000 Mesos#k#n (50M)\r\n"
            pack_info += "Current Mesos: #d" + format_num(chr.getMoney()) + " Mesos#k\r\n\r\n"
            pack_info += "Would you like to purchase this supply package?"

            confirm = sm.sendAskYesNo(pack_info)
            if confirm:
                if chr.getMoney() < pack_cost:
                    sm.sendSayOkay("#fs13#You do not have enough mesos!\r\n\r\n"
                                   "Required: #r" + format_num(pack_cost) + " Mesos#k\r\n"
                                   "You have: #b" + format_num(chr.getMoney()) + " Mesos#k")
                else:
                    can_hold_all = True
                    for aid in ALL_BUFF_IDS:
                        if not sm.canHold(aid, 10):
                            can_hold_all = False
                            break
                    if not can_hold_all:
                        sm.sendSayOkay("#fs13#You do not have enough free space in your USE inventory tab!\r\n\r\n"
                                       "Please ensure you have at least 10 free USE slots.")
                    else:
                        chr.deductMoney(pack_cost)
                        for aid in ALL_BUFF_IDS:
                            chr.addItemToInventory(aid, 10)
                        sm.sendSayOkay("#fs13##e#g[Package Purchased Successfully!]#k#n\r\n\r\n"
                                       "You received 10x of each bossing buff potion (100 total bottles).\r\n"
                                       "Remaining Mesos: #d" + format_num(chr.getMoney()) + " Mesos#k.")
        else:
            break
