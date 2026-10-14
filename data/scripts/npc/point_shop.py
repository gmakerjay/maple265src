# ==============================================================================
# Cash & Fashion Mall Grand Emporium (Lucid - 9063159)
# Complete Outfit Bundles, Master Label, Collabs (BTS / BLACKPINK), Golden Hand Sets,
# Universal Weapons, Transparent Equips, Wings, Hats, Suits, Cubes & Flames
# Pure English 100% | High-Contrast Pure White Font (#fc0xFFFFFFFF#)
# 100% Crash-Proof Direct-Unpack Set Delivery Architecture
# ==============================================================================
from net.swordie.ms.util import Util
from net.swordie.ms.enums import InvType

NPC_ID = 9063159 # Lucid

# ==============================================================================
# COMPLETE OUTFIT BUNDLES & SET PACKAGES (DIRECT UNPACK - 100% CRASH-PROOF)
# ==============================================================================
# Format: (pkg_id, pkg_name, cost, target_gender, desc, items_list)
# items_list: [(item_id, item_name, slot_name)]
OUTFIT_PACKAGES = [
    (
        "blackpink_bundle",
        "[BLACKPINK] BORN PINK Exclusive Stage Collection",
        150000,
        2,
        "Official BLACKPINK collaboration set with venom stage outfits, weapons, rings and accessories.",
        [
            (1006153, "[BLACKPINK] Venom Chic", "Hat"),
            (1006154, "[BLACKPINK] Venom Rose", "Hat"),
            (1051754, "[BLACKPINK] Venom Blood", "Overall"),
            (1103547, "[BLACKPINK] Venom Night", "Cape"),
            (1071176, "[BLACKPINK] Venom Shadow", "Shoes"),
            (1703307, "[BLACKPINK] PINK Venom", "Weapon"),
            (1012774, "[BLACKPINK] Hidden Venom", "Face Acc"),
            (1115271, "[BLACKPINK] BLACK Chat Ring", "Ring")
        ]
    ),
    (
        "bts_bundle",
        "[BTS] Black Swan & Army Bomb Royal Collection",
        150000,
        2,
        "Official BTS collaboration set with Black Swan stage attire, Army Bomb weapon, and angel feathers.",
        [
            (1005656, "[BTS] Eclipse Feather", "Hat"),
            (1005649, "[BTS] Mikrokosmos", "Hat"),
            (1053640, "[BTS] Love Swan", "Overall"),
            (1103305, "[BTS] Swan Serenade", "Cape"),
            (1082751, "[BTS] Holy Mystic", "Gloves"),
            (1073489, "[BTS] Silent Night", "Shoes"),
            (1703049, "[BTS] Last Feather", "Weapon"),
            (1703051, "[BTS] Army Bomb", "Weapon"),
            (1115210, "[BTS] Black Swan Chat Ring", "Ring")
        ]
    ),
    (
        "starry_punisher",
        "[Golden Hand] Starry Night Punisher Set",
        120000,
        2,
        "Grand Prize Winner of the Golden Hand Awards: celestial ruling garb, starlight shadow, and sword.",
        [
            (1005904, "Starlight Shadow", "Hat"),
            (1103390, "Banquet of Light", "Cape"),
            (1050608, "Starry Night Ruling (M)", "Overall (M)"),
            (1051681, "Starry Night Judgment (F)", "Overall (F)"),
            (1070125, "Punisher Will (M)", "Shoes (M)"),
            (1071141, "Judgment Will (F)", "Shoes (F)"),
            (1703146, "Starry Night Punisher", "Weapon")
        ]
    ),
    (
        "revenant_hunter",
        "[Golden Hand] Revenant Hunter Set",
        120000,
        2,
        "Exquisite Eastern shadow assassin collection featuring the Eastern Black Blade and nightmare cape.",
        [
            (1005899, "Sign of Encroachment", "Hat"),
            (1103386, "Shouldering Nightmare", "Cape"),
            (1050604, "Slayer Black Clothes (M)", "Overall (M)"),
            (1051677, "Hunter Black Clothes (F)", "Overall (F)"),
            (1073593, "Immortal Walk", "Shoes"),
            (1703142, "Eastern Black Blade", "Weapon")
        ]
    ),
    (
        "ink_drawing",
        "[Golden Hand] Ink Drawing Traditional Master Set",
        120000,
        2,
        "Traditional oriental watercolor aesthetic with wide-brimmed hat, plum painting, and Upright Heart.",
        [
            (1005913, "Ink-colored Wide-brimmed Hat", "Hat"),
            (1103397, "Plum Flower Painting", "Cape"),
            (1050610, "Pure Dignity (M)", "Overall (M)"),
            (1051683, "Noble Dignity (F)", "Overall (F)"),
            (1073603, "Welcome Guest", "Shoes"),
            (1703152, "Upright Heart", "Weapon")
        ]
    ),
    (
        "night_sky_ink",
        "[Golden Hand] Night Sky Ink Moonlight Set",
        120000,
        2,
        "Ethereal white tiger aesthetic, night silk overcoat, starlight sentiment and Midnight Ink weapon.",
        [
            (1005918, "White Wide-brimmed Hat", "Hat"),
            (1005919, "Snow-white Tiger", "Hat"),
            (1103400, "Night Silk Overcoat", "Cape"),
            (1050613, "Moonlight Sentiment (M)", "Overall (M)"),
            (1051686, "Starlight Sentiment (F)", "Overall (F)"),
            (1073604, "Night Sky Lake", "Shoes"),
            (1703155, "Midnight Ink", "Weapon")
        ]
    ),
    (
        "romance_fantasy",
        "[Golden Hand] Romance Fantasy Imperial Noble Set",
        120000,
        2,
        "Regal aristocratic attire with unassailable honor crown, cameo brooch, and Crown Scepter weapon.",
        [
            (1005949, "Unassailable Honor", "Hat"),
            (1103416, "Cameo Brooch", "Cape"),
            (1050622, "Romance Fantasy Hero (M)", "Overall (M)"),
            (1051695, "Romance Fantasy Heroine (F)", "Overall (F)"),
            (1070133, "Confident Steps (M)", "Shoes (M)"),
            (1071149, "Light Steps (F)", "Shoes (F)"),
            (1703174, "Crown Scepter", "Weapon")
        ]
    ),
    (
        "killer_crescent",
        "[Golden Hand] Killer Crescent Midnight Set",
        120000,
        2,
        "Sleek noir shadow assassin with lunar shadow cap, under-the-moonlight cape, and Moon Slayer sword.",
        [
            (1005947, "Lunar Shadow Cap", "Hat"),
            (1103414, "Under the Moonlight", "Cape"),
            (1050620, "Noir Moonlight Jacket (M)", "Overall (M)"),
            (1051693, "Loose Moonlight Jacket (F)", "Overall (F)"),
            (1070132, "Moon Traveler (M)", "Shoes (M)"),
            (1071148, "Moon Boots (F)", "Shoes (F)"),
            (1703172, "Moon Slayer", "Weapon")
        ]
    ),
    (
        "garden_sage",
        "[Golden Hand] Garden Sage & Fairy Flower Set",
        120000,
        2,
        "Blooming sanctuary aesthetic with garden scent cape, fairy robes, and Thousand-Year Promise weapon.",
        [
            (1005897, "Faded Light", "Hat"),
            (1103385, "Garden Scent", "Cape"),
            (1050603, "Sage Ascension (M)", "Overall (M)"),
            (1051676, "Fairy Flower (F)", "Overall (F)"),
            (1070123, "Sage Ego (M)", "Shoes (M)"),
            (1071139, "Fairy Ego (F)", "Shoes (F)"),
            (1703141, "Thousand-Year Promise", "Weapon")
        ]
    ),
    (
        "cyber_planet",
        "[Golden Hand] Cyber Planet Survivor Set",
        120000,
        2,
        "Futuristic cybernetic combat suit, cyber rabbit mask, holographic battle rifle and survivor bangle.",
        [
            (1005900, "Cyber Rabbit Mask", "Hat"),
            (1103387, "Battle Rifle", "Cape"),
            (1050605, "Last Survivor (M)", "Overall (M)"),
            (1051678, "Ultimate Survivor (F)", "Overall (F)"),
            (1073594, "Survivor Military Boots", "Shoes"),
            (1703143, "Survivor Bangle", "Weapon")
        ]
    ),
    (
        "retro_magic",
        "[Golden Hand] Retro Magic Girl & Boy Set",
        120000,
        2,
        "Nostalgic 90s magical anime fantasy with lyrical ribbons, magic world aura, and broomstick weapon.",
        [
            (1005902, "Lyrical Pink Ribbon", "Hat"),
            (1005903, "Lyrical Blue Ribbon", "Hat"),
            (1103389, "Logging Into Magic World", "Cape"),
            (1050607, "Retro Magic Boy Suit (M)", "Overall (M)"),
            (1051680, "Retro Magic Girl Dress (F)", "Overall (F)"),
            (1070124, "Magical Blue Shoes (M)", "Shoes (M)"),
            (1071140, "Magical Pink Shoes (F)", "Shoes (F)"),
            (1703145, "Heart-Dangling Broomstick", "Weapon")
        ]
    ),
    (
        "teddy_ribbon",
        "[Golden Hand] Teddy Bear Ribbon Set",
        100000,
        2,
        "Adorable plushie aesthetic with baby bear bonnet, confetti ribbon cape, and teddy bear overalls.",
        [
            (1005926, "Baby Bear Bonnet", "Hat"),
            (1103403, "Ribbon Confetti", "Cape"),
            (1050615, "Teddy Bear Overalls (M)", "Overall (M)"),
            (1051688, "Teddy Bear Dress (F)", "Overall (F)"),
            (1073607, "Teddy Bear Ribbon Socks", "Shoes"),
            (1703160, "Teddy Bear Ribbon", "Weapon")
        ]
    ),
    (
        "rock_spirit",
        "[Golden Hand] Rock Spirit Support Set",
        100000,
        2,
        "Vibrant musical street style with rock spirit beret, glitter cape, raincoat, and glowstick weapon.",
        [
            (1005905, "Rock Spirit Beret", "Hat"),
            (1103395, "Rock Spirit Glitter", "Cape"),
            (1053800, "Rock Spirit Raincoat", "Overall"),
            (1073601, "Rock Spirit Boots", "Shoes"),
            (1703150, "Rock Spirit Glowstick", "Weapon")
        ]
    ),
    (
        "grand_checkmate",
        "[Master Label] Grand Checkmate Royal Set",
        120000,
        2,
        "Prestigious Masterpiece Label chess master attire, ivory scythe and obsidian sword weapon covers.",
        [
            (1005477, "Checkmate Cap", "Hat"),
            (1005478, "Checkmate Jewel", "Hat"),
            (1103924, "Perfect Checkmate", "Cape"),
            (1054570, "White Checkmate Outfit", "Overall"),
            (1054571, "Black Checkmate Outfit", "Overall"),
            (1073415, "Checkmate Shoes", "Shoes"),
            (1703745, "White Checkmate Scythe", "Weapon"),
            (1703746, "Black Checkmate Sword", "Weapon")
        ]
    ),
    (
        "alliance_commander",
        "[Masterpiece] Alliance Commander Empress Set",
        120000,
        2,
        "Supreme regalia of Empress Cygnus featuring the holy commander tiara, cape, and Wing Sword.",
        [
            (1005223, "Alliance Commander Tiara", "Hat"),
            (1051570, "Alliance Commander Cygnus Suit", "Overall (F)"),
            (1053347, "Alliance Commander Suit", "Overall (M)"),
            (1103142, "Alliance Commander Cape", "Cape"),
            (1073305, "Alliance Commander Shoes", "Shoes"),
            (1702863, "Alliance Commander Wing Sword", "Weapon")
        ]
    ),
    (
        "time_masterpiece",
        "[Master Label] Master Time Masterpiece Set",
        100000,
        2,
        "Iconic Master Label time lord suit, Time Cantabile, celestial star record, and star messenger.",
        [
            (1004672, "Time Master Hat", "Hat"),
            (1051455, "Time Cantabile", "Overall"),
            (1070075, "Time Master Shoes", "Shoes"),
            (1702928, "Record of the Stars", "Weapon"),
            (1702976, "Star Messenger", "Weapon")
        ]
    ),
    (
        "death_reaper",
        "[Mythic] Death's Scythe Grim Reaper Set",
        100000,
        2,
        "Ominous soul harvester aesthetic with dark executor garb, demonic succubus wings, and Death's Scythe.",
        [
            (1003131, "Black Dressy Ribbon", "Hat"),
            (1053449, "Dark Executor Garb", "Overall"),
            (1102554, "Succubus Wings", "Cape"),
            (1702565, "Death's Scythe", "Weapon"),
            (1703578, "Verus Hilla's Scythe", "Weapon")
        ]
    ),
    (
        "succubus_queen",
        "[Mythic] Succubus Queen Gothic Set",
        100000,
        1,
        "Dark alluring gothic queen attire with pointed succubus hat, bat wings, dress, gloves and heels.",
        [
            (1003842, "Succubus Hat", "Hat"),
            (1051349, "Succubus Dress", "Overall"),
            (1102554, "Succubus Wings", "Cape"),
            (1082525, "Succubus Gloves", "Gloves"),
            (1072816, "Succubus Shoes", "Shoes")
        ]
    ),
    (
        "nine_tailed_fox",
        "[Mythic] Nine-Tailed Fox Spirit Deity Set",
        100000,
        2,
        "Enchanted kitsune deity attire with ceremonial fox mask, nine golden tails, and fox spirits.",
        [
            (1004013, "Nine-Tailed Fox Mask", "Hat"),
            (1102501, "Friendly Nine-Tailed Fox Tails", "Cape"),
            (1102885, "Fluffy Fox Tail (Gold)", "Cape"),
            (1702997, "Sunshine Fox Friends", "Weapon")
        ]
    ),
    (
        "pink_bean_star",
        "[Special] Superstar Pink Bean Collection",
        80000,
        2,
        "Ultimate Pink Bean fan collection with horned headphones, soft onesie, and huggable cushion.",
        [
            (1005375, "Superstar Pink Bean Horned Headphones", "Hat"),
            (1053446, "Superstar Pink Bean Onesie", "Overall"),
            (1702971, "Pink Bean Huggable Cushion", "Weapon"),
            (1702914, "Pink Bean's Umbrella", "Weapon")
        ]
    )
]

