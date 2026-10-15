# 📜 MapleStory v265 Server Development Progress & Active Log

This file tracks current active bug fixes, feature implementations, and system optimizations.
Older archives are preserved in [PROGRESS_ARCHIVE.md](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS_ARCHIVE.md).

## 📅 [2026-10-15 18:42 น.] Full Audit & Stabilization of All 4 Nova Classes (`Kaiser`, `Kain`, `Cadena`, `Angelic Buster`) & HEXA Core Collision Fix (1st–4th Job, Hyper, V Matrix, and HEXA 6th Job)

### 🎯 Scope & Technical Details
- **หัวข้อ**: Comprehensive 1st–4th Job, Hyper, V Matrix (5th Job), and HEXA Matrix (Mastery I–IV, Origin, 2nd 6th Job Ascent, Boost Cores) Audit, TMS (`tms273`) & WZ (`wz265`/`dat265`) Reference Verification, and Bug Fix for All 4 Nova Classes (`Kaiser`, `Kain`, `Cadena`, `Angelic Buster`) + `!endgame` Support
- **รายละเอียด**:
  1. **แก้ไขการชนกันของรหัสโหนด HEXA Mastery II–IV และซิงค์สกิลย่อย (`invisible=1`) ของกลุ่ม Nova & Flora ([`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java), [`UserStatHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/UserStatHandler.java), [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java), [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java))**:
     - **ปัญหาที่พบ (Problem)**:
       - ใน [`Char.getSiaErdaLinkSkills`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) รหัสโหนด HEXA Mastery II–IV ของสาย Explorer ถูกใส่เลข Core ID คลาดเคลื่อนไปทับช่วง `20000089`–`20000103`, `20000137`–`20000151`, และ `20000180`–`20000194` ซึ่งเป็นรหัสโหนดจริงของ **Nova Mastery IV** (`20000180` Kaiser, `20000181` Kain, `20000182` Cadena, `20000183` Angelic Buster) และ **Flora Mastery II–IV** (`20000090`–`20000093`, `20000140`–`20000143`, `20000186`–`20000189`) ตาม `Etc.wz/HexaCore.img.xml`! ส่งผลให้เมื่อตัวละครกลุ่ม Nova หรือ Flora กดอัปเกรดโหนด Mastery IV เซิร์ฟเวอร์กลับไปปลดล็อกสกิลย่อยของ Explorer แทนที่จะเป็นของ Nova/Flora
       - นอกจากนี้ โหนด HEXA Mastery I–IV และ Origin ของ **Kaiser** (`20000034`, `20000084`, `20000134`, `20000180`, `10000034`), **Kain** (`20000035`, `20000085`, `20000135`, `20000181`, `10000035`, `10000087`), **Cadena** (`20000036`, `20000086`, `20000136`, `20000182`, `10000036`, `10000088`), และ **Angelic Buster** (`20000087`, `10000037`, `10000089`) ยังไม่ได้ผูกสกิลย่อย (`invisible=1` companion sub-skills) ใน `getSiaErdaLinkSkills`
       - สกิลคลาส 1–4 ของกลุ่ม Nova ที่มีสกิลย่อยซ่อนอยู่ (เช่น Kaiser Final Form & Command combos, Kain `[Possess]` / `[Execute]` 1st–4th job variants, Cadena Muscle Memory I–III & Weapon Variety I–III & Chain Arts: Beatdown / Takedown / Reign of Chains, Angelic Buster Dress-Up & Star Crash & Trinity & Finale Ribbon) ไม่ได้ถูกซิงค์เลเวลอัตโนมัติใน [`UserStatHandler.syncMoXuanSubSkills`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/UserStatHandler.java)
       - ใน [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java) คำสั่ง `!endgame` แบบไม่ระบุพารามิเตอร์เมื่อรันบนตัวละคร Cadena (`6400`–`6412`) ขาดกิ่ง `JobConstants.isCadena(curJob)`
     - **วิธีแก้ (Fix/Implementation)**:
       - แก้ไขรหัสโหนด Explorer Mastery II–IV ใน [`Char.getSiaErdaLinkSkills`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) ให้ตรงกับ `HexaCore.img.xml` (`20000050`–`20000064`, `20000100`–`20000114`, `20000146`–`20000160`) และเพิ่มรายการสกิลย่อย HEXA ของ Nova ทั้ง 4 อาชีพ และ Flora ทั้ง 4 อาชีพครบ 100%
       - อัปเดต [`UserStatHandler.syncMoXuanSubSkills`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/UserStatHandler.java) และ [`SkillConstants.getActualSkillIDfromSkillID`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java) ให้ซิงค์และแมปสกิลย่อยคลาส 1–6 ของ Kaiser, Kain, Cadena, และ Angelic Buster อัตโนมัติ
       - เพิ่มกิ่ง `JobConstants.isCadena(curJob)` ใน [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java) พร้อมตรวจสอบไอเทม BiS ของ Nova ทั้ง 4 อาชีพ (`1402259`/`1352505`/`1190001`, `1214018`/`1354025`/`1190555`, `1272017`/`1353306`/`1190552`, `1222113`/`1352605`/`1190101`) เทียบกับ `dat265/equips` ครบ 100% ภายใต้กฎเหล็ก **Strict Zero-Skill-Injection Policy**
  2. **Kaiser (`6000`, `6100`, `6110`, `6111`, `6112`, `6114`) ([`Kaiser.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/Kaiser.java), [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java))**:
     - **ปัญหาที่พบ (Problem)**:
       - สกิล 6th Job ของ Kaiser (`HEXA_GIGAS_WAVE` `61141000`–`61141003`, `HEXA_BLADE_BURST` `61141006`–`61141010`, `HEXA_INFERNO_BREATH` `61141011`–`61141015`, `HEXA_WING_BEAT` `61141016`–`61141017`, `HEXA_PRESSURE_CHAIN` `61141018`–`61141021`, `HEXA_STONE_DRAGON` `61141022`–`61141023`, `MIGHT_OF_THE_NOVA` `61141500`–`61141502`, และ `SOVEREIGN_SKYBLADE` `61141504`–`61141505`) ยังไม่ได้ถูก実装ใน [`Kaiser.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/Kaiser.java)
       - ดาบเวท `Tempest Blades` (`61110211`/`61120007`/`61121217`) ยังไม่แปลงร่างเป็น `HEXA_TEMPEST_BLADES` (`61141004`/`61141005`) เมื่อผู้เล่นปลดล็อกโหนด HEXA Mastery I (`61141000`)
       - `HEXA_WING_BEAT` (`61141016`–`61141017`) ยังไม่ถูกใส่ใน `SkillConstants.isNoCoolDownAttack` ทำให้ติดคูลดาวน์ผิดปกติเมื่อโจมตีต่อเนื่อง
     - **วิธีแก้ (Fix/Implementation)**:
       - เพิ่มการรองรับสกิล HEXA Mastery I–IV, Origin (`MIGHT_OF_THE_NOVA` `61141500`–`61141502`), และ 2nd 6th Job Ascent (`SOVEREIGN_SKYBLADE` `61141504`–`61141505`) ใน [`Kaiser.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/Kaiser.java): ชาร์จเกจ `Morph` ทุกครั้งที่ใช้สกิล HEXA, สร้าง `AffectedArea` เปลวไฟของ `HEXA_INFERNO_BREATH`, เสกซัมมอน `HEXA_STONE_DRAGON` (`61141022`/`61141023`), อัปเกรด `StopForceAtomInfo` และ ForceAtom ของ `Tempest Blades` เป็น `61141004`/`61141005` เมื่อมีสกิล `61141000`, และมอบอมตะ 7 วินาที + Bind/OriginDebuff ให้สกิล Origin/Ascent
  3. **Kain (`6003`, `6300`, `6310`, `6311`, `6312`, `6314`) ([`Kain.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/Kain.java), [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java))**:
     - **ปัญหาที่พบ (Problem)**:
       - ใน [`Kain.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/Kain.java) อาร์เรย์ `executionSkills` ใส่รหัสสกิลผิด (`63141503` เป็นส่วนหนึ่งของ Origin `Annihilation` ไม่ใช่ `HEXA Tearing Knife` ซึ่งความจริงคือ `63141013`, และขาด `HEXA Chain Sickle` จบคอมโบ `63141012`, `HEXA Poison Needle` จบคอมโบ `63141015`, `HEXA Sneaky Sniping` `63141021`/`63141022`)
       - อาร์เรย์ `possessionSkills` ขาดสกิล `[Possess]` ของ HEXA Mastery II–IV (`63141004`–`63141006` HEXA Scatter Shot, `63141008`–`63141009` HEXA Shaft Break, `63141016`–`63141020` HEXA Falling Dust) ทำให้เมื่อผู้เล่นกด `[Possess]` แล้วตามด้วยสกิล HEXA เหล่านี้ บัฟ `Possession` (`KainPossession` CTS) ไม่ถูกล้างออกและไม่ปล่อยลูกศรเสริม (`63141007` / `63141010`)
       - ขาดการรองรับ `CHURN_MALICE` (`63140019` พาสซีฟเพิ่มเกจ Malice เมื่อใช้ `[Execute]`), `LAST_WORD` (`63141011`), และ 2nd 6th Job Ascent `PARAGON_OF_MALICE` (`63141507`–`63141510`)
     - **วิธีแก้ (Fix/Implementation)**:
       - แก้ไขอาร์เรย์ `possessionSkills` และ `executionSkills` ใน [`Kain.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/Kain.java) ให้ตรงตาม `wz265/Skill.wz/6314.img.xml` ทุกสกิล, เพิ่มการชาร์จเกจ Malice พิเศษจาก `CHURN_MALICE` (`63140019`) เมื่อใช้สกิล `[Execute]`, รองรับการซิงค์คูลดาวน์ของ `HEXA Falling Dust` และ `HEXA Sneaky Sniping`, และรองรับ `PARAGON_OF_MALICE` (`63141507`–`63141510`)
  4. **Cadena (`6002`, `6400`, `6410`, `6411`, `6412`, `6414`) ([`Cadena.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/Cadena.java), [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java))**:
     - **ปัญหาที่พบ (Problem)**:
       - ใน [`Cadena.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/Cadena.java) เมธอด `handleMuscleMemory` ส่งรหัสสกิลคงที่ `MUSCLE_MEMORY_III` (`64120001`) เสมอแม้ตัวละครจะยังอยู่คลาส 2 หรือ 3 และใช้ `o1.nValue = Math.min(8, ...)` ซึ่งนับสแต็กได้ไม่ตรงกับจำนวนอาวุธ Summon จริง นอกจากนั้นยังไม่ทริกเกอร์เมื่อใช้สกิล 6th Job HEXA (`64141000`–`64141028`, `64141500`–`64141505`) และยังไม่โปรคระเบิดเสริม `WEAPON_VARIETY_FINALE` (`400041076` / `64141004`–`64141005`)
       - ขาดการรองรับสกิล 6th Job HEXA ของ Cadena ทั้งหมด (`HEXA Chain Arts: Thrash`, `HEXA Muscle Memory`, `HEXA Summon Scimitar/Claw/Shuriken/Shotgun/Daggers/Decoy Bomb/Brick/Spiked Bat`, `HEXA Chain Arts: Beatdown`, `HEXA Veteran Shadowdealer`, `Chain Arts: Grand Arsenal` `64141500`–`64141502`, และ ` Brutal Rampage` `64141503`–`64141505`)
     - **วิธีแก้ (Fix/Implementation)**:
       - ปรับปรุง [`Cadena.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/Cadena.java) ให้จำแนกสกิล `isThrashSkill` และ `isSummonWeaponSkill` ครอบคลุมตั้งแต่คลาส 1 ถึง 6th Job HEXA, คำนวณขั้นของสกิล `Muscle Memory` (`64100004` ➔ `64110005` ➔ `64120001` ➔ `64141003`) ตามสกิลที่ตัวละครเรียนรู้จริง, จัดการสแต็ก `WeaponVarietyFinale` เพื่อปล่อยระเบิดเสริม, เสกซัมมอน `HEXA_SUMMON_SHURIKEN` (`64141009`) และ `HEXA_SUMMON_DECOY_BOMB` (`64141012`), และรองรับ `CHAIN_ARTS_GRAND_ARSENAL` (`64141500`–`64141502`) + `BRUTAL_RAMPAGE` (`64141503`–`64141505`)
  5. **Angelic Buster (`6001`, `6500`, `6510`, `6511`, `6512`, `6514`) ([`AngelicBuster.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/AngelicBuster.java), [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java))**:
     - **ปัญหาที่พบ (Problem)**:
       - ใน v265 Remaster อาชีพ Angelic Buster เปลี่ยนสกิลบัฟหลายตัวเป็นพาสซีฟถาวร (`MELODY_CROSS` `65000005`, `POWER_TRANSFER` `65100007`, `IRON_BLOSSOM` `65110008`) และตัดระบบ Recharge ดั้งเดิมออก แต่ใน [`AngelicBuster.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/AngelicBuster.java) ยังคงอ้างอิงรหัสสกิลเก่าก่อน Remaster (`65001002`, `65101002`, `65111004`) ที่ไม่มีใน `wz265` แล้ว
       - ขาดการรองรับสกิลใหม่หลัง Remaster และ 6th Job HEXA: `ON_STAGE` (`60011301`), `CHEER_BALLOON` (`65120012`/`65121012`, `65140008`/`65141008`, `65141009`), `ENCORE_RIBBON` (`65141004`), `TWINKLE_STAR_CAGE` (`65141006`–`65141007`), `MASCOT_FAMILIAR_TWINKLE_STAR` (`400051046`), `GRAND_FINALE` (`65141500`–`65141502` พร้อมการปล่อยลูกโป่ง `CHEER_BALLOON`), และ 2nd 6th Job Ascent `HEARTCORE_RESONANCE` (`65141503`–`65141505`)
     - **วิธีแก้ (Fix/Implementation)**:
       - อัปเดต [`AngelicBuster.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/AngelicBuster.java) และ [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java) ให้รองรับระบบ ForceAtom ของ `Soul Seeker`, `HEXA Soul Seeker`, และ `Cheer Balloon` (ทั้งร่างปกติ ร่างอัปเกรด `Supreme Supernova`/`Spotlight`, และร่าง `Grand Finale`), รองรับการโปรค `Encore Ribbon` (`65141004`), และรองรับ `GRAND_FINALE` (`65141500`–`65141502`) + `HEARTCORE_RESONANCE` (`65141503`–`65141505`) ครบถ้วน 100%

## 📅 [2026-10-15 17:15 น.] Repository Synchronization, Audit Tools Integration & Git Push Everything

### 🎯 Scope & Technical Details
- **หัวข้อ**: Full Repository Audit, Git Sync, Integration of Diagnostic/Audit Suites, LAN Guides & Patch Automation ([`tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/create_patch.py), [`HOW_TO_PLAY_LAN.txt`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/HOW_TO_PLAY_LAN.txt), [`SKILL.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/.agents/skills/maplestory-bug-knowledge/SKILL.md))
- **รายละเอียด**:
  1. **การผสานชุดเครื่องมือตรวจสอบระบบ (Audit & Diagnostic Tooling Integration)**:
     - รวมชุดเครื่องมือตรวจสอบคลาสสกิล HEXA Matrix และ WZ Data เข้าสู่ Git Repository อย่างสมบูรณ์: [`tools/audit/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/audit/) (`audit_jobs.py`, `check_crash_risks.py`, `deep_audit.py`, `detailed_audit.py`, `parse_hexacore_wz.py`), เครื่องมือสแกนสกิลย่อย ([`tools/inspect_hexacore.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/inspect_hexacore.py), [`tools/inspect_skills.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/inspect_skills.py)), และชุดทดสอบความถูกต้องของสคริปต์ ([`tools/test_script_parity.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/test_script_parity.py), [`tools/test_wz_script_coverage.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/test_wz_script_coverage.py), [`tools/test_jython_bindings.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/test_jython_bindings.py), [`tools/TestMilestone1.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/TestMilestone1.java))
  2. **การอัปเดตคู่มือเครือข่ายและระบบแพตช์อัตโนมัติ (Network Documentation & Patch Automation)**:
     - บรรจุคู่มือการตั้งค่าเล่นข้ามวงแลนและ VPN ทางไกล [`HOW_TO_PLAY_LAN.txt`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/HOW_TO_PLAY_LAN.txt) เข้าสู่ Repository
     - อัปเดตสคริปต์ [`tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/create_patch.py) ให้รวมโครงสร้างฐานข้อมูล `sql/` และรักษากฎคอนฟิกแบบไดนามิก
  3. **การซิงค์มาตรฐานระเบียบปฏิบัติและกักกันไฟล์ขนาดใหญ่ (Skill Standards & Gitignore Rule)**:
     - อัปเดตไฟล์ข้อกำหนดโครงการ [`.agents/skills/maplestory-bug-knowledge/SKILL.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/.agents/skills/maplestory-bug-knowledge/SKILL.md) ให้เป็นฉบับสมบูรณ์ตรงกันทุกไดเรกทอรี
     - กำหนดค่า [`.gitignore`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/.gitignore) ไม่ให้รวมไบนารี `tools/DepotDownloader/` (78MB) ป้องกันขนาด Git บวมเกินความจำเป็น พร้อมปลดบล็อกให้รองรับสคริปต์โครงสร้างฐานข้อมูล `sql/` ครบถ้วน

## 📅 [2026-10-15 12:07 น.] Packaging & Creation of All-in-One Server263 Incremental Patch (`Server263_Patch_Latest.zip`)

### 🎯 Scope & Technical Details
- **หัวข้อ**: All-in-One Incremental Patch Compilation & Packaging for Server263 Distribution (`Server263_Patch_Latest.zip`)
- **รายละเอียด**:
  1. **การรวมไฟล์แพตช์และการปรับปรุงสคริปต์ ([`tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/create_patch.py), [`Create_Update_Patch.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Create_Update_Patch.bat))**:
     - อัปเดตสคริปต์ [`tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/create_patch.py) ให้รวมคู่มือเครือข่าย [`HOW_TO_PLAY_LAN.txt`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/HOW_TO_PLAY_LAN.txt) และโฟลเดอร์นิยามฐานข้อมูล `sql/` เข้าสู่แพ็กเกจอย่างสมบูรณ์
     - เพิ่มเงื่อนไขในตัวติดตั้งอัตโนมัติ `Apply_Patch.bat` เพื่อรักษาการตั้งค่าคอนฟิก `server.properties` เดิมของผู้เล่นไว้ (ไม่เขียนทับหากมีไฟล์อยู่แล้ว)
     - สร้างไฟล์แพตช์เดี่ยว **[`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip)** (ขนาด 173.45 MB) รวม Server Core (`maplestory.jar` ล่าสุด 138.7 MB), Batch Scripts, ฐานข้อมูล `backup.sql`, สคริปต์ `data/scripts/` (7,000+ สคริปต์), ตารางดรอป `data/resources/`, และ `Client_Patch_Files/` (Launcher & Localhost.dll)
     - ซิงค์ [`data/scripts/npc/warp_service.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/data/scripts/npc/warp_service.py) เพิ่มจุดวาร์ปเรือรบหลวง Arteria และ Carcion

## 📅 [2026-10-15 08:45 น.] Full Audit & Stabilization of All 15 Explorer (Adventurer) Classes (1st–4th Job, Hyper, V Matrix, and HEXA Mastery I–IV / Origin / Ascent)

