# 📜 MapleStory v265 Server Development Progress & Change Log

This file tracks all bug fixes, feature implementations, and system optimizations across sessions.
**Rule (AGENTS.md #4)**: Every agent MUST record new progress here and in `.agents/skills/maplestory-bug-knowledge/SKILL.md` after completing any modification.

## 📅 [2026-10-12 12:35 น.] Phase 2: Explorer Class 10 (Night Lord - 412) สมบูรณ์แบบ 100% — เปิดกลุ่ม Thief Trio เชื่อมต่อ Life and Death, Deep Strike และคำสั่ง !endgame

### 🎯 Scope
ลงทะเบียนและตรวจสอบสกิลคลาส 6 สาย Explorer อาชีพที่ 10: **Night Lord (ไนท์ลอร์ด / ดาวกระจายพิฆาต - Job ID 412)** อาชีพแรกของกลุ่ม Thief Trio บรรจุสกิล Origin (Life and Death & Ascent Skill: Deep Strike) และ HEXA Masteries ครบชุด (HEXA Quad Star, HEXA Assassin's Mark, HEXA Showdown, HEXA Dark Flare, HEXA Sudden Raid, HEXA Death Star, Darkness Shuriken) เชื่อมต่อระบบ Origin Absolute Bind/Debuff, Shuriken Auto-Gain, Shadow Partner, และคำสั่งทดสอบ `!endgame nightlord` หรือ `!endgame nl` ให้มอบอาวุธ BiS Arcane Umbra Guards, Princess No's Charm, และ HEXA Cores ระดับ 30 เต็มระบบ

### 📂 Files Modified
- [`v214 src/.../NightLord.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/thief/NightLord.java)
- [`v214 src/.../SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`v214 src/.../AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)

### 🛠️ Issues Identified & Fixes Applied
1. **Life and Death Origin & Deep Strike Ascent Integration**:
   - ปัญหา: ใน `NightLord.java` เดิม ยังขาดการประกาศ Constants และการประมวลผลสำหรับ `LIFE_AND_DEATH` (`4141500`), `DEEP_STRIKE` (`4141503`), และ Attack Sub-skills (`4141501`, `4141502`, `4141504`) ส่งผลให้การกดร่ายไม่เกิดผลอมตะและคัตซีน
   - วิธีแก้: ใน `NightLord.handleSkill()`, เพิ่ม `case LIFE_AND_DEATH:` มอบสถานะอมตะ `IndieNotDamaged` (7 วินาที) และบรอดคาสต์แพ็กเก็ตเอฟเฟกต์คัตซีน `UserLocal.showHexaSkillEff(chr)` ทั่วแมพ
2. **Origin Absolute Bind & Origin Debuff Handling**:
   - ปัญหา: ใน `handleAttack()`, การโจมตีด้วยสกิล Origin ยังไม่มอบสถานะดีบัฟพิเศษของคลาส 6
   - วิธีแก้: เพิ่มเงื่อนไขตรวจสอบ `LIFE_AND_DEATH`, `LIFE_AND_DEATH_ATTACK_1`, และ `LIFE_AND_DEATH_ATTACK_2` เพื่อมอบสถานะ `MobStat.Freeze` (10 วินาที Absolute Bind) และ `MobStat.OriginDebuff` (20 วินาที) ให้กับศัตรูทุกตัวที่ถูกโจมตีด้วย `EnumMap<MobStat, Option>`
3. **Sub-Skill Redirection in SkillConstants**:
   - ปัญหา: สกิลลูกและเอฟเฟกต์โจมตีต่อเนื่อง เช่น `HEXA Enhanced Quad Star` (`4141001`), `HEXA Assassin's Mark Subs` (`4141003`, `4141004`), `HEXA Showdown Atom` (`4141006`), `HEXA Death Star Rampant` (`4141010`), และ `Deep Strike Sub` (`4141504`) เป็น invisible skills ใน WZ
   - วิธีแก้: เพิ่มการ Redirect สกิลลูกเหล่านี้กลับไปยัง Parent Skills ใน `SkillConstants.getSkillBySubSkill()` เพื่อให้เซิร์ฟเวอร์ดึงค่า stat/damage ได้ถูกต้อง 100%
4. **Full Testing Automation in `!endgame nightlord`**:
   - ใน `AdminCommands.setupEndgame()`:
     - มอบอาวุธระดับเทพ: Arcane Umbra Guards (`1472265`)
     - มอบไอเทม Secondary BiS: Princess No's Charm (`1352296`)
     - มอบ Mitra Thief Emblem (`1190558`) และชุดเกราะ Arcane Umbra Thief ครบ 6 ชิ้น
     - ปลดล็อกและอัปเกรด HEXA Cores คลาส 6 ทุกคอร์ (Core 10000009, 10000061, 20000009, 20000059, 20000109, 20000155, 30000036-30000039, 40000000 Sol Janus) เลเวล 30 เต็ม พร้อมมอบสกิลเสริม (`4140011`, `4141001`, `4141003`, `4141004`, `4141006`, `4141010`, `4141501`, `4141502`, `4141504`)

### 🧪 Verification & Deployment
- คอมไพล์ผ่าน Maven OpenJDK 21: `BUILD SUCCESS` (0 errors, total time: 1m 52s)
- ดีพลอย Fat JAR: `Server263/maplestory.jar` (~138.64 MB)
- หมายเหตุ Patch: รวบรวมทำไฟล์แพตช์ ZIP ครั้งเดียวเมื่อครบ 15 อาชีพตามความประสงค์ของผู้ใช้

---

## 📅 [2026-10-12 12:28 น.] Phase 2: Explorer Class 9 (Pathfinder - 332) สมบูรณ์แบบ 100% — สิ้นสุดกลุ่ม Bowman Trio อย่างสมบูรณ์แบบ เชื่อมต่อ Forsaken Relic, Piercing Relic และคำสั่ง !endgame

### 🎯 Scope
ลงทะเบียนและตรวจสอบสกิลคลาส 6 สาย Explorer อาชีพที่ 9: **Pathfinder (พาธไฟน์เดอร์ / นักธนูโบราณ Relic - Job ID 332)** สิ้นสุดกลุ่ม Bowman Trio ครบทั้ง 3 อาชีพอย่างสมบูรณ์แบบ บรรจุสกิล Origin (Forsaken Relic & Ascent Skill: Piercing Relic) และ HEXA Masteries ครบชุด (HEXA Cardinal Burst, HEXA Bountiful Burst, HEXA Cardinal Deluge, HEXA Bountiful Deluge, HEXA Cardinal Torrent, HEXA Glyph of Impalement, HEXA Ancient Astra, HEXA Shadow Raven, HEXA Combo Assault, Manifest Curse) เชื่อมต่อระบบ Relic Gauge, Cardinal Force Switching, Ancient Guidance, Origin Absolute Bind/Debuff และคำสั่งทดสอบ `!endgame pathfinder` หรือ `!endgame pf` ให้มอบอาวุธ BiS Arcane Umbra Ancient Bow, Magic Arrows, และ HEXA Cores ระดับ 30 เต็มระบบ

### 📂 Files Modified
- [`v214 src/.../Pathfinder.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/archer/Pathfinder.java)
- [`v214 src/.../SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`v214 src/.../AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)

### 🛠️ Issues Identified & Fixes Applied
1. **Forsaken Relic Origin & Piercing Relic Ascent Broadcast & Debuff**:
   - ปัญหา: เดิมการร่าย `FORSAKEN_RELIC` (`3341500`) ส่งแพ็กเก็ตเอฟเฟกต์คัตซีน `showHexaSkillEff` ให้เฉพาะสมาชิกปาร์ตี้ และใน `handleAttack()` ติดเฉพาะสถานะ Freeze แต่ยังขาด `MobStat.OriginDebuff`
   - วิธีแก้: ใน `handleSkill()`, ปรับให้บรอดคาสต์ `showHexaSkillEff(chr)` ทั่วทั้งแมพ และใน `handleAttack()` เพิ่ม `MobStat.OriginDebuff` (20 วินาที) มอบให้มอนสเตอร์ทุกตัวที่โดนการโจมตี
2. **HEXA Cardinal Force Integration**:
   - ปัญหา: ใน `Pathfinder.java`, สวิตช์การทำงานของ `CARDINAL_BURST`, `CARDINAL_DELUGE`, `CARDINAL_TORRENT`, และ `COMBO_ASSAULT` ดักจับเฉพาะรหัสสกิลคลาส 1-4 เดิม ทำให้เมื่อผู้เล่นอัปเกรดเป็นคลาส 6 (`HEXA_CARDINAL_BURST`, `HEXA_CARDINAL_DELUGE`, `HEXA_CARDINAL_TORRENT`, `HEXA_COMBO_ASSAULT`) ระบบชาร์จ Relic Gauge และ Bountiful Atoms ไม่ทำงาน
   - วิธีแก้: บรรจุรหัสสกิล HEXA Cardinal และ HEXA Combo Assault ทั้งหมดเข้าสู่สวิตช์ใน `handleSkill()` และ `handleAttack()`
3. **Sub-Skill Redirection in SkillConstants**:
   - ปัญหา: การโจมตีต่อเนื่องของ `HEXA_CARDINAL_BURST_ATTACK` (`3341001`), `HEXA_BOUNTIFUL_BURST_SUB` (`3341003`), `HEXA_BOUNTIFUL_DELUGE_SUB` (`3341005`), `HEXA_GLYPH_OF_IMPALEMENT_SUB` (`3341007`), `HEXA_CARDINAL_TORRENT_SUB` (`3341009`), `HEXA_ANCIENT_ASTRA_SUBS` (`3341011-3341015`), และ `HEXA_COMBO_ASSAULT_SUBS` (`3341017-3341023`) เป็นสกิลที่ซ่อนอยู่ใน WZ (`invisible = 1`)
   - วิธีแก้: เพิ่มการจับคู่ครบทั้ง 18 สกิลใน `SkillConstants.getSkillBySubSkill()` เพื่อเชื่อมโยงเลเวลและความเสียหายได้อย่างแม่นยำ 100%
4. **Full Testing Automation in `!endgame pathfinder`**:
   - ใน `AdminCommands.setupEndgame()`:
     - มอบอาวุธระดับเทพ: Arcane Umbra Ancient Bow (`1592020`)
     - มอบไอเทมเสริมพลัง Relic รอง BiS: Magic Arrows (`1352014`)
     - มอบ Mitra Bowman Emblem (`1190556`) และเซ็ตเกราะ Arcane Umbra Archer ครบ 6 ชิ้น
     - ปลดล็อกและอัปเกรด HEXA Cores คลาส 6 ทุกคอร์ (Core 10000008, 10000060, 20000008, 20000058, 20000108, 20000154, 30000032-30000035, 40000000 Sol Janus) เลเวล 30 เต็ม พร้อมมอบสกิลเสริมครบถ้วนทุกสกิล (`3341001`, `3341003`, `3341005`, `3341007`, `3341009`, `3341011-3341015`, `3341017`, `3341501-3341504`)

### 🧪 Verification & Deployment
- คอมไพล์ผ่าน Maven OpenJDK 21: `BUILD SUCCESS` (0 errors, total time: 1m 23s)
- ดีพลอย Fat JAR: `Server263/maplestory.jar` (~138.64 MB)
- หมายเหตุ Patch: รวบรวมทำไฟล์แพตช์ ZIP ครั้งเดียวเมื่อครบ 15 อาชีพตามความประสงค์ของผู้ใช้

---

## 📅 [2026-10-12 12:22 น.] Phase 2: Explorer Class 8 (Marksman - 322) สมบูรณ์แบบ 100% — เชื่อมต่อ Final Aim, Fatal Trigger และคำสั่ง !endgame

### 🎯 Scope
ลงทะเบียนและตรวจสอบสกิลคลาส 6 สาย Explorer อาชีพที่ 8: **Marksman (มาร์กสแมน / นักธนูสายหน้าไม้ - Job ID 322)** อาชีพที่สองของกลุ่ม Bowman Trio บรรจุสกิล Origin (Final Aim & Ascent Skill: Fatal Trigger) และ HEXA Masteries ครบชุด (HEXA Snipe, HEXA Empowered Snipe, HEXA Snipe Extra, Ultimate Snipe, HEXA Piercing Arrow, HEXA Empowered Piercing, HEXA Ultimate Piercing, HEXA Frostprey, HEXA Bolt Burst, HEXA Final Attack, HEXA High Speed Shot) เชื่อมต่อระบบ Aggressive Resistance, Snipe Stack Management, Origin Absolute Bind/Debuff และคำสั่งทดสอบ `!endgame marksman` หรือ `!endgame mm` ให้มอบอาวุธ BiS Arcane Umbra Crossbow, Princess No's Iron Arrow, และ HEXA Cores ระดับ 30 เต็มระบบ

### 📂 Files Modified
- [`v214 src/.../Marksman.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/archer/Marksman.java)
- [`v214 src/.../SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`v214 src/.../AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)

### 🛠️ Issues Identified & Fixes Applied
1. **Final Aim Origin & Fatal Trigger Ascent Integration**:
   - ปัญหา: เดิมใน `Marksman.java`, ยังขาด Constants และการรองรับ `FINAL_AIM` (`3241500`), `FATAL_TRIGGER` (`3241502`), และ Attack Sub-skills (`3241501`, `3241503`) ส่งผลให้การกดร่ายไม่เกิดอมตะและไม่ส่งแพ็กเก็ตเอฟเฟกต์คัตซีน
   - วิธีแก้: ใน `Marksman.handleSkill()`, เพิ่ม `case FINAL_AIM:` มอบสถานะอมตะ `IndieNotDamaged` (7 วินาที) และส่งแพ็กเก็ต `UserLocal.showHexaSkillEff(chr)` สู่ปาร์ตี้/ฟิลด์
2. **Origin Absolute Bind & Origin Debuff Handling**:
   - ปัญหา: ใน `handleAttack()`, การโจมตีด้วย `FINAL_AIM` ยังไม่ติดสถานะควบคุมมอนสเตอร์
   - วิธีแก้: เพิ่มเงื่อนไขตรวจสอบการโจมตีจาก `FINAL_AIM` และ `FINAL_AIM_ATTACK` ติดสถานะ `MobStat.Freeze` (10 วินาที Absolute Bind) และ `MobStat.OriginDebuff` (20 วินาที) ให้กับศัตรูทุกตัวที่ถูกโจมตี พร้อมนำเข้าคลาส `MobAttackInfo`
3. **Sub-Skill Redirection in SkillConstants**:
   - ปัญหา: การโจมตีต่อเนื่องของ `HEXA_SNIPE_SUB` (`3241001-3241004`), `HEXA_PIERCING_ARROW_SUB` (`3241006-3241011`), และ `FATAL_TRIGGER_ATTACK` (`3241503`) เป็นสกิลที่ซ่อนอยู่ใน WZ (`invisible = 1`)
   - วิธีแก้: เพิ่มการจับคู่ครบทั้ง 11 สกิลใน `SkillConstants.getSkillBySubSkill()` เพื่อเชื่อมโยงเลเวลและความเสียหายได้อย่างแม่นยำ 100%
4. **Full Testing Automation in `!endgame marksman`**:
   - ใน `AdminCommands.setupEndgame()`:
     - มอบอาวุธระดับเทพ: Arcane Umbra Crossbow (`1462243`)
     - มอบลูกศรเหล็กรอง BiS: Princess No's Iron Arrow (`1352276`)
     - มอบ Mitra Bowman Emblem (`1190556`) และเซ็ตเกราะ Arcane Umbra Archer ครบ 6 ชิ้น
     - ปลดล็อกและอัปเกรด HEXA Cores คลาส 6 ทุกคอร์ (Core 10000007, 10000059, 20000007, 20000057, 20000107, 20000153, 30000028-30000031, 40000000 Sol Janus) เลเวล 30 เต็ม พร้อมมอบสกิลเสริมครบถ้วนทุกสกิล (`3241001-3241004`, `3241006-3241011`, `3241501`, `3241503`)

### 🧪 Verification & Deployment
- คอมไพล์ผ่าน Maven OpenJDK 21: `BUILD SUCCESS` (0 errors, total time: 1m 26s)
- ดีพลอย Fat JAR: `Server263/maplestory.jar` (~138.64 MB)
- หมายเหตุ Patch: รวบรวมทำไฟล์แพตช์ ZIP ครั้งเดียวเมื่อครบ 15 อาชีพตามความประสงค์ของผู้ใช้

---

## 📅 [2026-10-12 12:18 น.] Phase 2: Explorer Class 7 (Bowmaster - 312) สมบูรณ์แบบ 100% — เชื่อมต่อ Ascendant Shadow, Flashpoint และคำสั่ง !endgame

### 🎯 Scope
ลงทะเบียนและตรวจสอบสกิลคลาส 6 สาย Explorer อาชีพที่ 7: **Bowmaster (โบว์มาสเตอร์ / นักธนูสายธนู - Job ID 312)** เริ่มต้นกลุ่ม Bowman Trio บรรจุสกิล Origin (Ascendant Shadow & Ascent Skill: Flashpoint) และ HEXA Masteries ครบชุด (HEXA Hurricane, HEXA Arrow Stream, HEXA Arrow Blaster, HEXA Quiver Cartridge, Extra Quiver Cartridge, HEXA Phoenix, HEXA Speed Mirage, HEXA Gritty Gust, HEXA Silhouette Mirage) เชื่อมต่อระบบ Quiver Cartridge, Speed Mirage Afterimages, Origin Absolute Bind/Debuff และคำสั่งทดสอบ `!endgame bowmaster` หรือ `!endgame bm` ให้มอบอาวุธ BiS Arcane Umbra Bow, Princess No's Feather, และ HEXA Cores ระดับ 30 เต็มระบบ

### 📂 Files Modified
- [`v214 src/.../Bowmaster.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/archer/Bowmaster.java)
- [`v214 src/.../SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`v214 src/.../AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)

### 🛠️ Issues Identified & Fixes Applied
1. **Ascendant Shadow Origin & Flashpoint Ascent Integration**:
   - ปัญหา: เดิมใน `Bowmaster.java`, ยังขาด Constants และการรองรับ `ASCENDANT_SHADOW` (`3141500`), `FLASHPOINT` (`3141503`), และ Attack Sub-skills (`3141501`, `3141502`, `3141504`) ส่งผลให้การกดร่ายไม่เกิดอมตะและไม่ส่งแพ็กเก็ตเอฟเฟกต์คัตซีน
   - วิธีแก้: ใน `Bowmaster.handleSkill()`, เพิ่ม `case ASCENDANT_SHADOW:` มอบสถานะอมตะ `IndieNotDamaged` (7 วินาที) และส่งแพ็กเก็ต `UserLocal.showHexaSkillEff(chr)` สู่ปาร์ตี้/ฟิลด์
2. **Origin Absolute Bind & Origin Debuff Handling**:
   - ปัญหา: ใน `handleAttack()`, การโจมตีด้วย `ASCENDANT_SHADOW` ยังไม่ติดสถานะควบคุมมอนสเตอร์
   - วิธีแก้: เพิ่มเงื่อนไขตรวจสอบการโจมตีจาก `ASCENDANT_SHADOW` และ Sub-skills ติดสถานะ `MobStat.Freeze` (10 วินาที Absolute Bind) และ `MobStat.OriginDebuff` (20 วินาที) ให้กับศัตรูทุกตัวที่ถูกโจมตี
3. **Sub-Skill Redirection in SkillConstants**:
   - ปัญหา: การโจมตีต่อเนื่องของ `HEXA_HURRICANE` (`3141001`), `HEXA_ARROW_STREAM` (`3141003`), `HEXA_SPEED_MIRAGE_ATOM` (`3141014`), และ `FLASHPOINT_ATTACK` (`3141504`) เป็นสกิลที่ซ่อนอยู่ใน WZ (`invisible = 1`)
   - วิธีแก้: เพิ่มการจับคู่ใน `SkillConstants.getSkillBySubSkill()` เพื่อเชื่อมโยงเลเวลและความเสียหายได้อย่างแม่นยำ 100%
4. **Full Testing Automation in `!endgame bowmaster`**:
   - ใน `AdminCommands.setupEndgame()`:
     - มอบอาวุธระดับเทพ: Arcane Umbra Bow (`1452257`)
     - มอบขนนกติดคันศรรอง BiS: Princess No's Feather (`1352266`)
     - มอบ Mitra Bowman Emblem (`1190556`) และเซ็ตเกราะ Arcane Umbra Archer ครบ 6 ชิ้น
     - ปลดล็อกและอัปเกรด HEXA Cores คลาส 6 ทุกคอร์ (Core 10000006, 10000058, 20000006, 20000056, 20000106, 20000152, 30000024-30000027, 40000000 Sol Janus) เลเวล 30 เต็ม พร้อมมอบสกิลเสริมครบถ้วนทุกสกิล (`3141001`, `3141003`, `3141014`, `3141501`, `3141502`, `3141504`)

### 🧪 Verification & Deployment
- คอมไพล์ผ่าน Maven OpenJDK 21: `BUILD SUCCESS` (0 errors, total time: 1m 38s)
- ดีพลอย Fat JAR: `Server263/maplestory.jar` (~138.64 MB)
- สร้างไฟล์แพตช์อัปเดตแบบเบา: [`Patches/Server263_Patch_20261012_1217.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches) ขนาด 121.61 MB

---

## 📅 [2026-10-12 12:08 น.] Phase 2: Explorer Class 6 (Bishop - 232) สมบูรณ์แบบ 100% — เชื่อมต่อ Holy Advent, Commandment of Heaven และคำสั่ง !endgame

### 🎯 Scope
ลงทะเบียนและตรวจสอบสกิลคลาส 6 สาย Explorer อาชีพที่ 6: **Bishop (บิชอป / นักบวชศักดิ์สิทธิ์ - Job ID 232)** สิ้นสุดกลุ่ม Magician Trio อย่างสมบูรณ์แบบ บรรจุสกิล Origin (Holy Advent & 3 Archangels Summon & Ascent Skill: Commandment of Heaven) และ HEXA Masteries ครบชุด (HEXA Angel Ray, HEXA Angel Ray Bonus, HEXA Big Bang, HEXA Big Bang Extra, HEXA Triumph Feather, HEXA Triumph Feather Atom, HEXA Fountain of Vengeance, HEXA Angelic Wrath, HEXA Angelic Wrath Summon, HEXA Genesis, HEXA Genesis FA, HEXA Heaven's Door, HEXA Bahamut) เชื่อมต่อระบบ PDR/MDR debuff และคำสั่งทดสอบ `!endgame bishop` หรือ `!endgame bish` ให้มอบอาวุธ BiS Arcane Umbra Staff, Princess No's Shining Book, และ HEXA Cores ระดับ 30 เต็มระบบ

### 📂 Files Modified
- [`v214 src/.../Bishop.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/magician/Bishop.java)
- [`v214 src/.../SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`v214 src/.../AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)

### 🛠️ Issues Identified & Fixes Applied
1. **Holy Advent Origin & 3 Archangels Summoning**:
   - ปัญหา: เดิมใน `Bishop.handleSkill()`, ยังขาดการดักจับ `HOLY_ADVENT` (`2341500`) ส่งผลให้การกดร่ายไม่เกิดการฟื้นฟูเลือด/มานาเต็ม และไม่เปิดใช้งานสถานะบัฟของ Holy Advent พร้อมทั้งไม่เสก 3 เทวทูตศักดิ์สิทธิ์ (Michael, Gabriel, Raphael)
   - วิธีแก้: ใน `Bishop.handleSkill()`, เพิ่ม `case HOLY_ADVENT:` ฟื้นฟู HP/MP 100% เต็มทันที มอบบัฟ `HolyAdvent` (60 วินาที) เรียกใช้ `setHolyAdvent()` เสกอัครเทวทูตทั้ง 3 ออกมาโจมตีศัตรูพร้อมกัน และส่งแพ็กเก็ต `holyAdventResult()` สู่ผู้เล่น
2. **Commandment of Heaven Ascent Skill Integration**:
   - ปัญหา: สกิล `COMMANDMENT_OF_HEAVEN` (`2341507`) ยังไม่ได้รับการดักจับใน `handleSkill()`
   - วิธีแก้: เพิ่ม `case COMMANDMENT_OF_HEAVEN:` ให้ฟื้นฟูพลังชีวิต 50%
3. **HEXA Big Bang Debuff Synchronization**:
   - ปัญหา: ใน `handleDebuffOnMob()`, มีเพียง `BIG_BANG` เดิมเท่านั้นที่ลดค่า PDR/MDR ของมอนสเตอร์ ทำให้เมื่ออัปเกรดเป็น `HEXA_BIG_BANG` (`2341002`) มอนสเตอร์ไม่ติดสถานะลดเกราะป้องกัน
   - วิธีแก้: เพิ่ม `case HEXA_BIG_BANG:` ร่วมกับ `BIG_BANG` ให้ลดค่า PDR และ MDR ของมอนสเตอร์ครบถ้วน
4. **Sub-Skill Redirection in SkillConstants**:
   - ปัญหา: การโจมตีต่อเนื่องของ `HEXA_ANGEL_RAY_BONUS` (`2341001`), `HEXA_BIG_BANG_EX` (`2341003`), `HEXA_TRIUMPH_FEATHER_ATOM` (`2341005`), `HEXA_ANGELIC_WRATH_SUMMON` (`2341008`), `HEXA_GENESIS_FA` (`2341010`), `HEXA_HEAVENS_DOOR_SUB` (`2341012`), และ `COMMANDMENT_OF_HEAVEN_SUB` (`2341508`) เป็นสกิลที่ซ่อนอยู่ใน WZ (`invisible = 1`)
   - วิธีแก้: เพิ่มการจับคู่ครบทั้ง 7 สกิลใน `SkillConstants.getActualSkillIDfromSkillID()` เพื่ออ่านค่าดาเมจและเลเวลสกิลได้แม่นยำ 100%
5. **Full Testing Automation in `!endgame bishop`**:
   - ใน `AdminCommands.setupEndgame()`:
     - มอบอาวุธระดับเทพ: Arcane Umbra Staff (`1382265`)
     - มอบคัมภีร์ศักดิ์สิทธิ์รอง BiS: Princess No's Shining Book (`1352256`)
     - มอบ Mitra Magician Emblem (`1190557`) และเซ็ตเกราะ Arcane Umbra Mage ครบ 6 ชิ้น
     - ปลดล็อกและอัปเกรด HEXA Cores คลาส 6 ทุกคอร์ (Core 10000005, 10000057, 20000005, 20000055, 20000105, 20000151, 30000020-30000023, 40000000 Sol Janus) เลเวล 30 เต็ม พร้อมมอบสกิลเสริมครบถ้วนทุกสกิล (`2341001`, `2341003`, `2341005`, `2341008`, `2341010`, `2341012`, `2341501-2341504`, `2341508`)

### 🧪 Verification & Deployment
- คอมไพล์ผ่าน Maven OpenJDK 21: `BUILD SUCCESS` (0 errors, total time: 3m 10s)
- ดีพลอย Fat JAR: `Server263/maplestory.jar` (~138.64 MB)
- สร้างไฟล์แพตช์อัปเดตแบบเบา: [`Patches/Server263_Patch_20261012_1208.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches) ขนาด 121.61 MB

---

## 📅 [2026-10-12 12:02 น.] Phase 2: Explorer Class 5 (Ice/Lightning Arch Mage - 222) สมบูรณ์แบบ 100% — เชื่อมต่อ Frozen Lightning, Parabolic Bolt และคำสั่ง !endgame

### 🎯 Scope
ลงทะเบียนและตรวจสอบสกิลคลาส 6 สาย Explorer อาชีพที่ 5: **Ice/Lightning Arch Mage (จอมเวทน้ำแข็ง/สายฟ้า - Job ID 222)** บรรจุสกิล Origin (Frozen Lightning & Ascent Skill: Parabolic Bolt) และ HEXA Masteries ครบชุด (HEXA Chain Lightning, HEXA Chain Lightning Tile, HEXA Frozen Orb, HEXA Blizzard, HEXA Blizzard FA, HEXA Lightning Orb, HEXA Lightning Orb 2, Cryo Shock, HEXA Thunder Sphere, HEXA Thunder Sphere Stay, HEXA Elquines) เชื่อมต่อบัฟสถานะ SixthFrozenLightning และคำสั่งทดสอบ `!endgame il` หรือ `!endgame icelightning` ให้มอบอาวุธ BiS Arcane Umbra Staff, Princess No's Ice Orb, และ HEXA Cores ระดับ 30 เต็มระบบ

### 📂 Files Modified
- [`v214 src/.../IceLightning.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/magician/IceLightning.java)
- [`v214 src/.../SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`v214 src/.../AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)

### 🛠️ Issues Identified & Fixes Applied
1. **Frozen Lightning Origin Skill ID Correction**:
   - ปัญหา: เดิมใน `IceLightning.java` กำหนด Constant `FROZEN_LIGHTING = 2241503;` ซึ่งเป็นเพียงรหัส Sub-attack ไม่ใช่รหัสหลักของ Origin Skill ส่งผลให้ระบบ Origin สากล (7s Absolute Invincibility, Cutscene, 10s Absolute Freeze, 20s Origin Debuff) ไม่ทำงาน
   - วิธีแก้: ปรับแก้เป็น `FROZEN_LIGHTNING = 2241500;` (ตรงตาม Core 10000004 ใน HexaCore.img.xml) และกำหนด `FROZEN_LIGHTNING_SUB = 2241503;` พร้อมเชื่อมต่อใน `handleSkill()` ให้ฮีลเลือด/มานา 100% และมอบบัฟ `SixthFrozenLightning` (30 วินาที)
2. **Parabolic Bolt Ascent Skill Support**:
   - ปัญหา: สกิล `PARABOLIC_BOLT` (`2241505`) ยังขาดการฟื้นฟูพลังชีวิตในการร่าย
   - วิธีแก้: เพิ่มการดักจับ `case PARABOLIC_BOLT:` ให้ฟื้นฟูเลือด 50%
3. **Sub-Skill Redirection in SkillConstants**:
   - ปัญหา: การโจมตีต่อเนื่องของ `HEXA_CHAIN_LIGHTNING_TILE` (`2241001`), `HEXA_BLIZZARD_FA` (`2241004`), `HEXA_THUNDER_SPHERE_STAY` (`2241008`), `HEXA_LIGHTNING_ORB_2` (`2241010`), และ `PARABOLIC_BOLT_SA` (`2241506`) เป็นสกิลที่ซ่อนอยู่ใน WZ (`invisible = 1`)
   - วิธีแก้: เพิ่มการจับคู่ใน `SkillConstants.getActualSkillIDfromSkillID()` เพื่อเชื่อมโยงเลเวลและความเสียหายได้อย่างแม่นยำ 100%
4. **Full Testing Automation in `!endgame il`**:
   - ใน `AdminCommands.setupEndgame()`:
     - มอบอาวุธระดับเทพ: Arcane Umbra Staff (`1382265`)
     - มอบไอเทมลูกแก้วน้ำแข็งรอง BiS: Princess No's Ice Orb (`1352246`)
     - มอบ Mitra Magician Emblem (`1190557`) และเซ็ตเกราะ Arcane Umbra Mage ครบ 6 ชิ้น
     - ปลดล็อกและอัปเกรด HEXA Cores คลาส 6 ทุกคอร์ (Core 10000004, 10000056, 20000004, 20000054, 20000104, 20000150, 30000016-30000019, 40000000 Sol Janus) เลเวล 30 เต็ม พร้อมมอบสกิลเสริมครบถ้วนทุกสกิล (`2241001`, `2241004`, `2241008`, `2241010`, `2241501`, `2241503`, `2241504`, `2241506`)

### 🧪 Verification & Deployment
- คอมไพล์ผ่าน Maven OpenJDK 21: `BUILD SUCCESS` (0 errors, total time: 1m 36s)
- ดีพลอย Fat JAR: `Server263/maplestory.jar` (~138.64 MB)
- สร้างไฟล์แพตช์อัปเดตแบบเบา: [`Patches/Server263_Patch_20261012_1201.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches) ขนาด 121.61 MB

---

## 📅 [2026-10-12 11:55 น.] Phase 2: Explorer Class 4 (Fire/Poison Arch Mage - 212) สมบูรณ์แบบ 100% — เชื่อมต่อ Infernal Venom, Immortal Flame และคำสั่ง !endgame

### 🎯 Scope
ลงทะเบียนและตรวจสอบสกิลคลาส 6 สาย Explorer อาชีพที่ 4: **Fire/Poison Arch Mage (จอมเวทไฟ/พิษ - Job ID 212)** บรรจุสกิล Origin (Infernal Venom & Ascent Skill: Immortal Flame) และ HEXA Masteries ครบชุด (HEXA Flame Sweep, HEXA Flame Sweep Giant, HEXA Flame Sweep Extra, HEXA Flame Haze, HEXA Poison Mist, HEXA Mist Eruption, HEXA Inferno Aura, HEXA Ignite, HEXA Ignite AA, HEXA Ifrit, HEXA Creeping Toxin, HEXA Creeping Toxin Extra, HEXA Meteor Shower, HEXA Meteor Shower FA, HEXA Megiddo Flame Manual/Auto/Explosion) เชื่อมต่อระบบ Fervent Drain / Elemental Drain, Ignite AA และคำสั่งทดสอบ `!endgame fp` หรือ `!endgame firepoison` ให้มอบอาวุธ BiS Arcane Umbra Staff, Princess No's Poison Orb, และ HEXA Cores ระดับ 30 เต็มระบบ

### 📂 Files Modified
- [`v214 src/.../FirePoison.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/magician/FirePoison.java)
- [`v214 src/.../SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`v214 src/.../AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)

### 🛠️ Issues Identified & Fixes Applied
1. **Infernal Venom Origin & Immortal Flame Ascent Integration**:
   - ปัญหา: เดิมยังขาด Constants และการรองรับ `INFERNAL_VENOM` (`2141500`), `IMMORTAL_FLAME` (`2141504`), และ `IMMORTAL_FLAME_SUB` (`2141505`) ส่งผลให้การกดใช้ Origin ไม่เกิดการฟื้นฟูเลือด/มานาเต็ม และไม่เปิดบัฟ `SixthDotBasedBuff` (ดาเมจตามจำนวน DoT)
   - วิธีแก้: ใน `FirePoison.handleSkill()`, เพิ่ม `case INFERNAL_VENOM:` ให้ฮีล HP/MP 100% และมอบสถานะ `SixthDotBasedBuff` (ระยะเวลา 20 วินาที) และ `case IMMORTAL_FLAME:` ให้ฟื้นฟูพลังชีวิต 50%
2. **BurnedInfo & Fervent Drain DoT Registration**:
   - ปัญหา: สกิลคลาส 6 ใหม่ เช่น `HEXA_FLAME_SWEEP_GIANT` (`2141001`), `HEXA_FLAME_SWEEP_EXTRA` (`2141002`), `INFERNAL_VENOM`, และ `IMMORTAL_FLAME` ยังไม่ได้ลงทะเบียนใน `handleDebuffOnMob()` ทำให้มอนสเตอร์ไม่ติดสถานะ Burn/DoT ซึ่งจำเป็นอย่างยิ่งในการเพิ่ม Stack ของ Elemental Drain
   - วิธีแก้: บรรจุสกิลทั้งหมดเข้าสู่สวิตช์สร้าง `BurnedInfo` ใน `handleDebuffOnMob()` ทุกครั้งที่โจมตีถูกเป้าหมาย
3. **HEXA Poison Mist Eruption Cleanup**:
   - ปัญหา: ใน `handleSkill()`, การกดระเบิดหมอกพิษ (`MIST_ERUPTION` / `HEXA_MIST_ERUPTION`) ลบเฉพาะหมอกพิษรหัสเดิม (`POISON_MIST`) แต่ไม่ลบหมอกคลาส 6 (`HEXA_POISON_MIST` - `2141004`)
   - วิธีแก้: ขยายเงื่อนไขการค้นหา AffectedArea ให้ครอบคลุมทั้ง `POISON_MIST` และ `HEXA_POISON_MIST`
4. **HEXA Ignite Auto-Activation**:
   - ปัญหา: เมื่อมีสกิล `HEXA_IGNITE` เมธอด `applyIgniteOnMob()` ยังสร้างอาณาเขตไฟของคลาส 4 เดิม (`IGNITE_AA`)
   - วิธีแก้: เปลี่ยนการสร้างพื้นไฟเป็น `HEXA_IGNITE_AA` (`2140008`) เมื่อตัวละครมีสกิล `HEXA_IGNITE`
5. **Sub-Skill Redirection in SkillConstants**:
   - ปัญหา: การโจมตีต่อเนื่องของ Flame Sweep Extra (`2141002`) และ Immortal Flame Sub (`2141505`) เป็นสกิลที่ซ่อนอยู่ใน WZ (`invisible = 1`)
   - วิธีแก้: เพิ่มการจับคู่ `case 2141002: return 2141000;` และ `case 2141505: return 2141504;` ใน `SkillConstants.getActualSkillIDfromSkillID()`
6. **Full Testing Automation in `!endgame fp`**:
   - ใน `AdminCommands.setupEndgame()`:
     - มอบอาวุธระดับเทพ: Arcane Umbra Staff (`1382265`)
     - มอบไอเทมลูกแก้วพิษรอง BiS: Princess No's Poison Orb (`1352236`)
     - มอบ Mitra Magician Emblem (`1190557`) และเซ็ตเกราะ Arcane Umbra Mage ครบ 6 ชิ้น
     - ปลดล็อกและอัปเกรด HEXA Cores คลาส 6 ทุกคอร์ (Core 10000003, 10000055, 20000003, 20000053, 20000103, 20000149, 30000012-30000015, 40000000 Sol Janus) เลเวล 30 เต็ม พร้อมมอบสกิลเสริมครบถ้วนทุกสกิล (`2141001`, `2141002`, `2141004`, `2140008`, `2141011`, `2140013`, `2141015`, `2141016`, `2141501`, `2141505`)

### 🧪 Verification & Deployment
- คอมไพล์ผ่าน Maven OpenJDK 21: `BUILD SUCCESS` (0 errors, total time: 1m 17s)
- ดีพลอย Fat JAR: `Server263/maplestory.jar` (~138.64 MB)
- สร้างไฟล์แพตช์อัปเดตแบบเบา: [`Patches/Server263_Patch_20261012_1154.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches) ขนาด 121.61 MB

---

## 📅 [2026-10-12 11:50 น.] Phase 2: Explorer Class 3 (Dark Knight - 132) สมบูรณ์แบบ 100% — เชื่อมต่อ Dead Space, Dark Halidom และคำสั่ง !endgame

### 🎯 Scope
ลงทะเบียนและตรวจสอบสกิลคลาส 6 สาย Explorer อาชีพที่ 3: **Dark Knight (อัศวินแห่งความมืด - Job ID 132)** บรรจุสกิล Origin (Dead Space & Finisher: Dark Halidom) และ HEXA Masteries ครบชุด (HEXA Gungnir's Descent, HEXA Dark Impale, Dark Bident, HEXA Nightshade Explosion, HEXA Revenge of the Evil Eye, Evil Eye Punishment, HEXA Final Attack, HEXA Evil Eye Shock, HEXA Evil Eye Shock Shoot) เชื่อมต่อระบบ Dark Resonance ไม่คิดคูลดาวน์ HEXA Gungnir และคำสั่งทดสอบ `!endgame darkknight` หรือ `!endgame drk` ให้มอบอาวุธ BiS Arcane Umbra Spear, Princess No's Flower Chain, และ HEXA Cores ระดับ 30 เต็มระบบ

### 📂 Files Modified
- [`v214 src/.../DarkKnight.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/warrior/DarkKnight.java)
- [`v214 src/.../SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`v214 src/.../AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)

### 🛠️ Issues Identified & Fixes Applied
1. **Dark Resonance No-Cooldown on HEXA Gungnir**:
   - ปัญหา: เมื่อตัวละครติดสถานะ Dark Resonance สกิล Gungnir's Descent ปกติจะสามารถกดรัวได้โดยไม่ติดคูลดาวน์ แต่ `alterCooldownSkill()` ยังไม่ได้ลงทะเบียน `HEXA_GUNGNIR_DESCENT` (`1341000`) ส่งผลให้เมื่ออัปเกรดคลาส 6 ยังคงติดคูลดาวน์ตามเดิม
   - วิธีแก้: ใน `DarkKnight.alterCooldownSkill()`, เพิ่มเงื่อนไข `skillId == HEXA_GUNGNIR_DESCENT` ร่วมกับ `GUNGNIR_DESCENT` ให้คืนค่า `0` ทันทีเมื่อมีบัฟ `DARK_RESONANCE`
2. **Dead Space Origin Activation & Full HP Recovery**:
   - ปัญหา: การร่าย Origin Skill `DEAD_SPACE` (`1341500`) ยังขาดการฟื้นฟูเลือดเต็มและเปิดใช้งานสถานะบัฟดาเมจของ Dark Resonance
   - วิธีแก้: ใน `handleSkill()`, เพิ่ม `case DEAD_SPACE:` ฟื้นฟู HP 100% เต็มทันที พร้อมมอบบัฟ `IndieDamR`, `IndieIgnoreMobpdpR`, และ `IndieBDR` ตามอัตราของ Dark Resonance
3. **Dark Halidom Finisher Sub-Skill Mapping (1341503 -> 1341502)**:
   - ปัญหา: สกิลปิดฉาก Dark Halidom ส่ง Action ย่อยรหัส `1341503` ซึ่งเป็นสกิลที่ซ่อนอยู่ใน WZ (`invisible = 1`)
   - วิธีแก้: ใน `SkillConstants.getActualSkillIDfromSkillID()`, เพิ่ม `case 1341503: return 1341502;` เพื่อเชื่อมโยงเลเวลและความเสียหายของ Dark Halidom ได้ถูกต้อง 100%
4. **HEXA Constants & Skill Support**:
   - เพิ่ม Constants `DEAD_SPACE` (`1341500`), `DEAD_SPACE_ATTACK` (`1341501`), `DARK_HALIDOM` (`1341502`), `DARK_HALIDOM_ATTACK` (`1341503`), และ `EVIL_EYE_PUNISHMENT` (`1341006`)
   - รองรับ `HEXA_REVENGE_OF_THE_EVIL_EYE` ใน `handleHit()` และ `HEXA_EVIL_EYE_SHOCK` ใน `handleSetCoolDownSkill()`
5. **Full Testing Automation in `!endgame darkknight`**:
   - ใน `AdminCommands.setupEndgame()`:
     - มอบอาวุธระดับเทพ: Arcane Umbra Spear (`1432218`)
     - มอบไอเทมโซ่รอง BiS: Princess No's Flower Chain (`1352226`)
     - มอบ Mitra Warrior Emblem (`1190555`) และเซ็ตเกราะ Arcane Umbra Warrior ครบ 6 ชิ้น
     - ปลดล็อกและอัปเกรด HEXA Cores คลาส 6 ทุกคอร์ (Core 10000002, 10000054, 20000002, 20000052, 20000102, 20000148, 30000008-30000011, 40000000 Sol Janus) เลเวล 30 เต็ม พร้อมมอบสกิลเสริมครบถ้วนทุกสกิล (`1341002`, `1341005`, `1341006`, `1341009`, `1341501`, `1341503`)

### 🧪 Verification & Deployment
- คอมไพล์ผ่าน Maven OpenJDK 21: `BUILD SUCCESS` (0 errors, total time: 1m 22s)
- ดีพลอย Fat JAR: `Server263/maplestory.jar` (~138.64 MB)
- สร้างไฟล์แพตช์อัปเดตแบบเบา: [`Patches/Server263_Patch_20261012_1149.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches) ขนาด 121.61 MB

---

## 📅 [2026-10-12 11:41 น.] Phase 2: Explorer Class 2 (Paladin - 122) สมบูรณ์แบบ 100% — เชื่อมต่อ Sacred Bastion, Dominus Oblivion และคำสั่ง !endgame

### 🎯 Scope
ลงทะเบียนและตรวจสอบสกิลคลาส 6 สาย Explorer อาชีพที่ 2: **Paladin (อัศวินศักดิ์สิทธิ์ - Job ID 122)** บรรจุสกิล Origin (Sacred Bastion & Finisher: Dominus Oblivion) และ HEXA Masteries ครบชุด (HEXA Blast, HEXA Divine Judgment, HEXA Divine Charge, Falling Justice, Rising Justice, HEXA Heaven's Hammer, HEXA Final Attack) เชื่อมต่อระบบชาร์จธาตุ Elemental Charge และคำสั่งทดสอบ `!endgame paladin` ให้มอบอาวุธ BiS Arcane Umbra Hammer, Princess No's Rosary, และ HEXA Cores ระดับ 30 เต็มระบบ

### 📂 Files Modified
- [`v214 src/.../Paladin.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/warrior/Paladin.java)
- [`v214 src/.../SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`v214 src/.../AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)

### 🛠️ Issues Identified & Fixes Applied
1. **Paladin Origin & Finisher Missing Implementation**:
   - ปัญหา: เดิมใน `Paladin.java` มีเพียงชื่อ Constant `SACRED_BASTION` แต่ไม่เคยถูกดักจับใน `handleSkill()` ทำให้เมื่อผู้เล่นกดร่ายสกิลคลาส 6 `1241500` จะไม่เกิดบัฟ Sacred Bastion และไม่สร้างอาณาเขตศักดิ์สิทธิ์บนพื้น
   - วิธีแก้: ใน `handleSkill()`, เพิ่ม `case SACRED_BASTION:` ควบคู่กับ `SACRED_BASTION_TILE` ให้สร้าง `AffectedArea` บนตำแหน่งตัวละคร มอบบัฟ `SacredBastion`, ชาร์จเกจธาตุเต็มแม็กซ์ (`giveChargeBuff`), และเพิ่มการดักจับ `case DOMINUS_OBLIVION:` เมื่อกดใช้สกิลปิดฉากจะเคลียร์บัฟศักดิ์สิทธิ์และมอบเกจเต็ม
2. **Dominus Oblivion Sub-Skill Mapping (1241505 -> 1241504)**:
   - ปัญหา: การโจมตีของ Dominus Oblivion ส่ง Action ย่อยรหัส `1241505` ซึ่งเป็นสกิลที่ซ่อนอยู่ใน WZ (`invisible = 1`) ทำให้ระบบค้นหาเลเวลสกิลไม่พบ
   - วิธีแก้: ใน `SkillConstants.getActualSkillIDfromSkillID()`, เพิ่มการจับคู่ `case 1241505: return 1241504;` เพื่อให้อ่านค่าดาเมจและเลเวลตาม Dominus Oblivion ของ Core 10000053 ได้อย่างแม่นยำ
3. **HEXA Constants Alignment**:
   - เพิ่ม Constants `DOMINUS_OBLIVION` (`1241504`), `DOMINUS_OBLIVION_HIT` (`1241505`), และ `HEXA_HEAVENS_HAMMER_IMPACT` (`1241010`) ใน `Paladin.java` ให้ตรงตามโครงสร้าง WZ
4. **Full Testing Automation in `!endgame paladin`**:
   - ใน `AdminCommands.setupEndgame()`:
     - มอบอาวุธระดับเทพ: Arcane Umbra Two-handed Hammer (`1422189`)
     - มอบไอเทมโล่/ลูกประคำรอง BiS: Princess No's Rosary (`1352216`)
     - มอบ Mitra Warrior Emblem (`1190555`) และเซ็ตเกราะ Arcane Umbra Warrior ครบ 6 ชิ้น
     - ปลดล็อกและอัปเกรด HEXA Cores คลาส 6 ทุกคอร์ (Core 10000001, 10000053, 20000001, 20000051, 20000101, 20000147, 30000004-30000007, 40000000 Sol Janus) เลเวล 30 เต็ม พร้อมมอบสกิลเสริมครบถ้วนทุกสกิล (`1241002`, `1241004`, `1241006`, `1241010`, `1241501-1241503`, `1241505`)

### 🧪 Verification & Deployment
- คอมไพล์ผ่าน Maven OpenJDK 21: `BUILD SUCCESS` (0 errors, total time: 3m 09s)
- ดีพลอย Fat JAR: `Server263/maplestory.jar` (~138.64 MB)
- สร้างไฟล์แพตช์อัปเดตแบบเบา: [`Patches/Server263_Patch_20261012_1140.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches) ขนาด 121.61 MB

---

## 📅 [2026-10-12 11:32 น.] Phase 2: Explorer Class 1 (Hero - 112) สมบูรณ์แบบ 100% — เชื่อมต่อ HEXA Matrix, Origin Skill และคำสั่ง !endgame

### 🎯 Scope
ลงทะเบียนและตรวจสอบสกิลคลาส 6 สาย Explorer อาชีพแรก: **Hero (นักรบดาบใหญ่/ขวานใหญ่ - Job ID 112)** บรรจุสกิล Origin (Spirit Calibur & Ultrasonic Slash) และ HEXA Masteries ครบชุด เชื่อมต่อระบบ Combo Instinct และเมคานิกเกจ Combo Counter พร้อมเชื่อมต่อคำสั่งทดสอบ `!endgame hero` ให้มอบอุปกรณ์ BiS, V-Matrix, และ HEXA Cores ระดับ 30 เต็มระบบ

### 📂 Files Modified
- [`v214 src/.../Hero.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/warrior/Hero.java)
- [`v214 src/.../HexaCore.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/loaders/Etc/HexaCore/HexaCore.java)
- [`v214 src/.../AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)

### 🛠️ Issues Identified & Fixes Applied
1. **Hero HEXA & Origin Skill Constants & Matrix Alignment**:
   - ปัญหา: ใน `Hero.java` ขาดการนิยาม Constants สำคัญ ได้แก่ `SPIRIT_CALIBUR` (1141500), `SPIRIT_CALIBUR_ATTACK` (1141501), `SPIRIT_CALIBUR_SLASH` (1141502), `HEXA_RAGING_BLOW` (1141000), `HEXA_RAGING_BLOW_ENRAGED` (1141001), และ `FINAL_BLADE` (1141004)
   - วิธีแก้: เพิ่ม Constants ครบถ้วนทุกสกิลตามโครงสร้างทางการของ v265 จาก `HexaCore.img.xml` และ `114.xml`
2. **Combo Instinct (V-Skill) Seamless Trigger with HEXA Raging Blow**:
   - ปัญหา: ใน `Hero.handleAttack()`, การตรวจสอบสกิล Combo Instinct ตรวจสอบเฉพาะ Raging Blow คลาส 4 (`1121008` และ `1120017`) ทำให้เมื่อผู้เล่นอัปเกรดเป็น HEXA Raging Blow (`1141000` / `1141001`) จะไม่เกิดการโจมตีโบนัสรอยแยกมิติ (Combo Instinct Rifts)
   - วิธีแก้: เพิ่ม `skillID == HEXA_RAGING_BLOW || skillID == HEXA_RAGING_BLOW_ENRAGED` ในเงื่อนไขการทริกเกอร์ `comboInstinctAttack` ส่งผลให้ฟันเร็วต่อเนื่องและเกิดรอยแยกมิติ 100%
3. **Hero Origin Combo Maximize & Spam Prevention**:
   - ใน `Hero.handleSkill()`: เพิ่ม `case SPIRIT_CALIBUR: addCombo(getMaxCombo());` เพื่อให้เมื่อร่าย Spirit Calibur ตัวละครจะได้รับ Combo Orbs เต็มแม็กซ์ (11 ลูก) ทันที
   - ใน `isComboIgnoreSkill()`: เพิ่ม `HEXA_PUNCTURE`, `SPIRIT_CALIBUR_ATTACK`, และ `SPIRIT_CALIBUR_SLASH` เพื่อป้องกันการสแปมบวกเกจซ้ำซ้อนขณะอนิเมชันคัทซีน
4. **Universal HEXA Core Query via `HexaCore.getJobCore(jobID)`**:
   - สร้างเมธอด `HexaCore.getJobCore(int jobID)` ใน `HexaCore.java` เพื่อให้สามารถดึงข้อมูล Core ทั้งหมดของแต่ละอาชีพ (Activate / Mastery / Enforce / Common) ได้โดยตรงจาก WZ
5. **Full Testing Automation in `!endgame hero`**:
   - ใน `AdminCommands.setupEndgame()`:
     - มอบอาวุธ Arcane Umbra Two-handed Sword (`1402259`)
     - มอบไอเทมโล่/เหรียญรอง BiS: Princess No's Medal (`1352206`)
     - มอบ Mitra Warrior Emblem (`1190555`) และเซ็ตเกราะ Arcane Umbra ครบชุด
     - ปลดล็อกและอัปเกรด HEXA Cores คลาส 6 ทุกคอร์ (Core 10000000, 10000052, 20000000, 20000050, 20000100, 20000146, 30000000-30000003, 40000000 Sol Janus) เป็นเลเวล 30 เต็ม พร้อมมอบสกิลพิเศษ Enraged Raging Blow (`1141001`) และ Spirit Calibur Action (`1141501`) เลเวล 30
     - ส่งแพ็กเก็ต `WvsContext.hexaSkillsUpdate(chr)` อัปเดต UI หน้าจอ HEXA Matrix ทันที

### 🧪 Verification & Deployment
- คอมไพล์ผ่าน Maven OpenJDK 21: `BUILD SUCCESS` (0 errors, total time: 1m 20s)
- ดีพลอย Fat JAR: `Server263/maplestory.jar` (~138.64 MB)
- สร้างไฟล์แพตช์อัปเดตแบบเบา: [`Patches/Server263_Patch_20261012_1129.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches) ขนาด 121.61 MB

---

## 📅 [2026-10-12 11:18 น.] ปรับปรุงระบบสกิลคลาส 6 ให้ครอบคลุมทุกอาชีพ และแก้ปัญหาสถานะ OriginDebuff / Freeze (Universal 6th Job Origin Engine)

### 🎯 Scope
แก้ไขปัญหาเมคานิกสกิลคลาส 6 (Origin Skills) ไม่ติดสถานะ Freeze (Absolute Bind 10 วินาที) และ OriginDebuff (20 วินาที) ในมอนสเตอร์และบอสสำหรับอาชีพส่วนใหญ่ และสร้าง Universal Sub-Skill Redirection ครอบคลุมทั้ง 40+ อาชีพ ให้การคำนวณดาเมจและการอ่านเลเวลสกิลของ Action ย่อยในคัทซีนทำงานได้อย่างสมบูรณ์แบบ 100%

### 📂 Files Modified
- [`v214 src/.../SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`v214 src/.../Job.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java)
- [`v214 src/.../MobTemporaryStat.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/life/mob/MobTemporaryStat.java)

### 🛠️ Issues Identified & Fixes Applied
1. **Universal Origin Sub-Skill Redirection**:
   - ปัญหา: เมื่อผู้เล่นใช้สกิล Origin ไคลเอนต์จะส่งแพ็กเก็ตการโจมตีย่อย (`xxx41501`, `xxx41502` ฯลฯ) ซึ่งเดิมใน `SkillConstants.getActualSkillIDfromSkillID()` มีการฮาร์ดโค้ดแมปไว้เพียง 5 อาชีพ ทำให้อีก 35+ อาชีพที่เหลือ (รวมถึง Explorer ทั้งหมด) ตัวเกมมองว่ามีเลเวลสกิลเป็น 0 หรือไม่พบดาเมจ
   - วิธีแก้: ออกแบบ Universal Algorithm ใน `default:` case ของ `getActualSkillIDfromSkillID()`: ตรวจสอบแพทเทิร์น `subOrigin > 41500 && subOrigin <= 41599` รวมถึง Dual Blade (`4361501+`) และ Evan (`22201501+`) และรีไดเรกต์กลับสู่ Base Origin ID (`(skillID / 100) * 100`) โดยอัตโนมัติหากมีข้อมูลใน WZ
2. **Absolute Freeze 10s & OriginDebuff 20s Parity**:
   - ปัญหา: ใน `Job.handleAttack()`, `rOption` ของการติดสถานะ Freeze และ OriginDebuff ถูกบันทึกเป็นรหัส Action ย่อย ทำให้ระบบคำนวณคูลดาวน์การติดดีบัฟคลาดเคลื่อน
   - วิธีแก้: ดึง `actualOriginId = SkillConstants.getActualSkillIDfromSkillID(skillID)` มาเป็น `rOption` สม่ำเสมอทุกอาชีพ
3. **MobBindInfo Registration in MobTemporaryStat**:
   - ปัญหา: ใน `MobTemporaryStat.java` (บรรทัด 259 และ 373) มีการตรวจสอบเฉพาะ `option.rOption == Job.ORIGIN_SKILL` ทำให้ Origin Skill ของแต่ละอาชีพหลุดไปตกในบล็อกของ Stun ธรรมดา และไม่ได้บันทึก `MobBindInfo` คูลดาวน์การกัน Bind 100 วินาทีตามทางการ
   - วิธีแก้: เพิ่มการตรวจสอบ `Job.isOriginSkill(option.rOption)` ในทั้งสองจุด เพื่อให้บอสได้รับสถานะ Absolute Bind และติดคูลดาวน์กัน Bind 100 วินาทีอย่างถูกต้องตามออฟฟิเชียล

### 🧪 Verification & Deployment
- คอมไพล์ผ่าน Maven: `BUILD SUCCESS` (0 errors)
- สร้าง Fat JAR `maplestory.jar` (~138.64 MB) และส่งมอบไปยัง `Server263/maplestory.jar`, `v214 src/maplestory.jar`, และ Root `maplestory.jar`
- สร้างไฟล์แพตช์อัปเดตแบบเบา: [`Patches/Server263_Patch_20261012_1117.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches) ขนาด 121.61 MB

---

## 📅 [2026-10-12 11:05 น.] ปรับปรุงเอกสาร README ทั้งระบบ และสร้าง Agent Skill คู่มือพัฒนาฉบับสมบูรณ์ (Overhaul READMEs, Agent Skills & Standards)

### 🎯 Scope
ปรับปรุงและยกเครื่องเอกสาร README ทั้งระบบ (Root `README.md`, `v214 src/README.md`, `v214 src/PORTABLE_README.md`) ให้สะท้อนข้อมูลปัจจุบัน 100% ไม่มีความคลาดเคลื่อน และสร้าง Agent Skill ประจำโปรเจกต์ (`maplestory-server-runner` / `maplestory-bug-knowledge`) ลงในทั้ง Local และ Global Customization Roots ตามมาตรฐานของ IDE

### 📂 Files Modified
- [`README.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/README.md) *(New)*
- [`v214 src/README.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/README.md)
- [`v214 src/PORTABLE_README.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/PORTABLE_README.md)
- [`.agents/skills/maplestory-server-runner/SKILL.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/.agents/skills/maplestory-server-runner/SKILL.md) *(New)*
- [`.agents/skills/maplestory-bug-knowledge/SKILL.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/.agents/skills/maplestory-bug-knowledge/SKILL.md) *(New)*
- [`C:\Users\admin\.gemini\config\skills\maplestory-server-runner\SKILL.md`](file:///C:/Users/admin/.gemini/config/skills/maplestory-server-runner/SKILL.md) *(New)*
- [`.agents/rules/progress-logging-standard.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/.agents/rules/progress-logging-standard.md) *(New)*
- [`AGENTS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/AGENTS.md)

### 🛠️ Issues Identified & Fixes Applied
1. **Root README Missing & Obsolete Information**:
   - ปัญหา: โฟลเดอร์ Root ขาด `README.md` ขณะที่ `v214 src/README.md` เดิมมีข้อมูลเก่าค้างจากปี 2022 (v179 / Java 16) และ `PORTABLE_README.md` ยังระบุพอร์ต 3306 เดิม
   - วิธีแก้: สร้าง Root `README.md` ใหม่ สรุปจุดเด่น สถาปัตยกรรม พอร์ต 33066, ระบบ Multi-Network, บอส 129 ตัว, สกิลคลาส 6, ขั้นตอนรันและคอมไพล์โค้ดอย่างแม่นยำ
2. **Agent Skill Master Guide Creation**:
   - สร้าง Agent Skill `maplestory-server-runner` บันทึกกฎเหล็ก 5 ข้อ, สถาปัตยกรรม MariaDB 33066, HEXA Matrix standards, Universal Boss architecture, และคำสั่งลับ `!endgame` บรรจุทั้งใน Workspace และ Global config

---

## 📅 [2026-10-11] Full Audit & Stability Enhancement: Nova (Angelic Buster, Kaiser) & Sengoku (Hayato, Kanna) + !endgame Parity

### 🎯 Scope
Conduct a comprehensive class audit for Nova branch (**Angelic Buster**, **Kaiser**) and Sengoku branch (**Hayato**, **Kanna**) spanning 1st–4th Job, 5th Job (V-Matrix V 1–4), and 6th Job (HEXA Matrix Origin and Mastery skills). Fix sub-action packet routing, stance mechanics, energy/mana regeneration, freeze/OriginDebuff application, correct secondary and emblem item IDs from WZ data, and implement full `!endgame` command support.

### 📂 Files Modified
- [`v214 src/.../SkillConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`v214 src/.../JobConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/JobConstants.java)
- [`v214 src/.../Hayato.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/sengoku/Hayato.java)
- [`v214 src/.../Kanna.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/sengoku/Kanna.java)
- [`v214 src/.../Kaiser.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/Kaiser.java)
- [`v214 src/.../AngelicBuster.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/AngelicBuster.java)
- [`v214 src/.../JobSkillHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/user/JobSkillHandler.java)
- [`v214 src/.../Job.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java)
- [`v214 src/.../AdminCommands.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)

### 🛠️ Issues Identified & Fixes Applied

1. **Hayato Skill & Energy Engine Modernization**:
   - **Sub-Skill Redirection**: Added 1st–4th job combo strikes (`41001004-08` -> `41001000`, `41101008-09` -> `41101000`, `41111011-12` -> `41111000`, `41121011-12` -> `41121000`), HEXA Rai Sanrenzan (`41141001-03` -> `41141000`), Origin Jin Quick Draw (`41141501-04` -> `41141500`), and HEXA Hitokiri Strike Angle (`41141008` -> `41141007`) in `SkillConstants.getActualSkillIDfromSkillID`.
   - **Sword Energy Generation Fix**: Connected previously orphaned `incrementSwordEnergy()` into `handleAttack` so attacks naturally generate Sword Energy (+5 in Normal Stance, +2 in Quick Draw Stance) upon hitting mobs.
   - **HEXA Falcon's Honor & Jin Quick Draw**: Added `HEXA_FALCONS_HONOR` (`41141005`) to grant +100 Sword Energy, and Origin `JIN_QUICK_DRAW` (`41141500-04`) to replenish full 1,000 Sword Energy with 10s Absolute Freeze and 20s OriginDebuff.
   - **Localization Cleanup**: Replaced hardcoded Vietnamese notification strings (`Bạn không có đủ ít nhất 200 năng lượng kiếm...`) with clean English messages.

2. **Kanna Skill & Mana Vein Mechanics Modernization**:
   - **Sub-Skill Redirection**: Added 1st–4th job Shikigami combo strikes (`42001005-06` -> `42001000`, `42101101-02` -> `42101100`, `42111111-12` -> `42111110`, `42120027-28` -> `42120026`), HEXA Shikigami Haunting (`42141001-03` -> `42141000`), Origin Hakumenkonmou Juubi (`42141501-02` -> `42141500`), HEXA Tengu Strike (`42141013-14` -> `42141012`), and HEXA Doppelganger (`42141006` -> `42141005`).
   - **HEXA Mana Vein Spawning**: Registered `42141002` (HEXA Shikigami Haunting 3rd strike) in `SkillConstants.isSpiritWalkerSkill` to consistently spawn Mana Veins.
   - **Origin Hakumenkonmou Juubi**: Implemented instant Mana replenishment (`chr.healMP(chr.getMaxMP())`) and cooldown management with 10s Absolute Freeze and 20s OriginDebuff.
   - **Debuff Handling**: Linked `HEXA_SHIKIGAMI_HAUNTING` (1st, 2nd, 3rd strikes) to apply the slow debuff and BurnedInfo.

3. **Kaiser & Angelic Buster Enhancements (Previous Turn Parity)**:
   - Full sub-action mappings for Kaiser 6th Job HEXA Gigas Wave, Blade Burst, Tempest Blades, Inferno Breath, Wing Beat, and Nova Triumphant, as well as Angelic Buster Soul Seeker, Celestial Roar, Grand Finale, and Surprise Encore.
   - Morph Gauge generation for all Kaiser attacks and Nova Triumphant instant full Morph Gauge.

4. **`!endgame` Command & Gear WZ Parity**:
   - **Hayato**: Granted Arcane Umbra Katana (`1542117`), Wakizashi (`1352803`), Gold Crescent Emblem (`1191101` - Hayato class emblem, replacing incompatible Adele emblem `1190551`), and Warrior Arcane Umbra set.
   - **Kanna**: Granted Arcane Umbra Fan (`1552119`), Haku Fan (`1352813`), Gold Blossom Emblem (`1191103` - Kanna class emblem, replacing incompatible Kain emblem `1190553`), and Mage Arcane Umbra set.
   - **V-Matrix Auto-Population**: Fully automated delivery of 4 job-specific 5th Job V-Skills at Lv. 25 directly into the V-Matrix for both Hayato (`400011026, 400011029, 400011104, 400011138`) and Kanna (`400021017, 400021054, 400021078, 400021114`).

---

## 📅 [2026-10-11] Multi-Network Architecture, Zero-Install Account System & AuthHook Tooling

### 🎯 Scope
Analyze and resolve connectivity constraints for multi-networking (Localhost 127.0.0.1, LAN / same subnet, and Radmin VPN / Hamachi), build test scripts for `v263AuthHook`, implement a Zero-Install account registration architecture with auto-registration on first login, and provide simple batch utilities for IP and account management.

### 📂 Files Modified
- [`v263AuthHook/Client207/SockHook.cpp`](file:///c:/Users/admin/Documents/MapleV265Src/v263AuthHook/Client207/SockHook.cpp)
- [`v263AuthHook/Build_AuthHook.bat`](file:///c:/Users/admin/Documents/MapleV265Src/v263AuthHook/Build_AuthHook.bat) *(New)*
- [`v263AuthHook/Test_AuthHook.bat`](file:///c:/Users/admin/Documents/MapleV265Src/v263AuthHook/Test_AuthHook.bat) *(New)*
- [`v263AuthHook/test_hook.ps1`](file:///c:/Users/admin/Documents/MapleV265Src/v263AuthHook/test_hook.ps1) *(New)*
- [`v214 src/.../NettyClient.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/connection/netty/NettyClient.java)
- [`v214 src/.../Login.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/connection/packet/Login.java)
- [`v214 src/.../ClientSocket.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/ClientSocket.java)
- [`v214 src/.../LoginHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java)
- [`v214 src/.../Client.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/Client.java)
- [`v214 src/.../Char.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java)
- [`v214 src/.../ServerConfig.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/ServerConfig.java)
- [`v214 src/.../ApiRequestHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/ApiRequestHandler.java)
- [`v214 src/server.properties`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/server.properties)
- [`v214 src/Create_Account.bat`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/Create_Account.bat) *(New)*
- [`v214 src/Client_Patch_Files/Change_IP_or_Account.bat`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/Client_Patch_Files/Change_IP_or_Account.bat) *(New)*
- [`v214 src/4_Server_Control_Panel.bat`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/4_Server_Control_Panel.bat)

### 🛠️ Issues Identified & Fixes Applied

1. **Client-Side IP Hardcoding in `Localhost.dll` (`v263AuthHook`)**:
   - **Problem**: `Localhost.dll` hardcoded `#define OPT_ADDR_HOSTNAME "127.0.0.1"`, completely ignoring `IP` configurations in `launcher.ini`. Remote players connecting across LAN or Radmin VPN were forcibly rerouted to `127.0.0.1`, failing to reach the host server.
   - **Fix**: Updated `v263AuthHook/Client207/SockHook.cpp` to dynamically load `Server.IP` from `launcher.ini` via `GetPrivateProfileStringA` on module attachment, falling back to `127.0.0.1` if not found.
   - **Verification**: Created `Build_AuthHook.bat` and `Test_AuthHook.bat`. Recompiled `Localhost.dll` using MSVC toolset `v145` (0 errors, 318 KB) and verified 64-bit AMD64 PE headers and dynamic configuration loader strings.

2. **Simultaneous Multi-Network Server-Side Channel Routing**:
   - **Problem**: Previous channel migration packets encoded static `ServerConstants.CHANNEL_IP`. When host set `server.ip` to a LAN/VPN address, local host playing on `127.0.0.1` disconnected upon character select; conversely, if set to `127.0.0.1`, remote players disconnected.
   - **Fix**: Implemented `NettyClient.getEffectiveChannelIp()` inspecting the socket connection. Local loopback connections receive `127.0.0.1`, while remote connections receive the host interface/configured VPN IP. Passed `getEffectiveChannelIp()` across `Login.selectCharacterResult`, `ClientSocket.migrateCommand`, and `auctionHouseOut`.
   - **Outcome**: Host on `127.0.0.1`, friends on LAN `192.168.x.x`, and friends on Radmin VPN `26.x.x.x` can now play concurrently without IP conflicts.

3. **Zero-Install Account Architecture**:
   - **Tier 1 (Auto-Registration on First Login)**: Enhanced `ApiRequestHandler.java` (`handleTokenX64Request`). When `server.autoRegister=true` in `server.properties`, an unregistered username entering credentials in `launcher.ini` is automatically created with BCrypt hashing and granted a session token immediately.
   - **Tier 2 (1-Click Batch Tool: `Create_Account.bat`)**: Standalone tool utilizing portable MariaDB CLI to create accounts with custom roles (`Player`, `GameMaster`, `Admin` for `!item` spawning), list existing accounts, reset passwords, and auto-sync into `launcher.ini`.
   - **Tier 3 (Client Config Tool: `Change_IP_or_Account.bat`)**: User-friendly utility in `Client_Patch_Files` allowing non-technical players to adjust IP and credentials with 1 click.
   - **Control Panel Integration**: Added options `[8]` (Account Registration & Manager) and `[9]` (Configure Server IP) in `4_Server_Control_Panel.bat`.

---

## 📅 [2026-10-11] Root Abyss Boss Group: Von Bon Client Crash Fix & Universal Unlimited Entry

### 🎯 Scope
Diagnose and resolve the client crash ("เด้งออก") when entering Von Bon (บอสไก่), and standardize all 4 Root Abyss bosses (Pierre, Von Bon, Crimson Queen, Vellum in both Normal and Chaos difficulties) to allow infinite entries anytime via both the natural in-game Boss UI (Content Guide) and physical door portals/NPCs in Colossal Root, completely removing prequest requirements, daily lockouts, and entrance bouncing.

### 📂 Files Modified
- [`v214 src/.../Stage.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/connection/packet/Stage.java)
- [`v214 src/.../Char.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java)
- [`v214 src/.../Instance.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/world/field/Instance.java)
- [`v214 src/.../RootAbyss.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/world/boss/RootAbyss.java)
- [`v214 src/.../BossEntry.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/world/boss/BossEntry.java)
- [`v214 src/.../ScriptHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/script/ScriptHandler.java)
- [`v214 src/data/scripts/boss/rootafirstDoor.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/boss/rootafirstDoor.py)
- [`v214 src/data/scripts/boss/rootasecondDoor.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/boss/rootasecondDoor.py)
- [`v214 src/data/scripts/boss/rootathirdDoor.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/boss/rootathirdDoor.py)
- [`v214 src/data/scripts/boss/rootaforthDoor.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/boss/rootaforthDoor.py)
- [`v214 src/data/scripts/portal/rootafirstDoor.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/portal/rootafirstDoor.py)
- [`v214 src/data/scripts/portal/rootasecondDoor.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/portal/rootasecondDoor.py)
- [`v214 src/data/scripts/portal/rootathirdDoor.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/portal/rootathirdDoor.py)
- [`v214 src/data/scripts/portal/rootaforthDoor.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/portal/rootaforthDoor.py)
- [`v214 src/data/scripts/portal/rootaNext.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/portal/rootaNext.py)
- [`v214 src/data/scripts/portal/banbanGoInside.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/portal/banbanGoInside.py)
- [`v214 src/data/scripts/portal/pt_outrootaBoss.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/portal/pt_outrootaBoss.py)
- [`v214 src/data/scripts/portal/rootabyssOut.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/portal/rootabyssOut.py)
- [`v214 src/data/scripts/npc/1064012.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/npc/1064012.py)
- [`v214 src/data/scripts/npc/1064013.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/npc/1064013.py)
- [`v214 src/data/scripts/npc/1064014.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/npc/1064014.py)
- [`v214 src/data/scripts/npc/1064015.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/npc/1064015.py)
- [`v214 src/data/scripts/npc/rootaBossOut.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/npc/rootaBossOut.py)
- [`v214 src/data/scripts/reactor/banbanNormal.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/reactor/banbanNormal.py)
- [`v214 src/data/scripts/reactor/banbanChaos.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/reactor/banbanChaos.py)
- [`v214 src/data/scripts/reactor/queenNormal.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/reactor/queenNormal.py)
- [`v214 src/data/scripts/reactor/queenChaos.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/reactor/queenChaos.py)
- [`v214 src/data/scripts/reactor/bellumNormal.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/reactor/bellumNormal.py)
- [`v214 src/data/scripts/reactor/bellumChaos.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/reactor/bellumChaos.py)
- [`v214 src/data/scripts/field/vonbonInsideMob.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/field/vonbonInsideMob.py)
- [`v214 src/data/scripts/field/rootabyssTakeItem.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/field/rootabyssTakeItem.py)
- [`.agents/skills/maplestory-bug-knowledge/SKILL.md`](file:///c:/Users/admin/Documents/MapleV265Src/.agents/skills/maplestory-bug-knowledge/SKILL.md)

### 🛠️ Issues Identified & Fixes Applied

1. **Von Bon Client Crash ("เด้งออก") Root Cause**:
   - **Problem**: Warping into Von Bon Normal (`105200110`) or Chaos (`105200510`) immediately disconnected or crashed the v265 64-bit client.
   - **Root Cause**: An obsolete legacy v199 conditional in `Stage.java` (`if (FieldConstants.isVonbonField(chr.getFieldID())) outPacket.encodeByte(size);`) injected an unwanted byte into the `SET_FIELD` packet stream. The v265 client's `CStage::SetField` does not decode this byte, leading to an immediate offset misalignment in decoding player avatar/equip info and causing an access violation crash.
   - **Fix**: Removed the obsolete check entirely from `Stage.java`. Verified via client disassembly (`CMob::Init`) that the 1-byte decode in `Mob.encodeInit` (`is_banban_boss`) is correct for mob spawning and stays intact.

2. **Root Abyss Entrance Bouncing & Private Instance Isolation**:
   - **Problem**: Players entering Root Abyss corridors or boss maps without an active instance were forcefully bounced back to Colossal Root (`105200000`).
   - **Fix**: Modified `handleInstanceNull` in `Char.java`: whenever a player enters any Root Abyss map (`105200100`–`105200810`), the server automatically instantiates `new Instance(party/chr)`, registers all party members, sets the forced return map to `105200000`, and adds the instance to active server instances.
   - Set `hasBossPartyAttempt` in `Char.java` to unconditionally return `false`, enabling 100% infinite runs without daily/weekly lockouts for offline/LAN play.

3. **Door Portal & NPC Missing Script Resolution**:
   - **Problem**: In Colossal Root (`105200000`), pressing Up on doors looked for `ScriptType.Portal` in `data/scripts/portal/`, but scripts were stored only in `data/scripts/boss/`, displaying "Cánh cổng chưa được làm...". Clicking the door NPCs (`1064012`–`1064015`) did nothing.
   - **Fix**: Implemented interactive selection menus (Normal Mode, Chaos Mode, Boss UI) across all 3 script access points:
     - `portal/` (`rootafirstDoor.py`, `rootasecondDoor.py`, `rootathirdDoor.py`, `rootaforthDoor.py`)
     - `npc/` (`1064012.py`, `1064013.py`, `1064014.py`, `1064015.py`)
     - `boss/` (`rootafirstDoor.py`, `rootasecondDoor.py`, `rootathirdDoor.py`, `rootaforthDoor.py`)

4. **Boss Altar Reactor Triggers & Automatic Clean-up**:
   - **Problem**: Altars in boss rooms (`1058016`–`1058021`) had empty 0-byte scripts.
   - **Fix**: Implemented reactor scripts in `data/scripts/reactor/` calling `RootAbyss.spawn(field, chr, action)` and enhanced `RootAbyss.java` with `cleanReactor()` to automatically remove the altar upon boss emergence.

5. **Corridor Portal Bridges & Exit Flow**:
   - Updated `data/scripts/portal/rootaNext.py` to seamlessly bridge corridor walks directly into the boss battle instance via `sm.enterBoss()`.
   - Created missing `pt_outrootaBoss.py` (portal `hid00`) and updated `rootaBossOut.py` calling `sm.exitBoss()`.
   - Updated `rootabyssOut.py` to allow returning to Sleepywood (`105010000`) directly from Colossal Root.

### 🧪 Verification
- Verified compilation via portable Maven 3.9.15 and JDK 21 (`mvn compile`): `[INFO] BUILD SUCCESS` (853 source files compiled, 0 errors).

---

## 📅 [2026-10-11] Cygnus Knights: Night Walker Comprehensive Stabilization

### 🎯 Scope
Analyze and fix all Night Walker skills (1st Job through 6th Job HEXA, Hyper, and 5th Job V-Matrix) to ensure accurate damage calculation, proper buff application, boss bind functionality, and reliable bat mechanics.

### 📂 Files Modified
- [`v214 src/.../NightWalker.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/cygnus/NightWalker.java)
- [`v214 src/.../SkillConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`.agents/skills/maplestory-bug-knowledge/SKILL.md`](file:///c:/Users/admin/Documents/MapleV265Src/.agents/skills/maplestory-bug-knowledge/SKILL.md)
- [`AGENTS.md`](file:///c:/Users/admin/Documents/MapleV265Src/AGENTS.md)

### 🛠️ Issues Identified & Fixes Applied

1. **Sub-Skills & Throwing Star Finishers Damage / Mastery Failure**:
   - **Problem**: Multi-hit star throwing skills fire the initial stars using the main skill ID, but the final explosive hit uses a separate sub-skill ID. The server failed to locate the player's skill level or mastery for the finisher, resulting in 0 or crippled damage.
   - **Fix**: Added explicit mappings in `SkillConstants.getActualSkillIDfromSkillID(int skillID)`:
     - `14101021` (Triple Throw Finisher) $\rightarrow$ `14101020`
     - `14101029` (Shadow Spark Explosion) $\rightarrow$ `14101028`
     - `14111021` (Quad Star Finisher) $\rightarrow$ `14111020`
     - `14121002` (Quintuple Star Finisher) $\rightarrow$ `14121001`
     - `14141001`, `14141002`, `14141003` (HEXA Quintuple Star Finisher / Sub / Giant) $\rightarrow$ `14141000`
     - `400041060` (Rapid Throw Finisher) $\rightarrow$ `400041059`
     - `14141501` (Silence Sub), `14141504` (Stygian Command Sub) $\rightarrow$ `14141500`, `14141503`
     - All bat atoms (1st - 6th Job) $\rightarrow$ respective parent skills.

2. **Shadow Stitch (`14121004`) Boss Bind Bug**:
   - **Problem**: Shadow Stitch failed to bind boss monsters due to `if (mob.getHp() <= 0 || mob.isBoss()) continue;`.
   - **Fix**: Removed `|| mob.isBoss()` and assigned `o1.cOption = chr.getId()`, bringing it in line with modern boss bind mechanics and resistance timers.

3. **Dark Attack Proc Condition for Shadow Bats & Shadow Spear**:
   - **Problem**: Checked `si.getElemAttr().equalsIgnoreCase("d")`. Normal throwing star attacks in v265 WZ data lack the "d" attribute on initial stars, preventing bats and spears from proccing and risking NullPointerExceptions.
   - **Fix**: Implemented `isDarkAttackSkill(int skillId, SkillInfo si)` verifying both `elemAttr == "d"` and explicit NW attack IDs.

4. **Bat Management & Mode Switching (Ravenous vs Shadow Bat)**:
   - **Problem**: Toggling Ravenous Bat when Shadow Bat was active turned the buff off instead of switching modes. In 6th Job, `HEXA_SHADOW_BAT` passive permanently overrode Ravenous Bat summons.
   - **Fix**:
     - Check `rOption` on `NightWalkerBat` CTS to distinguish active mode.
     - Call `clearAllBats()` on toggle change to clear old summons and spawn correct mode immediately.
     - Support 6th Job summon and atom IDs (`HEXA_RAVENOUS_BAT_SUMMON = 14141013`, `HEXA_RAVENOUS_BAT_ATOM = 14141014`, `HEXA_SHADOW_BAT_SUMMON = 14141005`, `HEXA_SHADOW_BAT_ATOM = 14141006`).
     - Accurately calculate recreation counts and max bat limits per mode.

5. **Shadow Spear (`400041008`) AffectedArea Reference Leak**:
   - **Problem**: `AffectedArea aa` was instantiated once outside the mob hit loop, causing the same Java reference to be modified and inserted multiple times into the field.
   - **Fix**: Moved instantiation inside the loop per mob foothold, preventing corrupted footholds and memory leaks.

6. **Shadow Bite (`400041037` / `500061035`) Final Damage Buff & Bat Procs**:
   - **Problem**: Handlers for Shadow Bite were missing in `handleAttack`.
   - **Fix**: Implemented Final Damage (`IndiePMdR`): `(hitBoss ? w : 0) + (normalMobCount * y)` capped at `q%` lasting `time` sec, and spawned bats at enemy positions.

7. **HEXA Dark Omen (`14141017`) & HEXA Dominion (`14141018`)**:
   - **Fix**: Added summon spawning for HEXA Dark Omen with cooldown reduction on attack. Added HEXA Dominion handling with invincibility, stats, and instant max stacks for Dark Elemental and Vitality Siphon.

8. **Database Transaction Self-Deadlock & Lock Wait Timeout Prevention**:
   - **Problem**: During character logout/save, InnoDB threw `Lock wait timeout exceeded (50s)` followed by HikariCP connection leaks at `QuestProgressMobRequirement.saveToSQL`.
   - **Root Cause**: `Quest.saveToSQL` and `AccountQuest.saveToSQL` opened an uncommitted transaction on `con`, batched rows into `quests`, and then called `qpr.saveToSQL`. Subclasses invoked `DatabaseManager.executeStatementReturnID()`, requesting a second HikariCP connection that attempted to insert into `questprogressrequirements`. InnoDB locked connection 2 waiting for connection 1 to commit, creating a circular self-deadlock.
   - **Fix**: Implemented polymorphic `saveToSQL(Connection con, int ownerid, long questID, boolean isAccount)` across `QuestProgressRequirement` and all its subclasses (`Item`, `Level`, `Mob`, `Money`), reusing the existing active connection and transaction before committing.

### 🧪 Verification & Live Test Run
- Compiled using portable Maven 3.9.15 and JDK 21 (`mvn compile`): `[INFO] BUILD SUCCESS` (0 errors).
- Packaged using Maven Assembly (`mvn package -DskipTests`): Generated `bin\maplestory-219.5-jar-with-dependencies.jar` (138MB Fat JAR) and synchronized into `v214 src\maplestory.jar` and `Server263\maplestory.jar`.
- Live Server Startup Test:
  - Portable MariaDB started on port `33066`: `mysqld is alive` (HikariCP connected in 340 ms).
  - MapleStory server loaded successfully with JDK 21 preview options:
    - Login listening on port `8484`
    - API listening on port `8483`
    - World 19 Channels 1–10 listening on ports `8585` – `8594`
  - Zero crashes, zero database connection leaks, all network ports active.
- Safe Patch Generation (`Server263_Patch_Latest`):
  - Created uncompressed patch at `MapleStory_Server_Runner_Ready\Patches\Server263_Patch_Latest\`.
  - **Database & Character Protection**:
    - Strictly excluded `mariadb/` (engine and `data/vietmaple`), `backup.sql`, and `Import_Database.bat`.
    - Only contains updated `maplestory.jar`, batch runner scripts, `data/scripts/`, and `Client_Patch_Files/`.
    - Included automated `Apply_Patch.bat` which overwrites only binaries and scripts, guaranteeing that user accounts, characters, and MariaDB tables are 100% safe and preserved.

---

## 📅 [2026-10-10] Database Schema & Quest Progress Persistence Fix

### 🎯 Scope
Resolve server crash and database lock wait timeouts occurring on player logout, channel swap, or save.

### 📂 Files Modified
- [`v214 src/.../QuestProgressItemRequirement.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/quest/progress/QuestProgressItemRequirement.java)
- [`v214 src/.../QuestProgressLevelRequirement.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/quest/progress/QuestProgressLevelRequirement.java)
- [`v214 src/.../QuestProgressMobRequirement.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/quest/progress/QuestProgressMobRequirement.java)
- [`v214 src/.../QuestProgressMoneyRequirement.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/quest/progress/QuestProgressMoneyRequirement.java)
- [`v214 src/.../AccountQuest.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/AccountQuest.java)
- [`v214 src/.../Char.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java)

### 🛠️ Issues Identified & Fixes Applied
1. **`questprogressrequirements` Unknown Column `charid`**:
   - The table `questprogressrequirements` schema does not contain `charid` (only `questid`, `orderNum`, `progresstype`, `unitid`, `requiredcount`, `currentcount`).
   - Trying to insert `charid` caused `SQLSyntaxErrorException`, leaking DB connections and triggering `Lock wait timeout exceeded`.
   - Fixed SQL statements to omit `charid` for character-level quests.
2. **Account Quests**:
   - Explicitly routed account quests (`isAccount == true`) to `questprogressrequirements_acc` which contains `accid`.

---

## 📅 [2026-10-09] MoXuan (墨玄) Sub-Skills & Combat Architecture

### 🎯 Scope
Enable full combat chaining, damage calculations, and secondary weapon equipping for MoXuan.

### 📂 Files Modified
- [`v214 src/.../MoXuan.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/Jianghu/MoXuan.java)
- [`v214 src/.../SkillConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`v214 src/.../AttackHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/user/AttackHandler.java)
- [`v214 src/.../UserStatHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/user/UserStatHandler.java)
- [`v214 src/.../AdminCommands.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)

### 🛠️ Issues Identified & Fixes Applied
1. **Invisible Combat Action Sub-Skills**:
   - Mapped all Tian/Di/Cross sub-skills (`175001002`, `175101001`, `175111003`, `175111011`, `175121001`, `175121006`, etc.) back to main leveling skills in `SkillConstants.java`.
   - Resolved skill level lookups in `Char.java` and `AttackHandler.java`.
   - Added automatic sub-skill synchronization on skill level up in `UserStatHandler.java`.
2. **Level Jumping Commands SP/AP Fix**:
   - Corrected `@endgame` and `@level` commands to assign proper SP per job tier and cumulative AP up to Lv 260.
3. **Secondary Weapon**:
   - Ensured `ensureSecondaryWeapon()` issues True Martial Fist (ID: `1352863`).

---

## 📅 [2026-10-11] Universal Boss Entry Stabilization & Infinite Entry Architecture

### 🎯 Scope
Audit, repair, and simplify boss entries across all MapleStory bosses for offline/LAN gameplay:
- Fix reported issue: Zakum gatekeeper NPC failing to warp into the altar.
- Enable direct, natural entry via in-game Boss UI (Content Guide match button) into private instances.
- Enable unlimited, unrestricted entries (anytime, infinite runs, 0 cooldowns, no entry count lockout).
- Auto-complete prerequisite storyline quests for all 23 bosses on character login.
- Provide full exit support via exit NPCs and exit portals.

### 📂 Files Modified
- [`v214 src/.../BossEntry.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/world/boss/BossEntry.java) (New Class)
- [`v214 src/.../BossConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/BossConstants.java)
- [`v214 src/.../BossPartyType.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/enums/BossPartyType.java)
- [`v214 src/.../Field.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/world/field/Field.java)
- [`v214 src/.../Char.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java)
- [`v214 src/.../ScriptHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/script/ScriptHandler.java)
- [`v214 src/.../ScriptManagerImpl.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java)
- [`v214 src/.../MigrationHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/user/MigrationHandler.java)
- [`v214 src/.../Horntail.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/world/boss/Horntail.java)
- [`v214 src/.../RootAbyss.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/world/boss/RootAbyss.java)
- [`v214 src/.../ServerConfig.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/ServerConfig.java)
- [`v214 src/server.properties`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/server.properties)
- [`v214 src/data/scripts/boss/zakum_accept.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/boss/zakum_accept.py)
- [`v214 src/data/scripts/boss/Zakum00.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/boss/Zakum00.py)
- [`v214 src/data/scripts/field/firstenter_bossBlackMage.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/field/firstenter_bossBlackMage.py)
- 18 NPC exit scripts in [`data/scripts/npc/`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/npc/) (out_hillah, magnus_out, Populatus01, kalosOut, slimeOut, bmbossfield_out, etc.)
- 7 Portal exit scripts in [`data/scripts/portal/`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/portal/) (pt_magnusDoor, ptDemianOut, pt_bh_bossOut, etc.)
- [`.agents/skills/maplestory-bug-knowledge/SKILL.md`](file:///c:/Users/admin/Documents/MapleV265Src/.agents/skills/maplestory-bug-knowledge/SKILL.md)

### 🛠️ Issues Identified & Fixes Applied

1. **Zakum Gatekeeper Waiting Room Loop**:
   - **Root Cause**: zakum_accept.py literally contained only sm.startBossUI('Zakum'). When players in the waiting room talked to NPC 2030013, it simply reopened the Boss UI instead of warping them into the battle altar.
   - **Fix**: Updated zakum_accept.py to inspect current field ID and warp directly to the altar (211042402 -> Easy, 211042400 -> Normal, 211042500 -> Chaos) via sm.enterBoss().

2. **First-Enter Script Timing Bug**:
   - **Root Cause**: Char.warp() called toField.addChar(this) before setField(toField). Field.addChar executed onFirstUserEnter while chr.getField() was still the OLD map. Bosses spawned via scripts (Magnus, Cygnus, Lotus, Damien, Lucid, Will, Black Mage) either failed or spawned in the prior map.
   - **Fix**: Extracted execFirstUserEnterScript from addChar and placed it in Char.warp right after spawnLifesForChar and setField.

3. **Universal Direct Boss Entry Architecture (BossEntry.java)**:
   - **Fix**: Implemented BossEntry.enter(Char, BossPartyType, boolean) routing BOSS_UI_REQUEST and CHECK_BOSS_PARTY_BY_SCRIPT directly into private instances with verified battle maps, auto-party creation, instance timers, and fallback boss spawning.

4. **Difficulty Alignment (Slime & Kalos)**:
   - **Root Cause**: Client BossParty.img sends difficulty 3 (Chaos) for Guardian Angel Slime and Kalos. Server had them as Hard (2), returning 'Boss not found'.
   - **Fix**: Renamed SLIME_HARD -> SLIME_CHAOS and KALOS_HARD -> KALOS_CHAOS with BossPartyDifficultyType.Chaos (3).

5. **Auto-Unlock Prerequisite Quests**:
   - **Fix**: Added unlockBossPrerequisites(Char) completing all 23 storyline prequests on login migration if server.bossUnlockPrequests=true.

6. **Complete Boss Exit Coverage**:
   - **Fix**: Created 18 missing exit NPC scripts and 7 missing exit portal scripts invoking sm.exitBoss().

---

## 📅 [2026-10-11] Night Walker: Dark Omen & Shadow Bat Dual-Mode Attack Architecture

### 🎯 Scope
Diagnose, analyze, and fix Night Walker's Dark Omen damage failure occurring when the Shadow Bat buff is active.

### 📂 Files Modified
- [`v214 src/.../NightWalker.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/cygnus/NightWalker.java)
- [`v214 src/.../SkillConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`v214 src/.../SkillHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/user/SkillHandler.java)
- [`v214 src/.../Mob.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/life/mob/Mob.java)
- [`.agents/skills/maplestory-bug-knowledge/SKILL.md`](file:///c:/Users/admin/Documents/MapleV265Src/.agents/skills/maplestory-bug-knowledge/SKILL.md)

### 🛠️ Issues Identified & Fixes Applied

1. **Dark Omen Dual-Mode Skill Structure (Normal vs Shadow Bat Active)**:
   - **Root Cause**: In MapleStory v265 WZ data, Dark Omen has two distinct summon modes:
     - **Mode 1 (Shadow Bat OFF)**: Skill ID `14121003` (or HEXA `14141017`). Summons a dense pack of bats for **7 seconds** that attacks every 0.3s (6 lines of high damage).
     - **Mode 2 (Shadow Bat ON)**: Skill ID `14121012` (or HEXA `14141020`). Summons a weakened pack of bats for **60 seconds** that attacks every 1.5s (2 lines of damage) and periodically spawns Shadow Bats.
   - **The Bug**:
     - `NightWalker.java` only defined and handled `14121003` / `14141017`. It had no knowledge of `14121012` or `14141020`.
     - When the client has `NightWalkerBat` active, client-side logic sends summon attack packets with skill ID `14121012` / `14141020`.
     - Because `SkillConstants.getActualSkillIDfromSkillID` did not map `14121012` $\rightarrow$ `14121003`, the server queried the player's learned skill level for `14121012` (which is an invisible sub-skill not in the skill book), resolving `slv = 0` and dropping or nullifying the attack damage.
     - In `NightWalker.handleSkill`, only `DARK_OMEN` (`14121003`) was spawned with a 7-second term. When Shadow Bat was on, the client expected the 60-second summon (`14121012`), leading to summon ID desynchronization between client and server.
   - **Fix**:
     - Added constants `DARK_OMEN_BAT_ACTIVE = 14121012` and `HEXA_DARK_OMEN_BAT_ACTIVE = 14141020`.
     - In `SkillConstants.getActualSkillIDfromSkillID`, mapped `14121012` $\rightarrow$ `14121003` and `14141020` $\rightarrow$ `14141017`.
     - In `SkillHandler.handleUserSkillUseRequest`, resolved `effectiveSkillId` to parent skills so sub-skills correctly resolve learned `slv` and manage cooldowns.
     - In `NightWalker.handleSkill`, clear any previous Dark Omen summons, inspect `tsm.hasStat(NightWalkerBat)`, and spawn the appropriate mode: `14121012` / `14141020` (60s term) if active, or `14121003` / `14141017` (7s term) if inactive.
     - In `NightWalker.handleAttack`, recognized all 4 IDs, excluded all from self-cooldown reduction and shadow spear trigger, and fixed bat spawn count from WZ stat `u`.
     - In `Mob.handleDamageReflect`, added `14121012` and `14141020` to the reflection immune list.
     - In `clearAllBats()` and `shadowBats()`, used precise `removeLife(bat.getObjectId(), false)` to avoid inadvertent deletion of other active summons.

### 🧪 Verification & Live Test Run
- Compiled using portable JDK 21 & Maven 3.9.15: `[INFO] BUILD SUCCESS` (853 source files, 0 errors).
- Built fat jar: `bin/maplestory-219.5-jar-with-dependencies.jar` (138 MB) and synchronized into `v214 src/maplestory.jar`.
- Verified live server startup:
  - MariaDB daemon alive on port `33066`
  - Login listening on port `8484`
  - API listening on port `8483`
  - World 19 Channels 1-10 listening on ports `8585` – `8594`

---

## 📅 [2026-10-11] Character Creation & Login Crash Fix (Hoyoung / All Jobs)

### 🎯 Scope
Diagnose and resolve instant game crash ("เกมส์เด้ง") occurring right after creating and logging into a Hoyoung character (`HoyOFFLINE`), as analyzed from live server logs.

### 📂 Files Modified
- [`v214 src/.../Char.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java)
- [`v214 src/.../MigrationHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/user/MigrationHandler.java)
- [`.agents/skills/maplestory-bug-knowledge/SKILL.md`](file:///c:/Users/admin/Documents/MapleV265Src/.agents/skills/maplestory-bug-knowledge/SKILL.md)

### 🛠️ Issues Identified & Fixes Applied

1. **Root Cause Analysis from Live Console Logs**:
   - Analyzed character creation & spawn log for `HoyOFFLINE` (Job ID: `HOYOUNG_1 = 16400`).
   - Character creation, selection, map load (Cheong-un / `explorationPoint`), and initial stat setups all succeeded.
   - At exactly 2.5 seconds after login:
     ```
     [Out v.265] | HoyOFFLINE | EFFECT, 1173/0x495 | 0F FF FF FF FF
     ... (22 consecutive identical EFFECT packets) ...
     127.0.0.1 forcibly closed the game.
     ```
   - **Mechanism of Failure**:
     1. In `MigrationHandler.java:161`, `BossEntry.unlockBossPrerequisites(currentChar)` was scheduled 2500ms after login.
     2. Brand new characters had 0 of the 23 boss prequests completed, triggering `chr.completeQuest(questId, true)` for all 22 uncompleted quests.
     3. In `Char.java:13020`, `completeQuest` called `write(UserPacket.effect(Effect.questCompleteEffect()))` unconditionally outside `if (!noRewards)`.
     4. `Effect.questCompleteEffect()` sets `UserEffectType.QuestComplete` (byte `15` / `0x0F`), which has an empty body in `Effect.encode`, and `UserPacket.effect` appends `outPacket.encodeInt(-1)` (`FF FF FF FF`), forming `0F FF FF FF FF`.
     5. The 64-bit v265 client's `CUserLocal::OnEffect` encountered a fatal Access Violation when bombarded with 22 consecutive malformed `QuestComplete` effect packets, crashing the client instantly.

2. **Fixes Applied**:
   - **Removed `questCompleteEffect` in `Char.java`**: Removed `write(UserPacket.effect(Effect.questCompleteEffect()))` and remote broadcast from `Char.completeQuest`. Modern MapleStory v265 handles quest completion visual/audio effects natively client-side via `WvsContext.questRecordMessage(quest)`.
   - **Level Guard on Login Pre-Quest Auto-Unlocker in `MigrationHandler.java`**: Added `chr.getLevel() >= 100` condition before scheduling `unlockBossPrerequisites` on login. Level 1 characters and characters playing tutorial storyline quests are no longer flooded with 23 endgame boss quest completions.
   - Recompiled all 853 source files, rebuilt `maplestory.jar` (138MB), and restarted the live server.

---

## 📅 [2026-10-11] Root Abyss (Von Bon / Chicken Boss) Altar Crash Fix (Opcode 1856 Error 38)

### 🎯 Scope
Diagnose and resolve client crash ("เกมส์เด้ง") occurring when players hit the altar clock to summon Von Bon (บอสไก่) in Root Abyss (`105200110`), as analyzed from live server logs.

### 📂 Files Modified
- [`v214 src/.../RootAbyss.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/world/boss/RootAbyss.java)
- [`v214 src/.../Reactor.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/life/Reactor.java)
- [`v214 src/.../ReactorPool.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/connection/packet/ReactorPool.java)
- [`.agents/skills/maplestory-bug-knowledge/SKILL.md`](file:///c:/Users/admin/Documents/MapleV265Src/.agents/skills/maplestory-bug-knowledge/SKILL.md)

### 🛠️ Issues Identified & Fixes Applied

1. **Analysis of Live Server Logs**:
   - Boss entry, warp, timer, and altar spawning were completely normal.
   - The crash occurred immediately upon attacking the hourglass clock altar (`1058016`):
     ```
     [Out v.265] | HoyOFFLINE | REACTOR_LEAVE_FIELD, 1856/0x740 | 41 42 0F 00 00 00 7D FF C6 01
     [In v.265]  | HoyOFFLINE | CLIENT_ERROR, 171 | ...
     [OutPacket] Error 38: REACTOR_LEAVE_FIELD(1856)
     [Client_Error.txt] [Error 38] (REACTOR_LEAVE_FIELD / 1856) Data: 41 42 0F 00 00 00 7D FF C6 01 40 07
     [ChannelInactive] Client 127.0.0.1: Current state: IN_FIELD, Next state: NONE.
     ```
   - Client sent `[OutPacket] Error 38: REACTOR_LEAVE_FIELD(1856)` before disconnecting. In MapleStory clients, **Error 38** denotes premature end of packet stream / buffer underflow during packet decoding.

2. **Root Causes**:
   - **Root Abyss WZ Altar Logic**: In Root Abyss (`1058016.img`), the altar is designed to stay in the field. When hit (action 9), it triggers the hit animation and transitions to State 1 (an empty 4x4 canvas). It was never supposed to be forcibly deleted.
   - **Forcible Removal Trigger**: `RootAbyss.java` contained `cleanReactor(field, REACTOR)` on boss spawn, which called `field.removeLife(reactor.getObjectId(), false)`.
   - **Broken Opcode 1856 Packet Structure**: `Reactor.broadcastLeavePacket()` sent `ReactorPool.reactorLeaveField(this)` using opcode 1856 with 10 bytes (`[Int, Byte, Byte, Short, Short]`). In v265 64-bit client, opcode 1856 is not a 10-byte reactor removal packet, causing Error 38 buffer underflow crash.
   - The standard reactor removal packet in v265 is opcode 1851 (`REACTOR_REMOVE`), which encodes only `outPacket.encodeInt(objectId)` (4 bytes).

3. **Fixes Applied**:
   - In `RootAbyss.java`: Removed `cleanReactor(field, REACTOR)` calls from all Root Abyss boss spawns (`banbanNormal`, `banbanChaos`, `bellumNormal`, `bellumChaos`, `queenNormal`, `queenChaos`). Altars now naturally transition to State 1.
   - In `Reactor.java`: Updated `broadcastLeavePacket()` to broadcast `ReactorPool.reactorRemove(getObjectId())` (Opcode 1851) instead of opcode 1856.
   - In `ReactorPool.java`: Redirected `reactorLeaveField` to `reactorRemove` for complete safety across the codebase.
   - Recompiled all 853 source files, rebuilt `maplestory.jar` (138MB), and restarted live server.

---

## 📅 [2026-10-11] Incremental Patch Release: `Server263_Patch_Latest`

### 🎯 Scope
Package and deploy a 100% safe incremental update containing all recent architectural updates, crash fixes, and boss system stabilization upon user request.

### 📦 Included Fixes & Updates
1. **Root Abyss Summon Crash Fix**: Resolved `Error 38: REACTOR_LEAVE_FIELD (1856)` by preventing altar destruction and switching removal packets to opcode 1851 (`REACTOR_REMOVE`).
2. **Character Creation & Login Crash Fix**: Eliminated malformed `Effect 15` packet flood on newly created characters; added Lv. 100 guard on login prequest auto-unlocker.
3. **Universal Boss Entry Stabilization & Infinite Runs**: Direct instance entries for all 23 bosses via in-game Boss UI, auto-party handling, 0 cooldowns, prequest auto-completion, and 25 exit NPC/portal scripts.
4. **Night Walker Combat Architecture**: Dual-mode summon management for Dark Omen (Shadow Bat Active vs Normal), damage reflect immunity, and summon lifecycle safety.

### 📂 Patch Deliverables
- **Patch Folder**: `MapleStory_Server_Runner_Ready\Patches\Server263_Patch_Latest\`
- **Distribution Synchronized**: `MapleStory_Server_Runner_Ready\Server263\`
- **Contents**:
  - `maplestory.jar` (138 MB fat jar)
  - `server.properties`
  - `data\scripts\` (NPC, portal, reactor Python scripts)
  - `Client_Patch_Files\`
  - Launcher & utility batch scripts
  - `Apply_Patch.bat` (1-click updater preserving existing database and character records)

---

## 📅 [2026-10-11] Zero-Install Account System, Multi-Network Simultaneous Routing & Safe Drop-in Patch

### 🎯 Scope
Implement simultaneous multi-network play (Host on 127.0.0.1, Friends on Radmin VPN / LAN), dynamic client IP hook without re-compilation, zero-install account registration (Auto-Register on login + standalone Account Manager batch tool), and generate an uncompressed drop-in patch folder ready for manual zipping by the user.

### 📂 Files Modified
- [`v214 src/.../NettyClient.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/connection/netty/NettyClient.java)
- [`v214 src/.../Login.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/connection/packet/Login.java)
- [`v214 src/.../ClientSocket.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/ClientSocket.java)
- [`v214 src/.../LoginHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java)
- [`v214 src/.../ApiRequestHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/ApiRequestHandler.java)
- [`v214 src/.../ServerConfig.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/ServerConfig.java)
- [`v214 src/server.properties`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/server.properties)
- [`v214 src/Create_Account.bat`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/Create_Account.bat) (New File)
- [`v214 src/4_Server_Control_Panel.bat`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/4_Server_Control_Panel.bat)
- [`v214 src/Client_Patch_Files/Change_IP_or_Account.bat`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/Client_Patch_Files/Change_IP_or_Account.bat) (New File)
- [`v214 src/HOW_TO_USE.txt`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/HOW_TO_USE.txt)
- [`v263AuthHook/Client207/SockHook.cpp`](file:///c:/Users/admin/Documents/MapleV265Src/v263AuthHook/Client207/SockHook.cpp)
- [`v263AuthHook/Build_AuthHook.bat`](file:///c:/Users/admin/Documents/MapleV265Src/v263AuthHook/Build_AuthHook.bat)
- [`v263AuthHook/Test_AuthHook.bat`](file:///c:/Users/admin/Documents/MapleV265Src/v263AuthHook/Test_AuthHook.bat)
- [`tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/tools/create_patch.py)
- [`Server263/`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/Server263/) (Synchronized)
- [`Patches/Server263_Patch_Latest/`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/Patches/Server263_Patch_Latest/) (Active Patch Directory)

### 🛠️ Key Achievements
1. **Dynamic Client AuthHook (`Localhost.dll`)**:
   - Replaced static `127.0.0.1` hardcode with dynamic `GetPrivateProfileStringA` reading `Server.IP` from `launcher.ini`.
   - Verified 64-bit AMD64 binary via `Test_AuthHook.bat` and PowerShell validation tests.
2. **Concurrent Multi-Network Routing**:
   - `NettyClient.getEffectiveChannelIp()` automatically serves `127.0.0.1` to loopback players and the configured LAN/VPN IP to remote players, enabling friends on Radmin VPN and host on localhost to play concurrently without channel desync.
3. **Zero-Install Account Architecture**:
   - **Auto-Register on Login**: First-time username/password automatically registers with BCrypt security when `server.autoRegister=true`.
   - **Standalone Account Tool (`Create_Account.bat`)**: 1-click account creation, listing, password reset, and GM/Admin role assignment.
   - **Server Control Panel Integration**: Added Menu [9] Account Manager and Menu [10] Configure Server IP to `4_Server_Control_Panel.bat`.
   - **Client Helper**: Added `Change_IP_or_Account.bat` to `Client_Patch_Files/` for players to configure connection settings in 1 second.
4. **Safe Drop-in Patch (`Server263_Patch_Latest`)**:
   - Clean uncompressed directory structure matching `Server263/` for direct drag-and-drop or manual zipping.
   - Strictly preserves database data (`mariadb/data/`), existing accounts, and character progress.
   - Excludes heavy/unnecessary binaries (`mariadb/`, `jdk21/`, `backup.sql`, `*.wz`).

---

## 📅 [2026-10-11] Comprehensive Boss System Audit, Stabilization & Asset Cross-Reference

### 🎯 Scope
Comprehensive asset and source code audit across all 35 official boss orders and 80 battle fields in MapleStory v265 / v263 emulator (`Etc.wz/BossParty.img.xml`, `Map.wz`, `Mob.wz`, `data/dat265/`). Fix all missing spawns, broken phase transitions, trapped players in empty rooms, missing exit gates/portals, and boss HP registry desyncs.

### 📂 Files Modified
- [`v214 src/.../BossEntry.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/world/boss/BossEntry.java)
- [`v214 src/.../BossHelper.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/world/boss/BossHelper.java)
- [`v214 src/.../BossHpRegistry.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/BossHpRegistry.java)
- [`v214 src/.../ScriptManagerImpl.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java)
- [`v214 src/data/scripts/field/*.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/field/) (42 Field Scripts)
- [`v214 src/data/scripts/npc/*.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/npc/) (35 Exit Gate Scripts)
- [`v214 src/data/scripts/portal/*.py`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/data/scripts/portal/) (52 Portal Scripts)

### 🛠️ Issues Identified & Fixes Applied
1. **Bosses Missing From Direct Spawn Handling (`BossEntry.java`)**:
   - `Magnus` (Easy, Normal, Hard): Handled in `Magnus.java`, but was omitted from `BossEntry.spawnBossForField`, and map scripts (`magnus_summon_E.py`, `magnus_summon_N.py`, `magnus_summon.py`) were missing. Magnus never spawned.
   - `Cygnus` (Easy, Normal): Handled in `Cygnus.java`, omitted from `BossEntry`, and map scripts (`cygnus_Summon_Easy.py`, `cygnus_Summon.py`) were missing.
   - `Lotus` (Normal, Hard, Extreme): Handled in `Lotus.java`, omitted from `BossEntry`, and map scripts (`blackHeavenBoss1_summonpre.py`, `blackHeavenBoss1n_summonpre.py`) were missing.
   - `Damien` (Normal, Hard): Handled in `Damien.java`, omitted from `BossEntry`, and map scripts (`first_DemianNormal1pre.py`, `first_DemianHard1pre.py`) were missing.
   - `Lucid` (Easy, Normal, Hard): Handled in `Lucid.java`, omitted from `BossEntry`, and map scripts (`Fenter_450004150pre.py`) were missing.
   - `Will` (Easy, Normal, Hard): Handled in `Will.java`, omitted from `BossEntry`, and map scripts (`will_phase1pre.py`) were missing.
   - `Black Mage` (Hard, Extreme): Aeonian Rise (`8880500`) & Tanadian Ruin (`8880501`) were omitted from `BossEntry`.
   - `Hilla` (Normal, Hard) & `Balrog`: Were omitted from `BossEntry`.
   - **Fix**: Added explicit cases for all these bosses in `BossEntry.spawnBossForField()`, and created the corresponding map scripts in `data/scripts/field/`.
2. **Phase Transition Traps in Multi-Phase Bosses (`BossHelper.java`)**:
   - **Lotus Phase 2 & 3**: When Phase 1 & 2 died, `BossHelper` warped to `350060800` / `350060500` (Phase 2) and `350060900` / `350060600` (Phase 3), but never called `Lotus.spawn()`, and map scripts `blackHeavenBoss2_summonpre.py` and `blackHeavenBoss3_summonpre.py` were missing. Players were warped into empty rooms.
     - **Fix**: Added automatic `Lotus.spawn()` triggers upon warping to Phase 2 and Phase 3 in `BossHelper.java`, and deployed the field scripts.
   - **Will Phase Transitions**: When Phase 1 died, `BossHelper` warped to `450008200` / `450008800` (cutscene 2). When Phase 2 died, it warped to `450008300` / `450008900` (cutscene 3). Because `will_direction2.py` and `will_direction3.py` were missing, players were stuck permanently in empty cutscene maps.
     - **Fix**: Created `will_direction2.py` and `will_direction3.py` to seamlessly warp the party to Phase 2 battle map (`450008250` / `450008850`) and Phase 3 battle map (`450008350` / `450008950`). Added `will_phase2pre.py` and `will_phase3pre.py` to call `Will.spawn(2, chr)` and `Will.spawn(3, chr)`.
   - **Damien Phase 2**: `DemianStigma.startNextPhase` warped party to `350160240` / `350160140`, where `first_DemianNormal2pre.py` and `first_DemianHard2pre.py` were missing.
     - **Fix**: Deployed `first_DemianNormal2pre.py` and `first_DemianHard2pre.py` with `Damien.spawn(chr, DamienPhase.LAST)`.
   - **Lucid Phase 2 & Reward Room**: Phase 1 death warped to `450004200` (cutscene), missing `enter_450004200.py`. Reward room (`450004300`) did not spawn Music Box mob (`8880177` Easy, `8880167` Normal, `8880156` Hard).
     - **Fix**: Created `enter_450004200.py` and `Fenter_450004250pre.py`. Updated `enter_450004300.py` to spawn the difficulty-appropriate Music Box mob.
3. **Universal Boss Exit Trap (Trapped in Boss Rooms)**:
   - All 23 exit gate NPCs (`9091002` through `9091048`, `3003561`, `9130100`, `9401197`, etc.) had no scripts in `data/scripts/npc/`.
   - All exit portals (`pt_BM1_bossOut`, `pt_GC_out`, `pt_jinHillah_out`, `ptKalosOut`, `ptKaringOut`, `ptLimboOut`, `ptBaldrixOut`, `ptAdversaryOut`, `ext00`, `lioncastleout`) had no scripts in `data/scripts/portal/`.
   - **Fix**: Deployed `sm.exitBoss()` scripts for all 35 exit gate NPCs and 10 exit portals. Updated `ScriptManagerImpl.exitBoss()` confirmation dialog to bilingual English/Thai.
4. **Boss HP Registry Desync & Misassignment Fix (`BossHpRegistry.java`)**:
   - `First Adversary`: IDs `8881710` (Easy 120T), `8881740` (Normal 250T), `8881770` (Hard 500T), `8881800` (Extreme P1 1,000T), `8881820` (Extreme P2 700T) were registered.
   - `Zakum Bodies`: Added missing Bodies 1 and 2 (`8800000`, `8800001`, `8800020`, `8800021`, `8800100`, `8800101`).
   - Cleaned up duplicate/erroneous entries for Lotus (`8880110`, `8880111`, `8880100`, `8880101`, `8880153`).
5. **Exact Platform Foothold Snapping**:
   - Extracted exact ground coordinates from `Map.wz` footholds for newer bosses: Gloom `(0, -157)`, Darknell `(0, 29)`, Verus Hilla `(0, 266)`, Seren `(0, 275)`, Slime `(715, -1382)`, Kalos `(-300, 398)`, Kaling `(900, 106)`, Limbo `(0, 3)`, Baldrix `(0, 18)`, First Adversary `(0, 55)`.
6. **Automated Verification**:
   - Ran `verify_all_bosses.py` auditing all 80 boss battle maps, waiting rooms, return portals, and entrance gates: 0 missing field scripts, 0 missing portal scripts.
7. **Deployment & Live Server Launch**:
   - Compiled fat JAR via Maven (`maplestory-219.5-jar-with-dependencies.jar`).
   - Synchronized updated `maplestory.jar` (138MB), `server.properties`, and `data/scripts/` to `MapleStory_Server_Runner_Ready/Server263/`.
   - Updated patch package `MapleStory_Server_Runner_Ready/Patches/Server263_Patch_Latest/`.
   - Started MariaDB engine on port 33066 and launched MapleStory Server (Login: 8484, Channels 1-10: 8585-8594).
8. **Patch Distribution Package Generated (`Server263_Patch_Latest`)**:
   - Assembled clean uncompressed drop-in patch in `MapleStory_Server_Runner_Ready/Patches/Server263_Patch_Latest/`.
   - Generated 1-click installer `Apply_Patch.bat` for instant update onto `Server263/`.
   - Updated bilingual installation instructions `วิธีลงแพทช์_DRAG_AND_DROP.txt`.
   - Strictly preserved database data, accounts, and characters (excluded `mariadb/`, `jdk21/`, and `*.wz`).

## 📅 [2026-10-11] Kain & Lara Comprehensive Class Architecture & Skill Audit
### 🎯 Scope
Audit class architecture, job advancement (1st - 4th Job), V-Matrix (5th Job), and HEXA Matrix (6th Job) for Nova Bowman **Kain** (`6003`, `6300` - `6312`) and Anima Magician **Lara** (`16001`, `16200` - `16212`). Zero-guessing cross-reference against `Skill.wz` (`Skill_00002/16200.xml` through `16214.xml`, `Skill_00007/6300.xml` through `6314.xml`), `Etc.wz/HexaCore.img.xml`, `String.wz/Skill.img.xml`, and `String.wz/Eqp.img.xml`.

### 📂 Files Modified
- [`v214 src/.../nova/Kain.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/Kain.java)
- [`v214 src/.../anima/Lara.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/anima/Lara.java)
- [`v214 src/.../jobs/Job.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java)

### 🛠️ Issues Identified & Fixes Applied
1. **Cross-Class Secondary Weapon Swap Bug**:
   - In `Kain.java:318`: `addItemToNewCharacter` incorrectly created item `1354020` (Simple Four-Jade Ornament - Lara's secondary).
   - In `Lara.java:216`: `addItemToNewCharacter` incorrectly created item `1354010` (D Basic Weapon Belt - Kain's secondary).
   - **Root Cause**: Item IDs were swapped during initial class stubbing.
   - **Fix**: Reassigned `1354010` (`D Basic Weapon Belt`) to Kain and `1354020` (`Simple Four-Jade Ornament`) to Lara.
2. **Missing & Broken Secondary Equipment on Job Advancement (`Job.ensureSecondaryWeapon`)**:
   - `Lara` was configured with non-existent ID `1353904`. Updated to official 4th Job `1354023` (`Radiant Four-Jade Ornament`).
   - `Kain` was completely omitted from `ensureSecondaryWeapon`. Added `1354013` (`D100 Custom Weapon Belt`).
3. **Kain Origin Skill Debuff Parity**:
   - Added `MobStat.OriginDebuff` (20s) to `CHURNING_MALICE` (`63141506`) matching Lara's `UNIVERSE_IN_BLOOM` and all other v265 6th job classes.
4. **V-Matrix & HEXA Matrix Verification (100% WZ Match)**:
   - **Kain V-Skills**: `Dragon Burst` (`400031061`), `Fatal Blitz` (`400031065`), `Thanatos Descent` (`400031062`), `Grip of Agony` (`400031066`) validated in `40003.xml` and `MatrixConstants`.
   - **Lara V-Skills**: `Big Stretch` (`400021122`), `Land's Connection` (`400021123`), `Surging Essence` (`400021129`), `Winding Mountain Ridge` (`400021130`) validated in `40002.xml` and `MatrixConstants`.
   - **HEXA Matrix**: Verified all 11 Mastery & Skill cores in `Etc.wz/HexaCore.img.xml` for Job `6312` and Job `16212`:
     - Kain: Skill Cores `10000035`, `10000087` (Total Annihilation, Churning Malice); Mastery Cores `20000035`, `20000085`, `20000135`, `20000181` (Falling Dust VI, Strike Arrow VI, Dragon Fang VI, Death Blessing VI).
     - Lara: Skill Cores `10000044`, `10000097` (Universe in Bloom, Cornucopia); Mastery Cores `20000044`, `20000094`, `20000144`, `20000190` (Essence Sprinkle VI, Dragon Vein Eruption VI, Dragon Vein Absorption VI, Wakeup Call VI).

---

## 📅 [2026-10-11] Kain & Lara Endgame Command (!endgame) Audit & Deployment

### 🎯 Scope
Audit the !endgame command (AdminCommands.java) for Kain and Lara. Verify automatic job progression, skill points, quests, matrix initialization, consumables, and ensure zero equipment cross-class errors. Cross-reference all assigned equipment IDs against String.wz/Eqp.img.xml. Compile, push to remote Git, generate distribution patch (Patches/Server263_Patch_Latest/), and deploy to Server263/.

### 📂 Files Modified / Audited
- [214 src/.../AdminCommands.java](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)
- [214 src/.../nova/Kain.java](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/Kain.java)
- [214 src/.../anima/Lara.java](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/anima/Lara.java)
- [214 src/.../jobs/Job.java](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java)
- [.agents/skills/maplestory-bug-knowledge/SKILL.md](file:///c:/Users/admin/Documents/MapleV265Src/.agents/skills/maplestory-bug-knowledge/SKILL.md)
- [PROGRESS.md](file:///c:/Users/admin/Documents/MapleV265Src/PROGRESS.md)

### 🛠️ Issues Identified & Fixes Applied

1. **!endgame Command Verification for Kain & Lara**:
   - Both classes are fully registered in AdminCommands.setupEndgame and EndgameCmd:
     - Automatic Job Detection: JobConstants.isKain(curJob) -> KAIN_4 (6312), JobConstants.isLara(curJob) -> LARA_4 (16212).
     - Command Arg Support: Supports !endgame kain and !endgame lara directly.
     - Progression: Sets Level 260, 1,250 AP, 2B Mesos initial + 10B Mesos test fund (12B Mesos total), Max HP/MP, completes 5th Job (Quests 1460-1466) & 6th Job (Quest 1488), initializes V-Matrix slots, and maxes 1st - 4th job skills.
     - Consumables: Sol Erda Energy x1,000 (2636421), Sol Erda Fragments x30,000 (4009548), Nodestones x3,000 (2435719), Power Elixirs x5,000 (2000005).

2. **Zero-Guessing Equipment Audit (Verified with String.wz/Eqp.img.xml)**:
   - **Kain Equipment**:
     - Weapon: 1214018 $\rightarrow$ Arcane Umbra Whispershot (Bowman DEX)
     - Secondary: 1354013 $\rightarrow$ D100 Custom Weapon Belt (Kain 4th Job)
     - Emblem: 1190554 $\rightarrow$ Gold Hitman Emblem (Kain Lv 100)
     - Armors: rcherArmors (1004810 Hat, 1053065 Suit, 1073160 Shoes, 1082697 Gloves, 1102942 Cape, 1152198 Shoulder)
   - **Lara Equipment**:
     - Weapon: 1372228 $\rightarrow$ Arcane Umbra Wand (Magician INT)
     - Secondary: 1354023 $\rightarrow$ Radiant Four-Jade Ornament (Lara 4th Job)
     - Emblem: 1190561 $\rightarrow$ Gold Earthseer Emblem (Lara Lv 100)
     - Armors: mageArmors (1004809 Hat, 1053064 Suit, 1073159 Shoes, 1082696 Gloves, 1102941 Cape, 1152197 Shoulder)
   - All 18 equipment items precisely match class proficiencies and WZ string entries; no cross-class mixups.

3. **Git Synchronization & Push**:
   - Confirmed repository 214 src is on main and pushed to https://github.com/gmakerjay/maple265src.git.

4. **Distribution & Patch Generation**:
   - Executed 	ools/create_patch.py.
   - Updated Server263/maplestory.jar with compiled Fat JAR.
   - Generated drop-in patch in MapleStory_Server_Runner_Ready/Patches/Server263_Patch_Latest/ along with Apply_Patch.bat.
   - Relaunched live server runtime with the updated binary; verified all ports (8483, 8484, 8585-8594) are listening.

---

## 📅 [2026-10-11] Angelic Buster & Kaiser Full Architecture, Skill Audit, and Endgame Command (!endgame)

### 🎯 Scope
Conduct a full audit for Nova Pirate **Angelic Buster** (`6001`, `6500` - `6512`) and Nova Warrior **Kaiser** (`6000`, `6100` - `6112`).
Audit skill execution, recharge mechanics, morph gauge, 1st - 4th Job skills, V-Matrix (V 1-4), and HEXA Matrix (Origin, Active, Mastery) skills.
Cross-reference all skill IDs, sub-skills, equipment IDs, secondary weapons, and emblems against official WZ data (`String.wz/Eqp.img.xml`, `Skill.wz`, `Etc.wz/HexaCore.img.xml`, `Etc.wz/VCore.img.xml`).
Implement and enhance `!endgame` command support for both classes with auto-detection, equipment delivery, and automatic 5th Job V-Matrix skill granting. Compile, package, improve server stability, and test run.

### 📂 Files Modified / Audited
- [`v214 src/.../constants/JobConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/JobConstants.java)
- [`v214 src/.../jobs/Job.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java)
- [`v214 src/.../handlers/user/JobSkillHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/user/JobSkillHandler.java)
- [`v214 src/.../constants/SkillConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`v214 src/.../nova/AngelicBuster.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/AngelicBuster.java)
- [`v214 src/.../nova/Kaiser.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/Kaiser.java)
- [`v214 src/.../character/commands/AdminCommands.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleV265Src/PROGRESS.md)
- [`.agents/skills/maplestory-bug-knowledge/SKILL.md`](file:///c:/Users/admin/Documents/MapleV265Src/.agents/skills/maplestory-bug-knowledge/SKILL.md)

### 🛠️ Issues Identified & Fixes Applied

1. **Kaiser Character Migration Item Bug (`Kaiser.java`)**:
   - In `Kaiser.handleInitAfterMigrate(chr)`: Lines 968-969 previously gave Adele's Bladecaster (`1213001`) and Bladebinder (`1354001`) due to copy-paste legacy code.
   - **Fix**: Corrected to Kaiser Two-handed Sword (`1402001`) and Nova Dragon Essence (`1352501`).

2. **HEXA Sub-Skill Action Packet Mapping (`SkillConstants.java`)**:
   - **Kaiser**: Multi-hit animations and Final Form variants sent action sub-skill IDs (`61141001`, `61141003-05`, `61141007-08`, `61141010-12`, `61141014`, `61141016-17`, `61141501`). Without parent mapping in `getActualSkillIDfromSkillID`, skill level evaluated to 0, breaking damage and cooldowns.
   - **Angelic Buster**: 6th job sub-actions (`65141003-04`, `65140007`, `65141501-03`, `65141505`) and 5th job sub-skills (`400051027`, `400051047-48`) mapped to parent IDs.
   - **Kaiser Gauge Increments**: Added all Kaiser V-Matrix skills (`400011012-14`, `400011058-61`, `400011079-82`, `400011118-30`) and HEXA skills (`61141000-17`, `61141500-02`) to `getKaiserGaugeIncrementBySkill()`.

3. **Angelic Buster Skill Mechanics (`AngelicBuster.java` & `JobSkillHandler.java`)**:
   - **Trinity Fusion (`400051072`)**: Added handling to `handleAttack` with `trinityBuff(tsm)` damage boost and 100% affinity recharge.
   - **Recharge on Trinity Request**: Added `chr.hasSkill(AngelicBuster.HEXA_TRINITY)` to `JobSkillHandler.handleUserRequestSetOffTrinity`.
   - **Grand Finale Origin (`65141500`)**: Added 10s Freeze (`MobStat.Freeze`), 20s Origin Debuff (`MobStat.OriginDebuff`), and 100% AB skill recharge.
   - **Soul Seeker & Seeker Expert VI**: Updated `soulSeekerExpert` and `createSoulSeekerForceAtom` to dynamically support `HEXA_SOUL_SEEKER` (`65141001`), `HEXA_SOUL_SEEKER_EXPERT` (`65141002`), and atoms (`65141003`, `65141004`).
   - Added `HEXA_CELESTIAL_ROAR` (`65141006`) to `handleDebuffOnMob` for Stun.

4. **Kaiser Skill Mechanics (`Kaiser.java`)**:
   - **Nova Triumphant Origin (`61141500`)**: Added 10s Freeze, 20s Origin Debuff, and full Morph Gauge recharge (`incrementMorphGauge(1000)`).
   - **Pyroclastic Instinct (`61141502`)**: Added morph gauge increment.
   - **Tempest Blades VI (`61141006`, `61141007`)**: Supported in `getTempBladeSkill`, `handleSkill`, `createFlyingSwordForceAtom` (spawning `61141008`), and `handleSetCoolDownSkill`.
   - **Wing Beat VI (`61141015`, `61141016`)**: Added speed debuff in `handleDebuffOnMob`.

5. **Secondary Equipment Safety (`Job.java`)**:
   - Registered 4th Job secondaries in `Job.ensureSecondaryWeapon`:
     - Kaiser: `1352503` (Nova Truth Essence).
     - Angelic Buster: `1352604` (Green Soul Ring).

6. **Endgame Command Integration (`AdminCommands.java`)**:
   - **Auto-Detection**: `JobConstants.isKaiser(curJob) -> KAISER4 (6112)`, `JobConstants.isAngelicBuster(curJob) -> ANGELIC_BUSTER4 (6512)`.
   - **Command Arguments**: Supports `!endgame kaiser`, `!endgame angelic`, `!endgame ab`, and `!endgame angelicbuster`.
   - **Zero-Guessing Equipment Sets**:
     - Kaiser: Arcane Umbra Two-handed Sword (`1402259`), Nova Truth Essence (`1352503`), Dragon Emblem (`1190001`), Full Warrior Arcane Umbra set.
     - Angelic Buster: Arcane Umbra Soul Shooter (`1222113`), Green Soul Ring (`1352604`), Angel Emblem (`1190101`), Full Pirate Arcane Umbra set.
   - **Automatic V-Matrix Population**: Directly queries `VCore.getNodesForJob(job)` and injects all 4 class V-skill nodes at Max Level (Lv. 25) into the character's V-Matrix on executing `!endgame`.

7. **Compilation & Live Server Verification**:
   - Fat JAR compiled and packaged cleanly with Maven (0 errors).
   - Server tested and verified live: MariaDB 10.6 on port 33066, Login on 8484, API on 8483, Channels 1-10 on 8585-8594.


