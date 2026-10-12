# ==============================================================================
# Pet Sanctuary & Pet Skills Depot (Lara - 3005101)
# Comprehensive Pet Shop: Vac Pets, Classic Pets, Supplies & Pet Auto Skills
# High-Contrast Pure White Font (#fc0xFFFFFFFF#) for Maximum Clarity
# ==============================================================================
from net.swordie.ms.util import Util
from net.swordie.ms.enums import InvType

NPC_ID = 3005101 # Lara

def format_num(val):
    return Util.getNumberFormat(val)

def get_user_cash(chr):
    user = chr.getUser()
    if user is not None:
        return user.getMaplePoints()
    return 0

def deduct_user_cash(chr, amount):
    user = chr.getUser()
    if user is not None:
        user.deductMaplePoints(amount)
        try:
            user.updateUserToSQL()
        except:
            pass

# Vacuum Pets (Screen-wide suction loot - 30 Days)
VAC_PETS = [
    (5002239, "Sherbet (Vac Pet)", 50000000, 100000, 30, "Legendary vacuum pet with screen-wide item and meso suction."),
    (5002358, "Lil Death (Vac Pet)", 50000000, 100000, 30, "Mini Reaper Petite Luna pet with massive collection radius."),
    (5002081, "Lil Pony (Vac Pet)", 50000000, 100000, 30, "Magical celestial unicorn Petite Luna pet with vacuum suction."),
    (5002199, "Lil Glowy (Vac Pet)", 50000000, 100000, 30, "Enchanted butterfly fairy Petite Luna pet with vacuum suction."),
    (5000932, "Petite Pico (Vac Pet)", 50000000, 100000, 30, "Celestial fairy companion with full-screen auto vacuum suction."),
    (5000762, "Forest Dori (Vac Pet)", 50000000, 100000, 30, "Mystical nature spirit with screen-wide item collection radius.")
]

# Classic & Cute Animals (90 Days)
ANIMAL_PETS = [
    (5000001, "Brown Puppy", 5000000, 10000, 90, "Loyal puppy companion that follows you everywhere."),
    (5000000, "Brown Kitty", 5000000, 10000, 90, "Playful fluffy kitten that chases after dropped items."),
    (5000002, "Pink Bunny", 5000000, 10000, 90, "Adorable hopping pink rabbit with floppy ears."),
    (5000006, "Husky", 6000000, 12000, 90, "Energetic Arctic sled dog with boundless spirit."),
    (5000008, "Panda", 6000000, 12000, 90, "Chubby bamboo-loving panda companion."),
    (5000011, "Monkey", 5000000, 10000, 90, "Clever acrobat monkey from Ellinia forests."),
    (5000012, "White Tiger", 8000000, 15000, 90, "Majestic mythical white tiger cub of Korean Folk Town."),
    (5000014, "Rudolph", 7000000, 14000, 90, "Festive red-nosed reindeer that brings holiday joy."),
    (5000023, "Penguin", 5000000, 10000, 90, "Waddling cute tuxedo penguin from Riene glacier.")
]

# Fantasy & Monster Superstar Pets (90 Days)
FANTASY_PETS = [
    (5000060, "Pink Bean", 15000000, 30000, 90, "Playful monster superstar Pink Bean with custom animations."),
    (5000020, "Mini Yeti", 8000000, 15000, 90, "Cuddly fluffy snow monster from El Nath mountains."),
    (5000055, "Pepe", 6000000, 12000, 90, "Aristocratic royal penguin king of El Nath."),
    (5000045, "Slime", 5000000, 10000, 90, "Bouncy classic green slime mascot of Victoria Island."),
    (5000039, "Kino (Orange Mushroom)", 5000000, 10000, 90, "The world-famous smiling Orange Mushroom mascot."),
    (5000003, "Mini Kargo", 8000000, 15000, 90, "Fierce mini dragon monster from the Ant Tunnel."),
    (5000028, "Dragon", 10000000, 20000, 90, "Mystical ancient dragon pet that breathes gentle flames."),
    (5000033, "Black Dragon", 12000000, 25000, 90, "Sleek and fierce obsidian dark dragon pet.")
]

