# Universal Town & Field Warp Service
# Fast Travel system for Major Towns, Grandis, Arcane River, and Popular Training Fields
# 100% Pure ASCII for Jython 2.7 compatibility

WARP_CATEGORIES = [
    ("Major Towns (Victoria Island & Continents)", [
        ("Henesys", 100000000, "Archer town & main social hub of Maple World"),
        ("Ellinia", 101000000, "Magician treetop city in the ancient magic forest"),
        ("Perion", 102000000, "Warrior rocky highlands & historic plateau"),
        ("Kerning City", 103000000, "Thief modern metropolis & subway station"),
        ("Lith Harbor", 104000000, "Beginning harbor town of Victoria Island"),
        ("Sleepywood", 105000000, "Deep ancient forest, sauna & temple gateway"),
        ("Nautilus Harbor", 120000000, "Pirate submarine battleship & harbor"),
        ("Florina Beach", 110000000, "Sunny tropical beach & coconut trees"),
        ("Orbis", 200000000, "Floating cloud city in the sky & airship station"),
        ("El Nath", 211000000, "Snowy mountain village & ice plateau"),
        ("Ludibrium", 220000000, "Clockwork toy kingdom & dual clocktowers"),
        ("Omega Sector", 221000000, "Secret underground alien defense silo base"),
        ("Korean Folk Town", 222000000, "Traditional Korean fairytale storybook village"),
        ("Aquarium", 230000000, "Undersea kingdom of Aqua Road"),
        ("Leafre", 240000000, "Dragon realm & Halfling village of Minar Forest"),
        ("Mu Lung", 250000000, "Martial arts panda mountain & peach orchards"),
        ("Herb Town", 251000000, "Pirate hideout & healing medicine marshes"),
        ("Ariant", 260000000, "Nihal desert royal palace of the Sultan"),
        ("Magatia", 261000000, "City of alchemy (Zenumist & Alcadno Societies)"),
        ("Edelstein", 310000000, "Resistance mechanical industrial metropolis"),
        ("Rien", 140000000, "Frozen island of the Polearm Hero Aran & Lilin"),
        ("Ereve", 130000000, "Empress Cygnus floating sanctuary & Shinsoo"),
    ]),
    ("Grandis Sacred Continents & Cities", [
        ("Pantheon", 400000000, "Nova sacred sanctuary & Dimensional Interdimensional Gate"),
        ("Heliseum Reclamation HQ", 401000000, "Nova frontline resistance against Commander Magnus"),
        ("Savage Terminal (Brigand's Row)", 402000000, "Outlaw desert metropolis & black market alley"),
        ("Vulpes (Fox Point Village)", 410000000, "Anima fox sacred homeland of Shade & Moon"),
        ("Cheong-woon (Marketplace)", 410000200, "Taoist mystic valley & Hoyoung hometown"),
        ("Ristonia (Fountain Square)", 410000300, "Grand European royal capital & Adele hometown"),
        ("Cernium (Cernium Square)", 410000500, "Lv. 260+ | Holy City of God & Chamber of the Holy Sword"),
        ("Burning Cernium (Destroyed Square)", 410000800, "Lv. 260+ | High Flora warfront & falling ramparts"),
        ("Hotel Arcus (Saloon)", 410003000, "Lv. 265+ | Wasteland railroad hotel & rusted locomotive"),
        ("Karote (Karote Summit)", 410006000, "Lv. 265+ | Tower of the Gods & Kalos the Guardian"),
        ("Odium (Residential District)", 410007000, "Lv. 270+ | Laboratory of the Predecessors & Kaling Gate"),
        ("Shangri-La (Invasion Front)", 410008000, "Lv. 275+ | Four seasons immortal paradise & Tai Chi palace"),
        ("Carcion (Replicated Truth)", 410009000, "Lv. 280+ | Ancient giant tree & coral realm of Limbo"),
        ("Tallahart (Grave of the Gods)", 410013600, "Lv. 290+ | Ancient domain of forgotten deities"),
    ]),
    ("Arcane River Towns (Lv. 200 - 255)", [
        ("Road of Vanishing (Nameless Town)", 450001000, "Lv. 200+ | Lake of Oblivion & Erda flow"),
        ("Chu Chu Island (Chu Chu Village)", 450002000, "Lv. 210+ | Gourmet culinary island & hungry Muto"),
        ("Lachelein (Lachelein Main Street)", 450003000, "Lv. 220+ | Dreaming City, Night Market & Carnival"),
        ("Arcana (Grove of the Spirit Tree)", 450005000, "Lv. 225+ | Forest of harmonious spirits & floral songs"),
        ("Morass (Path to the Coral Forest)", 450006000, "Lv. 230+ | Swamp of memories & Trueffet city"),
        ("Esfera (Living Spring)", 450007000, "Lv. 235+ | Sea of origin & mirror-touched water"),
        ("Tenebris (Maple Alliance Outpost)", 450009000, "Lv. 245+ | Moonbridge invasion staging base"),
        ("Labyrinth of Suffering (Altar of Desire)", 450010000, "Lv. 250+ | Endless underground dark labyrinth"),
        ("Limina (World's Sorrow)", 450012000, "Lv. 255+ | Edge of the world & Black Mage citadel"),
    ]),
    ("Popular Training Fields (Lv. 15 - 200)", [
        ("Golem's Temple 4", 100040400, "Lv. 15 - 35 | Henesys Mixed Golems & easy spawn"),
        ("Silent Swamp (Copper Drakes)", 105010000, "Lv. 60 - 75 | Sleepywood Copper Drakes (Fast leveling)"),
        ("Stairway to the Sky II", 200010300, "Lv. 70 - 85 | Orbis Cellions, Lioners & Grupins"),
        ("Ice Valley I (White Fangs)", 211040100, "Lv. 80 - 90 | El Nath high-density icy valley"),
        ("Sahel 2 (Sand Moles)", 260020600, "Lv. 85 - 100 | Magatia horizontal flat hunting map"),
        ("Lab - Area C-2 [Personnel Only]", 261020401, "Lv. 95 - 110 | Magatia Roids & Neo Huroids"),
        ("Warped Path of Time 3 [Star Force]", 220060200, "Lv. 115 - 130 | Ludibrium Dual Ghost Pirates"),
        ("The Dragon Nest Left Behind 1 [Star Force]", 240040511, "Lv. 135 - 150 | Leafre Dark Wyverns"),
        ("Time Lane: Road to Oblivion 1", 270030100, "Lv. 150 - 165 | Temple of Time Chief Guardians"),
        ("Henesys Ruins Market", 271010100, "Lv. 165 - 175 | Corrupted future Mutant Slimes"),
        ("Knight Stronghold: Knight District 4", 271030400, "Lv. 175 - 185 | Advanced Knight A & B"),
        ("Scrapyard: Scrapyard Hill 4", 310070140, "Lv. 180 - 195 | Haven scrap robot factory"),
        ("Twilight Perion: Forsaken Excavation Site 2", 273040100, "Lv. 190 - 200 | Sinister masks #1 best 4th job exp"),
    ]),
    ("Popular Training Fields - Arcane River (Lv. 200 - 260)", [
        ("Cave of Repose: Forked Road 1", 450001210, "Lv. 200+ | Vanishing Journey Erda spirits"),
        ("Cave of Repose: Damp Falls", 450001250, "Lv. 200+ | Below the cave highest density"),
        ("Slurpy Forest: Slurpy Forest Depths", 450002010, "Lv. 210+ | Chu Chu Island #1 popular map"),
        ("Chu Chu Island: Muto's Descent", 450002200, "Lv. 210+ | Fast platform climbing spawn"),
        ("Lachelein: Chicken Festival 1", 450003300, "Lv. 220+ | Galinas & Roosters flat layout"),
        ("Lachelein: Revelation Place 3", 450003420, "Lv. 220+ | Ballroom dancing shoes & dresses"),
        ("Lachelein: Nightmare Clocktower 1F", 450003500, "Lv. 220+ | Multi-tier vertical clocktower"),
        ("Arcana: Cavern Lower Path", 450005430, "Lv. 225+ | Arcana #1 most farmed training field"),
        ("Arcana: Deepest Part of Cavern - Lower", 450005440, "Lv. 225+ | Deepest cavern high-level spirits"),
        ("Morass: Shadowdance Hall 2", 450006210, "Lv. 230+ | Blue & Red Shadows"),
        ("Morass: That Day in Trueffet 3", 450006420, "Lv. 230+ | Trueffet elite memory monsters"),
        ("Esfera: Mirror-touched Sea 2", 450007110, "Lv. 235+ | Sea spiders & swimming guardians"),
        ("Esfera: Radiant Temple 2", 450007210, "Lv. 240+ | Executioners & light spirits"),
        ("Moonbridge: Void Current 3", 450009330, "Lv. 245+ | Void flying entities & fast respawn"),
        ("Labyrinth: Deep Core 1", 450011600, "Lv. 250+ | Deepest core dark spectres"),
        ("Limina: End of the World 1-5", 450012340, "Lv. 255 - 260 | The ultimate late-game EXP field"),
    ]),
    ("Popular Training Fields - Grandis (Lv. 260 - 285+)", [
        ("Cernium: Royal Library Section 1", 410000700, "Lv. 260+ | Ancient knowledge guardians"),
        ("Cernium: Royal Library Section 3", 410000720, "Lv. 260+ | Flying book spirits"),
        ("Burning Cernium: Western Ramparts in Battle 3", 410000940, "Lv. 265+ | High Flora assault troops"),
        ("Burning Cernium: Eastern Ramparts in Battle 3", 410001000, "Lv. 265+ | High Flora commanders"),
        ("Hotel Arcus: Outlaw-Infested Wastes 2", 410003050, "Lv. 270+ | Desert outlaws & machine hounds"),
        ("Hotel Arcus: Train with No Destination 1", 410003150, "Lv. 270+ | Rusty train car interior"),
        ("Odium: Awakened Laboratory", 410007010, "Lv. 275+ | Predecessor ancient combat androids"),
        ("Shangri-La: Spring of Lost Vitality", 410008020, "Lv. 280+ | Four seasons immortal spirits"),
        ("Arteria: Top Deck Passage 4", 410007550, "Lv. 285+ | High Flora dreadnought battleship"),
        ("Carcion: Giant Coral Colony 1", 410007620, "Lv. 285+ | Corrupted deep sea coral creatures"),
        ("Tallahart: Fate-Fields of Providence 1", 410013640, "Lv. 290+ | Ancient divinity wasteland"),
    ]),
    ("Special Facilities & Utility Hubs", [
        ("Free Market Entrance", 910000000, "Player trading, trade stalls & merchant stores"),
        ("Ardentmill (Profession Town)", 910001000, "Alchemy, Blacksmithing, Accessory Crafting, Mining & Herbalism"),
        ("Monster Park", 951000000, "Daily 7-entry high-EXP dungeons & reward coins"),
        ("Mu Lung Dojo Hall", 925020001, "80-Floor Boss ranking challenge & Dojo gloves"),
        ("Event Hall", 820000000, "Seasonal event merchants, stamp exchange & trophies"),
    ])
]

