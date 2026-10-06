# ObjectID: 0
# ParentID: 807100100
# Character field ID when accessed: 807100100
from net.swordie.ms.world.field.fieldeffect import GreyFieldType
#NPC
HARUAKI = 9131006
KENSHIN = 9131010
MORI_RANMARU = 9131004
#MOB
ODA_SPIRIT_WALKER = 9421572
if sm.getFieldID() == 807100100:
    
    sm.lockInGameUI(True, False)
    sm.setSpeakerID(9400033)
    sm.removeEscapeButton()
    sm.setBoxChat()
    if sm.sendAskYesNo("#eWould you like to skip the tutorial questline."):
        sm.lockInGameUI(False, False)
        sm.showFade(100)
        #sm.addLevel(9)
        sm.warpInstanceOut(chr, 807040000)
        #sm.dispose()
    else:
        sm.setFieldColour(GreyFieldType.Field, 0, 0, 0, 0)
        sm.hideNpcByTemplateId(HARUAKI, True, True)
        sm.hideNpcByTemplateId(KENSHIN, True, True)
        sm.hideUser(True)
        sm.sendDelay(1200)
        sm.showFieldEffect("Map/Effect.img/JPKanna/text0")
        sm.sendDelay(8000)
        sm.setFieldColour(GreyFieldType.Field, 255, 255, 255, 0)
        sm.sendDelay(200)
        sm.hideNpcByTemplateId(HARUAKI, False)
        sm.hideNpcByTemplateId(KENSHIN, False)
        sm.hideUser(False)
        sm.forcedInput(0)

        sm.forcedInput(2)
        sm.sendDelay(2100)

        sm.setSpeakerID(KENSHIN)
        sm.removeEscapeButton()
        sm.setBoxChat()
        sm.forcedInput(0)
        sm.sendDelay(100)

        sm.sendNext("I can already feel the dark energy burning my skin.")

        sm.setPlayerBoxChat()
        sm.sendNext("This place gives me goosebumps.")
        sm.sendNext("There's a lot of noise.")

        sm.setSpeakerID(KENSHIN)
        sm.setBoxChat()
        sm.sendNext("We may not be the only intruders.")

        sm.setPlayerBoxChat()
        sm.sendNext("Whatever's going on, I don't like it. Do you think someone else could have received the same orders?")

        sm.setSpeakerID(HARUAKI)
        sm.setBoxChat()
        sm.sendNext("We may not be the only intruders.")

        sm.setSpeakerID(KENSHIN)
        sm.setBoxChat()
        sm.sendNext("Leave the worrying to me, Kanna. You hurry and stop the ritual.")

        sm.setSpeakerID(HARUAKI)
        sm.setBoxChat()
        sm.sendNext("The others have gone to the Northern Wing or the southwestern area. Kenshin's right. You need to focus on stopping the ritual.")
        sm.sendNext("We think it's taking place in the Western Wing. If you can somehow disrupt it, the power flowing into the Temple will be cut off. You'll have to destroy the altar in the basement to fully stop the ritual.")

        sm.setPlayerBoxChat()
        sm.sendNext("Got it.")

        sm.setSpeakerID(HARUAKI)
        sm.setBoxChat()
        sm.sendNext("You must hurry, Kanna!")

        sm.lockInGameUI(False, False)
elif sm.getFieldID() == 807100111:
    sm.lockInGameUI(True, False)
    sm.showFieldEffect("Map/Effect.img/JPKanna/text1")
    sm.sendDelay(8000)
    sm.showFade(500)
    sm.warpInstanceIn(chr, 807100101)
    
    sm.lockInGameUI(False, False)
elif sm.getFieldID() == 807100112:
    sm.lockInGameUI(True, False)
    sm.showFieldEffect("Map/Effect.img/JPKanna/text2")
    sm.sendDelay(8000)
    sm.showFade(500)
    sm.warp(807100102)
    
    sm.lockInGameUI(False, False)
