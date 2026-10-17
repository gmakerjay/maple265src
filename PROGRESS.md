# 📜 MapleStory v265 Server Development Progress & Active Log

This file tracks active bug fixes, feature implementations, and system optimizations.

## 📅 [2026-10-17 18:40 น.] — ปรับปรุง !msnpc และเมนูระบบทั้งหมด ยกเลิกกรอบคำพูดเตี้ยแคบ กลับมาใช้ NPC Dialogs มาตรฐาน พร้อมปุ่ม BACK ครบทุกเมนูย่อย และแก้ไขระบบเควสต์บอสหนอน Arma ใน Arcane River (Revamp !msnpc Standard Dialogs, Add Universal BACK Buttons Across All Submenus & Fix Arcane River Arma Boss Quest)

### 🎯 Scope & Technical Details
- **หัวข้อ**: ปรับปรุงหน้าต่างเมนูคำสั่ง `!msnpc` (`@admin`, `@adminnpc`, `@ea`) ทั้งระบบตามคำขอของผู้ใช้: ยกเลิกการใช้กรอบคำพูดด้านล่าง (`setNpcBoxChat`) ที่เตี้ยและแคบเกินไป กลับมาใช้กรอบข้อความ NPC Dialogs มาตรฐาน (`setSpeakerID`) ที่กว้าง สูง อ่านง่าย ชัดเจน; เพิ่มปุ่ม **[BACK]** ครบถ้วนในทุกเมนูย่อย (Dimensional Mirror, Hoyoung Warp Center, Seren Boss Arena, Adele General Store, Lara Pet Sanctuary, Lucid Point Mall) เพื่อให้สามารถกดย้อนกลับไปมาระหว่างเมนูย่อยและเมนูหลักได้โดยไม่หลุดออกจาก NPC; ลบแท็กฟอนต์สีขาว `#fc0xFFFFFFFF#` และ `#face` ออกทั้งหมดเพื่อให้อ่านง่ายบนพื้นหลัง NPC มาตรฐาน; พร้อมทั้งแก้ไขระบบเควสต์บอสหนอน Arma (`8641010`) ใน Arcane River (Vanishing Journey) ให้วาร์ปเข้าแมพและมี NPC คุยจบเควสต์ 100%
- **รายละเอียด**:
  1. **ปัญหาที่พบ (Problem)**:
     - เมนู `!msnpc` ใช้ `sm.setNpcBoxChat` ทำให้กล่องข้อความอยู่ขอบล่างของหน้าจอ มีความสูงน้อย (เตี้ยมาก) ตัวหนังสืออัดแน่น และใช้ฟอนต์สีขาว
     - เมนูย่อยหลายรายการเมื่อกดเข้าไปแล้วไม่มีปุ่ม BACK หรือเมื่อกดยกเลิก/ซื้อไอเทมแล้วจะปิดเมนูหลุดออกไปทันที ทำให้ผู้ใช้ต้องพิมพ์คำสั่ง `!msnpc` ใหม่ซ้ำๆ
     - บอสหนอน Arma ในเควสต์ Arcane River Vanishing Journey (เควสต์ `34119`) วาร์ปเข้าห้องไม่ได้เนื่องจากวาร์ปพอร์ทัลลูปกลับมาแมพเดิม และไม่มี NPC ดำเนินเนื้อเรื่อง
  2. **สาเหตุเชิงลึกทางเทคนิค (Technical Root Cause)**:
     - `setNpcBoxChat(npcId)` เป็นฟังก์ชันสำหรับแสดง Cinematic Box Chat ที่มีพื้นที่จำกัด 3-4 บรรทัด
     - สคริปต์เมนูย่อย (`warp_service.py`, `boss_arena.py`, `potion_shop.py`, `pet_shop.py`) ขาดการวนลูป `while True:` หรือไม่มี Option รหัสย้อนกลับไปยังสคริปต์หลัก (`quick_adminNPC.py`)
     - พอร์ทัล [`450001219_PS01.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/portal/450001219_PS01.py) เขียนคำสั่ง `sm.warp(450001219)` ซึ่งเป็นแมพเดิม ทำให้ไม่สามารถเดินเข้าถ้ำของ Arma (`450001340`) ได้
  3. **การแก้ไขและการปรับปรุงระบบ (Implementation & Fixes)**:
     - **ปรับเปลี่ยนเป็น Standard NPC Dialogs ทั้งหมด**:
       - แก้ไข [`quick_adminNPC.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/quick_adminNPC.py): สลับมาใช้ `sm.setSpeakerID(NPC)` พร้อมจัดเลย์เอาต์เมนูสูง โปร่ง สบายตา และมีปุ่ม `#L1000##r[Close Menu / Exit]#k#l`
       - แก้ไข [`warp_service.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/warp_service.py): ใช้ `sm.setSpeakerID(NPC_HOYOUNG)` พร้อมปุ่ม `#L1000##r[Back to Main NPC Menu]#k#l` และ `#L999##r[Back to Warp Categories]#k#l`
       - แก้ไข [`boss_arena.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/boss_arena.py): ใช้ `sm.setSpeakerID(NPC_SEREN)` พร้อมปุ่ม `#L1000##r[Back to Main NPC Menu]#k#l` และ `#L999##r[Back to Boss Categories]#k#l`
       - แก้ไข [`potion_shop.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/potion_shop.py): ใช้ `sm.setSpeakerID(NPC_ID)` พร้อมลูปหมวดหมู่และปุ่ม `#L99##d[Back to Store Categories]#k#l` / `[Back to Main NPC Menu]`
       - แก้ไข [`pet_shop.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/pet_shop.py): ใช้ `sm.setSpeakerID(NPC_ID)` พร้อมลูปหมวดหมู่และปุ่ม `#L99##d[Back to Sanctuary Categories]#k#l` / `[Back to Pet List]`
       - แก้ไข [`point_shop.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/point_shop.py): สลับจาก `setNpcBoxChat` เป็น `sm.setSpeakerID(NPC_ID)`, ลบแท็ก `#face` และ `#fc0xFFFFFFFF#` ทั้งหมด, เพิ่มปุ่ม `#L99#[Back to Store Categories]` และ `[Back to Main NPC Menu]`
       - แก้ไข [`9072303.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/9072303.py): เปลี่ยนเป็น `sm.setSpeakerID(1530330)`
     - **แก้ไขระบบบอสหนอน Arma ใน Arcane River**:
       - แก้ไขพอร์ทัล [`450001219_PS01.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/portal/450001219_PS01.py) ให้วาร์ปเข้าสู่แมพ Arma's Hideout (`450001340`)
       - สร้างสคริปต์ NPC Kao [`3003140.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/3003140.py) สำหรับคุยจบเควสต์ `34119` หรือเลือกข้ามเควสต์ได้ทันที
       - อัปเดตสคริปต์ฟิลด์ [`enter_450001340.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/field/enter_450001340.py)
  4. **การทดสอบและการส่งมอบไฟล์ (Testing & Deployment)**:
     - ทดสอบไวยากรณ์ Python ของทุกสคริปต์ (`py_compile`) ผ่านฉลุย 100% ปราศจาก Error
     - ซิงค์ไฟล์สคริปต์ทั้งหมดไปยังโฟลเดอร์แจกจ่าย [`Server263/data/scripts/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/data/scripts/) และ Git Mirror [`maple265src/data/scripts/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/maple265src/data/scripts/) ครบถ้วนตามนโยบาย

## 📅 8f8f9ab4 (17:35 น.) — ปรับปรุงเสถียรภาพตัวรันเซิร์ฟเวอร์ แก้ปัญหาเลือก Scania แล้วค้าง เข้า Channel ไม่ได้จาก Race Condition ตอนบูต และเพิ่มระบบ Auto-Recovery กู้คืนเซสชันพร้อม LAN IP Routing (Server Runner Hardening, Fix Scania World Selection Freeze, Startup Race Condition, Session Auto-Recovery & Dynamic LAN IP Routing)

### 🎯 Scope & Technical Details
- **หัวข้อ**: เสริมความแข็งแกร่งให้ตัวรันเซิร์ฟเวอร์ (Server Runner Hardening) เพื่อการเล่นได้จริง 100%, แก้ไขปัญหาผู้เล่นและลูกค้ารายงานว่า "เลือก Scania แล้วไม่ขยับไปไหนเลย" (ค้างที่หน้าเลือก World / Channel) และ "ลูกค้าเอาไปแล้วเข้า Chanel ไม่ได้", แก้ไข Race Condition ตอนเริ่มระบบโดยหน่วงการเปิด Socket Port (API 8483, Login 8484, Channels 8585-8594) จนกว่าข้อมูล WZ Data, Quests, Items, และ Maps จะโหลดเสร็จสมบูรณ์ 100%, พัฒนาระบบ Session Auto-Recovery กู้คืน User ID จากการยืนยันตัวตนของ Launcher ตาม IP เพื่อไม่ให้เกิดภาวะ Session Lost เมื่อเข้าสู่หน้าเลือกตัวละคร, ปรับปรุง Dynamic LAN IP Auto-Detection ใน `NettyClient` ให้ส่ง Local Network IP ไปยังผู้เล่นวง LAN / VPN ป้องกันการติด Loopback 127.0.0.1, ปรับลดข้อความเตือนของ Phantom bot ไม่ให้รบกวนหน้าจอคอนโซล, คอมไพล์ Maven JDK 21 สำเร็จ (`BUILD SUCCESS`), ดีพลอย `maplestory.jar` สู่ `Server263/` และ Root, และสร้างแพ็กเกจแพตช์เดี่ยว [`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip) (ขนาด 173.49 MB)
- **รายละเอียด**:
  1. **ปัญหาที่พบ (Problem)**:
     - ผู้ใช้และลูกค้ารายงานว่าเมื่อเปิดเซิร์ฟเวอร์แล้ว ตัวเกมค้างที่หน้าเลือก Scania ("เลือก Scania แล้ว ไม่ขยับไปไหนเลยครับ") และผู้เล่นภายนอก/วง LAN ไม่สามารถเข้าสู่ Channel ได้
     - ในหน้าต่างคอนโซลมีข้อความ `[Server] Phantom bot (ID 5) not found in DB, skipping bot initialization.` ขึ้นมาเป็นระยะอย่างไม่แน่นอน ทำให้ผู้ใช้เกิดความสับสนว่าตัวรันเซิร์ฟเวอร์พร้อมเล่นหรือไม่
  2. **สาเหตุเชิงลึกทางเทคนิค (Technical Root Cause)**:
     - **Race Condition ตอนบูตเซิร์ฟเวอร์ (Startup Timing Race Condition)**: ใน [`Server.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/Server.java) ดั้งเดิม เมธอด `startNetworkAcceptors()` (เปิดพอร์ต 8483 API, 8484 Login, 8585-8594 Channels) ถูกเรียกตั้งแต่ช่วงต้นของ `init()` ก่อนที่ `loadWzData()` จะทำงานเสร็จสิ้น (ซึ่งใช้เวลาอ่านไฟล์ WZ/DAT ประมาณ 55 วินาที) เมื่อผู้เล่นเปิด Launcher และกดเริ่มเกมทันทีที่เห็นพอร์ตเปิด ตัวเกมจะส่งแพ็กเก็ตล็อกอินเข้ามาในขณะที่ข้อมูลระบบยังแคชไม่เสร็จสมบูรณ์ ทำให้เกิดสถานะ Deadlock หรือ Packet Drop
     - **Session Lost & Silent Hang ใน `handleSelectWorld`**: จากการ Re-engineer ตัว `Localhost.dll` (ฟังก์ชัน Detours `0x180003440` ดักจับพารามิเตอร์ `WebStart <Token>`) พบว่าในบางจังหวะที่ Client ยิงแพ็กเกจ `SELECT_WORLD` เข้ามา หาก `SPECIAL_LOGIN_AUTH_REQUEST` เกิด Delay หรือ Token Unmapped จะส่งผลให้ `c.getUser() == null` ซึ่งโค้ดเดิมเรียก `WvsContext.broadcastMsg(...)` (ซึ่งเป็น In-Game packet ที่ตัวเกมหน้าจอล็อกอินไม่รองรับ) แล้ว return จบการทำงานทันที ทำให้ไคลเอนต์ค้างที่ปุ่ม Scania นิ่งสนิทโดยไม่มี Dialog แจ้งเตือนใดๆ
     - **LAN / Remote IP Routing Mismatch ใน `NettyClient.java`**: สำหรับผู้เล่นวง LAN หรือลูกค้าระยะไกล เมื่อ `server.properties` ตั้งค่าเป็น `127.0.0.1` เมธอด `getEffectiveChannelIp()` จะส่ง IP `{127, 0, 0, 1}` ไปให้เครื่อง Client ของผู้เล่นปลายทาง ทำให้เครื่องผู้เล่นพยายามเชื่อมต่อไปยัง Localhost ของเครื่องตัวเองและหลุดการเชื่อมต่อเมื่อจะเข้า Channel
     - **Phantom Bot Database Logging**: ตัวรันพยายามค้นหาตัวละคร ID 5 ใน MariaDB ทุกครั้งที่เริ่มเซิร์ฟเวอร์ หากไม่มีจะแจ้งเตือนข้ามบอท ซึ่งสร้างความสับสนแก่ผู้ใช้
  3. **การแก้ไขเชิงสถาปัตยกรรม (Implementation & Fixes)**:
     - **Delayed Network Binding จนกว่าข้อมูลจะพร้อม 100%**: ย้ายคำสั่ง `startNetworkAcceptors()` ใน [`Server.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/Server.java) ไปไว้ท้ายสุดของฟังก์ชัน `init()` หลัง WZ Data, JSON, และ World พร้อมสมบูรณ์ พร้อมขึ้นแบนเนอร์คอนโซล `MAPLESTORY SERVER v265 IS 100% ONLINE AND READY!` เพื่อให้มั่นใจว่าจะไม่มี Client ใดเชื่อมต่อเข้ามาก่อนระบบพร้อม
     - **ระบบ Session Auto-Recovery & Fallback**:
       - เพิ่ม `recentLoginsByIp` (ConcurrentHashMap) ใน [`Server.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/Server.java) บันทึก User ID ที่ผ่านการยืนยันตัวตนจาก Launcher API (พอร์ต 8483) พร้อม Timestamp (อายุแคช 15 นาที)
       - อัปเดต [`ApiRequestHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/ApiRequestHandler.java) ให้บันทึก IP และ User ID ลงแคชทันทีที่ล็อกอินผ่าน
       - อัปเดต [`LoginHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/LoginHandler.java) ใน `handleSelectWorld` และ `handleSpecialLogin_Auth_Request`: หาก `c.getUser() == null` จะดึง User ID ล่าสุดจากแคชตาม IP มาสร้างเซสชันให้อัตโนมัติ และหากรันใน Localhost จะ Fallback ไปที่ User `admin` (ID 1) หากไม่พบจริงจะส่ง `Login.selectCharacterResult(LoginType.UnauthorizedUser)` เพื่อให้ตัวเกมแสดง Dialog แจ้งเตือนอย่างถูกต้อง ไม่ค้างนิ่ง
     - **Dynamic LAN IP Auto-Detection**:
       - อัปเดต [`NettyClient.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/connection/netty/NettyClient.java) เพิ่มฟังก์ชัน `getHostLanIp()` เพื่อค้นหา Network Interface IPv4 (SiteLocal IP) ของเครื่องโฮสต์ หาก Client ที่เชื่อมต่อไม่ได้มาจาก Localhost ระบบจะส่ง LAN IPv4 ประจำเครื่องโฮสต์ไปให้ Client อัตโนมัติ ทำให้ผู้เล่นวง LAN / VPN เข้าเล่นได้ทันทีโดยไม่ต้องแก้ไข `server.properties`
     - **Phantom Bot Silent Handling**: ปรับใน [`Server.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/Server.java) ให้ข้ามบอทอย่างเงียบๆ โดยไม่พ่นข้อความเตือนกวนใจ
  4. **การทดสอบและผลลัพธ์ (Verification & Outcome)**:
     - คอมไพล์โค้ด Maven ด้วย Portable JDK 21 ได้สถานะ `BUILD SUCCESS` (Fat JAR ขนาด ~138 MB)
     - อัปเดต `maplestory.jar` ไปยัง [`Server263/maplestory.jar`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Server263/maplestory.jar), [`v214 src/maplestory.jar`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/maplestory.jar) และ Root [`maplestory.jar`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/maplestory.jar)
     - ซิงค์โค้ดทั้งหมดไปยัง Git Mirror [`maple265src/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/maple265src/)
     - สร้างแพ็กเกจแพตช์เดี่ยว All-in-One ล่าสุด [`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip) (ขนาด 173.49 MB) ตามมาตรฐาน Single Patch Policy

## 📅 bb2fdc2f (16:30 น.) — วิเคราะห์และจัดทำเอกสารคู่มือระบบ Arcane & Sacred Symbol และการปลดล็อคเควสต์ (Analyze & Document Arcane & Sacred Symbol Mechanics and Quest Unlocking Guide)

### 🎯 Scope & Technical Details
- **หัวข้อ**: ตรวจสอบและวิเคราะห์ข้อเท็จจริงกรณีผู้เล่นสอบถามการปลดล็อคช่อง Arcane และ Sacred Symbol ("Arcane กับ sacred มันปลดล็อคยังไงหรอครับ มันไม่มีเควสให้ทำแล้ว"), ยืนยันสถานะการทำงานของเควสต์ Arcane River ทั้ง 6 ดินแดน (Vanishing Journey, Chu Chu Island, Lachelein, Arcana, Morass, Esfera) ว่าทำงานได้สมบูรณ์ 100% พร้อมระบบข้ามเควสต์ด่วน (Skip Prequest Option) ในคลิกเดียว, ชี้แจงสาเหตุที่เควสต์ไม่แสดงในหน้าต่างหลอดไฟเนื่องจากเป็นเควสต์ประจำพื้นที่ (Area Trigger), ตรวจสอบโครงสร้าง Sacred Symbol ของ Grandis, จัดทำเอกสารคู่มือแม่บท [`docs/Arcane_Sacred_Symbol_Guide.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/docs/Arcane_Sacred_Symbol_Guide.md) และข้อความสคริปต์สำหรับ Support ตอบผู้เล่น
- **รายละเอียด**:
  1. **ปัญหาที่พบ (Problem)**:
     - ผู้เล่นส่งภาพหน้าจอหน้าต่างสวมใส่อุปกรณ์แท็บ ARCANE ที่ปลดล็อคเฉพาะช่อง 1 (Vanishing Journey) ส่วนอีก 5 ช่องติดรูปแม่กุญแจล็อค (`disablebox`) พร้อมสอบถามว่า *"Arcane กับ sacred มันปลดล็อคยังไงหรอครับ มันไม่มีเควสให้ทำแล้ว"*
  2. **สาเหตุเชิงลึกทางเทคนิค (Technical Root Cause)**:
     - **เควสต์ Arcane River ไม่ใช่เควสต์ประเภท Auto-Notifier (หลอดไฟข้างจอ)**: ใน MapleStory เควสต์เนื้อเรื่องของเมืองต่อๆ ไป (เช่น Chu Chu Island เควสต์ `34200`, Lachelein `34300`, Arcana `34450`, Morass `34249`, Esfera `34561`) ถูกออกแบบให้เป็น Map / Area Trigger ผู้เล่นจะต้องเดินทางไปยังแผนที่รอยต่อของดินแดนนั้นๆ เควสต์จึงจะเริ่มต้นขึ้น (เช่น Chu Chu ต้องเดินไปที่ท้ายแมพ Cave of Repose แล้วกระโดดลงน้ำตกเข้าสู่แมพ `450002021`)
     - **ระบบเควสต์และ Fast-Track Skip ทำงานได้ 100%**: ในโฟลเดอร์สคริปต์ `Server263/data/scripts/quest/` มีไฟล์สคริปต์เควสต์เนื้อเรื่องครบทุกเมือง (`q34100s.py`, `q34200s.py`, `q34300s.py`, `q34450s.py`, `q34249s.py`, `q34561s.py`) และมีตัวเลือก `Skip the prequests and receive your Arcane Symbol immediately` ให้ผู้เล่นข้ามเนื้อเรื่องทั้งหมดและปลดล็อคช่อง + รับ Symbol ไปใส่ได้ทันทีใน 1 วินาที
     - **สถานะของ Sacred Symbol (Grandis)**: ตัวระบบช่องสวมใส่ `AUSBase` (`1700-1705`), ไอเทมลูกแก้ว Sacred Symbol (`1713000-1713005`), และค่า Authentic Force (AUT) รองรับในเซิร์ฟเวอร์สมบูรณ์ 100% แต่เควสต์เนื้อเรื่อง Grandis (Cernium `1484`, Hotel Arcus `38120`, Odium `38319` ฯลฯ) ใน SwordieMS ปัจจุบันยังไม่มีสคริปต์วิ่งเนื้อเรื่องในเกม ทำให้ไม่มีเควสต์ให้ผู้เล่นกดวิ่งทำเองตามธรรมชาติ
  3. **การแก้ไขและการจัดทำเอกสาร (Implementation & Documentation)**:
     - จัดทำเอกสารคู่มือฉบับสมบูรณ์ [`docs/Arcane_Sacred_Symbol_Guide.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/docs/Arcane_Sacred_Symbol_Guide.md)
     - ซิงค์เอกสารไปยัง [`v214 src/docs/Arcane_Sacred_Symbol_Guide.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/docs/Arcane_Sacred_Symbol_Guide.md) และ [`maple265src/docs/Arcane_Sacred_Symbol_Guide.md`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/maple265src/docs/Arcane_Sacred_Symbol_Guide.md)
     - รวบรวมตารางสรุปเมือง, เลเวลขั้นต่ำ, รหัสเควสต์, จุดเดินทาง, สคริปต์ข้อความสำหรับทีมงาน Support นำไปตอบผู้เล่น และคำสั่ง Admin ที่เกี่ยวข้อง
  4. **ผลลัพธ์ (Outcome)**:
     - เอกสารถูกจัดระเบียบไว้ใน `docs/` ตามมาตรฐาน Zero-Scratch Directory Standard
     - ทีมงานมีคำตอบและข้อเท็จจริงที่ชัดเจนในการชี้แจงผู้เล่นได้อย่างถูกต้อง แม่นยำ และรวดเร็ว

## 📅 3594fed8 (15:05 น.) — แก้ไขข้อผิดพลาด EOFException ใน SkillData จากไบนารี SecondAtomInfo ไม่ตรงกัน พร้อมคอมไพล์และอัปเดตแพตช์ (Fix SkillData SecondAtomInfo EOFException Desync, Build Server & Update Latest Patch)

### 🎯 Scope & Technical Details
- **หัวข้อ**: แก้ไขข้อผิดพลาด `java.io.EOFException` ใน [`SkillData.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/loaders/SkillData.java#L240-L265) ที่เกิดขึ้นขณะโหลดข้อมูลสกิล `.dat` จากระบบ On-Demand Loader เมื่อรันคำสั่ง `!endgame` หรือเปลี่ยนอาชีพ, ปรับปรุงการอ่านและเขียนข้อมูลไบนารีของ `SecondAtomInfo` (expire, localOnly) และ `ExtraSkillInfo` (manual) ให้ตรงกัน 100%, คอมไพล์ Maven JDK 21 สำเร็จ (`BUILD SUCCESS`), ดีพลอย `maplestory.jar` สู่ `Server263/` และ Root, และสร้างแพ็กเกจแพตช์เดี่ยว [`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip)
- **รายละเอียด**:
  1. **ปัญหาที่พบ (Problem)**:
     - เมื่อผู้เล่นรันคำสั่ง `!endgame` หรือเปลี่ยนอาชีพผ่าน `chr.setJob()` ระบบจะเรียก `SkillData.getSkillsByJob()` ซึ่งเรียก `loadSkillsOfJob()` เพื่อโหลดสกิลที่ยังไม่ได้แคชไว้จาก `Server263/data/dat265/skills/`
     - เกิดข้อผิดพลาด `java.io.EOFException` ที่บรรทัด `SkillData.java:244` (`secondAtomInfo.setCreateDelay`) และ `SkillData.java:261` (`secondAtomInfo.getExtraPos().put`) บันทึกลงใน `ExceptionCaught/All.txt`
  2. **สาเหตุเชิงลึกทางเทคนิค (Technical Root Cause)**:
     - ใน [`SkillData.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/loaders/SkillData.java): ฟังก์ชัน `saveSkills()` ทำการเขียนฟิลด์ `value.getExpire()` (4 ไบต์) และ `value.getLocalOnly()` (4 ไบต์) ลงในไฟล์ไบนารี `.dat` ของ SecondAtomInfo
     - แต่ในฟังก์ชัน `loadSkill()` กลับไม่มีคำสั่ง `readInt()` สำหรับ 2 ฟิลด์ดังกล่าว ส่งผลให้ตำแหน่งไบต์เลื่อน (Byte-shifted 8 ไบต์) ทำให้ฟังก์ชันนำข้อมูลของฟิลด์อื่นมาอ่านเป็นขนาดของ `customs` และ `extraPos` และพยายามอ่านเกินขนาดไฟล์จนเกิด `EOFException` กระทบกับ 27 สกิลในระบบ (เช่น Dawn Warrior `11121018`, `11141004`, Paladin HEXA `1241009`, Wind Archer `13121055`, `13141006`, Night Lord `4121020`, `4141006`)
     - นอกจากนี้ ใน `saveSkills()` บรรทัด 101 มีการเขียน `entry.getValue().getDelay()` ซ้ำ แทนที่จะเป็น `entry.getValue().getManual()`
  3. **การแก้ไข (Implementation & Fix)**:
     - เพิ่ม `secondAtomInfo.setExpire(dataInputStream.readInt());` หลัง `setRotate` ใน [`SkillData.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/loaders/SkillData.java#L246)
     - เพิ่ม `secondAtomInfo.setLocalOnly(dataInputStream.readInt());` หลัง `setFollowAngle` ใน [`SkillData.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/loaders/SkillData.java#L255)
     - แก้ไข `saveSkills()` ให้เขียน `entry.getValue().getManual()` อย่างถูกต้อง
     - ซิงค์โค้ดไปยัง Git Mirror [`maple265src/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/maple265src/src/main/java/net/swordie/ms/loaders/SkillData.java)
  4. **การทดสอบและผลลัพธ์ (Verification & Outcome)**:
     - เขียนชุดทดสอบยืนยันการโหลดสกิลที่เคยมีปัญหาทั้ง 27 ไฟล์ ผ่าน Java รันไทม์โดยตรง พบว่าทุกสกิลโหลดได้สมบูรณ์ 100% ปราศจาก `EOFException` และเก็บค่า SecondAtom ครบถ้วน
     - คอมไพล์โปรเจกต์ด้วย Apache Maven บน Portable JDK 21 ได้สถานะ `BUILD SUCCESS` ได้ไฟล์ `maplestory.jar` ขนาด ~138 MB
     - อัปเดต `maplestory.jar` ไปยัง `Server263/`, `v214 src/` และ Root Directory
     - รันสคริปต์ `tools/create_patch.py` สร้างแพตช์เดี่ยว All-in-One ล่าสุด [`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip) (ขนาด 173.48 MB)

## 📅 44e47f09 (13:48 น.) — Refactor & Audit Adventurer Warrior Classes (Hero, Paladin, Dark Knight), Zero Skill Injection in !endgame, Sub-Skill Matrix Sanitization, Cooldown Synchronization & Single Patch Packaging

### 🎯 Scope & Technical Details
- **หัวข้อ**: ตรวจสอบและรีแฟกเตอร์คลาส Adventurer Warriors (Hero, Paladin, Dark Knight), ตรวจสอบความถูกต้องของสกิล Class 1-4, Hexa V, และ Origin/Ascent Skills, ป้องกันการสแปมไอคอนสกิลย่อยขยะในหน้าต่างสกิล (K Skill UI / Matrix) เมื่อผู้เล่นอัปสกิล, ซิงค์คูลดาวน์และเงื่อนไขการใช้สกิลให้ถูกต้องสมบูรณ์ 100%, ปรับและตรวจสอบคำสั่ง `!endgame` ให้ปฏิบัติตามกฎเหล็ก Strict Zero Skill Injection โดยมอบเฉพาะแต้ม SP ผ่าน ExtendSP และอุปกรณ์ BiS โดยไม่อัดฉีดเลเวลสกิลลงในตัวละคร, คอมไพล์ Maven JDK 21 และสร้างแพ็กเกจแพตช์ All-in-One ล่าสุด [`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip)
- **รายละเอียด**:
  1. **มาตรฐาน Strict Zero Skill Injection ในคำสั่ง `!endgame` ([`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java))**:
     - ตรวจสอบคำสั่ง `!endgame` สำหรับ Hero (`112`), Paladin (`122`), Dark Knight (`132`) ให้ปฏิบัติตามกฎเหล็ก Strict Zero Skill Injection 100% ปราศจากการเรียก `chr.addSkill`, `mc.setSkillLevel`
     - ปรับสถานะตัวละครเลเวล 260, ฟื้นฟู HP/MP 100%, แต้ม AP 1,250 และแต้ม SP เต็มพิกัดผ่าน `ExtendSP` สำหรับคลาส 1–4 (65, 130, 130, 255) เพื่อให้ผู้เล่นจัดสรรแต้มด้วยตนเองตามกลไกธรรมชาติ
     - สำเร็จเควสต์คลาส 5 (1460-1466) และเควสต์คลาส 6 (1488) แบบ `noRewards = true` ป้องกันลูกแก้ว Arcane Symbol ขยะ
     - มอบหิน Nodestones x3,000 (`2435719`), Experience Nodestones x20, Sol Erda Energy x1,000, Sol Erda Fragments x30,000, Power Elixir x3,000, เงิน 10B Mesos, และอุปกรณ์สวมใส่ BiS ครบเซ็ต:
       - Hero: Arcane Umbra Two-handed Sword (`1402259`), Princess No's Medallion (`1352403`), Mitra's Warrior Emblem (`1190601`), และชุดเกราะ Warrior ครบเซ็ต
       - Paladin: Arcane Umbra Two-handed Hammer (`1422189`), Princess No's Rosary (`1352413`), Mitra's Warrior Emblem (`1190601`), และชุดเกราะ Warrior ครบเซ็ต
       - Dark Knight: Arcane Umbra Spear (`1432218`), Princess No's Iron Chain (`1352423`), Mitra's Warrior Emblem (`1190601`), และชุดเกราะ Warrior ครบเซ็ต
  2. **การป้องกันปัญหาไอคอนสกิลย่อยขยะในหน้าต่างสกิล K และ Matrix (Zero Phantom Sub-Skill Policy)**:
     - ใน [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java): ลงทะเบียนสกิลย่อยที่ซ่อนอยู่ทั้งหมดของ Hero, Paladin, Dark Knight ใน `isSpecialInvisibleSkill(int skillID)`:
       - Hero: Combo Fury Down (`1100012`), Spirit Calibur Attack (`1141501`), Ultrasonic Slash Extra (`1141503`), Final Blade Sub (`1141004`), Burning Soul Blade Stationary (`400011019`), Combo Instinct Slash (`400011066`), Sword Illusion Extra (`400011090`, `400011091`), Hexa Raging Blow Subs (`1141001-1141004`), Hexa Beam Blade Sub (`1141006`)
       - Paladin: Divine Charge IV (`1221021`), Sacred Bastion Extra/Tile/After (`1241501-1241503`), Dominus Oblivion Extra (`1241505`), Divine Mark Sub (`1241001`), Falling Justice Sub (`1241003`), Hammers of the Righteous Active (`400011018`), Divine Echo Mimics (`400011021`, `500061001`), Grand Guardian Sub (`400011065`), Mighty Mjolnir Sub (`400011116`), Hexa Blast Subs (`1241000-1241004`)
       - Dark Knight: Final Pact Modes (`1320021-1321020`), Dead Space Attack (`1341501`), Dark Halidom Extra (`1341503`), Dark Bident Sub (`1341001`), Nightshade Explosion Sub (`1341003`), Darkness Aura Final (`400011020`), Radiant Evil Sub (`400011089`), Calamitous Cyclone Final (`400011115`), Hexa Gungnir Subs (`1341000-1341004`)
     - ผูกความสัมพันธ์ใน `getActualSkillIDfromSkillID` เพื่อให้ระบบดึงค่าเลเวลและสถานะจากสกิลหลัก ป้องกันปุ่มกากบาทแดงโผล่ในหน้าต่างสกิล K
     - ลงทะเบียนใน `isNoCoolDownAttack` เพื่ออนุญาตให้การโจมตีเสริมและ Explosion hits ทำงานได้โดยไม่ถูกปฏิเสธเป็น cooldown violation
  3. **การตรวจสอบและปรับปรุงสกิล Hero ([`Hero.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/warrior/Hero.java))**:
     - ตรวจสอบระบบ Combo Counter & Advanced Combo (10 Orbs)
     - รองรับ 5th Job V-Matrix: Burning Soul Blade (เคลื่อนที่ & ปักพื้น), Worldreaver (I-frame slash), Combo Instinct, Sword Illusion
     - พัฒนา 6th Job Hexa Matrix & Origin/Ascent:
       - Spirit Calibur (Origin Skill `1141500`): มอบสถานะอมตะ `IndieNotDamaged` (7 วินาที), เติม Combo Counter เต็ม 10 ลูกทันที, ฟื้นฟู HP/MP 100%, แพ็กเก็ตคัทซีนปาร์ตี้ `UserLocal.showHexaSkillEff(chr)`, ศัตรูติด Absolute Bind Freeze (10 วินาที) และ OriginDebuff (20 วินาที), คูลดาวน์ 360 วินาที
       - Ultrasonic Slash (Ascent Skill `1141502`): มอบสถานะอมตะ `IndieNotDamaged` (5 วินาที), เติม Combo Counter เต็ม, ฟื้นฟู HP/MP 100%, คูลดาวน์ 240 วินาที
     - พัฒนา `handleSetCoolDownSkill` คืนค่า `int` ซิงค์คูลดาวน์: Spirit Calibur, Ultrasonic Slash, Rising Rage & HEXA, Cry Valhalla & summons, Burning Soul Blade & stationary, Worldreaver, Combo Instinct, Sword Illusion, Beam Blade & HEXA, Magic Crash บล็อกการสแปม 0 วินาที
  4. **การตรวจสอบและปรับปรุงสกิล Paladin ([`Paladin.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/warrior/Paladin.java))**:
     - ตรวจสอบระบบ Elemental Charge (Flame, Blizzard, Lightning, Divine) สูงสุด 5 สแตก
     - รองรับ 5th Job V-Matrix: Hammers of the Righteous (ค้อนหมุนช้า & ค้อนหมุนเร็ว), Grand Guardian (กางเขนแสงศักดิ์สิทธิ์), Divine Echo (เชื่อมโยงบัฟปาร์ตี้), Mighty Mjolnir
     - พัฒนา 6th Job Hexa Matrix & Origin/Ascent:
       - Sacred Bastion (Origin Skill `1241500`): มอบสถานะอมตะ `IndieNotDamaged` (7 วินาที), แพ็กเก็ตคัทซีนปาร์ตี้ `UserLocal.showHexaSkillEff`, กางอาณาเขตแสงฟื้นฟูเลือดและโจมตีต่อเนื่อง, ศัตรูติด Absolute Bind Freeze (10 วินาที) และ OriginDebuff (20 วินาที), คูลดาวน์ 360 วินาที
       - Dominus Oblivion (Ascent Skill `1241504`): มอบสถานะอมตะ `IndieNotDamaged` (5 วินาที), บัฟธาตุชาร์จเต็ม, คูลดาวน์ 240 วินาที
     - พัฒนา `handleSetCoolDownSkill` คืนค่า `int` ซิงค์คูลดาวน์: Sacred Bastion, Dominus Oblivion, Divine Mark & HEXA, Heaven's Hammer & HEXA & impact/tile, Falling Justice & 2, Smite Shield, Sacrosanctity, Epic Adventure, Magic Crash, Guardian, Divine Echo & HEXA, Hammers of the Righteous & 2, Grand Guardian บล็อกการสแปม 0 วินาที
  5. **การตรวจสอบและปรับปรุงสกิล Dark Knight ([`DarkKnight.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/adventurer/warrior/DarkKnight.java))**:
     - ตรวจสอบระบบ Evil Eye & Final Pact (Reincarnation โหมดอมตะและฟื้นคืนชีพ)
     - พัฒนากลไก Gungnir's Descent 0 คูลดาวน์ใน `alterCooldownSkill`: เมื่อมีบัฟ Dark Resonance หรืออยู่ในสถานะ Reincarnation (Final Pact) สกิล Gungnir's Descent และ HEXA Gungnir's Descent จะคืนค่าคูลดาวน์เป็น 0 วินาที สามารถแทงหอกรัวต่อเนื่องได้ตามกลไกจริงของเกม
     - รองรับ 5th Job V-Matrix: Spear of Darkness, Darkness Aura, Radiant Evil, Calamitous Cyclone
     - พัฒนา 6th Job Hexa Matrix & Origin/Ascent:
       - Dead Space (Origin Skill `1341500`): ผ่ามิติแห่งความตาย คัทซีนเต็มจอ มอบสถานะอมตะ `IndieNotDamaged` (7 วินาที), เปิดใช้งานบัฟ Dark Resonance ทันที, ศัตรูติด Absolute Bind Freeze (10 วินาที) และ OriginDebuff (20 วินาที), คูลดาวน์ 360 วินาที
       - Dark Halidom (Ascent Skill `1341502`): ท่าหอกทมิฬสังหาร มอบสถานะอมตะ `IndieNotDamaged` (5 วินาที), เปิดใช้งานบัฟ Dark Resonance ทันที, คูลดาวน์ 240 วินาที
     - พัฒนา `handleSetCoolDownSkill` คืนค่า `int` ซิงค์คูลดาวน์: Dead Space, Dark Halidom, Dark Bident, Nightshade Explosion & HEXA, Evil Eye Shock & HEXA & shoots, Dark Resonance, Dark Thirst, Epic Adventure, Magic Crash, Spear of Darkness, Darkness Aura & 2, Radiant Evil, Calamitous Cyclone & final attack บล็อกการสแปม 0 วินาที
  6. **การคอมไพล์ ซิงค์มิเรอร์ และแพ็กเกจแจกจ่าย (Build, Mirror Sync & Single Patch Packaging)**:
     - คอมไพล์ผ่าน Apache Maven บน JDK 21 สำเร็จ 100% (`BUILD SUCCESS`) ได้ `maplestory.jar` (138,772,496 bytes)
     - ซิงค์ไฟล์ `maplestory.jar` ไปยัง `Server263/`, `v214 src/` และ Root Directory
     - ซิงค์โค้ดที่แก้ไขทั้งหมดไปยัง Git Mirror [`maple265src/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/maple265src) และพุชขึ้นรีโปสำเร็จ (Commit `44e47f09`)
     - รันสคริปต์สร้างแพตช์เดี่ยว **[`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip)** (173.48 MB) พร้อมใช้งาน

## 📅 84ca1cbc (13:30 น.) — Refactor & Audit Resistance Classes (Blaster & Battle Mage), Zero Skill Injection in !endgame, Sub-Skill Matrix Sanitization, Cooldown Synchronization & Single Patch Packaging

### 🎯 Scope & Technical Details
- **หัวข้อ**: ตรวจสอบและรีแฟกเตอร์คลาส Resistance (Blaster & Battle Mage), ตรวจสอบความถูกต้องของสกิล Class 1-4, Hexa V, และ Origin/Ascent Skills, ป้องกันการสแปมไอคอนสกิลย่อยขยะในหน้าต่างสกิล (K Skill UI / Matrix) เมื่อผู้เล่นอัปสกิล, ซิงค์คูลดาวน์และเงื่อนไขการใช้สกิลให้ถูกต้องสมบูรณ์ 100%, ปรับคำสั่ง `!endgame` ให้ปฏิบัติตามกฎเหล็ก Strict Zero Skill Injection โดยมอบเฉพาะแต้ม SP ผ่าน ExtendSP และอุปกรณ์ BiS โดยไม่อัดฉีดเลเวลสกิลลงในตัวละคร, คอมไพล์ Maven JDK 21 และสร้างแพ็กเกจแพตช์ All-in-One ล่าสุด [`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip)
- **รายละเอียด**:
  1. **มาตรฐาน Strict Zero Skill Injection ในคำสั่ง `!endgame` ([`AdminCommands.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/commands/AdminCommands.java))**:
     - ตรวจสอบคำสั่ง `!endgame` สำหรับ Resistance: Battle Mage (`3212`) และ Blaster (`3712`) ให้ปฏิบัติตามกฎเหล็ก Strict Zero Skill Injection โดยเด็ดขาด
     - ปรับสถานะตัวละครเลเวล 260, ฟื้นฟู HP/MP 100%, แต้ม AP 1,250 และแต้ม SP เต็มพิกัดผ่าน `ExtendSP` สำหรับคลาส 1–4 (65, 130, 130, 255) เพื่อให้ผู้เล่นจัดสรรแต้มด้วยตนเองตามกลไกธรรมชาติ
     - สำเร็จเควสต์คลาส 5 (1460-1466) และเควสต์คลาส 6 (1488) แบบ `noRewards = true` ป้องกันลูกแก้วขยะ
     - มอบหิน Nodestones x3,000 (`2435719`), Experience Nodestones x20, Sol Erda Energy x1,000, Sol Erda Fragments x30,000, Power Elixir x3,000, เงิน 10B Mesos, และอุปกรณ์สวมใส่ BiS ครบเซ็ต:
       - Battle Mage: Arcane Umbra Staff (`1382265`), Princess No's Accursed Crest (`1352957`), Mitra's Magician Emblem (`1190601`), และชุดเกราะ Mage ครบเซ็ต
       - Blaster: Arcane Umbra Ellaha (`1582023`), Princess No's Megaton Charge Fist (`1353405`), Mitra's Warrior Emblem (`1190601`), และชุดเกราะ Warrior ครบเซ็ต
  2. **การป้องกันปัญหาไอคอนสกิลย่อยขยะและการสแปมในหน้าต่างสกิล (Zero Phantom Sub-Skill Policy)**:
     - ใน [`SkillConstants.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/constants/SkillConstants.java): ลงทะเบียนสกิลย่อยที่ซ่อนอยู่ทั้งหมดของ Blaster และ Battle Mage ใน `isSpecialInvisibleSkill(int skillID)`:
       - Blaster: Revolving Cannon Sub (37000009, 37100008), Bunker Buster Explosion Subs (37000008, 37000011-37000013, 37100009, 37110010, 37120013), Bobbing (37100002), Hammer Smash (37110001), Weaving (37110004), Rocket Rush (37110011), Revolving Blast Subs (37120014-37120019, 37120023), Hyper Magnum Punch Subs (37120055-37120059), Rocket Punch Extra (400011025), Gatling Punch Sub (400010028), Bullet Blast Subs (400011092, 400011093, 400011094), Afterimage Shock Subs (400011132, 400011133), Hexa Subs (37141003-37141007, 37141010, 37141013, 37141014, 37141016, 37141503)
       - Battle Mage: Condemnation Subs (32001015, 32100011, 32110018, 32120020), Dark Chain Sub (32100008), Staff Boost Sub (32100004), Dark Genesis FA (32121011), Sweeping Staff Subs (32120053, 32120054), Aura Scythe Subs (400021006, 400021007), Union Aura Subs (400021043, 400021044), Abyssal Lightning Subs (400021111, 400021112, 400021113), Hexa Subs (32141001, 32141003, 32141007, 32141009, 32141011, 32141013, 32141014, 32141503)
     - ผูกความสัมพันธ์ใน `getActualSkillIDfromSkillID` เพื่อให้ระบบดึงค่าเลเวลและสถานะจากสกิลหลัก ป้องกันปุ่มกากบาทแดงโผล่ในหน้าต่างสกิล K
  3. **การตรวจสอบและปรับปรุงสกิล Blaster ([`Blaster.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/resistance/Blaster.java))**:
     - ตรวจสอบระบบ Cylinder Ammo & Gauge: Revolving Cannon, Bunker Buster Explosion, Overheat, Reload
     - รองรับสกิล 5th Job V-Matrix: Rocket Punch, Gatling Punch, Bullet Blast, Afterimage Shock
     - พัฒนาสกิล 6th Job Hexa Matrix & Origin/Ascent: HEXA Bunker Buster Explosion, HEXA Shotgun Punch, HEXA Hammer Smash, Final Destroyer (Origin Skill: อมตะ 7 วินาที, ติด Absolute Bind Freeze 10 วินาที, OriginDebuff 20 วินาที, คูลดาวน์ 360 วินาที), และ Vanguard Strike (Ascent Skill)
     - พัฒนาเมธอด `handleSetCoolDownSkill(int skillId)` คืนค่า `int` เพื่อซิงค์คูลดาวน์ระหว่างสกิลหลักกับสกิลย่อย: Final Destroyer, Ascent Blaster, Ballistic Hurricane, Hyper Magnum Punch, Revolving Blast, Rocket Punch, Gatling Punch, Bullet Blast, และ Afterimage Shock
  4. **การตรวจสอบและปรับปรุงสกิล Battle Mage ([`BattleMage.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/jobs/resistance/BattleMage.java))**:
     - ตรวจสอบระบบเกจและออร่า: Hasty Aura, Draining Aura, Blue Aura, Dark Aura, Debuff Aura, และ Condemnation I–III (Death Summon)
     - พัฒนาการทำงาน Dark Genesis Final Attack proc: เมื่อ Dark Genesis หรือ Hexa Dark Genesis อยู่ระหว่างติดคูลดาวน์ การโจมตีด้วยสกิลอื่นจะมีโอกาสตาม WZ (60%) เรียกการโจมตีโบนัส Dark Genesis FA อัตโนมัติ
     - รองรับสกิล 5th Job V-Matrix: Aura Scythe, Union Aura, Black Magic Altar, Grim Harvest, Abyssal Lightning
     - พัฒนาสกิล 6th Job Hexa Matrix & Origin/Ascent: HEXA Finishing Blow, HEXA Dark Genesis, HEXA Dark Shock, HEXA Sweeping Staff, HEXA Aura Scythe, Crimson Pact (Origin Skill: อมตะ 7 วินาที, Absolute Bind Freeze 10 วินาที, OriginDebuff 20 วินาที, คูลดาวน์ 360 วินาที), และ Abyssal Reckoning (Ascent Skill)
     - พัฒนาเมธอด `handleSetCoolDownSkill(int skillId)` คืนค่า `int` ซิงค์คูลดาวน์ระหว่างสกิลหลักกับสกิลย่อย: Crimson Pact, Ascent BaM, Dark Genesis, Sweeping Staff, Aura Scythe, Abyssal Lightning, Grim Harvest, Party Shield, Master of Death, และ For Liberty
  5. **การคอมไพล์ ซิงค์มิเรอร์ และแพ็กเกจแจกจ่าย (Build, Mirror Sync & Single Patch Packaging)**:
     - คอมไพล์ผ่าน Apache Maven บน JDK 21 สำเร็จ 100% (`BUILD SUCCESS`) ได้ `maplestory.jar` (138,769,122 bytes)
     - ซิงค์ไฟล์ `maplestory.jar` ไปยัง `Server263/`, `v214 src/` และ Root Directory
     - ซิงค์โค้ดที่แก้ไขทั้งหมดไปยัง Git Mirror [`maple265src/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/maple265src) ให้เท่ากัน 100%
     - รันสคริปต์สร้างแพตช์เดี่ยว **[`Patches/Server263_Patch_Latest.zip`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/Patches/Server263_Patch_Latest.zip)** (173.48 MB) พร้อมใช้งาน

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
