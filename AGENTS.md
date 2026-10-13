# MapleStory Server Runner - Project Memory & Rules

## 1. Official Distribution Package & Compilation Target
- โฟลเดอร์ **`Server263`** (`c:\Users\admin\Documents\MapleStory_Server_Runner\Server263`) คือ **"ซอสที่ทำการแพ็คแล้วพร้อมแจกจ่าย"** และเป็น **"โฟลเดอร์เป้าหมายหลักที่จะต้องคอมไพลน์และส่งมอบไฟล์ (Deploy) ไปเสมอทุกครั้ง"**
- ทุกครั้งที่คอมไพล์โค้ด Java สำเร็จ (`mvn clean package -DskipTests` หรือรัน `2_Build_Server.bat`) ไฟล์ `maplestory.jar` จะต้องถูกคัดลอกลงใน `Server263\maplestory.jar` และ Root เสมอ
- ห้ามใส่ Source Code, Build Tools (Maven), หรือไฟล์ชั่วคราวลงใน `Server263`
- ต้องรันได้ทันที **100% ในทุกเครื่องและทุกไดรฟ์** (C:, D:, E:, USB Drive ฯลฯ) โดยไม่ต้องติดตั้ง Java, MariaDB, หรือ MySQL ในระบบเครื่อง

## 2. กฎความ Portable ข้ามเครื่องและข้ามไดรฟ์ (Strict Portability Rules)
1. **ห้ามมี Hardcoded Path**: ห้ามเขียน Path เต็มแบบ `C:\...` หรือ `C:/Users/...` ลงในไฟล์คอนฟิก (`my.ini`, `server.properties`, batch scripts) ภายใน `Server263` โดยเด็ดขาด
2. **Path สัมพัทธ์และไดนามิก**:
   - ใช้ `%~dp0` ในไฟล์ Batch script เสมอ
   - MariaDB ใช้พอร์ตดีฟอลต์ `33066` เพื่อหลบชน MySQL 3306 ของเครื่องเป้าหมาย
   - ลบไฟล์ `mariadb\data\my.ini` เก่าทิ้งอัตโนมัติ เพื่อป้องกันการจดจำ Path จากเครื่องเดิม
   - สคริปต์จะทำการ Generate `mariadb\my.ini` แบบไดนามิกตาม Directory ปัจจุบัน พร้อมครอบเครื่องหมายคำพูด `""` ป้องกันปัญหาโฟลเดอร์ที่มีช่องว่าง (Spaces in path)
3. **โครงสร้างภายใน `Server263`**:
   - `mariadb/`: MariaDB Portable Engine (พอร์ต 33066)
   - `jdk21/`: OpenJDK 21 Portable Runtime
   - `maplestory.jar`: Pre-compiled Fat JAR (~138 MB)
   - `data/`: ข้อมูล `wz265`, `dat265`, `scripts`, `resources`
   - `Client_Patch_Files/`: ไฟล์ Patch สำหรับต่อเข้าเล่น (Launcher.exe, Localhost.dll, Run_Game.bat, launcher.ini, Install_Client_Patch.bat)
   - `server.properties`: คอนฟิกเรท Drop / EXP / Port
   - `1_Start_Server.bat`, `3_Stop_Server.bat`, `4_Server_Control_Panel.bat`, `Import_Database.bat`, `Create_Account.bat`, `Create_Update_Patch.bat`

## 3. ความสัมพันธ์กับโฟลเดอร์อื่น
- **Root Directory**: ไฟล์ Batch ที่ Root (`1_Start_Server.bat`, `3_Stop_Server.bat`, `4_Server_Control_Panel.bat`, `Create_Account.bat`, `Import_Database.bat`) ทำหน้าที่เป็น Smart Launcher ชี้ตรงมาที่ `Server263` เป็นหลัก
- **`v214 src/`**: สภาพแวดล้อมสำหรับพัฒนาและคอมไพล์โค้ดต้นฉบับ (Development & Source Workspace)
- **`maple265src/`**: Raw Git Clone จากรีโป หากมีคนกดรัน สคริปต์จะแจ้งเตือนและ Redirect ไปที่ `Server263` ทันที

