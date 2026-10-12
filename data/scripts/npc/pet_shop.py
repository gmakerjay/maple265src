# ==============================================================================
# Pet Sanctuary & Pet Skills Depot (Lara - 3005101)
# Comprehensive Pet Shop: Vac Pets, Classic Pets, Supplies & Pet Auto Skills
# ==============================================================================
from net.swordie.ms.util import Util
from net.swordie.ms.enums import InvType

NPC_ID = 3005101 # Lara

def format_num(val):
    return Util.getNumberFormat(val)

# (id, name, cost_mesos, cost_cash, days, desc)
PET_ITEMS = [
    (5002396, "Sherbet (Vac Pet - 30 Days)", 50000000, 100000, 30, "Special vacuum pet with massive item & meso loot radius."),
    (5000001, "Brown Puppy (90 Days)", 5000000, 10000, 90, "Loyal puppy companion that follows you everywhere."),
    (5000002, "Pink Bunny (90 Days)", 5000000, 10000, 90, "Adorable hopping pink bunny pet."),
    (5000003, "Mini Kargo (90 Days)", 8000000, 15000, 90, "Fierce mini dragon monster from Sleepywood."),
    (5000028, "Baby Dragon (90 Days)", 10000000, 20000, 90, "Legendary mystical mini dragon pet."),
    (5000060, "Pink Bean (90 Days)", 15000000, 30000, 90, "Playful monster superstar Pink Bean pet.")
]

PET_SUPPLIES = [
    (2120000, "Pet Food (x100)", 30000, 0, 100, "Fills your pet's fullness by 30 points."),
    (5180000, "Water of Life", 5000000, 5000, 1, "Revives an expired regular pet for another 90 days."),
    (5000049, "Pet Snack (Multi-Pet)", 10000000, 10000, 1, "Unlocks Multi-Pet skill (summon up to 3 pets simultaneously).")
]

PET_SKILLS = [
    (5190010, "Auto Buff Skill", 10000000, 10000, "Allows pet to automatically cast up to 2 active buff skills."),
    (5190001, "Auto HP Potion Skill", 5000000, 5000, "Allows pet to automatically consume HP recovery potions."),
    (5190006, "Auto MP Potion Skill", 5000000, 5000, "Allows pet to automatically consume MP recovery potions."),
    (5190002, "Expanded Auto Move Skill", 8000000, 8000, "Expands pet auto-movement speed and collection range by 3x."),
    (5190003, "Auto Move Skill", 5000000, 5000, "Allows pet to move automatically to pick up dropped items."),
    (5190011, "Auto Feed Skill", 5000000, 5000, "Automatically feeds pet when fullness drops."),
    (5190005, "Ignore Item Skill", 5000000, 5000, "Prevents pet from picking up unwanted specific items.")
]

