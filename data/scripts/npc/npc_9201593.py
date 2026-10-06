sm.setSpeakerID(9201593)
sm.flipDialogue()
sel = sm.sendNext("#e<Wedding Event Guide>#n\r\nYou can do #e#bthe wedding commemoration event#k#n after getting married. Ask me about #e#bthe wedding commemoration event#k#n.\r\n#b#L0#How do I do the wedding commemoration event.#l\r\n#L1#I want to know when my wedding anniversary is.#l\r\n#L2#End conversation.#l")
if sel == 0:
    sm.flipDialogue()
    sm.sendNext("#e<Wedding Commemoration Event Guide>#n\r\nThe wedding commemoration is an event for couples that have been married for at least 100 days.\r\nLove grows and gets deeper as time goes on, right? If you make a commitment of love with your spouse every 100 days, you'll get a Wedding Commemoration Ring that can be upgraded every 100 days, up to 1000 days.\r\nThis ring can eb equipped alongside your wedding ring.")
    sm.flipDialogue()
    sm.sendSay("Party with your spouse and bring them the #b#t5251017##k to make the commitment. The ticket is sold in the #e#rCash Shop#k#n. Also remember that you can't do the event if you're in the middle of a divorce. It sounds like common sense, but you'd be surprised...")
    sm.flipDialogue()
    sm.sendSay("So what do you say? Will you confirm your love with your spouse by making the commitment of love every 100 days and get the ring?")
elif sel == 1:
    sm.flipDialogue()
    sm.sendNext("You can check your Wedding Anniversary after you get married. You should find your true love and get married first, though.")
    