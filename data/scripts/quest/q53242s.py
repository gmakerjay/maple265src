HAN_THE_BROKER = 2111007
sm.removeEscapeButton()
sm.setSpeakerID(HAN_THE_BROKER)
sm.setBoxChat()
sm.sendNext("#h0#, I need your help! I have deadline right around the corner and my client is breathing down my neck.")
sm.setPlayerBoxChat()
sm.sendNext("Han the Broker? What kind of low-down scheme are you running now?")
sm.setSpeakerID(HAN_THE_BROKER)
sm.setBoxChat()
sm.sendNext("No scheme! I swear it. But I need someone with a little discretion. No one on the outside must know. Will you help me?")
sm.setPlayerBoxChat()
sm.sendNext(" Spill the beans and I'll think about it.")
sm.setSpeakerID(HAN_THE_BROKER)
sm.setBoxChat()
if sm.sendAskYesNo("I can't tell you anything untill you agree to help. I swear I will make it worth you while. What do you say?"):
    sm.sendNext("I had a feeling you couldn't resist a good surprise.")
    sm.sendNext("A couple of days ago. I received an order from a secret organization.")
    sm.setPlayerBoxChat()
    sm.sendNext("And you don't want anybody to know what you're cooking up?")
    sm.setSpeakerID(HAN_THE_BROKER)
    sm.setBoxChat()
    sm.sendNext("I prefer to keep my trade screts to myself. The client asked me to make a #bMatter Disassembler#k, based on an old alchemy manuscript he found. The pay is VERY handsome.")
    sm.setPlayerBoxChat()
    sm.sendNext("#b(Matter Disassembler? That sounds like a dangerous thing to have...)")
    sm.sendNext("The client.... you know him?")
    sm.setSpeakerID(HAN_THE_BROKER)
    sm.setBoxChat()
    sm.sendNext("No, I don't know him and I do now wish to! I need the ingreadients and I need them immediately. The recipe calls for #b50#k sets of a #bPiece of Steel#k, a #bHardened Piece of Steel#k, and #bWires#k bound together with magic. You will need to attack #rIron Mutae Reinforced Iron Mutae#k and #rRoid#k machines to find them. Make sure no one sees you!")
    sm.setPlayerBoxChat()
    sm.sendNext("#b(This client sounds like somebody I oughtta set eyes on...)")
    sm.startQuest(parentID)
    #sm.dispose()













