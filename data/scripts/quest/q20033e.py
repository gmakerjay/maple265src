# Manual Labor

# Constants
LIMBERT = 1106002

sm.setSpeakerID(LIMBERT)
sm.setBoxChat()
selection1 = sm.sendNext("Where's the eggs? I told you to get eggs. If you broke them... Wait a second, what happened to you?\r\n #b\r\n#L0# Uh, well, you know how you told me not to mess with Bigby? Well... I kinda... He got out.#l")


if selection1 == 0:
    sm.sendNext("What?!! I swear to every deity I can think of, you will starve to death if that dog is not in my yard by dinnertime.")

sm.completeQuestNoRewards(20033)
sm.giveItem(2001500, 30)
sm.giveItem(2001503, 30)
sm.addLevel(2)
sm.warpInstanceIn(chr, 913070004, 0)