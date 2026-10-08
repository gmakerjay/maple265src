# Cash & Point Shop Depot
# Categorized shop for Cubes, Flames, Pets, Beauty, and Fashion separated by Gender (Male / Female / Unisex)
from net.swordie.ms.util import Util
from net.swordie.ms.enums import InvType

# ==============================================================================
# CATEGORY 1: Cubes & Potential (Unisex)
# ==============================================================================
CUBE_ITEMS = [
    # (id, name, unit_cost, desc)
    (5062009, "Red Cube", 1200, "Rerolls equipment potential up to Legendary tier."),
    (5062010, "Black Cube", 2200, "Rerolls potential with the choice to keep previous stats."),
    (5062500, "Bonus Potential Cube", 2400, "Rerolls bonus potential stats up to Legendary tier."),
    (5062024, "Violet Cube", 3000, "Rerolls potential and allows selecting 3 out of 6 lines."),
    (5062028, "Glowing Cube", 1500, "Rerolls potential with enhanced tier-up chance."),
    (5062029, "Bright Cube", 2500, "Rerolls potential with Before / After selection.")
]

# ==============================================================================
# CATEGORY 2: Flames & Upgrade Scrolls (Unisex)
# ==============================================================================
FLAME_SCROLL_ITEMS = [
    (2048716, "Powerful Rebirth Flame", 2000, "Adds powerful bonus stats (Tier 3 - 6) to equipment."),
    (2048717, "Eternal Rebirth Flame", 3500, "Adds highest-tier bonus stats (Tier 4 - 7) to equipment."),
    (2048744, "Black Rebirth Flame", 5000, "Adds bonus stats with the option to keep existing stats."),
    (5064000, "Protection Scroll", 3000, "Prevents item destruction on scroll failure (Level <= 150)."),
    (5064100, "Safety Scroll", 3000, "Prevents upgrade count deduction on scroll failure."),
    (5064300, "Return Scroll", 4000, "Allows keeping or discarding the results of a scroll attempt."),
    (5068100, "Pet Equip Protection Scroll", 2500, "Protects pet equipment from destruction on upgrade failure."),
    (2049000, "Clean Slate Scroll 20%", 1500, "Recovers 1 failed upgrade slot on equipment (20% rate).")
]

# ==============================================================================
# CATEGORY 3: Utility & Convenience (Unisex)
# ==============================================================================
UTILITY_ITEMS = [
    (5040004, "Hyper Teleport Rock (30 Days)", 5000, 30, "Unlimited instant teleport to any map in Maple World."),
    (5550000, "Add Pendant Slot (30 Days)", 15000, 30, "Unlocks the 2nd Pendant accessory equipment slot."),
    (5130000, "Safety Charm", 1000, 0, "Prevents EXP loss upon death in standard maps."),
    (5510000, "Wheel of Destiny", 1000, 0, "Instantly revives on the spot in boss fights with 100% HP/MP."),
    (5072000, "Super Megaphone", 2000, 0, "Broadcasts a message with your avatar to all channels."),
    (5076000, "Item Megaphone", 2000, 0, "Broadcasts an item tooltip preview to all players."),
    (5050000, "AP Reset Scroll", 5000, 0, "Resets all assigned Ability Points (STR, DEX, INT, LUK)."),
    (5050001, "SP Reset Scroll", 5000, 0, "Resets all assigned Skill Points for reallocation."),
    (5680000, "2x EXP Special Coupon", 5000, 0, "Grants 2x EXP rate for 1 hour."),
    (5680001, "2x Drop Special Coupon", 5000, 0, "Grants 2x Item Drop rate for 1 hour.")
]

# ==============================================================================
# CATEGORY 4: Pets & Pet Skills (Unisex)
# ==============================================================================
PET_ITEMS = [
    (5002396, "Sherbet (Vac Pet - 30 Days)", 100000, 30, "Special vacuum pet with massive item & meso loot radius."),
    (5180000, "Water of Life", 5000, 0, "Revives an expired regular pet for 90 days."),
    (5000049, "Pet Snack", 5000, 0, "Feed to Trainer Bartos' pet to unlock Multi-Pet skill (3 pets)."),
    (5190010, "Auto Buff Skill", 10000, 0, "Allows pet to automatically cast up to 2 active buff skills."),
    (5190001, "Auto HP Potion Skill", 5000, 0, "Allows pet to automatically consume HP recovery potions."),
    (5190006, "Auto MP Potion Skill", 5000, 0, "Allows pet to automatically consume MP recovery potions."),
    (5190002, "Expanded Auto Move Skill", 8000, 0, "Expands pet auto-movement speed and collection range by 3x."),
    (5190003, "Auto Move Skill", 5000, 0, "Allows pet to move automatically to pick up dropped items."),
    (5190005, "Ignore Item Skill", 5000, 0, "Prevents pet from picking up unwanted specific items."),
    (5190011, "Auto Feed Skill", 5000, 0, "Automatically feeds pet when fullness drops.")
]

