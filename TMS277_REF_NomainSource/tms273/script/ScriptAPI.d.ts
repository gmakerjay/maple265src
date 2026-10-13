declare const util: ScriptUtil
declare const dir: ScriptDirection
declare const cam: ScriptCamera
declare const eff: ScriptFieldEffect
declare const usr: ScriptUserEffect

declare const ctx: ScriptContext
declare const db: ScriptDatabase
declare const event: ScriptEvent
declare const map: ScriptField
declare const mob: ScriptMob
declare const npc: ScriptNpc
declare const stage: ScriptStage
declare const party: ScriptParty

declare const equip: ScriptEquip
declare const bundle: ScriptBundle
declare const pet: ScriptPet

declare class ScriptUtil {
    getServerName(): string;

    getScriptPath(): string;

    getStringDate(dateFormat: string): string;
    getStringDate(realTimestamp: number, dateFormat: string): string;

    calcExpireDay(days: number): number;

    getTimeStringToLong(timeString: string, format: string): number;

    isSameMonth(tMillis1: number, tMillis2: number): boolean;

    isSameWeek(tMillis1: number, tMillis2: number): boolean;

    isSameDay(tMillis1: number, tMillis2: number): boolean;

    broadcastChatMsg(type: number, message: string): void;

    broadcastWorldChatMsg(type: number, message: string): void;

    broadcastNoticeWithoutPrefix(notice: string, option: number): void;

    broadcastNotice(notice: string): void;

    broadcastEventMsg(notice: string): void;

    broadcastGachaponMsg(msg: string, item: object): void;

    broadcastWeatherEffectNotice(msg: string, type: number, duration: number, forced: boolean): void;

    getItemName(itemId: number): string;

    getMapName(mapId: number): string;

    getMobName(mobId: number): string;

    getItemReqLevel(itemId: number): boolean;

    isItemExist(itemId: number): boolean;

    isCashItem(itemId: number): boolean;

    makeItem(itemId: number, count: number): object;

    getMarriage(groom: ScriptStage, bride: ScriptStage, itemId: number): void;

    divorce(marriageId: number): void;

    makeDrop(itemId: number, minCount: number, maxCount: number, chance: number): object;
    makeDrop(itemId: number, minCount: number, maxCount: number, chance: number, shinyEffect: boolean): object;

    log(info: string): void;

    httpGet(url: string): string;

    httpPost(url: string, requestBody: string): string;
}

declare class ScriptUserEffect {

    posX(posX: number): this;

    posY(posY: number): this;

    uol(uol: string): this;

    reverse(reverse: boolean): this;

    fadeIn(fadeIn: number): this;

    fadeOut(fadeOut: number): this;

    delay(delay: number): this;

    origin(origin: number): this;

    normal(normal: boolean): this;

    idx(idx: number): this;

    linkType(linkType: number): this;

    text(text: string): this;

    speed(speed: number): this;

    time(time: number): this;

    mode(mode: number): this;

    npcId(npcId: number): this;

    entId(entId: number): this;

    chrId(chrId: number): this;

    local(local: number): this;

    align(align: number): this;

    lineSpace(lineSpace: number): this;

    typingEffect(typingEffect: boolean): this;

    enter(enter: number): this;

    leave(leave: number): this;

    textType(textType: number): this;

    sub(sub: string): this;

    value(value: number): this;

    respond(respond: boolean): this;

    blind(blind: boolean): this;

    show(show: boolean): this;

    repeat(repeat: boolean): this;

    rx(rx: number): this;

    ry(ry: number): this;

    setFadeInOut(): void;

    showSpeechBalloon(): void;

    showTypingSpeechBalloon(): void;

    showTextEffect(): void;

    showReservedEffect(): void;

    showAvatarOriented(): void;

    showBlindEffect(): void;

    setAvatarOrientedRepeat(): void;

    setAvatarOrientedMultipleRepeat(): void;

    playExclSoundWithDownBGM(): void;

    playSoundWithMuteBGM(): void;

    playPortalSE(): void;

    showReservedEffectRepeat(): void;
}

declare class ScriptStage {
    setFadeChange(): void;

    runScript(scriptPath: string): void;

    getChannelId(): number;

    destroy(msg: string): void;

    changeChannel(channel: number): void;

    setEvent(event: ScriptEvent): void;

    getEvent(): ScriptEvent;
    getEvent(eventName: string): ScriptEvent;

    getMapId(): number;

    getCalcInfo(): object;

    isGm(): boolean;

    isPlayerAlive(): boolean;

    isMarried(): boolean;

    getMarriedId(): number;

    removeFamiliar(): void;

    removeAllSpawnPet(): void;

    getReviveCount(): number;

    showReviveCount(): void;

    setReviveCount(count: number): void;

    initPotentialSkill(): void;

    updatePotentialSkill(page: number, pos: number): void;

    updateItemBySlot(invType: number, slot: number): void;

    removeItemBySlot(invType: number, slot: number): void;

    getItemBySlot(invType: number, slot: number): object;

    gainItem(item: any): boolean;
    gainItem(itemId: number, count: number): boolean;

    loseItem(itemId: number, count: number): void;

    removeItemAll(itemId: number): void;

    getAccountId(): number;

    getCharacterId(): number;

    getCharacterName(): string;

    getPosX(): number;

    getPosY(): number;

    checkNearby(x: number, y: number, distance: number): boolean;

    getLevel(): number;

    setLevel(level: number): void;

    getJobCategory(): number;

    getJob(): number;

    setJob(jobId: number): void;

    getSubJob(): number;

