// Created by MetaMS
// [9031010]
// MapName:匠人街

if (stage.getMakingSkillLevel(92000000) > 0) {
        stage.openUIWithOption(0x2A, 9031010);
} else {
        stage.showSystemMessage("未學習採藥，無法使用");
}