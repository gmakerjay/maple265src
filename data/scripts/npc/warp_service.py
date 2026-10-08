# Universal Town & Field Warp Service
# Fast Travel system for Major Towns, Arcane River, Grandis, and Popular Training Fields
# 100% Pure ASCII for Jython 2.7 compatibility

WARP_CATEGORIES = [
    ("Major Towns (Victoria Island & Maple Continents)", [
        ("Henesys", 100000000, "Archer town & main social hub"),
        ("Ellinia", 101000000, "Magician treetop city"),
        ("Perion", 102000000, "Warrior rocky highlands"),
        ("Kerning City", 103000000, "Thief modern metropolis"),
        ("Lith Harbor", 104000000, "Beginning port of Victoria Island"),
        ("Sleepywood", 105000000, "Deep ancient forest & temple"),
        ("Nautilus Harbor", 120000000, "Pirate submarine battleship"),
        ("Orbis", 200000000, "Floating cloud city in the sky"),
        ("El Nath", 211000000, "Snowy mountain village"),
        ("Ludibrium", 220000000, "Clockwork toy kingdom"),
        ("Omega Sector", 221000000, "Silo alien defense base"),
        ("Korean Folk Town", 222000000, "Traditional storybook village"),
        ("Aquarium", 230000000, "Undersea kingdom of Aqua Road"),
        ("Leafre", 240000000, "Dragon realm & Halfling village"),
        ("Mu Lung", 250000000, "Martial arts panda mountain"),
        ("Herb Town", 251000000, "Pirate hideout & medicine marshes"),
        ("Ariant", 260000000, "Nihal desert sultan palace"),
        ("Magatia", 261000000, "City of alchemy (Zenumist & Alcadno)"),
        ("Edelstein", 310000000, "Resistance mechanical metropolis"),
        ("Rien", 140000000, "Snow Island of Aran & Lilin"),
        ("Ereve", 130000000, "Empress Cygnus floating sanctuary"),
        ("Pantheon", 400000000, "Nova sanctuary in Grandis"),
        ("Savage Terminal", 402000000, "Brigand's Row wasteland"),
    ]),
    ("Arcane River Towns & Continents (Lv. 200+)", [
        ("Road of Vanishing (Nameless Town)", 450001000, "Lv. 200+ | Lake of Oblivion & Erda flow"),
        ("Chu Chu Island (Chu Chu Village)", 450002000, "Lv. 210+ | Gourmet food & Slurpy Forest"),
        ("Lachelein (Main Street)", 450003000, "Lv. 220+ | The Dreaming City & Carnival"),
        ("Arcana (Grove of the Spirit Tree)", 450005000, "Lv. 225+ | Forest of spirits & harmony"),
        ("Morass (Coral Forest Path)", 450006000, "Lv. 230+ | Swamp of memory & Trueffet"),
        ("Esfera (Living Spring)", 450007000, "Lv. 235+ | Origin sea & mirror-touched water"),
        ("Tenebris (Maple Alliance Outpost)", 450009000, "Lv. 245+ | Moonbridge, Labyrinth & Limina base"),
    ]),
    ("Grandis Sacred Continents & Cities (Lv. 260+)", [
        ("Cernium (Palace Main Hall)", 410002000, "Lv. 260+ | City of God & Holy Sword"),
        ("Burning Cernium (City Ramparts)", 410001000, "Lv. 260+ | High Flora war battlefield"),
        ("Hotel Arcus (Saloon)", 410003000, "Lv. 265+ | Wasteland rusty railroad hotel"),
        ("Karote (Karote Summit)", 410006000, "Lv. 265+ | Tower of the Gods & Kalos gate"),
        ("Odium (Residential District)", 410007000, "Lv. 270+ | Laboratory of the Predecessors"),
        ("Shangri-La (Invasion Front)", 410008000, "Lv. 275+ | Four seasons paradise & Kaling"),
        ("Vulpes (Fox Point Village)", 410000000, "Lv. 200+ | Anima Fox sacred homeland"),
    ]),
    ("Popular Training & Leveling Fields", [
        ("Golem's Temple 4", 100040400, "Lv. 15 - 30 | Henesys Stone Golems"),
        ("Silent Swamp (Drakes)", 105010000, "Lv. 60 - 75 | Sleepywood Copper Drakes"),
        ("Stairway to the Sky II", 200010300, "Lv. 70 - 85 | Orbis Cellions & Grupins"),
        ("Ice Valley I", 211040100, "Lv. 80 - 90 | El Nath White Fangs"),
        ("Sahel 2", 260020600, "Lv. 90 - 105 | Magatia Sand Moles & Scorpions"),
        ("Warped Path of Time 3 [Star Force]", 220060200, "Lv. 115 - 130 | Ludibrium Dual Ghost Pirates"),
        ("Dragon Nest Left Behind [Star Force]", 240040511, "Lv. 135 - 150 | Leafre Dark Wyverns"),
        ("Kerning Tower (Ground Floor)", 103041000, "Lv. 145 - 165 | Shopping mall & studios"),
        ("Henesys Ruins (Future)", 271010000, "Lv. 165 - 180 | Corrupted Cygnus territory"),
        ("Twilight Perion (Deserted Ridge)", 273010000, "Lv. 180 - 195 | Deserted rocky highland"),
        ("Forsaken Excavation Site 1", 273040000, "Lv. 190 - 200 | Sinister masks best 4th job exp"),
        ("Forked Road 1 (Cave of Repose)", 450001210, "Lv. 200+ | Road of Vanishing Erda"),
        ("Muto's Descent (Chu Chu)", 450002201, "Lv. 210+ | Chu Chu Island fast spawn"),
    ]),
    ("Special Facilities & Hubs", [
        ("Ardentmill", 910001000, "Crafting, Mining & Herbalism profession town"),
        ("Mu Lung Dojo Entrance", 925020001, "80-Floor Boss ranking challenge"),
        ("Monster Park", 951000000, "Daily EXP & coin training dungeons"),
        ("Free Market", 910000000, "Trade hub & player shops"),
        ("Event Hall", 820000000, "Event NPCs & special exchange stations"),
    ])
]

