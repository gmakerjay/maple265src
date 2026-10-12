# ==============================================================================
# Cash & Point Shop Depot (Lucid - 9063159)
# Massive Fashion Collection, Cubes, Flames, Pets, Beauty & Transparent Sets
# High-Contrast Pure White Font (#fc0xFFFFFFFF#) for Maximum In-Game Clarity
# ==============================================================================
from net.swordie.ms.util import Util
from net.swordie.ms.enums import InvType

NPC_ID = 9063159 # Lucid

# ==============================================================================
# CATEGORY 1: Cubes & Potential (Unisex)
# ==============================================================================
CUBE_ITEMS = [
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
# CATEGORY 4: Transparent Equipment (Full Set)
# ==============================================================================
TRANSPARENT_EQUIPS = [
    (1002186, "Transparent Hat", 15000, 0, "Hides equipped hat while preserving all stats."),
    (1702585, "Universal Transparent Weapon", 25000, 0, "Hides any equipped weapon while preserving all stats."),
    (1102039, "Transparent Cape", 15000, 0, "Hides equipped cape while preserving all stats."),
    (1082102, "Transparent Gloves", 15000, 0, "Hides equipped gloves while preserving all stats."),
    (1072153, "Transparent Shoes", 15000, 0, "Hides equipped shoes while preserving all stats."),
    (1012104, "Transparent Face Accessory", 10000, 0, "Hides face accessory while preserving all stats."),
    (1022048, "Transparent Eye Accessory", 10000, 0, "Hides eye accessory while preserving all stats."),
    (1032024, "Transparent Earrings", 10000, 0, "Hides earrings while preserving all stats."),
    (1092056, "Transparent Shield", 10000, 0, "Hides shield / secondary weapon while preserving all stats.")
]

# ==============================================================================
# CATEGORY 5: Universal Weapon Covers (All Weapons)
# ==============================================================================
WEAPON_COVERS = [
    (1702565, "Death's Scythe", 50000, 0, "Legendary floating reaper scythe weapon cover (all weapons)."),
    (1703578, "Verus Hilla's Scythe", 50000, 0, "Ominous dark soul scythe wielded by True Hilla."),
    (1703393, "Abyssal Shrine Black Scythe", 45000, 0, "Forbidden shadow scythe infused with void energy."),
    (1703745, "White Checkmate Scythe", 45000, 0, "Elegant ivory grandmaster scythe."),
    (1702586, "Dreaming Dandelion", 35000, 0, "Gentle floating dandelion floral weapon skin."),
    (1702588, "Black Cat Plush", 35000, 0, "Cute huggable black kitten plush weapon."),
    (1702591, "Grand Romance", 35000, 0, "Romantic blooming rose bouquet weapon skin."),
    (1702587, "Rockin' Guitar", 35000, 0, "Electric rockstar guitar weapon skin."),
    (1702589, "Fairy Blossom", 35000, 0, "Enchanted sparkling fairy wand weapon skin."),
    (1702142, "Pink Angel Stick", 30000, 0, "Glittering magical girl heart wand."),
    (1702154, "Plasma Saber", 30000, 0, "Futuristic glowing neon sci-fi blade."),
    (1702155, "Shooting Star", 35000, 0, "Radiant celestial shooting star blade."),
    (1702124, "My Friend Kitty", 25000, 0, "Adorable playful kitten sitting on a wand."),
    (1702125, "Heart Cane", 25000, 0, "Gentleman's polished heart cane.")
]

# ==============================================================================
# CATEGORY 6: Wings, Capes & Back Auras
# ==============================================================================
WINGS_AND_CAPES = [
    (1102532, "Light Wing Cherubim", 35000, 0, "Sacred radiant angel wings with shimmering aura."),
    (1102554, "Succubus Wings", 35000, 0, "Dark demonic bat wings with purple shadow mist."),
    (1102546, "Blue Bird Dream Wings", 30000, 0, "Soft ethereal sky blue feathered dream wings."),
    (1102547, "Amethyst Dream Wings", 30000, 0, "Enchanted violet crystal butterfly wings."),
    (1102005, "Baby Angel Wings", 25000, 0, "Cute small white fluffy cherub wings."),
    (1102006, "Devil Wings", 25000, 0, "Classic pointed dark devil wings."),
    (1102501, "Friendly Nine-Tailed Fox Tails", 40000, 0, "Mystical nine fluffy golden fox tails."),
    (1102503, "Cat Lolita Cape", 30000, 0, "Frilly gothic ribbon cape with playful cat tail."),
    (1102530, "Spark Fairy Cape", 30000, 0, "Sparkling stardust trail that follows your steps."),
    (1102537, "Magic Star Cape", 30000, 0, "Constellation halo orb that orbits behind you.")
]

# ==============================================================================
# CATEGORY 7: Hats, Ribbons, Hoodies & Halos
# ==============================================================================
HATS_AND_HEADWEAR = [
    (1005375, "Superstar Pink Bean Headphones", 25000, 0, "Pink Bean ear-cuffed gaming headphones."),
    (1005380, "Summer Breeze Floral Crown", 25000, 0, "Delicate blooming flower tiara crown."),
    (1004423, "Time Master Top Hat", 25000, 0, "Master Time Masterpiece gentleman's top hat."),
    (1003131, "Black Dressy Ribbon", 20000, 0, "Elegant satin black hair ribbon."),
    (1003780, "Frilly Pink Bean Hat", 20000, 0, "Ruffled cute Pink Bean plush hat."),
    (1003865, "Starlight Wings Halo", 30000, 0, "Luminous floating halo with mini angel wings."),
    (1004081, "Dawn Bear Hoodie", 25000, 0, "Warm cozy bear ear hoodie cap."),
    (1002971, "Pink Bean Hat", 20000, 0, "Classic Pink Bean plush headwear."),
    (1003271, "Pink Heart Transparent Hat", 20000, 0, "Transparent hat with floating pink love hearts."),
    (1003276, "Blue Heart Transparent Hat", 20000, 0, "Transparent hat with floating blue starlight hearts.")
]

# ==============================================================================
# CATEGORY 8: Male Fashion & Suits (Male Only)
# ==============================================================================
MALE_FASHION = [
    (1050522, "Tranquil Picnic Suit (M)", 35000, 0, "Spring picnic gentleman suit [Male]."),
    (1050524, "Summer Breeze Outfit (M)", 35000, 0, "Refreshing summer linen outfit [Male]."),
    (1050528, "Shepherd's Getup (M)", 35000, 0, "Pastoral shepherd vest and trousers [Male]."),
    (1050269, "Unleashed Atomic Suit (M)", 30000, 0, "Modern cybernetic combat bodysuit [Male]."),
    (1050304, "Splash Choco Boy (M)", 30000, 0, "Tailored sweet chocolate butler uniform [Male]."),
    (1050346, "Cheer Uniform (M)", 25000, 0, "Energetic team captain cheerleader outfit [Male]."),
    (1050371, "Blue Crystal Uniform (M)", 30000, 0, "Classic navy sailor uniform [Male]."),
    (1050478, "Iron Mace Officer (M)", 35000, 0, "Grand imperial officer dress uniform [Male]."),
    (1000103, "Tranquil Picnic Hat (M)", 15000, 0, "Picnic bowler hat for gentlemen [Male]."),
    (1000104, "Shepherd's Straw Hat (M)", 15000, 0, "Rustic straw hat for gentle shepherds [Male]."),
    (1005230, "Blue Marine Hat (M)", 15000, 0, "Crisp naval marine sailor hat [Male]."),
    (1070086, "Tranquil Picnic Shoes (M)", 10000, 0, "Leather oxford picnic shoes [Male]."),
    (1070115, "Shepherd's Boots (M)", 10000, 0, "Leather pastoral walking boots [Male].")
]

# ==============================================================================
# CATEGORY 9: Female Fashion & Dresses (Female Only)
# ==============================================================================
FEMALE_FASHION = [
    (1051592, "Tranquil Picnic Dress (F)", 35000, 0, "Lace-trimmed picnic sundress [Female]."),
    (1051594, "Summer Breeze Outfit (F)", 35000, 0, "Breezy pastel summer floral dress [Female]."),
    (1051598, "Shepherd's Frock (F)", 35000, 0, "Pastoral cottagecore ruffled dress [Female]."),
    (1051564, "Nautically Pink Dress (F)", 35000, 0, "Sweet pastel pink sailor dress [Female]."),
    (1051441, "Mousy Bunny Romper (F)", 30000, 0, "Adorable bunny ear feminine romper [Female]."),
    (1051543, "Halloween Pumpkin Suit (F)", 30000, 0, "Festive cute witchy pumpkin dress [Female]."),
    (1051280, "Gentle Hanbok (F)", 30000, 0, "Traditional graceful Korean Hanbok silk dress [Female]."),
    (1001126, "Tranquil Picnic Straw Hat (F)", 15000, 0, "Lovely wide-brim ribbon straw hat [Female]."),
    (1001127, "Shepherd's Bow Bandana (F)", 15000, 0, "Cute floral bow headscarf [Female]."),
    (1005231, "Pink Marine Hat (F)", 15000, 0, "Pastel pink naval sailor beret [Female]."),
    (1071104, "Tranquil Picnic Shoes (F)", 10000, 0, "Dainty strapped picnic Mary Janes [Female]."),
    (1071131, "Shepherd's Clogs (F)", 10000, 0, "Charming rustic pastoral clogs [Female].")
]

# ==============================================================================
# CATEGORY 10: Unisex Costumes & Onesies (All Characters)
# ==============================================================================
UNISEX_COSTUMES = [
    (1051455, "Time Cantabile", 40000, 0, "Master Time Masterpiece unisex royal suit [Unisex]."),
    (1053446, "Superstar Pink Bean Onesie", 35000, 0, "Adorable cuddly Pink Bean onesie costume [Unisex]."),
    (1053450, "Light Executor Garb", 35000, 0, "Holy white executor tactical robes [Unisex]."),
    (1053449, "Dark Executor Garb", 35000, 0, "Dark shadow executor stealth robes [Unisex].")
]

def format_num(val):
    return Util.getNumberFormat(val)

def get_char_gender(chr):
    try:
        return chr.getAvatarData().getAvatarLook().getGender()
    except:
        try:
            return chr.getAvatarData().getCharacterStat().getGender()
        except:
            return 0

def get_gender_label(gender):
    if gender == 0:
        return "#b[Male]#fc0xFFFFFFFF#"
    elif gender == 1:
        return "#r[Female]#fc0xFFFFFFFF#"
    return "#g[Unisex]#fc0xFFFFFFFF#"

def get_points(chr):
    user = chr.getUser()
    if user != None:
        return user.getMaplePoints(), user.getDonationPoints()
    return 0, 0

def buy_stackable_item(sm, chr, item_id, item_name, unit_cost, desc):
    while True:
        mp, dp = get_points(chr)
        text = "#face0##fc0xFFFFFFFF##fs13#=== #e#b" + item_name + "#fc0xFFFFFFFF##n ===\r\n"
        text += "Item: #i" + str(item_id) + "# #b#z" + str(item_id) + "##fc0xFFFFFFFF#\r\n"
        text += "Description: #fc0xFFCCCCCC##fs11#" + desc + "#fc0xFFFFFFFF##fs13#\r\n"
        text += "Price: #r" + format_num(unit_cost) + " Maple Points#fc0xFFFFFFFF# each\r\n"
        text += "Your Balance: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
        text += "Select quantity to purchase:\r\n"
        text += "#b#L1#Buy 1x (" + format_num(unit_cost) + " Points)#l\r\n"
        text += "#L10#Buy 10x (" + format_num(unit_cost * 10) + " Points)#l\r\n"
        text += "#L50#Buy 50x (" + format_num(unit_cost * 50) + " Points)#l\r\n"
        text += "#L100#Buy 100x (" + format_num(unit_cost * 100) + " Points)#l\r\n"
        text += "#d#L0#[Cancel]#l#k\r\n"

        qty_sel = sm.sendNext(text)
        qty = 0
        if qty_sel in [1, 10, 50, 100]:
            qty = qty_sel
        else:
            return

        total_cost = int(qty) * unit_cost
        mp, dp = get_points(chr)
        if mp < total_cost:
            sm.sendSayOkay("#face2##fc0xFFFFFFFF#You do not have enough Maple Points!\r\nRequired: #r" + format_num(total_cost) + " Points#fc0xFFFFFFFF#")
            continue

        if not sm.canHold(item_id, qty):
            sm.sendSayOkay("#face2##fc0xFFFFFFFF#Your inventory is full! Please make some space.")
            continue

        chr.getUser().deductMaplePoints(total_cost)
        try:
            chr.getUser().updateUserToSQL()
        except:
            pass
        chr.addItemToInventory(item_id, qty)
        new_mp, _ = get_points(chr)
        sm.sendSayOkay("#face1##fc0xFFFFFFFF##e#b[Purchase Successful!]#fc0xFFFFFFFF##n\r\n\r\n"
                       "Received: #i" + str(item_id) + "# #b" + item_name + " x" + str(qty) + "#fc0xFFFFFFFF#\r\n"
                       "Deducted: #r" + format_num(total_cost) + " Maple Points#fc0xFFFFFFFF#\r\n"
                       "Remaining Balance: #b" + format_num(new_mp) + " Maple Points#fc0xFFFFFFFF#")
        return

def buy_single_equip(sm, chr, item_id, item_name, cost, days, desc, target_gender):
    char_gender = get_char_gender(chr)
    mp, dp = get_points(chr)

    warn_text = ""
    if target_gender == 0 and char_gender != 0:
        warn_text = "\r\n#r(Notice: This item is for Male characters, but your character is Female!)#fc0xFFFFFFFF#\r\n"
    elif target_gender == 1 and char_gender != 1:
        warn_text = "\r\n#r(Notice: This item is for Female characters, but your character is Male!)#fc0xFFFFFFFF#\r\n"

    text = "#face0##fc0xFFFFFFFF##fs13#=== #e#b" + item_name + "#fc0xFFFFFFFF##n ===\r\n\r\n"
    text += "Item: #i" + str(item_id) + "# #b#z" + str(item_id) + "##fc0xFFFFFFFF#\r\n"
    text += "Gender: " + get_gender_label(target_gender) + "\r\n"
    text += "Description: #fc0xFFCCCCCC##fs11#" + desc + "#fc0xFFFFFFFF##fs13#\r\n"
    text += "Duration: #gPermanent#fc0xFFFFFFFF#\r\n" if days == 0 else "Duration: #r" + str(days) + " Days#fc0xFFFFFFFF#\r\n"
    text += "Price: #e#r" + format_num(cost) + " Maple Points#fc0xFFFFFFFF##n\r\n"
    text += "Your Balance: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n"
    text += warn_text + "\r\n"
    text += "Would you like to purchase this item?"

    confirm = sm.sendAskYesNo(text)
    if not confirm:
        return

    mp, dp = get_points(chr)
    if mp < cost:
        sm.sendSayOkay("#face2##fc0xFFFFFFFF#You do not have enough Maple Points!\r\nRequired: #r" + format_num(cost) + " Points#fc0xFFFFFFFF#")
        return

    if not sm.canHold(item_id, 1):
        sm.sendSayOkay("#face2##fc0xFFFFFFFF#Your Cash inventory tab is full! Please make some space.")
        return

    chr.getUser().deductMaplePoints(cost)
    try:
        chr.getUser().updateUserToSQL()
    except:
        pass
    if days > 0:
        chr.addItemToInventory(item_id, 1, "day", days)
    else:
        chr.addItemToInventory(item_id, 1)

    new_mp, _ = get_points(chr)
    sm.sendSayOkay("#face1##fc0xFFFFFFFF##e#b[Purchase Successful!]#fc0xFFFFFFFF##n\r\n\r\n"
                   "You received: #i" + str(item_id) + "# #b" + item_name + "#fc0xFFFFFFFF#\r\n"
                   "Deducted: #r" + format_num(cost) + " Maple Points#fc0xFFFFFFFF#\r\n"
                   "Remaining Balance: #b" + format_num(new_mp) + " Maple Points#fc0xFFFFFFFF#")

def buy_transparent_bundle(sm, chr):
    BUNDLE_COST = 100000
    mp, _ = get_points(chr)
    text = "#face0##fc0xFFFFFFFF##fs13#=== #e#b[Complete 9-Piece Transparent Bundle]#fc0xFFFFFFFF##n ===\r\n\r\n"
    text += "This package includes all 9 permanent transparent pieces:\r\n"
    for tid, tname, _, _, _ in TRANSPARENT_EQUIPS:
        text += "- #i" + str(tid) + "# #b" + tname + "#fc0xFFFFFFFF#\r\n"
    text += "\r\nBundle Price: #e#r" + format_num(BUNDLE_COST) + " Maple Points#fc0xFFFFFFFF##n (Save 35,000 Points!)\r\n"
    text += "Your Balance: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
    text += "Would you like to purchase the complete transparent bundle?"

    if sm.sendAskYesNo(text):
        mp, _ = get_points(chr)
        if mp < BUNDLE_COST:
            sm.sendSayOkay("#face2##fc0xFFFFFFFF#You do not have enough Maple Points!\r\nRequired: #r" + format_num(BUNDLE_COST) + " Points#fc0xFFFFFFFF#")
            return

        free_slots = chr.getInventoryByType(InvType.CASH).getEmptySlots()
        if free_slots < len(TRANSPARENT_EQUIPS):
            sm.sendSayOkay("#face2##fc0xFFFFFFFF#You need at least 9 empty slots in your Cash inventory tab!")
            return

        chr.getUser().deductMaplePoints(BUNDLE_COST)
        try:
            chr.getUser().updateUserToSQL()
        except:
            pass
        for tid, _, _, _, _ in TRANSPARENT_EQUIPS:
            chr.addItemToInventory(tid, 1)

        sm.sendSayOkay("#face1##fc0xFFFFFFFF#Transparent bundle delivered successfully! Enjoy your sleek minimalist aesthetic!")

def open_point_shop(sm, chr):
    sm.setNpcBoxChat(NPC_ID)
    while True:
        char_gender = get_char_gender(chr)
        mp, dp = get_points(chr)

        menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#d[Lucid - Cash & Fashion Boutique]#fc0xFFFFFFFF##n ===\r\n"
        menu += "Welcome to the dream realm of Lucid, #h0#! What fashion or cash items can I get for you today?\r\n"
        menu += "Gender: " + get_gender_label(char_gender) + "  |  Cash: #e#b" + format_num(mp) + " Points#fc0xFFFFFFFF##n  |  DP: #e#r" + format_num(dp) + "#fc0xFFFFFFFF##n\r\n\r\n"
        menu += "#b#L1##e[1] Cubes & Potential System (Unisex)#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Red Cube, Black Cube, Bonus Potential, Violet, Glowing & Bright Cubes.#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#b#L2##e[2] Rebirth Flames & Scrolls (Unisex)#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Powerful / Eternal / Black Flames, Protection, Safety, Return Scrolls.#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#b#L3##e[3] Utility & Inventory Slot Expansion#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Hyper Teleport Rock, Pendant Slot (30D), Revives, Expand +8 Slots.#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#b#L4##e[4] Fashion & Outfits Boutique (Massive Collection)#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Weapons, Full Transparent Set, Wings, Hats, Male/Female Suits & Dresses.#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#d#L99#Exit Boutique#l#k\r\n"

        cat = sm.sendNext(menu)
        if cat == 99 or cat < 1 or cat > 4:
            break

        if cat == 1:
            # Cubes
            while True:
                mp, dp = get_points(chr)
                c_menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#bCubes & Potential System#fc0xFFFFFFFF##n ===\r\n"
                c_menu += "Current Points: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
                for idx, (cid, cname, ccost, cdesc) in enumerate(CUBE_ITEMS):
                    c_menu += "#L" + str(idx) + "##i" + str(cid) + "# #b" + cname + "#fc0xFFFFFFFF# - #r" + format_num(ccost) + " Points#fc0xFFFFFFFF#\r\n    #fc0xFFCCCCCC##fs11#" + cdesc + "#fc0xFFFFFFFF##fs13##l\r\n"
                c_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                c_sel = sm.sendNext(c_menu)
                if c_sel == 99 or c_sel < 0 or c_sel >= len(CUBE_ITEMS):
                    break
                cid, cname, ccost, cdesc = CUBE_ITEMS[c_sel]
                buy_stackable_item(sm, chr, cid, cname, ccost, cdesc)

        elif cat == 2:
            # Flames & Scrolls
            while True:
                mp, dp = get_points(chr)
                f_menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#bRebirth Flames & Scrolls#fc0xFFFFFFFF##n ===\r\n"
                f_menu += "Current Points: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
                for idx, (fid, fname, fcost, fdesc) in enumerate(FLAME_SCROLL_ITEMS):
                    f_menu += "#L" + str(idx) + "##i" + str(fid) + "# #b" + fname + "#fc0xFFFFFFFF# - #r" + format_num(fcost) + " Points#fc0xFFFFFFFF#\r\n    #fc0xFFCCCCCC##fs11#" + fdesc + "#fc0xFFFFFFFF##fs13##l\r\n"
                f_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                f_sel = sm.sendNext(f_menu)
                if f_sel == 99 or f_sel < 0 or f_sel >= len(FLAME_SCROLL_ITEMS):
                    break
                fid, fname, fcost, fdesc = FLAME_SCROLL_ITEMS[f_sel]
                buy_stackable_item(sm, chr, fid, fname, fcost, fdesc)

        elif cat == 3:
            # Utility & Slots
            while True:
                mp, dp = get_points(chr)
                u_menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#bUtility & Inventory Expansion#fc0xFFFFFFFF##n ===\r\n"
                u_menu += "Current Points: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
                for idx, (uid, uname, ucost, udays, udesc) in enumerate(UTILITY_ITEMS):
                    dur_str = " (30 Days)" if udays > 0 else ""
                    u_menu += "#L" + str(idx) + "##i" + str(uid) + "# #b" + uname + "#fc0xFFFFFFFF# - #r" + format_num(ucost) + " Points#fc0xFFFFFFFF#" + dur_str + "\r\n    #fc0xFFCCCCCC##fs11#" + udesc + "#fc0xFFFFFFFF##fs13##l\r\n"
                u_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                u_sel = sm.sendNext(u_menu)
                if u_sel == 99 or u_sel < 0 or u_sel >= len(UTILITY_ITEMS):
                    break
                uid, uname, ucost, udays, udesc = UTILITY_ITEMS[u_sel]
                if udays > 0:
                    buy_single_equip(sm, chr, uid, uname, ucost, udays, udesc, 2)
                else:
                    buy_stackable_item(sm, chr, uid, uname, ucost, udesc)

        elif cat == 4:
            # Fashion & Outfits Mega Boutique
            while True:
                char_gender = get_char_gender(chr)
                mp, _ = get_points(chr)
                f_top = "#face0##fc0xFFFFFFFF##fs13#=== #e#d[Fashion & Outfits Mega Boutique]#fc0xFFFFFFFF##n ===\r\n"
                f_top += "Your Character: " + get_gender_label(char_gender) + "  |  Points: #e#b" + format_num(mp) + "#fc0xFFFFFFFF##n\r\n\r\n"
                f_top += "Please select a fashion category:\r\n"
                f_top += "#b#L1##e[1. Universal Weapon Skins (All Weapons)]#n#k\r\n"
                f_top += "   #fc0xFFEEEEEE##fs11#Death's Scythe, Verus Hilla Scythe, Dandelion, Plasma Saber, Guitars.#fc0xFFFFFFFF##fs13#\r\n"
                f_top += "#b#L2##e[2. Full Transparent Equipment Set]#n#k\r\n"
                f_top += "   #fc0xFFEEEEEE##fs11#Complete 9-piece Transparent Set + 35k Point Discount Bundle.#fc0xFFFFFFFF##fs13#\r\n"
                f_top += "#b#L3##e[3. Wings, Capes & Back Auras]#n#k\r\n"
                f_top += "   #fc0xFFEEEEEE##fs11#Light Wing Cherubim, Succubus Wings, Dream Wings, Nine-Tailed Tails.#fc0xFFFFFFFF##fs13#\r\n"
                f_top += "#b#L4##e[4. Hats, Ribbons, Hoodies & Halos]#n#k\r\n"
                f_top += "   #fc0xFFEEEEEE##fs11#Pink Bean Horns, Floral Crowns, Dressy Ribbons, Starlight Halos.#fc0xFFFFFFFF##fs13#\r\n"
                f_top += "#b#L5##e[5. Male Fashion & Suits (Male Only)]#n#k\r\n"
                f_top += "   #fc0xFFEEEEEE##fs11#Picnic Suits, Officer Uniforms, Butler Outfits, Oxford Shoes.#fc0xFFFFFFFF##fs13#\r\n"
                f_top += "#r#L6##e[6. Female Fashion & Dresses (Female Only)]#n#k\r\n"
                f_top += "   #fc0xFFEEEEEE##fs11#Picnic Sundresses, Pink Sailor Uniforms, Hanboks, Mary Janes.#fc0xFFFFFFFF##fs13#\r\n"
                f_top += "#g#L7##e[7. Unisex Costumes & Onesies (All Characters)]#n#k\r\n"
                f_top += "   #fc0xFFEEEEEE##fs11#Time Cantabile, Pink Bean Onesie, Light & Dark Executor Garbs.#fc0xFFFFFFFF##fs13#\r\n"
                f_top += "#d#L99#[Back to Main Menu]#k#l\r\n"

                f_sub = sm.sendNext(f_top)
                if f_sub == 99:
                    break

                target_list = None
                target_gender = 2
                title = ""

                if f_sub == 1:
                    target_list = WEAPON_COVERS
                    title = "Universal Weapon Skins"
                elif f_sub == 2:
                    # Transparent submenu
                    while True:
                        mp, _ = get_points(chr)
                        t_menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#bTransparent Equipment Set#fc0xFFFFFFFF##n ===\r\n"
                        t_menu += "Current Points: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
                        t_menu += "#e#r#L100#[* Purchase Complete 9-Item Transparent Bundle (100,000 Points - Save 35k!)]#fc0xFFFFFFFF##n#l\r\n\r\n"
                        for tidx, (tid, tname, tcost, tdays, tdesc) in enumerate(TRANSPARENT_EQUIPS):
                            t_menu += "#L" + str(tidx) + "##i" + str(tid) + "# #b" + tname + "#fc0xFFFFFFFF# - #r" + format_num(tcost) + " Points#fc0xFFFFFFFF#\r\n    #fc0xFFCCCCCC##fs11#" + tdesc + "#fc0xFFFFFFFF##fs13##l\r\n"
                        t_menu += "#d#L99#[Back to Fashion Menu]#k#l\r\n"

                        t_sel = sm.sendNext(t_menu)
                        if t_sel == 99:
                            break
                        elif t_sel == 100:
                            buy_transparent_bundle(sm, chr)
                        elif 0 <= t_sel < len(TRANSPARENT_EQUIPS):
                            tid, tname, tcost, tdays, tdesc = TRANSPARENT_EQUIPS[t_sel]
                            buy_single_equip(sm, chr, tid, tname, tcost, tdays, tdesc, 2)
                    continue

                elif f_sub == 3:
                    target_list = WINGS_AND_CAPES
                    title = "Wings, Capes & Back Auras"
                elif f_sub == 4:
                    target_list = HATS_AND_HEADWEAR
                    title = "Hats, Ribbons & Headwear"
                elif f_sub == 5:
                    target_list = MALE_FASHION
                    target_gender = 0
                    title = "Male Fashion & Suits"
                elif f_sub == 6:
                    target_list = FEMALE_FASHION
                    target_gender = 1
                    title = "Female Fashion & Dresses"
                elif f_sub == 7:
                    target_list = UNISEX_COSTUMES
                    title = "Unisex Costumes & Onesies"

                if target_list is not None:
                    while True:
                        mp, _ = get_points(chr)
                        sub_menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#b[" + title + "]#fc0xFFFFFFFF##n ===\r\n"
                        sub_menu += "Current Points: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
                        for idx, (iid, iname, icost, idays, idesc) in enumerate(target_list):
                            sub_menu += "#L" + str(idx) + "##i" + str(iid) + "# #b" + iname + "#fc0xFFFFFFFF# - #r" + format_num(icost) + " Points#fc0xFFFFFFFF#\r\n    #fc0xFFCCCCCC##fs11#" + idesc + "#fc0xFFFFFFFF##fs13##l\r\n"
                        sub_menu += "#d#L99#[Back to Fashion Menu]#k#l\r\n"

                        s_sel = sm.sendNext(sub_menu)
                        if s_sel == 99 or s_sel < 0 or s_sel >= len(target_list):
                            break
                        iid, iname, icost, idays, idesc = target_list[s_sel]
                        buy_single_equip(sm, chr, iid, iname, icost, idays, idesc, target_gender)
