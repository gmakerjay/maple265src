// Created by MetaMS
// [9031014]
// MapName:匠人街

if (stage.getMakingSkillLevel(92040000) > 0) {
        stage.openUIWithOption(0x2A, 9031014);
} else {
        stage.showSystemMessage("未學習鍊金術，無法使用。");
}