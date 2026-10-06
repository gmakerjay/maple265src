sm.setSpeakerID(2140001)
sm.flipDialogue()
choice = sm.sendAskYesNo("Now, close your eye. I will awaken the new potential in your power.\r\n\r\n#b(Press OK to complete your 5th job advancement.)")

if choice == 1 and not sm.hasQuestCompleted(1465):
    chr.completeQuest(1465)
    sm.giveItem(2435770) # Skill Nodestone
    sm.playSound("Sound/SoundEff.img/5thJob")
    sm.showFieldEffect("Effect/5skill.img/screen")
    sm.avatarOriented("Effect/5skill.img/character_delayed")
    sm.sendSayOkay("You have a skill that only you can use. Please check it out!")
else:
    sm.sendSayOkay("You have already done 5th pre-quest!")
