# ==============================================================================
# Offline Boss Arena & Universal Boss Dispatcher
# Supports Solo & Party, Unlimited Attempts, 0 Prequests, Real Boss Spawns & Real HP
# Integrated with Scaled Meso Entry Fee (Heavy Money Sink) & Visible Boss HP Bar
# Covers all bosses up to Kaling Extreme (and Limbo / Baldrix)
# ==============================================================================
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
from net.swordie.ms.connection.packet import FieldPacket
from net.swordie.ms.world.field.fieldeffect import FieldEffect

def format_meso(amount):
    if amount >= 1000000000:
        b_val = amount / 1000000000.0
        if b_val == int(b_val):
            return "{:,} Mesos ({}B)".format(amount, int(b_val))
        return "{:,} Mesos ({:.1f}B)".format(amount, b_val)
    elif amount >= 1000000:
        m_val = amount / 1000000.0
        if m_val == int(m_val):
            return "{:,} Mesos ({}M)".format(amount, int(m_val))
        return "{:,} Mesos ({:.1f}M)".format(amount, m_val)
    else:
        return "{:,} Mesos".format(amount)

# Structure: (boss_name, map_id, spawn_type, spawn_val, meso_fee, description)
BOSS_CATEGORIES = [
    ("Classic & Early Bosses", [
        ("Easy Zakum", 280030200, "zakum", 1, 2000000, "Lv. 50+ | 8 Arms, 2.2M HP"),
        ("Normal Zakum", 280030100, "zakum", 2, 5000000, "Lv. 90+ | 8 Arms, 7M HP"),
        ("Chaos Zakum", 280030000, "zakum", 3, 30000000, "Lv. 100+ | Chaos 8 Arms & Slams, 84B HP"),
        ("Easy Horntail", 240060300, "horntail", 0, 5000000, "Lv. 130+ | 3-Headed Dragon (Easy)"),
        ("Normal Horntail", 240060200, "horntail", 1, 10000000, "Lv. 130+ | 3-Headed Dragon (Normal)"),
        ("Chaos Horntail", 240060201, "horntail", 2, 30000000, "Lv. 135+ | 3-Headed Dragon (Chaos)"),
        ("Normal Hilla", 262030300, "mob_hp", (8870000, 500000000, 0, -181), 5000000, "Lv. 120+ | Necromancer Hilla (500M HP)"),
        ("Hard Hilla", 262031300, "mob_hp", (8870100, 16800000000, 0, -181), 30000000, "Lv. 170+ | Dark Vampire Hilla (16.8B HP)"),
        ("Easy Von Leon", 211070104, "von_leon", 0, 5000000, "Lv. 125+ | Lion King (Easy, 1.05B HP)"),
        ("Normal Von Leon", 211070102, "von_leon", 1, 10000000, "Lv. 125+ | Lion King (Normal, 6.3B HP)"),
        ("Hard Von Leon", 211070100, "von_leon", 2, 25000000, "Lv. 125+ | Lion King (Hard, 10.5B HP)"),
        ("Easy Arkarium", 272020200, "mob_hp", (8860005, 12600000000, 0, -181), 10000000, "Lv. 140+ | Arkarium Screen Crack (12.6B HP)"),
        ("Normal Arkarium", 272020210, "mob_hp", (8860000, 25200000000, 0, -181), 25000000, "Lv. 140+ | Arkarium Screen Crack (25.2B HP)"),
        ("Normal Pink Bean", 270050100, "pink_bean", 0, 15000000, "Lv. 140+ | 5 Statues + Pink Bean (2.1B HP)"),
        ("Chaos Pink Bean", 270051100, "pink_bean", 1, 50000000, "Lv. 170+ | Chaos Statues + Pink Bean (54B HP)"),
        ("Easy Cygnus", 271041100, "cygnus", 0, 15000000, "Lv. 140+ | Corrupted Empress (10.5B HP)"),
        ("Normal Cygnus", 271040100, "cygnus", 1, 50000000, "Lv. 165+ | Corrupted Empress (63B HP)"),
        ("Easy Papulatus", 220080001, "papulatus", 0, 10000000, "Lv. 115+ | Clockwork Guardian (400M HP)"),
        ("Normal Papulatus", 220080001, "papulatus", 1, 25000000, "Lv. 155+ | Clockwork Guardian (16.6B HP)"),
        ("Chaos Papulatus", 220080001, "papulatus", 2, 150000000, "Lv. 190+ | Clock Laser & Alarm Curse (500B HP)"),
        ("Easy Magnus", 401060300, "magnus", 0, 10000000, "Lv. 115+ | Blue Zone & Meteors (400M HP)"),
        ("Normal Magnus", 401060200, "magnus", 1, 30000000, "Lv. 155+ | Blue Zone & Meteors (6B HP)"),
        ("Hard Magnus", 401060100, "magnus", 2, 150000000, "Lv. 175+ | Tyrant of Heliseum (120B HP)"),
    ]),
    ("Root Abyss 4 Guardians", [
        ("Normal Pierre", 105200100, "pierre", 0, 20000000, "Lv. 125+ | Clown with Hat split (315M HP)"),
        ("Chaos Pierre", 105200500, "pierre", 1, 80000000, "Lv. 180+ | Chaos Hat Trick & Clones (80B HP)"),
        ("Normal Von Bon", 105200200, "root_abyss", "banbanNormal", 20000000, "Lv. 125+ | Clockwork Rooster (315M HP)"),
        ("Chaos Von Bon", 105200600, "root_abyss", "banbanChaos", 80000000, "Lv. 180+ | Dimensional Rift & Quake (100B HP)"),
        ("Normal Crimson Queen", 105200300, "root_abyss", "queenNormal", 20000000, "Lv. 125+ | 4 Facial Expressions (315M HP)"),
        ("Chaos Crimson Queen", 105200700, "root_abyss", "queenChaos", 80000000, "Lv. 180+ | Seduction & Mirror (140B HP)"),
        ("Normal Vellum", 105200400, "root_abyss", "bellumNormal", 25000000, "Lv. 125+ | Abyssal Earth Dragon (550M HP)"),
        ("Chaos Vellum", 105200800, "root_abyss", "bellumChaos", 100000000, "Lv. 180+ | Stalactites & Deep Dive (200B HP)"),
    ]),
    ("Arcane River & Mid-Tier Bosses", [
        ("Normal Lotus (Suu)", 350060400, "lotus", 0, 250000000, "Lv. 190+ | 3 Phases, Laser & Debris (1.5T HP)"),
        ("Hard Lotus (Suu)", 350060700, "lotus", 1, 750000000, "Lv. 210+ | 3 Phases, Laser & Debris (33T HP)"),
        ("Extreme Lotus (Suu)", 350060700, "mob_hp", (8881300, 120000000000000, 0, -16), 2500000000, "Lv. 260+ | Ultra High-Speed Lasers (120T HP)"),
        ("Normal Damien (Demian)", 350160200, "damien", 0, 250000000, "Lv. 190+ | 2 Phases, Flying Sword & Corruption (1.2T HP)"),
        ("Hard Damien (Demian)", 350160100, "damien", 1, 750000000, "Lv. 210+ | 2 Phases, Flying Sword & Corruption (36T HP)"),
        ("Normal Guardian Angel Slime", 160080000, "mob_hp", (8880700, 5000000000000, 0, 208), 300000000, "Lv. 210+ | Ramuramu Altar & Slime Wave (5T HP)"),
        ("Chaos Guardian Angel Slime", 160080000, "mob_hp", (8880711, 115000000000000, 0, 208), 1200000000, "Lv. 220+ | Ramuramu Altar & Slime Wave (115T HP)"),
        ("Easy Lucid", 450004150, "lucid", 0, 200000000, "Lv. 220+ | Dream Manipulator (12T HP)"),
        ("Normal Lucid", 450004150, "lucid", 1, 400000000, "Lv. 220+ | 3 Phases, Golem & Dragon (24T HP)"),
        ("Hard Lucid", 450004150, "lucid", 2, 1000000000, "Lv. 220+ | 45s DPS Check Phase 3 (120T HP)"),
        ("Easy Will", 450008750, "mob_hp", (8880340, 4000000000000, 352, -2020), 200000000, "Lv. 235+ | Dimensional Mirror & Web (4T HP)"),
        ("Normal Will", 450008750, "will", 0, 500000000, "Lv. 235+ | 3 Phases, Moonlight Gauge & Web (25T HP)"),
        ("Hard Will", 450008150, "will", 1, 1200000000, "Lv. 235+ | 3 Phases, Moonlight Gauge & Web (126T HP)"),
        ("Normal Ranmaru", 807300110, "ranmaru", 0, 50000000, "Lv. 120+ | Mori Ranmaru (5B HP)"),
        ("Hard Ranmaru", 807300210, "ranmaru", 1, 200000000, "Lv. 180+ | Mori Ranmaru (50B HP)"),
        ("Princess No", 811000008, "mob_hp", (9450022, 200000000000, 0, 85), 100000000, "Lv. 180+ | Oda Princess (200B HP)"),
        ("Gollux Head", 863010600, "gollux", 0, 100000000, "Lv. 180+ | Corrupted Titan Head"),
        ("Akechi Mitsuhide (2 Phases)", 874004000, "field_script", 0, 250000000, "Lv. 210+ | Katana Blade & Demon Aura (800B HP)"),
        ("Ursus the Destroyer", 970072000, "mob_hp", (8881000, 500000000000, 0, 85), 150000000, "Lv. 100+ | 18-Player Giant Beast (500B HP)"),
    ]),
    ("Endgame & Tenebris Bosses", [
        ("Normal Gloom", 450009301, "mob_hp", (8644650, 26000000000000, 0, 85), 500000000, "Lv. 245+ | Giant Eye of Limina (26T HP)"),
        ("Chaos Gloom", 450009301, "mob_hp", (8644655, 115000000000000, 0, 85), 2000000000, "Lv. 255+ | Giant Eye of Limina (115T HP)"),
        ("Normal Darknell", 450012200, "mob_hp", (8645009, 26000000000000, 0, 85), 500000000, "Lv. 255+ | Guard Captain Darknell (26T HP)"),
        ("Hard Darknell", 450012200, "mob_hp", (8645066, 130000000000000, 0, 85), 2000000000, "Lv. 265+ | Guard Captain Darknell (130T HP)"),
        ("Normal Verus Hilla", 450011990, "mob_hp", (8880405, 88000000000000, 0, 85), 750000000, "Lv. 250+ | True Necromancer Hilla (88T HP)"),
        ("Hard Verus Hilla", 450011990, "mob_hp", (8880410, 176000000000000, 0, 85), 2500000000, "Lv. 255+ | True Necromancer Hilla (176T HP)"),
        ("Hard Black Mage (4 Phases)", 450013100, "field_script", 0, 2500000000, "Lv. 255+ | 4-Phase Story Dungeon (465T HP)"),
        ("Extreme Black Mage (God of Ruin)", 450013100, "black_mage_extreme", 0, 5000000000, "Lv. 275+ | Absolute Sovereign of Genesis (1,000T HP)"),
    ]),
    ("Grandis Peak & God-Tier Bosses (Seren, Kalos, Kaling Extreme, Limbo)", [
        ("Normal Chosen Seren", 410030000, "seren", (8880600, 126000000000000, 0, 125), 2500000000, "Lv. 260+ | Cernium Holy Sword Mitra (126T HP)"),
        ("Hard Chosen Seren", 410030100, "seren", (8880602, 250000000000000, 0, 125), 4000000000, "Lv. 265+ | Cernium Holy Sword Mitra (250T HP)"),
        ("Extreme Chosen Seren", 410030200, "seren", (8880604, 600000000000000, 0, 125), 6000000000, "Lv. 275+ | Cernium Holy Sword Mitra (600T HP)"),
        ("Easy Kalos the Guardian", 410030300, "kalos", (8881010, 100000000000000, 0, 252), 2500000000, "Lv. 265+ | Karote Castle Ancient Guardian (100T HP)"),
        ("Normal Kalos the Guardian", 410030400, "kalos", (8880800, 200000000000000, 0, 252), 4000000000, "Lv. 265+ | Karote Castle Ancient Guardian (200T HP)"),
        ("Chaos Kalos the Guardian", 410030500, "kalos", (8881030, 300000000000000, 0, 252), 6500000000, "Lv. 275+ | Karote Castle Ancient Guardian (300T HP)"),
        ("Extreme Kalos the Guardian", 410030600, "kalos", (8881050, 650000000000000, 0, 252), 8500000000, "Lv. 280+ | Karote Castle Ancient Guardian (650T HP)"),
        ("Easy Kaling (Shangri-La)", 410030700, "kaling", 0, 2500000000, "Lv. 275+ | Four Seasons Pavilion + 3 Perils (80T HP)"),
        ("Normal Kaling (Shangri-La)", 410030800, "kaling", 1, 5000000000, "Lv. 275+ | Four Seasons Pavilion + 3 Perils (180T HP)"),
        ("Hard Kaling (Shangri-La)", 410030900, "kaling", 2, 7500000000, "Lv. 280+ | Four Seasons Pavilion + 3 Perils (350T HP)"),
        ("Extreme Kaling (The Ultimate Four Seasons Master)", 410031000, "kaling", 3, 10000000000, "Lv. 285+ | The Peak Grandis Evil + Extreme 3 Perils (800T HP)"),
        ("Extreme Kaling (Phase 2 - Frenzied)", 410031000, "mob_hp", (8880972, 900000000000000, 0, -13), 10000000000, "Lv. 285+ | Frenzied Form Extreme (900T HP)"),
        ("Extreme Kaling (Phase 3 - Harsh Winter)", 410031000, "mob_hp", (8880976, 1200000000000000, 0, -13), 10000000000, "Lv. 285+ | Harsh Winter Goddess Extreme (1,200T HP)"),
        ("Normal Limbo", 410031100, "mob_hp", (8881304, 200000000000000, 0, -39), 5000000000, "Lv. 285+ | Carcion Temple of Tears (200T HP)"),
        ("Hard Limbo", 410031200, "mob_hp", (8881354, 450000000000000, 0, -39), 10000000000, "Lv. 285+ | Carcion Temple of Tears (450T HP)"),
        ("Normal First Adversary", 410031600, "mob_hp", (8881800, 300000000000000, 0, 85), 5000000000, "Lv. 270+ | Odium Where Will Takes Form (300T HP)"),
        ("Extreme First Adversary", 410031800, "mob_hp", (8881820, 700000000000000, 0, 85), 10000000000, "Lv. 280+ | Odium Where Will Takes Form (700T HP)"),
        ("Normal Baldrix", 410031300, "mob_hp", (8881600, 300000000000000, 0, 85), 5000000000, "Lv. 290+ | Tallahart Phantasmal Sanctum (300T HP)"),
        ("Hard Baldrix", 410031400, "mob_hp", (8881650, 600000000000000, 0, 85), 10000000000, "Lv. 290+ | Tallahart Phantasmal Sanctum (600T HP)"),
    ])
]

