sm.setNpcBoxChat(3001508)
if sm.sendAskAccept("#face0#That's perfect! And now, do you think you could help gather food?"):
    sm.setNpcBoxChat(3001508)
    sm.sendNext("#face0#Salvo organizes food procurement. If you find him, I'm sure he'll be able to tell you what we need.")
    sm.startQuest(34918)