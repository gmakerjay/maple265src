# -*- coding: utf-8 -*-
# Offline Boss Arena (Universal Boss Dispatcher)
# Supports Solo & Party, Unlimited Attempts, 0 Prequests, Real Boss Spawns
from net.swordie.ms.world.boss import Zakum
from net.swordie.ms.world.boss import RootAbyss
from net.swordie.ms.world.boss import Magnus
from net.swordie.ms.world.boss import Lotus
from net.swordie.ms.world.boss import Damien
from net.swordie.ms.world.boss import Lucid
from net.swordie.ms.world.boss import Will
from net.swordie.ms.world.boss import Cygnus
from net.swordie.ms.world.boss import PinkBean
from net.swordie.ms.world.boss import Arkarium
from net.swordie.ms.world.boss import VonLeon
from net.swordie.ms.world.boss import Ranmaru
from net.swordie.ms.world.boss import Gollux

BOSS_CATEGORIES = [
    ("Classic & Early Bosses", [
        ("Easy Zakum", 280030200, "zakum", 1, "Lv. 50+ | 8 Arms, 2.2M HP"),
        ("Normal Zakum", 280030100, "zakum", 2, "Lv. 90+ | 8 Arms, 7M HP"),
        ("Chaos Zakum", 280030000, "zakum", 3, "Lv. 90+ | Chaos 8 Arms, 84B HP"),
        ("Easy Horntail", 240060200, "horntail", 8810214, "Lv. 130+ | 3-Headed Dragon (Easy)"),
        ("Normal Horntail", 240060200, "horntail", 8810018, "Lv. 130+ | 3-Headed Dragon (Normal)"),
        ("Chaos Horntail", 240060201, "horntail", 8810122, "Lv. 135+ | 3-Headed Dragon (Chaos)"),
        ("Normal Hilla", 262030300, "hilla", 8870000, "Lv. 120+ | Necromancer Hilla (500M HP)"),
        ("Hard Hilla", 262031300, "hilla", 8870100, "Lv. 170+ | Dark Hilla (16.8B HP)"),
        ("Easy Von Leon", 211070104, "von_leon", 0, "Lv. 125+ | Lion King (Easy)"),
        ("Normal Von Leon", 211070102, "von_leon", 1, "Lv. 125+ | Lion King (Normal)"),
        ("Hard Von Leon", 211070100, "von_leon", 2, "Lv. 125+ | Lion King (Hard)"),
        ("Easy Arkarium", 272020200, "arkarium", 8860005, "Lv. 140+ | Arkarium (Easy, 12.6B HP)"),
        ("Normal Arkarium", 272020210, "arkarium", 8860000, "Lv. 140+ | Arkarium (Normal, 25.2B HP)"),
        ("Normal Pink Bean", 270050100, "pink_bean", 0, "Lv. 140+ | 5 Statues + Pink Bean (2.1B HP)"),
        ("Chaos Pink Bean", 270051100, "pink_bean", 1, "Lv. 170+ | Chaos Statues + Pink Bean (54B HP)"),
        ("Easy Cygnus", 271041100, "cygnus", 0, "Lv. 140+ | Corrupted Empress (10.5B HP)"),
        ("Normal Cygnus", 271040100, "cygnus", 1, "Lv. 165+ | Corrupted Empress (63B HP)"),
    ]),
    ("Root Abyss (4 Guardians)", [
        ("Normal Pierre", 105200100, "pierre", 0, "Lv. 125+ | Clown with Hat split (315M HP)"),
        ("Chaos Pierre", 105200500, "pierre", 1, "Lv. 180+ | Chaos Hat Trick & Clones (80B HP)"),
        ("Normal Von Bon", 105200200, "mob", 8910100, "Lv. 125+ | Clockwork Rooster (315M HP)"),
        ("Chaos Von Bon", 105200600, "mob", 8910000, "Lv. 180+ | Dimensional Rift & Quake (100B HP)"),
        ("Normal Crimson Queen", 105200300, "mob", 8920100, "Lv. 125+ | 4 Facial Expressions (315M HP)"),
        ("Chaos Crimson Queen", 105200700, "mob", 8920000, "Lv. 180+ | Seduction & Mirror (140B HP)"),
        ("Normal Vellum", 105200400, "mob", 8930100, "Lv. 125+ | Abyssal Earth Dragon (550M HP)"),
        ("Chaos Vellum", 105200800, "mob", 8930000, "Lv. 180+ | Falling Stalactites & Dive (200B HP)"),
    ]),
    ("Arcane River & Mid-Tier Bosses", [
        ("Easy Magnus", 401060300, "magnus", 0, "Lv. 115+ | Blue Zone & Meteors (400M HP)"),
        ("Normal Magnus", 401060200, "magnus", 1, "Lv. 155+ | Blue Zone & Meteors (6B HP)"),
        ("Hard Magnus", 401060100, "magnus", 2, "Lv. 175+ | Tyrant of Heliseum (120B HP)"),
        ("Easy Papulatus", 220080001, "mob", 8500002, "Lv. 115+ | Clockwork Guardian (400M HP)"),
        ("Normal Papulatus", 220080001, "mob", 8500012, "Lv. 155+ | Clockwork Guardian (12B HP)"),
        ("Chaos Papulatus", 220080001, "mob", 8500022, "Lv. 190+ | Clock Laser & Curse (500B HP)"),
        ("Normal Lotus (Suu)", 350060400, "lotus", 0, "Lv. 190+ | 3 Phases, Laser, Debris (1.5T HP)"),
        ("Hard Lotus (Suu)", 350060700, "lotus", 1, "Lv. 210+ | 3 Phases, Laser, Debris (33T HP)"),
        ("Normal Damien (Demian)", 350160200, "damien", 0, "Lv. 190+ | 2 Phases, Flying Sword (1.2T HP)"),
        ("Hard Damien (Demian)", 350160100, "damien", 1, "Lv. 210+ | 2 Phases, Flying Sword (36T HP)"),
        ("Easy Lucid", 450004150, "lucid", 0, "Lv. 220+ | Dream Manipulator (12T HP)"),
        ("Normal Lucid", 450004150, "lucid", 1, "Lv. 220+ | 3 Phases, Golem, Dragon (24T HP)"),
        ("Hard Lucid", 450004150, "lucid", 2, "Lv. 220+ | 45s DPS Check Phase 3 (120T HP)"),
        ("Normal Will", 450008750, "will", 0, "Lv. 235+ | 3 Phases, Moonlight Gauge (25T HP)"),
        ("Hard Will", 450008150, "will", 1, "Lv. 235+ | 3 Phases, Moonlight Gauge (126T HP)"),
        ("Normal Ranmaru", 807300110, "ranmaru", 0, "Lv. 120+ | Mori Ranmaru (5B HP)"),
        ("Hard Ranmaru", 807300210, "ranmaru", 1, "Lv. 180+ | Mori Ranmaru (50B HP)"),
        ("Princess No", 811000008, "mob", 9450022, "Lv. 180+ | Oda Princess (200B HP)"),
        ("Gollux Head", 863010600, "gollux", 0, "Lv. 180+ | Corrupted Titan Head"),
    ]),
    ("Endgame & Tenebris Bosses", [
        ("Black Mage", 450013100, "black_mage", 0, "Lv. 255+ | 4-Phase Story Dungeon (465T HP)"),
        ("Normal Gloom", 450009301, "mob", 8644650, "Lv. 245+ | Giant Monster of Limina (26T HP)"),
        ("Chaos Gloom", 450009301, "mob", 8644655, "Lv. 255+ | Giant Monster of Limina (115T HP)"),
        ("Normal Darknell", 450012200, "mob", 8645009, "Lv. 255+ | Guard Captain Darknell (26T HP)"),
        ("Hard Darknell", 450012200, "mob", 8645066, "Lv. 265+ | Guard Captain Darknell (130T HP)"),
        ("Normal Verus Hilla", 450011990, "mob", 8880405, "Lv. 250+ | True Hilla (88T HP)"),
        ("Hard Verus Hilla", 450011990, "mob", 8880410, "Lv. 255+ | True Hilla (176T HP)"),
    ]),
    ("Grandis & Special Bosses", [
        ("Akechi Mitsuhide", 874004000, "akechi", 0, "Lv. 210+ | 2 Phases: Katana & Demon Aura (800B HP)"),
        ("Normal Guardian Angel Slime", 160080000, "mob", 8880700, "Lv. 210+ | Ramuramu Altar (5T HP)"),
        ("Chaos Guardian Angel Slime", 160080100, "mob", 8880711, "Lv. 220+ | Ramuramu Altar (115T HP)"),
        ("Normal Chosen Seren", 410000670, "mob", 8880600, "Lv. 260+ | Cernium Sun Guardian (130T HP)"),
        ("Hard Chosen Seren", 410000670, "mob", 8880630, "Lv. 265+ | Cernium Sun Guardian (250T HP)"),
        ("Kalos the Guardian", 410005000, "mob", 8880802, "Lv. 265+ | Odium Fortress Sentinel (300T HP)"),
        ("Kaling", 410007100, "mob", 8880845, "Lv. 275+ | Shangri-La Master (500T HP)"),
    ])
]

