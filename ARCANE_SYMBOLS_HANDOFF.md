# 📋 เอกสารส่งมอบงาน & แผนการปรับปรุงระบบ Arcane Symbols & River Quests (v265 Official Handoff)

**โครงการ:** MapleStory v265 Portable Server Runner (SwordieMS Core)  
**วันที่บันทึก:** 13 ตุลาคม 2569 (2026-10-13 เวลา 23:45 น.)  
**สถานะการทำงาน:** เตรียมพร้อมสำหรับลงมือปฏิบัติ (On Hold - Handoff Specification Ready)  
**เป้าหมาย:** สรุปข้อมูลทางการ (Official WZ Data), โฟลวการทำงานฉบับสมบูรณ์, รายการโค้ดและสคริปต์ที่พร้อมนำไปใช้งานได้ทันทีเมื่อเริ่มดำเนินการ  

---

## 📌 สารบัญ (Table of Contents)
1. [ข้อมูลเควสต์ทางการจาก WZ v265 (Official WZ Mapping Data)](#1-ข้อมูลเควสต์ทางการจาก-wz-v265)
2. [โฟลวการทำงานของเควสต์ตามมาตรฐานทางการ (Official Workflow Specification)](#2-โฟลวการทำงานของเควสต์ตามมาตรฐานทางการ)
3. [สรุป 4 จุดที่ต้องปรับปรุงและโค้ดพร้อมใช้งาน (Implementation Blueprint)](#3-สรุป-4-จุดที่ต้องปรับปรุงและโค้ดพร้อมใช้งาน)
   - [จุดที่ 1: เพิ่มเมธอดใน Java Engine (`ScriptManagerImpl.java`)](#จุดที่-1-เพิ่มเมธอดใน-java-engine-scriptmanagerimpljava)
   - [จุดที่ 2: แก้ไขสคริปต์ NPC ประจำเมือง 6 แห่ง](#จุดที่-2-แก้ไขสคริปต์-npc-ประจำเมือง-6-แห่ง)
   - [จุดที่ 3: สคริปต์คูปองสัญลักษณ์ประจำเมือง (`2635510` ถึง `2635514`)](#จุดที่-3-สคริปต์คูปองสัญลักษณ์ประจำเมือง-2635510-ถึง-2635514)
   - [จุดที่ 4: แปลภาษาข้อความรีเซ็ตและบทสนทนา (Localization)](#จุดที่-4-แปลภาษาข้อความรีเซ็ตและบทสนทนา-localization)
4. [เช็คลิสต์ขั้นตอนการปฏิบัติงานเมื่อเริ่มดำเนินการ (Actionable Checklist)](#4-เช็คลิสต์ขั้นตอนการปฏิบัติงานเมื่อเริ่มดำเนินการ)

---

## 1. ข้อมูลเควสต์ทางการจาก WZ v265 (Official WZ Mapping Data)

จากการตรวจสอบไฟล์ [`Quest.wz/QuestData/`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/data/wz265/Quest.wz/QuestData/) ในระบบ v265 โครงสร้างเควสต์และมอนสเตอร์ถูกแบ่งออกเป็น 6 โซนอย่างเป็นเอกภาพ:

| เมือง / โซน | เควสต์ตั้งต้น | เควสต์ย่อย & มอนสเตอร์เป้าหมาย | Mob Group ID ทางการ (`QuestCountGroup`) | Start Script | End Script | NPC ผู้ดูแลเควสต์ |
|---|:---:|---|:---:|:---:|:---:|---|
| **Vanishing Journey** | `38450` | `38451` (100 ตัว)<br>`38452` (300 ตัว)<br>`38453` (500 ตัว) | **`9101238`** | `q38450s` | `q38451e`<br>`q38452e`<br>`q38453e` | Rona (`3003104`) |
| **Chu Chu Island** | `38454` | `38455` (100 ตัว)<br>`38456` (300 ตัว)<br>`38457` (500 ตัว) | **`9101239`** | `q38454s` | `q38455e`<br>`q38456e`<br>`q38457e` | Master Lyck (`3003152`) |
| **Lachelein** | `38458` | `38459` (100 ตัว)<br>`38460` (300 ตัว)<br>`38461` (500 ตัว) | **`9101240`** | `q38458s` | `q38459e`<br>`q38460e`<br>`q38461e` | Gray Mask (`3003209`) |
| **Arcana** | `38462` | `38463` (100 ตัว)<br>`38464` (300 ตัว)<br>`38465` (500 ตัว) | **`9101241`** | `q38462s` | `q38463e`<br>`q38464e`<br>`q38465e` | Small Spirit (`3003322`) |
| **Morass** | `38466` | `38467` (100 ตัว)<br>`38468` (300 ตัว)<br>`38469` (500 ตัว) | **`9101242`** | `q38466s` | `q38467e`<br>`q38468e`<br>`q38469e` | Jean (`3003432`) |
| **Esfera** | `38470` | `38471` (100 ตัว)<br>`38472` (300 ตัว)<br>`38473` (500 ตัว) | **`9101243`** | `q38470s` | `q38471e`<br>`q38472e`<br>`q38473e` | Ollie (`3003530`) |

---

## 2. โฟลวการทำงานของเควสต์ตามมาตรฐานทางการ (Official Workflow Specification)

```
[ผู้เล่นเลเวล 200+ ปลดล็อกเควสต์เข้าเมือง]
                 │
                 ▼
[ขั้นตอนที่ 1: การรับเควสต์ประจำวัน (Daily Acceptance)]
 ├─ ช่องทาง 1: ผ่าน Maple Guide / Quick Move (ไม่ต้องเดินทางมาหา NPC)
 └─ ช่องทาง 2: พูดคุยกับ NPC ประจำเมือง (Rona, Master Lyck, Gray Mask, Small Spirit, Jean, Ollie)
      │
      ├─ เซิร์ฟเวอร์ตรวจสอบความก้าวหน้าของผู้เล่น (Quest Reduction Mechanism):
      │   ├─ ผู้เล่นใหม่ในเมืองนั้น: กำจัด 500 ตัว (Quest End Tag: 3)
      │   ├─ ผ่านเมืองถัดไป 1 เมือง: ลดเหลือ 300 ตัว (Quest End Tag: 2)
      │   └─ ผ่านเมืองถัดไป 2 เมืองขึ้นไป: ลดเหลือ 100 ตัว (Quest End Tag: 1)
      │
      ▼
[ขั้นตอนที่ 2: การล่ามอนสเตอร์ (Mob Hunting)]
 ├─ ผู้เล่นไปฟาร์มมอนสเตอร์ตัวใดก็ได้ในแผนที่ของเมืองนั้นๆ
 └─ เซิร์ฟเวอร์ตรวจเช็ค mob.getParentMobSet().contains(Group_ID) และนับตัวอัตโนมัติ (0/500)
      │
      ▼
[ขั้นตอนที่ 3: การส่งเควสต์ & รับรางวัล (Turn-in & Rewards)]
 ├─ ผู้เล่นส่งเควสต์ผ่านหลอดไฟเควสต์ หรือพูดคุยกับ NPC ประจำเมือง
 ├─ ได้รับค่าประสบการณ์ก้อนโต (Daily EXP)
 └─ ได้รับรางวัล Arcane Symbols:
      ├─ 10 ชิ้นต่อวัน (หรือ 20 ชิ้น หากผ่านเควสต์พื้นที่ย่อย เช่น Reverse City, Yum Yum Island)
      └─ มอบเป็นคูปอง Arcane Symbol Selector Coupon (2635509) หรือคูปองเฉพาะเมือง (2635510-2635514)
      │
      ▼
[ขั้นตอนที่ 4: การใช้งานและการอัปเลเวล (Enhancement)]
 ├─ ดับเบิ้ลคลิกคูปองเพื่อรับ Symbol เข้าช่อง Equip
 └─ รวมสัญลักษณ์ซ้ำ (+1 EXP) และจ่าย Meso อัปเลเวลผ่าน Opcode 374 (Main Stat +100 / ARC +10)
      │
      ▼
[ขั้นตอนที่ 5: การรีเซ็ตทุกเที่ยงคืน (Daily Reset)]
 └─ Char.initSymbolQuests() รีเซ็ตเควสต์ทุก 00:00 น. ให้พร้อมรับใหม่ในวันถัดไป
```

---

## 3. สรุป 4 จุดที่ต้องปรับปรุงและโค้ดพร้อมใช้งาน (Implementation Blueprint)

### จุดที่ 1: เพิ่มเมธอดใน Java Engine ([`ScriptManagerImpl.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java))
เพิ่ม 2 เมธอดนี้เพื่อป้องกันสคริปต์ Python เรียกหาเมธอดไม่เจอ และรองรับการเช็ค `AccountQuest` โดยไม่โยน Exception:
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

---

### จุดที่ 2: แก้ไขสคริปต์ NPC ประจำเมือง 6 แห่ง
ปรับโค้ดบรรทัด 10-17 ในไฟล์ `3003104.py`, `3003152.py`, `3003209.py`, `3003322.py`, `3003432.py`, `3003530.py`:
```python
# โค้ดเดิมที่มีปัญหา (Crash):
# for qid in SUB_QUESTS:
#     if sm.hasQuest(qid):
#         q = sm.getQuestById(qid)
#         if q != null and q.isComplete(chr):
#             completedSubQuest = qid
#             break

# โค้ดใหม่ที่ถูกต้องและทำงานได้ 100%:
completedSubQuest = None
for qid in SUB_QUESTS:
    if sm.hasQuest(qid) and sm.isQuestComplete(qid):
        completedSubQuest = qid
        break
```

---

### จุดที่ 3: สคริปต์คูปองสัญลักษณ์ประจำเมือง (`2635510` ถึง `2635514`)
สร้างไฟล์สคริปต์ใน `v214 src/data/scripts/item/` รองรับการดับเบิ้ลคลิกใช้งาน:
- **`consume_2635510.py`** ➔ มอบ `1712002` (Arcane Symbol: Chu Chu Island)
- **`consume_2635511.py`** ➔ มอบ `1712003` (Arcane Symbol: Lachelein)
- **`consume_2635512.py`** ➔ มอบ `1712004` (Arcane Symbol: Arcana)
- **`consume_2635513.py`** ➔ มอบ `1712005` (Arcane Symbol: Morass)
- **`consume_2635514.py`** ➔ มอบ `1712006` (Arcane Symbol: Esfera)

**ตัวอย่างโครงสร้างโค้ดสำหรับคูปองประจำเมือง (เช่น `consume_2635510.py`):**
```python
# Arcane Symbol: Chu Chu Island Coupon
COUPON_ID = 2635510
SYMBOL_ID = 1712002

emptySlots = sm.getEmptyInventorySlots(1) # Equip
totalCoupons = sm.getQuantityOfItem(COUPON_ID)

if totalCoupons <= 0:
    sm.dispose()
elif emptySlots < 1:
    sm.sendSayOkay("Please make sure you have at least 1 empty slot in your #bEQUIP#k inventory.")
else:
    maxQty = min(totalCoupons, emptySlots)
    quantity = sm.sendAskNumber("How many #b#i" + str(SYMBOL_ID) + "# #z" + str(SYMBOL_ID) + "##k would you like to receive?\r\n(Available Coupons: " + str(totalCoupons) + ", Free Equip Slots: " + str(emptySlots) + ")", 1, 1, maxQty)
    if 0 < quantity <= totalCoupons:
        if sm.getEmptyInventorySlots(1) >= quantity:
            sm.consumeItem(COUPON_ID, quantity)
            sm.giveSymbol(SYMBOL_ID, quantity)
            sm.sendSayOkay("You received #b#i" + str(SYMBOL_ID) + "# #z" + str(SYMBOL_ID) + "##k x " + str(quantity) + "!")
        else:
            sm.sendSayOkay("You do not have enough empty slots in your #bEQUIP#k inventory.")
```

---

### จุดที่ 4: แปลภาษาข้อความรีเซ็ตและบทสนทนา (Localization)
1. **ใน [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java#L10856-L10904)**:
   - แปลข้อความ `[Thông báo] Vanishing Journey Research đã được làm mới!`
   - เปลี่ยนเป็น: `[Notice] Vanishing Journey Research has been reset!` หรือ `[แจ้งเตือน] เควสต์สำรวจ Vanishing Journey ได้รับการรีเซ็ตแล้ว!`
2. **ในสคริปต์จบเควสต์ `q38451e.py` ถึง `q38473e.py`**:
   - ปรับภาษาเวียดนามใน `sendNext` และ `sendAskYesNo` ให้เป็นภาษาอังกฤษหรือไทยที่สละสลวย

---

## 4. เช็คลิสต์ขั้นตอนการปฏิบัติงานเมื่อเริ่มดำเนินการ (Actionable Checklist)

เมื่อผู้ใช้สั่งให้เริ่มดำเนินการ ให้ปฏิบัติตามลำดับขั้นตอนดังนี้:
- [ ] **Step 1**: แก้ไขโค้ดใน [`ScriptManagerImpl.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/scripts/ScriptManagerImpl.java) (เพิ่ม `isQuestComplete` และ `getQuestById`)
- [ ] **Step 2**: แก้ไขข้อความประกาศภาษาเวียดนามใน [`Char.java`](file:///c:/Users/admin/Documents/MapleStory_Server_Runner/v214%20src/src/main/java/net/swordie/ms/client/character/Char.java)
- [ ] **Step 3**: คอมไพล์ Java Core (`2_Build_Server.bat` หรือ `mvn package`) และ Deploy `maplestory.jar` ไปยัง `Server263/`
- [ ] **Step 4**: ปรับปรุงสคริปต์ NPC ทั้ง 6 เมือง (`3003104.py`, `3003152.py`, `3003209.py`, `3003322.py`, `3003432.py`, `3003530.py`)
- [ ] **Step 5**: สร้างสคริปต์คูปอง `consume_2635510.py` ถึง `consume_2635514.py`
- [ ] **Step 6**: แปลบทสนทนาส่งเควสต์ใน `q38451e.py` - `q38473e.py`
- [ ] **Step 7**: รันเซิร์ฟเวอร์และทดสอบ In-Game Testing (รับเควสต์, ตีมอนสเตอร์, ส่งเควสต์, เปิดคูปอง, อัปเลเวลสัญลักษณ์)
- [ ] **Step 8**: สร้าง All-in-One Patch Archive (`Patches/Server263_Patch_Latest.zip`)
- [ ] **Step 9**: อัปเดต `PROGRESS.md` พร้อมระบุเวลาจริง และทำ `git add .`, `git commit`, `git push`

---
**จบเอกสารส่งมอบงาน (End of Handoff Document)**
