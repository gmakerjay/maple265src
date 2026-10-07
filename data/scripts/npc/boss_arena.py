# -*- coding: utf-8 -*-
# Offline Boss Arena (Universal Boss Dispatcher)
# Supports Solo & Party, Unlimited Attempts, 0 Prequests, Real Boss Spawns & Real HP
from net.swordie.ms.world.boss import Zakum
from net.swordie.ms.world.boss import Horntail
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
        ("Easy Horntail", 240060002, "horntail", 0, "Lv. 130+ | 3-Headed Dragon (Easy)"),
        ("Normal Horntail", 240060200, "horntail", 1, "Lv. 130+ | 3-Headed Dragon (Normal)"),
        ("Chaos Horntail", 240060201, "horntail", 2, "Lv. 135+ | 3-Headed Dragon (Chaos)"),
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
        ("Normal Von Bon", 105200200, "root_abyss", "banbanNormal", "Lv. 125+ | Clockwork Rooster (315M HP)"),
        ("Chaos Von Bon", 105200600, "root_abyss", "banbanChaos", "Lv. 180+ | Dimensional Rift & Quake (100B HP)"),
        ("Normal Crimson Queen", 105200300, "root_abyss", "queenNormal", "Lv. 125+ | 4 Facial Expressions (315M HP)"),
        ("Chaos Crimson Queen", 105200700, "root_abyss", "queenChaos", "Lv. 180+ | Seduction & Mirror (140B HP)"),
        ("Normal Vellum", 105200400, "root_abyss", "bellumNormal", "Lv. 125+ | Abyssal Earth Dragon (550M HP)"),
        ("Chaos Vellum", 105200800, "root_abyss", "bellumChaos", "Lv. 180+ | Falling Stalactites & Dive (200B HP)"),
    ]),
    ("Arcane River & Mid-Tier Bosses", [
        ("Easy Magnus", 401060300, "magnus", 0, "Lv. 115+ | Blue Zone & Meteors (400M HP)"),
        ("Normal Magnus", 401060200, "magnus", 1, "Lv. 155+ | Blue Zone & Meteors (6B HP)"),
        ("Hard Magnus", 401060100, "magnus", 2, "Lv. 175+ | Tyrant of Heliseum (120B HP)"),
        ("Easy Papulatus", 220080001, "papulatus", 0, "Lv. 115+ | Clockwork Guardian (400M HP)"),
        ("Normal Papulatus", 220080001, "papulatus", 1, "Lv. 155+ | Clockwork Guardian (16.6B HP)"),
        ("Chaos Papulatus", 220080001, "papulatus", 2, "Lv. 190+ | Clock Laser & Curse (500B HP)"),
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
        ("Princess No", 811000008, "mob_hp", (9450022, 200000000000L, 0, 85), "Lv. 180+ | Oda Princess (200B HP)"),
        ("Gollux Head", 863010600, "gollux", 0, "Lv. 180+ | Corrupted Titan Head"),
    ]),
    ("Endgame & Tenebris Bosses", [
        ("Black Mage (4 Phases)", 450013100, "black_mage", 0, "Lv. 255+ | 4-Phase Story Dungeon (465T HP)"),
        ("Normal Gloom", 450009301, "mob_hp", (8644650, 26000000000000L, 0, 85), "Lv. 245+ | Giant Monster of Limina (26T HP)"),
        ("Chaos Gloom", 450009301, "mob_hp", (8644655, 115000000000000L, 0, 85), "Lv. 255+ | Giant Monster of Limina (115T HP)"),
        ("Normal Darknell", 450012200, "mob_hp", (8645009, 26000000000000L, 0, 85), "Lv. 255+ | Guard Captain Darknell (26T HP)"),
        ("Hard Darknell", 450012200, "mob_hp", (8645066, 130000000000000L, 0, 85), "Lv. 265+ | Guard Captain Darknell (130T HP)"),
        ("Normal Verus Hilla", 450011990, "mob_hp", (8880405, 88000000000000L, 0, 85), "Lv. 250+ | True Hilla (88T HP)"),
        ("Hard Verus Hilla", 450011990, "mob_hp", (8880410, 176000000000000L, 0, 85), "Lv. 255+ | True Hilla (176T HP)"),
    ]),
    ("Grandis & Special Bosses", [
        ("Akechi Mitsuhide (2 Phases)", 874004000, "akechi", 0, "Lv. 210+ | 2 Phases: Katana & Demon Aura (800B HP)"),
        ("Normal Guardian Angel Slime", 160080000, "mob_hp", (8880700, 5000000000000L, 0, 208), "Lv. 210+ | Ramuramu Altar (5T HP)"),
        ("Chaos Guardian Angel Slime", 160080000, "mob_hp", (8880711, 115000000000000L, 0, 208), "Lv. 220+ | Ramuramu Altar (115T HP)"),
        ("Normal Chosen Seren", 410030000, "mob_hp", (8880600, 126000000000000L, 0, 125), "Lv. 260+ | Cernium Palace Main Hall (126T HP)"),
        ("Hard Chosen Seren", 410030000, "mob_hp", (8880602, 250000000000000L, 0, 125), "Lv. 265+ | Cernium Palace Main Hall (250T HP)"),
        ("Extreme Chosen Seren", 410030000, "mob_hp", (8880604, 600000000000000L, 0, 125), "Lv. 275+ | Cernium Palace Main Hall (600T HP)"),
        ("Easy Kalos the Guardian", 410030400, "mob_hp", (8881010, 100000000000000L, 0, 252), "Lv. 265+ | Karote Castle Wall (100T HP)"),
        ("Normal Kalos the Guardian", 410030400, "mob_hp", (8880800, 200000000000000L, 0, 252), "Lv. 265+ | Karote Castle Wall (200T HP)"),
        ("Chaos Kalos the Guardian", 410030400, "mob_hp", (8881030, 300000000000000L, 0, 252), "Lv. 275+ | Karote Castle Wall (300T HP)"),
        ("Extreme Kalos the Guardian", 410030400, "mob_hp", (8881050, 650000000000000L, 0, 252), "Lv. 280+ | Karote Castle Wall (650T HP)"),
        ("Normal Kaling", 410030800, "kaling", 0, "Lv. 275+ | Shangri-La Four Seasons Pavilion (180T HP)"),
        ("Normal Limbo", 410031100, "mob_hp", (8881304, 200000000000000L, 0, -39), "Lv. 285+ | Carcion Temple of Tears (200T HP)"),
        ("Hard Limbo", 410031100, "mob_hp", (8881354, 450000000000000L, 0, -39), "Lv. 285+ | Carcion Temple of Tears (450T HP)"),
    ])
]

