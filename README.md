# MapleStory Server Runner v265 (Zero-Install Portable Edition)

เซิร์ฟเวอร์จำลอง MapleStory v265 (64-bit Client Architecture) พัฒนาต่อยอดบนรากฐาน SwordieMS แบบ **Full Portable 100% (Zero-Install)** พร้อมระบบ **6th Job HEXA Matrix**, **Universal Boss System (129 บอส)**, **Multi-Network Routing**, และ **ระบบสมัครไอดีอัตโนมัติ** สามารถนำไปรันได้ทันทีบนทุกเครื่องและทุกไดรฟ์โดยไม่ต้องติดตั้ง Java, Maven หรือ MySQL/MariaDB ลงใน Windows

---

## 🌟 จุดเด่นและสถาปัตยกรรมหลัก (Key Features)

### 1. 100% Zero-Install Portable Architecture
- **Portable MariaDB 10.11.8 Engine (พอร์ต `33066`)**: รันระบบฐานข้อมูลแบบ Portable แยกอิสระ หลบเลี่ยงพอร์ต `3306` ป้องกันการชนกับ MySQL ของระบบเครื่อง 100%
- **Portable OpenJDK 21 (64-bit)**: บรรจุ Java Runtime Environment 21 ในโฟลเดอร์ พร้อมคอมไพล์และรันได้ทันที
- **Portable Apache Maven 3.9.15**: เครื่องมือ Build & Package ในตัว รองรับการคอมไพล์โค้ดในคลิกเดียวผ่าน `2_Build_Server.bat`
- **Dynamic Path Generation**: สคริปต์ตรวจจับตำแหน่ง Directory ปัจจุบันแบบไดนามิก (`%~dp0`) พร้อมสร้างคอนฟิก `my.ini` ใหม่ทุกครั้ง รองรับการวางใน Path ที่มีช่องว่าง (Spaces) ย้ายไดรฟ์ (C:, D:, E:, External Drive) ได้อย่างอิสระ

### 2. โฟลเดอร์แจกจ่ายสำเร็จรูป `Server263` (Official Distribution Package)
- โฟลเดอร์ [`Server263/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263) คือตัวเกมเซิร์ฟเวอร์ที่แพ็คเสร็จสมบูรณ์ ปราศจาก Source Code หรือ Build Tools ชั่วคราว
- รวม WZ Data v265 ครบถ้วน (`data/wz265/` ~5 GB) บีบอัดครั้งเดียวจบ พร้อมใช้งานและแจกจ่ายได้ทันที

### 3. ระบบกระจายแพตช์แบบเบา (Incremental Patch Policy)
- ผู้ใช้บีบอัดตัวเกมหลัก (Base Package) เพียงครั้งเดียว
- เมื่อมีการแก้ไขโค้ด สคริปต์ หรือคอนฟิกในอนาคต รัน [`Create_Update_Patch.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Create_Update_Patch.bat) เพื่อสร้างไฟล์แพตช์ขนาดเล็ก (~120 MB) ในโฟลเดอร์ [`Patches/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches)
- ผู้เล่นนำไปลงทับด้วย `Apply_Patch.bat` ได้ใน 2 วินาที โดยไม่สูญเสียข้อมูลตัวละคร และไม่ต้องบีบอัด WZ ซ้ำ

### 4. ระบบเครือข่าย Multi-Network Routing
- **ปลดล็อค Dynamic Host Hook ใน `Localhost.dll`**: อ่านค่า IP จาก `launcher.ini` โดยตรง ไม่ Hardcode `127.0.0.1`
- **Smart Channel IP Migration**: เซิร์ฟเวอร์ตรวจสอบการเชื่อมต่อของผู้เล่นอัตโนมัติ ผู้เล่นเครื่องตัวเองจะได้รับ `127.0.0.1` ขณะที่เพื่อนในวง LAN หรือ Radmin VPN / Hamachi จะได้รับ IP จริง ทำให้เล่นพร้อมกันได้โดยไม่หลุดตอนเลือกตัวละคร

### 5. ระบบจัดการบัญชี Zero-Install
- **Auto-Register on Login**: เข้าเกมด้วย User/Pass ใหม่ได้ทันที เซิร์ฟเวอร์จะสมัครไอดีให้แบบอัตโนมัติเมื่อเปิด `server.autoRegister=true` ใน [`server.properties`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/server.properties)
- **เครื่องมือ 1-คลิก จัดการไอดี**: สคริปต์ [`Create_Account.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/Create_Account.bat) และ `Change_IP_or_Account.bat` รองรับการสร้างไอดี GM/Admin, รีเซ็ตรหัสผ่าน, และซิงค์เข้าสู่ `launcher.ini`