elif sm.getFieldID() == 807100102:
    sm.spawnMob(ODA_SPIRIT_WALKER, -319, 32, False)
    sm.spawnMob(ODA_SPIRIT_WALKER, -319, 32, False)
    sm.spawnMob(ODA_SPIRIT_WALKER, -319, 32, False)
    sm.spawnMob(ODA_SPIRIT_WALKER, -319, 32, False)

    sm.spawnMob(ODA_SPIRIT_WALKER, 61, 32, False)
    sm.spawnMob(ODA_SPIRIT_WALKER, 61, 32, False)

    sm.spawnMob(ODA_SPIRIT_WALKER, 325, 32, False)
    sm.spawnMob(ODA_SPIRIT_WALKER, 325, 32, False)

    sm.spawnMob(ODA_SPIRIT_WALKER, 510, 32, False)
    sm.spawnMob(ODA_SPIRIT_WALKER, 510, 32, False)
    sm.lockInGameUI(True, False)
    
    sm.showBalloonMsg("Effect/DirectionJP3.img/effect/kannaTuto/balloonMsg/1", 2000)
    sm.sendDelay(2000)
    sm.showBalloonMsg("Effect/DirectionJP3.img/effect/kannaTuto/balloonMsg/2", 2000)
    sm.sendDelay(2000)
    sm.showBalloonMsg("Effect/DirectionJP3.img/effect/kannaTuto/balloonMsg/3", 2000)
    sm.sendDelay(2000)
    sm.addPopUpSay(9130081, 10000, "#eElliminate the enemies#n", "FarmSE.img/boxResult")
    
    sm.lockInGameUI(False, False)
    sm.showFieldEffect("Map/Effect.img/aran/tutorialGuide2")
elif sm.getFieldID() == 807100103:
    sm.lockInGameUI(True, False)
    sm.forcedInput(2)
    sm.sendDelay(1000)
    sm.forcedInput(7)
    sm.sendDelay(100)
    sm.showBalloonMsg("Effect/DirectionJP3.img/effect/kannaTuto/balloonMsg/4", 2000)
    sm.sendDelay(2000)
    sm.showBalloonMsg("Effect/DirectionJP3.img/effect/kannaTuto/balloonMsg/5", 2000)
    sm.sendDelay(2000)
    sm.forcedAction(4, 2000)#find effect
    sm.sendDelay(500)
    sm.showEffect("Effect/OnUserEff.img/JP_zipang/darkyo", 0, -273, -8, 0, 0, False, 1)
    sm.sendDelay(2000)
    sm.showBalloonMsg("Effect/DirectionJP3.img/effect/kannaTuto/balloonMsg/6", 2000)
    sm.sendDelay(2000)
    
    sm.forcedInput(2)
    sm.sendDelay(1800)
    sm.showFade(500)
    sm.warp(807100104)
    sm.lockInGameUI(False, False)
elif sm.getFieldID() == 807100104:
    sm.lockInGameUI(True, False)
    sm.showNpcSpecialActionByTemplateId(MORI_RANMARU, "back", 0)
    sm.forcedInput(2)
    sm.sendDelay(3500)
    sm.forcedInput(0)
    sm.sendDelay(100)
    sm.showBalloonMsg("Effect/DirectionJP3.img/effect/kannaTuto/balloonMsg/7", 2000)
    sm.sendDelay(2000)
    sm.showBalloonMsg("Effect/DirectionJP3.img/effect/kannaTuto/balloonMsg/8", 2000)
    sm.sendDelay(2000)
    sm.showBalloonMsgOnNpc("Effect/DirectionJP3.img/effect/kannaTuto/balloonMsg/9", 2000, MORI_RANMARU)
    sm.showNpcSpecialActionByTemplateId(MORI_RANMARU, "magic", 0)
    sm.sendDelay(2000)
    sm.showBalloonMsg("Effect/DirectionJP3.img/effect/kannaTuto/balloonMsg/10", 2000)
    sm.forcedAction(5, 0)
    sm.showEffect("Skill/4210.img/skill/42101004/effect", 0, 9, 114,-1, 0, False, 1)
    sm.sendDelay(1000)
    sm.forcedAction(6, 0)
    sm.showEffect("Skill/4212.img/skill/42120025/effect", 0, 9, 114,0, 0, False, 1)
    sm.sendDelay(1000)
    sm.warpInstanceOut(chr, 807040000)
    sm.showFade(1000)

    sm.lockInGameUI(False, False)