def open_boss_arena(sm, chr):
    sm.setSpeakerID(9010000)
    menu_text = "#fs13##e#r[Offline Boss Arena]#k#n\r\n"
    menu_text += "Welcome, #h0#! Challenge any boss #rSolo or with Party#k.\r\n"
    menu_text += "#bNo Prequests | Unlimited Attempts | 15 Death Count#k\r\n\r\n"
    
    for i, (cat_name, bosses) in enumerate(BOSS_CATEGORIES):
        menu_text += "#L" + str(i) + "##e#b" + cat_name + "#k#n (" + str(len(bosses)) + " bosses)#l\r\n"
    menu_text += "#L99##dShow All Bosses (A-Z)#k#l\r\n"
    
    cat_sel = sm.sendNext(menu_text)
    
    selected_bosses = []
    if cat_sel == 99:
        for _, bosses in BOSS_CATEGORIES:
            selected_bosses.extend(bosses)
        selected_bosses.sort(key=lambda x: x[0])
    elif 0 <= cat_sel < len(BOSS_CATEGORIES):
        selected_bosses = BOSS_CATEGORIES[cat_sel][1]
    else:
        return
        
    if not selected_bosses:
        return
        
    boss_menu = "#fs13#Select the boss you want to battle:\r\n\r\n"
    for idx, (b_name, map_id, spawn_type, spawn_val, desc) in enumerate(selected_bosses):
        boss_menu += "#L" + str(idx) + "##e#r" + b_name + "#k#n - #fs11#" + desc + "#fs13##l\r\n"
        
    boss_sel = sm.sendNext(boss_menu)
    if 0 <= boss_sel < len(selected_bosses):
        b_name, map_id, spawn_type, spawn_val, desc = selected_bosses[boss_sel]
        confirm_text = "#fs13#Enter arena for #e#r" + b_name + "#k#n?\r\n\r\n"
        confirm_text += "#b- Time Limit:#k 30 Minutes\r\n"
        confirm_text += "#b- Death Count:#k 15 Resurrections\r\n"
        confirm_text += "#b- Mode:#k " + ("Party Instance" if chr.getParty() is not None else "Solo Instance") + "\r\n"
        
        if sm.sendAskYesNo(confirm_text):
            enter_boss_arena(sm, chr, b_name, map_id, spawn_type, spawn_val)