    getGender(): number;

    setSkin(skin: number): void;

    setFace(face: number): void;

    setHair(hair: number): void;

    getSkin(): number

    getFace(): number

    getHair(): number

    //Type:0-Default 1-Angel 2-Beta
    changeFace(type: number, beautyId: number): boolean;

    changeEyesColor(type: number, color: number, mixType: number): boolean;

    changeHair(type: number, beautyId: number): boolean;

    changeHairColor(type: number, color: number, mixType: number): boolean;

    changeSkin(type: number, beautyId: number): boolean;

    changeAndroidFace(beautyId: number): boolean;

    changeAndroidEyesColor(color: number, mixType: number): boolean;

    changeAndroidHair(beautyId: number): boolean;

    changeAndroidHairColor(color: number, mixType: number): boolean;

    changeAndroidSkin(beautyId: number): boolean;

    getStr(): number;

    getDex(): number;

    getInt(): number;

    getLuk(): number;

    getHp(): number;

    getHpPercent(): number;

    increaseMaxHp(delta: number): void;

    increaseMaxMp(delta: number): void;

    setStr(pureStr: number): void;

    setDex(pureDex: number): void;

    setLuk(pureLuk: number): void;

    setInt(pureInt: number): void;

    setHp(newHp: number): void;

    setMp(newMp: number): void;

    maxAllSkill(): void;

    resetHyperSkill(): void;

    resetHyperStatSkill(): void;

    resetSkills(): void;

    unequippedVCore(): void;

    levelUp(): void;

    modifyAp(gain: number): void;

    getAp(): number;

    modifySp(skillBook: number, gain: number): void;

    isAngelicBuster(): boolean;

    isZero(): boolean;

    startQuest(questId: number): void;
    startQuest(questId: number, data: string): void;

    isQuestStarted(questId: number): boolean;

    completeQuest(questId: number): void;

    isQuestCompleted(questId: number): boolean;

    removeQuest(questId: number): void;

    getQuestData(questId: number): string;

    updateQuestRecordEx(questId: number, rawStr: string): void;
    updateQuestRecordEx(questId: number, key: string, value: string): void;

    removeQuestRecordEx(questId: number, key: string): void;

    getIntQuestRecordEx(questId: number, key: string): number;

    getQuestRecordEx(questId: number, key: string): string;
    getQuestRecordEx(questId: number): string;

    updateQuestRecordExShare(questId: number, key: string, value: string): void;
    updateQuestRecordExShare(questId: number, rawStr: string): void;

    removeQuestRecordExShare(questId: number, key: string): void;

    getIntQuestRecordExShare(questId: number, key: string): number;

    getQuestRecordExShare(questId: number, key: string): string;
    getQuestRecordExShare(questId: number): string;

    updateWorldShareRecord(questId: number, rawStr: string): void;

    updateWorldShareRecord(questId: number, key: string, value: string): void;

    removeWorldShareRecord(questId: number, key: string): void;

    getIntWorldShareRecord(questId: number, key: string): number;

    getWorldShareRecord(questId: number, key: string): string;

    getWorldShareRecord(questId: number): string;

    updateEventShareRecord(questId: number, rawStr: string): void;

    updateEventShareRecord(questId: number, key: string, value: string): void;

    removeEventShareRecord(questId: number, key: string): void;

    getIntEventShareRecord(questId: number, key: string): number;

    getEventShareRecord(questId: number, key: string): string;

    getEventShareRecord(questId: number): string;

    getMesos(): number;

    hasMesos(money: number): boolean;

    gainMesos(gain: number): void;

    loseMesos(lose: number): void;

    gainExp(gain: number): void;

    modifyWp(wp: number): void;

    modifyPop(pop: number): void;

    modifyCharisma(charismaExp: number): void;

    modifyInsight(insightExp: number): void;

    modifyWill(willExp: number): void;

    modifyCraft(craftExp: number): void;

    modifySense(senseExp: number): void;

    modifyCharm(charmExp: number): void;

    modifyFatigue(fatigue: number): void;

    resetFatigue(): void;

    changeMap(mapId: number, portal: number): void;
    changeMap(field: ScriptField, portalId: number): void;

    changeSkillLevel(skillId: number, level: number): void;
    changeSkillLevel(skillId: number, level: number, expireDate: number): void;

    healHpMpRBySkill(rate: number): void;

    healHpMpRByItem(rate: number): void;

    revival(rate: number): void;

    changeSkillLevel(skillId: number, level: number, duration: number): void;

    getSkillLevel(skillId: number): number;

    applyItemBuff(itemId: number): void;

    applySkillBuff(skillId: number, level: number): void;

    cancelBuffStat(skillId: number): void;

    cancelAllBuffStat(): void;

    applyDebuff(skillId: number, level: number): void;

    cancelDebuff(skillId: number, level: number): void;

    getMapleUnionInfo(): any; // Adjust the return type to match the actual returned object structure
    getMapleUnionUpgradeInfo(): any; // Adjust the return type to match the actual returned object structure
    upgradeMapleUnionUpgrade(): boolean;

    hasGuild(): boolean;

    getGuildId(): number;

    getGuildGrade(): number;

    getGuildName(): string;

    modifyGuildCommitment(commitment: number): void;

    getAllianceGrade(): number;

    getGuildPoint(): number;

    getAllianceId(): number;

    /*
    GUILD_EVENT_FLAG = 0,
    GUILD_EVENT_POINT = 1,
    GUILD_EVENT_BOSS = 2,
    GUILD_EVENT_QUEST = 3;
     */
    updateGuildEventQuestPoint(type: number, value: number): void;