# ==============================================================================
# CATEGORY 5: Fashion & Outfits (Male / Female / Unisex)
# ==============================================================================
# 5.1 Male Fashion Items (Male Only)
MALE_FASHION = [
    # Hats
    (1000103, "Tranquil Picnic Hat (M)", 15000, 0, "Picnic bowler hat for gentlemen [Male]."),
    (1000104, "Shepherd's Straw Hat (M)", 15000, 0, "Rustic straw hat for gentle shepherds [Male]."),
    (1005230, "Blue Marine Hat (M)", 15000, 0, "Crisp naval marine sailor hat [Male]."),
    (1004423, "Time Master Hat (M)", 20000, 0, "Master Time Masterpiece top hat [Male]."),
    # Overalls / Suits
    (1050522, "Tranquil Picnic Suit (M)", 35000, 0, "Spring picnic gentleman suit [Male]."),
    (1050524, "Summer Breeze Outfit (M)", 35000, 0, "Refreshing summer linen outfit [Male]."),
    (1050528, "Shepherd's Getup (M)", 35000, 0, "Pastoral shepherd vest and trousers [Male]."),
    (1050505, "High Noon Gunslinger Outfit (M)", 35000, 0, "Wild West sheriff duster coat [Male]."),
    (1050304, "Powder Butler's Digs (M)", 30000, 0, "Tailored butler uniform [Male]."),
    (1050346, "Little Trainer Outfit (M)", 30000, 0, "Sporty monster trainer getup [Male]."),
    (1050371, "Blue Marine Uniform (M)", 30000, 0, "Classic navy sailor uniform [Male]."),
    (1050478, "Evan Overall Gown (M)", 35000, 0, "Dragon Master Evan formal wizard robes [Male]."),
    (1050269, "Black Tuxedo (M)", 25000, 0, "Classic black formal gala tuxedo [Male]."),
    # Shoes
    (1070086, "Tranquil Picnic Shoes (M)", 10000, 0, "Leather oxford picnic shoes [Male]."),
    (1070115, "Shepherd's Boots (M)", 10000, 0, "Leather pastoral walking boots [Male].")
]

# 5.2 Female Fashion Items (Female Only)
FEMALE_FASHION = [
    # Hats
    (1001126, "Tranquil Picnic Straw Hat (F)", 15000, 0, "Lovely wide-brim ribbon straw hat [Female]."),
    (1001127, "Shepherd's Bow Bandana (F)", 15000, 0, "Cute floral bow headscarf [Female]."),
    (1005231, "Pink Marine Hat (F)", 15000, 0, "Pastel pink naval sailor beret [Female]."),
    # Dresses / Overalls
    (1051592, "Tranquil Picnic Dress (F)", 35000, 0, "Lace-trimmed picnic sundress [Female]."),
    (1051594, "Summer Breeze Outfit (F)", 35000, 0, "Breezy pastel summer floral dress [Female]."),
    (1051598, "Shepherd's Frock (F)", 35000, 0, "Pastoral cottagecore ruffled dress [Female]."),
    (1051564, "High Noon Gunslinger Dress (F)", 35000, 0, "Western cowgirl dress [Female]."),
    (1051381, "Powder Maid's Uniform (F)", 30000, 0, "Frill French maid dress [Female]."),
    (1051419, "Little Trainer Dress (F)", 30000, 0, "Cute monster trainer dress [Female]."),
    (1051441, "Pink Marine Uniform (F)", 30000, 0, "Pastel pink sailor marine dress [Female]."),
    (1051543, "Evan Overall Gown (F)", 35000, 0, "Dragon Master magical feminine robes [Female]."),
    (1051280, "White Wedding Dress (F)", 25000, 0, "Pure white bridal ballgown dress [Female]."),
    # Shoes
    (1071104, "Tranquil Picnic Shoes (F)", 10000, 0, "Dainty strapped picnic Mary Janes [Female]."),
    (1071131, "Shepherd's Clogs (F)", 10000, 0, "Charming rustic pastoral clogs [Female].")
]

# 5.3 Unisex Fashion & Weapons (Unisex - All Characters)
TRANSPARENT_EQUIPS = [
    (1002186, "Transparent Hat", 15000, 0, "Hides equipped hat while preserving all stats."),
    (1102039, "Transparent Cape", 15000, 0, "Hides equipped cape while preserving all stats."),
    (1082102, "Transparent Gloves", 15000, 0, "Hides equipped gloves while preserving all stats."),
    (1072153, "Transparent Shoes", 15000, 0, "Hides equipped shoes while preserving all stats."),
    (1702585, "Universal Transparent Weapon", 25000, 0, "Hides any equipped weapon while preserving all stats."),
    (1012104, "Transparent Face Accessory", 10000, 0, "Hides face accessory while preserving all stats."),
    (1022048, "Transparent Eye Accessory", 10000, 0, "Hides eye accessory while preserving all stats."),
    (1032024, "Transparent Earrings", 10000, 0, "Hides earrings while preserving all stats."),
    (1092045, "Transparent Shield", 10000, 0, "Hides shield / secondary while preserving all stats.")
]

