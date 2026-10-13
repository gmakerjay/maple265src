// Created by MetaMS
// [9031013]
// MapName:匠人街

if (stage.getMakingSkillLevel(92030000) > 0) {
        stage.openUIWithOption(0x2A, 9031013);
} else {
        stage.showSystemMessage("未學習飾品製作，無法使用");
}