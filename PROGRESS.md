# 📜 MapleStory v265 Server Development Progress & Active Log

This file tracks active bug fixes, feature implementations, and system optimizations.

## 📅 070e11a3 (13:05 น.) — Refactor & Audit Angelic Buster and Kain (Nova Classes), Zero Skill Injection in !endgame, Sub-Skill Matrix Sanitization, Cooldown Synchronization & Single Patch Packaging

### 🎯 Scope & Technical Details
- **หัวข้อ**: ตรวจสอบและรีแฟกเตอร์คลาส Nova (Angelic Buster & Kain), ตรวจสอบความถูกต้องของสกิล Class 1-4, Hexa V, และ Origin/Ascent Skills, ป้องกันการสแปมไอคอนสกิลย่อยขยะในหน้าต่างสกิล (K Skill UI / Matrix) เมื่อผู้เล่นอัปสกิล, ซิงค์คูลดาวน์และเงื่อนไขการใช้สกิลให้ถูกต้องสมบูรณ์ 100%, ปรับคำสั่ง `!endgame` ให้ปฏิบัติตามกฎเหล็ก Strict Zero Skill Injection โดยมอบเฉพาะแต้ม SP ผ่าน ExtendSP และไอเทมจำเป็นสำหรับอัปสกิลโดยไม่อัดฉีดเลเวลสกิลลงในตัวละคร, คอมไพล์ Maven JDK 21 และสร้างแพ็กเกจแพตช์ All-in-One ล่าสุด [`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip)
- **รายละเอียด**:
  1. **มาตรฐาน Strict Zero Skill Injection ในคำสั่ง `!endgame` ([`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java))**:
     - ลบกระบวนการ inject สกิลเลเวลเต็มทิ้งทั้งหมดตามกฎเหล็กข้อ 6 (`chr.addSkill(baseSkill)` ถูกถอดออกอย่างเด็ดขาด)
     - ปรับสถานะตัวละครเลเวล 260, ฟื้นฟู HP/MP 100%, แต้ม AP 1,250 และแต้ม SP เต็มพิกัดผ่าน `ExtendSP` สำหรับคลาส 1–4 เพื่อให้ผู้เล่นจัดสรรแต้มด้วยตนเองตามกลไกธรรมชาติ
     - สำเร็จเควสต์คลาส 5 (1460-1466) และเควสต์คลาส 6 (1488) แบบ `noRewards = true` ป้องกันลูกแก้วขยะ
     - มอบหิน Nodestones x3,000 (`2435719`), Experience Nodestones x20, Sol Erda Energy x1,000, Sol Erda Fragments x30,000, Power Elixir x3,000, เงิน 10B Mesos, และอุปกรณ์สวมใส่ BiS ครบเซ็ต (Kain ได้รับ Arcane Umbra Breath Shooter `1292023`, Princess No's Immortal Weapon Belt `1354017`, Mitra's Bowman Emblem `1190556`, และชุดเกราะอาร์เชอร์ครบเซ็ต)
     - เพิ่มระบบ Silent Purge สแกนและลบสกิลย่อยขยะ/ล่องหนที่มีเลเวล 0 ออกจากสถานะตัวละครอย่างเงียบๆ
  2. **การป้องกันปัญหาไอคอนสกิลย่อยขยะและการสแปมในหน้าต่างสกิล (Zero Phantom Sub-Skill Policy)**:
     - ใน [`SkillData.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/loaders/SkillData.java): เพิ่มการอ่านแอตทริบิวต์ `<int name="disable" value="1"/>` จาก WZ Data v265 หากพบให้กำหนด `skill.setInvisible(true)` โดยอัตโนมัติ เพื่อป้องกันไม่ให้ส่งโหนดสกิลพาสซีฟที่ระบบปิดการทำงาน (เช่น Strike Arrow Possess Passive Dummy, Scattering Shot Possess Dummy ฯลฯ) สู่ไคลเอนต์
     - ใน [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java): ลงทะเบียนสกิลย่อยที่ซ่อนอยู่ทั้งหมดของ Angelic Buster และ Kain ใน `isSpecialInvisibleSkill(int skillID)` และเพิ่มความสัมพันธ์ใน `getActualSkillIDfromSkillID` เพื่อให้ระบบนำค่าเลเวลและคูลดาวน์จากสกิลหลักมาใช้อย่างถูกต้อง
     - ใน [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java): ปรับปรุง `setJob` ให้กรองสกิลที่เป็น `isInvisible()` หรือ `isSpecialInvisibleSkill()` ออกจากแพ็กเก็ต `changeSkillRecordResult` และต้องมีเลเวลมากกว่า 0 จึงจะส่งแพ็กเก็ตอัปเดต ช่วยตัดปัญหาไอคอนสกิลกากบาทแดงโผล่ในปุ่ม K อย่างเด็ดขาด
     - ใน [`UserStatHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/UserStatHandler.java): แก้ไขเมธอด `syncMoXuanSubSkills` เพื่อนำโหนด dummy ที่ถูกปิดการทำงานออก ไม่ให้แอบส่งแพ็กเก็ตสกิลล่องหน
  3. **การตรวจสอบและปรับปรุงสกิล Angelic Buster ([`AngelicBuster.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/AngelicBuster.java))**:
     - ตรวจสอบสกิลคลาส 1–4, Affinity Heart I–IV, Soul Buster, Lovely Sting, Trinity, Soul Seeker, และ Soul Resonance
     - ตรวจสอบสกิล 5th Job V-Matrix: Energy Burst, Spotlight, Mascot Familiar, Trinity Fusion
     - ตรวจสอบสกิล 6th Job Hexa Matrix: HEXA Trinity, HEXA Soul Seeker, HEXA Celestial Roar, HEXA Super Nova, Grand Finale (Origin), และ Surprise Encore (Ascent)
     - เพิ่มเมธอด `handleSetCoolDownSkill(int skillId)` ซิงค์คูลดาวน์ให้ตรงระหว่างสกิลหลักและสกิลย่อย: `SURPRISE_ENCORE_ATTACK` ซิงค์กับ `SURPRISE_ENCORE`, `GRAND_FINALE_CHEER/ATTACK/HIT` ซิงค์กับ `GRAND_FINALE`, `HEXA_SUPREME_SUPERNOVA` ซิงค์กับ `SUPERNOVA`, และ `MIGHTY_MASCOT_BREATH/ATTACK` ซิงค์กับ `MIGHTY_MASCOT`
  4. **การตรวจสอบและปรับปรุงสกิล Kain ([`Kain.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/Kain.java))**:
     - ตรวจสอบสกิลคลาส 1–4: Strike Arrow I-III, Shadow Step, Shadow Swift, Grappling Wire, Dragon Fang, Scattering Shot, Shaft Break, Falling Dust, Chain Sickle, Poison Needle, Unseen Sniper, Death's Blessing, Remain Incense
     - ปรับปรุงเงื่อนไขเกจ Malice: ตรวจสอบเงื่อนไขการเปิดใช้งาน Possession (`case POSSESSION:`) ให้ต้องมี Malice สะสมอย่างน้อย 100 หน่วยขึ้นไป (`curMalice >= 100`) จึงจะเข้าสู่โหมด Possess ได้ ป้องกันการกดสแปมโดยไม่มีเกจ
     - ตรวจสอบสกิล 5th Job V-Matrix: Dragon Burst, Fatal Blitz, Thanatos Descent, Grip of Agony
     - ตรวจสอบสกิล 6th Job Hexa Matrix: HEXA Strike Arrow, HEXA Scattering Shot, HEXA Shaft Break, HEXA Falling Dust, HEXA Poison Needle, HEXA Chain Sickle, Total Annihilation (Origin), และ Churning Malice (Ascent)
     - เพิ่มเมธอด `handleSetCoolDownSkill(int skillId)` ซิงค์คูลดาวน์ร่วมกันระหว่างท่าปกติ, ท่า Possess, และท่า Execute (เช่น Shadow Step, Scattering Shot, Shaft Break, Falling Dust, Poison Needle, Chain Sickle, Unseen Sniper, Thanatos Descent, Churning Malice) ป้องกันการสแปมสกิล 0 วินาที
  5. **การคอมไพล์ ซิงค์มิเรอร์ และแพ็กเกจแจกจ่าย (Build, Mirror Sync & Single Patch Packaging)**:
     - คอมไพล์ผ่าน Apache Maven บน JDK 21 สำเร็จ (`BUILD SUCCESS`) ได้ `maplestory.jar` (~138 MB)
     - ซิงค์ไฟล์ `maplestory.jar` ไปยัง `Server263/`, `v214 src/` และ Root Directory
     - ซิงค์โค้ดที่แก้ไขทั้งหมด 7 ไฟล์ไปยัง Git Mirror [`maple265src/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/maple265src) ให้เท่ากัน 100%
     - ทดสอบการรันเซิร์ฟเวอร์จริงและ MariaDB บนพอร์ต 33066 สำเร็จ 100% เชื่อมต่อฐานข้อมูลและเปิดพอร์ตทั้ง 10 แชนเนลอย่างสมบูรณ์ ปราศจาก Error
     - แพ็กเกจไฟล์แพตช์เดี่ยว **[`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip)** (173.48 MB) พร้อมใช้งาน 100%