UNISEX_WEAPONS_AND_SUITS = [
    # Universal Weapons (Cover all weapon types)
    (1702565, "Death's Scythe", 50000, 0, "Legendary floating reaper scythe weapon cover (all weapons)."),
    (1702586, "Dreaming Dandelion", 35000, 0, "Gentle floating dandelion weapon cover (all weapons)."),
    (1702588, "Black Cat Plush", 35000, 0, "Cute huggable black kitten weapon cover (all weapons)."),
    (1702591, "Grand Romance", 35000, 0, "Romantic blooming rose floral weapon cover (all weapons)."),
    (1702587, "Rockin' Guitar", 35000, 0, "Electric rockstar guitar weapon skin (all weapons)."),
    (1702589, "Fairy Blossom", 35000, 0, "Enchanted sparkling fairy wand weapon skin (all weapons)."),
    # Unisex Overalls & Costumes
    (1051455, "Time Cantabile", 40000, 0, "Master Time Masterpiece unisex royal suit [Unisex]."),
    (1053446, "Superstar Pink Bean Onesie", 35000, 0, "Adorable cuddly Pink Bean onesie costume [Unisex]."),
    (1053450, "Light Executor Garb", 35000, 0, "Holy white executor tactical robes [Unisex]."),
    (1053449, "Dark Executor Garb", 35000, 0, "Dark shadow executor stealth robes [Unisex]."),
    (1005375, "Superstar Pink Bean Headphones", 20000, 0, "Pink Bean ear-cuffed gaming headphones [Unisex]."),
    (1005380, "Summer Breeze Floral Crown", 20000, 0, "Delicate blooming flower tiara crown [Unisex].")
]

def format_num(val):
    return Util.getNumberFormat(val)

def get_char_gender(chr):
    try:
        return chr.getAvatarData().getAvatarLook().getGender() # 0 = Male, 1 = Female
    except:
        try:
            return chr.getAvatarData().getCharacterStat().getGender()
        except:
            return 0

def get_gender_label(gender):
    if gender == 0:
        return "#b[Male]#k"
    elif gender == 1:
        return "#r[Female]#k"
    return "#g[Unisex]#k"

def get_points(chr):
    user = chr.getUser()
    if user != None:
        return user.getMaplePoints(), user.getDonationPoints()
    return 0, 0

def buy_stackable_item(sm, chr, item_id, item_name, unit_cost, desc):
    while True:
        mp, dp = get_points(chr)
        text = "#fs13#=== #e#b" + item_name + "#k#n ===\r\n"
        text += "Item: #i" + str(item_id) + "# #b#z" + str(item_id) + "##k\r\n"
        text += "Description: #fs11#" + desc + "#fs13#\r\n"
        text += "Price: #r" + format_num(unit_cost) + " Maple Points#k each\r\n"
        text += "Your Balance: #e#d" + format_num(mp) + " Maple Points#k#n\r\n\r\n"
        text += "Select quantity to purchase:\r\n"
        text += "#b#L1#Buy 1x (" + format_num(unit_cost) + " Points)#l\r\n"
        text += "#L10#Buy 10x (" + format_num(unit_cost * 10) + " Points)#l\r\n"
        text += "#L50#Buy 50x (" + format_num(unit_cost * 50) + " Points)#l\r\n"
        text += "#L100#Buy 100x (" + format_num(unit_cost * 100) + " Points)#l\r\n"
        text += "#L999#Custom Quantity...#l\r\n"
        text += "#d#L0#Back#l#k\r\n"

        qty_sel = sm.sendNext(text)
        qty = 0
        if qty_sel in [1, 10, 50, 100]:
            qty = qty_sel
        elif qty_sel == 999:
            qty = sm.sendAskNumber("Enter quantity to purchase (1 - 1,000):", 1, 1, 1000)
        else:
            return

        if qty <= 0:
            return

        total_cost = int(qty) * unit_cost
        mp, dp = get_points(chr)
        if mp < total_cost:
            sm.sendSayOkay("#fs13#You do not have enough Maple Points!\r\n\r\n"
                           "Required: #r" + format_num(total_cost) + " Points#k\r\n"
                           "You have: #b" + format_num(mp) + " Points#k")
            continue

        if not sm.canHold(item_id, qty):
            sm.sendSayOkay("#fs13#You do not have enough inventory space to hold this item!\r\n\r\n"
                           "Please free up some slots and try again.")
            continue

        chr.addMaplePoint(-total_cost)
        chr.addItemToInventory(item_id, qty)
        new_mp, _ = get_points(chr)
        sm.sendSayOkay("#fs13##e#b[Purchase Successful!]#k#n\r\n\r\n"
                       "You received: #i" + str(item_id) + "# #b" + item_name + " x" + str(qty) + "#k\r\n"
                       "Deducted: #r" + format_num(total_cost) + " Maple Points#k\r\n"
                       "Remaining Balance: #d" + format_num(new_mp) + " Maple Points#k")
        return