def open_warp_service(sm, chr):
    sm.setSpeakerID(9010000)
    current_map_id = chr.getFieldID()
    
    total_locations = sum(len(locs) for _, locs in WARP_CATEGORIES)
    
    menu_text = "#fs14##e#b[Universal Warp & Fast Travel Center]#k#n\r\n"
    menu_text += "Where would you like to travel today, #h0#?\r\n"
    menu_text += "#dCurrent Location: Field ID " + str(current_map_id) + " (" + str(total_locations) + " total destinations)#k\r\n\r\n"
    
    for i, (cat_name, locations) in enumerate(WARP_CATEGORIES):
        menu_text += "#L" + str(i) + "##e#b" + cat_name + "#k#n (" + str(len(locations)) + " destinations)#l\r\n"
    menu_text += "#L99##dShow All Destinations Alphabetically (A - Z)#k#l\r\n"
    
    cat_sel = sm.sendNext(menu_text)
    
    selected_list = []
    category_title = ""
    if cat_sel == 99:
        category_title = "All Destinations (A - Z)"
        for _, locs in WARP_CATEGORIES:
            selected_list.extend(locs)
        selected_list.sort(key=lambda x: x[0])
    elif 0 <= cat_sel < len(WARP_CATEGORIES):
        category_title = WARP_CATEGORIES[cat_sel][0]
        selected_list = WARP_CATEGORIES[cat_sel][1]
    else:
        return
        
    if not selected_list:
        return
        
    dest_menu = "#fs14##e#b[" + category_title + "]#k#n\r\n"
    dest_menu += "#fs12#Select your destination:\r\n\r\n"
    for idx, (name, map_id, desc) in enumerate(selected_list):
        dest_menu += "#L" + str(idx) + "##e#b" + name + "#k#n - #fs11#" + desc + "#fs12##l\r\n"
        
    dest_sel = sm.sendNext(dest_menu)
    if 0 <= dest_sel < len(selected_list):
        dest_name, dest_map, _ = selected_list[dest_sel]
        if chr.getFieldID() == dest_map:
            sm.sendSayOkay("#fs13#You are already at #b" + dest_name + "#k (Field ID: " + str(dest_map) + ").")
        else:
            sm.setReturnField(chr.getFieldID())
            sm.warp(dest_map, 0)
