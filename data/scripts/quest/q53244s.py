HAN_THE_BROKER = 2111007
sm.removeEscapeButton()
sm.setSpeakerID(HAN_THE_BROKER)
sm.setBoxChat()
sm.sendNext("The Matter Disassembier is done...a little early at that! I suppose I have you to thank for the extra business i'll surely recevie.")
if sm.sendAskYesNo("Would you be a lamb and see this through to be the end? My client likes to be discreet,as you've seen, and I stand out in a crowd. I believe you would be an excellent candidate for deliverying the Matter Disassembler you were so instrumental in building"):
    sm.sendNext("That's the entrepreneurial spirit! If this goes well, I'll give you a generous cut of the profits.... Net, not gross. I have a business to run here.")
    sm.sendNext(" The delivery instructions I was given told me to find a portal in #bThe Desert of Dreams#k. Sounds spookym but I'm sure you'll survive.")
    sm.sendNext("Just keep your eyes open and do not drop that thing!")
    sm.startQuest(parentID)
    #sm.dispose()