# ==============================================================================
# TRANSPARENT EQUIPMENT COLLECTION
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
# UNIVERSAL WEAPON COVERS (ALL WEAPONS)
# ==============================================================================
WEAPON_COVERS = [
    (1702565, "Death's Scythe", 50000, 0, "Legendary floating reaper scythe weapon cover (all weapons)."),
    (1703578, "Verus Hilla's Scythe", 50000, 0, "Ominous dark soul scythe wielded by True Hilla."),
    (1703745, "White Checkmate Scythe", 45000, 0, "Elegant ivory grandmaster scythe."),
    (1703746, "Black Checkmate Sword", 45000, 0, "Obsidian grandmaster checkmate broadsword."),
    (1703142, "Eastern Black Blade", 45000, 0, "Golden Hand winner: forbidden dark katana with shadowy mist."),
    (1703172, "Moon Slayer", 45000, 0, "Golden Hand winner: curved lunar crescent executioner blade."),
    (1702863, "Alliance Commander Wing Sword", 45000, 0, "Royal golden broadsword imbued with the Empress's blessing."),
    (1702942, "Glory Guard Ceremonial Sword", 40000, 0, "Honorary crystalline rapier awarded to high paladins."),
    (1702786, "Blood Oath Weapon", 40000, 0, "Crimson blade forged from eternal blood oaths."),
    (1702817, "Invincible Blade", 40000, 0, "Legendary radiant holy greatsword."),
    (1702900, "Azure Sunset Sword", 40000, 0, "Gleaming twilight blue broadsword."),
    (1702943, "Havoc's Heavy Sword", 40000, 0, "Colossal demonic greatsword wreathed in storm lightning."),
    (1703045, "Hologram Laser Sword", 40000, 0, "Cybernetic glowing neon plasma broadsword."),
    (1703049, "[BTS] Last Feather", 50000, 0, "Official BTS collaboration: floating black swan feather wand."),
    (1703051, "[BTS] Army Bomb", 50000, 0, "Official BTS collaboration: glowing concert lightstick weapon."),
    (1703307, "[BLACKPINK] PINK Venom", 50000, 0, "Official BLACKPINK collaboration: neon heart fang dagger."),
    (1703308, "[BLACKPINK] PINK Ice", 50000, 0, "Official BLACKPINK collaboration: crystalline pink ice wand."),
    (1703145, "Heart-Dangling Broomstick", 35000, 0, "Golden Hand winner: whimsical magical girl flying broomstick."),
    (1703141, "Thousand-Year Promise", 35000, 0, "Golden Hand winner: sacred blossoming floral sage branch."),
    (1703174, "Crown Scepter", 35000, 0, "Golden Hand winner: jeweled imperial scepter."),
    (1703152, "Upright Heart", 35000, 0, "Golden Hand winner: traditional calligraphic ink paintbrush."),
    (1703155, "Midnight Ink", 35000, 0, "Golden Hand winner: dark swirling ink scroll blade."),
    (1702586, "Dreaming Dandelion", 35000, 0, "Gentle floating dandelion floral weapon skin."),
    (1702154, "Plasma Saber", 30000, 0, "Futuristic glowing neon sci-fi beam blade."),
    (1702155, "Shooting Star", 35000, 0, "Radiant celestial shooting star blade."),
    (1702587, "Rockin' Guitar", 35000, 0, "Electric rockstar guitar weapon skin."),
    (1702588, "Black Cat Plush", 35000, 0, "Cute huggable black kitten plush weapon."),
    (1702591, "Grand Romance", 35000, 0, "Romantic blooming rose bouquet weapon skin."),
    (1702142, "Pink Angel Stick", 30000, 0, "Glittering magical girl heart wand."),
    (1702589, "Fairy Blossom", 35000, 0, "Enchanted sparkling fairy wand weapon skin."),
    (1702901, "Crystalline Wand", 35000, 0, "Prismatic shimmering crystal magical staff."),
    (1702928, "Record of the Stars", 40000, 0, "Astral grimoire orbiting with celestial constellations."),
    (1702856, "Infinite Star Cluster", 40000, 0, "Floating galaxy orb weapon skin.")
]

