# Finding Jack

Jack = 9201096

sm.setSpeakerID(Jack)
sm.sendNext("Who are you? Oh, you came here by my brother John's stead? Great.")
sm.sendSayOkay("It seems you helped the folks at the city at some errands, don't you? I shall appraise you nicely. Take a look on this: this is a map of the Phantom Forest, which I made myself after enough exploration. Take possession of that, and you #bwill be granted passage#k by paths other times undiscoverable. Remember well to #rnever lose it#k, you won't be having that again!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0# \r\n#i3992040# #t3992040#\r\n\r\n#fUI/UIWindow2.img/QuestIcon/8/0# 175000 EXP")
if sm.canHold(3992040):
    sm.giveItem(3992040)
    sm.completeQuest(82199999)
else:
    sm.sendSayOkay("Hey, you don't have a slot in your SETUP inventory for what I have to give to you. Solve that minor issue of yours then talk to me.")