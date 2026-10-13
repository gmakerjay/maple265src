# MapleStory Server Runner - Project Memory & Rules

## 1. Official Distribution Package & Compilation Target
- โฟลเดอร์ **`Server263`** (`c:\Users\admin\Documents\MapleV265Src\MapleStory_Server_Runner_Ready\Server263`) คือ **"ซอสที่ทำการแพ็คแล้วพร้อมแจกจ่าย"** และเป็น **"โฟลเดอร์เป้าหมายหลักที่จะต้องคอมไพลน์และส่งมอบไฟล์ (Deploy) ไปเสมอทุกครั้ง"**
- ทุกครั้งที่คอมไพล์โค้ด Java สำเร็จ (`mvn clean package -DskipTests` หรือรัน `2_Build_Server.bat`) ไฟล์ `maplestory.jar` จะต้องถูกคัดลอกลงใน `Server263\maplestory.jar` เสมอ
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
   - `Client_Patch_Files/`: ไฟล์ Patch สำหรับต่อเข้าเล่น (Launcher.exe, Localhost.dll, Run_Game.bat, launcher.ini)
   - `server.properties`: คอนฟิกเรท Drop / EXP / Port
   - `1_Start_Server.bat`, `3_Stop_Server.bat`, `4_Server_Control_Panel.bat`, `Import_Database.bat`

## 3. ความสัมพันธ์กับโฟลเดอร์อื่น
- **Root Directory**: ไฟล์ Batch ที่ Root (`1_Start_Server.bat`, `3_Stop_Server.bat`, `4_Server_Control_Panel.bat`) จะชี้ตรงมาที่ `Server263` เป็นหลัก
- **`v214 src/`**: สภาพแวดล้อมสำหรับพัฒนาและคอมไพล์โค้ดต้นฉบับ (Development & Source Workspace)
- **`maple265src/`**: Raw Git Clone จากรีโป หากมีคนกดรัน สคริปต์จะแจ้งเตือนและ Redirect ไปที่ `Server263` ทันที

## 4. นโยบายการแจกจ่ายแบบ Patch (Incremental Patch Policy)
- **ห้ามให้ผู้ใช้บีบอัดไฟล์ WZ ใหม่อีกเด็ดขาด**: ไฟล์ WZ Data (`data/wz265/`) มีขนาดใหญ่มาก (~5 GB, ~400,000 ไฟล์) ผู้ใช้จะทำการบีบอัดไฟล์ตัวเต็ม (Base Package) เพียงครั้งเดียวเท่านั้น
- **เมื่อมีการแก้ไขโค้ดหรืออัปเดตระบบในอนาคต**: ให้จัดเตรียมเฉพาะ **"ไฟล์แพตช์ (Update Patch)"** ที่มีเฉพาะไฟล์ที่มีการเปลี่ยนแปลงเท่านั้น เช่น:
  - `maplestory.jar` (~138 MB เมื่อแก้โค้ด Java)
  - สคริปต์ที่แก้ไขใน `data/scripts/` (กรณีแก้สคริปต์ NPC / เควสต์)
  - `server.properties` หรือไฟล์สคริปต์ Batch
  - ไฟล์ `.sql` Patch (ถ้ามีการปรับแต่งตารางฐานข้อมูล)
- ผู้ใช้นำไฟล์แพตช์ไปก๊อปปี้วางทับใน `Server263/` ได้ทันทีในไม่กี่วินาที โดยไม่ต้องเสียเวลาบีบอัดไฟล์ WZ ใหม่อีกเลย

## 5. มาตรฐานการพัฒนาสกิลคลาส 6 (HEXA Matrix Implementation Standards)
1. **ข้อมูล WZ และ .DAT ใน Server263**:
   - ข้อมูล Skill v265 มีครบ 100% ใน `Server263/data/wz265/Skill.wz/` และ `Server263/data/dat265/skills/`
   - ค่าความเสียหาย %, คูลดาวน์, และมานาถูกดึงตรงจาก WZ ผ่าน `SkillData.java`
2. **รูปแบบ Origin Skill (6th Job)**:
   - ใน `handleSkill()`: มอบสถานะอมตะ `CharacterTemporaryStat.IndieNotDamaged` (7 วินาที) และส่งแพ็กเก็ตคัทซีนปาร์ตี้ `UserLocal.showHexaSkillEff(chr)`
   - ใน `handleAttack()`: ติดสถานะ `MobStat.Freeze` (10 วินาที Absolute Bind) และ `MobStat.OriginDebuff` (20 วินาที) ให้มอนสเตอร์ทุกตัวที่ถูกโจมตีด้วย `EnumMap<MobStat, Option>`
3. **รูปแบบ HEXA Mastery Skills**:
   - บรรจุสกิลคลาส 6 เข้าไปใน Array / ฟังก์ชันตรวจสอบประเภทสกิลของอาชีพนั้นๆ (เช่น `possessionSkills`, `executionSkills`, `isHumanitySkill()`, `isEarthSkill()` ฯลฯ) เพื่อให้ระบบชาร์จเกจและคอมโบทำงานได้อย่างไร้รอยต่อ
4. **กระบวนการทดสอบและจัดส่ง**:
   - ทำทีละอาชีพ -> รัน `mvn clean package -DskipTests` -> ตรวจสอบ `BUILD SUCCESS` -> อัปเดต `maplestory.jar` -> รัน `tools/create_patch.py` -> อัปเดต `PROGRESS.md` -> Git Commit & Push