## 4. นโยบายการทดสอบและการจัดทำไฟล์แพตช์ (Testing-First & Incremental Patch Policy)
1. **กฎเหล็กการทดสอบก่อนทำแพตช์ (Strict Test-First Policy)**:
   - **ต้องทดสอบให้เรียบร้อยก่อนเสมอแล้วจึงค่อยทำไฟล์แพตช์**: เมื่อมีการแก้ไขโค้ด Java หรือสคริปต์ ให้ทำการคอมไพล์ รันเซิร์ฟเวอร์ และ**ทดสอบการทำงานจริงในเกม (In-Game Testing) ให้ผ่าน 100% ก่อนเสมอ** เพื่อให้มั่นใจว่าฟีเจอร์ทำงานถูกต้อง ไม่มี Error และไม่เกิด Client/Server Crash แล้วจึงค่อยรันสคริปต์สร้างไฟล์แพตช์ (`Create_Update_Patch.bat` / `tools/create_patch.py`) เพื่อไม่ให้เสียเวลาสร้างไฟล์แพตช์ซ้ำซ้อนไปมาหากพบจุดบกพร่องภายหลัง
2. **รวมไฟล์แพตช์เป็นไฟล์เดียวเบ็ดเสร็จ (Single All-in-One Patch Archive)**:
   - ในโฟลเดอร์ **`Patches/`** จะต้องมี **เพียงไฟล์เดียวเท่านั้น (Strictly Single File 100%)** คือ:
     - **`Patches/Server263_Patch_Latest.zip`**
   - **ห้ามสร้างไฟล์แตกย่อยซ้ำซ้อน**: ห้ามแยก Client Patch ออกมาเป็น zip ต่างหาก และห้ามเก็บไฟล์ zip ที่มี Timestamp ซ้ำซ้อน เพื่อไม่ให้กินพื้นที่และไม่ทำให้ผู้ใช้สับสน
   - ภายในแพ็กเกจเดี่ยวนี้จะรวมครบทุกอย่าง: Server Core (`maplestory.jar`, properties, batch scripts, `backup.sql`), Scripts ล่าสุด (`data/scripts/`), Drop Tables (`data/resources/`), โฟลเดอร์ `Client_Patch_Files/` (Launcher, Localhost.dll, config) และสคริปต์ `Apply_Patch.bat` ที่อัปเดตเซิร์ฟเวอร์พร้อมถามผู้ใช้เพื่อติดตั้งแพตช์เข้าโฟลเดอร์ตัวเกม MapleStory ได้ในคลิกเดียว
3. **นโยบายไม่บีบอัดไฟล์ WZ ซ้ำ**:
   - **ห้ามให้ผู้ใช้บีบอัดไฟล์ WZ ใหม่อีกเด็ดขาด**: ไฟล์ WZ Data (`data/wz265/`) มีขนาดใหญ่มาก (~5 GB, ~400,000 ไฟล์) ผู้ใช้จะทำการบีบอัดไฟล์ตัวเต็ม (Base Package) เพียงครั้งเดียวเท่านั้น
   - ผู้ใช้นำไฟล์แพตช์ไปก๊อปปี้วางทับใน `Server263/` ด้วย `Apply_Patch.bat` ได้ทันทีใน 2 วินาที โดยรักษาฐานข้อมูลตัวละครและไฟล์ WZ เดิมไว้ 100%

## 5. มาตรฐานการพัฒนาสกิลคลาส 6 & กระบวนการทำงาน (Workflow)
1. **ข้อมูล WZ และ .DAT ใน Server263**:
   - ข้อมูล Skill v265 มีครบ 100% ใน `Server263/data/wz265/Skill.wz/` และ `Server263/data/dat265/skills/`
   - ค่าความเสียหาย %, คูลดาวน์, และมานาถูกดึงตรงจาก WZ ผ่าน `SkillData.java`
2. **รูปแบบ Origin Skill (6th Job)**:
   - ใน `handleSkill()`: มอบสถานะอมตะ `CharacterTemporaryStat.IndieNotDamaged` (7 วินาที) และส่งแพ็กเก็ตคัทซีนปาร์ตี้ `UserLocal.showHexaSkillEff(chr)`
   - ใน `handleAttack()`: ติดสถานะ `MobStat.Freeze` (10 วินาที Absolute Bind) และ `MobStat.OriginDebuff` (20 วินาที) ให้มอนสเตอร์ทุกตัวที่ถูกโจมตีด้วย `EnumMap<MobStat, Option>`
3. **รูปแบบ HEXA Mastery Skills**:
   - บรรจุสกิลคลาส 6 เข้าไปใน Array / ฟังก์ชันตรวจสอบประเภทสกิลของอาชีพนั้นๆ (เช่น `possessionSkills`, `executionSkills`, `isHumanitySkill()`, `isEarthSkill()` ฯลฯ) เพื่อให้ระบบชาร์จเกจและคอมโบทำงานได้อย่างไร้รอยต่อ
