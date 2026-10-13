let selection = npc.lockIdx(-1).askSelectMenu(["光明之路", "黑暗之路",]);
if (selection == 0) {
        let oLevel = Math.max(stage.getSkillLevel(27000106), stage.getSkillLevel(27000207));
        stage.changeSkillLevel(27000106, Math.max(1, oLevel));
        stage.changeSkillLevel(27000207, -1);
} else {
        let oLevel = Math.max(stage.getSkillLevel(27000106), stage.getSkillLevel(27000207));
        stage.changeSkillLevel(27000207, Math.max(1, oLevel));
        stage.changeSkillLevel(27000106, -1);
}