## 📅 [2026-10-17 11:00 น.] Fix Spaceship Doctor Boss Crash (Lotus & OMNI-CLN / Dr. Zindelblarp), Universal Boss Entry Dispatcher, Crystal Drop Integrity & Single Patch Packaging

### 🎯 Scope & Technical Details
- **หัวข้อ**: แก้ไขบัคบอสที่เป็นด็อกเตอร์บนยานอวกาศ (Lotus & Dr. Gelimer บนยานรบ Black Heaven และ OMNI-CLN & Dr. Zindelblarp บนยานแม่ Omega Sector) อาการเข้าห้องบอสแล้วเกมหลุดเด้งออกสู่ Desktop, จัดระบบเกิดบอสและสคริปต์ทางเข้า/ออกให้สมบูรณ์ 100%, ปรับแก้การดรอปผลึก Intense Power Crystal, และสร้างแพ็กเกจแพตช์ All-in-One ล่าสุด [`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip)
- **รายละเอียด**:
  1. **การแก้ไขบอส Lotus & Dr. Gelimer (Black Heaven Airship / Spaceship)**:
     - **ปัญหา (Problem)**: เมื่อผู้เล่นเดินทางเข้าสู่ห้องบอส Lotus (`350060700` Normal, `350060400` Hard) เกมจะเด้งหลุดออกจากเกมทันที (Client Crash / Desktop Disconnect ด้วย unhandled exception `0x01208491` / MSVC `ZException` ใน `CrashLog.txt`)
     - **สาเหตุ (Root Cause)**: ใน [`Lotus.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/Lotus.java) มีการบรอดแคสต์แพ็กเก็ตอุปสรรคตกจากเพดานและลำแสงเลเซอร์ (`FieldPacket.clearObtacle()`, `FieldPacket.createObtacle()`, `MobPool.laserControl()`) ซึ่งเป็นโครงสร้างแพ็กเก็ตของเวอร์ชันเก่า v214 เมื่อส่งมายังตัวเกมไคลเอนต์ v265 ทำให้เอนจิน C++ กราฟิกเกิด Crash ทันที
     - **วิธีแก้ (Fix)**:
       - ใน [`Lotus.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/Lotus.java): ลบการส่งแพ็กเก็ตอุปสรรคและเลเซอร์เก่าทิ้งทั้งหมด เปลี่ยนเป็นการเสกตัวบอสพร้อมค่า HP และสกิลโจมตีตามธรรมชาติของ WZ Data v265 อย่างสะอาด พร้อมเพิ่มโอเวอร์โหลด `spawn(Field field, Char chr, LotusPhase phase, LotusMode mode)`
       - ใน [`BossEntry.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/BossEntry.java): เพิ่มและปรับปรุงเคส `LOTUS_NORMAL`, `LOTUS_HARD`, และ `LOTUS_EXTREME` ให้วาร์ปและเสกม็อบเข้า Instance พร้อมกำหนดพิกัดฟุตโฮลด์จริง `(0, 398)`
       - ใน [`BossHelper.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/BossHelper.java): เพิ่มการจัดการเคลียร์บอสและรางวัลสำหรับ Lotus Phase 3 (`8950102`, `8950002`) และ Extreme Lotus Reward Chest (`8881203`, `8881300`)
       - ใน [`GameConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/GameConstants.java): ผูกผลึก Intense Power Crystal สำหรับ Lotus P3 และกล่อง Extreme อย่างแม่นยำ
  2. **การแก้ไขบอส OMNI-CLN & Dr. Zindelblarp (Omega Sector Mothership UFO)**:
     - **ปัญหา (Problem)**: บอสด็อกเตอร์บนยานอวกาศ Omega Sector (ด็อกเตอร์จินเดลบลาฟ `8880202` ผู้บังคับหุ่นยนต์ทำความสะอาด OMNI-CLN `8880200`) พิกัดเกิดในห้องเดิมลอยฟ้า `(700, 150)` ขาดตัวด็อกเตอร์ และไม่มีสคริปต์คุยกับ NPC รวมถึงไม่มีพอร์ทัลทางออก
     - **วิธีแก้ (Fix)**:
       - ใน [`BossEntry.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/BossEntry.java): ปรับปรุงเคส `OMNI_CLN_NORMAL` ให้เสกทั้ง OMNI-CLN (`8880200`) และ Dr. Zindelblarp (`8880202`) ลงบนฟุตโฮลด์จริง `(615, 298)` ในแผนที่ Air Vent D-77 (`221030910`)
       - สร้างสคริปต์ NPC ประจำตัว Dr. Zindelblarp: [`2052044.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/2052044.py), [`Caoong_accept.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/Caoong_accept.py), [`2052008.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/2052008.py) ใน Cockpit (`221030900`) รองรับการเข้าบอสทั้งแบบเดี่ยวและปาร์ตี้ผ่าน `BossEntry.enter`
       - สร้างสคริปต์เข้าแมพและพอร์ทัลทางออก: [`Fenter_221030910.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/field/Fenter_221030910.py), [`enter_221030910.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/field/enter_221030910.py) และ [`pt2_221030910.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/portal/pt2_221030910.py) ผ่าน `sm.exitBoss()`
       - ใน [`boss_arena.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/boss_arena.py): สลับ Map ID ของ Normal Lotus (`350060700`) และ Hard Lotus (`350060400`) ให้ถูกต้องตาม WZ Data, เพิ่ม Extreme Lotus (`350068100`), และเพิ่มเมนู Normal OMNI-CLN (1.68B HP) ในหมวด Classic & Early Bosses
  3. **การคอมไพล์ ส่งมอบ และแพ็กเกจแจกจ่าย (Build, Deploy & Single Patch Packaging)**:
     - คอมไพล์ผ่าน Apache Maven บน OpenJDK 21 สำเร็จ (`BUILD SUCCESS`) ได้ `maplestory.jar` (~138 MB)
     - ซิงค์ไฟล์ `maplestory.jar` และสคริปต์ไปยัง `Server263/`, `v214 src/`, และ Root Directory
     - ทดสอบการรันเซิร์ฟเวอร์จริงและ MariaDB ผ่านพอร์ต 33066 สำเร็จ 100% ปราศจาก Error
     - แพ็กไฟล์แพตช์เดี่ยว **[`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip)** (173.48 MB) ตามกฎเหล็กข้อที่ 4

## 📅 [2026-10-16 23:00 น.] Boss Lifecycle Leak Fixes, Deterministic Crystal Economy, Matrix Sub-Skill Sanitization & All-in-One Patch Packaging

### 🎯 Scope & Technical Details
- **หัวข้อ**: แก้ไขปัญหา Memory/Timer Leak ในระบบบอสและ Instance, กำหนดระบบดรอปผลึก Intense Power Crystal และเรทราคาตรงตามความยากสำหรับ 12 บอสหลัก, บล็อกการส่งแพ็กเก็ตสกิลย่อยที่ซ่อนอยู่ (Invisible Sub-Skills) สู่ไคลเอนต์, และสร้างแพ็กเกจแพตช์ All-in-One ล่าสุด [`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip)
- **รายละเอียด**:
  1. **การแก้ไขระบบวงจรชีวิตบอสและการคืนทรัพยากร (Boss Lifecycle & Leak Prevention)**:
     - **ปัญหา (Problem)**: เมื่อบอสตายหรือตัวละครออกจากห้องบอส ตารางเวลาเกิดม็อบซ้ำ (`spawnMobRespawnable`), ฝูงผีเสื้อ (`spawnButterflyTimer`), เอฟเฟกต์สนามรบ, และ Will Gauge Timer บนตัวละครยังคงทำงานค้างอยู่ในหน่วยความจำ ก่อให้เกิด Memory Leak และการคืนสภาพแมพผิดปกติ
     - **วิธีแก้ (Fix)**:
       - ใน [`Field.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/field/Field.java): เพิ่มสถานะ `isCleared`, เมธอด `clearFieldTimersAndSchedules()`, ยกเลิก `ScheduledFuture` ของไลฟ์สเกดูลทั้งหมดอย่างปลอดภัย และดักกั้นไม่ให้ `spawnMobRespawnable` ทำงานซ้ำเมื่อแมพถูกเคลียร์แล้ว
       - ใน [`Instance.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/field/Instance.java): ปรับปรุง `clear()` ให้ยกเลิก Will gauge timer, หยุดกิจกรรม Script Manager, ดักจับค่า Null ของ Client/Field และสั่งเคลียร์ Field ทุกลูป
       - พัฒนาชุดทดสอบ Empirical Verification 8 ชุดใน [`BossLifecycleVerificationTest.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/test/java/net/swordie/ms/BossLifecycleVerificationTest.java) ผลการทดสอบผ่าน 100% (8 PASSED, 0 FAILED)
  2. **ระบบ Intense Power Crystal และการปรับแมปบอส 12 ตัว (Deterministic Crystal Economy)**:
     - ใน [`GameConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/GameConstants.java) และ [`BossHelper.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/BossHelper.java): ผูกรหัสผลึกและราคาดรอปที่แน่นอนตามระดับความยาก 12 บอสหลัก (Zakum, Arkarium, Pink Bean, Von Leon, Cygnus, Hilla, Magnus, Mori Ranmaru, Papulatus P2, Root Abyss, OMNI-CLN, Princess No)
     - ใน [`VonLeon.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/VonLeon.java): แก้ไข Mob ID การเกิดของ Von Leon ให้ตรงระดับ Easy (`8840007`), Normal (`8840000`), Hard (`8840014`)
     - ปรับปรุงสคริปต์วาร์ปออกห้องบอสและบล็อกพอร์ทัล: [`giantBossPortal.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/portal/giantBossPortal.py), [`out00.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/portal/out00.py), [`out_cygnus.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/portal/out_cygnus.py), [`out_populatus.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/portal/out_populatus.py), [`papulatusBlock.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/portal/papulatusBlock.py), [`2083002.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/2083002.py), [`2144017.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/2144017.py), [`hontale_out.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/hontale_out.py)
  3. **การกรองสกิลย่อยขยะและการโหลดสกิล (Sub-Skill Sanitization & Lazy Job Loading)**:
     - ใน [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) และ [`UserStatHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/UserStatHandler.java): กรอง `SkillConstants.isSpecialInvisibleSkill` และ `subSi.isInvisible()` ไม่ให้แพ็กเก็ตส่งไปยังไคลเอนต์ ป้องกันการเกิดปุ่มกากบาทแดงใน UI
     - ใน [`SkillData.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/loaders/SkillData.java): นำ `loadedJobs` มาแคชเพื่อป้องกันการโหลดข้อมูลสกิลของอาชีพซ้ำซ้อน
  4. **การคอมไพล์ ส่งมอบ และสร้างไฟล์แพตช์ (Build, Deploy & Single Patch Packaging)**:
     - คอมไพล์ผ่าน Apache Maven บน JDK 21 สำเร็จ (`BUILD SUCCESS`) ได้ `maplestory.jar` (~138 MB)
     - ซิงค์ไฟล์ `maplestory.jar` ไปยัง `Server263/`, `v214 src/` และ Root Directory
     - อัปเดตเครื่องมือสร้างแพตช์ [`tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/create_patch.py) ให้รวมโฟลเดอร์ `docs/` และปรับปรุง `Apply_Patch.bat`
     - แพ็กไฟล์แพตช์เบ็ดเสร็จไฟล์เดียว **[`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip)** (173.53 MB) พร้อมใช้งานทันที 100%

