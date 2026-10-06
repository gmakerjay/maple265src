OLLIE = 3003652

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face3#Be careful. The Erda that forms this ocean is the purest form we've ever seen in the Arcane River.")
sm.sendNext("#face3#These creatures were born directly from this pure Erda, so they might be quite different from creatures you've faced before.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
if sm.sendAskAccept("#face0#Please gather #bdry white firewood#k from #bAtus#k. I think we'll need around 100 pieces."):
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face0#Thanks. I know it's a lot, but I'm not so good at starting fires. Shubert's the resident pyro.")
    sm.startQuest(34565)