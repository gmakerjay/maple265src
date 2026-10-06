Music_Box = 3003259
Protective_Mask = 3003207
Music_Box_Mob = 8643013
Dreamkeeper_Mob = 8643000

sm.removeNpc(Music_Box)
sm.removeNpc(Protective_Mask)
sm.killMobs()
if sm.hasQuest(34325):
    sm.lockUI()
    sm.removeAdditionalEffect()
    sm.removeEscapeButton()
    sm.spawnNpc(Music_Box, 1369, 33)
    sm.spawnNpc(Protective_Mask, 1372, 78)
    sm.setSpeakerID(Music_Box)
    sm.setBoxChat()
    sm.sendNext("Ooooh... What a strange feeling...")
    sm.sendNext("Is this what happiness feels like? Was I... happy? I don't know. I don't know...")
    sm.hideNpcByTemplateId(Music_Box, True)
    sm.spawnMob(Music_Box_Mob, 1369, 33, False)
    sm.setSpeakerID(Protective_Mask)
    sm.setBoxChat()
    sm.sendNext("So she was the music box... Hurry, before the Dreamkeepers appear.")
    sm.spawnMob(Dreamkeeper_Mob, 1813, 78, False)
    sm.spawnMob(Dreamkeeper_Mob, 1833, 78, False)
    sm.spawnMob(Dreamkeeper_Mob, 1853, 78, False)
    sm.spawnMob(Dreamkeeper_Mob, 1873, 78, False)
    sm.spawnMob(Dreamkeeper_Mob, 1893, 78, False)
    sm.setSpeakerID(Protective_Mask)
    sm.setBoxChat()
    sm.sendNext("...Too late.")
    sm.sendNext("Hurry, destroy the music box #h0#!")
    sm.unlockUI()
    while sm.hasMobById(Music_Box_Mob):
        if chr.getField().getMobs().size() == 0:
            break
    sm.completeQuest(34325)
    sm.warpInstanceOut(chr, 450003430)