### 6. Universal Boss Entry & Infinite Runs (ระบบบอส 129 ตัว)
- **ปลดล็อคเควสต์เข้าบอสทั้งหมดอัตโนมัติ**: ผ่านคอนฟิก `server.bossUnlockPrequests=true`
- **เข้าบอสอิสระไม่จำกัดรอบ (Infinite Runs)**: ปลดล็อคคูลดาวน์รายวัน/สัปดาห์ เข้าผ่าน Boss UI (Content Guide) หรือประตูหน้าห้องบอสได้ตลอด 24 ชั่วโมง
- **ครบทุกบอสในเกม (129 Battle Scripts)**: Kalos, Karing, Seren, Limbo, Black Mage, Demian, Lucid, Will, Guardian Angel Slime, Root Abyss (Pierre, Von Bon, Crimson Queen, Vellum ทั้ง Normal และ Chaos) พร้อมระบบ Phase Transition และทางออกที่สมบูรณ์

### 7. 6th Job HEXA Matrix & Endgame Parity
- รองรับสกิลคลาส 6 (Origin Skill & HEXA Mastery) ครบทุกสายอาชีพ (40+ คลาส) พร้อมระบบ Sol Erda Energy และ Sol Erda Fragment
- คำสั่งทดสอบสำหรับผู้ดูแลระบบ (Admin Level 4): `!endgame` หรือ `!endgame <class_name>` (เช่น `!endgame khali`, `!endgame kanna`, `!endgame hayato`, `!endgame kain`) มอบเลเวล 260, สกิลคลาส 5-6 Lv.30 เต็ม, อาวุธ Arcane Umbra, Wakizashi, Haku Fan, และตรา Emblem ประจำอาชีพทันที

---

## 📁 โครงสร้างโฟลเดอร์โปรเจกต์ (Project Structure)

