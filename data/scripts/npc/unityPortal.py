# Dimensional Mirror / Fast Travel Menu
# Speaker ID: 9010022 (Dimensional Mirror)

MIRROR_NPC = 9010022
sm.setSpeakerID(MIRROR_NPC)

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

menu_text = "#fs13#Where would you like to travel via the #bDimensional Mirror#k?\r\n\r\n"
menu_text += "#L50##e#r[Offline Boss Arena]#k#n Instant Boss Battles (Solo / No Limits)#l\r\n"
for i, (cat_name, items) in enumerate(CATEGORIES):
    menu_text += "#L" + str(i) + "##b" + cat_name + "#k (" + str(len(items)) + " locations)#l\r\n"
menu_text += "#L99##dShow All Destinations (A-Z)#k#l\r\n"

cat_sel = sm.sendNext(menu_text)

if cat_sel == 50:
    import sys
    for p in ["data/scripts/npc", "data/scripts"]:
        if p not in sys.path:
            sys.path.append(p)
    if 'boss_arena' in sys.modules:
        reload(sys.modules['boss_arena'])
        import boss_arena
    else:
        import boss_arena
    boss_arena.open_boss_arena(sm, chr)
    selected_list = []
elif cat_sel == 99:
    # Combine all
    selected_list = []
    for _, items in CATEGORIES:
        selected_list.extend(items)
    selected_list.sort(key=lambda x: x[0])
elif 0 <= cat_sel < len(CATEGORIES):
    selected_list = CATEGORIES[cat_sel][1]
else:
    selected_list = []

if selected_list:
    dest_text = "#fs13#Select your destination:\r\n\r\n"
    for idx, (name, map_id, desc) in enumerate(selected_list):
        dest_text += "#L" + str(idx) + "##e#b" + name + "#k#n - #fs11#" + desc + "#fs13##l\r\n"
    
    dest_sel = sm.sendNext(dest_text)
    if 0 <= dest_sel < len(selected_list):
        dest_name, dest_map, _ = selected_list[dest_sel]
        if chr.getFieldID() != dest_map:
            sm.setReturnField(chr.getFieldID())
            sm.warp(dest_map)
        else:
            sm.sendSayOkay("You are already at #b" + dest_name + "#k.")