def open_warp_service(sm, chr):
    sm.setSpeakerID(9010000)
    current_map_id = chr.getFieldID()
    
    menu_text = "#fs14##e#b[Universal Warp Service & Fast Travel]#k#n\r\n"
    menu_text += "Where would you like to travel today, #h0#?\r\n\r\n"
    menu_text += "#dCurrent Location: Field ID " + str(current_map_id) + "#k\r\n\r\n"
    
    for i, (cat_name, locations) in enumerate(WARP_CATEGORIES):
        menu_text += "#L" + str(i) + "##e#b" + cat_name + "#k#n (" + str(len(locations)) + " destinations)#l\r\n"
    menu_text += "#L99##dShow All Destinations (A-Z)#k#l\r\n"
    
    cat_sel = sm.sendNext(menu_text)
    
    selected_list = []
    if cat_sel == 99:
        for _, locs in WARP_CATEGORIES:
            selected_list.extend(locs)
        selected_list.sort(key=lambda x: x[0])
    elif 0 <= cat_sel < len(WARP_CATEGORIES):
        selected_list = WARP_CATEGORIES[cat_sel][1]
    else:
        return
        
    if not selected_list:
        return
        
    dest_menu = "#fs13#Select your destination:\r\n\r\n"
    for idx, (name, map_id, desc) in enumerate(selected_list):
        dest_menu += "#L" + str(idx) + "##e#b" + name + "#k#n - #fs11#" + desc + "#fs13##l\r\n"
        
    dest_sel = sm.sendNext(dest_menu)
    if 0 <= dest_sel < len(selected_list):
        dest_name, dest_map, _ = selected_list[dest_sel]
        if chr.getFieldID() == dest_map:
            sm.sendSayOkay("You are already at #b" + dest_name + "#k.")
        else:
            sm.setReturnField(chr.getFieldID())
            sm.warp(dest_map, 0)