# ==============================================================================
# WINGS, CAPES & BACK AURAS
# ==============================================================================
WINGS_AND_CAPES = [
    (1102532, "Light Wing Cherubim", 35000, 0, "Sacred radiant angel wings with shimmering aura."),
    (1102554, "Succubus Wings", 35000, 0, "Dark demonic bat wings with purple shadow mist."),
    (1102546, "Blue Bird Dream Wings", 30000, 0, "Soft ethereal sky blue feathered dream wings."),
    (1102547, "Amethyst Dream Wings", 30000, 0, "Enchanted violet crystal butterfly wings."),
    (1102005, "Baby Angel Wings", 25000, 0, "Cute small white fluffy cherub wings."),
    (1102006, "Devil Wings", 25000, 0, "Classic pointed dark devil wings."),
    (1102501, "Friendly Nine-Tailed Fox Tails", 40000, 0, "Mystical nine fluffy golden fox tails."),
    (1102885, "Fluffy Fox Tail (Gold)", 35000, 0, "Thick radiant golden kitsune tail."),
    (1103390, "Banquet of Light", 40000, 0, "Golden Hand winner: majestic holy constellation aura."),
    (1103386, "Shouldering Nightmare", 40000, 0, "Golden Hand winner: swirling dark shadow cloak."),
    (1103387, "Battle Rifle", 35000, 0, "Golden Hand winner: high-tech tactical combat rifle slung on back."),
    (1103389, "Logging Into Magic World", 35000, 0, "Golden Hand winner: shimmering 90s anime portal aura."),
    (1103397, "Plum Flower Painting", 35000, 0, "Golden Hand winner: floating ink painting with blooming blossoms."),
    (1103400, "Night Silk Overcoat", 35000, 0, "Golden Hand winner: flowing midnight silk draped coat."),
    (1103416, "Cameo Brooch", 35000, 0, "Golden Hand winner: ornate aristocratic cape with jewel brooch."),
    (1103414, "Under the Moonlight", 35000, 0, "Golden Hand winner: soft moonlit fog flowing behind you."),
    (1103305, "[BTS] Swan Serenade", 40000, 0, "Official BTS collaboration: floating black swan feathers."),
    (1103547, "[BLACKPINK] Venom Night", 40000, 0, "Official BLACKPINK collaboration: neon black aura veil."),
    (1102503, "Cat Lolita Cape", 30000, 0, "Frilly gothic ribbon cape with playful cat tail."),
    (1102530, "Spark Fairy Cape", 30000, 0, "Sparkling stardust trail that follows your steps."),
    (1102537, "Magic Star Cape", 30000, 0, "Constellation halo orb that orbits behind you.")
]