PET_SUPPLIES = [
    (2120000, "Pet Food (x100)", 30000, 0, 100, "Fills your pet's fullness by 30 points (100 food items)."),
    (5180000, "Water of Life", 5000000, 5000, 1, "Revives an expired regular pet for another 90 days of life."),
    (5000049, "Pet Snack (Multi-Pet)", 10000000, 10000, 1, "Unlocks Multi-Pet skill to summon up to 3 pets simultaneously.")
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
        cur_cash = get_user_cash(chr)

        menu = "#face0##fc0xFFFFFFFF##fs13#Hello, #h0#! Welcome to Lara's #bPet Sanctuary#fc0xFFFFFFFF#!\r\n"
        menu += "Adopt loyal companions, vacuum pets, and automated helper skills!\r\n\r\n"
        menu += "Your Mesos: #e#y" + format_num(cur_mesos) + " Mesos#fc0xFFFFFFFF##n\r\n"
        menu += "Cash Points (NX): #e#b" + format_num(cur_cash) + " Points#fc0xFFFFFFFF##n\r\n\r\n"
        menu += "#b#L1##e[1] Vacuum Pets (Vac Pets / Petite Luna)#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Sherbet, Lil Death, Lil Pony, Lil Glowy, Petite Pico (Screen-wide loot)#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#b#L2##e[2] Classic & Cute Animal Pets#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Puppy, Kitty, Bunny, Husky, Panda, Monkey, White Tiger, Penguin#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#b#L3##e[3] Fantasy & Monster Superstar Pets#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Pink Bean, Mini Yeti, Pepe, Slime, Orange Mushroom, Dragon#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#b#L4##e[4] Pet Supplies & Multi-Pet Skill#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Pet Food x100, Water of Life (90D Revive), Pet Snack (3 Pets)#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#b#L5##e[5] Automated Pet Skills#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Auto Buff, Auto HP/MP, Auto Move, Expanded Range, Auto Feed#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#d#L99#Exit Sanctuary#l#k\r\n"

        cat = sm.sendNext(menu)

        items_list = None
        if cat == 1:
            items_list = VAC_PETS
        elif cat == 2:
            items_list = ANIMAL_PETS
        elif cat == 3:
            items_list = FANTASY_PETS

        if items_list is not None:
            pet_menu = "#face0##fc0xFFFFFFFF##fs13#Select the pet companion you wish to adopt:\r\n\r\n"
            for idx, (p_id, p_name, p_mesos, p_cash, days, desc) in enumerate(items_list):
                pet_menu += "#L" + str(idx) + "##i" + str(p_id) + "# #e#b" + p_name + "#fc0xFFFFFFFF##n\r\n"
                pet_menu += "    Price: #r" + format_num(p_mesos) + " Mesos#fc0xFFFFFFFF# or #b" + format_num(p_cash) + " Cash#fc0xFFFFFFFF#\r\n"
                pet_menu += "    #fc0xFFCCCCCC##fs11#" + desc + "#fc0xFFFFFFFF##fs13##l\r\n"
            pet_menu += "#L99##d[Back to Main Menu]#k#l\r\n"

            p_sel = sm.sendNext(pet_menu)
            if p_sel == 99 or p_sel < 0 or p_sel >= len(items_list):
                continue

            p_id, p_name, p_mesos, p_cash, days, desc = items_list[p_sel]
            pay_menu = "#face0##fc0xFFFFFFFF##fs13#How would you like to purchase #i" + str(p_id) + "# #b" + p_name + "#fc0xFFFFFFFF#?\r\n\r\n"
            pay_menu += "#L1##bPay with Mesos: #r" + format_num(p_mesos) + " Mesos#fc0xFFFFFFFF##l\r\n"
            pay_menu += "#L2##dPay with Cash Points: #b" + format_num(p_cash) + " Points#fc0xFFFFFFFF##l\r\n"
            pay_menu += "#L99##g[Cancel]#k#l\r\n"

            pay_sel = sm.sendNext(pay_menu)
            if pay_sel == 1:
                if chr.getMoney() < p_mesos:
                    sm.sendSayOkay("#face2##fc0xFFFFFFFF#You do not have enough mesos!\r\nRequired: #r" + format_num(p_mesos) + " Mesos#fc0xFFFFFFFF#")
                elif not sm.canHold(p_id):
                    sm.sendSayOkay("#face2##fc0xFFFFFFFF#Your Cash inventory tab is full! Please make some space.")
                else:
                    chr.deductMoney(p_mesos)
                    chr.addItemToInventory(p_id, 1, "day", days)
                    sm.sendSayOkay("#face1##fc0xFFFFFFFF#Congratulations! You have received #i" + str(p_id) + "# #b" + p_name + "#fc0xFFFFFFFF#. Enjoy your adventure together!")
            elif pay_sel == 2:
                cur_cash = get_user_cash(chr)
                if cur_cash < p_cash:
                    sm.sendSayOkay("#face2##fc0xFFFFFFFF#You do not have enough Cash Points!\r\nRequired: #r" + format_num(p_cash) + " Points#fc0xFFFFFFFF#\r\nYou have: #b" + format_num(cur_cash) + " Points#fc0xFFFFFFFF#")
                elif not sm.canHold(p_id):
                    sm.sendSayOkay("#face2##fc0xFFFFFFFF#Your Cash inventory tab is full! Please make some space.")
                else:
                    deduct_user_cash(chr, p_cash)
                    chr.addItemToInventory(p_id, 1, "day", days)
                    sm.sendSayOkay("#face1##fc0xFFFFFFFF#Congratulations! You have received #i" + str(p_id) + "# #b" + p_name + "#fc0xFFFFFFFF#. Enjoy your adventure together!")

        elif cat == 4:
            # Supplies
            sup_menu = "#face0##fc0xFFFFFFFF##fs13#Select pet supplies to purchase:\r\n\r\n"
            for idx, (s_id, s_name, s_mesos, s_cash, s_qty, desc) in enumerate(PET_SUPPLIES):
                sup_menu += "#L" + str(idx) + "##i" + str(s_id) + "# #e#b" + s_name + "#fc0xFFFFFFFF##n - #r" + format_num(s_mesos) + " Mesos#fc0xFFFFFFFF#\r\n"
                sup_menu += "    #fc0xFFCCCCCC##fs11#" + desc + "#fc0xFFFFFFFF##fs13##l\r\n"
            sup_menu += "#L99##d[Back to Main Menu]#k#l\r\n"

            s_sel = sm.sendNext(sup_menu)
            if s_sel == 99 or s_sel < 0 or s_sel >= len(PET_SUPPLIES):
                continue

            s_id, s_name, s_mesos, s_cash, s_qty, desc = PET_SUPPLIES[s_sel]
            if chr.getMoney() < s_mesos:
                sm.sendSayOkay("#face2##fc0xFFFFFFFF#You do not have enough mesos!\r\nRequired: #r" + format_num(s_mesos) + " Mesos#fc0xFFFFFFFF#")
            elif not sm.canHold(s_id, s_qty):
                sm.sendSayOkay("#face2##fc0xFFFFFFFF#Your inventory is full! Please make some space.")
            else:
                chr.deductMoney(s_mesos)
                chr.addItemToInventory(s_id, s_qty)
                sm.sendSayOkay("#face1##fc0xFFFFFFFF#Purchase successful! You received #i" + str(s_id) + "# #b" + s_name + "#fc0xFFFFFFFF#.")

        elif cat == 5:
            # Skills
            skl_menu = "#face0##fc0xFFFFFFFF##fs13#Select automated skills to teach your pets:\r\n\r\n"
            for idx, (k_id, k_name, k_mesos, k_cash, desc) in enumerate(PET_SKILLS):
                skl_menu += "#L" + str(idx) + "##i" + str(k_id) + "# #e#b" + k_name + "#fc0xFFFFFFFF##n\r\n"
                skl_menu += "    Price: #r" + format_num(k_mesos) + " Mesos#fc0xFFFFFFFF# or #b" + format_num(k_cash) + " Cash#fc0xFFFFFFFF#\r\n"
                skl_menu += "    #fc0xFFCCCCCC##fs11#" + desc + "#fc0xFFFFFFFF##fs13##l\r\n"
            skl_menu += "#L99##d[Back to Main Menu]#k#l\r\n"

            k_sel = sm.sendNext(skl_menu)
            if k_sel == 99 or k_sel < 0 or k_sel >= len(PET_SKILLS):
                continue

            k_id, k_name, k_mesos, k_cash, desc = PET_SKILLS[k_sel]
            pay_menu = "#face0##fc0xFFFFFFFF##fs13#How would you like to purchase #i" + str(k_id) + "# #b" + k_name + "#fc0xFFFFFFFF#?\r\n\r\n"
            pay_menu += "#L1##bPay with Mesos: #r" + format_num(k_mesos) + " Mesos#fc0xFFFFFFFF##l\r\n"
            pay_menu += "#L2##dPay with Cash Points: #b" + format_num(k_cash) + " Points#fc0xFFFFFFFF##l\r\n"
            pay_menu += "#L99##g[Cancel]#k#l\r\n"

            pay_sel = sm.sendNext(pay_menu)
            if pay_sel == 1:
                if chr.getMoney() < k_mesos:
                    sm.sendSayOkay("#face2##fc0xFFFFFFFF#You do not have enough mesos!\r\nRequired: #r" + format_num(k_mesos) + " Mesos#fc0xFFFFFFFF#")
                elif not sm.canHold(k_id):
                    sm.sendSayOkay("#face2##fc0xFFFFFFFF#Your Cash inventory tab is full! Please make some space.")
                else:
                    chr.deductMoney(k_mesos)
                    chr.addItemToInventory(k_id, 1)
                    sm.sendSayOkay("#face1##fc0xFFFFFFFF#Purchase successful! Double-click #i" + str(k_id) + "# in your Cash tab to teach the skill to your pet.")
            elif pay_sel == 2:
                cur_cash = get_user_cash(chr)
                if cur_cash < k_cash:
                    sm.sendSayOkay("#face2##fc0xFFFFFFFF#You do not have enough Cash Points!\r\nRequired: #r" + format_num(k_cash) + " Points#fc0xFFFFFFFF#\r\nYou have: #b" + format_num(cur_cash) + " Points#fc0xFFFFFFFF#")
                elif not sm.canHold(k_id):
                    sm.sendSayOkay("#face2##fc0xFFFFFFFF#Your Cash inventory tab is full! Please make some space.")
                else:
                    deduct_user_cash(chr, k_cash)
                    chr.addItemToInventory(k_id, 1)
                    sm.sendSayOkay("#face1##fc0xFFFFFFFF#Purchase successful! Double-click #i" + str(k_id) + "# in your Cash tab to teach the skill to your pet.")

        elif cat == 99:
            sm.sendSayOkay("#face0##fc0xFFFFFFFF#Come back anytime to visit the pets! Goodbye~")
            break
