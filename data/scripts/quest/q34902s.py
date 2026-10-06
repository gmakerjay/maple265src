# Created by MechAviv
# Quest ID :: 34902
# Not coded yet

from net.swordie.ms.enums import UIType

sm.setSpeakerID(3001500)
sm.setSpeakerType(3)
sm.removeEscapeButton()
sm.setPlayerBoxChat()
sm.setColor(1)
sm.sendNext("#face2#I think I might be strong enough to learn more powerful skills now...")


sm.setJob(15510)
sm.startQuest(34902)
sm.completeQuest(34902)
sm.systemMessage("You've obtained the <Crumbling Abyss> medal. ")
sm.chatScript("You've obtained the <Crumbling Abyss> medal.")
sm.completeQuest(34907)
sm.openUI(UIType.UI_STAT)
sm.openUIWithOption(UIType.UI_SKILL, 155101006)
sm.setSpeakerID(3001500)
sm.setSpeakerType(3)
sm.removeEscapeButton()
sm.setPlayerBoxChat()
sm.setColor(1)
sm.sendSay("#face0#With these new skills, I'll be able to fight stronger enemies and help my friends!")


sm.setSpeakerID(3001500)
sm.setSpeakerType(3)
sm.removeEscapeButton()
sm.setPlayerBoxChat()
sm.setColor(1)
sm.sendSay("#face6#My arm is where the Specter manifests the strongest. It's like it has a mind of its own now.")

sm.setSpeakerID(3001500)
sm.setSpeakerType(3)
sm.removeEscapeButton()
sm.setPlayerBoxChat()
sm.setColor(1)
sm.sendSay("#face3#If the Specter's strength grows with mine, will I eventually turn into a monster too? Or am I already a monster...?")
