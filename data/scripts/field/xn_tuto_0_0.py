# Character field ID when accessed: 931050900
# ObjectID: 0
# ParentID: 931050900
BRIGHTON = 2159374
CLAUDINE = 2159372
BELLE = 2159373
ELEX = 2159375
CHILHOOD_SELF_M = 2159368
CHILHOOD_SELF_F = 2159369

CHILHOOD_SELF_M_ANDROID = 2159370
CHILHOOD_SELF_F_ANDROID = 2159371

if (sm.getChr().getJob() == 3002):
    sm.lockInGameUI(True, False)
    sm.hideUser(True)
    sm.setSpeakerID(1540714)
    sm.removeEscapeButton()
    sm.setBoxChat()
    if sm.sendAskYesNo("#eWould you like to skip the tutorial questline."):
        sm.lockInGameUI(False, False)
        sm.showFade(100)
        sm.levelUntil(10)
        sm.jobAdvance(3600)
        sm.giveItem(1142575)
        sm.warpInstanceOut(chr, 310010000)
        sm.chatScript("<Memory Seeker> has been awarded.")
        sm.chatScript("Earned Forever Single title!")
    else:
        sm.showFieldEffect("Map/Effect.img/xenon/text0")
        sm.sendDelay(1000)

        sm.spawnNpc(BRIGHTON, 300,-14)
        sm.spawnNpc(CLAUDINE, 401,-14)
        sm.spawnNpc(BELLE, 500,-14)
        sm.spawnNpc(ELEX, 600,-14)

        sm.showNpcSpecialActionByTemplateId(CLAUDINE, "say", 90000)

        sm.flipNpcByTemplateId(BRIGHTON, False)
        sm.flipNpcByTemplateId(CLAUDINE, False)
        sm.flipNpcByTemplateId(BELLE, False)


        #MALE
        if chr.getAvatarData().getAvatarLook().getGender() == 0:
            sm.spawnNpc(CHILHOOD_SELF_M, 700,-14)

            sm.setSpeakerID(BELLE)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Okay, here we go.")

            sm.sendDelay(100)
            sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/0", 2000, BELLE )
            sm.sendDelay(2000)

            sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/1", 2000, ELEX )
            sm.sendDelay(2000)

            sm.setSpeakerID(ELEX)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Red M-Forcer!")

            sm.setSpeakerID(BELLE)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Yellow M-Forcer!")

            sm.setSpeakerID(CLAUDINE)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Blue M-Forcer!")

            sm.setSpeakerID(BRIGHTON)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Green M-Forcer!")

            sm.setSpeakerID(CHILHOOD_SELF_M)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Black M-Forcer!")

            sm.setSpeakerID(BELLE)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("All together...")
            sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/2", 2000, BELLE )
            sm.sendDelay(2000)
            sm.showNpcSpecialActionByTemplateId(BELLE, "happy", 0)
            sm.sendDelay(200)
            sm.sendNext("Oh! Awesome!")

            sm.setSpeakerID(CLAUDINE)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Belle like to pretend she's an M-Forcer.")

            sm.setSpeakerID(BELLE)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("It's so fun! They are righteous heroes who protect places like Edelstein from evil Like me!")

            sm.setSpeakerID(BRIGHTON)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Too bad there's never anybody for ME to beat up.")

            sm.setSpeakerID(ELEX)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("That's why we usually just yell at each other and dance around it's super fun.")

            sm.setSpeakerID(CHILHOOD_SELF_M)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("I can be the bad guy...")

            sm.setSpeakerID(BELLE)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("No way, #r#h0##k! We all have to be super righteous heroes! It's no fun if you're the bad guy. ")

            sm.setSpeakerID(CHILHOOD_SELF_M)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Yes.....")

            sm.setSpeakerID(BRIGHTON)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Well, I guess as long as it's fun, it wouldn't matter. Maybe we can play more later.")

            sm.setSpeakerID(CHILHOOD_SELF_M)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("I have to head home! Talk to you later!")

            sm.setSpeakerID(BELLE)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("See you tomorrow!")

            #sm.flipNpcByTemplateId(CHILHOOD_SELF_M, False)
            sm.moveNpcByTemplateId(CHILHOOD_SELF_M, False, 656, 100)
            sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/3", 2000, ELEX )
            sm.sendDelay(200)
            sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/4", 2000, BRIGHTON )
            sm.sendDelay(200)
            sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/4", 2000, CHILHOOD_SELF_M )
            sm.sendDelay(4000)


            sm.removeNpc(BRIGHTON)
            sm.removeNpc(CLAUDINE)
            sm.removeNpc(BELLE)
            sm.removeNpc(ELEX)
            sm.removeNpc(CHILHOOD_SELF_M)
            sm.showFade(500)
            sm.warpInstanceIn(chr, 931050910)

            sm.lockInGameUI(False, False)

        #FEMALE
        elif chr.getAvatarData().getAvatarLook().getGender() == 1:
            sm.spawnNpc(CHILHOOD_SELF_F, 700,-14)

            sm.setSpeakerID(BELLE)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Okay, here we go.")

            sm.sendDelay(100)
            sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/0", 2000, BELLE )
            sm.sendDelay(2000)

            sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/1", 2000, ELEX )
            sm.sendDelay(2000)

            sm.setSpeakerID(ELEX)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Red M-Forcer!")

            sm.setSpeakerID(BELLE)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Yellow M-Forcer!")

            sm.setSpeakerID(CLAUDINE)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Blue M-Forcer!")

            sm.setSpeakerID(BRIGHTON)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Green M-Forcer!")

            sm.setSpeakerID(CHILHOOD_SELF_F)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Black M-Forcer!")

            sm.setSpeakerID(BELLE)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("All together...")
            sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/2", 2000, BELLE )
            sm.sendDelay(2000)
            sm.showNpcSpecialActionByTemplateId(BELLE, "happy", 0)
            sm.sendDelay(200)
            sm.sendNext("Oh! Awesome!")

            sm.setSpeakerID(CLAUDINE)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Belle like to pretend she's an M-Forcer.")

            sm.setSpeakerID(BELLE)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("It's so fun! They are righteous heroes who protect places like Edelstein from evil Like me!")

            sm.setSpeakerID(BRIGHTON)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Too bad there's never anybody for ME to beat up.")

            sm.setSpeakerID(ELEX)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("That's why we usually just yell at each other and dance around it's super fun.")

            sm.setSpeakerID(CHILHOOD_SELF_F)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("I can be the bad guy...")

            sm.setSpeakerID(BELLE)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("No way, #r#h0##k! We all have to be super righteous heroes! It's no fun if you're the bad guy. ")

            sm.setSpeakerID(CHILHOOD_SELF_F)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Yes.....")

            sm.setSpeakerID(BRIGHTON)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("Well, I guess as long as it's fun, it wouldn't matter. Maybe we can play more later.")

            sm.setSpeakerID(CHILHOOD_SELF_F)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("I have to head home! Talk to you later!")

            sm.setSpeakerID(BELLE)
            sm.removeEscapeButton()
            sm.setBoxChat()    
            sm.sendNext("See you tomorrow!")

            #sm.flipNpcByTemplateId(CHILHOOD_SELF_F, False)
            sm.moveNpcByTemplateId(CHILHOOD_SELF_F, False, 656, 100)
            sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/3", 2000, ELEX )
            sm.sendDelay(200)
            sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/4", 2000, BRIGHTON )
            sm.sendDelay(200)
            sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/4", 2000, CHILHOOD_SELF_F )
            sm.sendDelay(4000)


            sm.removeNpc(BRIGHTON)
            sm.removeNpc(CLAUDINE)
            sm.removeNpc(BELLE)
            sm.removeNpc(ELEX)
            sm.removeNpc(CHILHOOD_SELF_F)
            sm.showFade(500)
            sm.warpInstanceIn(chr, 931050910)

            sm.lockInGameUI(False, False)