    teleportToPos(userCallingType: number, x: number, y: number): void;

    teleportToPortalId(portalId: number): void;
    teleportToPortalId(userCallingType: number, portalId: number): void;

    teleportToPortalName(ptName: string): void;

    setUserEmotionLocal(type: number, duration: number, force: boolean): void;

    setFuncKeyByScript(set: boolean, action: number, keyValue: number): void;

    sitOnDummyChair(chairId: number, opt: number): void;

    setPartner(show: boolean, npcId: number, skillId: number, hasScript: boolean): void;

    setPartnerAction(npcId: number, action: number, left: boolean): void;

    setPartnerForceFlip(npcId: number, flip: number): void;

    setPlayerParticleEffect(key: string, duration: number, type: number, value: number, x: number): void;

    setHireTutor(show: boolean): void;

    showHireTutorMsg(msg: string): void;
    showHireTutorMsg(idx: number): void;

    setSessionValue(key: string, value: string): void;

    getSessionValue(key: string): void;

    setHireTutorById(set: boolean, skillId: number, ableFieldId: number): void;

    showProgressMessageFont(msg: string, nFontNameType: number, nFontSize: number, nFontColorType: number, nFadeOutDelay: number): void;

    showScriptProgressMsg(msg: string): void;

    showScriptProgressItemMsg(itemId: number, msg: string): void;

    showSystemMessage(msg: string): void;

    dropAlertNotice(msg: string): void;

    dropMessage(type: number, message: string): void;

    addPopupSay(npcId: number, duration: number, msg: string, sound: string, force: boolean): void;

    getFreeSlot(invType: number): number;

    canHold(itemId: number, count: number): boolean;

    hasItem(itemId: number, count: number): boolean;

    getItemQuantity(itemId: number): number

    exclRequest(): void;

    enterMyHome(): void;

    enterGuildCastle(): void;

    enterGuildCastleRoom(portalName: string, portalId: number): void;

    showTimer(hide: boolean, duration: number, subValue: number): void;
    showTimer(seconds: number): void;

    showEventTimer(totalDuration: number, duration: number): void;

    setClockModify(reduce: boolean, second: number): void;

    showStopwatch(millisecond: number): void;

    setDojangClock(total: number, remain: number);

    showGiantBossCountDown(totalDuration: number, duration: number): void;

    onMyHome(): boolean;

    getMakingSkillLevel(skillId: number): number;

    getMakingSkillExp(skillId: number): number;

    checkMakingSkillExpFull(craftId: number): boolean;

    addMakingSkillExp(craftId: number, exp: number): void;

    checkMakingSkillEff(): void;

    increaseMannequin(type: number): boolean;

    increaseEquipInvSlot(count: number): boolean;

    increaseConsumeInvSlot(count: number): boolean;

    increaseInstallInvSlot(count: number): boolean;

    increaseEtcInvSlot(count: number): boolean;

    increaseTrunkCapacity(count: number): void;

    increaseDamageSkinSlot(count: number): boolean;

    updateDamageSkin(type: number, itemId: number): void;

    checkDamageSkinSave(): boolean;

    isDamageSkinSave(damageSkin: number): boolean;

    setTranslucence(value: number, delay: number): void;

    removeTranslucence(): void;

    equipped(slot: number, itemId: number): void;

    setForcedSpeed(value: number): void;

    setForcedJump(value: number): void;

    resetForcedStat(): void;

    spawnTempNpc(npcId: number, x: number, y: number, f: number): number;

    destroyTempNpc(entityId: number): void;

    addTempValue(key: string, value: string): void;

    getTempValue(key: string): string;

    takeTempValue(key: string): string;

    openUI(uiId: number): void;

    closeUI(uiId: number): void;

    openUIWithOption(uiId: number, option: number): void;

    openShop(id: number): void;

    openTrunk(id: number): void;

    setFieldFloating(x: number, y: number, term: number, set: boolean, value: number): void;

    setMapTaggedObjectVisible(key: string, visible: boolean, manual: number, delay: number): void;

    setMapTaggedObjectSmoothVisible(tag: string, visible: boolean, manual: number, delay: number): void;

    setMapTaggedObjectAnimation(name: string, type: number): void;

    setSpineBackEffectAlpha(name: string, alpha: number, delay: number): void;

    setSpineBackEffectPlay(name: string, val: string, loop: boolean, randomStart: boolean): void;

    setSpineBackEffectAddPlay(name: string, val: string, play: boolean): void;

    setSpineBackEffectAction(name: string, action: boolean): void;

    setSpineObjectEffectAlpha(name: string, alpha: number, delay: number): void;

    setSpineObjectEffectPlay(name: string, val: string, loop: boolean, randomStart: boolean): void;

    setSpineObjectEffectAddPlay(name: string, val: string, play: boolean): void;

    setSpineObjectEffectAction(name: string, action: boolean): void;

    setBackgroundByTag(name: string, x: number, y: number): void;

    setCameraRotation(degree: number, time: number): void;

    pushCameraSwitchMoveInfo(targetName: string, time: number): void;

    pushCameraSwitchMoveToPos(x: number, y: number, time: number): void;

    setCameraSwitchBack(): void;

    setCameraSwitchMove(characterId: number, reset: boolean, resetTime: number, uol: string): void;

    showSpecialUI(type: number, uiName: string): void;

    showPlatformerTimer(action: number, remain: number, total: number, questId: number): void;

    showLobbyTimer(action: number, remain: number, total: number, questId: number): void;