def open_boss_arena(sm, chr):
    sm.setSpeakerID(9010000)
    menu_text = "#fs13##e#r[Offline Boss Arena]#k#n\r\n"
    menu_text += "ยินดีต้อนรับ #h0#! ท้าทายบอสได้ทุกตัว #rลงเดี่ยวหรือปาร์ตี้ก็ได้#k\r\n"
    menu_text += "#bไม่จำกัดรอบ | ไม่มีเควสเงื่อนไข | 15 Death Count#k\r\n\r\n"
    
    for i, (cat_name, bosses) in enumerate(BOSS_CATEGORIES):
        menu_text += "#L" + str(i) + "##e#b" + cat_name + "#k#n (" + str(len(bosses)) + " bosses)#l\r\n"
    menu_text += "#L99##dShow All Bosses (A-Z)#k#l\r\n"
    menu_text += "#L999##r🚪 ออกจากห้องบอส (กลับเมือง Henesys)#k#l\r\n"
    
    cat_sel = sm.sendNext(menu_text)
    if cat_sel == 999:
        if chr.getInstance() is not None:
            sm.warpInstanceOut(chr, 100000000)
        else:
            sm.warp(100000000, 0)
        return
    
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
        
    boss_menu = "#fs13#เลือกบอสที่คุณต้องการต่อสู้:\r\n\r\n"
    for idx, (b_name, map_id, spawn_type, spawn_val, desc) in enumerate(selected_bosses):
        boss_menu += "#L" + str(idx) + "##e#r" + b_name + "#k#n - #fs11#" + desc + "#fs13##l\r\n"
        
    boss_sel = sm.sendNext(boss_menu)
    if 0 <= boss_sel < len(selected_bosses):
        b_name, map_id, spawn_type, spawn_val, desc = selected_bosses[boss_sel]
        confirm_text = "#fs13#ต้องการเข้าสู่ห้องบอส #e#r" + b_name + "#k#n หรือไม่?\r\n\r\n"
        confirm_text += "#b- ระยะเวลา:#k 30 นาที\r\n"
        confirm_text += "#b- จำนวนการตาย (Death Count):#k 15 ครั้ง\r\n"
        confirm_text += "#b- โหมด:#k " + ("ปาร์ตี้ (Party Instance)" if chr.getParty() is not None else "ลงเดี่ยว (Solo Instance)") + "\r\n"
        
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
    elif "Papulatus" in boss_name:
        if not chr.hasItem(4031172):
            chr.addItemToInventory(4031172, 5) # Piece of Cracked Dimension
            
    # Warp into Instance (Solo or Party)
    sm.warpInstanceIn(chr, map_id, True)
    sm.setInstanceTime(30 * 60, 100000000) # 30 mins, returns to Henesys
    sm.setDeathCount(15)
    field = chr.getField()
    
    # Spawn handling based on boss type
    if spawn_type == "zakum":
        # spawn_val is mode: 1 (Easy), 2 (Normal), 3 (Chaos)
        Zakum.spawn(spawn_val, field)
    elif spawn_type == "horntail":
        # spawn_val: 0 (Easy), 1 (Normal), 2 (Chaos)
        Horntail.spawn(spawn_val, field)
    elif spawn_type == "mob":
        field.spawnMob(spawn_val, 0, 85, False)
    elif spawn_type == "mob_hp":
        # (mobId, hp, x, y)
        mid, hp, x, y = spawn_val
        field.spawnMob(mid, x, y, False, hp)
    elif spawn_type == "papulatus":
        # Papulatus 8500002 / 8500012 / 8500022
        hp = 400000000L if spawn_val == 0 else (16600000000L if spawn_val == 1 else 500000000000L)
        mid = 8500002 if spawn_val == 0 else (8500012 if spawn_val == 1 else 8500022)
        field.spawnMob(mid, 0, 85, False, hp)
    elif spawn_type == "hilla":
        field.spawnMob(spawn_val, 0, -181, False)
    elif spawn_type == "root_abyss":
        RootAbyss.spawn(chr, spawn_val)
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
    elif spawn_type == "kaling":
        field.spawnMob(8880837, 0, -13, False, 180000000000000L) # Kaling (Shangri-La Four Seasons Pavilion)
    elif spawn_type == "black_mage":
        field.spawnMob(8880500, -600, 85, False, 32500000000000L) # Aeonian Rise
        field.spawnMob(8880501, 600, 85, False, 32500000000000L)  # Tanadian Ruin
    elif spawn_type == "akechi":
        field.spawnMob(9601622, 0, 264, False, 400000000000L)     # Akechi Mitsuhide (Phase 1)

