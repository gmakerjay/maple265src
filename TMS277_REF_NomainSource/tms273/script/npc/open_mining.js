// Created by MetaMS
// [9031011]
// MapName:匠人街

if (stage.getMakingSkillLevel(92010000) > 0) {
        stage.openUIWithOption(0x2A, 9031011);
} else {
        stage.showSystemMessage("未學習採礦，無法使用");
}