4. **กระบวนการทำงานที่เป็นมาตรฐาน (Standardized Workflow)**:
   ```text
   [แก้ไขโค้ด Java หรือ Python Script]
               │
               ▼
   [รัน Maven Package ใน v214 src (2_Build_Server.bat)]
               │
               ▼
   [ตรวจสอบ BUILD SUCCESS]
               │
               ▼
   [Deploy maplestory.jar ไปยัง Server263/ และ Root]
               │
               ▼
   [รันเซิร์ฟเวอร์และทดสอบจริงในเกม (In-Game Testing) ให้ผ่าน 100%]
               │
               ▼
   [สร้างไฟล์แพตช์เดี่ยวผ่าน tools/create_patch.py -> Patches/Server263_Patch_Latest.zip]
               │
               ▼
   [บันทึก PROGRESS.md ทั้ง root และ v214 src/ พร้อมระบุเวลาจริง]
               │
               ▼
   [Git Add & Git Commit & Git Push ทุกอย่างรวมถึงเอกสารทั้งหมด]
   ```

## 6. คำสั่งลับสำหรับทดสอบระบบเฉพาะผู้พัฒนา (Private Admin Testing Commands: `!endgame`)
- **ห้ามใส่ปุ่มโกงหรือเมนูทดสอบลงในสคริปต์สาธารณะเด็ดขาด**: ไฟล์สำหรับแจกจ่ายผู้เล่นทั่วไป (`quick_adminNPC.py`, `PlayerCommands.java` ฯลฯ) ต้องสะอาด 100% ปราศจากปุ่มโกง
- **การทดสอบทำผ่านคำสั่งลับระดับ Admin เท่านั้น** (`requiredType = Admin` ใน `AdminCommands.java`):
  - ไอดีดีฟอลต์ในตัวเกมคือ `admin` / `admin` ซึ่งมีสิทธิ์ `Admin` (Permission Level 4) อยู่แล้ว
  - **คำสั่งบูสต์ตัวละครปัจจุบัน**:
    - `!endgame` หรือ `!test6` หรือ `!boost`
  - **คำสั่งเปลี่ยนอาชีพและบูสต์ทันทีในคำสั่งเดียว**:
    - `!endgame <class_name>` เช่น `!endgame khali`, `!endgame lara`, `!endgame illium`, `!endgame ark`, `!endgame hoyoung`, `!endgame kain`, `!endgame hayato`, `!endgame kanna`, `!endgame adele` ฯลฯ
- **มาตรฐานผลลัพธ์ของคำสั่ง `!endgame` (Strict Zero-Skill-Injection Standard)**:
  1. **เลเวลและสเตตัส**: ปรับเลเวลตัวละครเป็น 260, ฟื้นฟู HP/MP เต็ม 100%, และมอบค่า AP (1,250 แต้ม)
  2. **ปลดล็อกระบบ Matrix เควสต์**: สำเร็จเควสต์คลาส 5 (1460-1466) และเควสต์คลาส 6 (1488) เพื่อเปิดใช้งาน Matrix UI
  3. **แต้ม SP ตามธรรมชาติ**: มอบแต้ม SP เต็มพิกัดผ่าน ExtendSP และ Stat.sp เพื่อให้ผู้เล่นนำไปอัปสกิลคลาส 1 - 4 ด้วยตนเอง
  4. **ของใช้และวัตถุดิบสำหรับ V Matrix และ HEXA Matrix**:
     - Nodestones x3,000 (`2435719`)
     - Experience Nodestones x20 (`2437760`)
     - Sol Erda Energy x1,000 (`2636421`)
     - Sol Erda Fragments x30,000 (`4009548`)
     - Power Elixirs x3,000 (`2000005`)
  5. **อุปกรณ์สวมใส่ BiS ตรงสายอาชีพ 100%**:
     - อาวุธ Arcane Umbra ประจำอาชีพ
     - อาวุธรอง Princess No / BiS Secondary ประจำอาชีพ
     - Emblem (Mitra Emblem / Gold Emblem) ประจำอาชีพ
     - เซ็ตชุดเกราะ Arcane Umbra 6 ชิ้น (หมวก, เสื้อ, กางเกง, รองเท้า, ถุงมือ, ผ้าคลุม)
  6. **เงินทุน**: มอบเงิน 10,000,000,000 Mesos (10B)