    startNavigation(targetMap: number, type: number, portalName: string, value: number): void;

    setNpcEmotion(id: number, emotion: number, duration: number, localActionOn: boolean): void;

    setNpcViewOrHide(id: number, view: boolean, viewNameTag: boolean): void;

    setNpcSpecialAction(id: number, action: string, tDuration: number, localAct: boolean): void;

    resetNpcSpecialAction(id: number): void;

    setNpcCharacterBaseAction(id: number, str: string, tDuration: number, localActionOn: boolean): void;

    setNpcFadeHide(id: number, type: number, duration: number): void;

    setNpcParticleEffect(entityId: number, key: string, duration: number, type: number, value: number, x: number): void;

    setNpcSpecialEffect(id: number, set: boolean, infos: object): void;

    setNpcForceMove(id: number, forceX: number, moveX: number, speedRate: number): void;

    setNpcForceFlip(id: number, nFlip: number): void;

    setNpcActionLayerRelMove(id: number, x: number, y: number, time: number): void;

    showWeatherEffectNotice(msg: string, type: number, duration: number, forced: boolean): void;

    setDressUpState(set: boolean): void;

    removeRolePlaying(): void;

    removeTemporarySkill(): void;

    setActionBar(barIdx: number): void;

    showBalloonMsg(msg: string, width: number, timeOut: number): void;
    showBalloonMsg(msg: string, width: number, timeOut: number, x: number, y: number): void;

    gainVCore(coreId: number, show: boolean): void;

    gainRandVCore(type: number): void;

    fullHexaCore(): void;

    setPlayerPosOffset(x: number, y: number, z: number): void;

    setFly(fly: boolean): void;

    modifyCurrency(type: number, value: number): boolean;

    getCurrency(type: number): number;

    modifyHonor(value: number): void;

    getHonor(): number;

    getOnlineTime(): number;

    getHuntCount(): number;

    getIp(): string;

    getMac(): string;

    setFieldScene(type: number): void;

    resetBossClearLog(type: number, sel: number): void;

    checkBossClearLog(type: number, sel: number): boolean;

    addBossClearLog(mobId: number): boolean;

    setEnterBoss(mobId: number): void;

    resetBossEnterLog(type: number, sel: number): number;

    getBossEnterRemainCount(type: number, sel: number): number;

    checkBossEnterLog(type: number, sel: number): boolean;

    addBossEnterLog(type: number, sel: number): boolean;

    showPortalEffect(data: string, type: number): void;

    setFieldVariable(key: string, value: string): void;

    showGiantBossMap(infos: object): void;

    setFieldDirCandleCount(action: number, count: number): void;

    showUrusResultUI(): void;

    setFieldWeather(key: string, show: boolean, set: boolean, value: number): void;

    setParticle(key: string, x: number, y: number): void;

    setScreenOpening(value: number, duration: number, type: number): void;

    updateDoJangLog(nowStage: number, time: number): void;

    showDojangRank(): void;

    gainSolErdaBreath(value: number): void;

    showAchieveRate(rate: number): void;

    initTradeKingShop(): void;

    gainChatEmoticon(id: number): boolean;

    gainChatEmoticonGroup(groupId: number): boolean;

    gainArtifactExp(exp: number): void;

    modifyArtifactPoint(point: number): void;

    openParcel(): void;

    selectPTSystemList(type: number): void;

    showTraineeInfo(): void;

    deleteTrainee(): void;

    setEventUIAction(effect: String, key: String): void;

    tryMigrateCashShop(): void;

    checkGuildCastle(): void;

    setSkipGameDirection(): void;
}

declare class ScriptNpc {
    getSessionId(): string;

    meFlip(): this;

    npcFlip(): this;

    me(): this;

    noEsc(): this;

    replace(): this;

    defNpc(npcId: number): this;

    otherNpcId(otherNpcId: number): this;

    ui(ui: number): this;

    uiMax(): this;

    msg(msg: string): this;

    id(speakerId: number): this;

    prev(): this;

    next(): this;

    nextDelay(nextDelay: number): this;

    showNpcId(showNpcId: number): this;

    faceIdx(faceIdx: number): this;

    left(): this;

    defText(defText: string): this;

    minLen(minLen: number): this;

    maxLen(maxLen: number): this;

    bgIdx(bgIdx: number): this;

    fontSize(fontSize: number): this;

    margin(margin: number): this;

    defNum(defNum: number): this;

    minNum(minNum: number): this;

    maxNum(maxNum: number): this;

    time(time: number): this;

    surveyType(surveyType: number): this;

    showType(showType: number): this;

    styles(styles: number[]): this;

    cardId(cardId: number): this;

    col(col: number): this;

    line(line: number): this;

    slideType(slideType: number): this;

    lastSel(lastSel: number): this;

    selType(selType: number): this;

    defSel(defSel: number): this;

    allowEsc(): this;

    lockIdx(lockIdx: number): this;

    say(msg: string): void;

    say(msg: string): void;

    askYesNo(msg: string): boolean;

    askYesNoEx(msg: string): boolean;

    askAccept(msg: string): boolean;

    askText(msg: string): string;

    askBoxText(msg: string): string;

    askBoxTextBgImg(msg: string): string;

    askNumber(msg: string): number;

    askMenu(msg: string): number;

    askAngelicBuster(): void;

    askNumberKeypad(): void;

    askAvatar(msg: string): void;

    askAndroid(msg: string): void;

    askPet(msg: string): void;

    sayImage(imgRaws: string[]): void;

    sayIllus(msg: string): void;

