# แผนงานระบบ Portable Database และการแพ็กเกจแจกจ่ายแบบปิดซอร์สโค้ด (Closed-Source Release)

> **สถานะ:** บันทึกแผนงานเรียบร้อย (Ready for Implementation)  
> **เป้าหมาย:** ทำให้เซิร์ฟเวอร์รันได้บนทุกเครื่องโดยผู้ใช้ไม่ต้องติดตั้งโปรแกรมใดๆ เลย (Zero-Install 100%), ฐานข้อมูลอ่าน-เขียน-เซฟได้ตลอดเวลา, ไม่มีการแจกซอร์สโค้ด, และเปิดให้ปรับแต่งค่า Rate / IP ได้ผ่าน Config

---

## 1. บทสรุปสถาปัตยกรรม (Architecture Overview)

```
[ผู้ใช้งานปลายทาง]
       │
       ▼ (ดับเบิลคลิกไฟล์เดียว)
┌────────────────────────────────────────────────────────┐
│ 1_Start_Server.bat (Runner Orchestrator)              │
│  ├─ 1. สตาร์ท Portable MariaDB (Background Process)    │
│  │     └─ Data Directory: mariadb\data\ (Auto-Save)    │
│  ├─ 2. เช็กสถานะพอร์ต DB พร้อมเชื่อมต่อ                 │
│  └─ 3. สตาร์ท Java Server (maplestory.jar)             │
│        └─ Runtime: jdk21\ (Portable JRE)               │
└────────────────────────────────────────────────────────┘
```

---

## 2. องค์ประกอบหลัก 4 ด้าน

### 2.1 Portable Database Engine (Zero-Install MariaDB)
- **เครื่องยนต์ DB:** ใช้ **MariaDB Standalone Binaries** (ขนาด ~60-80 MB เมื่อคัดเฉพาะส่วนรันไทม์) วางไว้ในโฟลเดอร์ `mariadb\`
- **Data Persistence:** โฟลเดอร์ `mariadb\data\` บรรจุฐานข้อมูล `vietmaple` ที่ Import ตารางและข้อมูลตั้งต้นไว้ครบถ้วน
- **การเซฟข้อมูล:** InnoDB / Aria Engine บันทึกข้อมูลตัวละคร, เลเวล, ไอเทม, เงิน Mesos ลงในดิสก์แบบเรียลไทม์ตลอดเวลา ย้ายโฟลเดอร์หรือก๊อปลง Flash Drive ข้อมูลไม่สูญหาย
- **Lifecycle Management:**
  - `1_Start_Server.bat`: ตรวจสอบและสั่งรัน `mysqld.exe --defaults-file=my.ini --console` ในเบื้องหลัง
  - `3_Stop_Server.bat`: เรียกคำสั่ง `mysqladmin.exe -u root shutdown` เพื่อ Flush ข้อมูลและปิด DB อย่างปลอดภัย 100%

### 2.2 Closed-Source Distribution Packaging (การแจกจ่ายแบบปิดซอร์ส)
โครงสร้างโฟลเดอร์สำเร็จรูปสำหรับส่งมอบให้ผู้เล่น/ลูกค้า:

```text
📁 MapleStory_Server_Portable/
├── 📁 jdk21/                 <-- Portable Java Runtime (ไม่ต้องลง Java ในเครื่อง)
├── 📁 mariadb/               <-- Portable DB Engine + ฐานข้อมูล (ไม่ต้องลง MySQL)
│   ├── bin/ (mysqld.exe, mysqladmin.exe)
│   ├── data/ (โฟลเดอร์เซฟข้อมูลตัวละคร/ไอเทมตลอดเวลา)
│   └── my.ini
├── 📁 data/                  <-- WZ Data, Item Drops, เควส, และสคริปต์ NPC
│
├── 📄 maplestory.jar         <-- ตัวรันหลักเซิร์ฟเวอร์ (Compiled Fat JAR ไม่เห็นซอร์ส)
├── 📄 server.properties      <-- ไฟล์ตั้งค่า Config (IP, Rate EXP, Meso, Drop)
│
├── ⚙️ 1_Start_Server.bat     <-- ดับเบิลคลิกเพื่อเปิด (เปิด DB + รัน Server อัตโนมัติ)
├── ⚙️ 3_Stop_Server.bat      <-- ดับเบิลคลิกเพื่อปิด (เซฟข้อมูลปลอดภัย)
└── ⚙️ 4_Server_Control.bat   <-- เมนูควบคุมสำหรับผู้ดูแล
```

#### รายการไฟล์ที่จะถูกตัดทิ้ง (Exclude List):
- ❌ โฟลเดอร์ `src/` (Source Code Java ทั้งหมด)
- ❌ โฟลเดอร์ `apache-maven-3.9.15/`
- ❌ โฟลเดอร์ `.git/` และ `.gitignore`
- ❌ ไฟล์ `pom.xml`, `v214.iml`
- ❌ ไฟล์ C++ (`.cpp`)
- *(เสริมความปลอดภัย)*: สามารถใช้ ProGuard หรือ Obfuscator ครอบ `maplestory.jar` เพื่อป้องกันการ Decompile

### 2.3 Dynamic Configuration System (ปรับแต่งได้โดยไม่ต้องมีซอร์สโค้ด)
เปิดให้ผู้ดูแลปรับแต่งค่าใน `server.properties` ด้วย Notepad:

```properties
# ==============================================================================
# MapleStory Server Configuration
# ==============================================================================

# --- Network Settings ---
server.ip=127.0.0.1
server.name=MapleStory V265
server.eventMsg=Welcome to MapleStory!

# --- Server Rates ---
server.expRate=100
server.expRateBelow100=100
server.expRate101to210=500
server.questExpRate=1
server.mesoRate=100
server.dropRate=20

# --- Server Features ---
server.adminLoginOnly=false
server.debugMode=false
```

---

## 3. ขั้นตอนการลงมือปฏิบัติเมื่อพร้อมทำ (Implementation Steps)

1. **Phase 1: Dynamic Config Integration**
   - แก้ไข `ServerConfig.java` ให้ดึงค่า EXP, Meso, Drop Rate จาก `server.properties`
   - Recompile `maplestory.jar` ด้วย Portable Maven

2. **Phase 2: Portable MariaDB Setup**
   - วางชุด Portable MariaDB ลงในโฟลเดอร์ `mariadb/`
   - Dump ฐานข้อมูล `vietmaple` ปัจจุบันเข้าไปใน `mariadb/data/`
   - สร้างไฟล์คอนฟิก `mariadb/my.ini` ปรับแต่งหน่วยความจำและพอร์ตให้เหมาะสม

3. **Phase 3: Script Orchestration Update**
   - อัปเดต `1_Start_Server.bat` ให้ตรวจหาและเปิด `mariadb\bin\mysqld.exe` ก่อนรัน Java
   - อัปเดต `3_Stop_Server.bat` ให้สั่ง Shutdown MariaDB อย่างปลอดภัย

4. **Phase 4: Build Release Bundle**
   - ทำสคริปต์ `Export_Release_Package.bat` สำหรับก็อปปี้เฉพาะไฟล์ที่จำเป็น (ตัด `src/`, `.git`, Maven ออกทั้งหมด)
   - บีบอัดเป็น `.zip` ก้อนเดียวขนาดกะทัดรัด พร้อมแจกจ่ายให้ผู้ใช้คลิกรันได้ทันที
