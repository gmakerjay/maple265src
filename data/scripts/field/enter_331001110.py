#KINESIS
from net.swordie.ms.world.field.fieldeffect import GreyFieldType
#NPC
JAY = 1531001
KINESIS = 1531000
if sm.getFieldID() == 331001110:
    sm.lockInGameUI(True, False)
    sm.playExclSoundWithDownBGM("Bgm43.img/Kinesis Theme II", 100)
    sm.setFieldColour(GreyFieldType.Field, 0, 0, 0, 0)
    sm.hideUser(True)
    if chr.getAvatarData().getAvatarLook().getGender() == 0:
        sm.setSpeakerID(1531000)
        sm.removeEscapeButton()
        sm.setBoxChat()
    if chr.getAvatarData().getAvatarLook().getGender() == 1: 
        sm.setSpeakerID(1531052)
        sm.removeEscapeButton()
        sm.setBoxChat()
    if sm.sendAskYesNo("#eWould you like to skip the tutorial questline."):
        sm.lockInGameUI(False, False)
        sm.showFade(100)
        sm.levelUntil(10)
        sm.jobAdvance(14200)
        sm.giveItem(1142863)
        sm.warpInstanceOut(chr, 331001000)
    else:
        sm.sendDelay(1200)
        sm.showFade(500)
        sm.reservedEffectRepeat("Map/Effect2.img/kinesis/title")
        sm.sendDelay(5000)
        sm.showFade(500)
        sm.reservedEffectRepeat("Map/Effect2.img/kinesis/title",False)

        sm.sendDelay(1000)


        sm.setSpeakerID(JAY)
        sm.removeEscapeButton()

        sm.setBoxChat()
        sm.showFade(500)
        sm.sendNext("Ah, ah. Test. Test. Okay \r\n The communication system is working. Now I'm going to measure your movement.")

        sm.setSpeakerID(KINESIS)
        sm.removeEscapeButton()
        sm.setBoxChat()
        sm.sendNext("Jay, I think i need glasses.")

        sm.setSpeakerID(JAY)
        sm.removeEscapeButton()
        sm.setBoxChat()
        sm.sendNext("You have 20/20 vision. You dont need glasses.")
        sm.showFade(1000)
        sm.setFieldColour(GreyFieldType.Field, 255, 255, 255, 0)
        sm.hideUser(False)
        sm.forcedInput(1)
        sm.sendDelay(50)
        sm.forcedInput(0)
        sm.setSpeakerID(KINESIS)
        sm.removeEscapeButton()
        sm.setBoxChat()
        sm.sendNext("No way. If my eyes are good, then this number #b10#k is really my Level.")
        #sm.lockInGameUI(True, False)
        sm.sendNext("I can't be #bLevel 10#k. I'm a hero! \r\nIf my eyes aren't bad, then you must have made a mistake.")

        sm.setSpeakerID(JAY)
        sm.removeEscapeButton()
        sm.setBoxChat()
        sm.sendNext("I don't have enought data to give you an answer.\r\nYour Level changes as your movement and telekinetic data accumulate.")

        sm.setSpeakerID(KINESIS)
        sm.removeEscapeButton()
        sm.setBoxChat()
        sm.sendNext("All right, if you want a miracle, so you can become a high Level at once.")
        #sm.lockInGameUI(True, False)
        sm.setSpeakerID(JAY)
        sm.removeEscapeButton()
        sm.setBoxChat()
        sm.sendNext("Now, let's check your physical capability first.\r\nMove along the marks.")

        #sm.sendDelay(500)
        sm.moveCamera(False ,3000, -278, 63)
        sm.sendDelay(1000)
        #sm.moveCameraBack(3000)
        sm.moveCamera(True, 0, 0, 0)
        sm.sendDelay(1000)

        sm.setSpeakerID(KINESIS)
        sm.removeEscapeButton()
        sm.setBoxChat()
        sm.sendNext("Wait, there's a big problem that must be addressed first.")

        sm.setSpeakerID(JAY)
        sm.removeEscapeButton()
        sm.setBoxChat()
        sm.sendNext("? Everything's ready for testing. What problem are you talking about?")

        sm.setSpeakerID(KINESIS)
        sm.removeEscapeButton()
        sm.setBoxChat()
        sm.sendNext("Play some dance music. I can't get in the mood.")    

        sm.setSpeakerID(JAY)
        sm.removeEscapeButton()
        sm.setBoxChat()
        sm.sendNext(".......")    

        sm.playExclSoundWithDownBGM("SoundEff.img/finger", 100)

       # sm.playExclSoundWithDownBGM("Bgm42.img/TheBeast", 100)
        sm.setSpeakerID(KINESIS)
        sm.removeEscapeButton()
        sm.setBoxChat()
        sm.sendNext("All right, this is what I'm talking about!")
        sm.playExclSoundWithDownBGM("Bgm42.img/TheBeast", 100)



        sm.sendDelay(2000)
        sm.zoomCamera(500,2000,1400,-105)

        sm.sendDelay(3000)
        #sm.showFieldBackgroundEffect()

        #sm.resetCamera()
        sm.zoomCamera(500,1000,1000,-105)
        sm.moveCamera(False ,3000, -1358, -105)
        sm.moveCamera(True, 0, 0, 0)

        sm.lockInGameUI(False, False)
        #sm.addPopUpSay(KINESIS, 3000,"1", "FarmSE.img/boxResult")
        #sm.dispose()