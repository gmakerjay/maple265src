# ObjectID: 0
# ParentID: 53236
#fck nexon
KYRIN = 9270089
sm.removeEscapeButton()
sm.setSpeakerID(KYRIN)
sm.setBoxChat()
sm.sendNext("How are things, #b#h0##k? Got any lingering effects from getting your noggin jostled?")
sm.setPlayerBoxChat()
sm.sendNext("I'm good shape, thanks to you and the crew, but i'm aching to move on to something bigger")
sm.setSpeakerID(KYRIN)
sm.setBoxChat()
sm.sendNext("You space folk bounce back quick! Lucky for you. I've got just the thing to clear the cobwebs out of that melon of yours.")
sm.sendNext("When you first woke up, Bark had a small chunk of rock for you.\r\nLooked like it was pretty important, judging by that sparkle in your eye.")
sm.setPlayerBoxChat()
sm.sendNext("My dad passed that on to me. I don't reckon he'd be too happy if he saw the state it was in now.")
sm.setSpeakerID(KYRIN)
sm.setBoxChat()
sm.sendNext("I thought that might be the case. I called you here because I met a blacksmith that I think could help you out. He fixed my gun up and now it can shoot throught a steel hul! They say there ain't nothing he can't fix..")
sm.setPlayerBoxChat()
sm.sendNext("#b(She thinks a simple blacksmith can fix my core? I guess it's worth taking a look.)")
if sm.sendAskYesNo("I know a shortcut to the #Master Forge#k. I'll send you there if you want."):
    sm.startQuest(parentID)
    sm.warp(552000071,0)
    #sm.dispose()
    






