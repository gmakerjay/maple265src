# 37726 - [Yum Yum] The Traveler and the Follower
sm.setSpeakerID(3004703)
sm.sendNext("It looks like Caster has something to say to you before you leave Yum Yum Island.")
if sm.getEmptyInventorySlots(2) >= 1:
    sm.startQuest(37726)
    sm.completeQuest(37726)
    sm.completeQuestNoRewards(37727)
    sm.giveItem(2635510, 20)
    sm.sendSayOkay("You have completed the #bYum Yum Island#k storyline and received #b#i2635510# #z2635510# x 20#k!")
else:
    sm.sendSayOkay("Please make at least 1 empty slot in your USE inventory.")