## 6. คำสั่งลับสำหรับทดสอบระบบเฉพาะผู้พัฒนา (Private Admin Testing Commands)
- **ห้ามใส่ปุ่มโกงหรือเมนูทดสอบลงในสคริปต์สาธารณะเด็ดขาด**: ไฟล์สำหรับแจกจ่ายผู้เล่นทั่วไป (`quick_adminNPC.py`, `PlayerCommands.java` ฯลฯ) ต้องสะอาด 100% ปราศจากปุ่มโกง
- **การทดสอบทำผ่านคำสั่งลับระดับ Admin เท่านั้น** (`requiredType = Admin` ใน `AdminCommands.java`):
  - ไอดีดีฟอลต์ในตัวเกมคือ `admin` / `admin` ซึ่งมีสิทธิ์ `Admin` (Permission Level 4) อยู่แล้ว
  - **คำสั่งบูสต์ตัวละครปัจจุบัน**:
    - `!endgame` หรือ `!test6` หรือ `!boost`
  - **คำสั่งเปลี่ยนอาชีพและบูสต์ทันทีในคำสั่งเดียว**:
    - `!endgame khali` (Flora - 15412)
    - `!endgame lara` (Anima - 16212)
    - `!endgame illium` (Flora - 15212)
    - `!endgame ark` (Flora - 15512)
    - `!endgame hoyoung` (Anima - 16412)
    - `!endgame kain` (Nova - 6312)
  - **ผลลัพธ์อัตโนมัติ**:
    1. ปรับเลเวลตัวละครเป็น 260
    2. สำเร็จเควสต์คลาส 5 (1460-1466) และเควสต์คลาส 6 (1488) ทันที
    3. มอบแต้ม SP เต็มพิกัดผ่าน ExtendSP และ Stat.sp เพื่อให้ผู้เล่นอัปสกิลคลาส 1 - 4 เองด้วยตนเอง (ห้ามใส่ chr.addSkill หรือ chr.maxSkills ลงใน !endgame)
    4. มอบสกิล V-Matrix คลาส 5 ประจำอาชีพ เลเวล 30 เต็ม
    5. มอบ Origin Skill คลาส 6 (Lv.30) และ HEXA Mastery Skills คลาส 6 ทุกสกิล (Lv.30)
    6. เพิ่มเงิน 2,000,000,000 Mesos
    7. มอบ Sol Erda Energy x20 และ Sol Erda Fragment x1,000
    8. มอบอาวุธ Arcane Umbra ประจำอาชีพ และฟื้นฟู HP/MP เต็ม 100%
- **เมื่อเขียนโค้ดคลาส 6 ให้กับอาชีพใหม่ในอนาคต**: ให้เพิ่มรหัสสกิล V-Matrix และ HEXA ของอาชีพนั้นลงในเมธอด `AdminCommands.setupEndgame(chr, targetJob)` เสมอเพื่อให้สามารถทดสอบได้ทันที

## 7. มาตรฐานการบันทึกและแจกแจง Progress (Progress Logging & Reporting Standard)
- **ต้องระบุเวลาที่แก้ไขเสมอ**: บันทึกทั้งวันที่และเวลาจริง (เช่น `[2026-10-12 11:00 น.]` หรือ `34c9857 (22:51 น.)`)
- **รูปแบบและโครงสร้างประโยคมาตรฐาน**:
  - หัวข้อ: `Hash (เวลา น.) — หัวข้อภาษาไทยที่กระชับได้ใจความ (หัวข้ออังกฤษ)`
  - โครงสร้าง 2 บล็อกหลัก:
    - `- **หัวข้อ**: <Commit Subject / Feature Scope>`
    - `- **รายละเอียด**:`
      - แจกแจงแยกหมวดย่อย ปัญหาที่พบ (Problem) -> สาเหตุเชิงเทคนิค -> วิธีแก้ (Fix/Implementation) -> ผลลัพธ์ (Outcome)
      - ทำ clickable link ไฟล์ที่แก้ไขเสมอ เช่น `[Job.java](file:///...)`
- **การจัดเก็บเอกสาร**: บันทึกลงใน `v214 src/PROGRESS.md` และซิงค์มาที่ `PROGRESS.md` ในรูทเสมอ เพื่อให้สอดคล้องกันทุกเซสชัน

## 8. มาตรฐานการพอร์ตและตรวจสอบข้อมูลอ้างอิงข้ามเวอร์ชัน (Cross-Version Porting & Strict ID Audit Rules)
1. **คลังข้อมูลอ้างอิงหลัก (Reference Repository)**:
   - โฟลเดอร์ `TMS277_REF_NomainSource/tms273/`:
     - `script/event/`: แมคคานิคบอส 81 ตัว (Kalos, Kaling, Seren, Limbo, Extreme Lotus, Black Mage ฯลฯ)
     - `script/boss/`: ตารางดรอปและคำนวณของรางวัลบอส (`BOSS_REWARD_APPLY.js`, `boss_crystallize.js`)
     - `script/ScriptAPI.d.ts`: คัมภีร์นิยามเมธอดของระบบ Script Engine ทั้งหมด (2,067 บรรทัด)
     - `data/MobReward/`: ข้อมูลอัตราการดรอปของมอนสเตอร์ 1,987 ตัว
     - `data/Shop/`: สินค้าร้านค้า NPC 169 ร้าน
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
   - **Step 3: Verification & In-Game Testing**:
     - ทำการคอมไพล์และทดสอบวาร์ปเข้าบอส ตรวจสอบการเกิดของมอนสเตอร์ เลือดบอส คัตซีน และกลไกผ่านตัวละคร Admin
   - **Step 4: Update Documentation**:
     - บันทึกการเปลี่ยนแปลงใน `PROGRESS.md` ทั้ง root และ `v214 src/` พร้อมระบุเวลาเสมอ