```text
MapleStory_Server_Runner/
├── Server263/                    # [โฟลเดอร์หลักสำหรับแจกจ่ายและรันจริง]
│   ├── 1_Start_Server.bat        # ดับเบิลคลิกเปิดเซิร์ฟเวอร์ทันที
│   ├── 3_Stop_Server.bat         # ปิดเซิร์ฟเวอร์และบันทึกฐานข้อมูลอย่างปลอดภัย
│   ├── 4_Server_Control_Panel.bat# แผงควบคุมเซิร์ฟเวอร์แบบรวมศูนย์
│   ├── Import_Database.bat       # ตัวนำเข้าฐานข้อมูล backup.sql เข้า MariaDB
│   ├── Create_Account.bat        # เครื่องมือจัดการไอดีผู้เล่นและ GM
│   ├── maplestory.jar            # Fat JAR เซิร์ฟเวอร์ที่ผ่านการคอมไพล์ (~138 MB)
│   ├── server.properties         # ไฟล์ตั้งค่าเรท EXP/Drop, IP, Ports, Auto-Register
│   ├── Client_Patch_Files/       # ชุดไฟล์ Patch สำหรับวางในตัวเกม Client v265
│   │   ├── Launcher.exe          # ตัวเปิดเกม MapleStory
│   │   ├── Localhost.dll         # DLL Network Hook รองรับ IP หลากหลายวง
│   │   ├── launcher.ini          # คอนฟิก IP และบัญชีผู้ใช้
│   │   ├── Run_Game.bat          # สคริปต์เข้าเกมแบบคลิกเดียว
│   │   └── Change_IP_or_Account.bat # เมนูปรับเปลี่ยน IP/ไอดีฝั่งผู้เล่น
│   ├── data/                     # ฐานข้อมูลตัวเกม
│   │   ├── wz265/                # ข้อมูล WZ Data เต็ม (~5 GB)
│   │   ├── dat265/               # ข้อมูล Cache Skill, Item, Map
│   │   └── scripts/              # สคริปต์ NPC, บอส 129 ตัว, เควสต์, พอร์ทัล
│   ├── mariadb/                  # Portable MariaDB 10.11.8 Engine (พอร์ต 33066)
│   └── jdk21/                    # Portable OpenJDK 21 Runtime Environment
│
├── v214 src/                     # [โฟลเดอร์สำหรับพัฒนาและคอมไพล์โค้ด Java]
│   ├── src/main/java/            # ซอร์สโค้ดภาษา Java ของ SwordieMS v265
│   ├── 2_Build_Server.bat        # คอมไพล์ซอสและส่งมอบ maplestory.jar ไปยัง Server263
│   ├── pom.xml                   # คอนฟิก Apache Maven
│   ├── PROGRESS.md               # บันทึกประวัติการพัฒนาและแก้ไขระบบอย่างละเอียด
│   ├── apache-maven-3.9.15/      # Portable Maven สำหรับ Build โค้ด
│   └── jdk21/                    # Portable JDK 21 Compiler
│
├── docs/                         # โฟลเดอร์รวมเอกสารและคู่มือการใช้งาน
│   ├── MapleStory_Commands_Guide.md # คู่มือคำสั่ง GM และผู้เล่นครบ 117 คำสั่ง
│   ├── HOW_TO_USE.txt            # คู่มือการใช้งานเซิร์ฟเวอร์แบบละเอียด
│   └── HOW_TO_PLAY_LAN.txt       # คู่มือการเปิดเล่นร่วมกับเพื่อนผ่านวง LAN / VPN
│
├── Patches/                      # โฟลเดอร์เก็บไฟล์แพตช์อัปเดตแบบเบา (.zip)
├── tools/                        # สคริปต์เครื่องมือเสริม เช่น create_patch.py
├── Create_Update_Patch.bat       # สคริปต์สร้างไฟล์แพตช์อัปเดตอัตโนมัติ
├── 1_Start_Server.bat            # ทางลัดเปิดเซิร์ฟเวอร์จาก Root
├── 3_Stop_Server.bat             # ทางลัดปิดเซิร์ฟเวอร์จาก Root
├── 4_Server_Control_Panel.bat    # ทางลัดแผงควบคุมจาก Root
├── AGENTS.md                     # กฎเหล็กและข้อกำหนดมาตรฐานประจำโปรเจกต์
└── PROGRESS.md                   # บันทึกความคืบหน้าภาพรวมของโปรเจกต์
```

---

## 🚀 ขั้นตอนการเริ่มต้นใช้งาน (Quick Start)

### ขั้นตอนที่ 1: การเปิดเซิร์ฟเวอร์
1. ดับเบิลคลิกที่ [`1_Start_Server.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/1_Start_Server.bat) หรือเปิดผ่าน [`4_Server_Control_Panel.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/4_Server_Control_Panel.bat)
2. ระบบจะทำการเปิด **Portable MariaDB Engine** บนพอร์ต `33066` ให้อัตโนมัติ (หากรันครั้งแรกจะตรวจจับและ Import ฐานข้อมูล `vietmaple` ให้ทันที)
3. ระบบจะเปิดหน้าต่างคอนโซลของเซิร์ฟเวอร์ MapleStory โดยมีพอร์ตให้บริการดังนี้:
   - **Login Port:** `8484`
   - **API Port:** `8483`
   - **Channel Ports (World 19):** `8585` – `8594` (แชนแนล 1–10)
