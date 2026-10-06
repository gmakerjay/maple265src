# ParentID: 940011070
# ObjectID: 0
# Character field ID when accessed: 940011070
FENELLE = 3000106
CARTALION = 3000107
BELDAR = 3000108
if (sm.getChr().getJob() == 6100):
    sm.removeNpc(CARTALION)
    sm.removeNpc(BELDAR)
    sm.removeNpc(FENELLE)
    sm.giveSkill(60001229, -1)
    sm.spawnNpc(CARTALION,-827,27)
    sm.spawnNpc(BELDAR,-540,27)
    sm.spawnNpc(FENELLE,512,27)
    sm.flipNpcByTemplateId(CARTALION, False)
    sm.flipNpcByTemplateId(BELDAR, False)
    
    sm.lockInGameUI(True, False)
    sm.hideUser(True)
    
    sm.setSpeakerID(FENELLE)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("Did something happen to Kaiser? I've got a bad feeling...")
    
    sm.setSpeakerID(CARTALION)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("High Priest!")
    
    sm.moveCamera(False ,500, -540, 27)
    sm.setCameraOnNpc(BELDAR)
    sm.sendDelay(2000)
    sm.moveNpcByTemplateId(CARTALION, False, 400, 150)
    sm.moveNpcByTemplateId(BELDAR, False, 400, 150)
    sm.sendDelay(2000)
    
    
    sm.moveCamera(False ,500, 512,27)
    sm.setCameraOnNpc(FENELLE)
    sm.setSpeakerID(FENELLE)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("What's going on? Beldar.... why are you here...?")
    sm.showNpcSpecialActionByTemplateId(CARTALION, "say", 50000)
    sm.setSpeakerID(BELDAR)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("Heliseum has been captured. I escaped along with a few other survivors")
    
    sm.setSpeakerID(FENELLE)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("Heliseum is ....But, Kaiser left for Heliseum a while ago....")
    
    sm.setSpeakerID(BELDAR)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("I have not seen him. As we were escaping, though.... We saw a huge explosion. It might have been.")
    
    sm.setSpeakerID(CARTALION)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("Fenelle! I will lead our forces into eliseum and re-take the city! Kaiser might need-")
    
    sm.setSpeakerID(BELDAR)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("Don't be fool! Heliseum has already fallen. We must hold the line here, and protect the shield. If Nova is to survive this catastrophe. We must act carefully.")
    
    sm.setSpeakerID(CARTALION)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("Then...you're just going to let Kaiser...?")
    
    sm.setSpeakerID(BELDAR)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("There were thousands of Specters in Heliseum. If Kaiser has not escaped by now... he won't be escaping at all. Not even he can survive such odds.")
    
    sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg0/0", 2000,CARTALION)
    sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg0/0", 2000,BELDAR)
    sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg0/0", 2000,FENELLE)
    sm.sendDelay(2000)
    
    sm.setSpeakerID(FENELLE)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("In truth... we wouldn't have enough power to form the shield over Pantheon without the Relics at Heliseum.")
    
    sm.setSpeakerID(BELDAR)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("So, I ordered priests to bring Relics with them when we escaped. With the Relics safe, we can raise a shield strong enough to protect us from Darmoor.")
    
    sm.setSpeakerID(FENELLE)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("I see. You only care about saving yourself.")

    sm.setSpeakerID(BELDAR)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("Say whatever you want, but I did what I had to for the good of Nova. It would have been easy to stay and fall in battle. It is harder to have to live with the shame of our loss.")
    
    sm.setSpeakerID(CARTALION)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("But... how did Heliseum fall in the first place? They had the shield up and still they were captured.")
    
    sm.setSpeakerID(FENELLE)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("Come to think of it, how DID Heliseum fall that easily with the shield intact?")
    
    sm.setSpeakerID(BELDAR)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("Do you remember Magnus, the disgraced knight exiled by the Councill?")
    
    sm.setSpeakerID(CARTALION)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("Yes, He was said to be strong as Kaiser, but used his power for personal gain. A wholly despicable fellow.")
    
    sm.setSpeakerID(BELDAR)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("It was him. He disabled the shield and let Darmoor's forces in Magnus appeared in the city not long before the invasion, and we thought perhaps he had turned over a new leaf instead....")
    sm.sendNext("It was mistake to think that it would take Darmoor too long to invade. He found a way to seize both. Aabors and Heliseum at once, leaving us completely off-guard.")
    
    sm.setSpeakerID(FENELLE)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("By the way, where is the King and the royal families?")
    
    sm.setSpeakerID(BELDAR)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("I don't know. We've lost track of so many people in all the chaos If they escaped, they will find their way here. Our priority now is to get the shield up.")
    
    sm.setSpeakerID(FENELLE)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("This time, let's spread the Relics out instead of keeping them in a single place. We don't want same thing to happen here.")
    
    
    sm.setSpeakerID(CARTALION)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("That will make them harder to defend, though.")
    
    sm.setSpeakerID(FENELLE)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("Well, I will cast a protective spell on the Relics that only allows elite preists to handle them. It is not a perfect solution, but it is something.")
    
    
    sm.setSpeakerID(BELDAR)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("I will leave the shield to you. As for Kaiser, if he has fallen. when will he reincarnate?")
    
    sm.setSpeakerID(FENELLE)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("His spirit will select a child born after he passes on. All we can do it wait.")
    sm.sendNext("For now, we should keep Kaiser's reincarnation a secret. The last thing we need is our enemy targeting our chilren.")
    sm.lockInGameUI(False, False)
    sm.removeNpc(FENELLE)
    sm.removeNpc(CARTALION)
    sm.removeNpc(BELDAR)
    sm.showFade(500)
    sm.warp(940002040)
if (sm.getChr().getJob() == 6500):
    KYLAN = 3000152
    sm.lockInGameUI(True, False)
    sm.removeNpc(KYLAN)
    sm.spawnNpc(KYLAN,337,27)
    sm.hideNpcByTemplateId(KYLAN,True)
    sm.removeEscapeButton()
    
    sm.setPlayerBoxChat()
    sm.sendNext("I-I stole something! I've never stolen anything. I didn't mean to. I swear!")
    sm.sendNext("I don't even have any MP... I'm incapable of doing anything. I'm useless...")

    sm.forcedInput(1)
    sm.showBalloonMsg("Effect/Direction10.img/effect/tuto/BalloonMsg0/5",2000)
    sm.sendDelay(3000)
    sm.forcedInput(0)