def open_pet_shop(sm, chr):
    sm.setNpcBoxChat(NPC_ID)
    while True:
        cur_mesos = chr.getMoney()
        cur_cash = chr.getMaplePoints()

        menu = "#face0#Hello, #h0#! Welcome to Lara's #bPet Sanctuary#k!\r\n"
        menu += "I have adorable animal companions and useful automated pet skills for you!\r\n\r\n"
        menu += "Your Mesos: #e#d" + format_num(cur_mesos) + " Mesos#k#n\r\n"
        menu += "Cash Points (NX): #e#d" + format_num(cur_cash) + " Points#k#n\r\n\r\n"
        menu += "#b#L1##e[1] Pets & Vacuum Pets (Vac Pet)#n#k\r\n"
        menu += "   #fs11#Sherbet Vac Pet (screen-wide loot), Puppy, Bunny, Dragon, Pink Bean.#fs13#\r\n"
        menu += "#b#L2##e[2] Pet Supplies & Multi-Pet#n#k\r\n"
        menu += "   #fs11#Pet Food x100, Water of Life (90D revive), Pet Snack (3 pets).#fs13#\r\n"
        menu += "#b#L3##e[3] Automated Pet Skills#n#k\r\n"
        menu += "   #fs11#Auto Buff, Auto HP/MP, Auto Move, Expanded Range, Auto Feed.#fs13#\r\n"
        menu += "#d#L99#Exit Sanctuary#l#k\r\n"

        cat = sm.sendNext(menu)

        if cat == 1:
            # Pets
            pet_menu = "#face0#Select the pet companion you wish to adopt:\r\n\r\n"
            for idx, (p_id, p_name, p_mesos, p_cash, days, desc) in enumerate(PET_ITEMS):
                pet_menu += "#L" + str(idx) + "##i" + str(p_id) + "# #e#b" + p_name + "#k#n\r\n"
                pet_menu += "    Price: #r" + format_num(p_mesos) + " Mesos#k or #d" + format_num(p_cash) + " Cash#k\r\n"
                pet_menu += "    #fs11#" + desc + "#fs13##l\r\n"
            pet_menu += "#L99##d[Back to Main Menu]#k#l\r\n"

            p_sel = sm.sendNext(pet_menu)
            if p_sel == 99 or p_sel < 0 or p_sel >= len(PET_ITEMS):
                continue

            p_id, p_name, p_mesos, p_cash, days, desc = PET_ITEMS[p_sel]
            pay_menu = "#face0#How would you like to purchase #i" + str(p_id) + "# #b" + p_name + "#k?\r\n\r\n"
            pay_menu += "#L1##bPay with Mesos: #r" + format_num(p_mesos) + " Mesos#k#l\r\n"
            pay_menu += "#L2##dPay with Cash Points: #r" + format_num(p_cash) + " Points#k#l\r\n"
            pay_menu += "#L99##g[Cancel]#k#l\r\n"

            pay_sel = sm.sendNext(pay_menu)
            if pay_sel == 1:
                if chr.getMoney() < p_mesos:
                    sm.sendSayOkay("#face2#You do not have enough mesos!\r\nRequired: #r" + format_num(p_mesos) + " Mesos#k")
                elif not sm.canHold(p_id):
                    sm.sendSayOkay("#face2#Your Cash inventory tab is full! Please make some space.")
                else:
                    chr.deductMoney(p_mesos)
                    chr.addItemToInventory(p_id, 1, "day", days)
                    sm.sendSayOkay("#face1#Congratulations! You have received #i" + str(p_id) + "# #b" + p_name + "#k. Enjoy your adventure together!")
            elif pay_sel == 2:
                if chr.getMaplePoints() < p_cash:
                    sm.sendSayOkay("#face2#You do not have enough Cash Points!\r\nRequired: #r" + format_num(p_cash) + " Points#k")
                elif not sm.canHold(p_id):
                    sm.sendSayOkay("#face2#Your Cash inventory tab is full! Please make some space.")
                else:
                    chr.deductMaplePoint(p_cash)
                    chr.addItemToInventory(p_id, 1, "day", days)
                    sm.sendSayOkay("#face1#Congratulations! You have received #i" + str(p_id) + "# #b" + p_name + "#k. Enjoy your adventure together!")

        elif cat == 2:
            # Supplies
            sup_menu = "#face0#Select pet supplies to purchase:\r\n\r\n"
            for idx, (s_id, s_name, s_mesos, s_cash, s_qty, desc) in enumerate(PET_SUPPLIES):
                sup_menu += "#L" + str(idx) + "##i" + str(s_id) + "# #e#b" + s_name + "#k#n - #r" + format_num(s_mesos) + " Mesos#k\r\n"
                sup_menu += "    #fs11#" + desc + "#fs13##l\r\n"
            sup_menu += "#L99##d[Back to Main Menu]#k#l\r\n"

            s_sel = sm.sendNext(sup_menu)
            if s_sel == 99 or s_sel < 0 or s_sel >= len(PET_SUPPLIES):
                continue

            s_id, s_name, s_mesos, s_cash, s_qty, desc = PET_SUPPLIES[s_sel]
            if chr.getMoney() < s_mesos:
                sm.sendSayOkay("#face2#You do not have enough mesos!\r\nRequired: #r" + format_num(s_mesos) + " Mesos#k")
            elif not sm.canHold(s_id, s_qty):
                sm.sendSayOkay("#face2#Your inventory is full! Please make some space.")
            else:
                chr.deductMoney(s_mesos)
                chr.addItemToInventory(s_id, s_qty)
                sm.sendSayOkay("#face1#Purchase successful! You received #i" + str(s_id) + "# #b" + s_name + "#k.")

        elif cat == 3:
            # Skills
            skl_menu = "#face0#Select automated skills to teach your pets:\r\n\r\n"
            for idx, (k_id, k_name, k_mesos, k_cash, desc) in enumerate(PET_SKILLS):
                skl_menu += "#L" + str(idx) + "##i" + str(k_id) + "# #e#b" + k_name + "#k#n\r\n"
                skl_menu += "    Price: #r" + format_num(k_mesos) + " Mesos#k or #d" + format_num(k_cash) + " Cash#k\r\n"
                skl_menu += "    #fs11#" + desc + "#fs13##l\r\n"
            skl_menu += "#L99##d[Back to Main Menu]#k#l\r\n"

            k_sel = sm.sendNext(skl_menu)
            if k_sel == 99 or k_sel < 0 or k_sel >= len(PET_SKILLS):
                continue

            k_id, k_name, k_mesos, k_cash, desc = PET_SKILLS[k_sel]
            pay_menu = "#face0#How would you like to purchase #i" + str(k_id) + "# #b" + k_name + "#k?\r\n\r\n"
            pay_menu += "#L1##bPay with Mesos: #r" + format_num(k_mesos) + " Mesos#k#l\r\n"
            pay_menu += "#L2##dPay with Cash Points: #r" + format_num(k_cash) + " Points#k#l\r\n"
            pay_menu += "#L99##g[Cancel]#k#l\r\n"

            pay_sel = sm.sendNext(pay_menu)
            if pay_sel == 1:
                if chr.getMoney() < k_mesos:
                    sm.sendSayOkay("#face2#You do not have enough mesos!\r\nRequired: #r" + format_num(k_mesos) + " Mesos#k")
                elif not sm.canHold(k_id):
                    sm.sendSayOkay("#face2#Your Cash inventory tab is full! Please make some space.")
                else:
                    chr.deductMoney(k_mesos)
                    chr.addItemToInventory(k_id, 1)
                    sm.sendSayOkay("#face1#Purchase successful! Double-click #i" + str(k_id) + "# in your Cash tab to teach the skill to your pet.")
            elif pay_sel == 2:
                if chr.getMaplePoints() < k_cash:
                    sm.sendSayOkay("#face2#You do not have enough Cash Points!\r\nRequired: #r" + format_num(k_cash) + " Points#k")
                elif not sm.canHold(k_id):
                    sm.sendSayOkay("#face2#Your Cash inventory tab is full! Please make some space.")
                else:
                    chr.deductMaplePoint(k_cash)
                    chr.addItemToInventory(k_id, 1)
                    sm.sendSayOkay("#face1#Purchase successful! Double-click #i" + str(k_id) + "# in your Cash tab to teach the skill to your pet.")

        elif cat == 99:
            sm.sendSayOkay("#face0#Come back anytime to visit the pets! Goodbye~")
            break