def buy_single_equip(sm, chr, item_id, item_name, cost, days, desc, target_gender):
    # target_gender: 0=Male, 1=Female, 2=Unisex
    char_gender = get_char_gender(chr)
    mp, dp = get_points(chr)

    warn_text = ""
    if target_gender == 0 and char_gender != 0:
        warn_text = "\r\n#r(Notice: This item is for Male characters, but your character is Female!)#k\r\n"
    elif target_gender == 1 and char_gender != 1:
        warn_text = "\r\n#r(Notice: This item is for Female characters, but your character is Male!)#k\r\n"

    text = "#fs13#=== #e#b" + item_name + "#k#n ===\r\n\r\n"
    text += "Item: #i" + str(item_id) + "# #b#z" + str(item_id) + "##k\r\n"
    text += "Target Gender: " + get_gender_label(target_gender) + "\r\n"
    text += "Description: #fs11#" + desc + "#fs13#\r\n"
    if days > 0:
        text += "Duration: #r" + str(days) + " Days#k\r\n"
    else:
        text += "Duration: #gPermanent#k\r\n"
    text += "Price: #e#r" + format_num(cost) + " Maple Points#k#n\r\n"
    text += "Your Balance: #e#d" + format_num(mp) + " Maple Points#k#n\r\n"
    text += warn_text + "\r\n"
    text += "Would you like to purchase this item?"

    confirm = sm.sendAskYesNo(text)
    if not confirm:
        return

    mp, dp = get_points(chr)
    if mp < cost:
        sm.sendSayOkay("#fs13#You do not have enough Maple Points!\r\n\r\n"
                       "Required: #r" + format_num(cost) + " Points#k\r\n"
                       "You have: #b" + format_num(mp) + " Points#k")
        return

    if not sm.canHold(item_id, 1):
        sm.sendSayOkay("#fs13#You do not have enough inventory space to hold this item!\r\n\r\n"
                       "Please free up some slots and try again.")
        return

    chr.addMaplePoint(-cost)
    if days > 0:
        chr.addItemToInventory(item_id, 1, "day", days)
    else:
        chr.addItemToInventory(item_id, 1)

    new_mp, _ = get_points(chr)
    sm.sendSayOkay("#fs13##e#b[Purchase Successful!]#k#n\r\n\r\n"
                   "You received: #i" + str(item_id) + "# #b" + item_name + "#k\r\n"
                   "Deducted: #r" + format_num(cost) + " Maple Points#k\r\n"
                   "Remaining Balance: #d" + format_num(new_mp) + " Maple Points#k")

def buy_transparent_bundle(sm, chr):
    BUNDLE_COST = 100000 # 100k points for all 9 items (saved 35k)
    mp, _ = get_points(chr)

    text = "#fs13#=== #e#b[Full Transparent Equipment Set Bundle]#k#n ===\r\n\r\n"
    text += "Contains all 9 Permanent Transparent items (Unisex - All Characters):\r\n"
    for tid, tname, _, _, _ in TRANSPARENT_EQUIPS:
        text += "#i" + str(tid) + "# #b#z" + str(tid) + "##k\r\n"
    text += "\r\nBundle Price: #e#r" + format_num(BUNDLE_COST) + " Maple Points#k#n (Save 35,000 Points!)\r\n"
    text += "Your Balance: #e#d" + format_num(mp) + " Maple Points#k#n\r\n\r\n"
    text += "Would you like to purchase the complete Transparent Set?"

    confirm = sm.sendAskYesNo(text)
    if not confirm:
        return

    mp, _ = get_points(chr)
    if mp < BUNDLE_COST:
        sm.sendSayOkay("#fs13#You do not have enough Maple Points (" + format_num(BUNDLE_COST) + " required)!")
        return

    for tid, _, _, _, _ in TRANSPARENT_EQUIPS:
        if not sm.canHold(tid, 1):
            sm.sendSayOkay("#fs13#You need at least 9 free Equip / Cash inventory slots!\r\n\r\n"
                           "Please free up some slots and try again.")
            return

    chr.addMaplePoint(-BUNDLE_COST)
    for tid, _, _, _, _ in TRANSPARENT_EQUIPS:
        chr.addItemToInventory(tid, 1)

    new_mp, _ = get_points(chr)
    sm.sendSayOkay("#fs13##e#b[Full Transparent Set Purchased Successfully!]#k#n\r\n\r\n"
                   "All 9 transparent equips have been added to your inventory!\r\n"
                   "Deducted: #r" + format_num(BUNDLE_COST) + " Maple Points#k\r\n"
                   "Remaining Balance: #d" + format_num(new_mp) + " Maple Points#k")

def handle_slot_expansion(sm, chr):
    EXP_COST = 10000
    while True:
        mp, _ = get_points(chr)
        eq_slots = chr.getInventoryByType(InvType.EQUIP).getSlots()
        use_slots = chr.getInventoryByType(InvType.CONSUME).getSlots()
        setup_slots = chr.getInventoryByType(InvType.INSTALL).getSlots()
        etc_slots = chr.getInventoryByType(InvType.ETC).getSlots()
        cash_slots = chr.getInventoryByType(InvType.CASH).getSlots()

        text = "#fs13#=== #e#bInventory Slot Expansion Depot#k#n ===\r\n"
        text += "Cost: #r" + format_num(EXP_COST) + " Maple Points#k for #b+8 slots#k (Max: 128 slots).\r\n"
        text += "Your Balance: #e#d" + format_num(mp) + " Maple Points#k#n\r\n\r\n"
        text += "Select inventory tab to expand:\r\n"
        text += "#b#L1#Expand Equip Slots (Current: " + str(eq_slots) + " / 128)#l\r\n"
        text += "#L2#Expand Use Slots (Current: " + str(use_slots) + " / 128)#l\r\n"
        text += "#L3#Expand Setup Slots (Current: " + str(setup_slots) + " / 128)#l\r\n"
        text += "#L4#Expand Etc Slots (Current: " + str(etc_slots) + " / 128)#l\r\n"
        text += "#L5#Expand Cash Slots (Current: " + str(cash_slots) + " / 128)#l\r\n"
        text += "#d#L0#Back to Main Shop#l#k\r\n"

        sel = sm.sendNext(text)
        if sel == 0:
            return

        inv_map = {1: (InvType.EQUIP, "Equip"),
                   2: (InvType.CONSUME, "Use"),
                   3: (InvType.INSTALL, "Setup"),
                   4: (InvType.ETC, "Etc"),
                   5: (InvType.CASH, "Cash")}

        if sel not in inv_map:
            continue

        itype, iname = inv_map[sel]
        cur = chr.getInventoryByType(itype).getSlots()
        if cur >= 128:
            sm.sendSayOkay("Your #b" + iname + "#k inventory tab is already maxed out at 128 slots!")
            continue

        mp, _ = get_points(chr)
        if mp < EXP_COST:
            sm.sendSayOkay("You do not have enough Maple Points (" + format_num(EXP_COST) + " required)!")
            continue

        chr.addMaplePoint(-EXP_COST)
        sm.addInventorySlotsByInvType(8, sel)
        new_slots = chr.getInventoryByType(itype).getSlots()
        sm.sendSayOkay("#fs13##e#b[Slot Expansion Successful!]#k#n\r\n\r\n"
                       "Your #b" + iname + "#k inventory has expanded to #e#g" + str(new_slots) + " slots#k#n!\r\n"
                       "Deducted: #r" + format_num(EXP_COST) + " Maple Points#k")