- **กฎเหล็กเด็ดขาด (Strict Zero Skill Injection Policy)**:
  - ⚠️ **ห้ามยัดสกิล (Skill IDs) หรือเซ็ตเลเวลสกิลลงในตัวละครโดยเด็ดขาด**:
    - **ห้ามเรียก `chr.addSkill`, `chr.setHexaSkill`, หรือ `mc.setSkillLevel` ใน `!endgame`**
    - **เหตุผล**: การยัดสกิลลัดขั้นตอนจะทำให้ Skill Book เสียหาย มีไอคอนบัคที่กดไม่ได้ สกิลซ้อนทับกัน คูลดาวน์ชนกัน หรือตัวเกม Crash จากการ Desync ของ Data
    - **ผู้เล่นจะเป็นผู้กดเปิดหิน Nodestones, ปลดล็อกแกน HEXA Matrix, และจัดสรรแต้ม SP ด้วยตนเองตามกลไกธรรมชาติของระบบเกม**

## 7. มาตรฐานการ Push Git และบันทึก Progress (Git Sync & Progress Logging Standard)
1. **กฎเหล็กการ Push Git ทุกอย่าง (Push Everything Policy)**:
   - **ต้อง Push ทุกอย่าง รวมถึงไฟล์เอกสารทั้งหมดเสมอ**: เมื่อทำการ Git Commit & Push จะต้องทำ `git add .` หรือระบุทุกไฟล์ที่มีการเปลี่ยนแปลง รวมถึงไฟล์เอกสาร (`PROGRESS.md`, `AGENTS.md`, `README.md`, Markdown guides, scripts, configs, tools)
   - **ห้ามเว้นไฟล์เอกสารหรือปล่อยค้างไว้ที่ Local เด็ดขาด**: เพื่อให้ทุกเครื่องที่ทำการ `git pull` ได้รับข้อมูลอัปเดตตรงกัน 100% และดำเนินงานไปในทิศทางเดียวกันเสมอ ปราศจากความขัดแย้งของโค้ดและเอกสาร
2. **มาตรฐานการบันทึกและแจกแจง Progress (`PROGRESS.md`)**:
   - **ต้องระบุเวลาที่แก้ไขเสมอ**: บันทึกทั้งวันที่และเวลาจริง (เช่น `[2026-10-13 14:45 น.]` หรือ `10fc703f (14:03 น.)`)
   - **รูปแบบและโครงสร้างประโยคมาตรฐาน**:
     - หัวข้อ: `Hash (เวลา น.) — หัวข้อภาษาไทยที่กระชับได้ใจความ (หัวข้ออังกฤษ)`
     - โครงสร้าง 2 บล็อกหลัก:
       - `- **หัวข้อ**: <Commit Subject / Feature Scope>`
       - `- **รายละเอียด**:`
         - แจกแจงแยกหมวดย่อย ปัญหาที่พบ (Problem) -> สาเหตุเชิงเทคนิค -> วิธีแก้ (Fix/Implementation) -> ผลลัพธ์ (Outcome)
         - ทำ clickable link ไฟล์ที่แก้ไขเสมอ เช่น `[Job.java](file:///...)`
   - **การจัดเก็บเอกสาร**: บันทึกลงใน `v214 src/PROGRESS.md` และซิงค์มาที่ `PROGRESS.md` ในรูทเสมอ เพื่อให้สอดคล้องกันทุกเซสชัน

## 8. มาตรฐานการพอร์ตและตรวจสอบข้อมูลอ้างอิงข้ามเวอร์ชัน (TMS Reference & Strict ID Audit Rules)
1. **บทบาทของคลังข้อมูลอ้างอิงหลัก (Reference Repository)**:
   - โฟลเดอร์ `TMS277_REF_NomainSource/tms273/`:
     - `script/event/`: แมคคานิคบอส 81 ตัว (Kalos, Kaling, Seren, Limbo, Extreme Lotus, Black Mage ฯลฯ)
     - `script/boss/`: ตารางดรอปและคำนวณของรางวัลบอส (`BOSS_REWARD_APPLY.js`, `boss_crystallize.js`)
     - `script/ScriptAPI.d.ts`: คัมภีร์นิยามเมธอดของระบบ Script Engine ทั้งหมด (2,067 บรรทัด)
     - `data/MobReward/`: ข้อมูลอัตราการดรอปของมอนสเตอร์ 1,987 ตัว
     - `data/Shop/`: สินค้าร้านค้า NPC 169 ร้าน
   - **จุดประสงค์หลักในการใช้งาน TMS REF**:
     - **ใช้เป็น Reference สูตรการคำนวณ**: ใช้สำหรับอ้างอิงสูตรคำนวณตัวเลข (Formulas), Logic การคิดความเสียหาย/อัตราการดรอป, และระบบ Event Mechanics
     - **ส่วนไหนใน TMS ที่ทำไว้สมบูรณ์และเป็นมาตรฐาน**: สามารถดึงมาเป็น Reference และพอร์ตมาปรับใช้เข้ากับเซิร์ฟเวอร์ v265 ของเราได้ทันที
