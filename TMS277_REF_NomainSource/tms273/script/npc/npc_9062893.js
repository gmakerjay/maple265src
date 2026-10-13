// Created by MetaMS
// [艾普莉莎]  |  [9062893]
// MapName:<結束冒險>


/* Update Quest RecordEx | Id:502877 | Name: Unknown | Data: "clear=0" */
//stage.updateQuestRecordEx(502877, "clear=0");
/* Update Quest RecordEx | Id:502877 | Name: Unknown | Data: "lastDate=240911;clear=0" */
//stage.updateQuestRecordEx(502877, "lastDate=240911;clear=0");
if ("0".equals(stage.getQuestRecordEx(502877, "clear"))) {
        npc.id(9062893).next().say("不想跟我玩了嗎…？\r\n如果途中放棄冒險就不能給你獎勵…");
}
npc.id(9062893).next().say("#h0#要有勇士才能玩得開心！\r\n所以我們一定要一起玩！一言為定喔！！");
// Unhandled Message [MS_WorldShareRecordMessage] Packet: 0E 59 01 00 00 84 00 63 6C 65 61 72 44 3D 30 3B 63 6C 65 61 72 46 3D 30 3B 65 6E 74 65 72 44 61 74 65 3D 32 34 2F 30 39 2F 31 31 3B 6C 61 7A 79 3D 30 3B 70 65 6E 61 6C 74 79 54 69 6D 65 3D 32 34 30 39 31 31 32 30 34 35 34 38 32 38 36 3B 74 6F 64 61 79 3D 30 3B 64 6F 64 67 65 3D 31 3B 70 6C 61 79 43 6F 75 6E 74 3D 31 3B 63 6C 65 61 72 3D 30 3B 6C 61 73 74 44 61 74 65 3D 32 34 2F 30 39 2F 31 31 3B 74 75 74 6F 3D 31 
// Unhandled Message [MS_WorldShareRecordMessage] Packet: 0E 59 01 00 00 84 00 63 6C 65 61 72 44 3D 30 3B 63 6C 65 61 72 46 3D 30 3B 65 6E 74 65 72 44 61 74 65 3D 32 34 2F 30 39 2F 31 31 3B 6C 61 7A 79 3D 30 3B 70 65 6E 61 6C 74 79 54 69 6D 65 3D 32 34 30 39 31 31 32 30 34 35 34 38 32 38 36 3B 74 6F 64 61 79 3D 30 3B 64 6F 64 67 65 3D 30 3B 70 6C 61 79 43 6F 75 6E 74 3D 31 3B 63 6C 65 61 72 3D 30 3B 6C 61 73 74 44 61 74 65 3D 32 34 2F 30 39 2F 31 31 3B 74 75 74 6F 3D 31 
/* Update Quest RecordEx | Id:101489 | Name: [Maple19冒險] 全新的冒險開始 | Data: "result=0" */
//stage.updateQuestRecordEx(101489, "result=0");
/* Update Quest RecordEx | Id:101489 | Name: [Maple19冒險] 全新的冒險開始 | Data: "lazy=0;result=0" */
//stage.updateQuestRecordEx(101489, "lazy=0;result=0");
/* Update Quest RecordEx | Id:101489 | Name: [Maple19冒險] 全新的冒險開始 | Data: "lazy=0;enter=0;result=0" */
//stage.updateQuestRecordEx(101489, "lazy=0;enter=0;result=0");
/* Update Quest RecordEx | Id:101488 | Name: [Maple19冒險] 冒險開始 | Data: "MixGolem=0;TauroDefender=0;ZombieMushmom=0;enter=0" */
//stage.updateQuestRecordEx(101488, "MixGolem=0;TauroDefender=0;ZombieMushmom=0;enter=0");
// [LP_SetFieldUnknownEffect] [00 00 00 00 ]
// [LP_FieldUnknownValue] [28 00 00 00 ]
stage.changeMap(993225502, 3);