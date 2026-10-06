from net.swordie.ms.constants import GameConstants

sm.removeNpc(9075304)
sm.removeNpc(9075305)
sm.removeNpc(1540471)
sm.spawnNpc(9075304, 259, 56)
sm.spawnNpc(1540471, 530, 29)
sm.flipNpcByTemplateId(9075304, False)
sm.lockInGameUI(True)
sm.removeEscapeButton()

sm.sendDelay(1)

sm.forcedFlip(False)
sm.setSpeakerID(9075304)
sm.sendNext("We've done what we can medically, but her terrible wounds have left her in a coma. We don't know how long she can go on since she was so weak to begin with.")

sm.sendSay("There's not much else we can do. Death, or life... it's all up to Orchid. All we can do is wait and watch.\r\nI aslo asked Belle to investigate the Evolution System that attacked her.")

sm.spawnNpc(9075305, 160, 56)
sm.flipNpcByTemplateId(9075305, False)

sm.setSpeakerID(9075305)
sm.sendSay("I'm back. Ugh, I never want to go back there. Gives me the creeps.")

sm.setSpeakerID(9075304)
sm.flipDialogue()
sm.sendSay("Sorry you had to deal with that. How did the investigations go?")

sm.setSpeakerID(9075305)
sm.sendSay("Well, to cut to the chase, the Evolution System has #r#eevoled#n#k by itself. Without any changes to its internal system. I don't want to admit it but, Gelimer was a genius.")

sm.setSpeakerID(9075304)
sm.flipDialogue()
sm.sendSay("Belle, hold your horses and tell us the details. A self-evolving machine... What are you talking about?")

sm.setSpeakerID(9075305)
sm.sendSay("That is just what it is. The Evolution System has evolved itself completely anew. It doesn't just defend itself. It's #renhanced itself into a stronger system#k. It' making its own judgements.")

sm.sendDelay(3)

sm.sendNext("It recognized Orchid as a strong enemy and enhanced its own system to accommodate. Gelimer, that madman... he created something big.")

sm.setSpeakerID(9075304)
sm.flipDialogue()
sm.sendSay("Then what happens to the Evolution System now?")

sm.setSpeakerID(9075305)
sm.sendSay("Who knows? Whether it will keep itself as-is or choose to make changes... it's all up to the AI.")

sm.sendSay("You should go check it out for yourself. My words are worth almost nothing, unless you go see it.")

sm.setSpeakerID(9075304)
sm.flipDialogue()
sm.sendSay("Okay, #h0#. Go see how the Evolution System has changed itself. Contact me as soon as you see anything out of the ordinary.")

sm.sendDelay(3)

sm.setSpeakerID(9075304)
sm.flipDialogue()
sm.sendNext("She will call out Lotus's name even in her times of life-and-death struggles. Do you think he will hear her?")

sm.removeNpc(9075304)
sm.removeNpc(9075305)

sm.showFieldEffect("Effect/Direction5.img/effect/orca/0", 6000)

sm.sendDelay(5)

sm.showFade(500)
sm.showFieldEffect("Effect/Direction5.img/effect/suo/0", 7000)

sm.completeQuest(1846)

sm.sendDelay(5)

sm.lockInGameUI(False)
sm.modifiedCharacter()
sm.warpInstanceOut(chr, GameConstants.EVOLVING_ENTRANCE_MAP)