def open_point_shop(sm, chr):
    while True:
        char_gender = get_char_gender(chr)
        mp, dp = get_points(chr)

        menu = "#fs13#=== #e#d[Cash & Point Shop Depot]#k#n ===\r\n"
        menu += "Character: " + get_gender_label(char_gender) + "  |  Points: #e#b" + format_num(mp) + " Maple Points#k#n  |  DP: #e#r" + format_num(dp) + "#k#n\r\n\r\n"
        menu += "#b#L1##e[Cubes & Potential System (Unisex)]#n#k\r\n"
        menu += "   #fs11#Red Cube, Black Cube, Bonus Potential, Violet, Glowing & Bright Cubes.#fs13#\r\n"
        menu += "#b#L2##e[Rebirth Flames & Scrolls (Unisex)]#n#k\r\n"
        menu += "   #fs11#Powerful / Eternal / Black Flames, Protection, Safety, Return Scrolls.#fs13#\r\n"
        menu += "#b#L3##e[Utility & Convenience (Unisex)]#n#k\r\n"
        menu += "   #fs11#Hyper Teleport Rock, Pendant Slot (30D), Revives, Slot Expansions.#fs13#\r\n"
        menu += "#b#L4##e[Pets & Pet Skills (Unisex)]#n#k\r\n"
        menu += "   #fs11#Sherbet Vac Pet, Auto Buff, Pet Snack, Auto HP/MP, Water of Life.#fs13#\r\n"
        menu += "#b#L5##e[Fashion & Outfits (Male / Female / Unisex)]#n#k\r\n"
        menu += "   #fs11#Separated into Male, Female, and Unisex/Weapons/Transparent items.#fs13#\r\n"
        menu += "#b#L6##e[Royal Beauty Salon (Male / Female / Unisex)]#n#k\r\n"
        menu += "   #fs11#VIP Royal Hairstyles & Face Styles separated by Male / Female / Dyes.#fs13#\r\n"
        menu += "#d#L99#Exit Shop#l#k\r\n"

        cat = sm.sendNext(menu)
        if cat == 99 or cat < 1 or cat > 6:
            break

        if cat == 1:
            # Cubes (Unisex)
            while True:
                mp, dp = get_points(chr)
                c_menu = "#fs13#=== #e#bCubes & Potential System#k#n ===\r\n"
                c_menu += "Current Points: #e#d" + format_num(mp) + " Maple Points#k#n\r\n\r\n"
                for idx, (cid, cname, ccost, cdesc) in enumerate(CUBE_ITEMS):
                    c_menu += "#L" + str(idx) + "##i" + str(cid) + "# #b" + cname + "#k - #r" + format_num(ccost) + " Points#k\r\n    #fs11#" + cdesc + "#fs13##l\r\n"
                c_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                c_sel = sm.sendNext(c_menu)
                if c_sel == 99 or c_sel < 0 or c_sel >= len(CUBE_ITEMS):
                    break
                cid, cname, ccost, cdesc = CUBE_ITEMS[c_sel]
                buy_stackable_item(sm, chr, cid, cname, ccost, cdesc)

        elif cat == 2:
            # Flames & Scrolls (Unisex)
            while True:
                mp, dp = get_points(chr)
                f_menu = "#fs13#=== #e#bRebirth Flames & Upgrade Scrolls#k#n ===\r\n"
                f_menu += "Current Points: #e#d" + format_num(mp) + " Maple Points#k#n\r\n\r\n"
                for idx, (fid, fname, fcost, fdesc) in enumerate(FLAME_SCROLL_ITEMS):
                    f_menu += "#L" + str(idx) + "##i" + str(fid) + "# #b" + fname + "#k - #r" + format_num(fcost) + " Points#k\r\n    #fs11#" + fdesc + "#fs13##l\r\n"
                f_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                f_sel = sm.sendNext(f_menu)
                if f_sel == 99 or f_sel < 0 or f_sel >= len(FLAME_SCROLL_ITEMS):
                    break
                fid, fname, fcost, fdesc = FLAME_SCROLL_ITEMS[f_sel]
                buy_stackable_item(sm, chr, fid, fname, fcost, fdesc)

        elif cat == 3:
            # Utility & Slots (Unisex)
            while True:
                mp, dp = get_points(chr)
                u_menu = "#fs13#=== #e#bUtility & Inventory Expansion#k#n ===\r\n"
                u_menu += "Current Points: #e#d" + format_num(mp) + " Maple Points#k#n\r\n\r\n"
                u_menu += "#e#r#L100#[* Expand Inventory Slots (+8 Slots)]#n#k\r\n   #fs11#Expand Equip, Use, Setup, Etc, or Cash tabs up to 128 slots.#fs13##l\r\n\r\n"
                for idx, (uid, uname, ucost, udays, udesc) in enumerate(UTILITY_ITEMS):
                    dur_str = " (30 Days)" if udays > 0 else ""
                    u_menu += "#L" + str(idx) + "##i" + str(uid) + "# #b" + uname + "#k - #r" + format_num(ucost) + " Points#k" + dur_str + "\r\n    #fs11#" + udesc + "#fs13##l\r\n"
                u_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                u_sel = sm.sendNext(u_menu)
                if u_sel == 99:
                    break
                elif u_sel == 100:
                    handle_slot_expansion(sm, chr)
                elif 0 <= u_sel < len(UTILITY_ITEMS):
                    uid, uname, ucost, udays, udesc = UTILITY_ITEMS[u_sel]
                    if udays > 0:
                        buy_single_equip(sm, chr, uid, uname, ucost, udays, udesc, 2)
                    else:
                        buy_stackable_item(sm, chr, uid, uname, ucost, udesc)

        elif cat == 4:
            # Pets (Unisex)
            while True:
                mp, dp = get_points(chr)
                p_menu = "#fs13#=== #e#bPets, Vac Pets & Pet Skills#k#n ===\r\n"
                p_menu += "Current Points: #e#d" + format_num(mp) + " Maple Points#k#n\r\n\r\n"
                for idx, (pid, pname, pcost, pdays, pdesc) in enumerate(PET_ITEMS):
                    dur_str = " (" + str(pdays) + " Days)" if pdays > 0 else ""
                    p_menu += "#L" + str(idx) + "##i" + str(pid) + "# #b" + pname + "#k - #r" + format_num(pcost) + " Points#k" + dur_str + "\r\n    #fs11#" + pdesc + "#fs13##l\r\n"
                p_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                p_sel = sm.sendNext(p_menu)
                if p_sel == 99 or p_sel < 0 or p_sel >= len(PET_ITEMS):
                    break
                pid, pname, pcost, pdays, pdesc = PET_ITEMS[p_sel]
                if pdays > 0:
                    buy_single_equip(sm, chr, pid, pname, pcost, pdays, pdesc, 2)
                else:
                    buy_stackable_item(sm, chr, pid, pname, pcost, pdesc)

        elif cat == 5:
            # Fashion & Outfits (Male / Female / Unisex)
            while True:
                char_gender = get_char_gender(chr)
                mp, _ = get_points(chr)
                f_top = "#fs13#=== #e#d[Fashion & Outfits Depot]#k#n ===\r\n"
                f_top += "Your Character: " + get_gender_label(char_gender) + "\r\n"
                f_top += "Current Points: #e#d" + format_num(mp) + " Maple Points#k#n\r\n\r\n"
                f_top += "Please select a category:\r\n"
                f_top += "#b#L1##e[1. Male Fashion & Outfits (Male Only)]#n#k\r\n"
                f_top += "   #fs11#Hats, Suits, Outfits, and Shoes for Male characters.#fs13#\r\n"
                f_top += "#r#L2##e[2. Female Fashion & Outfits (Female Only)]#n#k\r\n"
                f_top += "   #fs11#Hats, Dresses, Sundresses, and Shoes for Female characters.#fs13#\r\n"
                f_top += "#g#L3##e[3. Unisex Fashion, Weapons & Transparent (All Characters)]#n#k\r\n"
                f_top += "   #fs11#Full Transparent Set, All-Weapon covers, and Onesie Costumes.#fs13#\r\n"
                f_top += "#d#L99#[Back to Main Menu]#k#l\r\n"

                f_sub = sm.sendNext(f_top)
                if f_sub == 99:
                    break

                elif f_sub == 1:
                    # Male Fashion (Male Only)
                    while True:
                        mp, _ = get_points(chr)
                        m_menu = "#fs13#=== #e#b[Male Fashion & Outfits]#k#n ===\r\n"
                        if char_gender != 0:
                            m_menu += "#r(Notice: Your character is " + get_gender_label(char_gender) + ". Male equips may not fit!)#k\r\n"
                        m_menu += "Current Points: #e#d" + format_num(mp) + " Maple Points#k#n\r\n\r\n"
                        for idx, (mid, mname, mcost, mdays, mdesc) in enumerate(MALE_FASHION):
                            m_menu += "#L" + str(idx) + "##i" + str(mid) + "# #b" + mname + "#k - #r" + format_num(mcost) + " Points#k\r\n    #fs11#" + mdesc + "#fs13##l\r\n"
                        m_menu += "#d#L99#[Back to Fashion Menu]#k#l\r\n"

                        m_sel = sm.sendNext(m_menu)
                        if m_sel == 99 or m_sel < 0 or m_sel >= len(MALE_FASHION):
                            break
                        mid, mname, mcost, mdays, mdesc = MALE_FASHION[m_sel]
                        buy_single_equip(sm, chr, mid, mname, mcost, mdays, mdesc, 0)

                elif f_sub == 2:
                    # Female Fashion (Female Only)
                    while True:
                        mp, _ = get_points(chr)
                        w_menu = "#fs13#=== #e#r[Female Fashion & Outfits]#k#n ===\r\n"
                        if char_gender != 1:
                            w_menu += "#r(Notice: Your character is " + get_gender_label(char_gender) + ". Female equips may not fit!)#k\r\n"
                        w_menu += "Current Points: #e#d" + format_num(mp) + " Maple Points#k#n\r\n\r\n"
                        for idx, (wid, wname, wcost, wdays, wdesc) in enumerate(FEMALE_FASHION):
                            w_menu += "#L" + str(idx) + "##i" + str(wid) + "# #b" + wname + "#k - #r" + format_num(wcost) + " Points#k\r\n    #fs11#" + wdesc + "#fs13##l\r\n"
                        w_menu += "#d#L99#[Back to Fashion Menu]#k#l\r\n"

                        w_sel = sm.sendNext(w_menu)
                        if w_sel == 99 or w_sel < 0 or w_sel >= len(FEMALE_FASHION):
                            break
                        wid, wname, wcost, wdays, wdesc = FEMALE_FASHION[w_sel]
                        buy_single_equip(sm, chr, wid, wname, wcost, wdays, wdesc, 1)

                elif f_sub == 3:
                    # Unisex & Others
                    while True:
                        mp, _ = get_points(chr)
                        u_fmenu = "#fs13#=== #e#g[Unisex Fashion & Weapons]#k#n ===\r\n"
                        u_fmenu += "#fs11#These items can be equipped by both Male and Female characters.#fs13#\r\n"
                        u_fmenu += "Current Points: #e#d" + format_num(mp) + " Maple Points#k#n\r\n\r\n"
                        u_fmenu += "#b#L1##e[Full Transparent Equipment Set]#n#k\r\n"
                        u_fmenu += "   #fs11#Transparent Hat, Cape, Shoes, Gloves, Weapon, Face, Eye, Earrings.#fs13#\r\n"
                        u_fmenu += "#b#L2##e[Exclusive Weapon Covers & Costumes]#n#k\r\n"
                        u_fmenu += "   #fs11#Death's Scythe, Time Cantabile, Dandelion, Pink Bean Onesie...#fs13#\r\n"
                        u_fmenu += "#d#L99#[Back to Fashion Menu]#k#l\r\n"

                        u_sub = sm.sendNext(u_fmenu)
                        if u_sub == 99:
                            break
                        elif u_sub == 1:
                            # Transparent Equips
                            while True:
                                mp, _ = get_points(chr)
                                t_menu = "#fs13#=== #e#bTransparent Equipment Set (Unisex)#k#n ===\r\n"
                                t_menu += "Current Points: #e#d" + format_num(mp) + " Maple Points#k#n\r\n\r\n"
                                t_menu += "#e#r#L100#[* Purchase Complete 9-Item Transparent Bundle (100,000 Points - Save 35k!)]#n#k#l\r\n\r\n"
                                for tidx, (tid, tname, tcost, tdays, tdesc) in enumerate(TRANSPARENT_EQUIPS):
                                    t_menu += "#L" + str(tidx) + "##i" + str(tid) + "# #b" + tname + "#k - #r" + format_num(tcost) + " Points#k\r\n    #fs11#" + tdesc + "#fs13##l\r\n"
                                t_menu += "#d#L99#[Back to Unisex Menu]#k#l\r\n"

                                t_sel = sm.sendNext(t_menu)
                                if t_sel == 99:
                                    break
                                elif t_sel == 100:
                                    buy_transparent_bundle(sm, chr)
                                elif 0 <= t_sel < len(TRANSPARENT_EQUIPS):
                                    tid, tname, tcost, tdays, tdesc = TRANSPARENT_EQUIPS[t_sel]
                                    buy_single_equip(sm, chr, tid, tname, tcost, tdays, tdesc, 2)

                        elif u_sub == 2:
                            # Weapons & Unisex suits
                            while True:
                                mp, _ = get_points(chr)
                                wpn_menu = "#fs13#=== #e#bWeapon Covers & Costumes (Unisex)#k#n ===\r\n"
                                wpn_menu += "Current Points: #e#d" + format_num(mp) + " Maple Points#k#n\r\n\r\n"
                                for widx, (wid, wname, wcost, wdays, wdesc) in enumerate(UNISEX_WEAPONS_AND_SUITS):
                                    wpn_menu += "#L" + str(widx) + "##i" + str(wid) + "# #b" + wname + "#k - #r" + format_num(wcost) + " Points#k\r\n    #fs11#" + wdesc + "#fs13##l\r\n"
                                wpn_menu += "#d#L99#[Back to Unisex Menu]#k#l\r\n"

                                wpn_sel = sm.sendNext(wpn_menu)
                                if wpn_sel == 99 or wpn_sel < 0 or wpn_sel >= len(UNISEX_WEAPONS_AND_SUITS):
                                    break
                                wid, wname, wcost, wdays, wdesc = UNISEX_WEAPONS_AND_SUITS[wpn_sel]
                                buy_single_equip(sm, chr, wid, wname, wcost, wdays, wdesc, 2)

        elif cat == 6:
            # Royal Beauty Salon (Male / Female / Unisex)
            while True:
                char_gender = get_char_gender(chr)
                mp, dp = get_points(chr)
                b_menu = "#fs13#=== #e#b[Royal Beauty Salon]#k#n ===\r\n"
                b_menu += "Your Character: " + get_gender_label(char_gender) + "\r\n"
                b_menu += "Donation Points: #e#r" + format_num(dp) + " DP#k#n  |  Maple Points: #e#b" + format_num(mp) + "#k#n\r\n\r\n"
                b_menu += "Please select a beauty service:\r\n"
                b_menu += "#b#L1##e[1. Male Hair & Face Styles (Male Only)]#n#k (10,000 DP)\r\n"
                b_menu += "   #fs11#Browse and preview Royal Hairstyles & Faces for Male characters.#fs13#\r\n"
                b_menu += "#r#L2##e[2. Female Hair & Face Styles (Female Only)]#n#k (10,000 DP)\r\n"
                b_menu += "   #fs11#Browse and preview Royal Hairstyles & Faces for Female characters.#fs13#\r\n"
                b_menu += "#g#L3##e[3. Beauty Care, Dyes & Lenses (Unisex)]#n#k\r\n"
                b_menu += "   #fs11#Hair Color Coupons, Skin Care, and Cosmetic Lens Coupons.#fs13#\r\n"
                b_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                b_sel = sm.sendNext(b_menu)
                if b_sel == 99:
                    break

                elif b_sel == 1:
                    # Male Beauty (Male Only)
                    if char_gender != 0:
                        warn = sm.sendAskYesNo("#fs13##rNotice:#k Your character is " + get_gender_label(char_gender) + "\r\n"
                                               "Male hairstyles/faces might not render properly on female characters!\r\n\r\n"
                                               "Do you wish to proceed?")
                        if not warn:
                            continue
                    male_b_menu = "#fs13#=== #e#b[Male Hair & Face Styles]#k#n ===\r\n"
                    male_b_menu += "Cost: #r10,000 DP#k per change (Preview before confirming)\r\n"
                    male_b_menu += "Your DP: #e#d" + format_num(dp) + " DP#k#n\r\n\r\n"
                    male_b_menu += "#b#L1#Change Male Hairstyle (Royal Hair)#l\r\n"
                    male_b_menu += "#L2#Change Male Face Style (Royal Face)#l\r\n"
                    male_b_menu += "#d#L99#[Back]#k#l\r\n"

                    mb_choice = sm.sendNext(male_b_menu)
                    if mb_choice == 1:
                        sm.giveCharacterLookByXuVang(True)
                    elif mb_choice == 2:
                        sm.giveCharacterLookByXuVang(False)

                elif b_sel == 2:
                    # Female Beauty (Female Only)
                    if char_gender != 1:
                        warn = sm.sendAskYesNo("#fs13##rNotice:#k Your character is " + get_gender_label(char_gender) + "\r\n"
                                               "Female hairstyles/faces might not render properly on male characters!\r\n\r\n"
                                               "Do you wish to proceed?")
                        if not warn:
                            continue
                    fem_b_menu = "#fs13#=== #e#r[Female Hair & Face Styles]#k#n ===\r\n"
                    fem_b_menu += "Cost: #r10,000 DP#k per change (Preview before confirming)\r\n"
                    fem_b_menu += "Your DP: #e#d" + format_num(dp) + " DP#k#n\r\n\r\n"
                    fem_b_menu += "#b#L1#Change Female Hairstyle (Royal Hair)#l\r\n"
                    fem_b_menu += "#L2#Change Female Face Style (Royal Face)#l\r\n"
                    fem_b_menu += "#d#L99#[Back]#k#l\r\n"

                    fb_choice = sm.sendNext(fem_b_menu)
                    if fb_choice == 1:
                        sm.giveCharacterLookByXuVang(True)
                    elif fb_choice == 2:
                        sm.giveCharacterLookByXuVang(False)

                elif b_sel == 3:
                    # Unisex Care (Unisex)
                    while True:
                        mp, _ = get_points(chr)
                        care_menu = "#fs13#=== #e#g[Beauty Care, Dyes & Lenses]#k#n ===\r\n"
                        care_menu += "Current Points: #e#d" + format_num(mp) + " Maple Points#k#n\r\n\r\n"
                        care_menu += "#b#L1##i5150053# #bVIP Hair Color Coupon#k - #r5,000 Maple Points#k\r\n   #fs11#Dye your hair to any preferred color.#fs13##l\r\n"
                        care_menu += "#b#L2##i5153015# #bSkin Care Coupon#k - #r5,000 Maple Points#k\r\n   #fs11#Changes your character skin complexion.#fs13##l\r\n"
                        care_menu += "#b#L3##i5152053# #bRoyal Cosmetic Lens Coupon#k - #r5,000 Maple Points#k\r\n   #fs11#Changes eye contact lens color.#fs13##l\r\n"
                        care_menu += "#d#L99#[Back to Beauty Menu]#k#l\r\n"

                        c_choice = sm.sendNext(care_menu)
                        if c_choice == 99:
                            break
                        elif c_choice == 1:
                            buy_stackable_item(sm, chr, 5150053, "VIP Hair Color Coupon", 5000, "Dye hair to any preferred color.")
                        elif c_choice == 2:
                            buy_stackable_item(sm, chr, 5153015, "Skin Care Coupon", 5000, "Change character skin complexion.")
                        elif c_choice == 3:
                            buy_stackable_item(sm, chr, 5152053, "Royal Cosmetic Lens Coupon", 5000, "Change eye contact lens color.")