4. รอจนกระทั่งขึ้นข้อความ `[WZ Data] Finished Loaded WZ data` แสดงว่าเซิร์ฟเวอร์พร้อมเชื่อมต่อ

### ขั้นตอนที่ 2: การตั้งค่าฝั่งผู้เล่น (Client)
1. ก๊อปปี้ไฟล์ทั้งหมดในโฟลเดอร์ [`Server263/Client_Patch_Files/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/Client_Patch_Files) ไปวางในโฟลเดอร์ตัวเกม MapleStory v265
2. หากเล่นบนเครื่องเดียวกันกับเซิร์ฟเวอร์ ไม่ต้องแก้ไขค่าใดๆ
3. หากเล่นผ่านวง LAN หรือ Radmin VPN ให้เปิด `Change_IP_or_Account.bat` แล้วกรอก IP ของเครื่องโฮสต์
4. ดับเบิลคลิก [`Run_Game.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/Client_Patch_Files/Run_Game.bat) เพื่อเข้าสู่เกม
5. **การล็อกอิน**: 
   - กรอก Username และ Password ที่ต้องการใน `launcher.ini` หรือผ่าน `Change_IP_or_Account.bat` (หากเปิดระบบ Auto-Register ระบบจะสร้างบัญชีให้อัตโนมัติในครั้งแรก)
   - บัญชีผู้ดูแลระบบตั้งต้น: `admin` / `admin`

---

## 🛑 การปิดเซิร์ฟเวอร์อย่างถูกต้อง (Safe Shutdown)
- ดับเบิลคลิกที่ [`3_Stop_Server.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/3_Stop_Server.bat) เสมอ
- ระบบจะทำการตัดการเชื่อมต่อผู้เล่น ปิดเกมเซิร์ฟเวอร์ และสั่ง `mysqladmin shutdown` เพื่อ Flush ข้อมูลจาก Buffer Pool ลงในไฟล์ดิสก์อย่างสมบูรณ์ ป้องกันข้อมูลตัวละครหรือตารางฐานข้อมูลเสียหาย

---

## 🛠️ การพัฒนาและคอมไพล์โค้ด (Development & Build)
หากมีการแก้ไขโค้ด Java ใน [`v214 src/src/main/java/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java):
1. ทำการแก้ไขและบันทึกไฟล์
2. รันสคริปต์ [`v214 src/2_Build_Server.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/2_Build_Server.bat) หรือรันคำสั่ง:
   ```powershell
   cd "v214 src"
   .\apache-maven-3.9.15\bin\mvn.cmd clean package -DskipTests
   ```
3. สคริปต์จะทำการคอมไพล์และคัดลอก `maplestory.jar` ใหม่ลงใน [`Server263/maplestory.jar`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/maplestory.jar) โดยอัตโนมัติ

---

## 📦 การสร้างและแจกจ่ายไฟล์แพตช์ (Incremental Update)
เมื่อพัฒนาฟีเจอร์หรือแก้ไขบั๊กเสร็จสิ้น และต้องการส่งมอบอัปเดตให้ผู้เล่น:
1. ดับเบิลคลิก [`Create_Update_Patch.bat`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Create_Update_Patch.bat)
2. ระบบจะแพ็คไฟล์ที่จำเป็น (`maplestory.jar`, `data/scripts/`, `Client_Patch_Files/`, `server.properties`, batch scripts) เป็นไฟล์ ZIP ในโฟลเดอร์ [`Patches/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches) ขนาด ~120 MB
3. ผู้รับเพียงแตกไฟล์แล้วกดรัน `Apply_Patch.bat` เพื่ออัปเดตไฟล์ใน 2 วินาที โดยไม่กระทบฐานข้อมูลตัวละครและไฟล์ WZ ขนาดยักษ์