def open_boss_arena(sm, chr):
    sm.setSpeakerID(9010000)
    current_meso = chr.getMoney()
    party = chr.getParty()
    is_party = (party is not None)
    
    menu_text = "#fs14##e#r[Offline Boss Arena & Warp]#k#n\r\n"
    menu_text += "Welcome #h0#! Challenge Maple World Bosses up to #rKaling Extreme#k!\r\n"
    menu_text += "#d0 Prequests | Unlimited Attempts | 30 Mins | 15 Deaths | " + ("Party Mode" if is_party else "Solo Mode") + "#k\r\n\r\n"
    menu_text += "#fs13##bYour Meso Balance:#k #e#g" + "{:,}".format(current_meso) + " Mesos#k#n\r\n"
    menu_text += "#d(Scaled entry fee is deducted per challenge. Stronger bosses cost more!)#k\r\n\r\n"
    
    for i, (cat_name, bosses) in enumerate(BOSS_CATEGORIES):
        menu_text += "#L" + str(i) + "##e#b" + cat_name + "#k#n (" + str(len(bosses)) + " Bosses)#l\r\n"
    menu_text += "#L99##dShow All Bosses (A-Z)#k#l\r\n"
    menu_text += "#L999##rLeave Boss Arena (Return to Henesys)#k#l\r\n"
    
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
        
    boss_menu = "#fs13#Select the boss you want to challenge (Balance: #g" + "{:,}".format(chr.getMoney()) + " Mesos#k):\r\n\r\n"
    for idx, item in enumerate(selected_bosses):
        b_name = item[0]
        fee = item[4]
        desc = item[5]
        fee_str = format_meso(fee)
        boss_menu += "#L" + str(idx) + "##e#r" + b_name + "#k#n - #fs11##g[" + fee_str + "]#k | #b" + desc + "#k#fs13##l\r\n"
        
    boss_sel = sm.sendNext(boss_menu)
    if 0 <= boss_sel < len(selected_bosses):
        b_name, map_id, spawn_type, spawn_val, fee, desc = selected_bosses[boss_sel]
        
        # Check Meso Balance
        if chr.getMoney() < fee:
            err_msg = "#fs13##e#r[Insufficient Mesos!]#k#n\r\n\r\n"
            err_msg += "Challenging #b" + b_name + "#k requires an entry fee of:\r\n"
            err_msg += "#r" + "{:,}".format(fee) + " Mesos (" + format_meso(fee) + ")#k\r\n\r\n"
            err_msg += "Your Current Balance:\r\n"
            err_msg += "#d" + "{:,}".format(chr.getMoney()) + " Mesos#k\r\n\r\n"
            err_msg += "#rMissing:#k " + "{:,}".format(fee - chr.getMoney()) + " Mesos\r\n\r\n"
            err_msg += "Please farm or trade items to earn enough Mesos, then return to challenge!"
            sm.sendSayOkay(err_msg)
            return
            
        confirm_text = "#fs13#Confirm challenge for #e#r" + b_name + "#k#n?\r\n\r\n"
        confirm_text += "#b- Entry Fee:#k #e#r" + "{:,}".format(fee) + " Mesos#k#n (" + format_meso(fee) + ")\r\n"
        confirm_text += "#b- Balance After Fee:#k #g" + "{:,}".format(chr.getMoney() - fee) + " Mesos#k\r\n"
        confirm_text += "#b- Battle Time:#k 30 Minutes\r\n"
        confirm_text += "#b- Death Count:#k 15 Deaths\r\n"
        confirm_text += "#b- Challenge Mode:#k " + ("Party Instance" if is_party else "Solo Instance") + "\r\n\r\n"
        confirm_text += "#dMesos will be deducted upon confirmation and you will be warped immediately!#k"
        
        if sm.sendAskYesNo(confirm_text):
            # Double check Meso right before deduct
            if chr.getMoney() < fee:
                sm.sendSayOkay("#rYour Mesos are insufficient!#k")
                return
            chr.deductMoney(fee)
            chr.chatMessage("[Boss Arena] Entry fee of " + "{:,}".format(fee) + " Mesos paid for " + b_name + ". (Remaining: " + "{:,}".format(chr.getMoney()) + " Mesos)")
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
    try:
        if spawn_type == "zakum":
            # spawn_val: 1 (Easy), 2 (Normal), 3 (Chaos)
            Zakum.spawn(spawn_val, field)
        elif spawn_type == "horntail":
            # spawn_val: 0 (Easy), 1 (Normal), 2 (Chaos)
            Horntail.spawn(spawn_val, field)
        elif spawn_type == "mob_hp":
            mid, hp, x, y = spawn_val
            field.spawnMob(mid, x, y, False, hp)
        elif spawn_type == "papulatus":
            hp = 400000000 if spawn_val == 0 else (16600000000 if spawn_val == 1 else 500000000000)
            mid = 8500002 if spawn_val == 0 else (8500012 if spawn_val == 1 else 8500022)
            field.spawnMob(mid, 0, 85, False, hp)
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
            Damien.init(chr)
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
        elif spawn_type == "field_script":
            pass # Field script automatically manages phases and summons upon entrance
        elif spawn_type == "seren":
            mid, hp, x, y = spawn_val
            field.spawnMob(mid, x, y, False, hp)
        elif spawn_type == "kalos":
            mid, hp, x, y = spawn_val
            field.spawnMob(mid, x, y, False, hp)
        elif spawn_type == "kaling":
            # Kaling difficulties with 3 Perils
            if spawn_val == 0:
                # Easy Kaling
                field.spawnMob(8880907, 0, -13, False, 80000000000000)
                field.spawnMob(8880900, -400, -13, False, 20000000000000) # Qiongqi
                field.spawnMob(8880901, 400, -13, False, 20000000000000)  # Taowu
                field.spawnMob(8880902, 0, -13, False, 20000000000000)    # Hundun
            elif spawn_val == 1:
                # Normal Kaling
                field.spawnMob(8880837, 0, -13, False, 180000000000000)
                field.spawnMob(8880830, -400, -13, False, 45000000000000) # Qiongqi
                field.spawnMob(8880831, 400, -13, False, 45000000000000)  # Taowu
                field.spawnMob(8880832, 0, -13, False, 45000000000000)    # Hundun
            elif spawn_val == 2:
                # Hard Kaling
                field.spawnMob(8880937, 0, -13, False, 350000000000000)
                field.spawnMob(8880930, -400, -13, False, 90000000000000) # Qiongqi
                field.spawnMob(8880931, 400, -13, False, 90000000000000)  # Taowu
                field.spawnMob(8880932, 0, -13, False, 90000000000000)    # Hundun
            elif spawn_val == 3:
                # Extreme Kaling (The Ultimate Four Seasons Master!)
                field.spawnMob(8880967, 0, -13, False, 800000000000000) # 800T HP Extreme Kaling
                field.spawnMob(8880960, -400, -13, False, 200000000000000) # Extreme Qiongqi (200T)
                field.spawnMob(8880961, 400, -13, False, 200000000000000)  # Extreme Taowu (200T)
                field.spawnMob(8880962, 0, -13, False, 200000000000000)    # Extreme Hundun (200T)
        elif spawn_type == "black_mage_hard":
            pass # firstenter_bossBlackMage.py handles P1 through P4 cleanly
        elif spawn_type == "black_mage_extreme":
            field.spawnMob(8880530, -600, 85, False, 100000000000000) # Extreme Aeonian Rise
            field.spawnMob(8880531, 600, 85, False, 100000000000000)  # Extreme Tanadian Ruin
    except Exception as e:
        chr.chatMessage("[Boss Arena Error] Spawn exception: " + str(e))
    
    # Boss HP Bar Guarantee: Configure all spawned mobs in the field as boss and broadcast HP tag
    for m in field.getMobs():
        if m is not None:
            m.setBoss(True)
            m.setHPgaugeHide(False)
            if m.getHpTagColor() == 0:
                m.setHpTagColor(1)
            if m.getHpTagBgcolor() == 0:
                m.setHpTagBgcolor(5)
            field.broadcast(FieldPacket.fieldEffect(FieldEffect.mobHPTagFieldEffect(m)))
            
    sm.showHP()
