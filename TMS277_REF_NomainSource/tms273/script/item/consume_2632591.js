let e = stage.getEvent();
if (e && e.getInstanceName() == 'party_prison_break') {
    if (stage.getSessionValue('fly') == 1) {
    stage.cancelBuffStat(30021237);
    stage.setSessionValue('fly', 0)
} else {
    stage.setSessionValue('fly', 1)
            stage.applySkillBuff(30021237,1 );

}
} else {
    stage.showSystemMessage('僅限逃脫副本可用')
}