# ==============================================================================
# HATS, HEADWEAR, HORNS & RIBBONS
# ==============================================================================
HATS_AND_HEADWEAR = [
    (1005904, "Starlight Shadow", 30000, 0, "Golden Hand winner: celestial astral halo and crown."),
    (1005899, "Sign of Encroachment", 30000, 0, "Golden Hand winner: demonic dark horns with crimson seal."),
    (1005900, "Cyber Rabbit Mask", 30000, 0, "Golden Hand winner: neon LED futuristic rabbit visor."),
    (1005902, "Lyrical Pink Ribbon", 25000, 0, "Golden Hand winner: oversized ruffled magical girl hair ribbon."),
    (1005903, "Lyrical Blue Ribbon", 25000, 0, "Golden Hand winner: crisp azure boy idol hair bow."),
    (1005913, "Ink-colored Wide-brimmed Hat", 25000, 0, "Golden Hand winner: traditional Korean scholar ink hat."),
    (1005918, "White Wide-brimmed Hat", 25000, 0, "Golden Hand winner: pure ivory traditional silk hat."),
    (1005949, "Unassailable Honor", 25000, 0, "Golden Hand winner: grand imperial tiara crown."),
    (1005947, "Lunar Shadow Cap", 25000, 0, "Golden Hand winner: sleek noir street beret."),
    (1005926, "Baby Bear Bonnet", 20000, 0, "Golden Hand winner: cozy lace teddy bear bonnet."),
    (1005905, "Rock Spirit Beret", 20000, 0, "Golden Hand winner: energetic rock spirit badge beret."),
    (1005656, "[BTS] Eclipse Feather", 30000, 0, "Official BTS collaboration: ethereal obsidian swan feather."),
    (1005649, "[BTS] Mikrokosmos", 30000, 0, "Official BTS collaboration: galaxy constellation headpiece."),
    (1006153, "[BLACKPINK] Venom Chic", 30000, 0, "Official BLACKPINK collaboration: edgy punk beret with pins."),
    (1006154, "[BLACKPINK] Venom Rose", 30000, 0, "Official BLACKPINK collaboration: black thorny rose hair accessory."),
    (1006155, "[BLACKPINK] PINK Bunny Helmet", 30000, 0, "Official BLACKPINK collaboration: futuristic neon bunny helmet."),
    (1005477, "Checkmate Cap", 25000, 0, "Grandmaster checkmate royal officer cap."),
    (1005223, "Alliance Commander Tiara", 25000, 0, "Sacred golden crown of Empress Cygnus."),
    (1004672, "Time Master Hat", 25000, 0, "Master Time Masterpiece gentleman's top hat."),
    (1005375, "Superstar Pink Bean Headphones", 25000, 0, "Pink Bean ear-cuffed gaming headphones."),
    (1004013, "Nine-Tailed Fox Mask", 25000, 0, "Ceremonial porcelain kitsune spirit mask."),
    (1003842, "Succubus Hat", 20000, 0, "Gothic ruffled pointed witch hat."),
    (1003131, "Black Dressy Ribbon", 20000, 0, "Elegant satin black hair ribbon."),
    (1003865, "Starlight Wings Halo", 30000, 0, "Luminous floating halo with mini angel wings."),
    (1004081, "Dawn Bear Hoodie", 25000, 0, "Warm cozy bear ear hoodie cap.")
]

# ==============================================================================
# MALE FASHION & SUITS (MALE ONLY)
# ==============================================================================
MALE_FASHION = [
    (1050608, "Starry Night Ruling (M)", 35000, 0, "Golden Hand winner: tailored celestial star lord coat [Male]."),
    (1050604, "Slayer Black Clothes (M)", 35000, 0, "Golden Hand winner: traditional Eastern assassin robes [Male]."),
    (1050610, "Pure Dignity (M)", 35000, 0, "Golden Hand winner: pristine traditional scholar hanbok [Male]."),
    (1050613, "Moonlight Sentiment (M)", 35000, 0, "Golden Hand winner: elegant moonlit silk overcoat [Male]."),
    (1050622, "Romance Fantasy Hero (M)", 35000, 0, "Golden Hand winner: grand duke imperial officer uniform [Male]."),
    (1050620, "Noir Moonlight Jacket (M)", 35000, 0, "Golden Hand winner: street noir leather combat trench [Male]."),
    (1050607, "Retro Magic Boy Suit (M)", 30000, 0, "Golden Hand winner: 90s magical boy idol suit [Male]."),
    (1050603, "Sage Ascension (M)", 30000, 0, "Golden Hand winner: ethereal mountain sage robes [Male]."),
    (1050605, "Last Survivor (M)", 30000, 0, "Golden Hand winner: post-apocalyptic tactical armor [Male]."),
    (1050615, "Teddy Bear Overalls (M)", 30000, 0, "Golden Hand winner: sweet pastel teddy bear overalls [Male]."),
    (1050538, "Checkmate King (M)", 35000, 0, "Grandmaster checkmate king royal attire [Male]."),
    (1054570, "White Checkmate Outfit", 35000, 0, "Crisp ivory checkmate officer suit [Male]."),
    (1054571, "Black Checkmate Outfit", 35000, 0, "Shadow obsidian checkmate officer suit [Male]."),
    (1053347, "Alliance Commander Suit (M)", 35000, 0, "Imperial Cygnus knight commander dress uniform [Male]."),
    (1050522, "Tranquil Picnic Suit (M)", 30000, 0, "Spring picnic gentleman suit [Male]."),
    (1050524, "Summer Breeze Outfit (M)", 30000, 0, "Refreshing summer linen outfit [Male]."),
    (1050528, "Shepherd's Getup (M)", 30000, 0, "Pastoral shepherd vest and trousers [Male]."),
    (1050478, "Iron Mace Officer (M)", 30000, 0, "Grand imperial officer dress uniform [Male]."),
    (1070125, "Punisher Will (M)", 15000, 0, "Celestial star lord dress boots [Male]."),
    (1070133, "Confident Steps (M)", 15000, 0, "Imperial grand duke leather boots [Male]."),
    (1070086, "Tranquil Picnic Shoes (M)", 10000, 0, "Leather oxford picnic shoes [Male].")
]

