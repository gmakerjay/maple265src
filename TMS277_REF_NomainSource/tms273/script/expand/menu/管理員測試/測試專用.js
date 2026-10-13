/**
 * 測試腳本 - 添加輪迴技能buff
 */

// 直接添加技能buff 80011261（輪迴技能）
try {
    stage.applySkillBuff(80011261, 1);
    stage.showSystemMessage("已添加輪迴技能buff");
    npc.say("輪迴技能buff添加成功！");
} catch (e) {
    npc.say("添加技能buff失敗：" + e.message);
    }

