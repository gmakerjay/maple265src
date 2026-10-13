// Created by MetaMS
// [9031012]
// MapName:匠人街

if (stage.getMakingSkillLevel(92020000) > 0) {
        stage.openUIWithOption(0x2A, 9031012);
} else {
        stage.showSystemMessage("未學習裝備製作，無法使用");
}