# ==============================================================================
# FEMALE FASHION & DRESSES (FEMALE ONLY)
# ==============================================================================
FEMALE_FASHION = [
    (1051681, "Starry Night Judgment (F)", 35000, 0, "Golden Hand winner: breathtaking celestial star gown [Female]."),
    (1051677, "Hunter Black Clothes (F)", 35000, 0, "Golden Hand winner: sleek Eastern shadow kunoichi robes [Female]."),
    (1051683, "Noble Dignity (F)", 35000, 0, "Golden Hand winner: royal traditional silk Hanbok dress [Female]."),
    (1051686, "Starlight Sentiment (F)", 35000, 0, "Golden Hand winner: graceful starlight evening gown [Female]."),
    (1051695, "Romance Fantasy Heroine (F)", 35000, 0, "Golden Hand winner: imperial duchess grand ballroom gown [Female]."),
    (1051693, "Loose Moonlight Jacket (F)", 35000, 0, "Golden Hand winner: modern oversized moonlight streetwear [Female]."),
    (1051680, "Retro Magic Girl Dress (F)", 30000, 0, "Golden Hand winner: 90s magical girl frilly ribbon dress [Female]."),
    (1051676, "Fairy Flower (F)", 30000, 0, "Golden Hand winner: blooming pastel floral sanctuary dress [Female]."),
    (1051678, "Ultimate Survivor (F)", 30000, 0, "Golden Hand winner: tactical combat survivor bodysuit [Female]."),
    (1051688, "Teddy Bear Dress (F)", 30000, 0, "Golden Hand winner: sweet pastel teddy bear ribbon dress [Female]."),
    (1051754, "[BLACKPINK] Venom Blood (F)", 40000, 0, "Official BLACKPINK stage outfit with edgy leather corset [Female]."),
    (1051755, "[BLACKPINK] So PINK (F)", 40000, 0, "Official BLACKPINK pastel pink stage idol dress [Female]."),
    (1051609, "Checkmate Queen (F)", 35000, 0, "Grandmaster checkmate royal queen gown [Female]."),
    (1051570, "Alliance Commander Cygnus Suit (F)", 35000, 0, "Regal pure white dress worn by Empress Cygnus [Female]."),
    (1051349, "Succubus Dress (F)", 30000, 0, "Gothic dark ruffled corseted succubus gown [Female]."),
    (1051592, "Tranquil Picnic Dress (F)", 30000, 0, "Lace-trimmed picnic sundress [Female]."),
    (1051594, "Summer Breeze Outfit (F)", 30000, 0, "Breezy pastel summer floral dress [Female]."),
    (1051598, "Shepherd's Frock (F)", 30000, 0, "Pastoral cottagecore ruffled dress [Female]."),
    (1051280, "Gentle Hanbok (F)", 30000, 0, "Traditional graceful Korean Hanbok silk dress [Female]."),
    (1071141, "Judgment Will (F)", 15000, 0, "Celestial evening glass slippers [Female]."),
    (1071149, "Light Steps (F)", 15000, 0, "Imperial duchess ballroom heels [Female]."),
    (1071104, "Tranquil Picnic Shoes (F)", 10000, 0, "Dainty strapped picnic Mary Janes [Female].")
]

# ==============================================================================
# UNISEX COSTUMES, ONESIES & ROBES (ALL CHARACTERS)
# ==============================================================================
UNISEX_COSTUMES = [
    (1053640, "[BTS] Love Swan", 40000, 0, "Official BTS collaboration: iconic Black Swan stage robes [Unisex]."),
    (1051455, "Time Cantabile", 40000, 0, "Master Time Masterpiece unisex royal suit [Unisex]."),
    (1053446, "Superstar Pink Bean Onesie", 35000, 0, "Adorable cuddly Pink Bean onesie costume [Unisex]."),
    (1053800, "Rock Spirit Raincoat", 30000, 0, "Golden Hand winner: bright translucent neon raincoat [Unisex]."),
    (1053463, "Glory Guard Uniform", 35000, 0, "Honorary ceremonial grand uniform [Unisex]."),
    (1053450, "Light Executor Garb", 35000, 0, "Holy white executor tactical robes [Unisex]."),
    (1053449, "Dark Executor Garb", 35000, 0, "Dark shadow executor stealth robes [Unisex].")
]

# ==============================================================================
# FACE & EYE ACCESSORIES, RINGS & AURAS
# ==============================================================================
ACCESSORY_ITEMS = [
    (1012774, "[BLACKPINK] Hidden Venom", 25000, 0, "Official BLACKPINK: edgy black heart facial decal."),
    (1012775, "[BLACKPINK] Twinkle PINK", 25000, 0, "Official BLACKPINK: glittering pastel pink glitter blush."),
    (1115271, "[BLACKPINK] BLACK Chat Ring", 25000, 0, "Official BLACKPINK: custom black stage chat speech bubble."),
    (1115272, "[BLACKPINK] PINK Chat Ring", 25000, 0, "Official BLACKPINK: custom pink stage chat speech bubble."),
    (1115373, "[BLACKPINK] BLACK Label Ring", 25000, 0, "Official BLACKPINK: custom black stage nametag."),
    (1115374, "[BLACKPINK] PINK Label Ring", 25000, 0, "Official BLACKPINK: custom pink stage nametag."),
    (1115210, "[BTS] Black Swan Chat Ring", 25000, 0, "Official BTS: elegant Black Swan chat speech bubble."),
    (1115311, "[BTS] Black Swan Label Ring", 25000, 0, "Official BTS: elegant Black Swan character nametag."),
    (1032322, "[BTS] Black Chandelier", 20000, 0, "Official BTS: sparkling crystal chandelier dangling earrings."),
    (1012729, "Labyrinth Memory", 25000, 0, "Luminous floating crystal eye accessory from the Labyrinth."),
    (1012692, "Shepherd's Chewin' Grass Face", 15000, 0, "Casual playful grass stalk in mouth.")
]

