KYRIN = 1090000
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(KYRIN)
sm.setBoxChat()
sm.sendNext("I'm sure you're getting used to the massive power of your Hand Cannon. Of course, you can access even more power once you advance to a full Cannoneer. Shall I show you how to do some real damage?")
sm.sendNext("You'll always want to start with the basic, of course. #bCannon Mastery, Cannon Booster#k,and #bCritical Fire#k are all necessary for you to fire your cannon quickly and accurately.")
sm.sendNext("Of course, the real fun comes from attack skills, #bScatter Shot#k fires multiple small bombs at multiple enemies in front of you.")
sm.sendNext("There are also skills that ultilize your friend, Monkey. #bBarrel Bomb#k rolls a barrel full of boms at your enemies, knocking them back. #bMonkey Magic#k gives you buffs using the magic of Monkey. He's a really handy guy!")
sm.sendNext("Shall we begin the test to become a Cannon Trooper? The test itself is simple. Just is enter the prepared test site, eliminate all the monsters, and bring the #ritem that they drop#k. Since they have high defense, however, it won't be easy to defeat them. Remember this.")
if sm.sendAskAccept("If you run out of potions in the middle of the test, you have to #bforfeit the quest and restart#k, so make sure you prepare plenty of potions. Let's start the test right away. When you accept, I'll send you to the test site."):
    sm.startQuest(parentID)
    sm.lockInGameUI(False, False)
    sm.showFade(1)
    sm.warpInstanceIn(chr, 912040005)
else:
    sm.lockInGameUI(False, False)