    askSlideMenu(msg: string): number;

    askSelectMenu(selInfos: string[]): void;

    createParty(): void;

    disbandParty(): void;

    startQuest(): void;
    startQuest(data: string): void;

    completeQuest(): void;
}

declare class ScriptMob {

    getDataId(): number;

    getEntityId(): number;

    setSpiritEntityId(spiritEntityId: number): void;

    setSoulEntityId(soulEntityId: number): void;

    setInvincible(invincible: boolean): void;

    setRemoveAfter(removeAfter: number): void;

    setAppearType(appearType: number): void;

    setOption(option: number): void;

    setFlip(): void;

    isBoss(): boolean;

    isAlive(): boolean;

    getMapId(): number;

    getHp(): number;

    setHp(hp: number): void;

    changeHp(hp: number): void;

    setForcedMobStat(level: number): void;

    setPMdr(value: number): void;

    getPosX(): number;

    getPosY(): number;

    setMinHpLimitR(value: number): void;

    changeZoneType(curZoneDataType: number): void;

    registerMobZone(type: number, targetId: number): void;

    getOnlyPlayerId(): number;

    setOnlyPlayerId(onlyPlayerId: number): void;

    setFieldActionType(fieldActionType: number): void;

    setFieldActionValue(fieldActionValue: number): void;

    checkNearby(x: number, y: number, distance: number): boolean;
}

declare class ScriptFieldEffect {
    mobId(mobId: number): this;

    remHp(remHp: number): this;

    maxHp(maxHp: number): this;

    tagColor(tagColor: number): this;

    tagBgColor(tagBgColor: number): this;

    uol(uol: string): this;

    delay(delay: number): this;

    volume(volume: number): this;

    enumOrigin(enumOrigin: number): this;

    repeat(repeat: boolean): this;

    value(value: number): this;

    type(type: number): this;

    set(set: boolean): this;

    blind(blind: boolean): this;

    binary(binary: number): this;

    r(r: number): this;

    b(b: number): this;

    g(g: number): this;

    duration(duration: number): this;

    term(term: number): this;

    key(key: string): this;

    rx(rx: number): this;

    ry(ry: number): this;

    location(location: number): this;

    postRender(postRender: boolean): this;

    removeAfter(removeAfter: number): this;

    expand(expand: boolean): this;

    sub(sub: string): this;

    x(x: number): this;

    y(y: number): this;

    z(z: number): this;

    loop(loop: boolean): this;

    action(action: string): this;

    useKey(useKey: boolean): this;

    queue(queue: boolean): this;

    addon(addon: boolean): this;

    fadeIn(fadeIn: number): this;

    fadeOut(fadeOut: number): this;

    showMobHPTag(): void;

    showScreenAutoLetterBox(): void;

    showScreenDelayed(): void;

    showTopScreen(): void;

    showTopScreenDelay(): void;

    playSoundEffect(): void;

    showFloatingUI(): void;

    showObjectEffect(): void;

    disableObjectEffect(): void;

    showTrembleEffect(): void;

    setGrayScale(): void;

    setLayerBlind(): void;

    changeBGM(): void;

    setBGMVolumeOnly(): void;

    setBGMDelayPlay(): void;

    setLayerOn(): void;

    setLayerMove(): void;

    setLayerOff(): void;

    setLayerFade(): void;

    setLayerMoveOffset(): void;

    setLayerMoveOffsetForce(): void;

    setLayerOffMoveOffset(): void;

    setSpineScreen(): void;

    offSpineScreen(): void;

    setSkeletonSpine(): void;

    setStageClear(): void;

    setOverlap(): void;

    setOverlapDetail(): void;

    removeOverlapDetail(): void;

    setBGMVolume(): void;

    changeFiledObjectColor(): void;

    setIllustrationLayer(): void;

    offIllustrationLayer(): void;

    moveIllustrationLayer(): void;

    setSkeletonLayer(): void;

    offSkeletonLayer(): void;

    setFieldWeather(): void;

    setGrayColor(): void;
}

declare class ScriptField {
    getId(): number;

    getTemplateFieldId(): number;

    spawnNpc(npcId: number, x: number, y: number, f: number): void;

    removeNpc(npcId: number): void;

    getNpcEntityId(npcId: number): number;

    getActiveMobCount(): number;

    getAllStage(): ScriptStage[];

    overridePortal(portalName: string, script: string): void;

    getMyHomeOwner(): number;

    dropItems(x: number, y: number, ...itemsAndChances: number[]): void;
    dropItems(ownerId: number, x: number, y: number, mesosMin: number, mesosMax: number, mesosChance: number, ...itemsAndChances: number[]): void;

    dropItemsEx(ownerId: number, x: number, y: number, mesosMin: number, mesosMax: number, mesosChance: number, ...drops: object[]): void;

    dropIndieItems(ownerId: number, x: number, y: number, mesosMin: number, mesosMax: number, mesosChance: number, ...itemsAndChances: number[]): void;

    dropIndieItemsEx(ownerId: number, x: number, y: number, mesosMin: number, mesosMax: number, mesosChance: number, ...drops: object[]): void;

    makeMob(mobId: number): ScriptMob;

    spawnMob(mobId: number, posX: number, posY: number): void;
    spawnMob(scriptMob: ScriptMob, posX: number, posY: number): void;

    reset(): void;

    killAllMob(): void;

    killMob(mobId: number): void;

    setSpawnStop(spawnStop: boolean): void;

    setReactorState(name: string, state: number, stateEnd: number): void;

    getReactorState(name: string): number;

    startEvent(): void;