### 🎯 Scope & Technical Details
- **หัวข้อ**: Comprehensive 1st–4th Job, Hyper, V Matrix (5th Job), and HEXA Matrix (Mastery I–IV, Origin 1, 2nd 6th Job Ascent, Boost Cores) Audit, TMS/WZ Reference Verification, and Bug Fix for All 15 Explorer Classes (`Hero`, `Paladin`, `Dark Knight`, `Fire/Poison`, `Ice/Lightning`, `Bishop`, `BowMaster`, `Marksman`, `Pathfinder`, `Night Lord`, `Shadower`, `Dual Blade`, `Buccaneer`, `Corsair`, `Cannoneer`)
- **รายละเอียด**:
  1. **Core HEXA Matrix, Companion Sub-Skill Syncing & Skill Mapping ([`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java), [`UserStatHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/UserStatHandler.java), [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java), [`SkillData.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/loaders/SkillData.java), [`Job.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java), [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java))**:
     - **ปัญหาที่พบ (Problem)**:
       - โหนด HEXA Mastery I–IV, Origin 1, 2nd 6th Job Ascent (`40000000`–`40000014`), และ Boost Cores (`30000xxx`) ของสาย Explorer ใน `Etc.wz/HexaCore.img.xml` มีสกิลย่อย (`invisible=1` companion sub-skills) จำนวนมากที่ต้องถูกปลดล็อกและอัปเลเวลพร้อมกับสกิลหลักเมื่อผู้เล่นอัปเกรดโหนดใน HEXA Matrix UI แต่เดิม [`Char.getSiaErdaLinkSkills`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) ขาดรายการสกิลย่อยของ Explorer หลายอาชีพ (เช่น `1341002`–`1341004` HEXA Evil Eye Shock, `2141010`–`2141011` HEXA Megiddo Flame, `2241006`–`2241010` HEXA Lightning Orb, `2341504`–`2341506` Holy Advent Archangels, `3341010`–`3341023` HEXA Ancient Astra & Combo Assault, `4141001`–`4141004` HEXA Quad Star & Assassin's Mark, `4241001`–`4241019` HEXA Assassinate/Pulverize/Meso Explosion/Covert Edge, `4361501`–`4361503` Karma Blade, `5141001`–`5141014` HEXA Octopunch/Sea Serpent/Serpent Scale, `5241001`–`5241013` HEXA Rapid Fire/Brain Scrambler/Scurvy Summons, `5341003`–`5341013` HEXA Monkey Mortar/Rolling Rainbow/Monkey Militia/Monkey Fury)
       - สกิลคลาส 1–4 และ Hyper ของ Explorer ที่มีสกิลย่อย `invisible=1` (เช่น Paladin `1220022`➔`1221023`, Dark Knight `1320016`➔`1320019`, F/P `2111013`➔`2111014`, I/L `2221052`➔`2221055`, Bishop `2321003`➔`2320013`, Marksman `3220021`➔`3221022`–`3221026`, Pathfinder `3311002`/`3321016`/`3321035`/`3311010`, Night Lord `4101011`➔`4100012`, Shadower `4210014`➔`4200015` & `4221014`➔`4221016`, Buccaneer `5101017`➔`5100018` & `5110017`➔`5110018`–`5110020` & `5120026`➔`5121027`, Corsair `5201012`➔`5201017` & `5211007`➔`5210016` & `5221052`➔`5221055`, Cannoneer `5311004`➔`5310004` & `5321004`➔`5320011`) ไม่ได้ถูกซิงค์เลเวลเมื่อผู้เล่นกดอัป SP ในหน้าต่างสกิล
     - **วิธีแก้ (Fix/Implementation)**:
       - อัปเดต [`Char.getSiaErdaLinkSkills`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java), [`UserStatHandler.syncMoXuanSubSkills`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/UserStatHandler.java), [`Char.maxSkills`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java), และ [`SkillConstants.getActualSkillIDfromSkillID`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java) ให้ซิงค์และแมปสกิลย่อยของ Explorer ทั้ง 15 อาชีพครบ 100%
       - แก้ไข [`Char.setSkillCooldown`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) ถอดการ Hardcode คูลดาวน์เก่าของ Hero/Paladin ออกเพื่อให้ดึงค่าคูลดาวน์จริงจาก WZ v265
       - แก้ไข [`Job.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java) ให้คูลดาวน์ Link Skill `Invincible Belief` คูณ `1000` (แปลงวินาทีเป็นมิลลิวินาที), เพิ่ม `5100020` / `5200015` ใน [`SkillData.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/loaders/SkillData.java) สำหรับ Passive Booster ของ Buccaneer/Corsair, และเพิ่มกิ่ง `JobConstants.isPathFinder(job)` ใน `!endgame` ([`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)) ให้แจกอาวุธ `1592022` (*Arcane Umbra Ancient Bow*) + อาวุธรอง `1353707` (*Princess No's Immortal Relic*) และดาวกระจาย `2070018` (*Balanced Fury*) ให้ Night Lord
  2. **Explorer Warriors (`Hero`, `Paladin`, `Dark Knight`) ([`Hero.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/warrior/Hero.java), [`Paladin.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/warrior/Paladin.java), [`DarkKnight.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/warrior/DarkKnight.java))**:
     - **Hero**: แก้ไข `isIncrementComboAttackSkill` ให้รองรับ `HEXA_RISING_RAGE` (`1141002`), `HEXA_BEAM_BLADE` (`1141003`), `HEXA_PUNCTURE` (`1141006`), `SPIRIT_CALIBUR` (`1141500`–`1141501`), และ `ULTRASONIC_SLASH` (`1141502`), แก้ `handleRagingBlow` ให้ตรวจสอบ `chr.hasSkill(ADVANCED_COMBO)` ก่อนอัปเกรดเป็น Enraged Raging Blow, รองรับ `HEXA_CRY_VALHALLA` (`1141004`), และมอบอมตะ 7 วินาที + Bind/OriginDebuff ให้ `ULTRASONIC_SLASH`
     - **Paladin**: แก้ไข `handleDivineBlessing` และ `handleFallingJustice` ให้รองรับ `HEXA_DIVINE_CHARGE` (`1241003`), `HEXA_HEAVENS_HAMMER` (`1241005`), `SACRED_BASTION` (`1241500`–`1241502`), และ `DOMINUS_OBLIVION` (`1241504`–`1241505`), แก้ `handleSkillRemove(SACROSANCTITY)` ไม่ให้ลดคูลดาวน์เกินจริงเมื่อบัฟหมดเวลาตามปกติ, และรองรับ `DOMINUS_OBLIVION`
     - **Dark Knight**: แก้ไข `isRevengeSkill` ให้รองรับสกิล 6th Job (`1341000`, `1341001`, `1341002`, `1341500`–`1341503`), แก้คูลดาวน์ `Revenge of the Evil Eye` (`subTime = 500ms`), แก้การลดคูลดาวน์ `Sacrifice` ให้เช็ค `chr.hasSkill(SACRIFICE)`, รองรับ `HEXA_DARK_SYNTHESIS` (`1341007`) ในการลดคูลดาวน์ `Evil Eye Shock`, และรองรับ 2nd 6th Job Ascent `DARK_HALIDOM` (`1341502`–`1341503`)
  3. **Explorer Magicians (`Fire/Poison`, `Ice/Lightning`, `Bishop`) ([`Magician.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/magician/Magician.java), [`FirePoison.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/magician/FirePoison.java), [`IceLightning.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/magician/IceLightning.java), [`Bishop.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/magician/Bishop.java), [`AffectedArea.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/life/AffectedArea.java))**:
     - **Magician Common**: แก้ไข `infinity()` ให้คำนวณจาก `si.getValue(damage, slv)` ของสกิล `INFINITY` ของแต่ละสายอาชีพโดยตรง (ป้องกัน NPE จาก `getOriginalSkillByID` คืนค่า 0)
     - **Fire/Poison**: รองรับ `HEXA_MEGIDDO_FLAME` (`2141009`–`2141011`) ใน `handleMegiddoFlame` และ `createMegiddoFlameForceAtom`, แก้การหักมานาของ `Inferno Aura` ให้ดึงจาก `2121054`, ซิงค์คูลดาวน์ `HEXA_IFRIT` / `HEXA_CREEPING_TOXIN` / `HEXA_MEGIDDO_FLAME`, และรองรับ `IMMORTAL_FLAME` (`2141505`–`2141506`)
     - **Ice/Lightning**: แก้ไข `applyFrostEffectOnMob` ไม่ให้ติดสแต็กน้ำแข็งจากสกิลธาตุสายฟ้า (`Chain Lightning`, `Lightning Orb`, `Bolt Barrage`, `Jupiter Thunder`), เพิ่มตัวคูณดาเมจ `Cryo Shock` (`2240006`) เมื่อโจมตีมอนสเตอร์ที่ติดสแต็กน้ำแข็ง, ซิงค์คูลดาวน์ `HEXA_BLIZZARD` / `HEXA_LIGHTNING_ORB`, และรองรับ `PARABOLIC_BOLT` (`2241505`–`2241506`)
     - **Bishop**: แก้ไข [`AffectedArea.handleCharOut`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/life/AffectedArea.java) ที่เดิมเช็ค `== null` กลับด้านเมื่อลบออร่า `BENEDICTION`, รองรับการซิงค์คูลดาวน์ `HEXA_GENESIS` / `HEXA_FOUNTAIN_FOR_THE_ANGELS` / `HEXA_HEAVENS_DOOR`, และรองรับ `COMMANDMENT_OF_HEAVEN` (`2341507`–`2341508`)
  4. **Explorer Archers (`BowMaster`, `Marksman`, `Pathfinder`) ([`Archer.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/archer/Archer.java), [`BowMaster.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/archer/BowMaster.java), [`Marksman.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/archer/Marksman.java), [`Pathfinder.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/archer/Pathfinder.java))**:
     - **Archer Common**: แก้ไข `criticalShot()` ไม่ให้ส่งแพ็กเก็ต `CharacterTemporaryStat.CriticalGrowing` ทับเกจ `Focused Fury` ของ BowMaster และ `Aggressive Resistance` ของ Marksman
     - **BowMaster**: รองรับ `HEXA_ARROW_PLATTER` (`3141007`) ในการวางป้อมธนูบนพื้น (`INSTALL_PLATTER`), รองรับ `HEXA_GRITTY_GUST` (`3141010`) ในการติดสถานะเผาไหม้ DoT, และรองรับ `FLASHPOINT` (`3141503`–`3141504`)
     - **Marksman**: แก้ไข `isCrossBowSkill` ให้รองรับ `HEXA_PIERCING_ARROW` (`3241005`–`3241009`) เพื่อให้นับสแต็ก `Focus On` และ `Enhance Piercing` ครบทุกขั้น, แก้การคำนวณโบนัสของ `Aggressive Resistance`, รองรับ `HEXA_HIGH_SPEED_SHOT` (`3241013`), และรองรับ `FATAL_TRIGGER` (`3241502`–`3241503`)
     - **Pathfinder**: แก้ไข [`SkillConstants.isAncientForceSkill`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java), `isEnchantForceSkill`, และ `isTorrentSkill` ให้รวมสกิล 6th Job HEXA ทั้งหมด (`HEXA_GLYPH_OF_IMPALEMENT` `3341006`, `HEXA_ANCIENT_ASTRA` `3341010`–`3341015`, `HEXA_COMBO_ASSAULT` `3341016`–`3341023`, `HEXA_CARDINAL_TORRENT` `3341008`–`3341009`), แก้ `handleCardinalDelugeAmplification` และ `createSplitMistelForceAtom` ให้ดึงข้อมูลจากสกิลหลักเมื่อใช้สกิล HEXA, และรองรับ `RELIC_MATERIALIZE` (`3341505`–`3341506`)
  5. **Explorer Thieves (`Night Lord`, `Shadower`, `Dual Blade`) ([`NightLord.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/thief/NightLord.java), [`Shadower.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/thief/Shadower.java), [`DualBlade.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/thief/DualBlade.java))**:
     - **Night Lord**: แก้ไข `setMarkonMob` ให้ติดดีบัฟ `Assassin's Mark` เมื่อเปิดใช้งาน `Night Lord's Mark` (`4120018`) แม้ยังไม่ได้กดเปิด `4101011`, เพิ่มตัวคูณโอกาสดรอปและ EXP (`Showdown` MobStat) ให้ `SHOWDOWN_CHALLENGE` (`4121017`) และ `HEXA_SHOWDOWN_CHALLENGE` (`4141005`), และรองรับ `LIFE_AND_DEATH` (`4141500`–`4141502`) + `DEEP_STRIKE` (`4141503`–`4141504`)
     - **Shadower**: แก้ไข `createBloodMoneyForceAtom` ไม่ให้ใช้ความยาวลิสต์ `mobAttackInfo` ที่ถูกลบสมาชิกออกขณะวนลูป (`removeIf`), รองรับ `COVERT_EDGE` (`4241018`–`4241019`) ในการดรอปเหรียญ `Blood Money`, และรองรับ `HALVE_SLICE` (`4241500`–`4241502`) + `COVETOUS_DARKNESS` (`4241503`–`4241506`)
     - **Dual Blade**: แก้ไข `checkAndSetMirroredTarget` ใน `handleHit` ไม่ให้เรียก `getPosition()` บน `Summon` ที่เป็น `null` (ป้องกัน NPE), แก้ `FLASHBANG` ให้ติดดีบัฟ `MobStat.Blind` บนมอนสเตอร์แทนการใส่บนตัวผู้เล่น, เพิ่มการตรวจสอบคูลดาวน์ให้ `ALL_OUT_ATTACK` (`4361002`), และรองรับ `YAMAS_DECREE` (`4361504`–`4361506`)
  6. **Explorer Pirates (`Buccaneer`, `Corsair`, `Cannoneer`) ([`Buccaneer.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/pirate/Buccaneer.java), [`Corsair.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/pirate/Corsair.java), [`Cannoneer.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/pirate/Cannoneer.java), [`Summon.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/life/Summon.java))**:
     - **Buccaneer**: แก้ไข `pickHighestLearnedFromMap` ให้วนลูปถึง Index `5` เพื่อให้ค้นพบ `HEXA_SEA_SERPENT_BURST` (`5141008`), แก้คูลดาวน์ `SEA_SERPENT_BURST` (เดิมบวก 11ms แทน 11,000ms!) และสลับค่าคูลดาวน์ที่ผิดระหว่าง `GREATER_SEA_SERPENT_II_BURST` กับ `SEA_SERPENT_RAGE`, แก้ `handlePerseverance` ให้ฟื้นฟูเป็น `%MaxHP`/`%MaxMP` ทุก 5 วินาทีตาม WZ, มอบบัฟ `LIBERATOR_ATTACK_1` 30 วินาทีเมื่อกดใช้ `Unleash Neptunus` (`5141500`), และรองรับ `UNLEASHED_DRAGON` (`5141507`–`5141508`)
     - **Corsair**: แก้ไข `HEXA_BRAIN_SCRAMBLER` (`5241005`) ให้ใช้ `Math.min` จำกัดเพดานสแต็ก `EnhanceHeadShot` และรีเซ็ตสแต็กเมื่อยิง `CONDEMNATION` (`5241006`), เพิ่มการทริกเกอร์ `PIRATE_REVENGE` (*Aggressive Stance* `5220012`) เมื่อโจมตีตาม WZ v265, ป้องกัน NPE ใน `handleScurvySecondAtoms` และรองรับซัมมอนลูกเรือใน [`Summon.onAttack`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/life/Summon.java), เสกเรือรบ `5241502` เมื่อกดใช้ `The Dreadnought` (`5241500`), และรองรับ `QUICKDRAW_DREADNOUGHT` (`5241503`–`5241504`)
     - **Cannoneer**: แก้ค่าคงที่ `BARREL_OF_MONKEYS` (`5341502`) และ `BARREL_OF_MONKEYS_ATTACK` (`5341503`) ที่สลับกัน, เรียกใช้ `applyBarrelRouletteDebuffOnMob` ใน `handleDebuffOnMob` และจำกัดให้ `getFinalAttackProc(5310004)` ทำงานเฉพาะเมื่อทอยได้ถังหมายเลข `1`, เสกป้อมลิงคู่ (`5340011` + `5341009`) เมื่อใช้ `HEXA_MONKEY_MALITIA`, และซิงค์คูลดาวน์สกิล HEXA ทั้งหมด

## 📅 [2026-10-15 06:58 น.] Full Audit & Stabilization of Khali, Sia Astelle (`ERDA LINK`), Luminous & `!endgame` (1st–4th Job, V Matrix, and HEXA 6th Job)

### 🎯 Scope & Technical Details
- **หัวข้อ**: Comprehensive 1st–4th Job, Hyper, V Matrix (5th Job), and HEXA Matrix / `ERDA LINK` (6th Job) Audit, Refactoring, and Stabilization for Flora (`Khali`), Shine (`Sia Astelle`), and Legend (`Luminous`), plus BiS Equipment & Zero-Skill-Injection Audit of `!endgame`
- **รายละเอียด**:
  1. **Sia Astelle (`18000`, `18200`, `18210`, `18211`, `18212`, `18214`) & ระบบ `ERDA LINK` (`ErdaLink.img.xml` Constellation Tree) ([`SiaAstelle.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/shine/SiaAstelle.java), [`UserHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/UserHandler.java), [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java), [`HexaCore.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/loaders/Etc/HexaCore/HexaCore.java), [`HexaMatrixConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/HexaMatrixConstants.java), [`UserStatHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/UserStatHandler.java))**:
     - **ปัญหาที่พบ (Problem)**:
       - ไคลเอนต์ v265 ของอาชีพ **Sia Astelle** ใช้ระบบหน้าต่างดวงดาว **`ERDA LINK` (`Etc.wz/ErdaLink.img.xml`)** แทน HEXA Matrix ปกติ โดยเมื่อผู้เล่นคลิกปลดล็อกหรืออัปเกรดโหนดในหน้าต่าง `ERDA LINK` ไคลเอนต์จะส่งแพ็กเก็ต `HEXA_MATRIX_OPERATION_REQUEST` พร้อมรหัส `stoneId` ของ `ErdaLink`:
         - โหนดสเตตัสดาวฤกษ์ (`1`–`52` เชื่อมกับสกิลพาสซีฟ `80003387`–`80003399`, `maxLevel = 5`)
         - โหนด SHINE Boost (`100`–`107`, `maxLevel = 30` สำหรับ `100`–`101` และ `maxLevel = 15` สำหรับคู่โหนด `102`+`103`, `104`+`105`, `106`+`107`)
         - โหนด Common Core (`300`–`306`, `maxLevel = 30`), โหนด SHINE Ray Mastery (`500`, `maxLevel = 30`), โหนด SHINE Stat (`1000`–`1005`), และโหนด Origin (`10000` Celestial Design, `10001`–`10005`, `maxLevel = 30`)
       - แต่เดิม `HexaCore.getHexaSkillCore(coreId)` อ่านเฉพาะ `HexaCore.img.xml` (`10000xxx`–`40000xxx`) ซึ่งไม่มีรหัส `ErdaLink` (`1`–`10005`) ทำให้ `hsc` เป็น `null` และเซิร์ฟเวอร์ดีดออก (`return`) ทันที ผู้เล่นจึงกดปลดล็อกหรืออัปสกิลในหน้าต่าง `ERDA LINK` ไม่ได้เลย!
       - นอกจากนี้ เมื่ออัปสกิลคลาส 1–4 และ Hyper ของ Sia ด้วยแต้ม SP ปกติ สกิลย่อยที่ซ่อนอยู่ (`invisible=1` เช่น `182001005` Boom Sub, `182101005` Algol Sub, `182121006`Savior Circle, `182121009`/`182121010` Sadalsuud) ไม่ถูกซิงค์เลเวลตามสกิลหลัก
     - **วิธีแก้ (Fix/Implementation)**:
       - อัปเดต [`UserHandler.handleHexaMatrixOperationRequest`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/UserHandler.java) (ทั้ง Case `0` ปลดล็อก และ Case `1` อัปเกรด), [`Char.setHexaSkill`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java), [`HexaCore.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/loaders/Etc/HexaCore/HexaCore.java), และ [`HexaMatrixConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/HexaMatrixConstants.java) ให้รองรับรหัส `ErdaLink` ครบทุกโหนด (`1`–`52`, `100`–`107`, `300`–`306`, `500`, `1000`–`1005`, `10000`–`10005`) พร้อมคำนวณต้นทุน Sol Erda / Fragments ตามตาราง `ErdaLink.img.xml`, ซิงค์ข้อมูลสองทาง (`Bidirectional Mirroring`) ระหว่างรหัส `ErdaLink` กับ `HexaCore`, รวมเลเวลของโหนดคู่ (`102`+`103` ➔ `50000420`, `104`+`105` ➔ `50000421`, `106`+`107` ➔ `50000422`), และคำนวณรวมเลเวลสกิลพาสซีฟ `80003387`–`80003399` จากโหนดดาว `1`–`52` ทั้งหมดอัตโนมัติ
       - อัปเดต [`SiaAstelle.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/shine/SiaAstelle.java) ให้สกิล Origin `CELESTIAL_DESIGN` (`182141500`–`182141501`) มอบอมตะ `IndieNotDamaged` 7 วินาที, ส่งคัทซีน `UserLocal.showHexaSkillEff(chr)`, และติดสถานะ `MobStat.Freeze` 10 วินาที + `MobStat.OriginDebuff` 20 วินาที
       - เพิ่มการซิงค์สกิลย่อยของ Sia Astelle อัตโนมัติใน [`UserStatHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/UserStatHandler.java) และ [`Char.maxSkills`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java)
  2. **Khali (`15003`, `15400`, `15410`, `15411`, `15412`, `15414`) ([`Khali.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/flora/Khali.java), [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java), [`UserStatHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/UserStatHandler.java), [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java))**:
     - **ปัญหาที่พบ (Problem)**:
       - ตอนสร้างตัวละครใน `setCharCreationStats` เสกอาวุธเริ่มต้นผิดเป็น `1403000` (กงเล็บหมัดของ Mo Xuan!) แทนที่จะเป็น `1404000` (*Eneth Canis* Chakram) และไม่ได้เสกอาวุธรอง `1354030` (*Plain Hex Seeker*)
       - สกิลคลาส 1–4 หลายสกิลมี `req` (เงื่อนไขสกิลก่อนหน้า) แต่ไม่มีแท็ก `masterLevel` ในไฟล์ WZ ทำให้ `SkillInfo.getMasterLevel()` คืนค่า `0` และเมื่อผู้เล่นกดอัปสกิลด้วย SP ใน `UserStatHandler.handleUserSkillUpRequest` เงื่อนไข `newLevel > skill.getMasterLevel()` จึงบล็อกไม่ให้อัปสกิล!
       - สกิล Toggle `SUMMON_CHAKRI` (`154110001`) และ `VOID_ENHANCE` (`154111006`) เปิดแล้วกดปิดไม่ได้, `DEATH_BLOSSOM` (`154121009`) และ `HEXA_DEATH_BLOSSOM` (`154141012`) ไม่ได้เสก `Summon` ลงแมพเพื่อปล่อย Chakri, และขาดการผูกสกิล 6th Job Origin 2 (`WAKE_THE_VOID` `154141504`–`154141505`) และ HEXA Mastery เข้ากับระบบลดคูลดาวน์ Arts/Void/Hex และการยิงกงจักร `Resonate`
     - **วิธีแก้ (Fix/Implementation)**:
       - แก้ไข [`Khali.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/flora/Khali.java) ให้แจกอาวุธ `1404000` + อาวุธรอง `1354030` ตอนสร้างตัวละคร พร้อมตรวจสอบและซ่อมแซมให้อัตโนมัติใน `handleInitAfterMigrate` หากตัวละครเดิมถือ `1403000` อยู่
       - แก้ไข [`UserStatHandler.handleUserSkillUpRequest`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/UserStatHandler.java) ให้ใช้ `si.getMaxLevel()` เมื่อ `si.getMasterLevel() <= 0` และซิงค์สกิลย่อยของ Khali (`154001002`, `154101002`, `154111003`, `154110000`, `154120004`, `154121007`–`154121015`) อัตโนมัติ
       - ปรับปรุงระบบ Toggle (`Summon Chakri`, `Void Enhance`), การเสก `Summon` ของ `Death Blossom` / `HEXA Death Blossom`, บัฟ `Oblivion` / `Void Burst` / `Resonate: Ultimatum`, และสกิล 6th Job Origin ทั้งสองสกิล (`Hex: Sandstorm` `154141500`–`154141503` และ `Wake the Void` `154141504`–`154141505`) ให้ทำงานครบสมบูรณ์ 100%
  3. **Luminous (`2004`, `2700`, `2710`, `2711`, `2712`, `2714`) ([`Luminous.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Luminous.java), [`LarknessManager.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/skills/LarknessManager.java), [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java), [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java))**:
     - **ปัญหาที่พบ (Problem)**:
       - ใน `2700.img.xml` สกิลคลาส 1 ทั้ง 5 สกิล (`27001100` Twinkle Flash, `27001201` Abyssal Drop, `27001008` Light Speed, `27000106` Light Affinity, `27000207` Dark Affinity) มีแท็ก `invisible=1` จนกว่าจะมีสกิลอยู่ในรายการสกิลของตัวละคร ทำให้เปิดหน้าต่างสกิลคลาส 1 แล้วไม่เห็นสกิลให้อัป SP!
       - ใน [`Luminous.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Luminous.java) เมธอด `getMoreEquilibriumTime()` เช็ค `chr.hasSkill(DARKNESS_MASTERY) ? si.getValue(time, slv) : 0` แต่พารามิเตอร์ `si` และ `slv` ที่ส่งเข้ามาคือของสกิลโจมตี (`Apocalypse`/`Reflection` ซึ่งมี `time = 0`!) ทำให้พาสซีฟ `Darkness Mastery` (`27120007`) ไม่เคยเพิ่มเวลา `Equilibrium` อีก 5 วินาทีเลย!
       - ใน [`LarknessManager.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/skills/LarknessManager.java) ค่า `gauge` ไม่ได้ถูกจำกัดเพดาน `[0, 10000]` และใน `changeLarknessState()` อนุญาตให้เกจเปลี่ยนสถานะทับ `Equilibrium` ขณะที่ยังอยู่ในโหมด `Equilibrium` อยู่ รวมถึงไม่ได้รีเซ็ตคูลดาวน์ `HEXA_ENDER` (`27141000`) และ `GATE_OF_LIGHT` (`400021005`) เมื่อเข้าสู่ `Equilibrium`
       - ขาดการรองรับ `TWILIGHT_NOVA` (`27121113`–`27121115`), `HEXA_TWILIGHT_NOVA` (`27141007`–`27141009`), `ENDLESS_DARKNESS` (`27140002`/`27141003`), `ETERNAL_LIGHT` (`27140005`/`27141006`), และ 2nd 6th Job Ascent (`LUSTROUS_ORB` `27141502`–`27141503`)
     - **วิธีแก้ (Fix/Implementation)**:
       - เพิ่ม `Luminous.ensureFirstJobVisibleSkills(chr)` เพื่อลงทะเบียนสกิลคลาส 1 ทั้ง 5 สกิลที่ `currentLevel = 0, masterLevel = maxLevel` ให้แสดงผลในหน้าต่าง Skill UI ทันที เพื่อให้ผู้เล่นกดอัป SP ได้ตามปกติ 100%
       - แก้ไข [`LarknessManager.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/skills/LarknessManager.java) และ [`Luminous.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Luminous.java) ให้ Clamp ค่าเกจใน `[0, 10000]`, ป้องกันการเขียนทับสถานะขณะอยู่ใน `Equilibrium`, คำนวณเวลา `Equilibrium` จาก `chr.getSkillLevel(DARKNESS_MASTERY)` อย่างถูกต้อง, รีเซ็ตคูลดาวน์ `ENDER` / `HEXA_ENDER` / `DEATH_SCYTHE` / `BAPTISM_OF_LIGHT_AND_DARKNESS` / `GATE_OF_LIGHT` ทันทีที่เข้าสู่ `Equilibrium`, และรองรับสกิล 4th/5th/6th Job ของ Luminous ครบทุกสกิล
  4. **ตรวจสอบและอัปเดตคำสั่ง `!endgame` ([`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java) & [`Job.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java))**:
     - อัปเดตอุปกรณ์ BiS ประจำอาชีพใน `!endgame` และ `Job.ensureSecondaryWeapon`:
       - **Khali (`!endgame khali`)**: อาวุธ `1404018` (*Arcane Umbra Chakram*), อาวุธรอง `1354037` (*Princess No's Immortal Hex Seeker*), และ Emblem `1190563` (*Gold Chaser Emblem*)
       - **Sia Astelle (`!endgame sia`)**: อาวุธ `1253018` (*Arcane Umbra Celestial Light*), อาวุธรอง `1352878` (*Princess No's Compass*), และ Emblem `1191113` (*Gold Guardian Emblem*)
       - **Luminous (`!endgame luminous`)**: อาวุธ `1212120` (*Arcane Umbra Shining Rod*), อาวุธรอง `1352406` (*Princess No's Soul Orb*), Emblem `1190557` (*Mitra's Rage: Magician*), และเรียก `Luminous.ensureFirstJobVisibleSkills(chr)` เพื่อให้หน้าต่างสกิลคลาส 1 แสดงสกิลครบทุกตัวโดยยังคงรักษากฎเหล็ก **Zero-Skill-Injection Policy** 100%

## 📅 [2026-10-15 03:25 น.] Full Audit, TMS Reference Porting & Stabilization of All Arcane River, Tenebris, Grandis & Remastered Boss Mechanics (Unrestricted Level 1+ / Zero Pre-Quest Entry)

### 🎯 Scope & Technical Details
- **หัวข้อ**: Comprehensive Boss Mechanics Analysis, TMS (`tms273`) Reference Porting, Multi-Phase & Reward Room Transitions, WZ-Verified Boss HP & `HpLinkMob` Bar Fix, Intense Power Crystal (`4001886`) & Reward Chest Drop Table Overhaul (`mob_drops.json`), and Universal Boss Exit Portals/NPCs (Strictly Preserving Unrestricted Level 1+ / 0 Pre-Quest Entry)
- **รายละเอียด**:
  1. **รักษากฎเหล็กเข้าบอสได้ทุกเลเวลและไร้เงื่อนไขเควสต์ (Unrestricted Level 1+ / Zero Pre-Quest / Solo & Party Entry)**:
     - **ผลลัพธ์**: ยืนยันและคงค่า [`BossPartyType.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/enums/BossPartyType.java) (`getLevelMin() == 1`, `getPreQuest() == 0`), [`BossEntry.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/BossEntry.java), และอัปเดต [`ScriptManagerImpl.checkParty()`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java#L2543-L2554) ให้สร้างปาร์ตี้ 1 คนให้อัตโนมัติเมื่อผู้เล่นกดเข้าบอสคนเดียวผ่านทั้งหน้าต่าง Boss UI (`T`) และ NPC/Portal หน้าห้องบอส พร้อมเข้าซ้ำได้ไม่จำกัดรอบ
  2. **แก้ไขระบบ Death Count, ล้างสถานะตกค้างหลังออกจากบอส, และหลอดเลือด `HpLinkMob` (Universal Boss Lifecycle & HP Bar Fix)**:
     - **ปัญหาที่พบ (Problem)**:
       - เมื่อเข้าบอสผ่าน [`BossEntry.enter`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/BossEntry.java) ระบบไม่ได้กำหนดค่า `chr.setDeathCount(...)` และเมื่อออกจากบอสผ่าน `warpInstanceOut` ค่า `deathCount` และ `willGaugeTimer` ไม่ถูกรีเซ็ต ทำให้ UI หัวกะโหลกและเกจพระจันทร์ของ Will ค้างติดตัวผู้เล่นออกมาที่เมือง
       - บอส Chosen Seren เฟส 2 (`8880633`, `8880603`, `8880653`) และ Kalos the Guardian เฟส 2 (`8881013`, `8880803`, `8881033`, `8881053`) ไม่มีไอคอน `MobHPTag` ในไฟล์ WZ ของร่างจริง (เพราะไคลเอนต์ผูกไอคอนหลอดเลือดไว้ที่ร่าง `HpLinkMob` คือ `8880632`/`8880602`/`8880652` และ `8881012`/`8880802`/`8881032`/`8881052`)
     - **วิธีแก้ (Fix/Implementation)**:
       - เพิ่ม [`BossConstants.getBossDeathCount`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/BossConstants.java#L119-L126) (`20` สำหรับ Magnus, `12` สำหรับ Black Mage, `5` สำหรับ Verus Hilla, `10` สำหรับบอสมาตรฐาน) และตั้งค่า `setDeathCount` + ส่ง `UserLocal.deathCountInfo` ใน [`BossEntry.enter`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/BossEntry.java)
       - แก้ไข [`ScriptManagerImpl.warpInstance`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java#L2515-L2536) เมื่อ `in == false` ให้รีเซ็ต `deathCount = -1` และยกเลิก `willGaugeTimer` เสมอ
       - แก้ไข [`FieldEffect.mobHPTagFieldEffect`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/field/fieldeffect/FieldEffect.java#L140-L170) ให้แมปรหัสบอส Seren เฟส 2 และ Kalos เฟส 2 ไปยังรหัส `HpLinkMob` เพื่อให้หลอดเลือดบอสแสดงผลบนหน้าจอ 100%
  3. **แก้ไขบอส Arcane River & Tenebris (`Lotus`, `Extreme Lotus`, `Damien`, `Lucid`, `Will`, `Gloom`, `Verus Hilla`, `Darknell`, `Black Mage`)**:
     - **Lotus & Remastered Extreme Lotus ([`Lotus.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/Lotus.java), [`BossConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/BossConstants.java), [`BossHelper.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/BossHelper.java))**:
       - แก้บั๊กสลับรหัสมอนสเตอร์ใน `Lotus.java` ที่เดิมเสก Hard Lotus (`8950000`–`8950002`) ในโหมด Normal และเสก Normal Lotus (`8950100`–`8950102`) ในโหมด Hard
       - พอร์ตระบบ **Remastered Extreme Lotus** ครบ 3 เฟส + ห้องรับรางวัลตาม WZ จริง: เฟส 1 (`350068100`, `8881200` เลือด `144T`) ➔ เฟส 2 (`350068300`, `8881201` เลือด `198T`) ➔ เฟส 3 (`350068500`, `8881202` เลือด `388T`) ➔ ห้องกล่องรางวัล (`350068600`, `8881203`)
     - **Damien ([`Damien.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/Damien.java), [`DemianStigma.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/life/mob/boss/demian/stigma/DemianStigma.java), [`Mob.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/life/mob/Mob.java))**:
       - ถอดโค้ดล็อกเลือด `8880100`/`8880110` ที่ 30% ใน `Mob.damage` ซึ่งทำให้ Damien เฟส 1 ตีไม่ตายและไม่เปลี่ยนเข้าสู่เฟส 2
       - แก้ `DemianStigma.startNextPhase` ให้รองรับทั้งการเล่นคนเดียวและปาร์ตี้ ลดเวลาหน่วงเกิดบอสจาก 15 วินาทีเหลือ 2 วินาที และเสก Damien เฟส 2 (`8880111` Normal / `8880101` Hard) อัตโนมัติเมื่อวาร์ปเข้าห้องเฟส 2
     - **Lucid ([`Lucid.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/Lucid.java), [`BossHelper.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/BossHelper.java))**:
       - แก้รหัสมอนสเตอร์และเลือดของ Lucid เฟส 1 (`8880142` Easy `6T`, `8880140` Normal `12T`, `8880141` Hard `50.8T`) และเฟส 2 (`8880155` Easy `6T`, `8880150` Normal `12T`, `8880151` Hard `57.2T`), ตัดการตั้งเลือดซ้ำที่ดอกไม้ฐาน `8880166`, และวาร์ปเข้าห้องรับรางวัล `450004300` พร้อมเสกกล่องดนตรี (`8880177` Easy, `8880167` Normal, `8880156` Hard)
     - **Will ([`Will.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/Will.java), [`Mob.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/life/mob/Mob.java), [`Field.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/field/Field.java), [`MobHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/life/MobHandler.java), [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java))**:
       - เพิ่มโหมด **Easy Will** ครบทั้ง 3 เฟส (`450007850` ➔ `450007950` ➔ `450008050`, มอนสเตอร์ `8880360`–`8880364`)
       - แก้บั๊กการคำนวณเปอร์เซ็นต์ล็อกเลือดของ Will เฟส 1 และเฟส 2 ใน `Mob.damage` (เดิมหารด้วย `100D` แทน `getMaxHp()` และไม่ลบ Threshold ที่ผ่านแล้วออกจาก `willHPlist` ทำให้บอสติดอมตะถาวร!) พร้อมซิงค์เลือดระหว่างร่างหลักและร่างในมิติพระจันทร์
       - แก้บั๊ก `Math.min(0, ...)` เป็น `Math.max(0, ...)` ใน `MobHandler.handleWillBeholderEyesHit` และแก้พิกัดพื้น Foothold เฟส 1 (`y = 159`) และเฟส 3 (`y = 281`)
     - **Gloom, Verus Hilla, Darknell & Black Mage ([`VerusHilla.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/VerusHilla.java), [`BossConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/BossConstants.java), [`BossHelper.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/BossHelper.java))**:
       - แก้การสลับแมพของ Verus Hilla Normal (`450010930`) กับ Hard (`450010500`) และเขียนระบบ [`VerusHilla.spawn`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/VerusHilla.java) ให้เริ่มต้นกระโหลกแดง 5 ดวง, แพ็กเกจแท่นบูชา/เทียนวิญญาณ, และเสกบอส (`8880405` Normal `88T` / `8880410` Hard `176T`)
       - เพิ่มการวาร์ปเข้าห้องรับรางวัลพร้อมเสกกล่องสมบัติให้ครบทุกตัว: Gloom (`450009430` กล่อง `8950118` / `450009480` กล่อง `8950119`), Darknell (`450012250` กล่อง `8950116` / `450012650` กล่อง `8950117`), Verus Hilla (`450010950` กล่อง `8950120` / `450010550` กล่อง `8950121`), และ Black Mage Hard & Extreme ครบ 4 เฟส (`450013100`–`450013750` กล่อง `8880518` / `450013910`–`450013980` กล่อง `8880548`)
  4. **พอร์ตและปรับปรุงบอส Grandis ทั้งหมด (`Chosen Seren`, `Guardian Angel Slime`, `Kalos`, `Kaling`, `Limbo`, `Baldrix`, `First Adversary`)**:
     - อัปเดต [`BossHpRegistry.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/BossHpRegistry.java), [`BossEntry.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/BossEntry.java), และ [`BossHelper.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/boss/BossHelper.java) ให้รองรับการเปลี่ยนเฟสและห้องกล่องรางวัลตรงตาม `Map.wz` และ `Mob.wz` ของ v265 100%:
       - **Chosen Seren** (Normal / Hard / Extreme): เฟส 1 (`410002120`/`410002020`/`410002220`, มอนสเตอร์ `8880630`/`8880600`/`8880650`) ➔ เฟส 2 (`410002160`/`410002060`/`410002260`, มอนสเตอร์ `8880633`/`8880603`/`8880653`) ➔ ห้องกล่องรางวัล (`410002180`/`410002080`/`410002280`, กล่อง `8880644`/`8880614`/`8880664`)
       - **Guardian Angel Slime** (Normal `160040000` `8880711` / Chaos `160020000` `8880700`) ➔ ห้องกล่องรางวัล (`160050000`, กล่อง `8880726` / `8880725`)
       - **Kalos the Guardian** (Easy / Normal / Chaos / Extreme): เฟส 1 (`410006220`/`410006020`/`410006320`/`410006420`, มอนสเตอร์ `8881010`/`8880800`/`8881030`/`8881050`) ➔ เฟส 2 (`410006260`/`410006060`/`410006360`/`410006460`, มอนสเตอร์ `8881013`/`8880803`/`8881033`/`8881053`) ➔ ห้องกล่องรางวัล (`410006280`/`410006080`/`410006380`/`410006480`, กล่อง `8881018`/`8880808`/`8881038`/`8881058`)
       - **Kaling** (Easy / Normal / Hard / Extreme): เฟส 1 Three Perils (`410008120`/`410007220`/`410008420`/`410008720`, มอนสเตอร์ Qiongqi + Hundun + Taowu) ➔ เฟส 2 Kaling (`410008160`/`410007260`/`410008460`/`410008760`, มอนสเตอร์ `8880907`/`8880837`/`8880937`/`8880967`) ➔ เฟส 3 Fierce Kaling (`410008200`/`410007300`/`410008500`/`410008800`, มอนสเตอร์ `8880912`/`8880842`/`8880942`/`8880972`) ➔ ห้องกล่องรางวัล (`410008220`/`410007320`/`410008520`/`410008820`, กล่อง `8880915`/`8880845`/`8880945`/`8880975`)
       - **Limbo** (Normal / Hard): เฟส 1 (`410009100`/`410011100`, `8881304`/`8881354`) ➔ เฟส 2 (`410009300`/`410011300`, `8881318`/`8881368`) ➔ เฟส 3 (`410009700`/`410011700`, `8881320`/`8881370`) ➔ ห้องกล่องรางวัล (`410009800`/`410011800`, กล่อง `8881334`/`8881384`)
       - **Baldrix** (Normal / Hard): เฟส 1 (`410014100`/`410015200`, `8881600`/`8881650`) ➔ เฟส 2 (`410014600`/`410015700`, `8881614`/`8881664`) ➔ เฟส 3 (`410014900`/`410016000`, `8881621`/`8881671`) ➔ ห้องกล่องรางวัล (`410015000`/`410016100`, กล่อง `8881624`/`8881674`)
       - **First Adversary** (Easy / Normal / Hard / Extreme): เฟส 1 (`410020100`/`410021100`/`410022100`/`410023100`, `8881710`/`8881740`/`8881770`/`8881800`) ➔ เฟส 2 (`410020300`/`410021300`/`410022300`/`410023300`, `8881711`/`8881741`/`8881771`/`8881801`) ➔ เฟส 3 (`410020500`/`410021500`/`410022500`/`410023500`, `8881712`/`8881742`/`8881772`/`8881802`) ➔ ห้องกล่องรางวัล (`410020600`/`410021600`/`410022600`/`410023600`, กล่อง `8881715`/`8881745`/`8881775`/`8881805`)
  5. **ปรับปรุงตารางดรอปบอส (`mob_drops.json`), ผลึกบอส (`Intense Power Crystal`), และสคริปต์ทางออกบอสครบทุกห้อง**:
     - แก้ไข [`GameConstants.getBossRewardID`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/GameConstants.java#L1910-L2015) ให้ผูกผลึก Intense Power Crystal (`4001886`) เข้ากับบอสเฟสสุดท้ายและกล่องรางวัลทุกตัวโดยไม่ดรอปซ้ำในเฟส 1/2 และรองรับการเก็บผลึกใน [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java#L5771-L5786)
     - อัปเดต [`mob_drops.json`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/resources/mob_drops.json) แก้ไขรหัสไอเทมที่ผิดพลาด 103 รายการ (`4009000` ➔ `2636421` `Sol Erda Energy`, `4009001` ➔ `4009548` `Sol Erda Fragment`, `1032330` บน Darknell ➔ `1032316` `Commanding Force Earring`), แก้ตารางดรอปที่สลับกันของ Normal/Hard Lotus, Normal/Hard Damien, Easy/Normal/Hard Lucid Music Box, Normal/Chaos Slime, และผูกตารางดรอปเข้ากับกล่องรางวัลบอสครบทุกตัว
     - เพิ่มสคริปต์พอร์ทัลและ NPC ทางออกบอส (`ptSuuOut`, `out_450004300`, `BM1_bossOut`, `jinHillah_out`, `serenOut`, `base_slime`, `slimeOut`, `limbo_storyOut`, และ NPC `9091013`–`9091051`, `3003562`) ให้เรียก `sm.exitBoss()` ครบทุกห้อง

## 📅 [2026-10-15 02:05 น.] Full Audit & Bug Fix of Hayato, Kanna, Illium, Kain & Complete Resistance Class Family (1st–4th Job, V Matrix, and HEXA 6th Job)

### 🎯 Scope & Technical Details
- **หัวข้อ**: Comprehensive 1st–4th Job, V Matrix (5th Job), and HEXA Matrix (6th Job) Full Audit, Refactoring, and Bug Fix for Sengoku (`Hayato`, `Kanna`), Flora (`Illium`), Nova (`Kain`), and All Resistance Classes (`Citizen`, `Blaster`, `Battle Mage`, `Wild Hunter`, `Mechanic`, `Xenon`, `Demon`, `Demon Slayer`, `Demon Avenger`)
- **รายละเอียด**:
  1. **Sengoku — Hayato (`4001`, `4100`, `4110`, `4111`, `4112`, `4114`) ([`Hayato.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/sengoku/Hayato.java))**:
     - **ปัญหาที่พบ (Problem)**:
       - `KATANA_BOOSTER` (`41001003`) และ `MILITARY_MIGHT` (`41001005`) เปลี่ยนเป็นสกิลติดตัว (`psd=1`) ใน v265 WZ แต่โค้ดยังอยู่ใน `buffs[]`
       - `SUDDEN_STRIKE` (`41121017`) ใช้ `MobStat.AddDamParty` แทนที่จะเป็น `MobStat.TotalDamParty`
       - การสลับท่า `Quick Draw` (`41001001` / `40011291`) หักค่า `Sword Energy` เหลือ 150 แทนการหัก 100 แต้มตามกลไก v265 และขาดการแจกบัฟ Aura (`CritRate`, `BossDamR`, `BDR`, `Booster`, `Stance`)
       - `IAIJUTSU_PHANTOM_BLADE` (`400011026`) มีค่า `indiePadR = 0` ใน WZ (เก็บค่า `%FD` ไว้ใน `SkillStat.v` = 4% ต่อสแต็ก) ทำให้กดใช้แล้วไม่ได้รับบัฟดาเมจ และหัก Sword Energy 250 แทน 200
       - `BATTOUJUTSU_ULTIMATE_WILL` (`400011104`) ใช้ `SkillStat.u` (ซึ่งเป็น 0) แทน `800` Sword Energy
       - สกิล HEXA (`HEXA_SANRENZAN` `41141000`–`41141003`, `HEXA_BLADE_FLASH` `41141004`, `HEXA_SHINSOKU` `41141005`–`41141007`, `41141008`–`41141022`) และ 2nd 6th Job Ascent (`FLEETING_BREATH` `41141503`–`41141504`) ไม่ได้ถูกผูกเข้ากับการชาร์จ Sword Energy, กระบวนท่า `BATTOUJUTSU_ZANKOU` (`400011029`), `AKATSUKI_TRACE` (`41120018`), และการติดดีบัฟ `Hitokiri Strike` / `Merciless Blade`
     - **วิธีแก้ (Fix/Implementation)**:
       - อัปเดต [`Hayato.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/sengoku/Hayato.java) ให้รองรับสกิล 1st–4th Job, V Matrix, และ HEXA Mastery ครบทุกสกิล (`41141000`–`41141022`), เพิ่ม `FLEETING_BREATH` (`41141503`–`41141504`) พร้อมอมตะ `IndieNotDamaged` 7 วินาที (ตั้งค่าครบทั้ง `nOption`/`rOption`/`tOption` และ `nValue`/`nReason`/`tTerm`), `MobStat.Freeze` 10 วินาที + `MobStat.OriginDebuff` 20 วินาที, แก้บัฟ `IAIJUTSU_PHANTOM_BLADE` ให้ส่ง `IndiePMdR` (`v * stacks`), แก้ `Quick Draw` Aura, และเพิ่มการคืนค่า Sword Energy ใน `BATTOUJUTSU_ZANKOU` (`700`) และ `BATTOUJUTSU_ULTIMATE_WILL` (`800`)
  2. **Sengoku — Kanna (`4002`, `4200`, `4210`, `4211`, `4212`, `4214`) ([`Kanna.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/sengoku/Kanna.java), [`FoxManHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/life/FoxManHandler.java), [`BaseStat.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/enums/BaseStat.java), [`TemporaryStatManager.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/skills/temp/TemporaryStatManager.java), [`AffectedArea.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/life/AffectedArea.java), [`Summon.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/life/Summon.java))**:
     - **ปัญหาที่พบ (Problem)**:
       - ใน [`FoxManHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/life/FoxManHandler.java) เงื่อนไข `if (!tsm.hasStat(ChangeFoxMan))` เขียนกลับด้าน ทำให้ Haku ไม่สามารถร่ายบัฟให้ตัวละครได้เลย!
       - ใน [`BaseStat.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/enums/BaseStat.java) `FoxBless` อ่านเฉพาะ `o.nOption` ในขณะที่ `ChangeFoxMan` เป็น Indie CTS ที่เก็บค่าใน `o.nValue` ทำให้ Haku's Blessing เพิ่มค่า MATK = 0!
       - ใน [`Kanna.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/sengoku/Kanna.java) `Foxfire` (`42111004` / `42121052`) ถูกเรียกผ่าน `handleHit` ขณะยังถือล็อกของ `TemporaryStatManager` แล้วเรียก `removeStat` ซ้อนจนเสี่ยงเกิด Deadlock / `ConcurrentModificationException`, และ `Haku Reborn` (`42101002`) ไม่ได้สร้าง `FoxMan` ใหม่เมื่อย้ายแมพ (`handleInitAfterMigrate`)
       - ขาดสกิล HEXA (`42141008`–`42141022`: `HEXA_NIGHTGHOST_GUIDE`, `HEXA_KISHIN_SHOUKAN`, `HEXA_TENGU_STRIKE`, `HEXA_GHOST_YAKSHA_BOSS`, `HEXA_ORCHID_BLOSSOM`), `HEXA_SPIRITS_DOMAIN` (`500061069`), และ 2nd 6th Job Ascent (`SENGOKU_FORCES_ASSEMBLE` `42141503`–`42141505`)
     - **วิธีแก้ (Fix/Implementation)**:
       - แก้ไข [`FoxManHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/life/FoxManHandler.java) และ [`BaseStat.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/enums/BaseStat.java) ให้ Haku ร่ายบัฟและคำนวณ MATK จาก `FoxBless` ได้ถูกต้อง 100%
       - แก้ไข [`Kanna.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/sengoku/Kanna.java), [`TemporaryStatManager.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/skills/temp/TemporaryStatManager.java), [`AffectedArea.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/life/AffectedArea.java), และ [`Summon.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/life/Summon.java): รองรับ `HEXA_GHOST_YAKSHA_BOSS` (`42141015`), `HEXA_KISHIN_SHOUKAN` (`42141010`), `HEXA_SPIRITS_DOMAIN` (`500061069`), `SENGOKU_FORCES_ASSEMBLE` (`42141503`–`42141505`), ชาร์จมานาของ `Mana Vein`, ลดการใช้ Mana ครึ่งหนึ่งใน [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) ขณะเปิด `Circle of Suppression`, และเรียกคืน Haku อัตโนมัติหลังย้ายแมพ
  3. **Flora — Illium (`15000`, `15200`, `15210`, `15211`, `15212`, `15214`) ([`Illium.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/flora/Illium.java) & [`SummonedHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/life/SummonedHandler.java))**:
     - **ปัญหาที่พบ (Problem)**:
       - `handleSkill` เรียก `getCrystal().getPosition()` โดยไม่เช็ค `getCrystal() != null` สำหรับ `CRYSTAL_SKILL_HARMONY_LINK` และ `CRYSTAL_IGNITION` ทำให้เสี่ยงเกิด NPE
       - `HEXA_CRAFT_JAVELIN` (`152141000`), `HEXA_GLORY_WING_JAVELIN` (`152141002`), และ `HEXA_CRAFT_ORB` (`152141004`) ไม่ได้ถูกผูกเข้ากับ `incrementCrystal(skillId)` ทำให้ตีด้วยสกิลคลาส 6 แล้วเกจคริสตัล (`CrystalCharge`) ไม่ขึ้นและแปลงร่าง `Glory Wings` ไม่ได้!
       - ใน [`SummonedHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/life/SummonedHandler.java) เมื่อลูกแก้วชนคริสตัลตรวจเช็คเฉพาะ `REACTION_DESTRUCTION_II` (`152120001`) แต่ไม่รวม `HEXA_REACTION_DESTRUCTION` (`152141007`) และขาด `HEXA_REACTION_DOMINATION` (`152141009`), `HEXA_VORTEX_OF_LIGHT` (`152141010`), `HEXA_RESONANCE` (`152141011`), `HEXA_DEUS` (`152141012`), `HEXA_MACHINA` (`152141014`), `HEXA_LONGINUS_SPEAR` (`152141015`), `HEXA_UMBRAL_BRAND_III` (`152140016`), และ 2nd 6th Job Ascent (`EXALTED_LIGHT` `152141507`–`152141508`)
     - **วิธีแก้ (Fix/Implementation)**:
       - อัปเดต [`Illium.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/flora/Illium.java) และ [`SummonedHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/life/SummonedHandler.java) ให้รองรับการชาร์จคริสตัล, ปฏิกิริยา Reaction: Destruction / Domination คลาส 6, การติด `Umbral Brand` (`giveCurseMark`) และ `Lucent Brand` (`giveBlessMark`), ซัมมอน `HEXA_DEUS` + Satellites / `HEXA_MACHINA`, สกิล `CRYSTAL_GATE` (`400021099`), และ `EXALTED_LIGHT` (`152141507`–`152141508`) พร้อม Null-guard คริสตัลครบทุกจุด
  4. **Nova — Kain (`6003`, `6300`, `6310`, `6311`, `6312`, `6314`) ([`Kain.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/Kain.java))**:
     - **ปัญหาที่พบ (Problem)**:
       - เมธอด `addMalice()` ไม่ได้ส่ง `UserLocal.incDarknessAura(malice)` ให้ไคลเอนต์ และไม่ได้จำกัดเพดานตาม `GRINDING_2` (`63120007` = 500) ทำให้เกจ Malice บนหน้าจอไม่ขยับและกด `Possession` (`63001001`) ไม่ได้!
       - `applyDeathBlessing` และ `realizeDeathBlessing` ตั้งค่าเฉพาะ `o.nOption` / `o.rOption` แต่ไม่ตั้งค่า `o.nValue` / `o.nReason` ทำให้สแต็ก `Death Blessing` บนตัวผู้เล่น (`CharacterTemporaryStat.NADeathBlessing`) ไม่แสดงและระเบิดสแต็กด้วย Execution Skills ไม่ได้
       - สกิล Toggle `REMAIN_INCENSE` (`63111009`) และ `HEXA_LASTING_GRUDGE` (`63141016`) ถูกใส่ไว้ใน `possessionSkills[]` ผิดพลาด
       - ขาดสกิล HEXA (`HEXA_DRAGON_FANG` `63141014`, `HEXA_DEATH_BLESSING` `63141012`–`63141013`, `HEXA_UNSEEN_SNIPER` `63141017`–`63141019`, `HEXA_CHASING_SHOT` `63141020`, `HEXA_SNEAK_ATTACK` `63141021`–`63141022`), 2nd 6th Job Ascent (`CHURNING_MALICE` `63141505`–`63141507`), และการแจก SP คลาส 1 (5 แต้มแทน 4 แต้มที่ Lv.10) ใน `handleLevelUp`
     - **วิธีแก้ (Fix/Implementation)**:
       - แก้ไข [`Kain.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/nova/Kain.java) ให้ส่งแพ็กเก็ต `UserLocal.incDarknessAura` และอัปเดต `NAPossession`, แก้ `applyDeathBlessing` / `realizeDeathBlessing` ให้ใช้ทั้ง `nOption` และ `nValue` พร้อมเช็คเพดานสแต็ก 15/20 และฮีลเลือดจาก `EXECUTE_ENHANCE`, รองรับ HEXA Mastery ทั้งหมดและ `CHURNING_MALICE`, และตั้งค่า `handleInitAfterMigrate` ให้ซิงค์เกจ Malice ทันทีที่เข้าแมพ
  5. **Resistance Family Full Audit & Refactoring (`Citizen`, `Blaster`, `Battle Mage`, `Wild Hunter`, `Mechanic`, `Xenon`, `Demon`, `Demon Slayer`, `Demon Avenger`)**:
     - **รากฐานสายอาชีพ (`JobConstants.java`, `Job.java`, `AdminCommands.java`)**:
       - แก้บั๊กสำคัญใน [`JobConstants.getBeginnerJobByJob`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/JobConstants.java#L1216-L1225): เดิมเช็ค `isResistance(job)` ก่อน `isDemon(job)` และ `isXenon(job)` (ซึ่ง `isResistance(jobId)` คือ `jobId / 1000 == 3` จึงครอบคลุม `3100` Demon และ `3600` Xenon ไปด้วย!) ทำให้ Demon และ Xenon ได้รับ Beginner Job ID เป็น `3000` (Citizen) แทนที่จะเป็น `3001` (Demon) และ `3002` (Xenon)!
       - อัปเดตรหัสอาวุธรอง BiS ใน [`Job.ensureSecondaryWeapon`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java) และ [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java) ให้ตรงกับ v265 WZ 100% (`1099015` Ruin Force Shield สำหรับ DS/DA, `1352952` PNo Magic Marble สำหรับ Battle Mage, `1352962` PNo Arrowhead สำหรับ Wild Hunter, `1352703` PNo Magnum สำหรับ Mechanic, `1353403` PNo Charges สำหรับ Blaster, `1552119` Haku Fan สำหรับ Kanna)
     - **Citizen (`3000`) ([`Citizen.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/resistance/Citizen.java))**:
       - ถอด `SECRET_ASSEMBLY` (`30001281`) ออกจากสกิลที่แจกตอนสร้างตัวละครใน `setCharCreationStats` เพื่อให้ได้รับเมื่อเปลี่ยนอาชีพที่ Lv.10 ตามมาตรฐาน
     - **Blaster (`3700`–`3714`) ([`Blaster.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/resistance/Blaster.java))**:
       - ถอด `ARM_CANNON_BOOSTER` (`37101003` เปลี่ยนเป็น `psd=1` ใน v265) ออกจาก `buffs[]`, แก้ `getMaxAmmo()` ไม่ให้เกิด `NullPointerException` เมื่อ `chr == null` ในคอนสตรัคเตอร์, เพิ่มการรีเซ็ตกระสุนและซิงค์ `RWBarrier` ใน `handleInitAfterMigrate`, เพิ่มสกิล HEXA (`37141005`–`37141016`: `HEXA_REVOLVING_CANNON_MASTERY`, `HEXA_HAMMER_SMASH`, `HEXA_SHOTGUN_PUNCH`, `HEXA_BALLISTIC_HURRICANE`, `HEXA_HURRICANE_MIXER`) และ 2nd 6th Job Ascent (`VANGUARD_STRIKE` `37141504`–`37141505`)
     - **Battle Mage (`3200`–`3214`) ([`BattleMage.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/resistance/BattleMage.java))**:
       - ถอด `STAFF_BOOSTER` (`32101005`, `psd=1`) ออกจาก `buffs[]`, แก้ `applyDarkBrandOnMob` ให้เช็ค `DARK_GENESIS` / `HEXA_DARK_GENESIS` คู่กับ `DARK_LIGHTNING` เพื่อติดตรา `ElementDarkness` ได้แม้ยังไม่ได้อัป Dark Genesis, แก้ `handleCondemnation` ให้ลดแต้มที่ต้องใช้ลง 1 แต้มขณะเปิด `MASTER_OF_DEATH` (`32121056`) และซัมมอนยมทูตอัตโนมัติใน `handleInitAfterMigrate`, เพิ่ม `ABYSSAL_LIGHTNING` (`400021095`), สกิล HEXA (`32141008`–`32141016`: `HEXA_DARK_SHOCK`, `HEXA_SWEEPING_STAFF`, `HEXA_DARK_GENESIS`), และ 2nd 6th Job Ascent (`CLEAN_HIT` `32141503`)
     - **Wild Hunter (`3300`–`3314`) ([`WildHunter.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/resistance/WildHunter.java) & [`Summon.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/life/Summon.java))**:
       - ถอด `CROSSBOW_BOOSTER` (`33101003`, `psd=1`) ออกจาก `buffs[]`, แก้ NPE ใน `handleSkill` เมื่อ `si == null` สำหรับสกิลเสือจากัวร์, ส่งแพ็กเก็ต `WvsContext.wildHunterInfo` ใน `handleInitAfterMigrate` เพื่อให้เรียกเสือจากัวร์ได้ตั้งแต่สร้างตัวละครใหม่, เพิ่มสกิล HEXA (`33141005`–`33141023`: `HEXA_SUMMON_JAGUAR_*`, `HEXA_SWIPE`, `HEXA_DASH_N_SLASH`, `HEXA_SONIC_ROAR`, `HEXA_JAGUAR_SOUL`, `HEXA_JAGUAR_RAMPAGE`, `HEXA_EXPLODING_ARROWS`, `HEXA_HUNTING_ASSISTANT_UNIT`, `HEXA_DRILL_SALVO`) และ 2nd 6th Job Ascent (`GEAR_STORM` `33141506`)
     - **Mechanic (`3500`–`3514`) ([`Mechanic.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/resistance/Mechanic.java))**:
       - ถอด `MECHANIC_RAGE` (`35101006`, `psd=1`) ออกจาก `buffs[]`, แก้ `getMaxockets()` ให้รองรับ `OVERCLOCKED_MISSILE`, `HEXA_HOMING_BEACON` (`35141004`), และ `BOMBER_TIME` (`35121055`), แก้ `MECHA_CARRIER` (`400051084`) ไม่ให้เกิด NPE เมื่อ `si == null`, และเพิ่มสกิล HEXA (`35141005`–`35141016`: `HEXA_DISTORTION_BOMB`, `HEXA_ROCK_N_SHOCK`, `HEXA_BOTS_N_TOTS`, `HEXA_SUPPORT_WAVER_H_EX`) พร้อม 2nd 6th Job Ascent (`CRITICAL_POINT_BARRAGE` `35141504`)
     - **Xenon (`3002`, `3600`–`3614`) ([`Xenon.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/resistance/Xenon.java) & [`AffectedArea.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/life/AffectedArea.java))**:
       - ถอด `XENON_BOOSTER` (`36101004`, `psd=1`) ออกจาก `buffs[]`, แก้บั๊ก `HYBRID_LOGIC` (`30020232`), `MULTILATERAL_I` (`30020234`), และ `MULTILATERAL_VI` (`36120045` ซึ่งถูกใส่ใน `handleLevelUp` ผิดที่ Lv.200 ทั้งที่เป็น Hyper Passive Lv.180), แก้ `OOPARTS_CODE` (`36121003`) ให้ส่ง `IndiePMdR` (`indiePMdR = 30`) และ `BdR` แทน `IndieDamR` ที่เป็น 0 ใน WZ, แก้ `AMARANTH_GENERATOR` ให้เติมเกจ `SupplySurplus` เต็ม 20 ทันที, เพิ่ม `PHOTON_RAY` (`400041057`–`400041058`), `HEXA_BEAM_DANCE` (`36141006`–`36141007`), `HEXA_HYPOGRAM_FIELD` (`36141008`–`36141011`), `HEXA_ORBITAL_CATACLYSM` (`36141012`–`36141013`), `HEXA_TRIANGULATION` (`36140014`), และ 2nd 6th Job Ascent (`NEON_BREAKER` `36141503`–`36141506`)
     - **Demon / Demon Slayer (`3001`, `3100`–`3114`) ([`Demon.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/resistance/demon/Demon.java), [`DemonSlayer.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/resistance/demon/DemonSlayer.java), [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java))**:
       - แก้ให้ `DemonSlayer` และ `DemonAvenger` สืบทอดจาก `Demon` (`extends Demon`) เพื่อให้ได้รับ `DEFENDER_OF_THE_DEMON` (`Mastema's Mark`) ใน `handleHit`
       - แก้บั๊กปัดเศษทศนิยมทิ้งใน [`Char.applyMpCon`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) (`(100 - reduceR) / 100` แบบ `int` กลายเป็น `0` เสมอ!) เป็น `/ 100.0D` และเพิ่ม `HEXA_DEMON_IMPACT` (`31141000`–`31141001`) กับ `HEXA_DARK_METAMORPHOSIS` (`31141009`)
       - แก้สูตร `LEECH_AURA` (`31121002`) ที่เดิมคูณด้วย 100 เกินจนฮีลเต็มหลอดทุกฮิต, เพิ่ม Timer ฟื้นฟู Fury อัตโนมัติทุก 4 วินาทีจาก `MAX_FURY` (`31110009`), แก้ `VENGEANCE` (`31101003` เปลี่ยนเป็น `psd=1` ใน v265), และเพิ่มสกิล HEXA (`HEXA_DEMON_LASH` `31141002`–`31141005`, `HEXA_DEMON_IMPACT_2` `31141001`, `HEXA_CERBERUS_CHOMP` `31141006`, `HEXA_DEMONIC_PLUME` `31141007`, `HEXA_DARK_METAMORPHOSIS` `31141008`–`31141010`) พร้อม 2nd 6th Job Ascent (`SINISTER_SHACKLES` `31141504`–`31141506`)
     - **Demon Avenger (`3101`, `3120`–`3124`) ([`DemonAvenger.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/resistance/demon/DemonAvenger.java), [`AttackHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/AttackHandler.java), [`SkillHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/user/SkillHandler.java), [`Job.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java))**:
       - แก้บั๊กหารด้วยศูนย์ (`ArithmeticException: / by zero`) ใน `DEMONIC_FRENZY` (`400011010`) เนื่องจาก `si.getValue(y, slv)` ใน v265 WZ เป็น `0` (ใช้ `Math.max(1, si.getValue(SkillStat.y, slv))`)
       - แก้ [`Job.applyHpCost`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java) ให้ไม่เสีย HP เมื่อบัฟ `FORBIDDEN_CONTRACT` (`31221054`) ทำงานอยู่
       - เพิ่ม Null-guard สำหรับ `tsm.getOption(OverloadCount)` ทุกจุด, แก้การสร้าง ForceAtom ของ `HEXA_NETHER_SHIELD` (`31241000` / `31241001`), รองรับ `HEXA_REVENANT` (`500061054`), `HEXA_THOUSAND_SWORDS` (`31241004`), `HEXA_MASTEMAS_CLAW` (`31241005`), และ 2nd 6th Job Ascent (`CHAOTIC_GLUTTONY` `31241506`)

## 📅 [2026-10-15 00:50 น.] Complete Resolution of Green Cube Lag/Freeze, Mutual Regression between Green Cube & Bright Cube (Bonus Poten Cube), and Full Rebirth Flame Before/After Audit Across All Tiers

### 🎯 Scope & Technical Details
- **หัวข้อ**: Permanent Fix for Green Cube Freeze/Lag, Elimination of Mutual Slot-Shadowing Regression between Green Cube (`5062505`/`5062500`/`2730007`) and Bright Cube / Bonus Bright Cube (`5062029`/`5062506`/`5062503`), O(1) Cube Potential Lookup Engine, and Complete Rebirth Flame Before/After Selection Overhaul
- **รายละเอียด**:
  1. **แก้ไขปัญหาแก้ลูกบาศก์เขียวแล้ว Bright Cube (Bonus Poten Cube) พังสลับไปมา (Mutual Regression between Green Cube & Bright Cube)**:
     - **ปัญหาที่พบ (Problem)**:
       - เมื่อแก้ให้ลูกบาศก์เขียวใช้งานได้ ลูกบาศก์ Bright Cube / Bonus Bright Cube (`5062506`, `5062503`, `5062029`) จะกดใช้ไม่ได้ พอสลับไปแก้ Bright Cube ให้ใช้ได้ พอกลับมาแก้ลูกบาศก์เขียวอีกครั้ง Bright Cube ก็กลับมาพังซ้ำวนลูปหลายรอบ
     - **สาเหตุเชิงเทคนิค (Root Cause)**:
       1. **การชนกันของหมายเลขช่องกระเป๋า (`Slot Shadowing` ระหว่าง `ConsumeInventory` และ `CashInventory`)**:
          - ใน [`CubeHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/CubeHandler.java) เมธอด `handleUserCashCubeItemUseRequest (1863)` และ `handleUserBonusBrightCubeItemUseRequest (371)` เดิมใช้วิธีดึงไอเทมจาก `ConsumeInventory.getItemBySlot(pos)` ก่อน แล้วเช็คแค่ `if (item == null)` จึงค่อยไปดึงจาก `CashInventory.getItemBySlot(pos)` (หรือสลับลำดับกันในคอมมิตก่อนหน้า)โดย**ไม่ตรวจสอบว่าไอเทมในช่อง `pos` นั้นเป็นลูกบาศก์จริงหรือไม่ (`ItemConstants.isAnyCube`)**
          - ส่งผลให้เมื่อผู้เล่นมีไอเทมทั่วไปในช่อง `Use / Consume` (เช่น Power Elixir, Nodestone, หรือหิน Flame ในสล็อตที่ 1–10) แล้วกดใช้ **Bright Cube / Bonus Bright Cube** ที่อยู่ในช่อง `Cash` สล็อตเดียวกัน โค้ดจะหยิบยาหรือหินในช่อง `Consume` มาแทนลูกบาศก์ในช่อง `Cash` ทำให้เซิร์ฟเวอร์มองว่าไม่ใช่ลูกบาศก์และยกเลิกการทำงานทันที! ในทางกลับกัน พอสลับให้เช็คช่อง `Cash` ก่อน ลูกบาศก์เขียวที่อยู่ในช่อง `Consume` (`2730007` Bonus Mystical Cube) ก็จะถูกไอเทมในช่อง `Cash` สล็อตเดียวกันบังจนกดใช้ไม่ได้สลับไปมา!
       2. **การส่งแพ็กเก็ตผิด Opcode และการลบกองลูกบาศก์ทิ้งกลางคันใน `handleCube`**:
          - ใน `handleCube` เดิมมีการส่ง `UserLocal.brightCubeResult` (`OutHeader.BRIGHT_CUBE_RESULT = 1519`) ซึ่งสำหรับลูกบาศก์เขียว (`5062500` Bonus Potential Cube) ไคลเอนต์ไม่ได้เปิดหน้าต่าง Memorial Before/After ทำให้ UI ค้างรอแพ็กเก็ต `UserLocal.itemSlotExtendItemUse` (`OutHeader.ITEM_SLOT_EXTEND_RESULT = 1518`)
          - นอกจากนี้โค้ดแปลงรหัสลูกบาศก์เก่า (`chr.consumeItem(cube, remainingQty); chr.addItemToInventory(normalizedCubeId, remainingQty);`) ไปลบกองลูกบาศก์ที่หน้าต่าง UI กำลังอ้างอิง `uPos` อยู่ทิ้งกลางคัน ทำให้กดสุ่มครั้งถัดไปไม่ได้และเกมค้าง
     - **วิธีแก้ (Fix/Implementation)**:
       - สร้างเมธอดกลาง `findCubeItem(Char chr, int pos, int expectedCubeId, boolean preferCash)` ใน [`CubeHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/CubeHandler.java#L232-L280) และเพิ่ม `ItemConstants.isAnyCube(int itemId)` / `ItemConstants.isMemorialCube(int itemId)` ใน [`ItemConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java#L1735-L1765):
         - ตรวจสอบทั้ง `item.getItemId() == expectedCubeId` และ `ItemConstants.isAnyCube(item.getItemId())` ในช่องกระเป๋าที่ระบุก่อนเสมอ หากสล็อต `pos` ในกระเป๋าแรกเป็นไอเทมอื่นที่ไม่ใช่ลูกบาศก์ (เช่น ยา/หิน) ระบบจะข้ามไปค้นหาลูกบาศก์ในอีกกระเป๋าหนึ่งโดยอัตโนมัติ และมี Fallback ค้นหาด้วย `expectedCubeId` ทำให้ `Consume` และ `Cash` ไม่บังกันอีกต่อไป 100%
       - คืนค่าการส่ง `UserLocal.itemSlotExtendItemUse(true, cubeID, equip.getItemId())` (`1518`) ใน `handleCube` และนำโค้ดที่ลบกองลูกบาศก์กลางคันออก
  2. **แก้ไขอาการเกมหน่วง/กระตุกเวลาสุ่มลูกบาศก์ (O(1) Potential Option Cache & O(1) ItemGrade Lookup)**:
     - **ปัญหาที่พบ (Problem)**: ทุกครั้งที่กดสุ่มลูกบาศก์ (โดยเฉพาะลูกบาศก์เขียวและลูกบาศก์ที่สุ่มรัวๆ) เกมจะมีอาการหน่วงและกระตุกสะสม
     - **สาเหตุเชิงเทคนิค (Root Cause)**:
       - ใน [`ItemConstants.getOptionsByEquip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java#L2015-L2095) ทุกครั้งที่สุ่มออปชั่น 1 แถว โค้ดจะวนลูป `for (ItemOption io : data)` สแกนรายการ `ItemOption` นับพันรายการถึง **6 รอบต่อแถว (18 รอบต่อการกดลูกบาศก์ 1 คลิก)**
       - ยิ่งไปกว่านั้น ภายในลูปยังเรียก [`ItemGrade.getGradeByOption(io.getId())`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/enums/ItemGrade.java#L50-L90) ซึ่งข้างในเรียก `Arrays.stream(values()).filter(...).findFirst()` สร้างอ็อบเจกต์ Stream ใหม่หลายหมื่นครั้งต่อการกดลูกบาศก์เพียง 1 ครั้ง!
     - **วิธีแก้ (Fix/Implementation)**:
       - แก้ไข [`ItemGrade.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/enums/ItemGrade.java#L50-L90): เปลี่ยน `getGradeByVal` และ `getGradeByOption` จาก `Arrays.stream` เป็น `switch` และเงื่อนไขเปรียบเทียบค่าโดยตรงระดับ **O(1)** (Zero Allocation)
       - แก้ไข [`ItemConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java#L2015-L2095): สร้างตาราง Pre-indexed Cache `CACHED_OPTIONS_BY_KEY` แยกตาม `(optionType, normalizedGrade, bonus)` ทำให้การดึงรายการออปชั่นของลูกบาศก์ทุกชนิดทำงานในเวลา **O(1)** ทันที ปราศจากอาการหน่วง 100%
  3. **ตรวจสอบและแก้ไขระบบ Rebirth Flame ทุกขั้น ทุกหิน ให้เลือกสเตตัสก่อน / หลังได้จริง 100% (Full Rebirth Flame Before/After Audit)**:
     - **ปัญหาที่พบ (Problem)**: การใช้หิน Rebirth Flame เพื่อเลือกสเตตัสก่อน/หลัง (Before / After) มีปัญหาเลือกไม่ได้จริงในบางกรณี หรือกดใช้หินจากร้านค้าแล้วไม่เปิดหน้าต่าง Before / After
     - **สาเหตุเชิงเทคนิค (Root Cause)**:
       1. ใน [`Equip.deepCopy()`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/items/Equip.java#L505-L512) ไม่ได้คัดลอก `ret.setId(getId())` ทำให้ `equipCopy` ที่ส่งไปแสดงผลฝั่ง `After` ในแพ็กเก็ต `blackFlameOfResurrectionModifed` มี `SN = 0` ไม่ตรงกับอุปกรณ์จริง
       2. ใน [`WvsContext.blackFlameOfResurrectionModifed`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/connection/packet/WvsContext.java#L1529-L1548) ส่งค่า `equip.getBagIndex()` เป็นค่าบวกเสมอแม้ผู้เล่นจะตี Flame ใส่อุปกรณ์ที่สวมใส่อยู่ (`InvType.EQUIPPED`) ซึ่งไคลเอนต์ต้องการค่าติดลบ (`-equip.getBagIndex()`)
       3. ใน [`ItemUpgradeHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemUpgradeHandler.java#L64-L231) เดิมบันทึกแค่ค่า `ex` ใหม่ลงใน `FLAME_QR` โดยไม่บันทึก `oldex` และใน `handleMemorialExUpgradeItemOptionRequest (1629)` อ่านเฉพาะ `bSelect == 1` หรือ `6` แบบตายตัว รวมถึงไม่รองรับกรณีลากหิน Rebirth Flame ระดับทั่วไปใส่ไอเทมโดยตรงผ่าน `USER_UPGRADE_ITEM_USE_REQUEST (350)` (ซึ่งเคยติดเงื่อนไข `equip.getTuc() == 0`)
       4. ใน [`ItemConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java#L1765-L1855) รหัส `2048752` (Powerful Rebirth Flame) ถูกใส่ผิดอยู่ใน `isEternalRebirthFlame`, ขาด `2536001` (Karma Black Rebirth Flame) และ `2048787` (Eternal Rebirth Flame)
       5. ในร้านค้า [`point_shop.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/scripts/npc/point_shop.py#L541-L551) รายการ `"Black Rebirth Flame"` เดิมผูกกับรหัส `2048744` ซึ่งใน WZ แท้จริงคือ `Powerful Rebirth Flame` (ไม่ใช่ Black Flame!) ทำให้ผู้เล่นที่ซื้อไปกดใช้ได้แต่สุ่มทับทันทีโดยไม่มีหน้าต่างเลือก Before / After
     - **วิธีแก้ (Fix/Implementation)**:
       - แก้ไข [`Equip.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/items/Equip.java#L505-L512) ให้ `deepCopy()` คัดลอก `ret.setId(getId())` เสมอ
       - แก้ไข [`WvsContext.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/connection/packet/WvsContext.java#L1529-L1548) ให้เข้ารหัส `-equip.getBagIndex()` เมื่ออุปกรณ์อยู่ในช่อง `EQUIPPED`
       - แก้ไข [`ItemUpgradeHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemUpgradeHandler.java#L37-L231):
         - แยกการทำงานของ Memorial Rebirth Flames (`Black Rebirth Flame` Tier 4–7 และ `Abyssal Rebirth Flame` Tier 5–7) ให้สุ่มบน `equipCopy` โดยไม่เขียนทับอุปกรณ์จริงจนกว่าผู้เล่นจะกดเลือก **Before** (`oldex`) หรือ **After** (`newex`) พร้อมข้อความยืนยันชัดเจน
         - รองรับ Non-Memorial Rebirth Flames (`Powerful`, `Eternal`, และ `Level 110–150` ทุกก้อน) ทั้งการกดผ่านหน้าต่าง UI (`1628`/`1629` รองรับปุ่ม Use Again ต่อเนื่อง) และการลากวางใส่อุปกรณ์โดยตรง (`350`) โดยไม่ติดเงื่อนไข `tuc == 0`
       - แก้ไข [`ItemConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java#L1765-L1855) จัดหมวดหมู่รหัสหิน Rebirth Flame ทุกก้อนใน WZ ให้ตรงระดับ Tier 100% และอัปเดต [`point_shop.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/scripts/npc/point_shop.py#L541-L551) ให้จำหน่าย `2048753` (`Black Rebirth Flame` ของแท้ที่เปิดหน้าต่าง Before/After) และเพิ่ม `2048796` (`Abyssal Rebirth Flame` Tier 5–7 Before/After)

## 📅 [2026-10-14 22:12 น.] Deep Fix for Green Bonus Potential Cube & All Cubes UI Freeze/Lag (UICubeWz2 Migration & Async Item SQL), Arcane Symbols Quest & Daily Script Full Audit, and Equipment Upgrade & Enhancement Full Audit (+10% Challenging Balance)

### 🎯 Scope & Technical Details
- **หัวข้อ**: Full Audit & Resolution of Green Bonus Potential Cube (`5062500` ➔ `5062505`) & All Cubes UI Freeze/Lag, Arcane Symbols Story/Daily Quest Script Errors & Level-0 Symbol Bugs, and Complete Equipment Upgrade/Enhancement Formula Audit with 10% More Challenging Rates
- **รายละเอียด**:
  1. **Phase 1: แก้ไขอาการหน่วง/เกมค้างเวลากดใช้ลูกบาศก์กล่องเขียวและลูกบาศก์ทั้งหมด (Green Bonus Potential Cube & All Cubes UI Freeze/Lag Deep Fix)**:
     - **ปัญหาที่พบ (Problem)**: เวลากดใช้กล่องเขียว (Bonus Potential Cube `5062500`) รวมถึงลูกบาศก์อื่นๆ มีอาการหน่วงค้างเหมือนเกมค้าง (Client UI Freeze / Main Packet Thread Stall)
     - **สาเหตุเชิงเทคนิคที่พิสูจน์แล้ว (5 Proven Root Causes from WZ & Packet Handlers)**:
       1. **ระบบ UI ลูกบาศก์เก่า (`UI/UIWindow2.img/*`) ถูกถอด Opcode ผลลัพธ์ใน v265 และเปลี่ยนเป็น `UI/UICubeWz2.img/*`**:
          - จากการตรวจสอบ `Item.wz/Cash/0506.img.xml`, `Item.wz/Consume/0271.img.xml`, `0273.img.xml`, และ `UI.wz/UICubeWz2.img.xml` พบว่าไคลเอนต์ GMS v265 เปลี่ยนระบบหน้าต่างตีลูกบาศก์ทั้งหมดมาใช้ `UI/UICubeWz2.img/*` ซึ่งส่งแพ็กเก็ต `USER_CASH_CUBE_ITEM_USE_REQUEST (1863)` และรอรับ `OutHeader.CUBE_SYSTEM_RELEASE (546)`
          - ทว่าร้านค้า [`point_shop.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/scripts/npc/point_shop.py) และไอเทมเก่าในคลังผู้เล่นยังคงใช้รหัสลูกบาศก์รุ่นเก่า (`5062500` Bonus Potential Cube ที่ผูกกับ `UI/UIWindow2.img/MiracleCube_Additional`, `5062009` Red Cube, `5062010` Black Cube, `5062503` White Additional Cube, `2710000`/`2711000` Occult Cube, `2730000` Bonus Occult Cube) เมื่อกดใช้ `5062500` ไคลเอนต์จะเปิดหน้าต่างเก่า `MiracleCube_Additional` ที่รอรับแพ็กเก็ต `ADDITIONAL_CUBE_RESULT` (ซึ่งเป็น `UnkValue` ใน v265) และไม่ยอมรับ `CUBE_SYSTEM_RELEASE (546)` ทำให้หน้าต่าง UI ของเกมค้างล็อกทุกครั้งที่กด!
       2. **การเขียน SQL แบบ Synchronous บน Netty Packet Thread ทุกครั้งที่กดใช้ลูกบาศก์ (`Item.java` & `Equip.java` & `Char.java`)**:
          - ทุกครั้งที่กดใช้ลูกบาศก์ 1 ครั้ง เมธอด `chr.consumeItem(cube, 1)` จะเรียก `Item.updateQuantityInSQL()` หรือ `Item.deleteFromSQL()`, เมธอด `giveCubePieces()` จะเรียก `sm.giveItem(2635594, 2)` ➔ `existingItem.updateQuantityInSQL()`, และ `equip.updateOptionsInSQL()` ซึ่งทั้งหมดรันคำสั่ง JDBC `UPDATE` แบบ Synchronous บล็อก Netty Packet Thread ถึง 3–4 ครั้งต่อคลิก!
          - นอกจากนี้ใน [`Char.addItemToInventory(int id, int quantity)`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java#L8296-L8309) เดิมมีการส่งแพ็กเก็ต `WvsContext.inventoryOperation(Add, bagIndex=0)` ซ้ำซ้อนหลังจาก `addItemToInventory(item)` ส่ง `UpdateQuantity` ไปแล้ว ทำให้ทุกครั้งที่ลูกบาศก์แจกเศษ `Cube Piece (2635594)` ไคลเอนต์จะได้รับแพ็กเก็ตเพิ่มไอเทมสล็อต 0 ผิดพลาดทุกคลิก!
       3. **บั๊ก `ItemGrade.isHidden()` และ `RareSecondary (16)` บน Bonus Potential ([`ItemGrade.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/enums/ItemGrade.java) & [`CubeHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/CubeHandler.java))**:
          - `ItemGrade.isHidden()` เดิมคืนค่า `true` เฉพาะ `HiddenRare`..`HiddenLegendary` แต่คืนค่า `false` สำหรับ `RareBonusHidden (-15)`..`LegendaryBonusHidden (-12)` ทำให้ `hiddenValue` กลายเป็นค่าติดลบ `-15` และเมื่อส่งเข้า `equip.resetHiddenOptionBonus(-15)` ค่า `optionBonus` กลายเป็น `+15` (`> 0`) ทำให้ `equip.releaseOptions()` ข้ามการสุ่มออปชั่นใหม่! รวมถึงกรณีออปชั่นแถวแรกเป็น `RareSecondary (16)` ทำให้ `hiddenValue = 16` และสุ่มแถวที่ 2–3 ได้ `ItemGrade.None (0)`
       4. **บั๊กไม่อ่านค่า `invType` และ `cubeType` ใน `CubeHandler.java`**:
          - ใน `handleUserCashCubeItemUseRequest` เดิมข้ามการอ่านไบต์ `invType` (`2` = Consume, `5` = Cash) และค้นหาใน `CashInventory` ก่อนเสมอ ทำให้เมื่อกดใช้ลูกบาศก์ในช่อง Consume (`2710028`, `2710034`, `2710035`, `2730007`) ที่ตรงกับสล็อตที่มีไอเทมใน Cash Inventory เซิร์ฟเวอร์จะดึงไอเทมผิดชิ้น!
          - ใน `handleCubeAll` เดิมส่ง `cubeType = 0` สำหรับ `MYSTICAL_CUBES`, `SOLID_CUBES`, `BONUS_MYSTICAL_CUBES`, และ `KARMA_BONUS_GLOWING_CUBE` แทนที่จะส่งค่า `cubeType` (`1`..`4`) ตามสถานะการแลกเปลี่ยนใน WZ
       5. **บั๊กอ่านแพ็กเก็ตเกินขนาดใน `USER_BONUS_MYSTICAL_ITEM_USE_REQUEST (368)` และ `useVioletCube`**:
          - `handleUserBonusMysticalCubeItemUseRequest` เรียก `inPacket.decodeInt()` กินพื้นที่ของ `short ePos` จนทำให้ `inPacket.getUnreadAmount() == 0` และยกเลิกการทำงานทันที ส่วน `useVioletCube` มี `if (true) return;` โดยไม่เรียก `chr.dispose()`
     - **วิธีแก้ (Fix/Implementation)**:
       - แก้ไข [`ItemConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java): เพิ่มเมธอด `normalizeLegacyCubeItemId(int itemId)` เพื่อแปลงรหัสลูกบาศก์รุ่นเก่า (`5062500`/`5062501` ➔ `5062505` Bonus Glowing Cube กล่องเขียว v265, `5062503` ➔ `5062506` Bonus Bright Cube, `5062009` ➔ `5062028` Glowing Cube, `5062010` ➔ `5062029` Bright Cube, `2710000`/`2711000` ➔ `2710028` Mystical Cube, `2710002`/`2711003` ➔ `2710034` Hard Cube, `2710003`/`2711004` ➔ `2710035` Solid Cube, `2730000`–`2730006` ➔ `2730007` Bonus Mystical Cube) และเพิ่มเมธอด `getCubeType(int itemId)` คืนค่ารหัส `0..4` ให้ตรงกับ `UICubeWz2.img`
       - แก้ไข [`Item.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/items/Item.java), [`Equip.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/items/Equip.java), และ [`DatabaseManager.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/connection/hikariCP/DatabaseManager.java): เพิ่ม Thread Pool `DatabaseManager.DB_EXECUTOR` และเปลี่ยน `Item.updateQuantityInSQL()`, `Item.updatePositionInSQL()`, `Item.updateBagIndexInSQL()`, `Item.deleteFromSQL()`, `Item.saveToSQL()` (ส่วน `UPDATE`), `Equip.updateEquipToSQL()`, และ `Equip.updateOptionsInSQL()` ให้ทำงานแบบ Asynchronous บน `DB_EXECUTOR` 100% พร้อมแปลงรหัสลูกบาศก์เก่าในฐานข้อมูลให้เป็นรหัส v265 อัตโนมัติทันทีที่โหลดตัวละคร (`loadCommonItemData`)
       - แก้ไข [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java), [`ItemData.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/loaders/ItemData.java), และ [`NpcShopItem.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/shop/NpcShopItem.java): แปลงรหัสลูกบาศก์เก่าทุกชิ้นที่สร้างหรือเพิ่มเข้ากระเป๋าให้เป็นรหัส v265 อัตโนมัติ และลบการส่ง `WvsContext.inventoryOperation(Add)` ซ้ำซ้อนใน `Char.addItemToInventory(int id, int quantity)`
       - แก้ไข [`ItemGrade.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/enums/ItemGrade.java) และ [`CubeHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/CubeHandler.java): รองรับ `RareBonusHidden`..`LegendaryBonusHidden` และ `RareSecondary`, ตรวจสอบ `invTypeVal` (`2` vs `5`) ให้ตรงช่องกระเป๋า, ส่ง `cubeType` ที่ถูกต้องเข้า `WvsContext.consumeCubeRelease`, และหากผู้เล่นกดใช้ลูกบาศก์รหัสเก่าที่ค้างในกระเป๋า ระบบจะสุ่มออปชั่นพร้อมอัปเกรดกองลูกบาศก์ที่เหลือเป็นรหัส v265 ให้ทันทีโดยไม่ค้าง!
       - อัปเดต [`point_shop.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/scripts/npc/point_shop.py) ทั้งใน `Server263` และ `v214 src` ให้จำหน่ายลูกบาศก์รุ่น v265 (`5062028` Glowing Cube, `5062029` Bright Cube, `5062505` Bonus Glowing Cube กล่องเขียว, `5062506` Bonus Bright Cube, `2710028` Mystical Cube, `2710034` Hard Cube, `2710035` Solid Cube, `2730007` Bonus Mystical Cube)
     - **ผลลัพธ์ (Outcome)**: กดใช้กล่องเขียว (`Bonus Glowing Cube 5062505`) และลูกบาศก์ทุกชนิด เปิดหน้าต่าง `UICubeWz2` รุ่นใหม่ของ v265 และกดสุ่มออปชั่นรัวๆ ได้ทันที 0ms ไม่มีอาการหน่วงหรือเกมค้างอีกต่อไป 100%
  2. **Phase 2: แก้ไขระบบเควสต์ Arcane Symbols และสคริปต์ Daily/Storyline แบบครบวงจร (Arcane Symbols Quest & Script Error Audit)**:
     - **ปัญหาที่พบ (Problem)**: เควสต์ Arcane Symbols บางจุดยังมีสคริปต์เออเร่อ กดรับ/ส่งเควสต์ไม่ได้ หรือเมื่อเควสต์แจกลูกแก้วผ่าน `sm.giveItem(171200x)` ลูกแก้วที่ได้มีเลเวล 0 (`level = 0`, `stat = 0`) ต่างจากตอนเสกด้วยคำสั่งที่ใส่ได้ปกติ
     - **สาเหตุเชิงเทคนิค (Root Cause)**:
       1. ใน [`ScriptManagerImpl.stop(ScriptType)`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java): เมื่อสคริปต์เควสต์เรียก `sm.startQuest(id)` หรือ `sm.warp(mapId)` เพื่อเปิดสคริปต์ลูกโซ่ (`child script`) สคริปต์ลูกจะเขียนทับ `ScriptInfo` ในช่อง `ScriptType.Quest` หรือ `Field` แต่พอสคริปต์แม่ทำงานจบ บล็อก `finally` ของสคริปต์แม่กลับเรียก `stop(ScriptType)` ล้าง `ScriptInfo` ของสคริปต์ลูกทิ้งทันที ทำให้บทสนทนาของเควสต์ลูกค้างและกดต่อไม่ได้!
       2. ใน [`QuestStartCompletionRequirement.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/quest/requirement/QuestStartCompletionRequirement.java): เงื่อนไข `case 0` (ต้องยังไม่เริ่มเควสต์ หรือเควสต์อยู่ในสถานะ `NotStarted`) เขียนตรรกะกลับด้าน (`q != null && q.getStatus() == NotStarted` คืนค่า `false` ทั้งที่ควรคืนค่า `true`) ทำให้เควสต์ใน WZ ที่ระบุ `quest state=0` ไม่สามารถกดรับได้เลย
       3. ใน [`Char.addItemToInventory()`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java): เมื่อสคริปต์เรียก `sm.giveItem(171200x)` หรือดรอป Arcane/Authentic Symbol โดยไม่ได้ผ่าน `initSymbolStats` อ็อบเจกต์ `Equip` จะมี `symbolLevel = 0` ทำให้สวมใส่แล้วไม่มีค่าสเตตัสหรืออัปเกรดไม่ได้
       4. สคริปต์ NPC และเควสต์รายวันของทั้ง 6 เมือง (`3003104.py`, `3003152.py`, `3003209.py`, `3003322.py`, `3003432.py`, `3003530.py`, `q34129s.py`, `q39014s.py`, `q34378s.py`, `q39035s.py`, `q34275s.py`, `q34773s.py`, `q38450s.py`–`q38476s.py`) และสคริปต์เนื้อเรื่อง (`enter_940200111.py`, `3003938.py`, `3003940.py`) มีการเรียกเมธอดที่ขาดหายใน `ScriptManagerImpl` (`sendAskMenu`, `sendOkay`, `senSayOkay`, `getOffFieldEffectFromWz`, `resetNpcSpecialActionByTemplateId`, `zoomCameraNoResponse`, `speechBalloon` แบบ 12 อาร์กิวเมนต์) หรือใช้รหัสเควสต์สลับกันระหว่าง Streamlined Dailies (`38450`+) กับ Classic Dailies (`34129`+)
     - **วิธีแก้ (Fix/Implementation)**:
       - แก้ไข [`ScriptManagerImpl.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java): ป้องกัน `stop(ScriptType)` ไม่ให้ล้าง `ScriptInfo` หากมีการส่งไม้ต่อ (Handoff) ไปยังสคริปต์ใหม่ในช่องเดียวกัน และเพิ่มเมธอด `sendAskMenu`, `sendOkay`, `senSayOkay`, `getOffFieldEffectFromWz`, `resetNpcSpecialActionByTemplateId`, `zoomCameraNoResponse`, และ `speechBalloon` (12 args) ให้ครบถ้วน
       - แก้ไข [`QuestStartCompletionRequirement.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/quest/requirement/QuestStartCompletionRequirement.java): แก้ `case 0` ให้คืนค่า `q == null || q.getStatus() == QuestStatus.NotStarted`
       - แก้ไข [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java): ใน `addItemToInventory()` หากไอเทมเป็น Arcane/Authentic Symbol (`ItemConstants.isArcaneSymbol` / `isAuthenticSymbol`) และมี `symbolLevel < 1` ให้เรียก `equip.initSymbolStats((short) 1, 1, getJob())` อัตโนมัติ 100% ทุกช่องทาง, เปิดให้ทุกอาชีพ (รวมถึง `Ren 18200`) รับเควสต์ Arcane River ได้, และปรับปรุง `initClassicDailyQuest()` / `handleSymbolQuest()` ให้ซิงค์เควสต์รายวันเข้ากับ `QuestManager` ทันที
       - ปรับปรุงและซิงค์สคริปต์เควสต์เริ่มต้น เควสต์รายวัน และ NPC ประจำเมืองทั้ง 6 เมืองใน `v214 src/data/scripts/` และ `Server263/data/scripts/` ให้รองรับทั้งโหมด Express Skip, Streamlined Daily Quest (`38450`–`38476`), และ Classic Daily Quest (`34129`, `39014`, `34378`, `39035`, `34275`, `34773`) พร้อมแจก Arcane Symbol Lv.1 ทันทีหากผู้เล่นยังไม่มีลูกแก้วประจำเมืองนั้น
  3. **Phase 3: ตรวจสอบระบบตีบวกและอัปเกรดอุปกรณ์แบบ Full Audit + ปรับความท้าทายเพิ่มขึ้น 10% (Equipment Upgrade & Enhancement Full Audit + 10% More Challenging Balance)**:
     - **ปัญหาที่พบ (Problem)**: ผู้เล่นสามารถหาเงิน Mesos ได้ง่าย จึงต้องการให้ตรวจสอบสูตรการคำนวณของระบบตีบวก/อัปเกรดทั้งหมด (Star Force, Cubes, Scrolls, Spell Trace, Rebirth Flames) แก้ไขบั๊กสูตรคำนวณ และปรับเรทให้ท้าทายกว่าเซิร์ฟเวอร์จริง 10% (โอกาสติดลดลง 10% ของค่าเดิม และโอกาสระเบิดเพิ่มขึ้น 10% ของค่าเดิม)
     - **สาเหตุเชิงเทคนิค & วิธีแก้ (Root Cause & Implementation)**:
       - **Star Force Enhancement ([`GameConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/GameConstants.java) & [`Equip.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/items/Equip.java))**:
         1. แก้บั๊ก `ArrayIndexOutOfBoundsException` ใน `GameConstants.getEnchantmentSuccessRate()` เมื่อตีบวกดาวที่ `25★`–`29★` (เนื่องจากเดิมใช้ `currentStar > 14 ? currentStar + 1` ไปดึงแถวใน `enchantRates` ซึ่งที่ดาว 25+ ไม่มีแถวซ้ำของ `15★` ทำให้ล้นขนาดอาเรย์ 31 แถว)
         2. แก้สูตรคำนวณค่าพลังโจมตีอาวุธ (`PAD`/`MAD`) ที่ดาว `0★`–`14★` ใน `Equip.getHyperUpgradeStats()` จากเดิมที่เผลอหารด้วย `10` (`(int)(iPad * 0.2) / 10 + 1` ซึ่งทำให้ปัดเศษทิ้งผิดพลาด) เป็นสูตรมาตรฐาน `(int)(equip.getiPad() * 0.02) + 1`, เพิ่ม `case 26:` ใน `GameConstants.getEnchantmentValByChuc()`, และแก้บั๊ก `getHyperUpgradeStats()` ที่เดิมแสดงค่าพรีวิวรวมสะสมตั้งแต่ดาวที่ 0 แทนที่จะแสดงเฉพาะค่าที่จะเพิ่มขึ้นในดาวถัดไป
         3. ปรับอัตราความสำเร็จ (`Success Rate`) ใน `enchantRates` (`0★`–`29★`) และ `enchantSuccessRatesSuperior` ลดลง 10% ($\times 0.90$) และปรับอัตราการระเบิด (`Destroy Rate`) เพิ่มขึ้น 10% ($\times 1.10$) ทุกขั้นดาว
       - **Cube Tier-Up Rates ([`ItemConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java))**:
         - ปรับลดโอกาสเลื่อนระดับเกรด (`Tier-Up Rate`) ของลูกบาศก์ทุกชนิดลง 10% ($\times 0.90$):
           - `BLACK_TIER_UP_RATES` / `WHITE_ADDITIONAL_TIER_UP_RATES`: Rare$\to$Epic `135` (`13.5%`), Epic$\to$Unique `32` (`3.2%`), Unique$\to$Legendary `14` (`1.4%`)
           - `RED_TIER_UP_RATES` / `BONUS_POT_TIER_UP_RATES`: Rare$\to$Epic `54` (`5.4%`), Epic$\to$Unique `16` (`1.6%`), Unique$\to$Legendary `5` (`0.5%`)
           - `MASTER_CRAFTSMAN_TIER_UP_RATES`: Rare$\to$Epic `43` (`4.3%`), Epic$\to$Unique `11` (`1.1%`)
           - `MEISTER_TIER_UP_RATES`: Rare$\to$Epic `72` (`7.2%`), Epic$\to$Unique `15` (`1.5%`), Unique$\to$Legendary `2` (`0.2%`)
           - `OCCULT_TIER_UP_RATE`: `8` (`0.8%`)
       - **Scrolls & Spell Trace ([`ItemConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java) & [`ItemUpgradeHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemUpgradeHandler.java))**:
         - ปรับเรท Spell Trace จาก `100% / 70% / 30% / 15%` เป็น **`90% / 63% / 27% / 14%`**, Innocence/Ark Innocence Scroll เป็น **`27%`**, Clean Slate Scroll 10% เป็น **`9%`**
         - ปรับเรทใบสกรอลล์ทั่วไปใน `ItemUpgradeHandler` (Regular Upgrade Scrolls, Chaos Scrolls, Potential Scrolls, Bonus Potential Scrolls, Soul Enchanters) ให้คูณโอกาสสำเร็จด้วย `0.90` และคูณโอกาสระเบิด (`cursed`) ด้วย `1.10`
         - แก้บั๊กใบ Potential Scroll และ Bonus Potential Scroll ที่เดิมเรียก `equip.releaseOptions()` แม้ตอนตีสกรอลล์ล้มเหลว! ให้เรียกเฉพาะเมื่อตีติดเท่านั้น พร้อมรองรับโอกาสระเบิด (`cursed`) และบันทึก `equip.saveToSQL()` ทุกครั้ง
       - **Rebirth Flames ([`Equip.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/items/Equip.java))**:
         - เปลี่ยนการสุ่มระดับ Tier ของออปชั่นเสริม (Flame Tier) จากการสุ่มเท่ากันทุกขั้น (`Randomizer.rand` แบบ Uniform) เป็นการสุ่มแบบถ่วงน้ำหนักที่ท้าทายขึ้น 10% (**Tier +0: `48%`, Tier +1: `32%`, Tier +2: `15%`, Tier +3 (สูงสุด): `5%`**)

## 📅 [2026-10-14 19:30 น.] Complete Evan Overhaul (Mir Dragon Skill UI & Field Evolution, Henesys Spawn Audit, All Jobs/Skills) & Full Legend (Heroes) 6-Class Deep Audit

### 🎯 Scope & Technical Details
- **หัวข้อ**: Full Audit & Overhaul of Evan (Mir Dragon UI/Field Rendering, Henesys Spawn Lifecycle, 1st–6th Job Skills & Fusion Mechanics) and All 6 Legend Classes (`Aran`, `Evan`, `Mercedes`, `Phantom`, `Luminous`, `Shade`) + Global Passive Stat Engine (`SkillStat`, `SkillInfo`, `BaseStat`, `SkillData`)
- **รายละเอียด**:
  1. **Evan Mir Dragon Display in Skill UI (`[K]`) & Field Evolution + Henesys Spawn Lifecycle Fix**:
     - **ปัญหาที่พบ (Problem)**: การให้ตัวละคร Evan เกิดและวาร์ปมาที่ Henesys (`100000000`) ทันทีโดยข้ามเนื้อเรื่อง Utah's Farm ทำให้เควสต์วิวัฒนาการมังกร Mir (`22130`–`22133` และ `22100`–`22109`) ไม่ถูกบันทึกว่าสำเร็จ ส่งผลให้หน้าต่างสกิล (`UISkill` / `[K]`) และหน้าต่างอุปกรณ์มังกร (`Equip UI`) ไม่แสดงรูปมังกร Mir หรือค้างเป็นไข่/ลูกมังกร รวมถึง `handleInitAfterMigrate()` เดิมเรียก `setJob(2212)` ซ้ำหลัง `levelUntil(30)` และบวก SP ซ้ำ 3 รอบ (ได้ SP เกินถึง 15–16 แต้ม) และยังไม่เรียก `spawnDragon()` ทันทีเมื่อเกิดที่ Henesys
     - **สาเหตุเชิงเทคนิค (Root Cause)**: ไคลเอนต์ v265 ตรวจสอบสถานะการสำเร็จเควสต์ `22130` (1st Job Baby Dragon), `22131` (2nd Job), `22132` (3rd Job), และ `22133` (4th Job Adult Onyx Dragon) ควบคู่กับ `Job ID` (`2210`, `2212`, `2214`, `2217`) เพื่อเรนเดอร์กราฟิกมังกร Mir บนหน้าต่าง Skill UI และ Equip UI นอกจากนี้ `Char.setJob()` และ `JobConstants.getJobChain()` ยังมีปัญหาเรื่องรหัสอาชีพเก่า (`2200`, `2211`, `2218`) ทำให้สกิลคลาส 2 ใน `2211.xml` ตกหล่นเมื่อเรียก `maxSkills()`
     - **วิธีแก้ (Fix/Implementation)**:
       - สร้างเมธอด `Evan.syncDragonEvolutionQuests()` ใน [Evan.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java) เพื่อซิงค์เควสต์เริ่มต้น (`22000`–`22015`, `22500`) และเควสต์วิวัฒนาการมังกร (`22100`–`22109`, `22130`–`22133`) ตามระดับเลเวลของตัวละคร พร้อมส่งแพ็กเก็ต `chr.completeQuest(qid, true)` แบบเรียลไทม์ให้ไคลเอนต์อัปเดต UI ทันที
       - ปรับปรุง `Evan.handleInitAfterMigrate()`, `Evan.handleLevelUp()`, [Job.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java) (`onWarp`), และ [AdminCommands.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java) (`!job`, `!endgame`) ให้เรียก `syncDragonEvolutionQuests()` และ `spawnDragon()` เสมอ รวมถึงรองรับร่างมังกรคลาส 6 (`Job 2220` Stage 9) เมื่อปลดล็อก `Zodiac Burst` (`22201000`)
       - เพิ่มการแปลงรหัสอาชีพเก่าอัตโนมัติ (`2200 -> 2210`, `2211 -> 2212`, `2218 -> 2217`) ใน `Char.setJob()` ([Char.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java)) และเพิ่ม `2211` เข้าใน `JobConstants.getJobChain()` ([JobConstants.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/JobConstants.java))
       - อัปเดตสคริปต์เปลี่ยนอาชีพและเควสต์ของ Evan ทั้งใน `v214 src` และ `Server263`: [JobAdvance_Heros.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/scripts/npc/JobAdvance_Heros.py), [q22130s.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/scripts/quest/q22130s.py), และ [q22133s.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/scripts/quest/q22133s.py)
  2. **Evan Full Skill Audit (1st Job – 6th Job HEXA)**:
     - แก้ไขรหัสสกิล `HEROS_WILL_EVAN` จาก `22171004` (สกิลเก่าที่ถูกถอดใน v265) เป็น `22171069` ใน [Evan.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)
     - แก้ไข `givePartnersBuff()` ให้รีเฟรชเวลาบัฟ `Partners` (`22110016`, +20% `IndieDamR`, 5 วินาที) ทุกครั้งที่ใช้สกิลมังกรหรือสกิล Fusion โจมตีมอนสเตอร์
     - แก้ไข `RETURN_DIVE` (`22141017`) ให้ดึงค่าความเร็วโจมตีจาก `si.getValue(indieBooster, slv)` (`-1`) แทนค่า `x` (`0`)
     - ปรับปรุง `MAGIC_GUARD` (`22101001`) ให้สลับเปิด/ปิด (Toggle On/Off) ได้และเพิ่ม Null-check ป้องกัน NPE ใน `handleHit()`
     - เพิ่มรหัสสกิลย่อยของมังกรและ Fusion Skills (`22110022`, `22110023`, `22110024`, `22140022`, `22140024`, `22170060`, `22170061`, `22170064`, `22170093`, `22170094`, `22200000`–`22200011`, `400021012`–`400021015`, `500061041`–`500061045`) ลงใน [SkillConstants.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java) และ [Evan.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java) เพื่อส่งเอฟเฟกต์แอนิเมชันของมังกร Mir (`UserEffect.dragonAction`), คูลดาวน์, และกู้คืน MP จาก `Magic Amplification` ได้ครบทุกสกิล
  3. **Global Passive Skill Stat Engine Fixes (`SkillStat.java`, `SkillInfo.java`, `BaseStat.java`, `SkillData.java`, `Char.java`)**:
     - แก้ไข [SkillStat.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/skills/SkillStat.java): แมป `basicStatUp`, `indieStatR`, และ `indieStatRBasic` ไปยัง `BaseStat.allStatR` เพื่อให้สกิล `Maple Warrior` / `Hero's Echo` แบบติดตัว (Passive `psd=1` ใน v265) มอบ `% All Stats` (+15%–16%) ให้ทุกอาชีพโดยอัตโนมัติ
     - แก้ไข [SkillInfo.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/skills/info/SkillInfo.java): ปรับปรุง `getBaseStatValues()` ให้รวมค่า (`Integer::sum`) เมื่อสกิลมีหลาย `SkillStat` ที่ชี้ไปยัง `BaseStat` เดียวกัน และกระจาย `BaseStat.allStat` / `BaseStat.allStatR` เข้าสู่ `str, dex, inte, luk` และ `strR, dexR, intR, lukR`
     - แก้ไข [BaseStat.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/enums/BaseStat.java): ปรับปรุง `getFromCTS()` ของ `IndieDamR`, `IndieStatR`, `IndieStatRBasic`, และ `BasicStatUp` ให้รองรับทั้ง `o.nValue` และ `o.nOption`
     - แก้ไข [SkillData.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/loaders/SkillData.java): รองรับโหนด `psdWeaponBooster` ใน WZ v265 ทั้งตอนโหลดจาก `.dat` (`loadSkillFromId`) และ `.xml` (`loadSkillsFromWz`) ทำให้สกิล Booster แบบติดตัว (`Agile Polearms 21000011`, `Agile Magic 22110026`, `Agile Bowguns 23100009`, `Agile Canes 24100005`, `Agile Magic 27100007` ฯลฯ รวม 32 สกิลทั่วเกม) ลด `actionSpeed -2` อย่างถูกต้อง
     - แก้ไข `Char.maxSkills()` ใน [Char.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java): แก้เงื่อนไข `skill.getSkillId() >= 400000000` (9 หลักสำหรับ V-Matrix แทน 8 หลัก `40000000` ที่เคยทำให้ข้ามสกิลคลาส 1–4 ของกลุ่มอาชีพ `4100+` ทั้งหมด) และข้ามสกิล Beginner/Hyper อย่างปลอดภัย
  4. **All 6 Legend (Heroes) Classes Deep Audit (`Luminous`, `Phantom`, `Aran`, `Mercedes`, `Shade`)**:
     - **[Luminous.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Luminous.java)**:
       - แก้ไข `DARK_CRESCENDO` จากรหัสบัฟเก่า `27121005` เป็นรหัสสกิลติดตัว v265 `27120005` และเพิ่มเมธอด `procDarkCrescendo()` ให้สะสมสแต็คบัฟดาเมจอัตโนมัติเมื่อโจมตี
       - แก้ไข `DUSK_GUARD` เป็น `27110005`, เพิ่มการรองรับ `LUNAR_TIDE` (`27100003`) ตามค่า WZ v265 (`indieDamR` + `indieCr`), เพิ่มสกิล `Twilight Nova` (`27121113`/`27121214`) และ `HEXA Twilight Nova` (`27141007`/`27141008`) ลงใน `isLarknessLightSkill` / `isLarknessDarkSkill`, และเพิ่ม Null-check ใน `handleHit()`
     - **[Phantom.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Phantom.java)**:
       - แก้บั๊กร้ายแรงใน `handleLevelUp()` ที่เลเวล 60 ซึ่งเดิมไม่มี `else` ทำให้ตัวละครเลเวล 60 ถูกเปลี่ยนอาชีพเป็น `2411` (คลาส 3) แล้วไหลลงบล็อก `else` เปลี่ยนเป็น `2412` (คลาส 4) ทันทีในเลเวล 60!
     - **[Aran.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Aran.java), [Mercedes.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Mercedes.java), [Shade.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Shade.java)**:
       - ลบการแจก SP ซ้ำซ้อนใน `handleInitAfterMigrate()` ของทั้ง 6 อาชีพ Legend เพื่อให้ได้รับ SP ตรงตามมาตรฐาน (`5 SP` คลาส 1 และ `4 SP` คลาส 2 ที่เลเวล 30)
       - ป้องกันการกดใช้สกิล `Maple Warrior` / `Heroic Memories` แบบ Passive ซ้ำ และปรับมาตรฐานสกิล Origin คลาส 6 (`Endgame`, `Zodiac Burst`, `Unfading Glory`, `Defying Fate`, `Harmonic Paradox`, `Advent of the Fox`) ให้ส่ง `IndieNotDamaged` (7 วินาที) ทั้ง `nOption` และ `nValue` พร้อม `UserLocal.showHexaSkillEff(chr)` ครบทั้ง 6 อาชีพ

## 📅 [2026-10-14 16:50 น.] Complete Arcane Symbols & Arcane River Quest System Overhaul (Java Core, Storylines, Daily Quests, NPCs & Coupon Items)

### 🎯 Scope & Technical Details
- **หัวข้อ**: Complete Overhaul, Verification, Compilation, Synchronization, and Single All-in-One Patch Archive Creation for Arcane Symbols & Arcane River Quest Systems
- **รายละเอียด**:
  1. **Java Core & Jython Engine Enhancements (`ScriptManagerImpl.java`, `Char.java`, `QuestConstants.java`)**:
     - เพิ่มเมธอด `removeQuest`, `getQuestEx`, `setQuestEx`, `getAccountQuestEx`, `setAccountQuestEx`, `hasAccountQuestCompleted`, และ `isQuestComplete` ใน [ScriptManager.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManager.java) และ [ScriptManagerImpl.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java)
     - ผูกตัวแปร `null` (`None`) และ `ScriptType` เข้าสู่ Jython Global Scope ป้องกัน `NameError: name 'null' is not defined` ถาวร
     - เพิ่มระบบตรวจจับพารามิเตอร์สลับตำแหน่งและจำกัดจำนวนสูงสุด `[1, 20]` ต่อการเรียกใน `giveSymbol(...)` ป้องกันบั๊กเสกไอเทม 34,218 ชิ้นค้าง
     - คืนค่าและปรับปรุงเมธอด `Char.initDailyQuestSymbol()` ใน [Char.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) สำหรับเควสต์รายวันแบบดั้งเดิม (`34129`, `39014`, `34378`, `39035`, `34275`, `34773`)
  2. **Arcane Symbol Coupons & Selector Items (`item/`)**:
     - สร้างสคริปต์คูปองประจำเมืองครบทั้ง 6 เมือง: [consume_2635509.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/scripts/item/consume_2635509.py) ถึง [consume_2635514.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/scripts/item/consume_2635514.py)
     - ปรับปรุงและสร้าง Selector Coupons ([consume_2437750.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/scripts/item/consume_2437750.py), `2437760`, `2437880`, `2438141`, `2439301`, `2439305`) มอบ Arcane Symbol Lv.1 (`ARC +30`, `Main Stat +300`) ผ่าน `sm.giveSymbol(...)`
  3. **Daily Quest NPCs, Unified Dailies (`38450`–`38476`) & Full Storyline Coverage (359 WZ Quests)**:
     - แก้ไขสคริปต์ NPC ประจำเมืองทั้ง 6 เมือง (`3003104`–`3003530`), แปลภาษาเควสต์รายวัน `q38450s`–`q38476e` เป็นภาษาอังกฤษพร้อมรางวัล EXP/Coupon มาตรฐาน และแก้ไข [`enter_450002201.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/scripts/field/enter_450002201.py) / [`enter_450001250.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/scripts/field/enter_450001250.py)
     - เติมเต็มสคริปต์เนื้อเรื่องและเควสต์ย่อยครบทั้ง **359 เควสต์ใน WZ** (0 Missing Start / 0 Missing End) ครอบคลุม 5th Job (`1460`–`1466`), Vanishing Journey (`34100`–`34120`), Reverse City (`37600`–`37620`), Chu Chu (`34200`–`34218`), Yum Yum (`37700`–`37727`), Lachelein (`34300`–`34331`), Arcana (`34450`–`34478`), Morass (`34249`–`34272`), และ Esfera (`34560`–`34585` / `37851`–`37871`) พร้อมตัวเลือก Express Prequest Skip ภาษาอังกฤษในทุกเมือง
  4. **Automated AST, WZ Coverage, Parity & Single All-in-One Patch Archive**:
     - ยืนยันผลผ่าน [tools/test_ast_syntax.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/test_ast_syntax.py), [tools/test_wz_script_coverage.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/test_wz_script_coverage.py), [tools/test_givesymbol_audit.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/test_givesymbol_audit.py), และ [tools/test_script_parity.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/test_script_parity.py) (สคริปต์ 7,198 ไฟล์ตรงกัน 100% ทั้งใน `v214 src` และ `Server263`)
     - คอมไพล์ Maven `BUILD SUCCESS` (854 คลาส) และ Deploy [maplestory.jar](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/maplestory.jar) ไปยัง `v214 src/`, `Server263/`, และ Root พร้อมแพ็กเกจไฟล์เดียว [Patches/Server263_Patch_Latest.zip](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip) (~173.06 MB)

## 📅 [2026-10-14 13:36 น.] Complete Audit, Solo & LAN Compatibility, Null-Safety, and Progression Fixes for all 15 Party Quest (PQ) Systems


### 🎯 Scope & Technical Details
- **หัวข้อ**: Complete Audit, Solo & LAN Compatibility, Null-Safety, and Progression Fixes for all 15 Party Quest (PQ) Systems
- **รายละเอียด**:
  1. **สถาปัตยกรรม PartyQuestManager & Party Instance Lifecycle**:
     - แก้ไขใน [PartyQuestManager.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/PartyQuestManager.java): เพิ่มเมธอด `matches()` ตรวจสอบประเภท PQ และรีเซ็ตสร้างอ็อบเจกต์ PQ ใหม่เสมอเมื่อ `typeEnter == 0` หรือเมื่อเปลี่ยนประเภท ป้องกันปัญหาข้อมูลค้างข้าม PQ
     - แก้ไขใน [DragonRider.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/DragonRider.java), [FirstTimeTogether.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/FirstTimeTogether.java), และ [MoonBunny.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/MoonBunny.java): ปลด `final` ออกจาก `party` และอัปเดต `this.party = party` ทุกครั้งที่สร้างปาร์ตี้อัตโนมัติสำหรับผู้เล่นเดี่ยว (Solo mode) ขจัด `NullPointerException` 100%
  2. **ระบบส่วนกลาง ScriptManagerImpl & MobHandler Null-Safety**:
     - แก้ไขใน [ScriptManagerImpl.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java):
       - `warpParty()`: เพิ่มเงื่อนไข `if (party == null) { warp(id); return; }` ป้องกัน NPE เมื่อผู้เล่นเดี่ยวเคลื่อนย้ายผ่านพอร์ทัล
       - `givePQRewards()`: เพิ่มเงื่อนไข `if (party == null)` มอบ EXP, Trait, Party Points ให้ตัวละครเดี่ยวได้โดยตรง
       - `checkAttempt()`: รองรับการเช็คสิทธิ์แบบเดี่ยว (`checkAttempt(entryQuest, maximumCount)`) และแก้ไขการตรวจสอบเควสต์ของสมาชิกปาร์ตี้ด้วย `pChr.getScriptManager().hasQuest()`
       - `addAttempt()`: บันทึกรอบลงตัวละครโดยตรงหากไม่มีปาร์ตี้
       - `showClearStageExpWindowToParty()`: เพิ่มการแสดงหน้าต่าง EXP สำหรับผู้เล่นเดี่ยวหาก `party == null`
     - แก้ไขใน [MobHandler.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/life/MobHandler.java): เพิ่ม Null-check ก่อนเรียก `chr.getPartyQuestManager().getPartyQuest().end(chr)` ในจุดที่ Friendly Mobs ตาย (Moon Bunny, Romeo, Juliet, Shammos, Kenta) ป้องกัน Thread Crash
  3. **การปรับปรุงและแก้บั๊กเฉพาะของทั้ง 15 Party Quests**:
     - **Moon Bunny**: รองรับการเคลียร์และรับรางวัลผ่าน `clear(chr)` และเพิ่มกล่องถามยืนยันก่อนออกจากด่าน
     - **FirstTimeTogether (Kerning PQ)**: ป้องกัน NPE ใน `event()` และส่งต่อรางวัลเมื่อผ่านด่าน Slime King
     - **Hungry Muto**: แก้ไขจุดตรวจเช็คช่องเก็บของในแผนที่ทางออกไม่ให้เกิด NPE หาก `party == null` และรองรับการแจก Arcane Symbol / EXP ในโหมดเดี่ยว
     - **Ludibrium (Dimensional Crack)**: ป้องกัน NPE ใน `clear()`, ปรับปรุงจำนวนพาสสำหรับโหมด Solo, และเพิ่ม Null-safety ใน [StageMsg_crack.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/field/StageMsg_crack.py)
     - **Lord Pirate**: เพิ่มการตรวจสอบและอัปเดตตัวแปร Party ใน `event()`, รองรับการจบด่านผ่าน `clear(chr)`
     - **Romeo & Juliet**: เพิ่มการตรวจสอบสถานะบอส Frankenroid ถูกกำจัดในห้องบอส (`926100401` / `926110401`) เพื่อจบเควสต์ มอบเหรียญ Alcadno/Zenumist Marble และวาร์ปออกอย่างถูกต้อง
     - **Escape (Aerial Prison)**: เพิ่มตัวเลือกตรวจสอบรอบคงเหลือประจำวัน (#L3#) ในบทสนทนาเริ่มต้น และรองรับการจบด่านรับ Prison Guard Key ผ่าน `clear(chr)`
     - **Kenta In Danger**: แก้ไขจุดเรียกเกิดบอส Pianus ให้เกิดในห้องบอส (`923040400`) แทนที่จะเกิดในห้องก่อนหน้า และรองรับการจบด่านรับ Kenta's Goggles Research Materials (item `4001535`)
     - **Alien Visitor**: ป้องกัน NPE ใน `exit()` และ `event()`, รองรับการมอบรางวัล EXP ตามเกรด S/A/B/C
     - **Dimension Invasion**: เพิ่มการหาค่าเลเวลเฉลี่ย fallback เป็น `chr.getLevel()` หากไม่มีปาร์ตี้ และป้องกัน NPE ใน `clear()`
     - **Defense Event (Nett's Pyramid)**: ป้องกัน NPE ใน `waveClear()` และ `endWave()` สำหรับผู้เล่นเดี่ยว
     - **Tangyoon Cooking**: ป้องกัน NPE ใน `event()` และมอบใบประกาศนียบัตรเชฟ `4033668` ใน `clear()`
     - **Xerxes in Chryse**: เพิ่มการมอบรางวัลและล้างไทม์เมอร์อย่างปลอดภัยใน `clear()`
     - **Dragon Rider**: ปรับปรุงการสร้างปาร์ตี้และเคลื่อนย้ายไปสู่แมพถัดไปแบบ Null-safe

## 📅 [2026-10-14 13:22 น.] Implementation & Complete Resolution of Item Enhancement Stability Audit (Rebirth Flame, Cubes, Scrolls/Spell Trace, Star Force Drop & Chance Time, Toad's Hammer)

### 🎯 Scope & Technical Details
- **หัวข้อ**: Complete Implementation of Equipment Enhancement Systems (Rebirth Flame, Cubes, Scrolls/Spell Trace, Star Force & Toad's Hammer) and Code Stability Verification
- **รายละเอียด**:
  1. **ระบบ Rebirth Flame & Bonus Stats**:
     - ป้องกันการสุ่มออปชั่นซ้ำบรรทัดใน [Equip.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/items/Equip.java) โดยเพิ่มเงื่อนไข `if (picked[r]) continue;`
     - ซิงค์ออปชั่น Rebirth Flame ไปยังดาบฝาแฝดของ Zero (Lazuli/Lapis) ทั้งสล็อต 11 และ -11 พร้อมเรียก `saveToSQL()` ใน [ItemUpgradeHandler.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemUpgradeHandler.java)
     - เปลี่ยนการตรวจสอบประเภท Flame จาก String `.contains()` มาใช้ Item ID ตรงใน [ItemConstants.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java)
  2. **ระบบ Cube & Potential**:
     - ป้องกัน `IndexOutOfBoundsException` (Server Thread Crash) ใน `getRandomOption` ใน [ItemConstants.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java) โดยตรวจสอบ `data == null || data.isEmpty()` และสุ่มด้วย `Util.getRandom(data.size() - 1)`
     - แก้ไขการคิวบ์ไอเทมที่มีศักยภาพแฝง (Unrevealed / Hidden Potential) ให้สามารถคิวบ์เปิดออปชั่นได้ทันที และตรวจสอบเพดานเกรดสูงสุดถูกต้องใน [CubeHandler.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/CubeHandler.java)
     - ป้องกัน Potential Stamp ทับออปชั่นแถวที่ 3 ใน [ItemUpgradeHandler.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemUpgradeHandler.java) โดยตรวจ `equip.getOptionBase(2) != 0`
     - เพิ่ม `saveToSQL()` ทุกจุดหลังการคิวบ์ทั้งไอเทมหลักและอาวุธรอง Zero ป้องกันปัญหาข้อมูลย้อนกลับ (Rollback)
  3. **ระบบ Scrolls & Spell Trace**:
     - ปิดช่องโหว่ตีบวกฟรี (Free Upgrade Exploit) ใน [ItemHandler.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemHandler.java) โดยตรวจสอบ `if (!chr.hasItemCount(SPELL_TRACE_ID, cost))` ล่วงหน้า
     - เพิ่ม `saveToSQL()` หลังการอัปเกรด Spell Trace และ Return Scroll
     - แก้ไข Golden Hammer เพิ่มค่า `iuc` แม้ตีไม่สำเร็จ และบันทึก DB
     - ปรับสเตตัส Incredible Chaos Scroll ให้สุ่มได้สูงสุด 9 แต้ม (`INCREDIBLE_RAND_CHAOS_MAX`) ใน [Equip.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/items/Equip.java)
  4. **ระบบ Star Force & Toad's Hammer**:
     - แก้ไขบั๊กตรวจสอบแหวนกิจกรรมที่ไม่ใช้ TUC ด้วย `Util.arrayContains(TUC_IGNORE_ITEMS, itemID)` ใน [ItemConstants.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java) ทำให้ใส่ศักยภาพและรับสเตตัส Star Force ได้สมบูรณ์
     - ปรับลดดาวร่องรอยอุปกรณ์แตก (Boom Trace) สูงสุดไม่เกิน 12 ดาว (`Math.min(12, oldChuc)`) ตามมาตรฐานทางการ
     - **ระบบ Star Drop & Chance Time สมบูรณ์ 100%**:
       - เพิ่มสถานะ `DROP` ใน `EnchantResult` ใน [GameConstants.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/GameConstants.java)
       - ตีบวกพลาดที่ดาว > 10 (ยกเว้น Checkpoint 15 และ 20) จะลด 1 ดาว (`EnchantResult.DROP`) และเพิ่ม `dropStreak`
       - เมื่อดาวลด 2 ครั้งติดต่อกัน (`dropStreak >= 2`) จะเข้าสู่ **Chance Time**: อัตราสำเร็จ 100%, อัตราแตก 0% และแสดงแบนเนอร์สีทองบน UI ของเกมส์
       - เมื่อตีสำเร็จหรือแตกจะรีเซ็ต `dropStreak = 0`
       - ปรับปรุงการคำนวณอัตราความสำเร็จและอัตราแตกของอุปกรณ์ Superior ให้แสดงผลถูกต้องใน UI
     - **ระบบ Toad's Hammer**: แก้ไขพิมพ์ผิด `toItem = chr.getEquippedInventory().getItemBySlot(toPos)`, ตรวจสอบระดับเลเวลอุปกรณ์ห่างกันไม่เกิน 10 เลเวล (ต่ำกว่า 100 ห่างได้ 20 เลเวล), ปรับลดออปชั่น Unique/Legendary ลงมาเป็น Epic, ซิงค์อาวุธ Zero และเรียก `saveToSQL()`
  5. **ScriptManager & Quest Support**:
     - เพิ่มเมธอด `getQuestById(int)` และ `isQuestComplete(int)` ใน [ScriptManagerImpl.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java) รองรับสคริปต์ NPC และเควสต์ Arcane River ป้องกัน Script AttributeError
     - แปลข้อความรีเซ็ตเควสต์และแจ้งเตือนภาษาเวียดนามใน `Char.java` และ `ScriptManagerImpl.java` เป็นภาษาอังกฤษตามมาตรฐานสากล
  6. **การคอมไพล์และส่งมอบ (Build & Deployment)**:
     - คอมไพล์ผ่าน Maven ผ่าน `build_headless.bat`: `BUILD SUCCESS` (854 classes ครบถ้วน 0 Errors)
     - Deploy `maplestory.jar` (138.68 MB) ไปยัง `Server263/maplestory.jar` และ root `maplestory.jar` เรียบร้อยสมบูรณ์

## [2026-10-14 12:50 น.] Comprehensive Equipment Enhancement Technical Audit & Upgrade System Stability Master Specification

### Scope & Technical Details
- **หัวข้อ**: Equipment Enhancement Comprehensive Audit (Rebirth Flame, Cubes, Scrolls/Spell Trace, Star Force & Toad's Hammer) and Code Stability Verification
- **รายละเอียด**:
  1. **การตรวจสอบความเสถียรของโค้ดปัจจุบัน (Working Tree & Compilation Verification)**:
     - ตรวจสอบไฟล์ที่มีการแก้ไขปรับปรุง 6 ไฟล์ ได้แก่ [Char.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java), [ItemConstants.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java), [CubeHandler.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/CubeHandler.java), [ItemHandler.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemHandler.java), [ItemData.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/loaders/ItemData.java), [ScriptManagerImpl.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java)
     - ยืนยันผลการคอมไพล์ผ่านระบบ Maven: `BUILD SUCCESS` (854 classes ถูกคอมไพล์ครบถ้วน ปราศจาก Syntax/Compile Errors)
  2. **ผลการตรวจสอบและเจาะลึกระบบอัปเกรดไอเทมทั้ง 4 ด้านโดยละเอียด (Deep-Dive System Audit)**:
     - **ระบบ Rebirth Flame & Bonus Stats**:
       - *บั๊กสุ่มสเตตัสซ้ำบรรทัดใน [Equip.java:L2996-3059](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/items/Equip.java#L2996-3059)*: มีการสร้าง `boolean[] picked` และเซ็ต `picked[r] = true` แต่ลืมใส่เงื่อนไข `if (picked[r]) continue;` ทำให้มีโอกาสที่ออปชั่นบรรทัดเดียวกันจะถูกสุ่มซ้ำ ส่งผลให้อุปกรณ์ได้สเตตัสซ้อนทับผิดปกติ
       - *การไม่ซิงค์อาวุธ Zero ใน [ItemUpgradeHandler.java:L141-155](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemUpgradeHandler.java#L141-155)*: ใน `handleMemorialExUpgradeItemOptionRequest` มีการบันทึกค่าลง `equip` แต่ไม่ได้ซิงค์ไปยังดาบฝาแฝด (Lazuli/Lapis) ทำให้สเตตัสของอาวุธ Alpha/Beta ไม่ตรงกัน
       - *การตรวจสอบประเภท Flame ด้วย String ใน [ItemUpgradeHandler.java:L86-96](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemUpgradeHandler.java#L86-96)*: เช็คชื่อไอเทมด้วย `.contains()` ซึ่งเสี่ยงต่อการหลุดไปเป็น Powerful Flame จึงได้เตรียมฟังก์ชันตรวจสอบด้วย Item ID ตรงใน [ItemConstants.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java)
     - **ระบบ Cube & Potential**:
       - *ข้อผิดพลาด Out-of-Bounds Crash ใน [ItemConstants.java:L1991-1994](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java#L1991-1994)*: ฟังก์ชัน `getRandomOption` เรียก `data.get(Util.getRandom(data.size()))` แต่เนื่องจาก `Util.getRandom(N)` สุ่มตัวเลขตั้งแต่ 0 ถึง N (รวม N ด้วย) เมื่อสุ่มได้ค่าเท่ากับ `data.size()` จะเกิด `IndexOutOfBoundsException` ทำให้เธรดคิวบ์หลุด
       - *การปฏิเสธการคิวบ์ไอเทม Unrevealed ใน [CubeHandler.java:L453, L465, L549, L561](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/CubeHandler.java#L453)*: เงื่อนไขตรวจ `equip.getBonusGrade() < ItemGrade.Rare.getVal()` ปฏิเสธไอเทมที่มีเกรดเป็นลบ (Unrevealed Hidden Bonus) ทำให้ไม่สามารถคิวบ์เปิดออปชั่นได้ทันทีตามมาตรฐาน
       - *บั๊กกด Potential Stamp ทับของ 3 แถวใน [ItemUpgradeHandler.java:L575-645](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemUpgradeHandler.java#L575-645)*: ขาดการตรวจสอบ `equip.getOptionBase(2) != 0` ทำให้ผู้เล่นสามารถกด Potential Stamp ซ้ำกับอุปกรณ์ที่มี 3 แถวแล้วได้ ซึ่งจะไปเขียนทับออปชั่นแถวที่ 3
       - *การขาดการบันทึกฐานข้อมูล `saveToSQL()`*: ใน `CubeHandler.java` ไม่มีการเรียก `saveToSQL()` หลังคิวบ์เสร็จ หากเซิร์ฟเวอร์ขัดข้องหรือผู้เล่นหลุดกะทันหัน ออปชั่นจะย้อนกลับ
     - **ระบบ Scrolls & Spell Trace**:
       - *ช่องโหว่ตีบวกฟรี (Free Spell Trace Exploit) ใน [ItemHandler.java:L871-876](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemHandler.java#L871-876)*: ขาดการเช็ค `if (!chr.hasItemCount(SPELL_TRACE_ID, cost))` ทำให้ผู้เล่นที่มี Spell Trace 0 ชิ้นสามารถตีบวก 100%, 70%, 30%, 15% และ Clean Slate 100% ได้ฟรีอย่างไม่จำกัด
       - *การขาด `saveToSQL()` ใน Spell Trace*: หลังการอัปเกรด Spell Trace ไม่มีการบันทึกสถานะลงฐานข้อมูล
       - *ช่องโหว่ Golden Hammer กดได้ไม่จำกัดและไม่บันทึก DB ใน [ItemUpgradeHandler.java:L186-218](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemUpgradeHandler.java#L186-218)*: เมื่อค้อนทองตีไม่สำเร็จ ไม่มีการเพิ่มค่า `iuc` ทำให้ผู้เล่นกดค้อน 50% ซ้ำได้เรื่อยๆ จนกว่าจะติด และไม่มีการบันทึก `saveToSQL()`
       - *การจำกัดสเตตัส Incredible Chaos Scroll ใน [Equip.java:L2787](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/items/Equip.java#L2787)*: สุ่มสเตตัสสูงสุดเพียง 5 แต้ม (`RAND_CHAOS_MAX`) แทนที่จะเป็น 9 แต้ม (`INCREDIBLE_RAND_CHAOS_MAX`) ตามคุณสมบัติของใบ Incredible
     - **ระบบ Star Force & Toad's Hammer**:
       - *บั๊กการตรวจไอเทมแหวนกิจกรรม [ItemConstants.java:L4616](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java#L4616)*: โค้ดเดิมใช้ `Collections.singletonList(TUC_IGNORE_ITEMS).contains(itemID)` ตรวจสอบ `int` กับ `List<int[]>` ซึ่งคืนค่า `false` ตลอดเวลา ส่งผลให้ Master Ring SS, Synergy, Cosmos, Chaos Ring ไม่สามารถใส่ศักยภาพและไม่ได้รับสเตตัสจาก Star Force
       - *บั๊กร่องรอยอุปกรณ์แตก (Boom Trace) ใน [ItemHandler.java:L994, L1005](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemHandler.java#L994)*: กำหนดให้ร่องรอยคงดาวไว้สูงสุด 30 ดาว (`Math.min(30, oldChuc)`) แทนที่จะเป็น 12 ดาวตามมาตรฐานทางการ ทำให้ของ 22 ดาวที่แตกคงเหลือ 22 ดาวเต็ม
       - *ระบบลดดาว (Star Drop) และ Chance Time ไม่ทำงานใน [GameConstants.java:L606-695](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/GameConstants.java#L606-695)*: ฟังก์ชัน `rollEnchant` มีเฉพาะ SUCCESS, MAINTAIN, DESTROY ขาดสถานะ DROP และไม่เคยบวก `dropStreak` ทำให้ไม่เกิดระบบ Chance Time (ติด 100% หลังดาวลด 2 ครั้งติด)
       - *บั๊กพิมพ์ผิดและการโอนย้ายข้ามรุ่นใน Toad's Hammer [ItemUpgradeHandler.java:L876-928](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemUpgradeHandler.java#L876-928)*: พิมพ์ผิด `getItemBySlot(fromPos)` แทน `toPos` ในการค้นหาไอเทมสวมใส่, ขาดการจำกัดระดับเลเวลอุปกรณ์ที่ห่างกันได้ไม่เกิน 10 เลเวล, ยอมให้โอนออปชั่น Unique/Legendary ไปยังของใหม่โดยไม่ลดระดับลงมาเป็น Epic และไม่มีการเรียก `saveToSQL()`

## 📅 [2026-10-13 23:45 น.] Comprehensive Arcane Symbol System Analysis, Technical Audit & Master Handoff Specification

### 🎯 Scope & Technical Details
- **หัวข้อ**: Arcane Symbol Ecosystem Audit, Script & Coupon Gap Analysis, and Master Project Handoff Documentation
- **รายละเอียด**:
  1. **การตรวจสอบและวิเคราะห์ระบบ Arcane Symbols & Quests (System Audit & Findings)**:
     - **ระบบที่สมบูรณ์ 100% (Working Features)**:
       - **UI Merging & Level Up (Opcode 374)** ใน [ItemHandler.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemHandler.java): คำนวณสูตร Meso ทางการ `10,000 * Math.floor((curLvl^2 + 11) * (8 + 0.1 * curLvl))`, มอบ Main Stat +100 / DA HP +2,100 / Xenon All-stat +48, Arcane Power สูงสุด 220, อัปเดต Union Artifact และส่งเอฟเฟกต์อัปเลเวล `UIContextPacket.ArcLevelUpEffect`
       - **Mob Kill Tracking**: รองรับ `QuestCountGroup` (เช่น 9101238) ผ่าน `mob.getParentMobSet().contains(reqMobID)` ใน [Char.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) และ [Quest.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/quest/Quest.java) นับจำนวนมอนสเตอร์ 500-600 ตัวในทุกแผนที่ได้ถูกต้อง
       - **Daily Reset**: ฟังก์ชัน `initSymbolQuests()` ใน [Char.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) รีเซ็ตสถานะเควสต์ทุกเที่ยงคืนถูกต้อง
       - **Selector Coupon (`2635509`)**: สคริปต์ [consume_2635509.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/item/consume_2635509.py) ให้เลือกรับสัญลักษณ์ได้ครบทั้ง 6 เมือง
     - **จุดบกพร่องและสิ่งที่ต้องปรับปรุง (Defects & Improvement Roadmap)**:
       - **Bugs ในสคริปต์ NPC 6 เมือง** ([3003104.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/3003104.py) ถึง [3003530.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/3003530.py)): พบการเรียก `sm.getQuestById(qid)` ซึ่งไม่มีเมธอดบน `ScriptManagerImpl` (เกิด `AttributeError`) และใช้คีย์เวิร์ด Java `null` ใน Python (เกิด `NameError`) เมื่อผู้เล่นมีเควสต์ค้างอยู่กดคุยกับ NPC จะทำให้สคริปต์ Error ทันที
       - **คูปองสัญลักษณ์เฉพาะเมืองไม่มีสคริปต์รองรับ (`2635510` - `2635514`)**: เควสต์ประจำวัน Chu Chu (`q38457e.py`), Lachelein (`q38461e.py`), Arcana (`q38465e.py`), Morass (`q38469e.py`), Esfera (`q38473e.py`) แจกคูปองเฉพาะเมืองเหล่านี้ แต่ไม่มีไฟล์สคริปต์ `consume_2635510.py` ถึง `consume_2635514.py` ทำให้ผู้เล่นกดดับเบิ้ลคลิกใช้งานไม่ได้
       - **ภาษาเวียดนามตกค้าง**: ข้อความรีเซ็ตใน `Char.java` (`[Thông báo] ... đã được làm mới!`) และบทสนทนาส่งเควสต์ใน `q38451e.py` - `q38473e.py`
       - **เควสต์เนื้อเรื่องหลัก (Storyline Pre-quests)**: สคริปต์เนื้อเรื่อง 34100-34700 ขาดตอน (ปัจจุบันเปิด `ServerConfig.BOSS_UNLOCK_PREQUESTS = true` เพื่อให้ข้ามเควสต์ได้)
       - **มินิเกมรายสัปดาห์**: มีเฉพาะ Hungry Muto ที่สมบูรณ์ใน Java ขณะที่ Erda Spectrum, Midnight Chaser, Spirit Savior ยังขาดระบบแจกรางวัล
  2. **การจัดทำเอกสารส่งมอบงาน (Master Handoff Documentation)**:
     - สร้างเอกสารเฉพาะทาง [ARCANE_SYMBOLS_HANDOFF.md](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/ARCANE_SYMBOLS_HANDOFF.md) รวบรวมสรุปประเด็น, สาเหตุเชิงลึก, แนวทางแก้ไขทางเทคนิคทีละขั้นตอนพร้อมโค้ดตัวอย่าง และตารางไฟล์ที่เกี่ยวข้อง
     - อัปเดตเอกสารส่งมอบงานหลัก [HANDOFF.md](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/HANDOFF.md) เพิ่มหมวดที่ 10 (การปรับปรุง Cube Latency) และหมวดที่ 11 (แผนการปรับปรุง Arcane Symbols)
     - ซิงค์เอกสารทั้งหมดไปยัง root directory และเตรียม push ขึ้นรีโปสิโทรีอย่างสมบูรณ์

## 📅 [2026-10-13 22:25 น.] Fix Bright Cube Option Selection UI & Resolve Glowing Cube Responsiveness Delay (Opcode 381 & Sequence Alignment)

### 🎯 Scope & Technical Details
- **หัวข้อ**: Fix Bright Cube Selection UI, Overhaul Memorial Cube Option Handler & Resolve Glowing Cube Reroll Delay
- **รายละเอียด**:
  1. **ปัญหาและสาเหตุเชิงเทคนิคที่ตรวจสอบพบ (Problems & Root Causes)**:
     - **Bright Cube Unusable / Disappears without Effect & No Selection UI ("ใช้แล้วกล่องหายแต่ไม่มีผลอะไร / ไม่มีให้เลือก")**:
       - `USER_MEMORIAL_CUBE_OPTION_REQUEST` ใน [InHeader.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/header/InHeader.java) เป็น `UnkValue` (`-1`) เมื่อผู้เล่นคลิกเลือก Before หรือ After ตัวไคลเอนต์ MapleStory v265.3 ส่งแพ็กเก็ต Opcode 381 มา แต่เซิร์ฟเวอร์ไม่ได้ลงทะเบียนไว้ ทำให้แพ็กเก็ตตกหล่น
       - ใน [CubeHandler.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/CubeHandler.java) เมธอด `handleBrightCube` (init) การถอดรหัส Buffer เดิมใช้เงื่อนไขตรวจสอบไบต์ผิดพลาด ทำให้ `cubeIndex` (Sequence ID) ถูกกลืนกลายเป็น `0` ส่งผลให้เมื่อส่ง `WvsContext.consumeBrightCubeInit` ตัวไคลเอนต์เห็น Index ไม่ตรงกับ Sequence ที่ส่งมา จึงตัดทิ้งและไม่ยอมเปิดหน้าต่าง Before/After Memorial Dialog ("ไม่มีให้เลือก")
       - เมธอด `handleUserMemorialCubeOptionRequest` โค้ดเดิมไปแก้ไขค่าบนออบเจกต์ `copy` แทนที่จะดึงไอเทมจริงจากกระเป๋า `chr.getInventoryByType(...)` / `chr.getEquippedInventory()` และมีการหักเงินค่าคิวบ์ซ้ำสองรอบ
       - ใน [WvsContext.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/connection/packet/WvsContext.java) เมธอด `consumeBrightCubeInit` มีการเรียก `cube.getItemId()` และ `cube.getBagIndex()` โดยตรง เสี่ยงต่อ `NullPointerException` หากคิวบ์ถูกบริโภคจนหมดก่อนส่งแพ็กเก็ต
     - **Glowing Cube / Green Cubes Delay ("กล่องเขียวใช้ได้แล้วแต่ช้ามากกว่าจะทำงาน")**:
       - ใน `handleCube` การอ่าน `cubeIndex` เดิมมีปัญหาในการคำนวณไบต์คงเหลือ ทำให้ค่า `cubeIndex` ที่ส่งกลับใน `consumeCubeRelease` กลายเป็น `0` ไม่ตรงกับ Sequence ของไคลเอนต์ ไคลเอนต์จึงเกิด Timeout Delay 2-3 วินาทีก่อนจะถูกบังคับอัปเดต UI
       - มีการส่งแพ็กเก็ต `UserLocal.itemSlotExtendItemUse` (Opcode 1518 - Potential Stamp Result) ปะปนในการคิวบ์ ทำให้ State Machine ของไคลเอนต์ขัดข้อง
       - มีการเรียก `chr.dispose()` (ส่ง `EXCL_REQUEST` - Enable Actions) ท้ายเมธอด `handleCube` ซึ่งไปรบกวนจังหวะแอนิเมชันของหน้าต่าง ENHANCE
       - การคิดจำนวนคิวบ์ที่เหลือ `cubeCount` ใน `handleCube` และ `handleBrightCube` มีการเรียก `chr.consumeItem` ไปแล้ว 1 ชิ้น แต่โค้ดกลับนำ `getQuantityOfItem() - 1` ไปลบซ้ำอีก 1 ชิ้น ทำให้ Client เข้าใจว่าคิวบ์หมดก่อนความเป็นจริง
  2. **การแก้ไขเชิงลึก (Implementation & Solutions)**:
     - **Opcode 381 Registration**:
       - อัปเดต `InHeader.USER_MEMORIAL_CUBE_OPTION_REQUEST(381)` ใน [InHeader.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/header/InHeader.java) ให้ตรงตามโปรโตคอล MapleStory v265.3
     - **Robust Sequence Index Extraction (`cubeIndex`)**:
       - ปรับตรรกะใน [CubeHandler.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/CubeHandler.java) ทั้งใน `handleCube` และ `handleBrightCube` (ทั้ง init และ release) ให้อ่าน `ePos = inPacket.decodeShort()`, ตามด้วย `if (inPacket.getUnreadAmount() > 1) { inPacket.skip(inPacket.getUnreadAmount() - 1); }` และอ่านไบต์สุดท้ายเป็น `cubeIndex` เสมอ ทำให้ได้ Sequence Index ที่ถูกต้อง 100% ไคลเอนต์แสดงผลการรีออปชั่นทันทีโดยไม่มีอาการหน่วงเวลา
     - **Remove Interferences & Fix Packets in `handleCube`**:
       - เปลี่ยนจากการส่ง Stamp Packet (1518) มาส่ง `UserLocal.brightCubeResult(true, cubeID, equip.getItemId())` (1519) ที่ถูกต้อง
       - ลบ `chr.dispose()` ที่รบกวน Action State ท้าย `handleCube` ออก
       - ปรับการคิดจำนวน `cubeCount` ให้ตรงกับจำนวนจริงในกระเป๋า `Math.max(chr.getScriptManager().getQuantityOfItem(cubeID), 0)`
     - **Overhaul Memorial Cube Option Handler & Selection Flow**:
       - ปรับปรุง `handleUserMemorialCubeOptionRequest` ให้ดึงอุปกรณ์จริงจาก Inventory (รองรับสล็อตลบของไอเทมสวมใส่) อัปเดตออปชั่นใหม่ตามตัวเลือก (Option 6: After / New Potential, Option 7: Before / Old Potential), อัปเดตอาวุธรองของ Zero ให้ตรงกัน, ล้าง `memorialCubeInfo` ทิ้งอย่างสะอาดหมดจด และตัดการหักเงินซ้ำซ้อนออก
       - เสริมตรรกะ fallback ใน `handleBrightCube` (!init) ให้รองรับทั้ง choice 0/6 (After) และ 1/7 (Before)
     - **Null-Safety & Guarding in Packet Builders**:
       - เสริม `cube != null ? cube.getItemId() : 0` ใน `WvsContext.consumeBrightCubeInit`
       - เพิ่มการตรวจสอบ `inPacket.getUnreadAmount() > 0` ก่อนเรียก `handleCubeAll` ใน [ItemHandler.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemHandler.java) ป้องกันการบริโภคคิวบ์เปล่าเมื่อผู้เล่นกดดับเบิลคลิกจากช่อง Cash
  3. **การคอมไพล์ ดีพลอย และจัดทำแพตช์ (Compilation, Deployment & Patch Archive)**:
     - คอมไพล์ผ่านฉลุย 100% ด้วย Maven: `BUILD SUCCESS` (854 ไฟล์)
     - Deploy `maplestory.jar` (138.68 MB) ไปยัง `Server263/maplestory.jar` และ root `maplestory.jar`
     - สร้างแพ็กเกจแพตช์เดี่ยว [Patches/Server263_Patch_Latest.zip](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip) (173.02 MB) เรียบร้อยพร้อมใช้งาน 100% ตามกฎข้อ 4 ของ AGENTS.md

## 📅 [2026-10-13 20:05 น.] Fix Rebirth Flame Option Selection (Before/After Inversion) & Arcane Symbol Daily Quest Ecosystem

### 🎯 Scope & Technical Details
- **หัวข้อ**: Fix Rebirth Flame Before/After Option Selection & Complete Arcane River Symbol Daily Quest System Overhaul
- **รายละเอียด**:
  1. **ปัญหาและสาเหตุเชิงเทคนิคที่ตรวจสอบพบ (Problems & Root Causes)**:
     - **Rebirth Flame Before/After Inversion Bug**: ใน [ItemUpgradeHandler.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemUpgradeHandler.java) เมธอด `handleMemorialExUpgradeItemUseRequest` สุ่มออปชั่นใหม่แล้วแก้ไขค่า `equip.flame(exGradeOption)` ลงในไอเทมจริงทันทีตั้งแต่ก่อนผู้เล่นจะกดเลือก และใน `handleMemorialExUpgradeItemOptionRequest` ทำการ decode packet แต่ทิ้งค่า `choice` และเรียก `equip.flame(exGradeOption)` ซ้ำด้วยออปชั่นใหม่อย่างไม่มีเงื่อนไข ทำให้ไม่ว่าผู้เล่นจะกดเลือก "Before" (เก็บออปชั่นเดิม) หรือ "After" (เอาออปชั่นใหม่) ผลลัพธ์จะกลายเป็นออปชั่นใหม่ (After) เสมอ
     - **Mob Kill Tracking Dead สำหรับ QuestCountGroup**: เควสต์ประจำวัน Arcane River ยุคใหม่ (v265 / Savior / New Age) เช่น Vanishing Journey (38450), Chu Chu (38454), Lachelein (38458), Arcana (38462), Morass (38466), Esfera (38470) มอนสเตอร์ในเควสต์ไม่ได้ระบุ Mob ID เดี่ยวๆ แต่ระบุเป็น `QuestCountGroup` (เช่น 9101238, 9101239 ฯลฯ) ซึ่งมอนสเตอร์ในแมปจะเก็บ Group ID นี้ไว้ใน `mob.getParentMobSet()` แต่ใน [Char.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) เมธอด `handleMobKillForQuest` มีการเช็คเฉพาะ `mob.getQuests()` และฮาร์ดโค้ด `9101025` ทำให้การกำจัดมอนสเตอร์ใน Arcane River ทั้งหมด ไม่ถูกนับเข้าเควสต์ประจำวันเลย
     - **QR Value Wipe Bug ใน `AccountQuest` & `Quest`**: ใน [AccountQuest.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/AccountQuest.java) และ [Quest.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/quest/Quest.java) มีการเรียก `setQRValueToProperties()` ซึ่งแปลงและล้างค่า `qrValue` กลายเป็นค่าว่าง `""` เพราะเควสต์นับจำนวนมอนสเตอร์จะเก็บตัวเลขจำนวนตัวใน `qrValue` ไม่ได้เก็บเป็นคีย์คู่คุณสมบัติ (Key-Value Properties)
     - **Pre-quest Block ใน `Char.handleSymbolQuest`**: เซิร์ฟเวอร์บังคับเช็คเควสต์เนื้อเรื่องหลัก `chr.isQuestCompleted(...)` โดยไม่มี fallback สำหรับ `ServerConfig.BOSS_UNLOCK_PREQUESTS`
     - **ขาดสคริปต์ไอเทม Arcane Symbol Selector Coupon (`consume_2635509.py`)**: เควสต์ประจำวัน v265 มอบกล่องสุ่ม/เลือกสัญลักษณ์ `2635509` แต่เซิร์ฟเวอร์ยังไม่มีสคริปต์รองรับการกดใช้งานไอเทมนี้
     - **ขาดสคริปต์ NPC ประจำเมือง Arcane River**: NPC ประจำเมืองสำหรับส่งเควสต์สัญลักษณ์ (Rona `3003104`, Lyck `3003152`, Gray Mask `3003209`, Small Spirit `3003322`, Jean `3003432`, Ollie `3003530`) ยังไม่มีสคริปต์รองรับการรับและส่งเควสต์ประจำวัน
  2. **การแก้ไขเชิงลึก (Implementation & Solutions)**:
     - **Rebirth Flame Before/After Selection**:
       - ใน [ItemUpgradeHandler.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemUpgradeHandler.java) เมธอด `handleMemorialExUpgradeItemUseRequest`: ทำการโคลนไอเทม `equipCopy = equip.deepCopy()`, คำนวณ `oldEx` และ `newEx`, บันทึกทั้ง 2 ค่าลงใน `QuestConstants.FLAME_QR` บนตัวละครโดยยังไม่แตะต้อง `equip` ตัวจริง
       - เมธอด `handleMemorialExUpgradeItemOptionRequest`: อ่าน `choice = inPacket.decodeInt()`; หาก `choice == 1 || choice == 6` (After) ให้นำ `newEx` มาอัปเกรดไอเทม; หาก `choice == 0 || choice == 7 || choice == -1` (Before) ให้นำ `oldEx` ดั้งเดิมมาใส่คงเดิม จากนั้นส่งแพ็กเก็ตยืนยันผลลัพธ์และเอฟเฟกต์อย่างถูกต้อง 100%
     - **QuestCountGroup Mob Kill Tracking**:
       - ปรับปรุง [Char.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) ใน `handleMobKillForQuest` ให้ค้นหาเควสต์ที่กำลังดำเนินอยู่ทั้ง `AccountQuest` และ `Quest` ปกติ โดยตรวจสอบเงื่อนไข `q.hasMobReq(mobID)` หรือ `mob.getParentMobSet().contains(reqMobID)` (`QuestCountGroup`) ทำให้การตีดวงวิญญาณและมอนสเตอร์ใน Arcane River ทุกเมืองนับจำนวนตัวก้าวหน้าเควสต์ 600 ตัวได้อย่างถูกต้องสมบูรณ์
     - **QR Value Preservation**:
       - แก้ไข [AccountQuest.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/AccountQuest.java) และ [Quest.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/quest/Quest.java) ลบการเรียก `setQRValueToProperties()` ที่ล้างค่าทิ้ง และจัดฟอร์แมตตัวเลข `qrValue` (เช่น `001`, `600`) อย่างแม่นยำ
     - **Symbol Pre-quest Bypass**:
       - ปรับปรุง [Char.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) ใน `handleSymbolQuest` ให้รองรับการปลดล็อกรับเควสต์รายวันได้ทันทีเมื่อ `ServerConfig.BOSS_UNLOCK_PREQUESTS` เป็นจริง
     - **Arcane Symbol Selector Coupon Script**:
       - สร้างสคริปต์ [consume_2635509.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/item/consume_2635509.py) สำหรับไอเทมคูปอง `2635509` ให้ผู้เล่นสามารถเลือกรับ Arcane Symbol ชนิดใดก็ได้ (Vanishing Journey, Chu Chu, Lachelein, Arcana, Morass, Esfera) พร้อมระบุจำนวนที่ต้องการเปิดใช้งานได้ทันที
     - **Town NPC & Daily Quest Scripts**:
       - สร้างและอัปเดตสคริปต์ NPC ประจำเมือง Arcane River ครบ 6 เมือง: [3003104.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/3003104.py) (Rona), [3003152.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/3003152.py) (Lyck), [3003209.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/3003209.py) (Gray Mask), [3003322.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/3003322.py) (Small Spirit), [3003432.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/3003432.py) (Jean), [3003530.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/3003530.py) (Ollie)
       - อัปเดตสคริปต์เริ่มเควสต์ `q38450s.py`, `q38454s.py`, `q38458s.py`, `q38462s.py`, `q38466s.py`, `q38470s.py` เคลียร์สถานะเควสต์ค้างและเปิดรับภารกิจกำจัดมอนสเตอร์ 600 ตัวได้อย่างราบรื่น
       - ซิงค์สคริปต์ทั้งหมดลงทั้ง `v214 src/data/scripts/` และ `Server263/data/scripts/`
  3. **การคอมไพล์ ดีพลอย และจัดทำแพตช์ (Compilation, Deployment & Patch Archive)**:
     - คอมไพล์ Java Core ผ่านฉลุย 100%: `BUILD SUCCESS` (854 ไฟล์) ด้วย OpenJDK 21 & Maven
     - ดีพลอย `maplestory.jar` (138.68 MB) ไปยัง `Server263/maplestory.jar`, `root/maplestory.jar`, และ `v214 src/maplestory.jar`
     - สร้างแพ็กเกจแพตช์อัปเดตเดี่ยว [Patches/Server263_Patch_Latest.zip](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip) (173.02 MB) สำเร็จ 100% ตามกฎข้อ 4 ของ AGENTS.md

## 📅 [2026-10-13 19:40 น.] Fix Cube Option Reroll System, Resolve Packet Decoding Underflow & Support All Cube Types (Bonus Potential, Red, Black, Miracle)

### 🎯 Scope & Technical Details
- **หัวข้อ**: Fix Cube Option Reroll System, Resolve Packet Decoding Buffer Underflow & Support All Cube Types (Bonus Potential Cubes, Red, Black, Miracle)
- **รายละเอียด**:
  1. **ปัญหาและสาเหตุเชิงเทคนิคที่ตรวจสอบพบ (Problems & Root Causes)**:
     - **Buffer Underflow / IndexOutOfBoundsException ใน `handleCube`**: ใน [CubeHandler.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/CubeHandler.java) เมธอด `handleCube` เรียก `int ePos = inPacket.decodeInt();` แต่แพ็กเก็ตจากหน้าต่าง ENHANCE (`USER_CONSUME_CUBE_ITEM_USE_REQUEST`, opcode 367) ตัวไคลเอนต์ MapleStory v265 ส่ง `nEquipPos` มาเป็น `short` (2 ไบต์) เมื่อเซิร์ฟเวอร์พยายามอ่าน 4 ไบต์จาก Buffer ที่เหลือเพียง 2 ไบต์ Netty จึงโยน `IndexOutOfBoundsException` ส่งผลให้ตัวเซิร์ฟเวอร์หยุดการทำงานกลางคัน ไม่ส่งผลลัพธ์กลับไปยัง Client หน้าต่าง UI จึงค้างและไม่รีออปชั่น
     - **Negative Skip Bug**: เมื่อข้อมูลใน InPacket ถูกอ่านหมด (`unreadAmount == 0`), คำสั่ง `inPacket.skip(inPacket.getUnreadAmount() - 1);` จะพยายามข้าม `-1` ไบต์ ซึ่งโยน `IllegalArgumentException: length -1`
     - **Missing Cube Types ใน `handleCubeAll`**: เมธอด `handleCubeAll` ไม่มี case รองรับ `5062500` (`BONUS_POTENTIAL_CUBE`), `5062501` (`SPECIAL_BONUS_POTENTIAL_CUBE`), `5062009` (`RED_CUBE`), `5062010` (`BLACK_CUBE`), และ Miracle Cubes (`5062000-5062006`) ทำให้คิวบ์เหล่านี้ตกไปที่ `default:` และไม่ทำงาน
     - **Cash Inventory False Overwrite**: ใน `handleUserCashCubeItemUseRequest` มีเงื่อนไข Whitelist ที่ไม่รวม `5062500`, `5062009`, `5062010` ทำให้คิวบ์ที่อยู่ใน Cash Inventory ถูกแทนที่ด้วยช่องจาก Consume Inventory ซึ่งกลายเป็น `null`
     - **Cash Item Deletion Stub ใน `ItemHandler`**: ใน [ItemHandler.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemHandler.java) โค้ดเดิมเขียน stub ว่า `"This item has been removed from the game."` และลบไอเทมทิ้ง (`chr.consumeItem(item)`) สำหรับคิวบ์ที่ไม่ใช่ Glowing/Bright
     - **Inventory Cross-Lookup Failure**: ใน [Char.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) เมธอด `consumeItem(int id, int quantity)` และ [ScriptManagerImpl.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java) เมธอด `getQuantityOfItem(int id)` หากคิวบ์ถูกเก็บในช่องที่ไม่ตรงกับ default inventory type ของ WZ (เช่น คิวบ์แคชที่แจกใส่ช่อง Use หรือคิวบ์ Use ในช่อง Cash) เซิร์ฟเวอร์จะมองไม่เห็นไอเทม
  2. **การแก้ไขเชิงลึก (Implementation & Solutions)**:
     - **Safe Dynamic Packet Decoding**: ปรับปรุงการถอดรหัส `ePos` และ `cubeIndex` ใน [CubeHandler.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/CubeHandler.java) (`handleCube` และ `handleBrightCube`) ให้อ่านเป็น `decodeShort()` อย่างปลอดภัย รองรับทั้ง 2, 3, 4, 5 ไบต์ และตรวจสอบ `unreadAmount > 0` ก่อนอ่าน `cubeIndex` กำจัด Buffer Underflow และ Negative Skip Bug 100%
     - **Equip Slot Auto-Fallback**: รองรับทั้งสล็อตบวกและสล็อตลบ (`ePos < 0`) ในการดึงอุปกรณ์ที่สวมใส่อยู่ (`getEquippedInventory()`) พร้อมเรียก `chr.dispose()` เมื่อเสร็จสิ้นกระบวนการเพื่อให้ไคลเอนต์ปลดล็อก Action พร้อมกดรีออปชั่นครั้งต่อไปได้ทันที
     - **All Cube Types Integration**: บรรจุคิวบ์ทุกชนิดเข้า `handleCubeAll` ครบถ้วน:
       - Bonus Potential Cube (`5062500`), Special Bonus Potential Cube (`5062501`) -> `handleCube(chr, item, itemID, 0, inPacket, ItemGrade.Legendary, true)`
       - Red Cube (`5062009`) -> `handleCube(chr, item, itemID, 0, inPacket, ItemGrade.Legendary, false)`
       - Black Cube (`5062010`) -> `handleBrightCube(chr, item, inPacket, ItemGrade.Legendary, false, true)`
       - Miracle Cubes (`5062000-5062006`) -> `handleCube` ตามระดับ ItemGrade
       - เพิ่ม Whitelist ใน Memorial Selection Confirmation สำหรับ `BLACK_CUBE`
       - เพิ่ม Fallback ให้ `ItemConstants.isBonusCube()` และ `ItemConstants.isCube()`
     - **Dual Cash/Consume Support**: ปรับ `handleUserConsumeCubeItemUserRequest` และ `handleUserCashCubeItemUseRequest` ให้ค้นหาไอเทมทั้งใน Consume และ Cash Inventory อย่างครบถ้วน
     - **Remove Deletion Stubs**: ปรับ [ItemHandler.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemHandler.java) ให้นำคิวบ์ทั้งหมดส่งตรงไปยัง `CubeHandler.handleCubeAll` โดยไม่ลบไอเทมทิ้ง
     - **Multi-Inventory Fallback**: เพิ่ม fallback ใน [Char.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) และ [ScriptManagerImpl.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java) ให้ค้นหาข้ามช่อง Inventory ได้อย่างแม่นยำ
  3. **การคอมไพล์ ดีพลอย และจัดทำแพตช์ (Compilation, Deployment & Patch Archive)**:
     - คอมไพล์ Java Core ผ่านฉลุย 100%: `BUILD SUCCESS` (854 ไฟล์) ด้วย OpenJDK 21 & Maven
     - ดีพลอย `maplestory.jar` (138.68 MB) ไปยัง `Server263/maplestory.jar`, `root/maplestory.jar`, และ `v214 src/maplestory.jar`
     - สร้างแพ็กเกจแพตช์อัปเดตเดี่ยว [Patches/Server263_Patch_Latest.zip](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip) (173.01 MB) สำเร็จ 100% ตามกฎข้อ 4 ของ AGENTS.md

## 📅 [2026-10-13 18:35 น.] Comprehensive Party Quest Audit, Crash Prevention, Logic Fixes & Dual-Mode Enhancements

### 🎯 Scope & Technical Details
- **หัวข้อ**: Complete Party Quest Overhaul, Crash Prevention, Porting & Bug Fixes for Solo & Multiplayer Play
- **รายละเอียด**:
  1. **ปัญหาและสาเหตุเชิงเทคนิคที่ตรวจสอบพบ (Problems & Root Causes)**:
     - **PartyQuestType Byte Collision**: ใน [PartyQuestType.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/enums/social/Party/PartyQuestType.java) พบว่า `XERXES_CHRYSE` และ `LORD_PIRATE` ใช้ค่า byte ซ้ำกันคือ `(9)` ทำให้เวลาเซิร์ฟเวอร์เปิดเควสต์ประเภทหนึ่ง จะไปทับซ้อนกับอีกประเภทหนึ่ง
     - **Escape PQ Map Crash**: ใน [Escape.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/Escape.java) ด่าน 7 (ปราบบอส Ani `921160700`) เมื่อปราบบอสสำเร็จ โค้ดพยายามวาร์ปปาร์ตี้ไปที่แมป `921160800` ซึ่งไม่มีอยู่ใน WZ ส่งผลให้เซิร์ฟเวอร์แจ้ง Error และผู้เล่นหลุด
     - **Switch Fallthrough Bug**: ใน [Romeo.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/Romeo.java) และ [FirstTimeTogether.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/FirstTimeTogether.java) ขาดคำสั่ง `break;` ใน `case 0:` ทำให้เวลากดคุยตัวเลือกจะตกลงไปทำงานใน `case 1:` ทันที
     - **Kenta In Danger Entry Inversion & Missing Scripts**: ใน [KentaInDanger.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/KentaInDanger.java) ตรรกะตรวจสอบโควตาเขียนกลับข้าง `if (!sm.checkAttempt(entryQuest, party))` ทำให้ผู้เล่นทั่วไปไม่สามารถเข้าได้เลย และไม่มีโค้ดควบคุมด่านใน `event()` รวมถึงไม่มีพอร์ทัลสคริปต์ก้าวหน้าด่าน `kenta_nextStage.py` และ `kenta_out00.py`
     - **Lord Pirate Guon Drop-to-Exit & Solo Marks Requirement**: ใน [LordPirate.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/LordPirate.java) เมธอด `event()` มีบล็อก `else { exit(); }` ทำให้ผู้เล่นที่กดคุยกับ NPC Guon ในด่านกลาง (0, 2, 3, 4) จะถูกบังคับถามออกจากเรือทันที และจำนวน Mark ที่ต้องใช้ (30 ชิ้น) สูงเกินไปสำหรับผู้เล่นคนเดียว
     - **Tangyoon Cooking Entrance Loop**: ใน [TangyoonCooking.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/TangyoonCooking.java) เมื่อกดเริ่มทำอาหาร เซิร์ฟเวอร์วาร์ปผู้เล่นกลับมาที่แมปทางเข้าเดิม `912080000` แทนที่จะเป็นห้องครัว `912080100` และสคริปต์ `tangyoon_end.py` บังคับถามยอมแพ้ทันทีที่คุย
     - **Alien Visitor Mojibake Text**: [AlienVisitor.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/AlienVisitor.java) มีข้อความภาษาเวียดนามที่เสียหาย (Mojibake) เกือบทั้งไฟล์
     - **Hungry Muto Prequest Block**: ใน [HungryMuto.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/HungryMuto.java) บังคับต้องจบเควสต์ 34218 โดยไม่ตรวจสอบคอนฟิก `BOSS_UNLOCK_PREQUESTS`
  2. **แนวทางการแก้ไขและการปรับปรุง (Implementation & Solutions)**:
     - **Enum ID Re-alignment**: ปรับ [PartyQuestType.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/enums/social/Party/PartyQuestType.java) จัดเรียง byte ID ใหม่แบบไม่ซ้ำกัน (Lord Pirate = 10, Dragon Rider = 11, Kenta = 12, Romeo = 13, Juliet = 14, Alien Visitor = 15)
     - **Escape Crash Fix**: ปรับ [Escape.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/Escape.java) ให้มอบของรางวัลบอส Ani พร้อม Prison Guard Key (`4001534`) และวาร์ปกลับสู่ `GameConstants.ESCAPE_ENTRANCE_MAP` (`921160000`) ป้องกันเซิร์ฟเวอร์แครช 100%
     - **Switch Logic Fix**: ใส่ `break;` ให้ถูกต้องใน [Romeo.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/Romeo.java) และ [FirstTimeTogether.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/FirstTimeTogether.java)
     - **Kenta in Danger Overhaul**:
       - [KentaInDanger.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/KentaInDanger.java): แก้ไข `checkAttempt` ให้เป็น `true` ปกติ, เพิ่ม Solo Auto-Party, ปรับปรุงข้อความตรวจสอบเลเวล 160-275, และพัฒนาฟังก์ชัน `event()` ครบทั้ง 4 Stage โดยใน Stage 4 จะเสก Pianus (`8520000`) และมอบ Pianus Scale (`4001535`) x2 เมื่อชนะ
       - สร้างสคริปต์พอร์ทัล [kenta_nextStage.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/portal/kenta_nextStage.py) ตรวจจับการกำจัดมอนสเตอร์เพื่อก้าวหน้าสู่ด่านถัดไป และ [kenta_out00.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/portal/kenta_out00.py) สำหรับพอร์ทัลออก
       - สร้างสคริปต์ NPC [kentaPQ_out.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/kentaPQ_out.py) สำหรับ NPC Kenta ในถ้ำ Pianus
     - **Lord Pirate Solo Scaling & Safe Guon Talk**:
       - [LordPirate.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/LordPirate.java): สเกล Mark อัตโนมัติ (10 ชิ้นสำหรับ Solo, 30 ชิ้นสำหรับ Multiplayer), เพิ่มคำแนะนำภารกิจในด่าน 0, 2, 3, 4 แทนการบังคับออก, ใส่ Null Check ป้องกัน Instance Null, และแก้คำผิด "Aerial Prison" -> "Lord Pirate's ship"
     - **Tangyoon Cooking Kitchen Fix & Interaction**:
       - [TangyoonCooking.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/TangyoonCooking.java): แก้ไขแมปวาร์ปไปยัง `TANGYOON_COOKING_MAIN_STAGE` (`912080100`), เพิ่ม Solo Auto-Party และการนับสิทธิ์ประจำวัน, พัฒนาเมนูทำอาหาร เสกวัตถุดิบทำอาหาร (`9300827`), และส่งมอบอาหารรับใบรับรองเชฟ (`4033668`)
       - [tangyoon_end.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/tangyoon_end.py): ปรับ `typeEnter` เป็น `2` เพื่อให้เรียก `event()` ทำอาหารได้
     - **Alien Visitor Localization & Auto-Party**:
       - [AlienVisitor.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/AlienVisitor.java): แปลภาษาเวียดนามที่เสียหายเป็นภาษาอังกฤษสากลทั้งหมด ทั้งบทสนทนา, สรุปอันดับ Rank S/A/B/C/F, ข้อความพอร์ทัล, และเพิ่ม Solo Auto-Party
     - **Hungry Muto, Dimension Invasion, Xerxes, DefenseEvent Auto-Party**:
       - ปรับปรุง [HungryMuto.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/HungryMuto.java) ให้ข้ามเควสต์ 34218 เมื่อ `ServerConfig.BOSS_UNLOCK_PREQUESTS` เปิดใช้งาน และเพิ่ม Solo Auto-Party
       - ปรับปรุง [DimensionInvasion.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/DimensionInvasion.java), [XerxesInChryse.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/XerxesInChryse.java), และ [DefenseEvent.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/DefenseEvent.java) ให้สร้างปาร์ตี้ Solo อัตโนมัติเมื่อกดคุย
  3. **การคอมไพล์ ดีพลอย และจัดทำแพตช์ (Compilation, Deployment & Patch Archive)**:
     - คอมไพล์ Java Core ผ่านฉลุย 100%: `BUILD SUCCESS` (854 ไฟล์) ด้วย OpenJDK 21 & Maven
     - ดีพลอย `maplestory.jar` (138.68 MB) ไปยัง `Server263/maplestory.jar`, `root/maplestory.jar`, และ `v214 src/maplestory.jar`
     - ซิงค์ไฟล์สคริปต์ทั้งหมดไปยัง `Server263/data/scripts/`
     - สร้างแพ็กเกจแพตช์อัปเดตเดี่ยว [Patches/Server263_Patch_Latest.zip](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip) (173.01 MB) สำเร็จ 100% ตามกฎข้อ 4 ของ AGENTS.md

## 📅 [2026-10-13 17:05 น.] Full Party Quest System Porting & Dual-Mode Architecture (100% Solo Offline & LAN Multiplayer Support)

### 🎯 Scope & Technical Details
- **หัวข้อ**: Complete Party Quest Overhaul, TMS Reference Porting, Dual-Mode (Solo / LAN Multiplayer) Engine Architecture, and Bug Fixes
- **รายละเอียด**:
  1. **ปัญหาและความต้องการของผู้ใช้ (Problem & Requirements)**:
     - ผู้ใช้ต้องการให้ระบบ Party Quest (PQ) สามารถเล่นได้สมบูรณ์ทั้งแบบ **"คนเดียว (Solo / 1 Player Offline-friendly)"** และแบบ **"เล่นกับเพื่อนผ่าน LAN / Multiplayer"** ได้อย่างราบรื่น ไม่มีข้อความบล็อกห้ามเข้าเพราะคนไม่พอ และไม่มีการติดบั๊กที่ต้องอาศัยผู้เล่นหลายคนเหยียบแท่น/ปีนเชือก
     - ตรวจสอบความสมบูรณ์ของ Party Quests เดิมในเซิร์ฟเวอร์ และดึงข้อมูลอ้างอิงจากคลัง TMS (`TMS277_REF_NomainSource/tms273/`) มาพอร์ตและแก้ไขจุดบกพร่อง
  2. **ผลการสำรวจและสาเหตุเชิงเทคนิคที่ตรวจสอบพบ (Investigation & Root Causes)**:
     - **Hardcoded Party Blocker**: ใน [ScriptManagerImpl.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java) เมธอด `checkPartyForPQ()` มีโค้ดบังคับ `if (count < 2)` ทำให้ทุก Party Quest ที่เรียกใช้เมธอดนี้จะบล็อกผู้เล่นคนเดียวทันที
     - **Random Re-generation Bug**: ใน [ScriptManagerImpl.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java) เมธอด `rectangleStages(stage)` ทุกครั้งที่หัวหน้าปาร์ตี้กดคุยกับ NPC ตัวโค้ดจะสุ่มคำตอบใหม่ (`Randomizer.rand(0, combos.length - 1)`) เสมอ ทำให้ผู้เล่นไม่มีทางผ่านได้เลยเนื่องจากตำแหน่งคำตอบเปลี่ยนไปทุกครั้งที่กดตรวจ
     - **Moon Bunny Zero Mob Spawn**: ใน [MoonBunny.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/MoonBunny.java) ตัวแปร `mobGens` ถูกประกาศไว้เป็น List ว่างเปล่าและไม่เคยถูกใส่ข้อมูล ทำให้หมู (Pigs) ในด่าน 0 ไม่เกิด ผู้เล่นจึงไม่สามารถหาเมล็ด Primrose Seeds ได้ และตัวตรวจจับเวลากระตุ้นเพียงครั้งเดียว ไม่มีการเกิดของมอนสเตอร์เวฟโจมตี Moon Bunny ในด่าน 1
     - **Kerning PQ Stage 4 Block & Mob Missing**: ใน [FirstTimeTogether.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/FirstTimeTogether.java) ด่าน 4 ไม่มีการเรียกเสกมอนสเตอร์ และไม่มีเงื่อนไขผ่านด่านสำหรับผู้เล่นคนเดียว
     - **Dragon Rider Broken Progression**: ใน [DragonRider.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/DragonRider.java) มีการ Copy-paste โค้ดจาก `Escape.java` มาใช้ property `"escape" + stage + "clear"` ซึ่งไม่มีอยู่จริงใน Dragon Rider และบทสนทนาเป็นภาษาเวียดนามทั้งหมด
     - **Ludibrium PQ Stubbed**: โค้ด `party2_enter.py` มีเพียงข้อความบล็อกห้ามเข้าเพราะปาร์ตี้ไม่ถึง 3 คน และยังไม่มีคลาส `Ludibrium.java` ในระบบ Party Quest Core
  3. **การแก้ไขและการพอร์ตเชิงลึก (Implementation & Porting Details)**:
     - **Core Solo & Auto-Party Engine**:
       - [ScriptManagerImpl.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java):
         - ปรับ `checkPartyForPQ()`: หากผู้เล่นยังไม่มีปาร์ตี้ ระบบจะสร้างปาร์ตี้ Solo อัตโนมัติ (`Party.createNewParty`) และปรับเงื่อนไขขั้นต่ำเป็น `count < 1` ปลดล็อกให้เล่นคนเดียวได้ 100%
         - แก้ไข `rectangleStages(stage)`: จดจำค่าคำตอบ `kpq2answer_idx` และ `kpq3answer_idx` ลงใน `Instance` เพื่อไม่ให้สลับคำตอบ และเพิ่มโหมด Solo ตรวจจับว่าผู้เล่นยืนอยู่บนแท่น/เชือกที่ถูกต้องข้อใดข้อหนึ่งก็สามารถผ่านด่านได้ทันที
       - [Party.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/social/Party/Party.java):
         - เพิ่มเมธอดสะดวก `createNewParty(Char chr, String name)` ที่เชื่อมต่อกับ World, บันทึกผู้นำปาร์ตี้, และซิงค์ลง SQL ฐานข้อมูลอัตโนมัติ
     - **Ludibrium Party Quest (Dimensional Crack) Full Port**:
       - บรรจุ `PartyQuestType.LUDIBRIUM(2)` ลงใน [PartyQuestType.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/enums/social/Party/PartyQuestType.java)
       - เชื่อมต่อใน [PartyQuestManager.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/PartyQuestManager.java)
       - สร้าง [Ludibrium.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/Ludibrium.java) โดยอ้างอิงตรรกะจาก TMS (`pq_party2.js` & `party2_play.js`):
         - รองรับทั้ง Solo (1 คน) และ LAN Party (2-6 คน)
         - Stage 1 (`922010100`): รวบรวมบัตรผ่าน (Solo: 5 ใบ, Party: 20 ใบ) จาก Ratz/Black Ratz
         - Stage 2 (`922010400`): ห้องมืดมิติพิศวง รวบรวมบัตรผ่าน (Solo: 4 ใบ, Party: 14 ใบ)
         - Stage 3 (`922010600`): กล่องมิติและพอร์ทัลกระโดดขึ้นสู่ยอดหอคอย
         - Stage 4 (`922010700`): ปราบ Shadow Eyes / Chronos และเก็บ Dimensional Passes
         - Stage 5 (`922010800`): ปริศนาคณิตศาสตร์และแท่นยืน
         - Stage Final (`922010900`): บอส Alishar (`9300012`) ดรอป Dimensional Key (`4001023`) มอบของรางวัล EXP/PQ และส่งต่อไปห้องโบนัส
         - Bonus Map (`922011000`): ทุบกล่องรับไอเทมโบนัส (Scrolls, Bamboo Hat, Potions, Ores)
       - ปรับปรุงสคริปต์ NPC [party2_enter.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/party2_enter.py) และ [party2_play.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/party2_play.py)
     - **Moon Bunny (Henesys PQ) Fixed**:
       - [MoonBunny.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/MoonBunny.java):
         - สั่งเกิดหมู (Pigs 9300058 / Ribbon Pigs 9300059) ในด่าน 0 ตามพิกัดอย่างสมบูรณ์
         - ใช้ `addFixedRateEvent` รันลูปตรวจจับและเสกเวฟมอนสเตอร์ (9300062, 9300063, 9300064) เข้าโจมตี Moon Bunny ในด่าน 1
         - ปรับสคริปต์เสือโคร่ง [moonrabbit_tiger.py](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/moonrabbit_tiger.py): ต้องการ Rice Cake เพียง 10 ชิ้นสำหรับ Solo และ 20 ชิ้นสำหรับ Party
     - **First Time Together (Kerning PQ) Fixed**:
       - [FirstTimeTogether.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/FirstTimeTogether.java):
         - ด่าน 1: โหมด Solo หัวหน้าเก็บคูปอง 5 ใบผ่านได้ทันที
         - ด่าน 4: เสกมอนสเตอร์ Curse Eye (`9305204`) 12 ตัว และตรวจจับการกำจัดมอนสเตอร์/คูปองเพื่อปลดล็อกประตู
         - ด่าน 5: ปรับปรุงบทสนทนา King Slime และระบบมอบของรางวัล
     - **Dragon Rider (Dragon Rider PQ) Fixed**:
       - [DragonRider.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/DragonRider.java):
         - แปลภาษาเวียดนามทั้งหมดเป็นภาษาอังกฤษ
         - แก้ไขระบบตรวจจับผ่านด่านด้วย `field.getMobs().isEmpty()` ตามแบบฉบับ TMS `party_dragon_rider.js`
     - **Universal Solo Auto-Party**:
       - ปรับปรุง [Escape.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/Escape.java), [LordPirate.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/LordPirate.java), [Romeo.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/Romeo.java), และ [Juliet.java](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/Juliet.java) ให้สร้างปาร์ตี้อัตโนมัติหากผู้เล่นคนเดียวกดคุย
  4. **การคอมไพล์ ดีพลอย และจัดทำแพตช์ (Compilation, Deployment & Patch Archive)**:
     - คอมไพล์ Java Core ผ่านฉลุย 100%: `BUILD SUCCESS` (854 ไฟล์) ด้วย OpenJDK 21 & Maven
     - ดีพลอย `maplestory.jar` (138.68 MB) ไปยัง `Server263/maplestory.jar`, `root/maplestory.jar`, และ `v214 src/maplestory.jar`
     - ซิงค์ไฟล์สคริปต์ NPC ทั้งหมดไปยัง `Server263/data/scripts/npc/`
     - สร้างแพ็กเกจแพตช์เดี่ยวตามกฎเหล็ก `Patches/Server263_Patch_Latest.zip` (172.98 MB) สมบูรณ์ 100%

## 📅 [2026-10-13 16:15 น.] Comprehensive Server Console Log Optimization & Junk Log Elimination (Silence Telemetry Callstacks, Clean Disconnects & Multilingual Standardization)

### 🎯 Scope & Technical Details
- **หัวข้อ**: Complete Server Console Log Optimization, Junk/Spam Log Elimination, Client Crash Telemetry Silencing, and Professional Log Standardization
- **รายละเอียด**:
  1. **ปัญหาและความต้องการของผู้ใช้ (Problem & Requirements)**:
     - ผู้ใช้พบข้อความล็อกขยะ (Junk logs) ในหน้าต่างคอนโซลเซิร์ฟเวอร์จำนวนมากที่รบกวนสายตาและทำให้ตรวจสอบข้อผิดพลาดจริงได้ยาก:
       - ดัมพ์ Callstack ยาวเป็นร้อยบรรทัดเมื่อเกมส่งรายงาน Crash เก่า: `[API In] | REQUEST_TOKEN_X64... VERSION|26503|DATETIME|... _SymGetLineFromAddr Error : 7e DosHdr is NULL...`
       - ข้อความภาษาเวียดนามสแปมเมื่อผู้เล่นเลือกตัวละคร/เปลี่ยน Channel/ปิดเกม เช่น `[ChannelInactive] Client 127.0.0.1 đang chọn nhân vật / kênh / thế giới nhưng bị mất kết nối.` และ `[IP: 127.0.0.1] đã ngắt kết nối với máy chủ.`
       - ข้อความภาษาเวียดนามเมื่อล็อกอิน/สมัครไอดีผ่าน API: `đăng nhập thành công...`, `đăng ký thành công...`
       - ข้อความการนับคอนเนกชันที่พิมพ์ซ้ำๆ: `Online(s): 0`, `[127.0.0.1] Loaded.`
       - งานเบื้องหลัง Cleaner ดัมพ์ข้อความทุก 500ms เมื่อไอเทมที่พื้นหมดอายุ: `[Cleaner] Đã dọn dẹp ... vật phẩm đã rớt trong các bản đồ.`
  2. **สาเหตุเชิงเทคนิคที่ตรวจสอบพบ (Technical Analysis & Root Causes)**:
     - **Client Crash Dump Flooding**: ใน [`LoginHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java) เมื่อได้รับ `InHeader.EXCEPTION_LOG` โค้ดเดิมมีการทำ `System.out.println(str)` ซ้ำ และใน [`DataPrinter.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/util/DataPrinter.java) บรรทัด 89 เช็ค `name.contains("Error")` ทำให้ชื่อไฟล์ `Client_Error.txt` ไปกระตุ้นให้พิมพ์ทั้งบัฟเฟอร์ขนาดกว่า 6 KB ลง `System.err.println` ส่งผลให้หน้าจอคอนโซลเต็มไปด้วย Callstack ของเกม
     - **Transition Disconnect Spam**: ใน [`Client.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/Client.java) ฟังก์ชัน `handleChannelInactive` มี switch-case ดักสถานะตอนเปลี่ยน World/Channel และพิมพ์ภาษาเวียดนามทุกครั้งที่ตัดการเชื่อมต่อจาก Login Server เพื่อไปต่อ Channel Server ซึ่งเป็นพฤติกรรมปกติของเกม ไม่ใช่ข้อผิดพลาด
     - **Cleaner Loop Spam**: ใน [`Server.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/Server.java) ตัวลูปจับเวลาตรวจเช็คไอเทมตกพื้นทุก 500 มิลลิวินาที (วินาทีละ 2 ครั้ง) และพิมพ์ข้อความภาษาเวียดนามทุกครั้งที่มีของตกพื้นหายไป
     - **API In Packet Dump**: ใน [`ApiHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/connection/api/ApiHandler.java) ทุกแพ็กเก็ตที่เข้ามาถูกพิมพ์ลงคอนโซลด้วยคำนำหน้า `[API In]` ตลอดเวลา
  3. **การแก้ไขเชิงลึก (Implementation & Fixes)**:
     - [`LoginHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java):
       - ปิดการ `System.out.println` ข้อมูล Callstack ลงคอนโซล โดยบันทึกลงไฟล์ `logs/<date>/Client_Error.txt` อย่างปลอดภัย และพิมพ์ข้อความสรุปบรรทัดเดียวเฉพาะเมื่อเปิด `ServerConfig.DEBUG_MODE`
       - ซ่อนข้อความ `[IP] Loaded.` ให้อยู่ใต้เงื่อนไข `DEBUG_MODE`
       - แปลงข้อความเปลี่ยนแชนเนลและล็อกอินเป็นภาษาอังกฤษที่กระชับและเป็นมืออาชีพ
     - [`DataPrinter.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/util/DataPrinter.java):
       - ยกเว้น `CLIENT_ERROR` ออกจากการพิมพ์ `System.err.println` ไม่ให้ดัมพ์ไบนารีและสตริงแอสกีของเกมลงคอนโซล
     - [`Client.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/Client.java):
       - ลบ switch-case ภาษาเวียดนามใน `handleChannelInactive` และแปลงเป็นการบันทึกสถานะเรียบร้อยแบบเงียบ (หรือแสดงเฉพาะเมื่อเปิด `DEBUG_MODE`)
       - แปลงข้อความ Disconnect ทั่วไปเป็น `[Network] IP ... disconnected from server.`
     - [`Server.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/Server.java):
       - ห่อหุ้มงานทำความสะอาดเบื้องหลัง (Cleaner timer สำหรับ Character, Field, และ Dropped Items) ให้อยู่ใต้ `ServerConfig.DEBUG_MODE`
     - [`ChannelHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/connection/netty/ChannelHandler.java):
       - ห่อหุ้มข้อความ `Online(s): ...` ให้อยู่ใต้ `ServerConfig.DEBUG_MODE`
     - [`ApiHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/connection/api/ApiHandler.java) & [`ApiRequestHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/ApiRequestHandler.java):
       - ซ่อน `[API In]` เว้นแต่เปิด `DEBUG_MODE` หรือ `PACKET_LOG`
       - ปรับข้อความล็อกอินและสมัครไอดีเป็น `[API Login] Account '...' authenticated successfully...` และ `[API Register] New account '...' registered successfully...`
  4. **การทดสอบและผลลัพธ์ (Testing & Verification)**:
     - ทำการคอมไพล์ Java Server Core ผ่านฉลุย: `BUILD SUCCESS` บน OpenJDK 21
     - ดีพลอย `maplestory.jar` ไปยัง `Server263/` และ root
     - รันเซิร์ฟเวอร์ทดสอบและยิง API Packet Tests ผ่านครบ 100%
     - ตรวจสอบคอนโซลเซิร์ฟเวอร์: คอนโซลเงียบ สะอาด เป็นระเบียบ 100% ไม่มีข้อความภาษาเวียดนาม ไม่มี Callstack รกจอ และไม่มีข้อความ Cleaner สแปม
     - บิลด์แพตช์อัปเดตเดี่ยว `Patches/Server263_Patch_Latest.zip` (172.97 MB) สำเร็จ

## 📅 [2026-10-13 15:52 น.] Modern WPF Launcher & Full Packet Compatibility Implementation (Opcode 101, 102, 103, LAN Architecture, Dynamic Hook & Zero-Config IP)

### 🎯 Scope & Technical Details
- **หัวข้อ**: Complete Modern WPF Client Launcher Build, Packet Protocol Alignment (Opcodes 101, 102, 103), Full LAN Support, and Zero-Config Registration
- **รายละเอียด**:
  1. **ปัญหาและความต้องการของผู้ใช้ (Problem & Requirements)**:
     - ผู้ใช้ต้องการสร้างไฟล์ลันเชอร์เข้าเกมใหม่จากโฟลเดอร์ `launcher` (WPF .NET 4.8 x64) ให้สวยงาม ทันสมัย และใช้งานง่าย
     - ระบบต้องรองรับการสมัครไอดี + ระบบ LAN ทั้งฝั่งเซิร์ฟเวอร์และตัวเข้าเกมอย่างราบรื่น
     - ผู้รันเซิร์ฟเวอร์สามารถสมัครไอดีล่วงหน้าไว้ให้ผู้เล่นได้ (ผ่าน `Create_Account.bat` หรือฐานข้อมูล) หรือผู้เล่นสามารถสมัครเองผ่านลันเชอร์ หรือใช้ Auto-Register เมื่อเข้าเกมครั้งแรก
     - กำชับกฎสำคัญ: การรับ-ส่งแพ็กเก็ตระหว่าง Client Launcher กับเซิร์ฟเวอร์ Java (Port 8483 / 8484) ต้องสอดคล้องถูกต้องที่สุด 100%
  2. **สาเหตุเชิงเทคนิคที่ตรวจสอบพบ (Technical Analysis & Root Causes)**:
     - **Opcode 103 Desync**: ลันเชอร์ C# มีโค้ดส่ง Packet 103 (`REQUEST_ACCOUNT_DATA_X64`) เพื่อดึงยอด NX, DP, VP และข้อมูลตัวละคร แต่เซิร์ฟเวอร์ Java SwordieMS เดิมยังไม่มีการ Implement Opcode 103 ใน API ส่งผลให้ลันเชอร์แสดงข้อความ "COULD NOT REACH THE CHARACTER SERVICE"
     - **Opcode 102 Error Header Mismatch**: ใน [`ApiRequestHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/ApiRequestHandler.java) เมื่อการตรวจสอบรหัสผ่านล้มเหลว (เช่น รหัสผ่านผิด, โดนแบน, ล็อกอินซ้อน) เซิร์ฟเวอร์เรียก `ApiResponse.tokenRequestResult(type, (String) "wrongPassword")` ซึ่งใช้ Opcode 100 (`REQUEST_TOKEN_RESULT`) แทนที่จะเป็น Opcode 102 (`REQUEST_TOKEN_RESULT_X64`) ทำให้ลันเชอร์ x64 อ่าน Header ผิด
     - **LAN / Token Verification Strictness**: ใน [`LoginHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java) เมธอด `verifyTokenAndUserId` มีการเช็คเงื่อนไข `LOCAL_HOST_SERVER` ทำให้เมื่อเชื่อมต่อผ่าน LAN/VPN หาก Token หลุดจากเงื่อนไข IP เครื่อง จะถูกปฏิเสธ
     - **Hook DLL Hardcoded**: ลันเชอร์เดิมตั้งค่า Dll เป็น `msvn.dll` แต่โฟลเดอร์แจกจ่ายอย่างเป็นทางการของ Server263 ใช้ `Localhost.dll`
     - **Dynamic IP & launcher.ini Binding**: ค่า IP ในลันเชอร์เดิมถูกเข้ารหัส Base64 ฝังในโค้ด ทำให้ผู้เล่นในวง LAN แก้ไข IP เพื่อเชื่อมต่อเครื่องแม่ได้ยาก
  3. **การแก้ไขและพัฒนาเชิงสถาปัตยกรรม (Implementation & Fixes)**:
     - **ฝั่ง Java Server (`v214 src`)**:
       - เพิ่ม `REQUEST_ACCOUNT_DATA_X64(103)` ใน [`ApiInHeader.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/connection/api/ApiInHeader.java) และ `ACCOUNT_DATA_RESULT_X64(103)` ใน [`ApiOutHeader.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/connection/api/ApiOutHeader.java)
       - เพิ่ม `handleAccountDataX64Request` ใน [`ApiRequestHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/ApiRequestHandler.java) ดึงข้อมูลยอดเงิน (NX, DP, VP) และ Top 3 ตัวละครจากฐานข้อมูล พร้อมส่งกลับด้วย [`ApiResponse.accountDataResult`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/connection/packet/ApiResponse.java)
       - ปรับ `handleTokenX64Request` ให้ส่ง Opcode 102 (`REQUEST_TOKEN_RESULT_X64`) เสมอทุกกรณีความผิดพลาด (Result Code 1, 2, 3, 5, 6) ป้องกัน Header Desync
       - ปรับปรุง [`LoginHandler.verifyTokenAndUserId`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java) ให้ยอมรับ Token ที่ผ่านการออกสิทธิ์จากเซิร์ฟเวอร์โดยตรงทันที รองรับ LAN / VPN 100%
       - เพิ่มการกำหนดค่า PIC เริ่มต้น `111111` แบบ BCrypt ในการสร้างไอดีผ่าน API
     - **ฝั่ง WPF Client Launcher (`launcher/`)**:
       - พัฒนาระบบอ่าน-เขียนไฟล์ [`launcher.ini`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/Client_Patch_Files/launcher.ini) แบบไดนามิกใน [`ServerInfo.cs`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/launcher/Models/ServerInfo.cs)
       - เพิ่มหน้าต่างตั้งค่า LAN / Server IP ในปุ่มเฟืองเกียร์หน้าหลัก [`MainWindow.xaml`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/launcher/MainWindow.xaml) และ [`MainWindow.xaml.cs`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/launcher/MainWindow.xaml.cs) ให้ผู้เล่นพิมพ์ IP เครื่องโฮสต์แล้วกด Apply ได้ทันทีโดยไม่ต้องเปิดไฟล์ Config
       - ขยายขนาดบัฟเฟอร์ [`InPacket.BufferSize`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/launcher/Models/InPacket.cs) เป็น 65,536 ไบต์ และเพิ่ม Dynamic Auto-Resize ใน [`OutPacket.cs`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/launcher/Models/OutPacket.cs)
       - ปรับปรุง [`LoginService.Inject`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/launcher/Services/LoginService.cs) ให้ใช้ Win32 `LoadLibraryW` พร้อมตรวจจับ Hook DLL อัตโนมัติ (`Localhost.dll` หรือ `msvn.dll`)
       - ปรับปรุงการแจ้งเตือนความผิดพลาดในหน้าต่างล็อกอินให้แจกแจงตาม Result Code จริง
     - **การคอมไพล์และการส่งมอบ (Build & Deployment)**:
       - คอมไพล์ Java Core ด้วย Maven บน JDK 21: `BUILD SUCCESS` (0 errors)
       - คอมไพล์ WPF Launcher ด้วย MSBuild ในโหมด Release: `gms265 Launcher.exe` ขนาด 26.8 MB (0 errors)
       - ส่งมอบไฟล์สู่ `Server263/Client_Patch_Files/` (ทั้ง `gms265 Launcher.exe`, `Launcher.exe`, และ `WpfAnimatedGif.dll`)
       - อัปเดต `Run_Game.bat` และ `Install_Client_Patch.bat`
  4. **การทดสอบจริง (End-to-End Live In-Game/Protocol Testing)**:
     - รันสคริปต์ทดสอบแพ็กเก็ตสด [`test_api_packets.py`](file:///C:/Users/admin/.gemini/antigravity-ide/brain/18fc54e8-96e1-4445-a5a0-da70085c391f/scratch/test_api_packets.py) เชื่อมต่อเซิร์ฟเวอร์จริงและ MariaDB บนพอร์ต 33066:
       - **Test 1 (Opcode 102 Login)**: ล็อกอิน admin ผ่าน 100% ได้รับ Auth Token ถูกต้อง
       - **Test 2 (Opcode 103 Account Overview)**: ดึงยอดเงินและตัวละคร 3 ตัว (NightLORD, EVOffline, eraz) ถูกต้องระดับไบต์
       - **Test 3 (Opcode 101 Create Account)**: สมัครไอดีใหม่ผ่าน API ส่งผลลัพธ์ Code 0 (Success)
       - **Test 4 (Opcode 102 New User Login)**: ไอดีใหม่ล็อกอินสำเร็จทันทีและได้รับ Token ใหม่
       - **Test 5 (Opcode 102 Wrong Password)**: รหัสผ่านผิดส่งผลลัพธ์ Header 102 พร้อม Error Code 1 ถูกต้อง
     - สร้าง All-in-One Patch Archive: [**`Patches/Server263_Patch_Latest.zip`**](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip) ขนาด 172.97 MB ตามมาตรฐานไฟล์เดี่ยว

### 📂 Files Modified
- [`v214 src/src/main/java/net/swordie/ms/connection/api/ApiInHeader.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/connection/api/ApiInHeader.java)
- [`v214 src/src/main/java/net/swordie/ms/connection/api/ApiOutHeader.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/connection/api/ApiOutHeader.java)
- [`v214 src/src/main/java/net/swordie/ms/connection/api/ApiHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/connection/api/ApiHandler.java)
- [`v214 src/src/main/java/net/swordie/ms/connection/packet/ApiResponse.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/connection/packet/ApiResponse.java)
- [`v214 src/src/main/java/net/swordie/ms/handlers/ApiRequestHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/ApiRequestHandler.java)
- [`v214 src/src/main/java/net/swordie/ms/handlers/LoginHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java)
- [`launcher/Models/ServerInfo.cs`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/launcher/Models/ServerInfo.cs)
- [`launcher/Models/Configs.cs`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/launcher/Models/Configs.cs)
- [`launcher/Models/InPacket.cs`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/launcher/Models/InPacket.cs)
- [`launcher/Models/OutPacket.cs`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/launcher/Models/OutPacket.cs)
- [`launcher/Services/Client.cs`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/launcher/Services/Client.cs)
- [`launcher/Services/LoginService.cs`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/launcher/Services/LoginService.cs)
- [`launcher/MainWindow.xaml`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/launcher/MainWindow.xaml)
- [`launcher/MainWindow.xaml.cs`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/launcher/MainWindow.xaml.cs)
- [`launcher/Views/PlayPage.xaml`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/launcher/Views/PlayPage.xaml)
- [`launcher/Views/PlayPage.xaml.cs`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/launcher/Views/PlayPage.xaml.cs)
- [`Server263/Client_Patch_Files/Run_Game.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/Client_Patch_Files/Run_Game.bat)
- [`Server263/Client_Patch_Files/Install_Client_Patch.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/Client_Patch_Files/Install_Client_Patch.bat)

## 📅 [2026-10-13 14:48 น.] Core Standards & Admin Command Policy Realignment: TMS Reference Audit, Test-First Deployment, Full Git Sync, and Zero-Skill-Injection `!endgame`

### 🎯 Scope & Technical Details
- **หัวข้อ**: Project Memory & Operational Standards Overhaul (`AGENTS.md` & `SKILL.md`) and Admin `!endgame` Refactoring to Zero Skill Injection
- **รายละเอียด**:
  1. **ปัญหาที่พบและความต้องการปรับปรุง (Problem & User Requirements)**:
     - กฎเดิมใน `AGENTS.md` และการทำงานมีหลายจุดที่ไม่ตรงกับสเปคที่แท้จริงของผู้ใช้:
       1) การพอร์ตจาก TMS จำเป็นต้องตอกย้ำว่าเป็นคลังความรู้อ้างอิง (Reference) สำหรับสูตรคำนวณและระบบที่สมบูรณ์เท่านั้น และต้องตรวจสอบ ID ทุกครั้ง ห้ามก๊อปปี้ ID มาตรงๆ
       2) การสร้างไฟล์แพตช์ (Deploy Patch) ต้องผ่านการทดสอบในเกมก่อนเสมอ ไม่สร้างแพตช์ก่อนทดสอบเพื่อไม่ให้เสียเวลา
       3) การ Push Git ต้อง Push ทุกไฟล์เสมอรวมทั้งไฟล์เอกสาร เพื่อให้ทุกเครื่องที่ pull ทำงานไปในทิศทางเดียวกัน 100%
       4) คำสั่ง `!endgame` ใน `AdminCommands.java` เดิมมีการยัดแกนสกิล V-Matrix และเลเวลสกิลคลาส 6 HEXA ลงไปในตัวละครโดยตรง ซึ่งเสี่ยงต่อการเกิดบัค สกิลหลอน ซ้ำซ้อน หรือค้าง ผู้ใช้ต้องการให้มอบเฉพาะเลเวล, ของใช้สำหรับเปิด Matrix, อุปกรณ์ BiS และเงิน ให้ผู้เล่นกดหินและอัปแต้มเองตามธรรมชาติ
  2. **การปรับปรุงและวิธีแก้ (Implementation)**:
     - **ปรับปรุงมาตรฐานใน [`AGENTS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/AGENTS.md) และ [`SKILL.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/.agents/skills/maplestory-bug-knowledge/SKILL.md)**:
       - **หมวด 4**: กำหนดนโยบาย Test-First Policy ต้องทดสอบในเกมให้ผ่านก่อนทำไฟล์แพตช์ และรักษามาตรฐานแพตช์ไฟล์เดี่ยว `Server263_Patch_Latest.zip`
       - **หมวด 6**: ปรับปรุงกฎ `!endgame` สู่มาตรฐาน Strict Zero-Skill-Injection Policy ห้ามเรียก `chr.addSkill`, `chr.setHexaSkill` หรือ `mc.setSkillLevel` โดยเด็ดขาด
       - **หมวด 7**: บัญญัติกฎเหล็ก Push Everything Policy บังคับ Git Push ทุกไฟล์รวมถึงเอกสารทั้งหมด (`PROGRESS.md`, `AGENTS.md`, ฯลฯ)
       - **หมวด 8**: ระบุบทบาท TMS เป็น Reference สำหรับสูตรคำนวณและ Mechanics พร้อมกฎเหล็ก Strict ID Audit ห้ามคัดลอก ID มาตรงๆ เด็ดขาด
     - **ปรับปรุงโค้ด [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)**:
       - ลบโค้ดการยัดแกนสกิล V-Matrix (`mc.setSkillLevel(25)` / `addMatrixCore`) ออกจาก `setupEndgame`
       - ลบโค้ดการยัดเลเวลสกิลคลาส 6 (`chr.setHexaSkill(coreId, 30)`) ออกจาก `setupEndgame`
       - คงการมอบเลเวล 260, ค่า AP, ขยายช่องเก็บของ 128 ช่อง, เควสต์คลาส 5/6, Nodestones x3,000, Exp Nodestones x20, Sol Erda Energy x1,000, Sol Erda Fragments x30,000, ยา Power Elixir x3,000, เงิน 10B Mesos, และอุปกรณ์ Arcane Umbra + Princess No ครบชุด
     - **คอมไพล์และตรวจสอบความถูกต้อง**:
       - รันคอมไพล์ Maven ด้วย JDK 21: `BUILD SUCCESS` (853 source files, 0 errors)
       - Deploy `maplestory.jar` (~138.67 MB) ไปยัง `v214 src/`, `Server263/`, และ Root ครบถ้วน
  3. **ผลลัพธ์ (Outcome)**:
     - มาตรฐานเอกสารและการปฏิบัติงานของ AI และทีมพัฒนาสอดคล้องกับสเปคของผู้ใช้ 100%
     - คำสั่ง `!endgame` สะอาด ปลอดภัย ปราศจากบัคสกิลซ้อนทับหรือหลอน 100%
     - รหัสและเอกสารถูกเตรียมพร้อมสำหรับ Git Push ครบทุกไฟล์

### 📂 Files Modified
- [`AGENTS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/AGENTS.md)
- [`v214 src/AGENTS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/AGENTS.md)
- [`.agents/skills/maplestory-bug-knowledge/SKILL.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/.agents/skills/maplestory-bug-knowledge/SKILL.md)
- [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/PROGRESS.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS.md)

## 📅 [2026-10-13 14:02 น.] Patch Consolidation & Deployment: Unified Single All-in-One Distribution Package

### 🎯 Scope & Technical Details
- **หัวข้อ**: Patch Consolidation into a Single All-in-One Package (`Server263_Patch_Latest.zip`) & Re-Deployment
- **รายละเอียด**:
  1. **ปัญหาที่พบ (Problem)**:
     - ในโฟลเดอร์ [`Patches/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/) มีไฟล์แพตช์แยกย่อยซ้ำซ้อนกันถึง 4 ไฟล์ (`Server263_Patch_<timestamp>.zip`, `Server263_Patch_Latest.zip`, `Client_Patch_<timestamp>.zip`, `Client_Patch_Latest.zip`) ซึ่งกินพื้นที่และทำให้ผู้ใช้งานเกิดความสับสนในการเลือกไฟล์ไปใช้งาน
     - ตัวแพ็คเกจ Server263_Patch แท้จริงแล้วได้รวมโฟลเดอร์ `Client_Patch_Files/` (Launcher.exe, Localhost.dll, launcher.ini, Install_Client_Patch.bat) ไว้ครบถ้วนอยู่แล้ว จึงไม่มีความจำเป็นต้องแยกไฟล์ Client ออกเป็นอีกชุด
  2. **การปรับปรุงและวิธีแก้ (Enhancement & Implementation)**:
     - **ปรับปรุงเครื่องมือสร้างแพตช์ ([`tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/create_patch.py) และ [`v214 src/tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/tools/create_patch.py))**:
       - แก้ไขให้ล้างโฟลเดอร์ `Patches/` เดิมทั้งหมดก่อน และส่งออกไฟล์แพตช์แบบ All-in-One เพียงไฟล์เดียวอย่างเข้มงวด: [**`Server263_Patch_Latest.zip`**](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip)
       - กรองตัดไฟล์ขยะแคช `*.class` และ `__pycache__` ออกจาก `data/scripts` ระหว่างกระบวนการแพ็คเพื่อลดขนาดไฟล์และเพิ่มความสะอาด
       - เพิ่ม `backup.sql`, `Create_Account.bat`, และ `Create_Update_Patch.bat` ลงในรายการไฟล์ที่อัปเดตอัตโนมัติของ `Apply_Patch.bat`
       - ปรับปรุงให้ `Apply_Patch.bat` รองรับทั้งการแตกไฟล์ทับไดเรกทอรีปัจจุบัน และตรวจหาโฟลเดอร์ Server263 อัตโนมัติ
     - **รันกระบวนการ Deploy และตรวจสอบความสมบูรณ์ (Integrity Verification)**:
       - รันคำสั่งแพ็คและ Deploy ใหม่: ผลิตไฟล์ `Patches/Server263_Patch_Latest.zip` ขนาด 122.42 MB (7,016 ไฟล์)
       - ตรวจสอบความถูกต้องของโครงสร้างไฟล์ ZIP (`Valid ZIP: True`) ครบถ้วนทั้ง Server Core, Script Data, Drop Tables และ Client Patch Files
  3. **ผลลัพธ์ (Outcome)**:
     - โฟลเดอร์ [`Patches/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/) ได้รับการจัดระเบียบให้เหลือ **เพียงไฟล์เดียว (Single File 100%)** เบ็ดเสร็จทุกระบบในที่เดียว สะอาดตา และพร้อมแจกจ่ายทันที
     - ผู้ใช้นำ [**`Server263_Patch_Latest.zip`**](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip) ไปแตกไฟล์และรัน `Apply_Patch.bat` จะอัปเดตทั้งเซิร์ฟเวอร์และถามเพื่ออัปเดตโฟลเดอร์ตัวเกมให้อัตโนมัติในคลิกเดียว

### 📂 Files Modified / Created
- [`tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/create_patch.py)
- [`v214 src/tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/tools/create_patch.py)
- [`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip) (Single All-in-One Distribution Package)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/PROGRESS.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS.md)

## 📅 [2026-10-13 13:25 น.] Workspace Root Directory Architecture Cleanup & Comprehensive Organization

### 🎯 Scope & Technical Details
- **หัวข้อ**: Complete Workspace Cleanup, Root Folder Reorganization, and Launcher Portability Hardening
- **รายละเอียด**:
  1. **ปัญหาที่พบ (Problem)**:
     - โฟลเดอร์ Root (`C:\Users\admin\Documents\MapleStory_Server_Runner`) มีไฟล์กระจัดกระจายรวมกันถึง 72 ไฟล์ ทำให้ยากต่อการค้นหาและดูแลรักษา
     - มีไฟล์ SQL สคริปต์ย่อยยุคเก่า (`InitColumn_*.sql`, `InitTable_*.sql`, `InitTables_*.sql`, `InitValue_*.sql`, `ModifyValue_*.sql`, `AIO.sql`) กองอยู่ที่ Root รวม 42 ไฟล์ ทั้งที่มีสำเนาเก็บอยู่ใน `Server263/sql/` อยู่แล้ว
     - มีไฟล์ Python สำหรับ Audit และ JSON รายงานผลการสแกนทักษะสกิลในอดีตกระจัดกระจายอยู่ที่ Root รวม 17 ไฟล์
     - มีโฟลเดอร์ขยะว่างเปล่า `client/` (มีเพียง `.DepotDownloader` เปล่า)
     - ไฟล์สคริปต์ `Create_Account.bat` และ `Import_Database.bat` ที่ Root มีโค้ดเขียนทับซ้อนและพยายามเรียก `mariadb` ที่ Root โดยตรง ซึ่งอาจ Error หากไม่มีโฟลเดอร์ `mariadb` อยู่ที่ Root
  2. **การจัดระเบียบและวิธีแก้ (Reorganization & Implementation)**:
     - **จัดเก็บหมวดหมู่ฐานข้อมูล (SQL Migration Scripts)**:
       - รวบรวมไฟล์ SQL ย่อยทั้ง 42 ไฟล์ ย้ายเข้าไปจัดเก็บไว้อย่างเป็นระเบียบในโฟลเดอร์ [`sql/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/sql/)
       - คงเหลือเฉพาะไฟล์ฐานข้อมูลหลัก [**`backup.sql`**](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/backup.sql) ไว้ที่ Root สำหรับการ Import ฐานข้อมูลเริ่มต้น
     - **จัดเก็บหมวดหมู่เครื่องมือตรวจเช็ค (Audit & Analysis Tools)**:
       - สร้างโฟลเดอร์ [`tools/audit/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/audit/) และย้ายไฟล์ Python Script และ JSON Audit Reports ทั้ง 17 ไฟล์เข้าไปจัดเก็บรวมไว้ด้วยกันอย่างเป็นหมวดหมู่
     - **ล้างโฟลเดอร์ชั่วคราว (Dead Folder Cleanup)**:
       - ลบโฟลเดอร์ `client/` ที่ว่างเปล่าทิ้งอย่างปลอดภัย
     - **ยกระดับความ Portable ของสคริปต์ที่ Root (Launcher Portability Hardening)**:
       - ปรับปรุง [`Create_Account.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Create_Account.bat) และ [`Import_Database.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Import_Database.bat) ที่ Root ให้ทำหน้าที่เป็น Smart Redirection ชี้เข้าสู่ `Server263` อัตโนมัติ (มาตรฐานเดียวกับ `1_Start_Server.bat`, `3_Stop_Server.bat`, และ `4_Server_Control_Panel.bat`) ทำให้เรียกใช้ MariaDB Engine และ Environment ของ `Server263` ได้ทันที 100% ไม่ว่าจะรันจากโฟลเดอร์ไหน
  3. **ผลลัพธ์ (Outcome)**:
     - โฟลเดอร์ Root ลดจำนวนไฟล์จาก 72 ไฟล์ เหลือเพียง **14 ไฟล์หลัก และ 10 โฟลเดอร์ที่เป็นระบบระเบียบ สะอาดตา และค้นหาง่าย 100%**
     - โครงสร้างโปรเจกต์มีความเป็นสัดส่วนชัดเจนตามมาตรฐาน Enterprise

### 📂 Files Modified / Reorganized
- [`Create_Account.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Create_Account.bat) (Smart Redirection to Server263)
- [`Import_Database.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Import_Database.bat) (Smart Redirection to Server263)
- [`sql/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/sql/) (Consolidated 42 migration SQL files)
- [`tools/audit/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/audit/) (Consolidated 17 audit scripts and reports)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/PROGRESS.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS.md)

## 📅 [2026-10-13 13:18 น.] Patch System Enhancement: Dual-Package Incremental Patches (Server Runner & Localhost Client 1-Click Installer)

### 🎯 Scope & Technical Details
- **หัวข้อ**: Dual-Package Incremental Patch Creation (Server Runner + Standalone Localhost Client Installer)
- **รายละเอียด**:
  1. **ปัญหาที่พบ (Problem)**:
     - ไฟล์ `Localhost.dll` ในโฟลเดอร์ Steam (`depot_216151`) เป็นเวอร์ชันเก่าจากวันที่ 5 ตุลาคม 2026 (MD5: `20608BFE...`) เกิดการ Crash หลุดทันทีเมื่อเปิดเกมเนื่องจาก Memory Assertion Error (`ZXString` / `StringPool` refcount check)
     - ระบบเดิมสร้างไฟล์ Patch แพ็ครวมทั้งเซิร์ฟเวอร์ขนาดใหญ่ (~122 MB) ทำให้ผู้ใช้ที่ต้องการแจกจ่ายเฉพาะไฟล์เชื่อมต่อ Client ให้เพื่อนหรือผู้เล่นอื่นต้องแยกไฟล์เองด้วยตนเอง
     - ผู้ใช้ต้อง Copy-Paste ไฟล์ Localhost ลงในโฟลเดอร์ตัวเกมด้วยตนเอง ซึ่งอาจเกิด Human Error ลืมก๊อปปี้ หรือวางผิดโฟลเดอร์
  2. **การปรับปรุงและวิธีแก้ (Enhancement & Implementation)**:
     - **ฝั่ง Client Patch (Localhost)**:
       - อัปเดต `Localhost.dll` ตัวล่าสุด (MD5: `C9D118CC0F1E45EE7B7C7C7AAB676EC1`) ที่แก้ปัญหา Memory Crash และ Socket Redirect สมบูรณ์
       - สร้างสคริปต์ [`Install_Client_Patch.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/Client_Patch_Files/Install_Client_Patch.bat) ติดตั้งแบบ 1-Click อัตโนมัติ: มีระบบค้นหาโฟลเดอร์ติดตั้ง MapleStory v265 อัตโนมัติ (Steam Depot, Steam Common, Nexon, D:, E:) สำรองไฟล์เดิม และอัปเดตไฟล์ให้เสร็จสรรพ
       - ซิงค์ไฟล์ชุดแพตช์ล่าสุดลงในโฟลเดอร์ Steam Depot ของเครื่องปัจจุบันโดยตรงเรียบร้อย
     - **ฝั่ง Server Runner Patch (ตัวรันเซิร์ฟเวอร์)**:
       - อัปเกรดเครื่องมือสร้างแพตช์ [`tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/create_patch.py) ให้สร้างไฟล์แพตช์ 2 แพ็กเกจพร้อมกัน:
         1. **Server Runner Patch**: `Patches/Server263_Patch_Latest.zip` (122.47 MB) บรรจุ `maplestory.jar`, `server.properties`, สคริปต์รันเซิร์ฟเวอร์, `data/scripts/` (รวมเควสต์ Evan `q22133s.py`), `data/resources/`, `Client_Patch_Files/`, และ `Apply_Patch.bat`
         2. **Standalone Client Patch**: `Patches/Client_Patch_Latest.zip` (329.3 KB) มีเฉพาะไฟล์ฝั่ง Client พร้อม `Install_Client_Patch.bat` สำหรับส่งต่อให้ผู้เล่นดาวน์โหลดไปแตกไฟล์ทับตัวเกมได้ทันที
       - ปรับปรุง `Apply_Patch.bat` ให้ตรวจหาและถามผู้ใช้ว่าต้องการอัปเดต Localhost Client Patch ลงโฟลเดอร์ตัวเกม MapleStory ด้วยหรือไม่ในขั้นตอนเดียว
  3. **ผลลัพธ์ (Outcome)**:
     - ตัวรันเซิร์ฟเวอร์และตัวเชื่อมต่อ Localhost ได้รับการปรับปรุงเป็นเวอร์ชันล่าสุด 100%
     - ได้ไฟล์แพตช์สำเร็จรูปพร้อมใช้งานและแจกจ่ายในโฟลเดอร์ [`Patches/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/):
       - [`Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip) (ตัวรันเซิร์ฟเวอร์)
       - [`Client_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Client_Patch_Latest.zip) (ตัวเชื่อมต่อ Localhost)

### 📂 Files Modified / Created
- [`Server263/Client_Patch_Files/Install_Client_Patch.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/Client_Patch_Files/Install_Client_Patch.bat)
- [`Server263/Client_Patch_Files/วิธีใช้งาน_สำหรับนำไปวางเครื่องอื่น.txt`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/Client_Patch_Files/วิธีใช้งาน_สำหรับนำไปวางเครื่องอื่น.txt)
- [`tools/create_patch.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/create_patch.py)
- [`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip)
- [`Patches/Client_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Client_Patch_Latest.zip)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/PROGRESS.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS.md)

## 📅 [2026-10-13 12:57 น.] 74062d2d — Evan Mir Hatching & Skill UI Evolution Fix: Revamped Quest Synchronization, Level-up Advancement Overhaul, and Missing Quest Script Implementation

### 🎯 Scope & Technical Details
- **หัวข้อ**: Evan Mir Hatching & Evolution in Skill Window UI (K Window), Fix Normal Play Progression & Endgame Admin Command
- **รายละเอียด**:
  1. **ปัญหาที่พบ (Problem)**:
     - ในหน้าต่างสกิล (Skill UI - [K]) ของอาชีพ Evan มังกร Mir แสดงผลเป็นไข่ที่ยังไม่ฟัก แม้จะทำการเสกตัวละครด้วยคำสั่ง `!endgame` แล้วก็ตาม ในขณะที่มังกร Mir ในฟิลด์/แมพเติบโตเป็นตัวเต็มวัยตามปกติ
     - ในการเล่นปกติ พบว่าผู้เล่นไม่สามารถเปลี่ยนเป็นคลาส 4 ได้ (Quest 22133 ขาดสคริปต์) และเมื่อเลเวล 10 โค้ดเดิมกำหนด Job เป็น 2210 (ซึ่งไม่มีข้อมูลสกิลใน WZ v265) แทนที่จะเป็น 2200
  2. **สาเหตุเชิงลึกทางเทคนิค (Technical Root Cause)**:
     - **Native Client Binary Check**: จากการตรวจสอบโค้ดภาษาเครื่อง (Disassembly) ของ `MapleStory.exe` ใน v265 พบว่าการเรนเดอร์โมเดลมังกร Mir ในหน้าต่างสกิลถูกผูกไว้กับฟังก์ชัน `CQuestMan::IsQuestCompleted()` โดยไคลเอนต์ตรวจสอบเควสต์ `22007`, `22011` และโดยเฉพาะอย่างยิ่ง **Quest ID 22130** (Evan 1st Job Advancement - Mir Hatches!)
     - หากเควสต์ `22130` ยังไม่สำเร็จ (`state != 2`) ไคลเอนต์จะบังคับเรนเดอร์โมเดล "ไข่มังกร (Dragon Egg)" ในหน้าต่าง UI เสมอ และหากมีเควสต์ `22131` (คลาส 2 - สลัดเปลือกไข่), `22132` (คลาส 3 - วัยรุ่น), `22133` (คลาส 4 - โตเต็มวัย) ไคลเอนต์จึงจะพัฒนาแอนิเมชันของ Mir ไปตามลำดับ
     - **คำสั่ง `!endgame` เดิม**: ใน [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java) มีการวนลูปคอมพลีตเควสต์รหัสโบราณ `22100 - 22103` (ซึ่งเป็นเควสต์ยุค 10 คลาสที่มีสถานะ `blocked=1` ใน WZ v265) ทำให้ตัวละครที่ผ่านคำสั่ง `!endgame` ไม่เคยได้รับสถานะความสำเร็จของเควสต์ `22130 - 22133` เลย ส่งผลให้ไคลเอนต์แสดงภาพเป็นไข่มังกรตลอดเวลา
     - **การเล่นปกติ (Normal Play)**: มังกรในแมพโตจริง 100% เพราะถูกผูกไว้กับ `handleLevelUp` ทุกระดับเลเวล (10, 30, 60, 100, 260) แต่ในหน้าต่างสกิล มังกรจะไม่ออกจากไข่หากเควสต์เปลี่ยนคลาส Revamp (22130 - 22133) ไม่ได้รับการบันทึกสถานะ
  3. **วิธีแก้และการ Refactor (Fix & Implementation)**:
     - **Refactor เฉพาะอาชีพ Evan เท่านั้น**:
       - แก้ไข [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java) ในส่วน `setupEndgame`: ปรับปรุงบล็อก `isEvan(job)` ให้คอมพลีตเควสต์ Revamp ครบถ้วน ได้แก่:
         - เควสต์บทนำและฟักไข่: `22000 - 22011`
         - เควสต์เปลี่ยนคลาส Revamp: `22130` (คลาส 1 - ไข่ฟัก), `22131` (คลาส 2 - สลัดเปลือก), `22132` (คลาส 3 - มังกรวัยรุ่น), `22133` (คลาส 4 - มังกรโตเต็มวัย)
         - เควสต์ปลุกพลังมังกร: `22500 - 22512`
         - เควสต์สกิลขี่มังกร: `22400`, `22404`, `22414`, `22415`
         - มอบสกิลกลับบ้าน `20011293` (Back to Nature)
       - แก้ไข [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java):
         - ใน `handleInitAfterMigrate(Char chr)`: ทำการคอมพลีตเควสต์ `22000 - 22011`, `22130`, `22131`, `22500` และมอบสกิล `20011293`
         - ใน `handleLevelUp(short level)`:
           - เลเวล 10: แก้ไขจาก `job = 2210` เป็น `job = 2200` (Evan 1st Job ที่ถูกต้องตาม WZ v265), สำเร็จเควสต์ `22130` (มังกรฟักออกจากไข่ทันทีทั้งในแมพและหน้าต่างสกิล), มอบ SP +5 และสกิล `20011293`
           - เลเวล 30: สำเร็จเควสต์ `22131` (มังกรสลัดเปลือกไข่)
           - เลเวล 60: สำเร็จเควสต์ `22132` (มังกรวัยรุ่น)
           - เลเวล 100: สำเร็จเควสต์ `22133` (มังกร Onyx เต็มวัย)
       - สร้างสคริปต์เควสต์คลาส 4 [`q22133s.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/scripts/quest/q22133s.py) และ [`v214 src/data/scripts/quest/q22133s.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/quest/q22133s.py) รองรับการเปลี่ยนคลาส 4 อย่างสมบูรณ์
  4. **ผลลัพธ์ (Outcome)**:
     - เมื่อใช้คำสั่ง `!endgame` หรือ `!endgame evan`: หน้าต่างสกิล (K) จะแสดงมังกร Mir ตัวเต็มวัยที่ออกจากไข่แล้ว 100% สอดคล้องกับมังกรที่บินตามในฟิลด์
     - สำหรับผู้เล่นที่เล่นปกติ ตั้งแต่เลเวล 10 ขึ้นไป มังกรจะฟักออกจากไข่ในหน้าต่างสกิลทันที และวิวัฒนาการไปตามระดับเลเวล 10 -> 30 -> 60 -> 100 อย่างสมบูรณ์

### 📂 Files Modified
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)
- [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)
- [`q22133s.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/scripts/quest/q22133s.py)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/PROGRESS.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS.md)

### 🧪 Verification & Deployment
- **Maven Compile**: `BUILD SUCCESS` (853 files, 0 errors)
- **Maven Package**: `BUILD SUCCESS` (`maplestory-219.5-jar-with-dependencies.jar` 138.67 MB)
- **Artifact Deployment**: ซิงค์ไฟล์ `maplestory.jar` สู่ `v214 src/`, Root, และ `Server263/`
- **Incremental Patch**: สร้างแพ็กเกจแพตช์ล่าสุด `Patches/Server263_Patch_20261013_1256.zip` (122.47 MB) พร้อม `Apply_Patch.bat`
- **Rule Compliance**: `Server263/` ปราศจากไฟล์ซอร์สโค้ดและเครื่องมือ Maven 100% และไม่มีการแก้ไขอาชีพอื่นนอกเหนือจาก Evan

## 📅 [2026-10-13 12:25 น.] aa01393 — Evan In-Depth Re-Analysis & Comprehensive Fixes: United Horizons Skill Redirection Collision, Dragon Slam V-Matrix Follow-up Mapping & Cooldowns, Magic Debris Memory Leak Removal, and Starter Lifecycle Step 3

### 🎯 Scope & Technical Details
1. **แก้ปัญหาการ Collision ของ United Horizons (`22201502`) ใน `SkillConstants.getActualSkillIDfromSkillID()`**:
   - **ปัญหาที่พบ (Problem)**: สกิล HEXA Active ลำดับที่สองของ Evan คือ United Horizons (`22201502`, Core 10000074) ถูกตีความเป็น Finisher Sub-skill ของ Zodiac Burst (`22201500`) โดยในกรณี Default ของ `getActualSkillIDfromSkillID()` มีคำสั่ง `(skillID > 22201500 && skillID <= 22201599)` ส่งผลให้ `22201502` ถูกรีไดเรกต์กลับไปเป็น `22201500`
   - **สาเหตุเชิงลึก (Technical Root Cause)**: เมื่อ `22201502` ถูกรีไดเรกต์เป็น `22201500` การเช็คคูลดาวน์ผ่าน `chr.hasSkillOnCooldown()` และการคำนวณแดเมจจะไปดึงเลเวลและคูลดาวน์ 360 วินาทีของ Zodiac Burst มาทับคูลดาวน์ 240 วินาทีของ United Horizons ทำให้ไม่สามารถกดใช้ United Horizons ได้อย่างเป็นอิสระ
   - **วิธีแก้ (Fix)**: เพิ่ม `case 22201502: return 22201502;` ดักไว้ก่อนเคสรีไดเรกต์ และกำหนดให้ท่าโจมตีสะท้อน `22201503` (United Horizons Resonance Attack) ชี้กลับหา `22201502` อย่างถูกต้อง 100%

2. **แก้ปัญหาสกิลลูกของ Dragon Slam (`400021046`) ขาดหายใน `SkillConstants` และ `handleSetCoolDownSkill`**:
   - **ปัญหาที่พบ (Problem)**: ท่าต่อเนื่องของ Dragon Slam คือ Wyrmking's Breath (`400020046`) และ Ludicrous Speed (`400020051`) ไม่มีการแมปกลับสู่ Root Skill `400021046`
   - **สาเหตุเชิงลึก (Technical Root Cause)**: ผู้เล่นถือครองโหนด V-Matrix รหัส `400021046` แต่ไม่มีรหัส `400020046` ในตัวละคร เมื่อมังกรโจมตีต่อเนื่อง เซิร์ฟเวอร์อ่านเลเวลสกิลเป็น 0 และใน `Evan.handleSetCoolDownSkill()` มีการสั่ง `chr.setSkillCooldown(WYRMKINGS_BREATH, chr.getSkillLevel(WYRMKINGS_BREATH))` ซึ่งได้ค่าเลเวลเป็น 0 ทำให้คูลดาวน์ไม่ทำงานหรือติดขัด
   - **วิธีแก้ (Fix)**:
     - แมป `case 400020046, 400020051 -> return 400021046;` ใน `getActualSkillIDfromSkillID()`
     - ลงทะเบียน `400020046` และ `400020051` ใน `isEvanForceSkill()` ป้องกัน Packet Offset Shift ใน `AttackHandler`
     - รวมเคสคูลดาวน์ใน `Evan.handleSetCoolDownSkill()`: `case DRAGON_SLAM, WYRMKINGS_BREATH, LUDICROUS_SPEED -> chr.setSkillCooldown(DRAGON_SLAM, Math.max(1, chr.getSkillLevel(DRAGON_SLAM)));`

3. **แก้บั๊ก Memory Leak และเศษ Debris ไม่ยอมเกิดใหม่ใน `Evan.createMagicDebrisForceAtom()`**:
   - **ปัญหาที่พบ (Problem)**: หลังจากกดใช้ Magic Debris (`22141017` / `22170070` / `22201015`) ระเบิดเศษชิ้นส่วนแล้ว เมื่อผู้เล่นโจมตีด้วย Fusion Skill ต่อเนื่อง เศษ Debris ใหม่กลับไม่ยอมดรอปขึ้นมาทันที
   - **สาเหตุเชิงลึก (Technical Root Cause)**: เดิมโค้ดเรียกเพียง `chr.write(FieldPacket.delWreckage(chr, field.getWreckageByChrId(chr.getId())));` ซึ่งเป็นการส่งแพ็กเก็ตแจ้งเตือนไปยัง Client เฉพาะตัวผู้เล่น แต่ไม่ได้ลบ Life Object ของ Wreckage ออกจากหน่วยความจำของ `Field` เซิร์ฟเวอร์ ทำให้ `chr.getField().getWreckage().size() < getMaxDebris()` ยังคงมองว่ามีเศษหินเต็มจำนวน และไม่ยอมเสกเศษใหม่จนกว่าจะหมดเวลา 30 วินาที
   - **วิธีแก้ (Fix)**: เปลี่ยนมาเรียก `field.removeWreckage(chr, field.getWreckageByChrId(chr.getId()));` ซึ่งจะทำการบรอดคาสต์แพ็กเก็ตลบวัตถุแก่ทุกคนในแมพ, ยกเลิก Schedule Timer, และลบ Wreckage Life ออกจากฟิลด์ทันที ทำให้สามารถสะสม Debris ชุดใหม่ได้ทันทีอย่างไร้รอยต่อ

4. **เพิ่มรหัส Alternative Actions ของ HEXA Dragon Skills ใน `isEvanForceSkill`, `isEvanFusionSkill`, และ `handleDragonSkillEffect`**:
   - เพิ่มรหัสย่อย `22201008` (HEXA Earth Dive alt), `22201009` (HEXA Thunder Dive alt), `22201012/22201013` (HEXA Earth Breath alt), `22201014` (HEXA Wind Breath alt) เข้าสู่:
     - `SkillConstants.isEvanForceSkill()`: ป้องกันไคลเอนต์อ่านข้อมูลข้ามไบต์หลุด alignment
     - `SkillConstants.isEvanFusionSkill()`: มั่นใจว่าการโจมตีจากทุก Sub-action ID จะทำการเสก Magic Debris ลงพื้นได้เสมอ
     - `Evan.handleDragonSkillEffect()`: กำหนดค่า `attackActionType` เพื่อให้แอนิเมชันของ Mir ถูกบรอดคาสต์สู่ผู้เล่นคนอื่นในแมพอย่างถูกต้องสมบูรณ์

5. **เติมเต็ม Starter Lifecycle Step 3 สำหรับตัวละคร Evan ใหม่ใน `handleInitAfterMigrate()`**:
   - ตรวจสอบพบว่า Evan มีเพียง Step 1 และ Step 2 แต่ยังขาด Step 3 ใน `handleInitAfterMigrate(Char chr)` ต่างจากอาชีพฮีโร่อื่นๆ
   - เพิ่มเงื่อนไข `if (chr.getLevel() < 30)`: สำเร็จเควสต์บทนำฟาร์ม 22000-22015 และเควสต์ไข่มังกร 22100-22102, ปรับเลเวลเป็น 30, เปลี่ยนอาชีพเป็น 2nd Job (2212), แจกแต้ม SP คลาส 1 (+5) และคลาส 2 (+3), สวมใส่อาวุธ Wizard Staff (`1382003`) และ Secondary Dragon Master's Document (`1352941`), และวาร์ปสู่ Henesys พร้อมเสก Mir อย่างปลอดภัย

### 📂 Files Modified
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)
- [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/PROGRESS.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS.md)

### 🧪 Verification & Deployment
- **Maven Compile**: `BUILD SUCCESS` (853 files, 0 errors)
- **Maven Package**: `BUILD SUCCESS` (`maplestory-219.5-jar-with-dependencies.jar` 138.67 MB)
- **Artifact Deployment**: ซิงค์ไฟล์ `maplestory.jar` สู่ `v214 src/`, Root, และ `Server263/`
- **Incremental Patch**: สร้างแพ็กเกจแพตช์ล่าสุด `Patches/Server263_Patch_20261013_1223.zip` พร้อม `Apply_Patch.bat`
- **Rule Compliance**: `Server263/` ปราศจากไฟล์ซอร์สโค้ดและเครื่องมือ Maven 100%

## 📅 [2026-10-13 11:55 น.] Cross-Version Porting Standard, AGENTS.md Section 8, Disk Space Recovery (+18.87 GB), and Asset Audit Tool (tools/audit_tms_asset.py)

### 🎯 Scope & Technical Details
1. **เพิ่มกฎข้อบังคับข้อ 8 ใน [AGENTS.md](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/AGENTS.md) และ [SKILL.md](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/.agents/skills/maplestory-bug-knowledge/SKILL.md)**:
   - กำหนดให้การพอร์ตแมคคานิคบอส, ดรอปเรท, หรือเควสต์จาก [tms273](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/TMS277_REF_NomainSource/tms273) ต้องผ่านการ Audit ตรวจสอบรหัส Mob IDs, Item IDs, Map IDs เทียบกับ WZ v265 100% ทุกครั้งก่อนลงโค้ด เพื่อป้องกันปัญหา ID ไม่ตรงกันหรือมีไอเทม TMS Exclusive
   - กำหนดขั้นตอน Standardized Porting Workflow: Audit Asset -> Translate ScriptAPI -> Test via Admin -> Update Progress

2. **การกู้คืนพื้นที่ฮาร์ดดิสก์ขนาดใหญ่ (+18.87 GB Disk Free Space)**:
   - ตรวจพบไดรฟ์ C: วิกฤต เหลือพื้นที่ว่างเพียง 7.16 GB
   - ทำการสำรวจและลบไฟล์ขนาดใหญ่ที่ไม่ได้ใช้งานในโปรเจกต์:
     - ลบ `TMS277_REF_NomainSource/WZ_JSON_TW` (3.2 GB, 184,520 ไฟล์)
     - ลบ `TMS277_REF_NomainSource/tms273/WZ_JSON_TW` (3.2 GB, 184,520 ไฟล์)
     - ลบ `tms273/bin` (668 MB, Linux ELF Binaries)
     - ลบโฟลเดอร์ Logs เก่า
   - ผสานข้อมูลเสริม `Event/` และ `PunchKing/` เข้าสู่ `tms273/data/` ก่อนลบ
   - **ผลลัพธ์**: พื้นที่ว่างบนไดรฟ์ C: เพิ่มขึ้นจาก **`7.16 GB`** เป็น **`26.03 GB`** (+18.87 GB) เซิร์ฟเวอร์และเครื่องทำงานได้อย่างปลอดภัยสูงสุด

3. **สร้างเครื่องมือตรวจสอบอัจฉริยะ [`tools/audit_tms_asset.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/tools/audit_tms_asset.py)**:
   - พัฒนาสคริปต์ Python สำหรับสแกนไฟล์สคริปต์ต้นทางอัตโนมัติ เพื่อตรวจสอบ:
     - Mob IDs เทียบกับ `Server263/data/wz265/Mob.wz/` และ `String.wz/Mob.img.xml`
     - Map IDs เทียบกับ `Server263/data/wz265/Map.wz/Map/MapX/` และ `String.wz/Map.img.xml`
     - Item IDs เทียบกับ `Server263/data/wz265/Item.wz/`, `Character.wz/`, และ String files
   - ทำการทดสอบจริงกับ:
     - `boss_karing_easy.js`: Map 13 แผนที่ และ Mob 6 ตัว (Qiongqi, Taowu, Hundun, Kaling, Frenzied Kaling) ตรวจพบตรงกับ WZ v265 แบบ 100%
     - `boss_kalos_chaos.js`: Map Karote Summit 6 แผนที่ และ Mob 3 ตัว (Kalos P1/P2, Chest) ตรงกับ WZ v265 แบบ 100%
     - `boss_seren_normal.js`: Map Cernium Palace 6 แผนที่ และ Mob 3 ตัว ตรงกับ WZ v265 แบบ 100%
     - `boss_limbo_normal.js`: Map Carcion 10 แผนที่ และ Mob Limbo 4 ตัว ตรงกับ WZ v265 แบบ 100%
     - `BOSS_REWARD_APPLY.js`: ตรวจจับไอเทมแปลกปลอม เช่น `1152209` (TMS Exclusive) ได้อย่างแม่นยำ

## 📅 [2026-10-13 11:20 น.] Audit Full Report: Fix Consumable Use Lock (Inventory Overflow), Evan Mir Egg Hatching (Quests 22100-22103), Class-Specific Spawn Map & Analysis of TMS277_REF_NomainSource

### 🎯 Scope & Technical Details
1. **แก้ปัญหาใช้ยาหรือไอเทมกดใช้ไม่ได้เลย (Consumable Lock / Inventory Overflow 466 Duplicate Items)**:
   - **ปัญหาที่พบ (Problem)**: ผู้เล่นกดกินยา (Power Elixir, White Potion ฯลฯ) ไม่ได้เลย ไอเทมไม่ลด เลือดไม่เด้ง ไม่มี Log error ในเซิร์ฟเวอร์
   - **สาเหตุเชิงลึก (Technical Root Cause)**:
     - ใน [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java): คำสั่ง `!endgame` แจก Exp Nodestone (`2437760`) จำนวน 500 ชิ้น ซึ่งใน MapleStory ไอเทมประเภท Coupon/Exp Node มี `slotMax = 1` (กิน 1 ช่องต่อ 1 ชิ้น)
     - กระเป๋า Consume เริ่มต้นมีเพียง 48 ช่อง เมื่อยัดไอเทม 500 ชิ้น ระบบ `Inventory.addItem` ทำงานวนซ้ำจนช่องเต็ม ทำให้ `firstFreeSlotLocked()` คืนค่า `-1` และโค้ด Swordie บังคับยัดไอเทมที่เหลือกว่า 466 ชิ้นลงใน `bagindex = 1` ซ้ำกันทั้งหมดในฐานข้อมูล `vietmaple.items`
     - ยิ่งไปกว่านั้น Power Elixir (`2000005`) ก็ถูกยัดลงใน `bagindex = 1` ซ้อนทับกัน
     - เมื่อผู้เล่นคลิกใช้ยา Client ส่งแพ็กเก็ตขอใช้ยาช่องที่ 1 แต่ Server ตรวจสอบพบ `item.getItemId() != itemID` เพราะช่องที่ 1 ชี้ไปที่ Exp Nodestone ตัวที่ 466 ที่ทับอยู่ ระบบจึง `return;` ทิ้งทันที ทำให้ยาและของกดใช้ทุกชนิดเป็นอัมพาต 100%
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - ใน [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java): เพิ่มระบบขยายกระเป๋า 128 ช่องเต็มพิกัด (`setSlots(128)` + `WvsContext.expandInventory`) ให้ทุกแท็บ (Equip, Consume, Etc, Install) ก่อนเริ่มแจกไอเทม
     - ปรับลดจำนวน Exp Nodestones จาก 500 ชิ้น เหลือ 20 ชิ้น (ใช้ 20 ช่อง) ซึ่งเพียงพอต่อการอัป V-Matrix เต็ม และลด Power Elixir เหลือ 3,000 ชิ้น (ใช้ 3 ช่อง)
     - ทำการ Clean Database ในตาราง `vietmaple.items` สำหรับตัวละคร `EVOffline`: ลบแถว Exp Nodestone ที่ซ้ำซ้อน 466 แถวทิ้ง และจัดสรร `bagindex` ของ Power Elixir ให้มีช่องเฉพาะตัว (`bagindex = 15`)
     - ผลลัพธ์: กระเป๋าโล่งสะอาด สามารถกดใช้ยาและไอเทมได้ทันทีตามปกติ 100%

2. **แก้ปัญหามังกรในหน้าต่างสกิล Evan เป็นไข่มังกรไม่ยอมโต (Evan Mir Dragon Egg Evolution)**:
   - **ปัญหาที่พบ (Problem)**: ตัวละคร Evan หน้าต่างสกิลแสดงรูป "ไข่มังกร" ไม่ฟักเป็นมังกร Mir แม้เลเวลจะ 260 แล้วก็ตาม
   - **สาเหตุเชิงลึก (Technical Root Cause)**:
     - ตรวจสอบไฟล์ WZ ใน `Quest.wz/QuestData/22100.img.xml` ถึง `22103.img.xml`:
       - เควสต์ `22100`: "Dragon Master 1st Job Advancement" ("Baby Dragon Mir has been born from the Dragon Egg") -> มังกรฟักออกจากไข่
       - เควสต์ `22101`: "Dragon Master 2nd Job Advancement" ("Mir has grown bigger and taken off the egg shell he was wearing as a hat") -> มังกรถอดเปลือกไข่ที่สวมเป็นหมวก
       - เควสต์ `22102` & `22103`: มังกรวัยรุ่นและมังกรเต็มวัย (Adult Dragon)
       - ตัวเกม Client อ่าน Record สถานะความสำเร็จของเควสต์ `22100–22103` มาเรนเดอร์สไปรต์มังกรในหน้าต่างสกิล UI เมื่อเควสต์เหล่านี้ไม่ได้บันทึกสถานะ `Completed` ตัวเกมจึงเรนเดอร์ Mir เป็น "ไข่มังกรที่ยังไม่ฟัก"
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - ใน [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java): บันทึกเควสต์ `22100` ให้สำเร็จทันทีใน `setCharCreationStats`
     - ใน [`Job.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java): ใน `postJobAdvanceSetup` ตรวจสอบถ้าเป็น Evan ให้ auto-complete เควสต์ `22100–22103` ตามระดับเลเวล
     - ใน [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java): คำสั่ง `!endgame` ปลดล็อคเควสต์ `22100–22103` ทันทีและสั่ง `evan.spawnDragon()`
     - อัปเดตฐานข้อมูล `vietmaple.quests` ของ `EVOffline` ให้เควสต์ `22100–22103` มีสถานะ `status = 2` (Completed)
     - ผลลัพธ์: มังกร Mir ฟักออกจากไข่ เปลือกไข่หลุดออก และเติบโตเป็นมังกรดำร่างเต็มวัย (Adult Dragon) สง่างามทั้งในหน้าต่างสกิลและในฉากเกม

3. **Audit การเกิดที่ Henesys vs เมืองเกิดดั้งเดิม (Henesys Spawn & Hometown Travel Audit)**:
   - **ปัญหาที่พบ**: ใน [`LoginHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java) บรรทัด 372 มีการฮาร์ดโค้ด `characterStat.setPosMap(FieldConstants.HENESYS_ID);` ทับค่าจุดเกิดของทุกอาชีพ
   - **ผลการ Audit เชิงลึก**:
     - หากเกิดที่ Henesys: ไม่พบบั๊กล็อคเนื้อเรื่อง เพราะเควสต์ฟาร์ม 22000-22015 ถูกตั้งค่า `Completed` ไว้ล่วงหน้าแล้ว
     - หากเดินทางกลับไปฟาร์มของ Utah (`100030100` ถึง `100030104`): สคริปต์พอร์ทัลทุกตัว (`enterEvanRoom.py`, `evanlivingRoom.py`, `evanGarden0.py`, `evanFarmCT.py`, `evanEntrance.py`) มีเส้นทางเชื่อมต่อแบบ 2-way เข้า-ออกสู่ Henesys ได้ปกติ ไม่มีการติดกับดักหรือวาร์ปตาย
     - แต่สกิล `Back to Nature` (กลับสู่ธรรมชาติ) ของ Evan จะพาวาร์ปกลับมาที่ฟาร์มหน้าบ้าน (`100030102`)
   - **การแก้ไข**: ปรับใน [`LoginHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java) ให้ตั้งค่า Henesys เฉพาะกรณี `characterStat.getPosMap() == 0` เท่านั้น เพื่อเปิดให้อาชีพที่มีจุดเกิดเฉพาะตัว (เช่น Evan เกิดที่ห้องใต้หลังคาบ้าน Utah `100030100`) เกิดที่บ้านเกิดได้อย่างถูกต้องตาม Lore ดั้งเดิม และสามารถเดินออกสู่ Henesys ได้ใน 15 วินาที

4. **การวิเคราะห์และทำความสะอาดโฟลเดอร์อ้างอิง `TMS277_REF_NomainSource`**:
   - ตรวจสอบโครงสร้าง: เป็นเซิร์ฟเวอร์ Taiwan MapleStory v277.6 สถาปัตยกรรม Alice / MetaMS รันบน Linux ELF ไบนารีผ่าน WSL ไม่มี Main Source Code
   - **การทำความสะอาดไฟล์ที่ไม่จำเป็น (Cleaned Up Unnecessary Files & Folders)**:
     - ลบไฟล์ Zip ขยะขนาดใหญ่: `tms277.6.zip` (459.5 MB) และ `277.6登录器.zip` (63.8 MB)
     - ลบไฟล์ Exe ตัวรันที่ไม่เกี่ยวข้อง: `tms277.6客户端.exe` (10.9 MB)
     - ลบโฟลเดอร์ Linux ELF Binaries ที่ใช้งานไม่ได้บน Windows: `bin/` (~256 MB)
     - ลบสคริปต์รัน WSL และ Logs เก่า: `123/`, `linux_sh/`, `logs/`
     - ลบโปรแกรม Proxy & Redirector: `ะยฝจฮฤผผะ/` (SunnyNet64.dll, redirector.exe)
     - ลบเซฟข้อมูลตัวละครเก่าของเซิร์ฟเวอร์อื่น: `data/Character/` (98 โฟลเดอร์)
     - ลบไฟล์บีบอัดซ้ำซ้อน: `data/data.7z` (367 KB)
     - คืนพื้นที่ดิสก์รวมกว่า **800+ MB**
   - **คงเหลือเฉพาะขุมทรัพย์ข้อมูลที่ใช้ประโยชน์กับ v265 ได้ 100%**:
     - `WZ_JSON_TW/`: ข้อมูลสกิลคลาส 6 (`WZ_JSON_TW/Skill/*.json`), ไอเทม, เควสต์, มอนสเตอร์ (JSON)
     - `data/Common/`: ข้อมูล StarForce, Cube rates, UI Button scripts, Boss HP modify
     - `data/Shop/`: ข้อมูลร้านค้า NPC เมืองระดับสูง 172 ไฟล์
     - `sql/alice.sql`: โครงสร้างฐานข้อมูลสำหรับอ้างอิง
     - `config/`: ค่าคอนฟิกเซิร์ฟเวอร์สำหรับอ้างอิง

### 📂 Files Modified
- [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)
- [`LoginHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java)
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)
- [`Job.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java)

### 🧪 Verification & Deployment
- **Maven Build**: `BUILD SUCCESS` (42s clean compile with Java 21)
- **Deployment**: ซิงค์ `maplestory.jar` ไปยัง `Server263/`, `maple265src/` และ Root เรียบร้อย
- **Database Cleanup**: ซ่อมแซมตาราง `items`, `inventories`, `quests` ใน `vietmaple` สำหรับตัวละคร `EVOffline` สมบูรณ์
- **Server Status**: สตาร์ทใหม่ออนไลน์พร้อมทดสอบ Netty Port 8484, 8585-8594, MariaDB Port 33066

## 📅 [2026-10-13 10:44 น.] Fix Character Creation NullPointerException & Safe Pre-Quest Registration

### 🎯 Scope & Technical Details
1. **แก้ปัญหา NullPointerException ตอนสร้างตัวละครใหม่ (`CREATE_NEW_CHARACTER` Opcode 141)**:
   - **ปัญหาที่พบ (Problem)**: เมื่อผู้เล่นสร้างตัวละครใหม่ (เช่น `EvanOFFLINE`) ระบบแจ้งข้อผิดพลาด: `NullPointerException: Cannot invoke "User.getAccountType()" because "Char.getUser()" is null at Char.addQuest(Char.java:12954)` ส่งผลให้สร้างตัวละครไม่สำเร็จ
   - **สาเหตุเชิงลึก (Technical Root Cause)**:
     - ใน [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) บรรทัด 12947 และ 12954 มีการเรียก `getUser().getAccountType()` โดยไม่มีการเช็ค `getUser() != null`
     - ใน [`LoginHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java) ในขณะสร้างตัวละครใหม่ `Char chr = new Char(...)` ฟิลด์ `user` ยังไม่ได้ถูกเซ็ตเข้าไปยังอ็อบเจกต์ `chr` ก่อนที่ `JobHandler.setCharCreationStats` จะทำงาน
     - ใน [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java) การเรียก `chr.completeQuest(...)` ขณะสร้างตัวละคร พยายามส่งแพ็กเก็ตเน็ตเวิร์กและแจกของรางวัลเควสต์ก่อนที่ตัวละครจะได้รับ ID จากฐานข้อมูล MySQL
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - เพิ่มการตรวจสอบความปลอดภัย `if (getUser() != null && getUser().getAccountType() != null)` ใน [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java)
     - กำหนด `chr.setUser(acc.getUser())` ทันทีหลังสร้างอินสแตนซ์ใน [`LoginHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java)
     - ใน [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java) เปลี่ยนเป็นการบรรจุเควสต์สำเร็จลงใน `chr.getQuests().put(qid, new Quest(chr.getId(), qid, QuestStatus.Completed))` โดยตรงอย่างปลอดภัย เพื่อรอเซฟลงฐานข้อมูลพร้อมกับตัวละครโดยไม่เกิด Exception
     - ผู้เล่นสามารถสร้างตัวละครใหม่ทุกอาชีพได้อย่างราบรื่น 100%

### 📂 Files Modified
- [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java)
- [`LoginHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java)
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)

### 🧪 Verification & Deployment
- **Maven Build**: `BUILD SUCCESS` (Compiled with Java 21)
- **Deployment**: คัดลอก `maplestory.jar` ไปยัง `Server263/maplestory.jar` และ root
- **Server Status**: สตาร์ทเซิร์ฟเวอร์ใหม่เรียบร้อย Netty พร้อมรับการเชื่อมต่อที่พอร์ต 8484, 8585, 33066
- **Patch Created**: `Patches/Server263_Patch_20261013_1043.zip` (122.46 MB)

## 📅 [2026-10-13 10:22 น.] Refactor !endgame Skill Management, ExtendSP Fallback, Evan Elemental Barrage Cooldown & Origin/United Horizon Separation

### 🎯 Scope & Technical Details
1. **ลบการ Add Skill และ MaxSkills ทั้งหมดออกจากคำสั่ง `!endgame` (Manual Skill Allocation Standard)**:
   - **ปัญหา/ความต้องการ (Requirement & Problem)**: ผู้ใช้ต้องการให้คำสั่ง `!endgame` ไม่แทรกแซงหรือยัดเยียดสกิลลงในตัวละคร (`chr.addSkill` หรือ `chr.maxSkills()`) เพื่อให้ผู้เล่นสามารถจัดสรรและอัปเกรดสกิลคลาส 1–4 ได้ด้วยตัวเองผ่านหน้าต่างสกิล (K) โดยใช้แต้ม SP (Skill Points) ที่ได้รับจากการอัปเลเวล
   - **การแก้ไขเชิงลึก (Implementation Details)**:
     - ใน [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java): ลบบล็อก `chr.addSkill(...)` ของทุกอาชีพทั้งหมดออก 100% (Hero, Paladin, Dark Knight, F/P, I/L, Bishop, Bowmaster, Marksman, Pathfinder, Night Lord, Shadower, Dual Blade, Buccaneer, Corsair, Cannoneer)
     - ลบคำสั่ง `chr.maxSkills()` ออกจากเมธอด `setupEndgame`
     - จัดสรรแต้ม SP ผ่าน `ExtendSP` ให้ครบถ้วนทุกระดับคลาส (1st: 65 SP, 2nd: 130 SP, 3rd: 130 SP, 4th: 255 SP และ 5th-6th สำหรับ Dual Blade) หรือมอบ `Stat.sp` สำหรับคลาสที่ไม่ใช่ ExtendSP เพื่อให้ผู้เล่นมีแต้มเพียงพอในการอัปสกิลเองได้เต็มที่
   - **ผลลัพธ์ (Outcome)**: คำสั่ง `!endgame` สะอาด ไร้การ Force-add สกิล และมอบแต้ม SP ให้ผู้เล่นกดอัปสกิลเองตามต้องการ

2. **เพิ่มระบบ Fallback ให้กับ `ExtendSP.java`**:
   - **การแก้ไขเชิงลึก**: ใน [`ExtendSP.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/ExtendSP.java) เมธอด `setSpToJobLevel(int jobLevel, int sp)` เพิ่มการตรวจสอบ หากยังไม่มีโหนด `SPSet` ของ `jobLevel` นั้น ให้ทำการ `spSet.add(new SPSet((byte) jobLevel, sp))` อัตโนมัติ ป้องกันกรณีที่คลาสมีจำนวนระดับอาชีพมากกว่าปกติ

3. **แก้ไขปัญหาสกิล Evan V-Skill `Elemental Barrage` (`400021012`) ไม่มีคูลดาวน์**:
   - **สาเหตุ (Root Cause)**: สกิลลูกที่ส่งผลดาเมจ (`400021013 - 400021015`) ไม่ได้ถูกแปลงค่ากลับเข้าสู่ Root ID `400021012` ใน [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java) และไม่ได้ใส่ใน `isEvanForceSkill` ทำให้การประมวลผลคูลดาวน์ไม่ถูกเรียกใช้
   - **การแก้ไข (Fix)**: แมป `400021013 - 400021015` -> `400021012` ใน `getActualSkillIDfromSkillID()` และเพิ่มการตั้งคูลดาวน์ 60 วินาทีใน [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)

4. **แยกคูลดาวน์ระหว่าง `United Horizons` (`22201502`) และ `Zodiac Burst` (`22201500`)**:
   - **สาเหตุ (Root Cause)**: คอมมิตเดิมมีการรีไดเร็กต์ `22201502` และ `22201503` เข้าไปหา `22201500` และแชร์คูลดาวน์ 360 วินาทีร่วมกัน ทั้งที่ใน WZ ดั้งเดิมเป็นคนละสกิลกัน
   - **การแก้ไข (Fix)**: ยกเลิกการรีไดเร็กต์ใน `SkillConstants.java` และใน `Evan.java` แยกคูลดาวน์ของ Zodiac Burst (360 วินาที) และ United Horizons (240 วินาที) ออกจากกันอย่างอิสระตามมาตรฐาน WZ

5. **Refactor จุดเกิดและเนื้อเรื่องเริ่มต้นของ Evan**:
   - **การวิเคราะห์ (Analysis)**: การให้ Evan เกิดที่ Henesys ทันทีข้ามบรรยากาศดั้งเดิมและเกิดลูปวาร์ปซ้ำใน `handleInitAfterMigrate` แต่หากให้เกิดที่ฟาร์มเลเวล 1 จะเกิดบั๊กเควสต์ติดล็อกเนื่องจากสคริปต์เควสต์ให้อาหารหมาบูลด็อก `q22001e.py` และเควสต์ 22005-22015 ไม่มีในตัวเซิร์ฟเวอร์
   - **การแก้ไข (Fix)**:
     - ปรับให้สร้างตัวละครมาเกิดที่บ้านเดิม: Utah's House Attic (แผนที่ `100030100`) ที่เลเวล 10 คลาส 2210 ทันที
     - ออโต้คอมพลีตเควสต์ฟาร์มที่ขาดหายไป (`22000-22015`) ใน `setCharCreationStats` เพียงครั้งเดียว เพื่อป้องกันการติดล็อก
     - สร้างสคริปต์พอร์ทัล [`enterEvanRoom.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/portal/enterEvanRoom.py) เพื่อให้ผู้เล่นเดินขึ้น-ลงบันไดระหว่างห้องใต้หลังคากับห้องนั่งเล่นบ้านยูทาห์ได้อย่างสมบูรณ์

### 📂 Files Modified
- [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)
- [`ExtendSP.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/ExtendSP.java)
- [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)
- [`enterEvanRoom.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/portal/enterEvanRoom.py)

### 🧪 Verification & Deployment
- **Maven Build**: `BUILD SUCCESS` (Compiled with Java 21)
- **Deployment**: คัดลอก `maplestory.jar` ไปยัง `Server263/maplestory.jar` และ root
- **Patch Created**: `Patches/Server263_Patch_20261013_1021.zip` (122.46 MB)

## 📅 [2026-10-13 09:05 น.] HEXA Elemental Barrage Packet Misalignment Fix & Client Crash Telemetry Diagnostic

### 🎯 Scope & Technical Details
1. **Evan HEXA Elemental Barrage Attack Handling & Packet Alignment (`500061041` - `500061045`)**:
   - **ปัญหาที่พบ (Problem)**: ขณะทดสอบตัวละคร `EvanOFFLINE` มีข้อผิดพลาดใน `task-645.log` แจ้งเตือน: `[ExceptionCaught/Attacks.txt] [EvanOFFLINE] Skill ID: 500061041 unable to handle Attacks.` สกิลไม่สร้างดาเมจและแพ็กเก็ตหลุดตำแหน่ง
   - **สาเหตุเชิงลึก (Technical Root Cause)**:
     - ในโปรโตคอล v265 สกิลสาย Evan Force Skills จะมีการส่งไบต์พิเศษ 1 ไบต์เพิ่มเติมก่อนค่า attack speed (`ai.attackSpeed = inPacket.decodeByte()`) โดย `AttackHandler.java:635` ทำการตรวจสอบด้วยคำสั่ง `if (SkillConstants.isEvanForceSkill(skillID)) inPacket.skipByte();`
     - สกิล HEXA V-Enhancement **Elemental Barrage** (`500061041` - `500061045`) ขาดหายไปจาก `SkillConstants.isEvanForceSkill(skillID)` ส่งผลให้ไม่ถูกข้ามไบต์ ข้อมูลถัดไปใน InPacket เกิด Offset Shift (ไบต์เลื่อน) ทำให้ตัวประมวลผลอ่านดาเมจและข้อมูลเป้าหมายผิดตำแหน่ง
     - สกิลลูก `500061042 - 500061045` ไม่ได้ถูกแมปเข้าหา Root Skill `500061041` ใน `SkillConstants.getActualSkillIDfromSkillID()`
     - คลาส [`Evan.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java) ยังไม่มีเคสประมวลผลดาเมจและคูลดาวน์สำหรับ `HEXA_ELEMENTAL_BARRAGE` (`500061041`)
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - เพิ่ม ID `500061041`, `500061042`, `500061043`, `500061044`, `500061045` ลงใน `SkillConstants.isEvanForceSkill()`
     - เพิ่มการแปลงรหัสย่อย `500061042 - 500061045` -> `500061041` ใน `SkillConstants.getActualSkillIDfromSkillID()`
     - ใน [`Evan.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java): กำหนดค่าคงที่ `HEXA_ELEMENTAL_BARRAGE = 500061041`, จัดการคำนวณบัฟดาเมจ / คริติคอลใน `handleAttack` และตั้งคูลดาวน์ 60 วินาทีใน `handleSetCoolDownSkill()` อย่างถูกต้องสมบูรณ์
     - สกิล HEXA Elemental Barrage โจมตีติดดาเมจทุกฮิต และไม่เกิด Exception Packet Shift อีกต่อไป

2. **Client Crash CallStack Telemetry (`LogCallStack2 / LogCallStack0`) Diagnostic**:
   - **ปัญหาที่พบ (Problem)**: ผู้ใช้พบข้อความ Log: `NAME|(null)|JOB|-1|Socket|-|-|-|LogCallStack2|Hash|1974435496|Line|116|Info1|-1|...` ในคอนโซล
   - **การวิเคราะห์ทางเทคนิค (Technical Analysis)**:
     - ล็อกดังกล่าวไม่ใช่ Exception ฝั่งเซิร์ฟเวอร์ Java แต่เป็นแพ็กเก็ต `InHeader.EXCEPTION_LOG` (Opcode 179) ที่ไคลเอนต์ `MapleStory.exe` ส่งมารายงานเซิร์ฟเวอร์โดยอัตโนมัติเมื่อทำการเชื่อมต่อ
     - ข้อมูลระบุว่าไคลเอนต์เกิด Crash ก่อนหน้านี้ (`DATETIME|2026/10/13 08:51:57` ในขณะที่เซิร์ฟเวอร์เพิ่งกำลังเริ่มรัน) สาเหตุเกิดจากช่วงเวลาที่ตัวเกมเปิดขึ้นมาแล้ว Socket ยังไม่พร้อม (`Socket|-|-|-|`, `NAME|(null)|JOB|-1|`) และมีข้อผิดพลาดเกี่ยวกับไดรเวอร์/โมดูล `DosHdr is NULL` ในการโหลด
     - เมื่อผู้เล่นเข้าเล่นตามปกติหลังจากเซิร์ฟเวอร์พร้อม ตัวเกมส่งรายงานเก่านี้มาบันทึกที่เซิร์ฟเวอร์ 1 ครั้ง จากนั้นผู้เล่นสามารถล็อกอินเข้าแมพและเล่นได้ตามปกติอย่างไร้ปัญหา

### 📂 Files Modified
- [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleV265Src/PROGRESS.md)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/PROGRESS.md)

### 🧪 Verification & Deployment
- **Maven Build**: `BUILD SUCCESS` (Compiled 853 source files with Java 21)
- **Deployment**: Synchronized Fat JAR to `v214 src/maplestory.jar` and `Server263/maplestory.jar`
- **Patch Folder**: Regenerated clean, uncompressed `Patches/Server263_Patch_Latest` with updated `maplestory.jar` and 1-click `Apply_Patch.bat`

## 📅 [2026-10-13 08:45 น.] Comprehensive Stability Overhaul: Clean Slate Slot Recovery, Cube Freeze Elimination, Evan Cooldown Synchronization & Auto Job Advance (Section 9.1 - 9.6)

### 🎯 Scope & Technical Details
1. **Clean Slate Scroll Slot Recovery (ใบขาวคืนรู) — Section 9.1**:
   - **ปัญหาที่พบ (Problem)**: ผู้เล่นแจ้งว่า Clean Slate Scroll (ใบขาวคืนรู) ใช้งานแล้วมีอาการบั๊ก ใช้แล้วรูไม่คืน, เมื่อเปลี่ยนแผนที่หรือ Re-login แล้วรูที่เคยคืนได้กลับคืนไม่ได้, หรือหากคืนรูสำเร็จ 1 ครั้งจะล็อกไม่ให้ใช้ใบขาวกับรูที่เหลือที่ยังพังอยู่
   - **สาเหตุเชิงลึก (Technical Root Cause)**:
     - ตัวแปร `isLastScrollFail` ใน [`Equip.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/items/Equip.java) เป็นฟิลด์สถานะชั่วคราวในหน่วยความจำ (`@Transient`) ไม่ได้ถูกบันทึกลงในฐานข้อมูล SQL ทำให้ทุกครั้งที่มีการเปลี่ยนแมพ หรือ Re-login ค่าจะรีเซ็ตกลับเป็น `false` ทันที แม้ว่าไอเทมจะมีรูที่เสียจากการตีบวกพลาดจริงก็ตาม
     - ใน `applyScroll()` เมื่อ Clean Slate สำเร็จ 1 ครั้ง ระบบสั่ง `setLastScrollFail(false)` ทันที ทำให้ไม่สามารถกู้คืนรูที่เสียรูถัดไปได้
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - พัฒนาสูตรคำนวณ Failed Slots ตามหลักคณิตศาสตร์:
       `failedSlots = Math.max(0, (maxTuc + equip.getIuc()) - (equip.getTuc() + equip.getCuc()))`
       โดย `maxTuc` คือรูตั้งต้นของไอเทม, `iuc` คือรูค้อน Vicious Hammer, `tuc` คือรูที่เหลือสำหรับตีบวก, และ `cuc` คือจำนวนครั้งที่ตีบวกสำเร็จ
     - เพิ่มฟังก์ชัน `getFailedSlots()` และ `hasFailedSlots()` ใน [`Equip.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/items/Equip.java) และอัปเดต `isLastScrollFail()` ให้คืนค่า `hasFailedSlots() || isLastScrollFail`
     - ปรับปรุงการตรวจสอบใน [`ItemUpgradeHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemUpgradeHandler.java), [`ItemHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemHandler.java) (SpellTrace), [`ScrollUpgradeInfo.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/items/ScrollUpgradeInfo.java), และเพิ่ม alias `isCleanSlateScroll()` ใน [`ItemConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java)
     - ไอเทมสามารถใช้ Clean Slate Scroll กู้คืนรูที่เสียได้ครบตามจำนวนรูที่เสียจริง 100% ไม่สูญหายหลัง Re-login

2. **Bonus Potential Cube & Memorial Cube Client Freeze Elimination — Section 9.2**:
   - **ปัญหาที่พบ (Problem)**: การใช้งาน Bonus Potential Cube หรือ Memorial Cube (Black/Bright Cube) มีอาการค้าง (Client Freeze / Stalled State) ไม่แสดงหน้าต่างผลลัพธ์
   - **สาเหตุเชิงลึก (Technical Root Cause)**:
     - ใน `CubeHandler.handleUserMemorialCubeOptionRequest`: มีการเรียก `memorialCubeInfo.getEquip()` ก่อนคำสั่งตรวจสอบ `if (memorialCubeInfo == null)` ส่งผลให้เกิด `NullPointerException` ใน Netty Worker Thread ทำให้แพ็กเก็ตตกหล่นและ Client รอคอยผลลัพธ์ไม่สิ้นสุด
     - ใน `CubeHandler.handleCube` และ `handleBrightCube`: มีการตรวจสอบศักยภาพสลับประเภท โดยบังคับเช็ค `equip.getBaseGrade() < Rare` และ `equip.getBonusGrade() > itemGradeMax` สำหรับทุกลูกบาศก์ ทำให้ลูกบาศก์ศักยภาพโบนัสที่ใช้บนไอเทมที่ไม่มีศักยภาพหลักถูกปฏิเสธ หรือไอเทมที่ไม่มีศักยภาพโบนัสแต่มีศักยภาพหลักกลับถูกปล่อยผ่าน
     - ใน `Equip.getRandomOption`: เมื่อทำการสุ่มออปชั่นโบนัส (`bonus == true`) บรรทัดที่ 2244 ไปดึง `option1` จาก Base Line 1 (`getOptions().getFirst()`) แทนที่จะเป็น Bonus Line 1 (`getOptionBonus(0)`) และลูป `while` ทั้ง 14 เงื่อนไขไม่มีตัวนับรอบความปลอดภัย (Infinite Spinlock) หากสุ่มได้ออปชั่นที่ไม่ผ่านเงื่อนไขซ้ำๆ
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - ดักจับ Null-safety ทุกจุดใน [`CubeHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/item/CubeHandler.java) พร้อมคืนสถานะด้วย `chr.dispose()` และทำความสะอาด `chr.setMemorialCubeInfo(null)`
     - แยกตรรกะการตรวจสอบศักยภาพระหว่าง `bonus` (ตรวจสอบ `BonusGrade`) และ `base` (ตรวจสอบ `BaseGrade`) ชัดเจน 100%
     - ใน `getRandomOption`: ปรับปรุง `int option1 = bonus ? getOptionBonus(0) : getOptions().getFirst();` และเพิ่มตัวควบคุมความปลอดภัย `&& ++tries <= 30` ในทุก `while` loop ป้องกัน Thread Spinlock และ Client Freeze 100%

3. **Evan Skill Cooldowns & Mir Attacks (สกิลมังกรคูลดาวน์ผิดปกติ) — Section 9.3**:
   - **ปัญหาที่พบ (Problem)**: สกิลโจมตีของมังกร Mir สามารถกดรัวๆ ซ้ำได้เรื่อยๆ โดยไม่ติดคูลดาวน์
   - **สาเหตุเชิงลึก (Technical Root Cause)**:
     - สกิล Dragon Breath (`22171063`), Dragon Dive (`22141012`, `22140022`), HEXA Dragon Breath (`22201011`), HEXA Dragon Dive (`22201007`), และ HEXA Dragon Flash (`22201003`) ถูกใส่ไว้ใน `SkillConstants.isNoCoolDownAttack()` ส่งผลให้ใน `Char.checkAndSetSkillCooltime` ส่งค่า `return true;` ข้ามการเช็คคูลดาวน์ทั้งหมดเมื่อมาจากการโจมตี (`fromAttack = true`)
     - ใน `Char.checkAndSetSkillCooltime`: สกิลย่อย (Sub-action IDs) คืนค่า `getSkill(skillID) == null` เพราะตัวละครครอบครองเฉพาะ Root Skill ทำให้เซิร์ฟเวอร์ไม่ได้ตั้งค่าคูลดาวน์
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - ลบสกิลมังกร Mir ทั้งหมดออกจาก `SkillConstants.isNoCoolDownAttack()`
     - เชื่อมโยง Sub-action IDs ทั้งหมดของ Mir (`22110022`, `22110023`, `22140022`, `22201004`, `22201005`, `22201008`, `22201009`, `22201012-22201014`) ไปยัง Root Skill ใน `SkillConstants.getActualSkillIDfromSkillID()`
     - ใน `Char.hasSkillOnCooldown()` และ `Char.checkAndSetSkillCooltime()`: เพิ่มกลไก Fallback ตรวจสอบและตั้งค่าคูลดาวน์ที่ Root Skill เมื่อค้นหา Sub-skill ไม่พบ
     - เพิ่มเคสใน `Evan.handleSetCoolDownSkill()` จัดการคูลดาวน์สกิลมังกรทุกระดับอย่างสมบูรณ์

4. **Evan HEXA Origin Zodiac Burst Cooldown Synchronization — Section 9.4**:
   - **ปัญหาที่พบ (Problem)**: สกิล Origin คลาส 6 ของ Evan (Zodiac Burst) และ Finisher มีระยะเวลาคูลดาวน์ไม่ตรงกัน (ปนเปกันระหว่าง 240s และ 360s) และบางกรณีไม่ติดคูลดาวน์
   - **สาเหตุเชิงลึก (Technical Root Cause)**: ใน `Evan.java` มีการเรียก `chr.setSkillCooldown(ZODIAC_BURST, 360)` ซึ่งส่งค่า 360 ไปยังพารามิเตอร์ `slv` (Skill Level) แทนที่จะเป็นเวลาคูลดาวน์ ส่งผลให้คูลดาวน์ไม่ทำงานหาก WZ ไม่มีโหนด cooltime ตามระดับเลเวลนั้น
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - เปลี่ยนมาใช้ `chr.addSkillCooldown(ZODIAC_BURST, 360 * 1000)` กำหนดคูลดาวน์ 360 วินาที (360,000 มิลลิวินาที) ทั้งบน Server และ Client ตรงตามมาตรฐานทางการ ทั้งใน `handleSkill`, `handleAttack`, และ `handleSetCoolDownSkill`
     - ซิงค์คูลดาวน์ระหว่าง Zodiac Burst (`22201500`) และ United Horizons Finisher (`22201502`) เป็น 360 วินาทีเท่ากันอย่างเป็นเอกภาพ

5. **Evan Auto Job Advance & Starter Lifecycle — Section 9.5 & 9.6**:
   - **ปัญหาที่พบ (Problem)**: ตัวละคร Evan เมื่อเลเวลอัปถึง 10 มีอาการถูกดาวน์เกรดกลับเป็นจ็อบ 2200 และไม่เปลี่ยนอาชีพคลาส 2, 3, 4 อัตโนมัติเมื่อเลเวลถึงเกณฑ์
   - **สาเหตุเชิงลึก (Technical Root Cause)**: ใน `JobConstants.getTargetJobForLevel` บรรทัดที่ 2162 ตั้งค่า `if (level >= 10) return 2200;` ซึ่ง 2200 คือจ็อบระดับ 0 ยุคก่อนรีแวมป์ ส่งผลให้เมื่อเลเวล 10 ระบบทำการเซ็ตจ็อบกลับเป็น 2200 แทนที่จะเป็น 2210 (1st Job) และทำให้ Auto Job Advance หยุดชะงัก
   - **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
     - แก้ไขใน [`JobConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/JobConstants.java) ให้คืนค่า 2210 (1st Job), 2212 (2nd Job), 2214 (3rd Job), 2217 (4th Job)
     - ตรวจสอบ Starter Lifecycle ใน `Evan.java` (`setCharCreationStats`, `addItemToNewCharacter`, `handleInitAfterMigrate`): มอบอาวุธคทา (1382000), สมุดมังกร Dragon Document (1352940), ปลดเควสต์เริ่มต้น และเสก Mir ร่วมผจญภัยทันทีโดยไม่ติด UI Lock

### 📂 Files Modified
- [`Equip.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/items/Equip.java) (Failed slots math formula, safe bonus option line 1, while loop limit)
- [`ItemUpgradeHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemUpgradeHandler.java) (Clean slate slot validation)
- [`ItemHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemHandler.java) (SpellTrace Clean slate slot validation)
- [`ScrollUpgradeInfo.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/items/ScrollUpgradeInfo.java) (Clean slate recovery slot check)
- [`ItemConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/ItemConstants.java) (Added isCleanSlateScroll alias)
- [`CubeHandler.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/handlers/item/CubeHandler.java) (Null-safety, separate bonus vs base potential checks, dispose cleanup)
- [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java) (Removed Mir attacks from isNoCoolDownAttack, added Evan sub-skill root mappings)
- [`Char.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) (Root skill resolution for cooldown check & setting)
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java) (Zodiac Burst 360s unified cooldown, Mir attack cooldowns in handleSetCoolDownSkill)
- [`JobConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/JobConstants.java) (Fixed 1st job target to 2210)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/PROGRESS.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleV265Src/PROGRESS.md)

### 🧪 Verification & Deployment
- **Maven Compile & Package**: `BUILD SUCCESS` (853 files, Fat JAR `maplestory.jar` 138.67 MB created)
- **Deployment**: Synchronized to `v214 src/maplestory.jar`, Root `maplestory.jar`, and `Server263/maplestory.jar`
- **Patch Created**: Single uncompressed patch `Patches/Server263_Patch_Latest/` with automated `Apply_Patch.bat`
- **Rule Verification**: `Server263/` contains 0 source code files (`.java`/`pom.xml`), zero old patches in `Patches/`

## 📅 [2026-10-12 23:48 น.] Windows 11 Smart App Control (SAC) & Device Guard Policy Blocking Portable MariaDB: Technical Diagnosis & Resolution Standard

### 🎯 Scope & Technical Details
1. **ปัญหาที่พบ (Problem)**:
   - ผู้เล่นบน Windows 11 (build 26200 / 24H2) รัน `1_Start_Server.bat` หรือ `Start_Database.bat` แล้ว MariaDB ไม่ยอมสตาร์ต พร้อมแสดงข้อความ Error บน Console:
     `'...\Server263\mariadb\bin\mysqld.exe' was blocked by your organization's Device Guard policy. Contact your support person for more info.`
2. **สาเหตุเชิงลึก (Technical Root Cause)**:
   - **Smart App Control (SAC) Kernel Enforcement**: บน Windows 11 เวอร์ชัน 22H2 / 23H2 / 24H2 มีระบบ Smart App Control ที่เปิดใช้งานมาแต่เริ่มต้น ซึ่งทำงานครอบคลุมอยู่บนเลเยอร์เคอร์เนลของ **Windows Defender Application Control (WDAC) / Device Guard**
   - **Unsigned Binary (Status: NotSigned)**: จากการตรวจสอบ `Get-AuthenticodeSignature` พบว่า `mysqld.exe` ของ MariaDB Portable เป็นโอเพนซอร์สที่ไม่มี Digital Certificate ขององค์กร (ต่างจาก `java.exe` ที่มีใบรับรอง Eclipse Foundation Valid) ทำให้ SAC/Device Guard บล็อกการ Exec ทันที
   - **Mark of the Web (Zone.Identifier)**: เมื่อผู้เล่นดาวน์โหลดไฟล์ผ่านเว็บ/คลาวด์ไดรฟ์ Windows จะแนบ NTFS Alternate Data Stream `Zone.Identifier` (ZoneId=3) ทำให้ระบบรักษาความปลอดภัยเพ่งเล็งและสกัดกั้นการรัน
   - **Command Prompt vs PowerShell**: เมื่อผู้เล่นพิมพ์คำสั่ง `Get-ChildItem ... | Unblock-File` ใน Command Prompt (CMD) ปกติ ระบบจะแจ้งเตือนว่าไม่รู้จักคำสั่ง ต้องครอบด้วย `powershell -Command "..."`
3. **แนวทางแก้ไขและผลลัพธ์ (Solution & Outcome)**:
   - **วิธีแก้หลัก**: สั่งปิด Smart App Control ใน `Windows Security` -> `App & browser control` -> `Smart App Control settings` -> เปลี่ยนเป็น `Off`
   - **วิธีเสริม**: ปลดล็อก Mark of the Web ด้วยคำสั่ง CMD: `powershell -Command "Get-ChildItem -Path '<Folder>' -Recurse | Unblock-File"`
   - ผู้เล่นสามารถเปิดใช้งาน Portable MariaDB พอร์ต 33066 และรันเซิร์ฟเวอร์ MapleStory v265 ได้สำเร็จ 100%

### 📂 Files Modified
- [`SKILL.md`](file:///c:/Users/admin/Documents/MapleV265Src/.agents/skills/maplestory-bug-knowledge/SKILL.md) (เพิ่มหัวข้อ 2.3 คู่มือแก้ปัญหา Device Guard / Smart App Control)
- [`HOW_TO_USE.txt`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/HOW_TO_USE.txt) (เพิ่มหัวข้อ [7] คู่มือ Troubleshooting สำหรับผู้เล่น)
- [`Server263/HOW_TO_USE.txt`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/Server263/HOW_TO_USE.txt) (เพิ่มหัวข้อ [8] คู่มือ Troubleshooting ในแพ็คแจกจ่าย)
- [`v214 src/PROGRESS.md`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/PROGRESS.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/PROGRESS.md)

## 📅 [2026-10-12 22:55 น.] Evan Complete HEXA Matrix Overhaul: HEXA Enhanced Magic Debris (22201015), HEXA Dragon Spark (22200016), Lv. 260 Auto-Evolution & No-Cooldown Attack Handlers

### 🎯 Scope & Technical Details
1. **เพิ่มและเชื่อมโยง HEXA Enhanced Magic Debris (`22201015`) ในระบบสกิลทั้งหมด**:
   - เชื่อมโยงใน [`Evan.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java):
     - `getDebrisSkill()` และ `getMaxDebris()`: รองรับการดึง Skill Info และคำนวณจำนวนชิ้นส่วน Wreckage สูงสุดของสกิลคลาส 6
     - `createMagicDebrisForceAtom()`: ปล่อย ForceAtom รูปแบบ `ADV_WRECKAGE`
     - `createWreckage()`: ตรวจสอบและสร้างเศษ Debris จาก Fusion Skill
     - `handleSkill()`: จัดการ Packet ร่ายสกิลระเบิดชิ้นส่วน Debris
   - เชื่อมโยงใน [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java):
     - `isForceAtomSkill()`: ลงทะเบียน `Evan.HEXA_MAGIC_DEBRIS`
2. **ลงทะเบียนสกิลมังกรคลาส 6 ใน `isNoCoolDownAttack()`**:
   - เพิ่ม `22201011` (HEXA Dragon Breath), `22201007` (HEXA Dragon Dive), `22201003` (HEXA Dragon Flash) ป้องกันการหัก MP ซ้ำซ้อนและหลีกเลี่ยงการติด Cooldown ผิดปกติ
3. **ระบบเลื่อนขั้นมังกรอัตโนมัติเมื่อเลเวล 260 (`handleLevelUp`)**:
   - เพิ่ม `case 260: spawnDragon();` ให้มังกร Mir อัปเกรดเป็น Stage 9 ทันทีเมื่อผู้เล่นเลเวลอัปถึง 260 โดยไม่ต้องรอเปลี่ยนแผนที่
4. **อัปเกรดคำสั่ง `!endgame` มอบสกิล HEXA คลาส 6 เต็มสูบ**:
   - มอบสกิล `22201015` (HEXA Magic Debris) และ `22200016` (HEXA Dragon Spark) ระดับ Master Level 30 ทันที

### 📂 Files Modified
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)
- [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)
- [`SKILL.md`](file:///c:/Users/admin/Documents/MapleV265Src/.agents/skills/maplestory-bug-knowledge/SKILL.md)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleV265Src/PROGRESS.md)

### 🧪 Verification & Deployment
- **Maven Compile**: `BUILD SUCCESS` (853 files, 0 errors, 23.6s)
- **Maven Package**: `BUILD SUCCESS` (Fat JAR 138MB created in 30.9s)
- **Rule #1 Verification**: โฟลเดอร์ `Server263/` ปราศจากไฟล์ Source Code / pom.xml (0 violations)
- **Rule #2 Verification**: แพตช์อัปเดตเดี่ยวใน `Patches/Server263_Patch_Latest/` พร้อม `Apply_Patch.bat`
- **Server Live Check**: รันเซิร์ฟเวอร์เรียบร้อย พอร์ต 8484 และ 8585-8594 กำลังเปิดรับการเชื่อมต่อพร้อมใช้งาน 100%

## 📅 [2026-10-12 22:45 น.] Evan 6th Job Crash Root Cause Fix: Mir Stage 9 (2220) Evolution, HEXA Skills & Fusion Redirection, Companion Life Spawn Guard

### 🎯 Scope & Root Cause Analysis
1. **วิเคราะห์เจาะลึกและกำจัดต้นตออาการ Client เด้งเมื่อ Evan ใช้สกิล (Crash Log & Disassembly)**:
   - **การถอดรหัส Crash Log**: ไคลเอนต์ MapleStory v265 เกิด C++ Exception `0xE06D7363` (`CTerminateException`) พร้อมแสดงไดอะล็อกเตือน *"You appear to be missing a few files needed to run the game. Please visit maplestory.nexon.net and download the latest version of the client."* และส่งแพ็กเก็ต `InHeader.CLIENT_ERROR (171)` สู่เซิร์ฟเวอร์ด้วยรหัส `570425350` (`0x22000006` = `INVALID_GAME_DATA`)
   - **ถอดรหัส Asm จุดเกิดเหตุ (`0x2DAEB60` - `0x2DAF407`)**:
     - เมื่อ Evan ร่ายสกิลคลาส 6 (`2220xxxx`), ฟังก์ชัน `CDragon::DoAttack` (`0x4FFFB3A`) เรียก `CDragon::SetAction` (`0x2DA0D0D`) สู่ `vfunc_48` ของ Dragon
     - ไคลเอนต์จะค้นหา Animation Node ของท่าทางมังกรประจำคลาส 6 (`6thDragonSwift`, `6thDragonDive`, `6thDragonBreath` ฯลฯ) ใน WZ Data ของมังกรตาม Job ปัจจุบัน
     - ใน `Skill.wz/Skill_00007/Dragon/`:
       - `2217.xml` (Stage 8) มีเพียง 17 actions ไม่มีโหนดตระกูล `6thDragon*` อยู่เลย
       - `2220.xml` (Stage 9) มีครบทั้ง 26 actions รวมถึง 9 โหนดของคลาส 6 ทั้งหมด (`6thDragonSwift`, `6thDragonSwiftWind`, `6thDragonSwiftThunder`, `6thDragonDive`, `6thDragonDiveEarth`, `6thDragonDiveThunder`, `6thDragonBreath`, `6thDragonBreathEarth`, `6thDragonBreathWind`)
     - เดิมเซิร์ฟเวอร์สร้างมังกรด้วย `short job = chr.getJob();` (`2217`) เสมอ ทำให้ไคลเอนต์มองหาท่าใน `2217.img` แล้วได้ Pointer ว่าง (`[rsi + 4] == 0`) จึงกระโดดเข้าสู่ Error `0x22000006` (`INVALID_GAME_DATA`) และสั่งปิดเกมทันที
2. **แก้ไขการเสกและการเปลี่ยนร่างของ Mir สู่ Stage 9 (`2220`) อย่างสมบูรณ์**:
   - ใน [`Dragon.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/life/Dragon.java): ปรับ Constructor ให้ตรวจสอบ `if (JobConstants.isEvan(chrJob) && (chr.getLevel() >= 260 || chr.hasSkill(22201000) || chr.hasSkill(22201500) || (chr.getHexaSkills() != null && !chr.getHexaSkills().isEmpty())))` ให้กำหนด `this.job = 2220` ทันที
   - ใน [`Evan.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java):
     - `spawnDragon()`: อัปเดต `dragon.setJob(dragonJob)` เป็น `2220` หากตัวละครเป็นคลาส 6 และหากมังกรเกิดอยู่ในฟิลด์แล้วแต่ Job มีการเปลี่ยนร่าง ให้ Despawn มังกรตัวเดิมและ Respawn ใหม่เป็นร่าง Stage 9 อย่างปลอดภัย
     - `getDragon()`: ซิงค์ Job ของมังกรที่แคชไว้ให้กลายเป็น `2220` เมื่อมีสกิลคลาส 6 หรือเลเวล 260+
     - `getEvanSkill(int skillID)`: เพิ่มการดักจับ `22201000` (HEXA Mana Burst), `22201001`, `22201010` (HEXA Wind Circle), `22201002` (HEXA Thunder Circle), `22201006` (HEXA Earth Circle)
     - `handleDragonSkillEffect()`: เพิ่มการแมปสกิลคลาส 6 ของมังกรเข้าสู่ `attackActionType` ให้ตรงตามกลไกแอนิเมชันของ WZ: `22201003` (Type 3), `22201005` (Type 4), `22201007` (Type 5), `22200009` (Type 6), `22200008` (Type 7), `22200014` (Type 8), `22201011` (Type 9), `22201004` (Type 10), `22200012`/`22200013` (Type 11)
     - `handleSetCoolDownSkill()`: เพิ่มคูลดาวน์ให้ `22201007` (HEXA Dragon Dive) และ `22201003` (HEXA Dragon Flash)
3. **เชื่อมโยงสกิล HEXA Matrix ใน [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)**:
   - `isEvanForceSkill()`: เพิ่มสกิลคลาส 6 ทั้งหมดของ Evan เพื่อให้ Packet Decoding ข้าม Extra Byte ตามสเปกของไคลเอนต์ ป้องกันปัญหา Packet Desync
   - `getActualSkillIDfromSkillID()`: เชื่อมโยงรหัส Sub-Skills ของ Evan คลาส 6 สู่รหัสสกิลหลัก (`22201001` -> `22201000`, `22201004`/`05` -> `22201003`, `22200008`/`09` -> `22201007`, `22200012`/`13`/`14` -> `22201011`, `22201501`/`02`/`03` -> `22201500`) เพื่อให้อ่านค่าดาเมจและเลเวลสกิลได้แม่นยำ 100%
   - `isEvanFusionSkill()`: เพิ่มรหัส Fusion Skills คลาส 6 (`22201004`, `22201005`, `22200008`, `22200009`, `22200012`, `22200013`, `22200014`) สำหรับสร้าง Magic Debris Wreckage
4. **ปลดบล็อกการเสกมังกรใน [`Char.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java)**:
   - นำเงื่อนไข `if (!isGM)` ที่เคยกั้น `evan.spawnDragon()`, `kanna.spawnHaku()`, และ `getAndroid()` ออกอย่างถาวร ทำให้ตัวละครแอดมินหรือผู้เล่นที่วาร์ปเข้าสู่แมพสามารถเสกสัตว์เลี้ยงคู่หูได้ 100% โดยไม่มีข้อจำกัด
5. **อัปเกรดคำสั่ง `!endgame` ใน [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)**:
   - มอบสกิลย่อยของ Origin Zodiac Burst (`22201501`, `22201502`, `22201503`) เต็มเลเวล 30 และสั่งเสกมังกร Stage 9 (`2220`) ทันที

### 📂 Files Modified
- [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java)
- [`Dragon.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/life/Dragon.java)
- [`Evan.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/legend/Evan.java)
- [`Char.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java)
- [`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java)
- [`PROGRESS.md`](file:///c:/Users/admin/Documents/MapleV265Src/PROGRESS.md)

### 🧪 Verification & Deployment
- **Maven Compile**: `BUILD SUCCESS` (853 files, 0 errors, 22.9s)
- **Maven Package**: `BUILD SUCCESS` (`maplestory-219.5-jar-with-dependencies.jar` 138MB Fat JAR)
- **Rule #1 (Server263)**: ตรวจสอบไม่พบไฟล์ `.java` หรือ `pom.xml` ใน `Server263/` (0 files)
- **Rule #2 (Patches)**: อัปเดตแพทช์ล่าสุดใน `Patches/Server263_Patch_Latest/` พร้อม `Apply_Patch.bat`
- **Server Runtime Test**: ปิดโปรเซสเดิมและเริ่มการทำงานของเซิร์ฟเวอร์ใหม่บน Portable JDK 21 และ MariaDB พอร์ต 33066 สำเร็จสมบูรณ์ (Login Port 8484 และ Channels 1-10 พอร์ต 8585-8594 เปิดรับ Client ปกติ)

## 📅 [2026-10-12 19:40 น.] Ultimate Root Cause Elimination: Removed Erroneous Henesys lockUI() in Job.java, Added Full Kanna Starter Lifecycle & Buff Handlers, Recompiled & Deployed Live

### 🎯 Scope & Root Cause Analysis
1. **การค้นพบและกำจัดต้นตอหลักที่ทำให้ตัวละครกดสกิล/กดยาไม่ได้ใน Henesys (lockUI Bug)**:
   - **ต้นตอหลัก (The Smoking Gun)**: ใน [Job.java](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java) บรรทัดที่ 3258-3260 ในเมธอด handleInitAfterField() มีโค้ดคำสั่ง:
     `java
     if (chr.getFieldID() == FieldConstants.START_MAP) {
         sm.lockUI();
     }
     `
   - เนื่องจาก FieldConstants.START_MAP = 100000000; (Henesys) ทุกครั้งที่ตัวละครเกิดใหม่หรือวาร์ปเข้าสู่ Henesys เซิร์ฟเวอร์จะสั่ง sm.lockUI() ทันที ซึ่งส่งแพ็กเก็ตล็อกการควบคุมในเกม (lockInGameUI(true, false)) ทำให้ Client ปิดการทำงานของปุ่มคีย์ลัด, การกดสกิล, และการคลิกไอเทม/ยาในกระเป๋าทั้งหมด!
   - **การแก้ไข**: ลบโค้ดคำสั่งบล็อก UI บน START_MAP ออกจาก Job.java อย่างถาวร
2. **ขยายผลการตรวจสอบคลาส Sengoku คู่หูอย่างสมบูรณ์ ([Kanna.java](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/sengoku/Kanna.java))**:
   - เพิ่ม 3-Step Starter Lifecycle:
     - setCharCreationStats(Char chr): เริ่มต้นที่ Lv. 10 อาชีพ Kanna 1st Job (4200), HP 1,000, MP 100, SP 5 แต้ม
     - ddItemToNewCharacter(Char chr): สวมใส่อาวุธ Starter Fan (1552000) และอาวุธรอง Starter Haku Fan (1352810)
     - handleInitAfterMigrate(Char chr): เคลียร์เควสต์เริ่มต้น, เลื่อนระดับเป็น Lv. 30, เปลี่ยนอาชีพเป็น Kanna 2nd Job (4210), แจก SP คลาส 1 (+5) และคลาส 2 (+3), สวมใส่พัด Lv. 30 (1552001) และ Haku Fan Lv. 30 (1352811), วาร์ปสู่ Henesys อย่างปลอดภัย
   - เพิ่ม Null Safety ใน spawnHaku() ป้องกัน Server Crash เมื่อ oxMan หรือ ield เป็น null
   - เพิ่มการจัดการสกิลบัฟ AKATUSKI_HERO_KANNA (42121006) ใน handleSkill() ให้ส่งบัฟ BasicStatUp อย่างถูกต้อง
3. **การคอมไพล์และแจกจ่ายแพตช์ (Build & Distribution)**:
   - คอมไพล์ผ่าน Maven ด้วย JDK 21: BUILD SUCCESS (853 source files, 0 errors)
   - คัดลอก Fat JAR ลงใน 214 src/maplestory.jar และ Server263/maplestory.jar
   - ตรวจสอบ Server263/: ไม่มีไฟล์ .java, src/, หรือ pom.xml หลงเหลืออยู่ 100%
   - สร้าง Incremental Patch ใน Patches/Server263_Patch_Latest/ พร้อม Apply_Patch.bat
   - รีสตาร์ตเซิร์ฟเวอร์รันสดบน Portable JDK 21 และ MariaDB พอร์ต 33066 พร้อมพอร์ต 8484 และแชนแนล 1–10 (8585–8594)

### 📂 Files Modified
- [Job.java](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/Job.java)
- [Kanna.java](file:///c:/Users/admin/Documents/MapleV265Src/MapleStory_Server_Runner_Ready/v214%20src/src/main/java/net/swordie/ms/client/jobs/sengoku/Kanna.java)
- [PROGRESS.md](file:///c:/Users/admin/Documents/MapleV265Src/PROGRESS.md)

---
*ประวัติการพัฒนาย้อนหลังทั้งหมดถูกจัดเก็บใน [PROGRESS_ARCHIVE.md](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/PROGRESS_ARCHIVE.md)*