# ==============================================================================
# CUBES & POTENTIAL ITEMS
# ==============================================================================
CUBE_ITEMS = [
    (5062028, "Glowing Cube", 1200, "Rerolls equipment potential up to Legendary tier."),
    (5062029, "Bright Cube", 2200, "Rerolls potential with Before / After selection."),
    (5062505, "Bonus Glowing Cube", 2400, "Rerolls bonus potential stats up to Legendary tier."),
    (5062506, "Bonus Bright Cube", 3000, "Rerolls bonus potential with Before / After selection."),
    (2710028, "Mystical Cube", 300, "Rerolls equipment potential up to Epic tier."),
    (2710034, "Hard Cube", 600, "Rerolls equipment potential up to Unique tier."),
    (2710035, "Solid Cube", 1000, "Rerolls equipment potential up to Legendary tier."),
    (2730007, "Bonus Mystical Cube", 500, "Rerolls bonus potential stats up to Epic tier.")
]

# ==============================================================================
# FLAMES & UPGRADE SCROLLS
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
# UTILITY & CONVENIENCE ITEMS
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

def buy_outfit_package(sm, chr, pkg):
    pkg_id, pkg_name, cost, target_gender, desc, items = pkg
    char_gender = get_char_gender(chr)
    mp, _ = get_points(chr)

    text = "#face0##fc0xFFFFFFFF##fs13#=== #e#b" + pkg_name + "#fc0xFFFFFFFF##n ===\r\n\r\n"
    text += "Description: #fc0xFFCCCCCC##fs11#" + desc + "#fc0xFFFFFFFF##fs13#\r\n"
    text += "#g[100% Crash-Proof: All items will be directly unpacked into your Cash tab!]#fc0xFFFFFFFF#\r\n\r\n"
    text += "#e#bIncluded Items in Set (" + str(len(items)) + " Pieces):#fc0xFFFFFFFF##n\r\n"
    for item_id, item_name, slot in items:
        text += "- #i" + str(item_id) + "# #b" + item_name + "#fc0xFFFFFFFF# [" + slot + "]\r\n"

    text += "\r\nPackage Price: #e#r" + format_num(cost) + " Maple Points#fc0xFFFFFFFF##n\r\n"
    text += "Your Balance: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
    text += "Would you like to purchase and immediately unpack this complete set?"

    if not sm.sendAskYesNo(text):
        return

    mp, _ = get_points(chr)
    if mp < cost:
        sm.sendSayOkay("#face2##fc0xFFFFFFFF#You do not have enough Maple Points!\r\nRequired: #r" + format_num(cost) + " Points#fc0xFFFFFFFF#")
        return

    free_slots = chr.getInventoryByType(InvType.CASH).getEmptySlots()
    if free_slots < len(items):
        sm.sendSayOkay("#face2##fc0xFFFFFFFF#You need at least #r" + str(len(items)) + " empty slots#fc0xFFFFFFFF# in your Cash inventory tab!\r\nCurrent free Cash slots: " + str(free_slots))
        return

    chr.getUser().deductMaplePoints(cost)
    try:
        chr.getUser().updateUserToSQL()
    except:
        pass

    for item_id, item_name, slot in items:
        chr.addItemToInventory(item_id, 1)

    new_mp, _ = get_points(chr)
    sm.sendSayOkay("#face1##fc0xFFFFFFFF##e#b[Package Unpacked Successfully!]#fc0xFFFFFFFF##n\r\n\r\n"
                   "All #r" + str(len(items)) + " items#fc0xFFFFFFFF# from #b" + pkg_name + "#fc0xFFFFFFFF# have been placed directly into your Cash inventory!\r\n\r\n"
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

        menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#d[Lucid - Cash & Fashion Grand Mall]#fc0xFFFFFFFF##n ===\r\n"
        menu += "Welcome to the dream realm of fashion, #h0#! What stunning attire can I prepare for you?\r\n"
        menu += "Character: " + get_gender_label(char_gender) + "  |  Cash: #e#b" + format_num(mp) + " Points#fc0xFFFFFFFF##n  |  DP: #e#r" + format_num(dp) + "#fc0xFFFFFFFF##n\r\n\r\n"
        menu += "#r#L1##e[1] Complete Outfit Bundles & Set Boxes (100% Crash-Proof Unpack)#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#BLACKPINK, BTS, Golden Hand Winners, Checkmate, Cygnus, M-Label sets.#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#b#L2##e[2] Universal Weapon Covers (Massive Arsenal - All Weapons)#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Death's Scythe, True Hilla, Moon Slayer, Black Blade, Star Record, Guitars.#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#b#L3##e[3] Full Transparent Equipment Collection (Singles & Bundle)#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Complete 9-piece Transparent Set + 35k Discount Bundle option.#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#b#L4##e[4] Wings, Capes & Back Auras (Divine, Demonic & Floating)#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Nine-Tailed Fox Tails, Cherubim, Succubus, Dream Wings, Starlight Auras.#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#b#L5##e[5] Hats, Horns, Ribbons, Helmets & Halos#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Golden Hand crowns, Kitsune mask, BTS feathers, Blackpink helmets, Ribbons.#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#b#L6##e[6] Male Fashion & Suits (Male Only)#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Starry Night Ruling, Slayer Robes, Pure Dignity, Officer Uniforms, Boots.#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#r#L7##e[7] Female Fashion & Dresses (Female Only)#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Starry Night Judgment, Kunoichi, Duchess Gowns, BLACKPINK Stage, Heels.#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#g#L8##e[8] Unisex Costumes, Onesies & Robes (All Characters)#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#BTS Love Swan, Time Cantabile, Pink Bean Onesie, Executor Garbs.#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#b#L9##e[9] Face & Eye Accessories, Rings & Name Tags#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#BLACKPINK/BTS Chat & Label Rings, Labyrinth Eye, Chewin' Grass Face.#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#b#L10##e[10] Cubes & Potential System (Unisex)#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Red Cube, Black Cube, Bonus Potential, Violet, Glowing & Bright Cubes.#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#b#L11##e[11] Rebirth Flames & Scrolls (Unisex)#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Powerful / Eternal / Black Flames, Protection, Safety, Slate Scrolls.#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#b#L12##e[12] Utility & Inventory Slot Expansion#n#k\r\n"
        menu += "   #fc0xFFEEEEEE##fs11#Hyper Teleport Rock, Pendant Slot (30D), Revives, Megaphones.#fc0xFFFFFFFF##fs13#\r\n"
        menu += "#d#L99#Exit Grand Mall#l#k\r\n"

        cat = sm.sendNext(menu)
        if cat == 99 or cat < 1 or cat > 12:
            break

        if cat == 1:
            # Complete Outfit Packages
            while True:
                mp, dp = get_points(chr)
                pkg_menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#d[Complete Outfit Bundles & Set Boxes]#fc0xFFFFFFFF##n ===\r\n"
                pkg_menu += "#g(All sets are directly unpacked into your Cash tab - 100% crash-proof!)#fc0xFFFFFFFF#\r\n"
                pkg_menu += "Current Points: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
                for idx, pkg in enumerate(OUTFIT_PACKAGES):
                    pkg_menu += "#L" + str(idx) + "##b" + pkg[1] + "#fc0xFFFFFFFF# - #r" + format_num(pkg[2]) + " Points#fc0xFFFFFFFF#\r\n"
                    pkg_menu += "    #fc0xFFCCCCCC##fs11#" + pkg[4] + "#fc0xFFFFFFFF##fs13##l\r\n"
                pkg_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                p_sel = sm.sendNext(pkg_menu)
                if p_sel == 99 or p_sel < 0 or p_sel >= len(OUTFIT_PACKAGES):
                    break
                buy_outfit_package(sm, chr, OUTFIT_PACKAGES[p_sel])

        elif cat == 2:
            # Universal Weapons
            while True:
                mp, _ = get_points(chr)
                w_menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#b[Universal Weapon Covers (All Weapons)]#fc0xFFFFFFFF##n ===\r\n"
                w_menu += "Current Points: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
                for idx, (iid, iname, icost, idays, idesc) in enumerate(WEAPON_COVERS):
                    w_menu += "#L" + str(idx) + "##i" + str(iid) + "# #b" + iname + "#fc0xFFFFFFFF# - #r" + format_num(icost) + " Points#fc0xFFFFFFFF#\r\n"
                    w_menu += "    #fc0xFFCCCCCC##fs11#" + idesc + "#fc0xFFFFFFFF##fs13##l\r\n"
                w_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                w_sel = sm.sendNext(w_menu)
                if w_sel == 99 or w_sel < 0 or w_sel >= len(WEAPON_COVERS):
                    break
                iid, iname, icost, idays, idesc = WEAPON_COVERS[w_sel]
                buy_single_equip(sm, chr, iid, iname, icost, idays, idesc, 2)

        elif cat == 3:
            # Transparent Equips
            while True:
                mp, _ = get_points(chr)
                t_menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#b[Transparent Equipment Collection]#fc0xFFFFFFFF##n ===\r\n"
                t_menu += "Current Points: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
                t_menu += "#e#r#L100#[* Purchase Complete 9-Item Transparent Bundle (100,000 Points - Save 35k!)]#fc0xFFFFFFFF##n#l\r\n\r\n"
                for tidx, (tid, tname, tcost, tdays, tdesc) in enumerate(TRANSPARENT_EQUIPS):
                    t_menu += "#L" + str(tidx) + "##i" + str(tid) + "# #b" + tname + "#fc0xFFFFFFFF# - #r" + format_num(tcost) + " Points#fc0xFFFFFFFF#\r\n"
                    t_menu += "    #fc0xFFCCCCCC##fs11#" + tdesc + "#fc0xFFFFFFFF##fs13##l\r\n"
                t_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                t_sel = sm.sendNext(t_menu)
                if t_sel == 99:
                    break
                elif t_sel == 100:
                    buy_transparent_bundle(sm, chr)
                elif 0 <= t_sel < len(TRANSPARENT_EQUIPS):
                    tid, tname, tcost, tdays, tdesc = TRANSPARENT_EQUIPS[t_sel]
                    buy_single_equip(sm, chr, tid, tname, tcost, tdays, tdesc, 2)

        elif cat == 4:
            # Wings & Capes
            while True:
                mp, _ = get_points(chr)
                c_menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#b[Wings, Capes & Back Auras]#fc0xFFFFFFFF##n ===\r\n"
                c_menu += "Current Points: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
                for idx, (iid, iname, icost, idays, idesc) in enumerate(WINGS_AND_CAPES):
                    c_menu += "#L" + str(idx) + "##i" + str(iid) + "# #b" + iname + "#fc0xFFFFFFFF# - #r" + format_num(icost) + " Points#fc0xFFFFFFFF#\r\n"
                    c_menu += "    #fc0xFFCCCCCC##fs11#" + idesc + "#fc0xFFFFFFFF##fs13##l\r\n"
                c_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                c_sel = sm.sendNext(c_menu)
                if c_sel == 99 or c_sel < 0 or c_sel >= len(WINGS_AND_CAPES):
                    break
                iid, iname, icost, idays, idesc = WINGS_AND_CAPES[c_sel]
                buy_single_equip(sm, chr, iid, iname, icost, idays, idesc, 2)

        elif cat == 5:
            # Hats & Headwear
            while True:
                mp, _ = get_points(chr)
                h_menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#b[Hats, Horns, Ribbons & Halos]#fc0xFFFFFFFF##n ===\r\n"
                h_menu += "Current Points: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
                for idx, (iid, iname, icost, idays, idesc) in enumerate(HATS_AND_HEADWEAR):
                    h_menu += "#L" + str(idx) + "##i" + str(iid) + "# #b" + iname + "#fc0xFFFFFFFF# - #r" + format_num(icost) + " Points#fc0xFFFFFFFF#\r\n"
                    h_menu += "    #fc0xFFCCCCCC##fs11#" + idesc + "#fc0xFFFFFFFF##fs13##l\r\n"
                h_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                h_sel = sm.sendNext(h_menu)
                if h_sel == 99 or h_sel < 0 or h_sel >= len(HATS_AND_HEADWEAR):
                    break
                iid, iname, icost, idays, idesc = HATS_AND_HEADWEAR[h_sel]
                buy_single_equip(sm, chr, iid, iname, icost, idays, idesc, 2)

        elif cat == 6:
            # Male Fashion & Suits
            while True:
                mp, _ = get_points(chr)
                m_menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#b[Male Fashion & Suits (Male Only)]#fc0xFFFFFFFF##n ===\r\n"
                m_menu += "Current Points: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
                for idx, (iid, iname, icost, idays, idesc) in enumerate(MALE_FASHION):
                    m_menu += "#L" + str(idx) + "##i" + str(iid) + "# #b" + iname + "#fc0xFFFFFFFF# - #r" + format_num(icost) + " Points#fc0xFFFFFFFF#\r\n"
                    m_menu += "    #fc0xFFCCCCCC##fs11#" + idesc + "#fc0xFFFFFFFF##fs13##l\r\n"
                m_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                m_sel = sm.sendNext(m_menu)
                if m_sel == 99 or m_sel < 0 or m_sel >= len(MALE_FASHION):
                    break
                iid, iname, icost, idays, idesc = MALE_FASHION[m_sel]
                buy_single_equip(sm, chr, iid, iname, icost, idays, idesc, 0)

        elif cat == 7:
            # Female Fashion & Dresses
            while True:
                mp, _ = get_points(chr)
                f_menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#b[Female Fashion & Dresses (Female Only)]#fc0xFFFFFFFF##n ===\r\n"
                f_menu += "Current Points: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
                for idx, (iid, iname, icost, idays, idesc) in enumerate(FEMALE_FASHION):
                    f_menu += "#L" + str(idx) + "##i" + str(iid) + "# #b" + iname + "#fc0xFFFFFFFF# - #r" + format_num(icost) + " Points#fc0xFFFFFFFF#\r\n"
                    f_menu += "    #fc0xFFCCCCCC##fs11#" + idesc + "#fc0xFFFFFFFF##fs13##l\r\n"
                f_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                f_sel = sm.sendNext(f_menu)
                if f_sel == 99 or f_sel < 0 or f_sel >= len(FEMALE_FASHION):
                    break
                iid, iname, icost, idays, idesc = FEMALE_FASHION[f_sel]
                buy_single_equip(sm, chr, iid, iname, icost, idays, idesc, 1)

        elif cat == 8:
            # Unisex Costumes & Onesies
            while True:
                mp, _ = get_points(chr)
                u_menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#b[Unisex Costumes & Onesies (All Characters)]#fc0xFFFFFFFF##n ===\r\n"
                u_menu += "Current Points: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
                for idx, (iid, iname, icost, idays, idesc) in enumerate(UNISEX_COSTUMES):
                    u_menu += "#L" + str(idx) + "##i" + str(iid) + "# #b" + iname + "#fc0xFFFFFFFF# - #r" + format_num(icost) + " Points#fc0xFFFFFFFF#\r\n"
                    u_menu += "    #fc0xFFCCCCCC##fs11#" + idesc + "#fc0xFFFFFFFF##fs13##l\r\n"
                u_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                u_sel = sm.sendNext(u_menu)
                if u_sel == 99 or u_sel < 0 or u_sel >= len(UNISEX_COSTUMES):
                    break
                iid, iname, icost, idays, idesc = UNISEX_COSTUMES[u_sel]
                buy_single_equip(sm, chr, iid, iname, icost, idays, idesc, 2)

        elif cat == 9:
            # Face, Eye, Rings
            while True:
                mp, _ = get_points(chr)
                a_menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#b[Face & Eye Accessories, Rings & Auras]#fc0xFFFFFFFF##n ===\r\n"
                a_menu += "Current Points: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
                for idx, (iid, iname, icost, idays, idesc) in enumerate(ACCESSORY_ITEMS):
                    a_menu += "#L" + str(idx) + "##i" + str(iid) + "# #b" + iname + "#fc0xFFFFFFFF# - #r" + format_num(icost) + " Points#fc0xFFFFFFFF#\r\n"
                    a_menu += "    #fc0xFFCCCCCC##fs11#" + idesc + "#fc0xFFFFFFFF##fs13##l\r\n"
                a_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                a_sel = sm.sendNext(a_menu)
                if a_sel == 99 or a_sel < 0 or a_sel >= len(ACCESSORY_ITEMS):
                    break
                iid, iname, icost, idays, idesc = ACCESSORY_ITEMS[a_sel]
                buy_single_equip(sm, chr, iid, iname, icost, idays, idesc, 2)

        elif cat == 10:
            # Cubes
            while True:
                mp, dp = get_points(chr)
                cb_menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#b[Cubes & Potential System]#fc0xFFFFFFFF##n ===\r\n"
                cb_menu += "Current Points: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
                for idx, (cid, cname, ccost, cdesc) in enumerate(CUBE_ITEMS):
                    cb_menu += "#L" + str(idx) + "##i" + str(cid) + "# #b" + cname + "#fc0xFFFFFFFF# - #r" + format_num(ccost) + " Points#fc0xFFFFFFFF#\r\n"
                    cb_menu += "    #fc0xFFCCCCCC##fs11#" + cdesc + "#fc0xFFFFFFFF##fs13##l\r\n"
                cb_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                cb_sel = sm.sendNext(cb_menu)
                if cb_sel == 99 or cb_sel < 0 or cb_sel >= len(CUBE_ITEMS):
                    break
                cid, cname, ccost, cdesc = CUBE_ITEMS[cb_sel]
                buy_stackable_item(sm, chr, cid, cname, ccost, cdesc)

        elif cat == 11:
            # Flames & Scrolls
            while True:
                mp, dp = get_points(chr)
                fl_menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#b[Rebirth Flames & Scrolls]#fc0xFFFFFFFF##n ===\r\n"
                fl_menu += "Current Points: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
                for idx, (fid, fname, fcost, fdesc) in enumerate(FLAME_SCROLL_ITEMS):
                    fl_menu += "#L" + str(idx) + "##i" + str(fid) + "# #b" + fname + "#fc0xFFFFFFFF# - #r" + format_num(fcost) + " Points#fc0xFFFFFFFF#\r\n"
                    fl_menu += "    #fc0xFFCCCCCC##fs11#" + fdesc + "#fc0xFFFFFFFF##fs13##l\r\n"
                fl_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                fl_sel = sm.sendNext(fl_menu)
                if fl_sel == 99 or fl_sel < 0 or fl_sel >= len(FLAME_SCROLL_ITEMS):
                    break
                fid, fname, fcost, fdesc = FLAME_SCROLL_ITEMS[fl_sel]
                buy_stackable_item(sm, chr, fid, fname, fcost, fdesc)

        elif cat == 12:
            # Utility & Slots
            while True:
                mp, dp = get_points(chr)
                ut_menu = "#face0##fc0xFFFFFFFF##fs13#=== #e#b[Utility & Inventory Expansion]#fc0xFFFFFFFF##n ===\r\n"
                ut_menu += "Current Points: #e#b" + format_num(mp) + " Maple Points#fc0xFFFFFFFF##n\r\n\r\n"
                for idx, (uid, uname, ucost, udays, udesc) in enumerate(UTILITY_ITEMS):
                    dur_str = " (30 Days)" if udays > 0 else ""
                    ut_menu += "#L" + str(idx) + "##i" + str(uid) + "# #b" + uname + "#fc0xFFFFFFFF# - #r" + format_num(ucost) + " Points#fc0xFFFFFFFF#" + dur_str + "\r\n"
                    ut_menu += "    #fc0xFFCCCCCC##fs11#" + udesc + "#fc0xFFFFFFFF##fs13##l\r\n"
                ut_menu += "#d#L99#[Back to Main Menu]#k#l\r\n"

                ut_sel = sm.sendNext(ut_menu)
                if ut_sel == 99 or ut_sel < 0 or ut_sel >= len(UTILITY_ITEMS):
                    break
                uid, uname, ucost, udays, udesc = UTILITY_ITEMS[ut_sel]
                if udays > 0:
                    buy_single_equip(sm, chr, uid, uname, ucost, udays, udesc, 2)
                else:
                    buy_stackable_item(sm, chr, uid, uname, ucost, udesc)