    endEvent(): void;

    changeBGM(uol: string): void;

    showSystemMessage(msg: string): void;

    showEventMsg(message: string): void;

    showScriptProgressMsg(msg: string): void;

    isTeleportLimit(): boolean;

    blowWeather(itemId: number, msg: string, second: number): void;

    spawnReactor(reactorId: number, posX: number, posY: number, flip: boolean, name: string): void;

    createObstacleAtom(
        createType: number,
        size: number,
        topY: number,
        atomType: number,
        range: number,
        damR: number,
        mobDamR: number,
        delay: number,
        height: number,
        vPerSec: number,
        maxP: number,
        angle: number
    ): void;

    showScreenAutoLetterBox(uol: string): void;

    showTopScreen(uol: string): void;

    playSoundEffect(uol: string): void;

    showObjectEffect(objectName: string): void;

    transferTo(mapId: number, portalId: number): void;

    setMobRemoveAfter(mobId: number, after: number): void;

    getMobCount(mobId: number): number;

    hasRuneStone(): boolean;

    getPlayerCount(): number;

    getNumEntityInArea(id: string): number;

    getNumPlayersInArea(id: string): number;

    getNumItemsInArea(id: string): number;

    setFootholdMan(opt: number): void;

    setHidePet(hidePet: boolean): void;

    showTimer(seconds: number): void;

    setOverrideFirstEnter(script: string): void;
}

declare class ScriptEvent {
    getChannel(): number;

    getInstanceName(): string;

    initMap(...mapIds: number[]): void;

    getVariables(): { [key: string]: any };

    setVariable(key: string, value: any): void;

    getVariable(key: string): any;

    clearVariables(): void;

    getAchieveRate(): number;

    setAchieveRate(rate: number): void;

    getMap(mapId: number): ScriptField;

    startTimer(key: string, millisDelay: number): void;

    stopTimer(key: string): void;

    stopTimers(): void;

    destroyEvent(): void;

    updateGiantBossMap(): void;

    initKaringEvent(): void;

    updateKaringEvent(): void;

    setPracticeMode(practiceMode: boolean);

    registerUser(characterId: number): void;

    updateAllUserBossClear(mobId: number, clear: boolean);
}

declare class ScriptDirection {
    action(action: number): this;

    duration(duration: number): this;

    uol(uol: string): this;

    x(x: number): this;

    y(y: number): this;

    overlay(overlay: boolean): this;

    overlayX(overlayX: number): this;

    npc(npc: boolean): this;

    npcId(npcId: number): this;

    notOrigin(notOrigin: boolean): this;

    force(force: boolean): this;

    key(key: string): this;

    data(data: string): this;

    actType(actType: number): this;

    reqCount(reqCount: number): this;

    back(back: boolean): this;

    pixel(pixel: number): this;

    set(set: boolean): this;

    scale(scale: number): this;

    timePos(timePos: number): this;

    value(value: number): this;

    text(text: string): this;

    end(end: boolean): this;

    align(align: number): this;

    decTic(decTic: number): this;

    moveDir(moveDir: number): this;

    moveFixel(moveFixel: number): this;

    check(check: boolean): this;

    volume(volume: number): this;

    local(local: number): this;

    lineSpace(lineSpace: number): this;

    lockUI(): this;

    block(): this;

    forceMouseOver(): this;

    showUI(): this;

    addScreenAction(id: number, key: string, idx: number, x: number, y: number, delay: number): this;

    setForcedAction(): void;

    setDelay(delay: number): void;

    setEffectPlay(): void;

    setForcedInput(forcedInput: number): void;

    setPatternInputRequest(): void;

    setCameraMove(): void;

    setCameraOnCharacter(targetId: number): void;

    setCameraZoom(): void;

    resetCameraZoom(): void;

    setCameraReleaseFromUserPoint(): void;

    setCameraReleaseByType(type: number): void;

    setVansheeMode(vanshee: boolean): void;

    setFaceOff(faceItemId: number): void;

    setMonologue(text: string): void;

    setMonologueScroll(text: string): void;

    setMonologueEx(text: string): void;

    setAvatarLook(items: number[]): void;

    setEmotion(): void;

    setEmotionType(type: number): void;

    removeAdditionalEffectEx(): void;

    removeAdditionalEffect(): void;

    setForcedMove(): void;

    setForcedFlip(flip: number): void;

    setInputUI(uiId: number): void;

    setInputUIEx(uiId: number): void;

    setFadeDelay(delay: number): void;

    setRemoveEffect(): void;

    setCameraFocus(): void;

    setScreenEffect(): void;

    setScreenColor(): void;

    setScreenOpening(): void;

    setScreenAction(): void;

    playAmbientSound(): void;

    stopAmbientSound(): void;

    setInGameDirectionMode(): void;

    setInGameCurNodeEventEnd(end: boolean): void;

    playMovie(file: string, show: boolean): void;

    playMovieURL(url: string): void;

    setStandAloneMode(set: boolean): void;

    setDirectionMod(set: boolean): void;

    addPopupSay(): void;

    setSkipDirection(): void;
}

declare class ScriptDatabase {
    select(sql: string): void;

    insert(sql: string): void;

    update(sql: string): void;

    delete(sql: string): void;
}

declare class ScriptCamera {

    type(type: number): this;

    delay(delay: number): this;

    rate(rate: number): this;

    x(x: number): this;

    y(y: number): this;

    start(start: number): this;

    end(end: number): this;

    level(level: number): this;

    releaseCtrl(): void;

    initCtrl(): void;