## 📅 [2026-10-16 18:18 น.] Unification & Alignment of Project Agent Directives (AGENTS.md, Rules & Skills)

### 🎯 Scope & Technical Details
- **หัวข้อ**: ปรับปรุงและประสานแนวทางของไฟล์ Agent ทั้งหมดให้ทำงานไปในทิศทางเดียวกัน 100% (Unified Agent Directives) ครอบคลุม [`AGENTS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/AGENTS.md), กฎระเบียบใน `.agents/rules/`, และ Skills ใน `.agents/skills/`
- **รายละเอียด**:
  1. **การปรับปรุงแม่บทกฎเหล็กสูงสุด ([`AGENTS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/AGENTS.md))**:
     - เพิ่มหมวดที่ 3: **Clean Directory Standard & Zero-Scratch Policy** กำหนดให้ Root คงไว้เฉพาะ Smart Launchers (`*.bat`), `AGENTS.md`, `README.md`, `PROGRESS.md`, `backup.sql`, และ `maplestory.jar`
     - กำหนดให้คู่มือทั้งหมดต้องอยู่ใน [`docs/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/docs) เท่านั้น
     - ห้ามสร้างโฟลเดอร์ `scratch/` หรือทิ้งไฟล์สคริปต์ทดสอบชั่วคราว และห้ามสร้างไฟล์ Handoff ย่อย
     - บรรจุมาตรฐาน **Zero Phantom Sub-Skill Policy** และระบบ Auto-Purge ในฐานข้อมูล MariaDB เพื่อป้องกันไอคอนขยะในหน้าต่าง Matrix UI
     - บรรจุมาตรฐาน **Strict Zero-Skill-Injection Standard** ในคำสั่ง `!endgame`
     - บรรจุระบบ **Super Buff All 2 Hours** (`!buffall` / `@buff` / NPC 1-Click)
  2. **การอัปเดตกฎและทักษะใน `.agents/`**:
     - สร้างกฎใหม่ [`.agents/rules/clean-directory-standard.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/.agents/rules/clean-directory-standard.md)
     - อัปเดตคู่มือและกฎใน [`.agents/skills/maplestory-server-runner/SKILL.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/.agents/skills/maplestory-server-runner/SKILL.md) และ [`.agents/skills/maplestory-bug-knowledge/SKILL.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/.agents/skills/maplestory-bug-knowledge/SKILL.md) ให้มีเนื้อหาและข้อกำหนดตรงกันทุกข้อ
  3. **การซิงค์ตรงกัน 100% ข้ามโฟลเดอร์**:
     - ซิงค์ตรงกันระหว่าง Root Directory, `v214 src/`, และ `maple265src/`

