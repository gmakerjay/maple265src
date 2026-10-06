Simia = 3003151
Pibik = 3003153
Pimi = 3003154
Pidol = 3003155

answer = ""

sm.setSpeakerID(Simia)
sm.flipDialogue()
sm.sendNext("#b#h0##k!\r\nHow would you make me some delicious dish?!")

sm.setPlayerAsSpeaker()
sm.sendSay("Uh... I need #bbread for a bun, something green and leafy like lettuce, and then some kind of meat patty...#k")

sm.setSpeakerID(Simia)
sm.flipDialogue()
sm.sendSay("Okay! Then let's recreate the #b'bread and lettuce'#k first!")

sm.setPlayerAsSpeaker()
sm.sendSay("Okay. Can you think of anything here that tastes like the #blettuce, and the bread#k that were on the top and bottom of the sandwich?")

sm.setSpeakerID(Simia)
sm.flipDialogue()
sm.sendSay("Ooh... I have an idea!")

sm.flipDialogue()
sm.sendSay("First, head over to Five-Color Hill and gather #b40 #v4034943# #t4034943##k items from the #bBighorn Pinedeer#k. Those should perfectly replicate the flavor of the bread!")

sm.flipDialogue()
sm.sendSay("Oh! But first, we need a #bname for our culnary experiment#k. How about we start with a word that #bdescribes the dish#k!")

sm.setPlayerAsSpeaker()
sm.sendSay("I think the word 'sandwich' is already perfectly fine...")

sm.setSpeakerID(Simia)
sm.flipDialogue()
sm.sendSay("No! Our food can't truly be great without a #bgreat name#k!\r\nPi siblings! Help!")

sm.setSpeakerID(Pibik)
sm.flipDialogue()
sel = sm.sendNext("Me first! Okay! Pick One:\r\n#b#L0#Delicious#l\r\n#L1#Homecooked#l\r\n#L2#This is dumb.#l#k")

if sel == 0:
    sm.setSpeakerID(Pibik)
    sm.flipDialogue()
    sm.sendNext("#bDelicious#k is it? That's sounds cool!")
    answer += "Delicious"
elif sel == 1:
    sm.setSpeakerID(Pibik)
    sm.flipDialogue()
    sm.sendNext("#bHomecooked#k is it? Just like Simia's food!")
    answer += "Homecooked"
else:
    sm.setSpeakerID(Pibik)
    sm.flipDialogue()
    sm.sendNext("#bThis is dumb#k is it? That's not going anywhere!")
    answer += "This is dumb"
    
sm.setPlayerAsSpeaker()
sm.sendSay("What... That's a terrible start for a sandwich name.")

sm.setSpeakerID(Pimi)
sm.flipDialogue()
sel2 = sm.sendNext("Next, how about one of these!\r\n#b#L0#Beefy#l\r\n#L1#Smelly#l\r\n#L2#Your ideas are all terrible#l#k")

if sel2 == 0:
    sm.setSpeakerID(Pimi)
    sm.flipDialogue()
    sm.sendNext("Hmm. Sure, #bBeefy#k could work!")
    answer += " Beefy"
elif sel2 == 1:
    sm.setSpeakerID(Pimi)
    sm.flipDialogue()
    sm.sendNext("Eww... I don't want my food to be smelly!")
    answer += " Smelly"
else:
    sm.setSpeakerID(Pimi)
    sm.flipDialogue()
    sm.sendNext("You're!")
    answer += " Your ideas are all terrible"
    
sm.setPlayerAsSpeaker()
sm.sendSay("(Sighs)... Whatever.")

sm.setSpeakerID(Pidol)
sm.flipDialogue()
sel3 = sm.sendNext("Hehe, hehehe. I pick too!\r\n#b#L0#Bite of Heaven#l\r\n#L1#Surprise#l\r\n#L2#Delight#l#k")

if sel3 == 0:
    sm.setSpeakerID(Pidol)
    sm.flipDialogue()
    sm.sendNext("... No like! I say...'#bTastesplosion#k' instead! Heheheh. Kaboom!")
    answer += " Tastesplosion"
elif sel3 == 1:
    sm.setSpeakerID(Pidol)
    sm.flipDialogue()
    sm.sendNext("S...u...r...r...derrrr")
    answer += " Surprise"
else:
    sm.setSpeakerID(Pidol)
    sm.flipDialogue()
    sm.sendNext("Light all the wayyyy to the moon!")
    answer += " Delight"
    
sm.setPlayerAsSpeaker()
sm.sendSay("Umm...")

sm.setSpeakerID(Simia)
sm.flipDialogue()

sm.sendSay("Okay, that settles it! The name of our sandwich is the #b" + str(answer) + "#k!")


sm.flipDialogue()
sm.sendSay("Okay! Let's prepare our dish!")

sm.startQuest(parentID)
sm.createQuestWithQRValue(parentID, str(answer))