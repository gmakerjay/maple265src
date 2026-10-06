sel = sm.sendNext("What's goin' on over there?\r\n#b#L0#How's the fishing going?#l\r\n#L1#Do you know anything about the Commerci Republic?#l")

if sel == 0:
    sm.sendSayOkay("I'm casting off soon. You gotta get to the water early if you want to get the big ones.")
elif sel == 1:
    sm.sendNext("You're in the Commerci Republic right now! Follow that there coastal road southeast to get to the #e#bSan Commerci#k#n. That's the capital.")
    sm.sendPrev("San Commerci is a hub for traders all around the Republic. That Gilberto Daniella grew it up from a tiny fishing village into a boomin' jewel of the sea. It's 'cause of him my fish go for such good prices.")