## 📅 [2026-10-16 18:05 น.] Workspace Document Cleanup & Directory Reorganization

### 🎯 Scope & Technical Details
- **หัวข้อ**: ทำความสะอาดและจัดระเบียบโครงสร้างเอกสารโปรเจกต์ (Document Cleanup & Directory Reorganization) กวาดล้างเอกสาร Handoff เก่า, แผนงานที่ล้าสมัย, สคริปต์ขยะชั่วคราว, พร้อมรวบรวมคู่มือทั้งหมดเข้าสู่โฟลเดอร์ `docs/` เพื่อความเป็นระเบียบและมาตรฐานสากล
- **รายละเอียด**:
  1. **การลบเอกสารเก่าและไฟล์ขยะที่ไม่จำเป็น (Obsolete Files Purge)**:
     - ลบเอกสาร Handoff เก่า: `HANDOFF.md`, `ARCANE_SYMBOLS_HANDOFF.md`
     - ลบเอกสารบันทึกชั่วคราว: `Kahli.md`, `PORTABLE_DB_DISTRIBUTION_PLAN.md`, `PORTABLE_README.md`, `คู่มือการใช้งาน_Portable.txt`
     - ลบไฟล์ประวัติเก่าที่เทอะทะ: `PROGRESS_ARCHIVE.md` (610 KB)
     - ลบโฟลเดอร์สคริปต์สแกนทดสอบชั่วคราว: `scratch/` (21 ไฟล์สคริปต์ Python ชั่วคราว)
     - ลบไฟล์แพตช์เก่าที่ตกค้าง: `v214 src/Patches/` (ไฟล์แพตช์ขนาด 127 MB จากวันที่ 2026-10-12)
  2. **การจัดระเบียบโฟลเดอร์คู่มือใหม่อย่างเป็นระบบ (`docs/`)**:
     - สร้างโฟลเดอร์ `docs/` ทั้งในโฟลเดอร์หลัก (Root) และใน `v214 src/`
     - ย้ายคู่มือคำสั่งทั้งหมด [`MapleStory_Commands_Guide.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/docs/MapleStory_Commands_Guide.md) เข้าสู่ `docs/`
     - ย้ายคู่มือการใช้งาน [`HOW_TO_USE.txt`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/docs/HOW_TO_USE.txt) และคู่มือเล่นผ่านวง LAN [`HOW_TO_PLAY_LAN.txt`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/docs/HOW_TO_PLAY_LAN.txt) เข้าสู่ `docs/`
     - คงไฟล์คู่มือใน [`Server263/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263) ไว้เพื่อความสมบูรณ์ของตัวติดตั้งและแจกจ่าย
  3. **การรีเซ็ตและปรับปรุงเอกสารบันทึก Progress (`PROGRESS.md`)**:
     - รีเซ็ต `PROGRESS.md` ให้คงเฉพาะประวัติและฟีเจอร์เวอร์ชันปัจจุบันที่กำลังใช้งานจริง ลดขนาดเอกสารให้อ่านง่าย สบายตา และมีประสิทธิภาพสูง
     - ซิงค์ตรงกันทั้งใน `v214 src/PROGRESS.md` และ Root `PROGRESS.md`