2. **กฎเหล็กการตรวจสอบ ID ป้องกันความคลาดเคลื่อน (Strict ID & Asset Audit Policy)**:
   - ⚠️ **คำเตือนสำคัญ**: ข้อมูลใน `tms273` มาจาก MapleStory ไต้หวันเวอร์ชัน 273 ส่วนเซิร์ฟเวอร์ของเราคือเวอร์ชัน 265 ข้อมูล ID บางประเภทอาจไม่ตรงกัน หรือมีไอเทม/มอนสเตอร์เฉพาะเซิร์ฟเวอร์ไต้หวัน (TMS Exclusive)
   - **ห้ามคัดลอก ID จาก TMS มาใส่ในโค้ดหรือฐานข้อมูล v265 โดยเด็ดขาดจนกว่าจะผ่านการตรวจสอบ 100%**:
     - **Mob IDs (มอนสเตอร์และบอส)**:
       - ต้องตรวจสอบเทียบกับ `Server263/data/wz265/Mob.wz/<MobID>.img.xml` หรือ `Server263/data/wz265/String.wz/Mob.img.xml` ทุกครั้งว่ามีรหัสมอนสเตอร์นั้นอยู่ใน v265 จริงหรือไม่
       - หากเป็นบอสหลายเฟส (เช่น Kaling / Kalos / Seren) ให้ตรวจเช็คว่าทุก Mob ID ในทุกเฟสมีไฟล์ WZ รองรับในเครื่อง
     - **Item IDs (ไอเทมและของรางวัล)**:
       - ต้องตรวจสอบเทียบกับ `Server263/data/wz265/Item.wz/` และ `Character.wz/`
       - หากพบไอเทม TMS Exclusive (เช่น กล่องสุ่มเฉพาะ หรือไอเทมที่ไม่มีใน v265) ต้องตัดออก หรือแปลงเป็นไอเทมสากลของ v265
     - **Map IDs (แผนที่และโถงบอส)**:
       - ต้องตรวจสอบกับ `Server263/data/wz265/Map.wz/Map/Map<X>/<MapID>.img.xml` เพื่อให้แน่ใจว่าผู้เล่นจะไม่ถูกวาร์ปไปแผนที่ว่างเปล่าจนเกิด Error แดงหรือจอดำ
     - **Reactor IDs & Portal Names**:
       - ต้องตรวจสอบชื่อพอร์ทัลและ ID แท่นหิน/คริสตัลใน `Server263/data/wz265/Reactor.wz/`
3. **ขั้นตอนการพอร์ตที่เป็นมาตรฐาน (Standardized Porting Workflow)**:
   - **Step 1: Automated Asset Audit (สแกนออดิตอัตโนมัติ)**:
     - ก่อนเริ่มเขียนโค้ด ให้รันสคริปต์ตรวจสอบ IDs ทั้งหมด (Mob, Item, Map) ที่อยู่ในไฟล์ JavaScript นั้น เทียบกับฐานข้อมูล WZ ของ v265 ก่อนเสมอ
   - **Step 2: Script Logic Translation (แปลงตรรกะ JavaScript เป็น SwordieMS)**:
     - แมปคำสั่งจาก `ScriptAPI.d.ts` ไปยัง API ของเซิร์ฟเวอร์เรา:
       - `event.startTimer(name, ms)` ➔ `field.startTimer(sec)` หรือ Event Timer
       - `stage.changeMap(mapId, portal)` ➔ `chr.warp(mapId, portal)`
       - `members[i].setReviveCount(count)` ➔ `chr.setDeathCount(count)`
       - `event.getMap(fieldId).killAllMob()` ➔ `field.killAllMobs()`
       - `mob.getDataId()` ➔ `mob.getTemplateId()`
       - `stage.gainItem(itemId, count)` ➔ `chr.addItemToInventory(itemId, count)`
   - **Step 3: Verification & In-Game Testing (ทดสอบจริงในเกม)**:
     - คอมไพล์และทดสอบในเกม ตรวจสอบการเกิดของมอนสเตอร์ เลือดบอส คัตซีน และกลไกผ่านตัวละคร Admin ให้ผ่านสมบูรณ์ 100%
   - **Step 4: Update Documentation & Git Push (บันทึกและพุชทุกไฟล์)**:
     - บันทึกการเปลี่ยนแปลงใน `PROGRESS.md` ทั้ง root และ `v214 src/` พร้อมระบุเวลาเสมอ และทำ `git push` ทุกอย่างรวมทั้งไฟล์เอกสาร