def enter_boss_arena(sm, chr, boss_name, map_id, spawn_type, spawn_val):
    # Reset cooldowns & clean debuffs
    for skillID in list(chr.getSkillCoolTimes().keySet()):
        chr.addSkillCoolTime(skillID, 0)
    chr.getTemporaryStatManager().removeAllDebuffs()
    
    # Give summon item for altar bosses if required
    if "Zakum" in boss_name:
        if not chr.hasItem(4001017):
            chr.addItemToInventory(4001017, 5) # Eye of Fire
        if not chr.hasItem(4001796):
            chr.addItemToInventory(4001796, 5) # Eye of Fire chunk
    elif "Pink Bean" in boss_name:
        if not chr.hasItem(4001431):
            chr.addItemToInventory(4001431, 1) # Chaos marble
        if not chr.hasItem(4001432):
            chr.addItemToInventory(4001432, 1)
            
    # Warp into Instance (Solo or Party)
    sm.warpInstanceIn(chr, map_id, True)
    sm.setInstanceTime(30 * 60, 100000000) # 30 mins, returns to Henesys
    sm.setDeathCount(15)
    
    # Spawn handling based on boss type
    if spawn_type == "zakum":
        # spawn_val is mode: 1 (Easy), 2 (Normal), 3 (Chaos)
        field = chr.getField()
        Zakum.spawn(spawn_val, field)
    elif spawn_type == "mob":
        # Direct mob spawn
        field = chr.getField()
        field.spawnMob(spawn_val, 0, 85, False)
    elif spawn_type == "horntail":
        field = chr.getField()
        field.spawnMob(spawn_val, 868, 230, False)
    elif spawn_type == "hilla":
        field = chr.getField()
        field.spawnMob(spawn_val, 0, -181, False)
    elif spawn_type == "pierre":
        RootAbyss.spawnPierre(chr, RootAbyss.PierreMode.NORMAL if spawn_val == 0 else RootAbyss.PierreMode.CHAOS)
    elif spawn_type == "magnus":
        mode = Magnus.MagnusMode.EASY if spawn_val == 0 else (Magnus.MagnusMode.NORMAL if spawn_val == 1 else Magnus.MagnusMode.HARD)
        Magnus.spawn(chr, mode)
    elif spawn_type == "lotus":
        mode = Lotus.LotusMode.NORMAL if spawn_val == 0 else Lotus.LotusMode.HARD
        Lotus.spawn(chr, Lotus.LotusPhase.FIRST, mode)
    elif spawn_type == "damien":
        Damien.spawn(chr, Damien.DamienPhase.FIRST)
    elif spawn_type == "lucid":
        chr.setLucidMode(spawn_val)
        Lucid.spawn(chr, Lucid.LucidPhase.FIRST)
    elif spawn_type == "will":
        Will.spawn(1, chr)
    elif spawn_type == "cygnus":
        mode = Cygnus.CygnusMode.EASY if spawn_val == 0 else Cygnus.CygnusMode.NORMAL
        Cygnus.spawn(chr, mode)
    elif spawn_type == "pink_bean":
        PinkBean.spawn(chr)
    elif spawn_type == "arkarium":
        Arkarium.spawn(chr)
    elif spawn_type == "von_leon":
        VonLeon.spawn(chr)
    elif spawn_type == "ranmaru":
        mode = Ranmaru.RanmaruMode.NORMAL if spawn_val == 0 else Ranmaru.RanmaruMode.HARD
        Ranmaru.spawn(chr, mode)
    elif spawn_type == "gollux":
        Gollux.init(chr, 0)