## 📅 [2026-10-16 15:15 น.] Implementation of !buffall / @buff System, 2-Hour God-Tier Combat & Farming Buff Engine, and Maple Admin NPC 1-Click Integration

### 🎯 Scope & Technical Details
- **หัวข้อ**: เพิ่มคำสั่ง `!buffall` (สำหรับ Admin) และ `@buffall` / `@buff` (สำหรับผู้เล่นทั่วไป/LAN) พร้อมเพิ่มเมนูคลิกใน NPC Maple Admin เพื่อมอบบัฟต่อสู้ บอสซิ่ง และฟาร์มระดับท็อป 20+ บัฟ ระยะเวลา 2 ชั่วโมงเต็มเบ็ดเสร็จในปุ่มเดียว
- **รายละเอียด**:
  1. **การวิเคราะห์ประเภทบัฟและมาตรฐานความเสถียร (Comprehensive Buff Analysis)**:
     - คัดเลือกเฉพาะบัฟที่ทำงานผ่านระบบ `CharacterTemporaryStat` (CTS) และ WZ `SpecStat` ที่เป็นมาตรฐานสากล 100% ไม่ชนกัน และไม่ก่อให้เกิดปัญหา Client Crash หรือ Packet Desync
     - **หมวดที่ 1: สกิล V-Matrix Decent Skills (ทุกอาชีพใช้ได้ 100%)**:
       - `HolySymbol` & `DropRate` (Decent Holy Symbol `400001020`): โบนัส EXP +35%, อัตราดรอปไอเทม +24%
       - `SharpEyes` (Decent Sharp Eyes `400001002`): อัตราคริติคอล +15%, ดาเมจคริติคอล +15%, เจาะเกราะ IED +5%
       - `CombatOrders` (Decent Combat Orders `400001004`): เพิ่มเลเวลสกิลทั้งหมด +2 เลเวล (ทะลุเพดาน Master Level)
       - `PDD`, `IndiePAD`, `IndieMAD`, `IndieMHP`, `IndieMMP` (Decent Advanced Blessing `400001003`): พลังโจมตี/เวท +30, พลังป้องกัน +425, Max HP/MP +700
       - `IndieBooster` (Decent Speed Infusion `400001005`): เร่งความเร็วโจมตี +1 Stage
       - `MaxHP` & `MaxMP` (Decent Hyper Body `400001001`): Max HP +60%, Max MP +60%
       - `Speed` & `Jump` (Decent Haste `400001000`): วิ่งไว 140 (Max), กระโดด 120 (Max)
       - `BasicStatUp` (Maple Warrior `100001215`): สเตตัสพื้นฐานทั้งหมด +15%
       - `IndieDamR` (Hero's Echo `1005`): พลังโจมตีรวม +4% Total Damage
       - `IndieBDR`, `IndieIgnoreMobpdpR`, `IndiePMdR`, `IndieCD` (Noblesse Guild Skills): Boss Damage +30%, IED +30%, Final/Total Damage +30%, Crit Damage +30%
     - **หมวดที่ 2: สุดยอดยาบัฟบอสและอาหารเพิ่มพลัง (God-Tier Boss & Combat Consumables)**:
       - `Onyx Apple` (`2022179`): พลังโจมตีกายภาพ +100, พลังโจมตีเวท +100, ป้องกัน +20
       - `Adv. Boss Rush Boost Potion` (`2003596`): Boss Damage +20%
       - `Adv. Penetrating Boost Potion` (`2003598`): Ignore Monster DEF (IED) +20%
       - `Adv. Great Hero Boost Potion` (`2003597`): Weapon ATT +30, Magic ATT +30
       - `Extreme Red Potion` (`2023125`): Weapon ATT +30, Max HP +2,000
       - `Extreme Green Potion` (`2023126`): Attack Speed +1 Stage (ปลดล็อกข้าม Soft Cap สู่ขีดสุดความเร็ว)
       - `Extreme Blue Potion` (`2023127`): Magic ATT +30, Max MP +2,000
       - `Extreme Gold Potion` (`2023128`): Bonus EXP +10%, Max HP/MP +2,000
       - `MVP Superpower Buff` (`2023544`): Weapon ATT +30, Magic ATT +30
       - `Guild's Greater Blessing` (`2022458`): Weapon ATT +10, Magic ATT +10, Speed +10
     - **หมวดที่ 3: บัฟเร่งฟาร์ม EXP, Drop และ Meso**:
       - `EXP Accumulation Potion (EAP)` (`2003550`): โบนัส EXP ทับซ้อน +10%
       - `Wealth Acquisition Potion (WAP)` (`2003551`): อัตราดรอปไอเทม +20%, อัตราดรอปเงิน Meso +20%
     - **หมวดที่ 4: การฟื้นฟูสุขภาพและแก้ทางสถานะ**:
       - ฟื้นฟูเลือดและมานาเต็ม 100% ทันที (`chr.heal(chr.getMaxHP())`, `chr.healMP(chr.getMaxMP())`)
       - ล้างสถานะผิดปกติที่เป็นลบทั้งหมด (`tsm.removeAllDebuffs()`)
       - แสดงแอนิเมชันเอฟเฟกต์การร่ายบัฟทั้งบนจอผู้เล่นและผู้เล่นอื่นในแมพ (`Effect.avatarOriented("Skill/40000.img/skill/400001020/effect")`)
  2. **การแก้ไขโค้ดและการสร้างระบบ (Technical Implementation)**:
     - **[`ItemBuffs.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/items/ItemBuffs.java)**: พัฒนา Overload Method `giveItemBuffsFromItemID(Char chr, TemporaryStatManager tsm, int itemID, long customDuration)` เพื่อให้สามารถกำหนดระยะเวลาบัฟของไอเทมยาให้ยาวนานตามที่ต้องการได้ (7,200 วินาที / 2 ชั่วโมง) โดยไม่ถูกบังคับเวลาตาม WZ เดิม
     - **[`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)**:
       - สร้างฟังก์ชันแกนกลาง `public static void giveBuffAll(Char chr)` ที่รวบรวมทั้ง Decent Skills, Noblesse Stats, และ Consumable Potions ส่งแพ็กเก็ตเดียวให้ตัวละคร
       - ลงทะเบียนคำสั่ง `@Command(names = {"buffall", "buff", "buffme"}, requiredType = Admin)`
     - **[`PlayerCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/PlayerCommands.java)**:
       - ลงทะเบียนคำสั่งระดับผู้เล่น `@Command(names = {"buffall", "buff", "buffme"}, requiredType = Player)` เพื่อให้เพื่อนในวง LAN หรือตัวละครผู้เล่นทั่วไปสามารถพิมพ์ `@buff` หรือ `@buffall` ได้สะดวกสบาย
       - บรรจุคำอธิบายลงในคำสั่ง `@help`
     - **[`quick_adminNPC.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/quick_adminNPC.py)**:
       - เพิ่มเมนู `#r#L23##e[Super Buff All (2 Hours)]#n#k` ในหมวด Character & Progression Tools
       - ซิงค์ไฟล์สคริปต์ไปยังทั้ง `v214 src/` และ `Server263/`
  3. **การคอมไพล์และการส่งมอบ (Build & Deployment Target)**:
     - รัน Maven Package บน JDK 21 สำเร็จ 100% (`BUILD SUCCESS`)
     - คัดลอก Fat JAR อัปเดตไปยัง `Server263/maplestory.jar` และ Root `maplestory.jar` เรียบร้อย

## 📅 [2026-10-16 13:20 น.] Ren Ascent (Rising Azure Dragon: Heartbound Verse) 3-Stage Combo Sequential Transformation & Strict Cooldown Refactor

### 🎯 Scope & Technical Details
- **หัวข้อ**: ปรับปรุงและ Refactor ลอจิกสกิล Ascent คลาส 6 ของอาชีพ Ren (Rising Azure Dragon: Heartbound Verse) ให้ทำงานเป็นท่าชุดคอมโบ 3 ขั้นตอนต่อเนื่องอย่างสมบูรณ์แบบ, แก้ไขการสแปมสกิล 0 คูลดาวน์, และผูกคูลดาวน์ 240 วินาทีอย่างถูกต้อง
- **รายละเอียด**:
  1. **การยืนยันกลไกสกิล Ascent**:
     - ทักษะทั้ง 3 ทักษะ (`Falling Flower` รหัส `161141502`, `Climbing Serpent` รหัส `161141503`, และ `Soaring Dragon` รหัส `161141504`) คือสกิลเดียวกัน 100%
     - เป็นท่าคอมโบต่อเนื่อง 3 ลำดับ (3-Stage Sequence) ของสกิล Ascent หลัก `HEARTBOUND_VERSE` (`161141506`) ซึ่งจะอยู่บนปุ่มคีย์ลัดเดียวกัน:
       - ขั้นที่ 1 (`Falling Flower` 161141502): ร่ายพายุคมดาบกลีบดอกไม้ (มีระยะเวลาทำงาน 30 วินาที) ปุ่มจะเปลี่ยนเป็นขั้นที่ 2
       - ขั้นที่ 2 (`Climbing Serpent` 161141503): กดซ้ำในระหว่างพายุดาบเพื่อปล่อยมังกรเขี้ยวงู ปุ่มจะเปลี่ยนเป็นขั้นที่ 3
       - ขั้นที่ 3 (`Soaring Dragon` 161141504): กดซ้ำอีกครั้งเพื่อปล่อยมังกรฟ้าฟาดฟันปิดฉาก
       - เมื่อกดครบขั้นที่ 3 หรือหมดเวลา 30 วินาที สกิลจะกลับสู่ร่างเดิมและติดคูลดาวน์ 240 วินาที
  2. **สาเหตุของบั๊ก "กดใช้ได้ตลอดไม่มีคูลดาวน์"**:
     - ใน `SkillConstants.java`: สกิลหลัก `161141506` ตกไปที่เคส `default` ของ `getActualSkillIDfromSkillID` ทำให้ถูกลดทอนกลายเป็น `161141500` (Origin 1) ส่งผลให้การตรวจเช็คคูลดาวน์คลาดเคลื่อน
     - ใน `Char.checkAndSetSkillCooltime`: เคส `isAscent` มีการอนุญาตให้สกิลที่อยู่ในสถานะ `Holding` ข้ามการตรวจเช็คคูลดาวน์ได้ แต่ไม่ได้ยกเว้นสกิลเริ่มต้น (Stage 1 / Base) ทำให้เมื่อมีบัฟ `Holding` อยู่ ผู้เล่นสามารถกดร่าย Stage 1 ซ้ำๆ ได้ตลอดเวลาแบบ 0 คูลดาวน์
     - ใน `Ren.java`: ยังไม่มีระบบ State Machine สลับสเตจ 1 -> 2 -> 3 ผ่านแพ็กเก็ต `UserLocal.registerExtraSkill` และไม่มีการจำกัดสิทธิ์การกดใช้งานตามลำดับขั้น
  3. **การแก้ไขและการ Refactor**:
     - **[`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)**: เพิ่ม `case 161141506: return 161141506;` ป้องกันไม่ให้รหัส Ascent ถูกแปลงเป็น Origin 1
     - **[`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java)**: ระบุว่าสกิลเริ่มต้นของ Ascent (`checkAscentId` และ `161141502`) จะต้องปฏิบัติตามคูลดาวน์อย่างเคร่งครัดเสมอ **ห้ามข้ามคูลดาวน์เด็ดขาด** (อนุญาตเฉพาะท่าต่อเนื่องย่อยในระหว่างหน้าต่าง 30 วินาทีเท่านั้น)
     - **[`Ren.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/anima/Ren.java)**:
       - สร้างระบบติดตามสเตจ `heartboundVerseStage` (0 = พร้อมใช้งาน, 1 = อยู่ในขั้น Falling Flower, 2 = อยู่ในขั้น Climbing Serpent)
       - เมื่อกด Stage 1 (`HEARTBOUND_VERSE` / `FALLING_FLOWER`): เช็คคูลดาวน์ 240 วินาที, มอบสถานะอมตะ 7 วินาที, เรียกซัมมอนพายุกลีบดอกไม้, มอบบัฟ `Holding` 30 วินาที, และส่งแพ็กเก็ต `UserLocal.registerExtraSkill` สลับปุ่มเป็น `CLIMBING_SERPENT` (Stage 2)
       - เมื่อกด Stage 2 (`CLIMBING_SERPENT`): ตรวจสอบว่าอยู่ในสเตจ 1 และมีบัฟ `Holding` หรือไม่ หากถูกต้องจึงทำดาเมจและส่ง `registerExtraSkill` สลับปุ่มเป็น `SOARING_DRAGON` (Stage 3)
       - เมื่อกด Stage 3 (`SOARING_DRAGON`): ตรวจสอบว่าอยู่ในสเตจ 2 หรือไม่ เมื่อทำดาเมจปิดฉากแล้ว จะทำการเคลียร์บัฟ `Holding`, ปลดซัมมอนออกจากแมพ, และรีเซ็ตปุ่มคีย์ลัดกลับสู่สกิลหลักเพื่อแสดงเวลาคูลดาวน์ที่เหลือ 240 วินาทีอย่างถูกต้อง
       - ใน `handleAttack`: สกิล `CLIMBING_SERPENT` และ `SOARING_DRAGON` ไม่ถูกฮาร์ดโค้ดคูลดาวน์ 240 วินาทีซ้อนทับ ป้องกันปัญหาท่าต่อเนื่องถูกล็อก
     - **[`AttackHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/AttackHandler.java)**: ป้องกันไม่ให้การโจมตีของ Stage 1 (`161141502`) สแปมซ้ำซ้อนได้หลังจากคัตซีนสิ้นสุดลงหากสกิลหลักติดคูลดาวน์
  4. **ผลการคอมไพล์ & แพ็กเกจส่งมอบ**:
     - คอมไพล์ผ่านสมบูรณ์ 100% (`BUILD SUCCESS`)
     - ส่งมอบ `maplestory.jar` (~138 MB) ไปยัง `Server263/` และ root
     - อัปเดตไฟล์แพตช์เดี่ยว `Patches/Server263_Patch_Latest.zip` (173.47 MB)

## 📅 [2026-10-16 12:15 น.] Absolute Elimination of Phantom Sub-Skills from V Matrix & HEXA Matrix UI, Auto-Purge of Dirty Database Records, and Zero-Cooldown Sub-Skill Spam Prevention

### 🎯 Scope & Technical Details
- **หัวข้อ**: กำจัดไอคอนสกิลย่อยขยะซ้ำซ้อนในแท็บ HEXA Matrix และ V Matrix อย่างถาวร 100%, พัฒนาระบบ Auto-Purge ทำความสะอาดตาราง `skills` ในฐานข้อมูล MariaDB อัตโนมัติ, ระงับการส่งแพ็กเก็ตที่กระตุ้นให้ไคลเอนต์สร้างปุ่มสกิลย่อยใน UI, และบล็อกการกดสแปมสกิลย่อยแบบ 0 คูลดาวน์อย่างสมบูรณ์แบบ
- **รายละเอียด**:
  1. **การค้นพบสาเหตุที่แท้จริงของไอคอนขยะซ้ำซ้อนใน UI**:
     - หน้าต่าง HEXA Matrix ปรากฏไอคอน `Rising Azure Dragon..` ซ้ำกันถึง 7 ช่อง (รหัส `161141500` ถึง `161141506`)
     - หน้าต่าง V Matrix ปรากฏไอคอนสกิลย่อยซ้ำกันถึง 10 ช่อง ทั้ง `Final Plum Blossom..`, `Soul Immeasurable`, และ `Final Imugi Spirit..` พร้อมสัญลักษณ์ติดกากบาทแดง
     - ไคลเอนต์ MapleStory v265 สำหรับแท็บ V Matrix และ HEXA Matrix จะสร้างปุ่มไอคอนขึ้นมาเมื่อได้รับแพ็กเก็ตอัปเดตสกิล แม้สกิลนั้นจะมีเลเวล 0 ก็ตาม
     - ตอนเข้าเกม ตัวเซิร์ฟเวอร์เดิมไม่ได้กรอง `isInvisible()` ออก ทำให้สกิลย่อยที่เคยถูกบันทึกค้างไว้ในตาราง `skills` ถูกส่งเข้าไคลเอนต์
  2. **ระบบ Auto-Purge ข้อมูลสกิลขยะในฐานข้อมูล ([`Skill.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/skills/Skill.java))**:
     - ใน `getSkillsFromSQLByCharID`: เมื่อโหลดสกิลของตัวละครจาก MariaDB ระบบจะสแกนตรวจสอบว่าสกิลใดเป็นสกิลล่องหน (`isSpecialInvisibleSkill` หรือ `si.isInvisible()`) หรือมี `currentLevel <= 0`
     - หากตรวจพบ จะไม่นำเข้าสู่หน่วยความจำของตัวละคร และสั่งรัน Batch SQL ลบทิ้งทันที (`DELETE FROM skills WHERE charid = ? AND skillid = ?`) ทำให้ตารางฐานข้อมูลสะอาด 100% ตั้งแต่ล็อกอินครั้งแรก
  3. **การกรองแพ็กเก็ตก่อนส่งไคลเอนต์อย่างเข้มงวด ([`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java))**:
     - ใน `Char.encode` (`DBChar.SkillRecord`): เพิ่มตัวกรอง `!SkillConstants.isSpecialInvisibleSkill`, `!si.isInvisible()`, และ `currentLevel > 0` เพื่อตัดสกิลย่อยและสกิลเลเวล 0 ออกจากแพ็กเก็ตสร้างหน้าต่างสกิลทั้งหมด
     - ใน `addListSkill` และ `applySkillList`: กรองสกิลที่เข้าเงื่อนไข Invisible ออก ไม่บรรจุลงใน `visibleSkills` ที่จะส่งไปไคลเอนต์
     - ใน `removeSkillAndSendPacket`: หากเป็นสกิล Invisible จะเรียก `removeSkill` เพื่อลบออกจากเซิร์ฟเวอร์และฐานข้อมูลอย่างเงียบๆ โดยไม่ส่งแพ็กเก็ต `changeSkillRecordResult` ไปกระตุ้นให้ไคลเอนต์สร้างปุ่มใน UI
  4. **การบล็อกการสแปมสกิลย่อยแบบ 0 คูลดาวน์ ([`SkillHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/SkillHandler.java) & [`AttackHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/AttackHandler.java))**:
     - ใน `SkillHandler.handleUserSkillUseRequest`: ตรวจสอบ `chr.hasSkillOnCooldown(actualSkillId)` ทันที หากสกิลหลักติดคูลดาวน์ จะแจ้งเตือนและยกเลิกคำขอ
     - ใน `AttackHandler.handleAttack`: ตรวจสอบสถานะบัฟเงื่อนไขของสกิลย่อย หากไม่มีบัฟของสกิลหลักทำงานอยู่ หรือสกิลหลักติดคูลดาวน์ จะทำการปฏิเสธการโจมตีทันที (`chr.dispose(); return;`) ป้องกันการกดสแปม 0 คูลดาวน์ได้ 100%

## 📅 [2026-10-16 11:35 น.] Comprehensive Ren Class Refactor: Zero-Cooldown Ascent Sub-Skill Elimination, Monster Freeze Bug Resolution, Complete Arcane Symbol Removal from Endgame, and Full Cooldown Audit (1st–6th Job)

### 🎯 Scope & Technical Details
- **หัวข้อ**: ปรับปรุงและ Refactor อาชีพ Ren (`16002`, `16100`–`16114`) ครั้งใหญ่: แก้ไขปัญหาสกิลคลาส 6 Ascent `Climbing Serpent` (`161141503`) สแปมได้ตลอดเวลา, แก้ไขบั๊กมอนสเตอร์หยุดเดินเหมือนเซิร์ฟล่มจาก `MobStat.Freeze` ค้าง, ยกเลิกการเสกลูกแก้ว Arcane Symbol ในคำสั่ง `!endgame`, กวาดล้างสกิลย่อยขยะทั้ง V Matrix และ HEXA Matrix ออกจาก UI ถาวร, พร้อมตรวจสอบเงื่อนไขและคูลดาวน์สกิล Ren ครบทั้ง 1–6 คลาส
- **รายละเอียด**:
  1. **การแก้ไขบั๊กสกิล Ascent `Climbing Serpent` (`161141503`) สแปมได้ตลอดเวลา**:
     - ใน `checkAndSetSkillCooltime`: ตรวจสอบสถานะสกิล Ascent หากผู้เล่นพยายามกดสกิลย่อย (`actualSkillID != skillID`) โดยที่บัฟสถานะ Ascent ไม่ได้ทำงานอยู่ ระบบจะปฏิเสธการใช้งานทันที (`return false`)
     - ตรวจสอบ `hasSkillOnCooldown` ร่วมกันทั้ง `skillID` และ `actualSkillID` หากหมดช่วงเวลา 30 วินาที หรือติดคูลดาวน์ 240 วินาที จะไม่อนุญาตให้กดใช้ได้อีก
  2. **การแก้ไขบั๊กมอนสเตอร์หยุดเดินเหมือนเซิร์ฟเวอร์ล่ม (Monster Freeze Lock Issue)**:
     - ตัด `MobStat.Freeze` และ `OriginDebuff` ออกจากสกิลตระกูล `HEARTBOUND_VERSE` ทั้งหมด (สกิล Ascent เป็นสกิลโจมตี/บัฟ ไม่ใช่สกิลหยุดมอนสเตอร์)
     - จำกัดการใช้งาน `MobStat.Freeze` (10s) ไว้เฉพาะคัตซีน Origin 1 (`DIVIDED_HEAVENS` คูลดาวน์ 360 วินาที) เพียงสกิลเดียวเท่านั้น พร้อมเพิ่มเงื่อนไข `!mts.hasCurrentMobStat(MobStat.Freeze)`
  3. **ยกเลิกการเสกลูกแก้ว Arcane Symbol ในคำสั่ง `!endgame`**:
     - ปรับการสำเร็จเควสต์คลาส 5 (`1460`–`1466`) และเควสต์คลาส 6 (`1488`) ให้ส่งอาร์กิวเมนต์ `noRewards = true` (`chr.completeQuest(q, true)`) ป้องกันเควสต์แจกลูกแก้ว Arcane Symbol อัตโนมัติ
     - เพิ่มระบบเคลียร์ลูกแก้ว Arcane Symbol (`1712000`–`1712006`) ออกจากทั้งช่องสวมใส่และช่องสัมภาระ หากมีหลงเหลืออยู่
  4. **ตรวจสอบและรองรับคูลดาวน์สกิล Ren ครบถ้วนทั้งคลาส 1–6 ใน [`Ren.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/anima/Ren.java)**:
     - ทุกสกิลมีคูลดาวน์ตรงตาม WZ: Burrowing Earth (20s), Wish Unending (20s), Riotous Heart (10s), Hearts United (30s), Unity (1s), Unbowed Blade (70s), Sublimation (120s), Plum Branch Snare (120s), Years Uncounted (60s), Thousand Blossom Flurry (120s), Soul Immeasurable (120s), Dancing Annihilation (120s), Blade of the Unbound Heart (1s), Divided Heavens (360s), Heartbound Verse (240s)

## 📅 [2026-10-16 10:59 น.] Fix Ren & 6th Job Origin/Ascent Cooldown Bypass, Remove Phantom Sub-Skills from HEXA Matrix UI, and Update All-in-One Patch

### 🎯 Scope & Technical Details
- **หัวข้อ**: แก้ไขบั๊กสกิลคลาส 6 Origin 1 (`Divided Heavens` - 360s) และ Origin 2 / Ascent (`Heartbound Verse` / `Soaring Dragon` - 240s) ไม่มีคูลดาวน์และถูกกดสแปมได้ตลอดเวลา, ลบสกิลย่อยสเตจคัตซีนขยะ (`161141501..161141505`) ออกจากหน้าต่าง HEXA Matrix UI ตามมาตรฐานเซิร์ฟเวอร์จริง (KMS/GMS/TMS), พร้อมบิลด์และอัปเดตไฟล์แพตช์ตัวรัน `Patches/Server263_Patch_Latest.zip`
- **รายละเอียด**:
  1. แก้ไข `checkAndSetSkillCooltime` ใน [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) ที่เดิมข้ามคูลดาวน์ของ Origin และ Ascent ให้เซ็ตคูลดาวน์และบล็อกการสแปมถูกต้อง
  2. ตัดรหัสสกิลย่อยออกจาก `getSiaErdaLinkSkills` ป้องกันการสร้างไอคอนขยะในหน้าต่าง HEXA Matrix
  3. ตรวจสอบและบังคับคูลดาวน์ Origin 1 (360s) และ Ascent (240s) ใน [`Ren.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/anima/Ren.java)