    currentRate(): void;

    setFreeFromUser(): void;

    setStickToUser(): void;

    setPutlooseLevel(): void;

    setAbsMove(): void;

    setRelMove(): void;

    setScale(): void;

    setScaleRate(): void;

    setScaleAbsMove(): void;

    setScaleRelMove(): void;

    setReturnToUser(): void;
}

declare class ScriptContext {

    getDataId(): number;

    getPortalId(): number;

    getEntityName(): string;

    getEntityPosX(): number;

    getEntityPosY(): number;

    getOption(): number;

    distanceFromEntity(): number;

    makeEvent(script: string, onlyOne: boolean, attachment: any): ScriptEvent;

    getEvent(eventName: string): ScriptEvent;

    broadcastWorldMsg(msg: string, showWhisperIcon: boolean): void;

    broadcastHeartMsg(msg: string, showWhisperIcon: boolean): void;

    broadcastBoneMsg(msg: string, showWhisperIcon: boolean): void;

    broadcastCakeMsg(msg: string, showWhisperIcon: boolean): void;

    broadcastPieMsg(msg: string, showWhisperIcon: boolean): void;

    generateItem(itemId: number, count: number): object;

    consume(): boolean;

    getGuildCapacity(): number;

    getAllianceCapacity(): number;

    inputGuildName(): void;

    disbandGuild(): void;

    disbandAlliance(): void;

    createAlliance(name: string, oCharacterId: number, sGuildId: number, oGuildId: number): void;

    incGuildCapacity(incValue: number): void;

    incAllianceCapacity(incValue: number): void;

    portalBlock(): void;
    portalBlock(msg: string): void;

    createMyHome(): void;

    addHomeDrawing(types: number[]): boolean;

    addHomeStorageSlot(count: number): boolean;

    setMyHomeName(name: string): void;

    showUnityPortal(): void;

    showBossSelectMenu(bossId: number, difficulty: number[]): void;

    showMonsterParkUI(type: number): void;

    getExpForLevelUp(): number;

    getPersonalityExpByLevel(level: number): number;

    addGuildCastleOperationLog(guildId: number, string1: string, string2: string, number1: number, number2: number, type: number): void;

    addGuildCastleQuestLog(guildId: number, characterId: number, name: string, type: number): void;
}

declare class ScriptParty {
    getLeaderId(): number;

    getMembersCount(): number;
    getMembersCount(mapId: number, minLevel: number, maxLevel: number): number;

    getLocalMembers(): object

    showNoticeWithoutPrefix(msg: string): void;

    getAverageLevel(): number;

    checkBossEventLevel(bossType: number, difficulty: number): string;

    checkBossEventEnter(bossType: number, difficulty: number): string;

    checkBossEventDone(bossType: number, difficulty: number): string;

    checkBossEventClear(bossType: number, difficulty: number): string;

    checkBossEventItem(bossType: number, difficulty: number): string;

    checkNotBossEventItem(bossType: number, difficulty: number): boolean;    //true: No one has item  false:Someone has

    checkCharacterItem(itemId: number, count: number): string;
}

declare class ScriptPet {
    getId(): number;

    getSn(): number;

    getItemId(): number;

    getExpireDate(): number;

    setExpireDate(expireDate: number): this;

    getName(): string;

    setName(name: string): this;

    getLevel(): number;

    setLevel(level: number): this;

    getTameness(): number;

    setTameness(tameness: number): this;

    getRepleteness(): number;

    setRepleteness(repleteness: number): this;

    getDeadDate(): number;

    setDeadDate(deadDate: number): this;

    getPetAttribute(): number;

    setPetAttribute(petAttribute: number): this;

    getPetSkill(): number;

    setPetSkill(petSkill: number): this;

    getRemainLife(): number;

    setRemainLife(remainLife: number): this;

    getActiveState(): number;

    setActiveState(activeState: number): this;

    getAttribute(): number;

    setAttribute(attribute: number): this;

    getPetHue(): number;

    setPetHue(petHue: number): this;

    getAutoBuffSkill1(): number;

    setAutoBuffSkill1(autoBuffSkill1: number): this;

    getAutoBuffSkill2(): number;

    setAutoBuffSkill2(autoBuffSkill2: number): this;

    getGiantRate(): number;

    setGiantRate(giantRate: number): this;

    getTraining(): number;

    setTraining(training: number): this;
}

declare class ScriptBundle {
    getId(): number;

    getSn(): number;

    getItemId(): number;

    getExpireDate(): number;

    setExpireDate(expireDate: number): this;

    getTitle(): string;

    setTitle(title: string): this;

    getAttribute(): number;

    setAttribute(attribute: number): this;

    getQuantity(): number;

    setQuantity(quantity: number): this;

    getFamiliar(): number;

    setFamiliar(familiar: number): this;

    getLevel(): number;

    setLevel(level: number): this;

    getSkill(): number;

    setSkill(skill: number): this;

    getPotential1(): number;

    setPotential1(potential1: number): this;

    getPotential2(): number;

    setPotential2(potential2: number): this;

    getPotential3(): number;

    setPotential3(potential3: number): this;

    getGrade(): number;

    setGrade(grade: number): this;
}

declare class ScriptEquip {
    getId(): number;

    getSn(): number;

    getItemId(): number;

    getExpireDate(): number;

    setExpireDate(expireDate: number): this;

    getTitle(): string;

    setTitle(title: string): this;

    getRuc(): number;

    setRuc(ruc: number): this;

    getCuc(): number;

    setCuc(cuc: number): this;

    getBaseStr(): number;

