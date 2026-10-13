# 📋 เอกสารส่งมอบงาน & แผนการปรับปรุงระบบ Arcane Symbols & River Quests (v265)

**โครงการ:** MapleStory v265 Portable Server Runner (SwordieMS Core)  
**วันที่จัดทำ:** 13 ตุลาคม 2569 (2026-10-13 เวลา 23:40 น.)  
**สถานะภาพรวม:** ระบบหลักสมบูรณ์ ~75% - 80% (Core UI, Enhancement, EXP, Meso Cost, Mob Set Tracking สมบูรณ์ 100%)  
**เป้าหมายของเอกสาร:** สรุปรายการปัญหา, สาเหตุทางเทคนิค, และแนวทางการปรับปรุงระบบ Arcane Symbols และเควสต์ Arcane River เพื่อให้นักพัฒนาสามารถนำไปปฏิบัติการแก้ไขต่อได้ทันที  

---

## 📌 สารบัญ (Table of Contents)
1. [ภาพรวมสถานะระบบ Arcane Symbols (System Status Overview)](#1-ภาพรวมสถานะระบบ-arcane-symbols)
2. [รายการจุดบกพร่องที่ต้องปรับปรุงเร่งด่วน (Critical Issues to Fix)](#2-รายการจุดบกพร่องที่ต้องปรับปรุงเร่งด่วน)
   - [2.1 บัคในสคริปต์ NPC ประจำเมือง 6 เมือง (Crash on NPC Talk)](#21-บัคในสคริปต์-npc-ประจำเมือง-6-เมือง)
   - [2.2 สคริปต์คูปอง Arcane Symbol ประจำเมืองที่ขาดหายไป (Missing Item Scripts)](#22-สคริปต์คูปอง-arcane-symbol-ประจำเมืองที่ขาดหายไป)
   - [2.3 การคลีนข้อความภาษาเวียดนาม (Localization Cleanup)](#23-การคลีนข้อความภาษาเวียดนาม)
   - [2.4 ความสมบูรณ์ของเควสต์เนื้อเรื่องหลัก (Pre-quests Storyline Gap)](#24-ความสมบูรณ์ของเควสต์เนื้อเรื่องหลัก)
   - [2.5 ระบบมินิเกมและเควสต์รายสัปดาห์ (Weekly Minigames Integration)](#25-ระบบมินิเกมและเควสต์รายสัปดาห์)
3. [แนวทางการแก้ไขทางเทคนิคพร้อมโค้ดตัวอย่าง (Technical Implementation Guide)](#3-แนวทางการแก้ไขทางเทคนิคพร้อมโค้ดตัวอย่าง)
4. [ตารางรายการไฟล์ที่เกี่ยวข้อง (Affected Files & Directories)](#4-ตารางรายการไฟล์ที่เกี่ยวข้อง)

---

## 1. ภาพรวมสถานะระบบ Arcane Symbols

| ส่วนของระบบ | ความสมบูรณ์ | รายละเอียดสถานะการทำงาน |
|---|:---:|---|
| **UI รวมสัญลักษณ์ (Opcode 374: Merge)** | 🟢 100% | รวมสัญลักษณ์ซ้ำเพื่อเพิ่ม EXP (+1 EXP) ใช้งานได้สมบูรณ์ใน [`ItemHandler.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/handlers/item/ItemHandler.java) |
| **UI อัปเลเวลสัญลักษณ์ (Opcode 374: Level Up)** | 🟢 100% | คำนวณสูตร Meso ทางการ, มอบ Main Stat +100 / DA HP +2,100 / Xenon All-stat +48, Arcane Power สูงสุด 220, อัปเดต Union Artifact และส่ง Effect |
| **ระบบนับจำนวนมอนสเตอร์ (Mob Kill Tracking)** | 🟢 100% | รองรับ `QuestCountGroup` ผ่าน `mob.getParentMobSet().contains(reqMobID)` นับจำนวนมอนสเตอร์ 500-600 ตัวในทุกแผนที่ได้ถูกต้อง |
| **คูปองเลือกสัญลักษณ์ (`2635509`)** | 🟢 100% | สคริปต์ [`consume_2635509.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/item/consume_2635509.py) เลือกสัญลักษณ์ได้ 6 เมือง พร้อมตรวจสอบช่องว่างใน Equip |
| **ระบบรีเซ็ตเควสต์รายวัน (Daily Reset)** | 🟢 100% | เมธอด `initSymbolQuests()` ใน [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) เคลียร์เควสต์และรีเซ็ตทุกเที่ยงคืน |
| **สคริปต์ NPC ประจำเมือง 6 แห่ง** | 🔴 ต้องแก้ไข | เกิด `AttributeError` และ `NameError` เมื่อผู้เล่นที่กำลังทำเควสต์กดคุยกับ NPC |
| **สคริปต์คูปองสัญลักษณ์ประจำเมือง (`2635510-2635514`)** | 🔴 ต้องสร้างเพิ่ม | ไม่มีไฟล์สคริปต์รองรับ ทำให้ผู้เล่นกดดับเบิ้ลคลิกใช้งานคูปองที่ได้จากเควสต์ไม่ได้ |
| **เควสต์เนื้อเรื่องหลัก (Pre-quests)** | 🟡 ปานกลาง | สคริปต์เนื้อเรื่องไม่ครบ (แก้ปัญหาชั่วคราวโดยเปิด `ServerConfig.BOSS_UNLOCK_PREQUESTS = true`) |
| **มินิเกมรายสัปดาห์ (Weekly Minigames)** | 🟡 ปานกลาง | มีเพียง Hungry Muto ที่สมบูรณ์ใน Java ขณะที่ Erda Spectrum, Spirit Savior ยังขาดระบบแจกรางวัล |

---

## 2. รายการจุดบกพร่องที่ต้องปรับปรุงเร่งด่วน (Critical Issues to Fix)

### 2.1 บัคในสคริปต์ NPC ประจำเมือง 6 เมือง
- **ไฟล์ที่พบปัญหา**:
  - `data/scripts/npc/3003104.py` (Rona - Vanishing Journey)
  - `data/scripts/npc/3003152.py` (Master Lyck - Chu Chu Island)
  - `data/scripts/npc/3003209.py` (Gray Mask - Lachelein)
  - `data/scripts/npc/3003322.py` (Small Spirit - Arcana)
  - `data/scripts/npc/3003432.py` (Jean - Morass)
  - `data/scripts/npc/3003530.py` (Ollie - Esfera)
- **สาเหตุเชิงลึก**:
  1. ในโค้ดมีการเรียก `q = sm.getQuestById(qid)` แต่บนคลาส `ScriptManagerImpl` **ไม่มีเมธอด `getQuestById`** (มีอยู่เฉพาะบน `Char`) ส่งผลให้เกิด `AttributeError: 'net.swordie.ms.scripts.ScriptManagerImpl' object has no attribute 'getQuestById'`
  2. โค้ดเขียน `if q != null and q.isComplete(chr):` ซึ่งคำว่า `null` เป็นภาษา Java ไม่ใช่คีย์เวิร์ดของ Python (ต้องเป็น `None`) ส่งผลให้เกิด `NameError: name 'null' is not defined`
  3. เควสต์รายวัน 38450-38473 เป็น `AccountQuest` การค้นหาผ่าน `chr.getQuestById(qid)` ปกติจะไม่พบ ต้องเข้าถึงผ่าน `chr.getAccount().getQuestById(qid)`

---

### 2.2 สคริปต์คูปอง Arcane Symbol ประจำเมืองที่ขาดหายไป
- **ไฟล์ที่พบปัญหา**: สคริปต์จบเควสต์ของแต่ละเมืองแจกคูปองเฉพาะเมือง:
  - Chu Chu Island (`q38457e.py`): แจกคูปอง `2635510` (Arcane Symbol: Chu Chu Island Coupon)
  - Lachelein (`q38461e.py`): แจกคูปอง `2635511` (Arcane Symbol: Lachelein Coupon)
  - Arcana (`q38465e.py`): แจกคูปอง `2635512` (Arcane Symbol: Arcana Coupon)
  - Morass (`q38469e.py`): แจกคูปอง `2635513` (Arcane Symbol: Morass Coupon)
  - Esfera (`q38473e.py`): แจกคูปอง `2635514` (Arcane Symbol: Esfera Coupon)
- **สาเหตุเชิงลึก**:
  - ในโฟลเดอร์ `data/scripts/item/` **ไม่มีไฟล์ `consume_2635510.py` ถึง `consume_2635514.py`**
  - และไม่มี Java Handler รองรับใน `ItemHandler.java`
  - เมื่อผู้เล่นดับเบิ้ลคลิกใช้งานคูปองเหล่านี้จากช่อง USE จึงไม่มีอะไรเกิดขึ้นเลย

---

### 2.3 การคลีนข้อความภาษาเวียดนาม (Localization Cleanup)
- **ตำแหน่งที่พบ**:
  1. [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java#L10856): ข้อความประกาศรีเซ็ตเควสต์ใน `initSymbolQuests()` เป็น `[Thông báo] ... đã được làm mới!`
  2. สคริปต์เควสต์ `q38451e.py`, `q38452e.py`, `q38453e.py`, `q38455e.py`, `q38457e.py` ฯลฯ: บทสนทนาส่งเควสต์ยังเป็นภาษาเวียดนาม เช่น `Bạn đã hoàn thành nhiệm vụ thành công...`

---

### 2.4 ความสมบูรณ์ของเควสต์เนื้อเรื่องหลัก (Pre-quests Storyline Gap)
- เควสต์เนื้อเรื่องหลัก 34100 - 34700 มีไฟล์สคริปต์ไม่ครบทุกช่วงตอน (เช่น Vanishing Journey มีเพียง 5 สคริปต์จากทั้งหมด 20+ สคริปต์)
- ปัจจุบันเซิร์ฟเวอร์เปิดใช้งาน `ServerConfig.BOSS_UNLOCK_PREQUESTS = true` ทำให้ผู้เล่นสามารถรับเควสต์ประจำวันและเข้าบอสได้ทันทีโดยไม่ต้องผ่าน Pre-quests
- แต่หากในอนาคตต้องการเปิดให้ผู้เล่นทำเนื้อเรื่องตั้งแต่ต้น จะต้องนำเข้าสคริปต์เควสต์เนื้อเรื่องให้ครบทุกตอน

---

### 2.5 ระบบมินิเกมและเควสต์รายสัปดาห์ (Weekly Minigames Integration)
- มีเพียง **Hungry Muto** ที่ถูกพัฒนาขึ้นในระบบ Java เต็มรูปแบบ ([`HungryMuto.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/world/partyquest/HungryMuto.java))
- มินิเกมอื่นๆ ประจำสัปดาห์ (Erda Spectrum `34151`, Midnight Chaser `34378`, Spirit Savior `39035`, Enheim Defense, Ranheim Defense) ยังไม่มีระบบแจก Arcane Symbol รายสัปดาห์แบบสมบูรณ์

---

## 3. แนวทางการแก้ไขทางเทคนิคพร้อมโค้ดตัวอย่าง (Technical Implementation Guide)

### Step 1: เพิ่มเมธอด `isQuestComplete` และ `getQuestById` ใน `ScriptManagerImpl.java`
เพื่อรองรับการตรวจเช็คเควสต์ทั้ง `AccountQuest` และ `Quest` ปกติจากสคริปต์ Python ได้โดยไม่เกิด Error:
```java
// เพิ่มใน ScriptManagerImpl.java
public boolean isQuestComplete(int questID) {
    if (chr == null) {
        return false;
    }
    if (QuestConstants.isAccountQuest(questID)) {
        AccountQuest aq = chr.getAccount().getQuestById(questID);
        return aq != null && aq.isComplete(chr);
    } else {
        Quest q = chr.getQuestById(questID);
        return q != null && q.isComplete(chr);
    }
}

public Quest getQuestById(int questID) {
    return chr != null ? chr.getQuestById(questID) : null;
}
```

### Step 2: ปรับปรุงสคริปต์ NPC ประจำเมืองทั้ง 6 เมือง
แก้ไขบล็อกบรรทัด 10-17 ของไฟล์ `3003104.py`, `3003152.py`, `3003209.py`, `3003322.py`, `3003432.py`, `3003530.py`:
```python
# รูปแบบที่ถูกต้องและปลอดภัย 100%
completedSubQuest = None
for qid in SUB_QUESTS:
    if sm.hasQuest(qid) and sm.isQuestComplete(qid):
        completedSubQuest = qid
        break
```

### Step 3: สร้างสคริปต์คูปอง `consume_2635510.py` ถึง `consume_2635514.py`
สร้างสคริปต์สำหรับดับเบิ้ลคลิกใช้งานคูปองของแต่ละเมือง โดยมอบ Symbol ประจำเมืองนั้นเข้าตัวทันที:
- `consume_2635510.py` ➔ มอบ `1712002` (Arcane Symbol: Chu Chu Island)
- `consume_2635511.py` ➔ มอบ `1712003` (Arcane Symbol: Lachelein)
- `consume_2635512.py` ➔ มอบ `1712004` (Arcane Symbol: Arcana)
- `consume_2635513.py` ➔ มอบ `1712005` (Arcane Symbol: Morass)
- `consume_2635514.py` ➔ มอบ `1712006` (Arcane Symbol: Esfera)

*(หรืออีกทางเลือกหนึ่ง: แก้ไขสคริปต์ `q38455e.py` - `q38473e.py` ให้แจก `2635509` (Selector Coupon) ทั้งหมดตามมาตรฐาน MapleStory v265 ยุคใหม่)*

### Step 4: แปลภาษาข้อความแจ้งเตือนและบทสนทนา
- แก้ไขใน [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java#L10856):
  - เปลี่ยนจาก `[Thông báo] Vanishing Journey Research đã được làm mới!`
  - เป็น `[Notice] Vanishing Journey Research has been reset!` หรือ `[แจ้งเตือน] เควสต์สำรวจ Vanishing Journey ได้รับการรีเซ็ตแล้ว!`
- แปลสคริปต์ `q38451e.py` ถึง `q38473e.py` เป็นภาษาอังกฤษหรือไทย

---

## 4. ตารางรายการไฟล์ที่เกี่ยวข้อง (Affected Files & Directories)

| ไฟล์ที่เกี่ยวข้อง | บทบาทหน้าที่ | การดำเนินการที่แนะนำ |
|---|---|---|
| [`ScriptManagerImpl.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java) | Script Execution Engine | เพิ่มเมธอด `isQuestComplete(questId)` และ `getQuestById(questId)` |
| [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java) | Character Core & Daily Reset | แปลภาษาข้อความรีเซ็ตเควสต์ใน `initSymbolQuests()` |
| [`3003104.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/3003104.py) - [`3003530.py`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/scripts/npc/3003530.py) | NPC ประจำเมือง 6 แห่ง | ปรับปรุงการตรวจสอบ `sm.isQuestComplete` และตัด `null` ออก |
| `data/scripts/item/consume_2635510.py` - `514.py` | คูปองรับสัญลักษณ์ประจำเมือง | สร้างสคริปต์ใหม่เพื่อรองรับการกดใช้งานคูปอง |
| `data/scripts/quest/q38450s.py` - `q38476e.py` | สคริปต์เควสต์รายวัน Arcane River | แปลภาษาบทสนทนาส่งเควสต์จากเวียดนามเป็นอังกฤษ/ไทย |