    setBaseStr(baseStr: number): this;

    getBaseDex(): number;

    setBaseDex(baseDex: number): this;

    getBaseInt(): number;

    setBaseInt(baseInt: number): this;

    getBaseLuk(): number;

    setBaseLuk(baseLuk: number): this;

    getMaxHp(): number;

    setMaxHp(maxHp: number): this;

    getMaxMp(): number;

    setMaxMp(maxMp: number): this;

    getPad(): number;

    setPad(pad: number): this;

    getMad(): number;

    setMad(mad: number): this;

    getPdd(): number;

    setPdd(pdd: number): this;

    getCraft(): number;

    setCraft(craft: number): this;

    getSpeed(): number;

    setSpeed(speed: number): this;

    getJump(): number;

    setJump(jump: number): this;

    getAttribute(): number;

    setAttribute(attribute: number): this;

    getLevelUpType(): number;

    setLevelUpType(levelUpType: number): this;

    getIncSkill(): number;

    setIncSkill(incSkill: number): this;

    getLevel(): number;

    setLevel(level: number): this;

    getExp(): number;

    setExp(exp: number): this;

    getDurability(): number;

    setDurability(durability: number): this;

    getIuc(): number;

    setIuc(iuc: number): this;

    getPuc(): number;

    setPuc(puc: number): this;

    getPvpDamage(): number;

    setPvpDamage(pvpDamage: number): this;

    getReduceReq(): number;

    setReduceReq(reduceReq: number): this;

    getSpecialAttribute(): number;

    setSpecialAttribute(specialAttribute: number): this;

    getDurabilityMax(): number;

    setDurabilityMax(durabilityMax: number): this;

    getIncReq(): number;

    setIncReq(incReq: number): this;

    getGrowthEnchant(): number;

    setGrowthEnchant(growthEnchant: number): this;

    getEnchant(): number;

    setEnchant(enchant: number): this;

    getBossDamageR(): number;

    setBossDamageR(bossDamageR: number): this;

    getIgnorePdr(): number;

    setIgnorePdr(ignorePdr: number): this;

    getDamageR(): number;

    setDamageR(damageR: number): this;

    getStatRate(): number;

    setStatRate(statRate: number): this;

    getCuttable(): number;

    setCuttable(cuttable: number): this;

    getExGradeOption(): number;

    setExGradeOption(exGradeOption: number): this;

    getItemState(): number;

    setItemState(itemState: number): this;

    getGrade(): number;

    setGrade(grade: number): this;

    getChuc(): number;

    setChuc(chuc: number): this;

    getOption1(): number;

    setOption1(option1: number): this;

    getOption1Lv(): number;

    setOption1Lv(option1Lv: number): this;

    getOption2(): number;

    setOption2(option2: number): this;

    getOption2Lv(): number;

    setOption2Lv(option2Lv: number): this;

    getOption3(): number;

    setOption3(option3: number): this;

    getOption3Lv(): number;

    setOption3Lv(option3Lv: number): this;

    getOption4(): number;

    setOption4(option4: number): this;

    getOption4Lv(): number;

    setOption4Lv(option4Lv: number): this;

    getOption5(): number;

    setOption5(option5: number): this;

    getOption5Lv(): number;

    setOption5Lv(option5Lv: number): this;

    getOption6(): number;

    setOption6(option6: number): this;

    getOption6Lv(): number;

    setOption6Lv(option6Lv: number): this;

    getSkin(): number;

    setSkin(skin: number): this;

    getSocketGrade(): number;

    setSocketGrade(socketGrade: number): this;

    getSocket1(): number;

    setSocket1(socket1: number): this;

    getSocket2(): number;

    setSocket2(socket2: number): this;

    getSocket3(): number;

    setSocket3(socket3: number): this;

    getColor(): number;

    setColor(color: number): this;

    getSoulOptionId(): number;

    setSoulOptionId(soulOptionId: number): this;

    getSoulSocket(): number;

    setSoulSocket(soulSocket: number): this;

    getSoulOption(): number;

    setSoulOption(soulOption: number): this;

    getArc(): number;

    setArc(arc: number): this;

    getArcExp(): number;

    setArcExp(arcExp: number): this;

    getArcLevel(): number;

    setArcLevel(arcLevel: number): this;

    getAut(): number;

    setAut(aut: number): this;

    getAutExp(): number;

    setAutExp(autExp: number): this;

    getAutLevel(): number;

    setAutLevel(autLevel: number): this;

    getReuc(): number;

    setReuc(ruc: number): this;

    getEuc(): number;

    setEuc(cuc: number): this;

    getExcelStr(): number;

    setExcelStr(baseStr: number): this;

    getExcelDex(): number;

    setExcelDex(baseDex: number): this;

    getExcelInt(): number;

    setExcelInt(baseInt: number): this;

    getExcelLuk(): number;

    setExcelLuk(baseLuk: number): this;

    getExcelMaxHp(): number;

    setExcelMaxHp(maxHp: number): this;

    getExcelMaxMp(): number;

    setExcelMaxMp(maxMp: number): this;

    getExcelPad(): number;

    setExcelPad(pad: number): this;

    getExcelMad(): number;

    setExcelMad(mad: number): this;

    getExcelPdd(): number;

    setExcelPdd(pdd: number): this;

    getExcelCraft(): number;

    setExcelCraft(craft: number): this;

    getExcelSpeed(): number;

    setExcelSpeed(speed: number): this;

    getExcelJump(): number;

    setExcelJump(jump: number): this;
}

interface Point {

}

interface Rect {

}
