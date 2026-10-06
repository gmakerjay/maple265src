def giveRewards(count):
    if count >= 6 and count <= 10:
        sm.addEventPoint(1)
    elif count >= 15 and count <= 19:
        sm.addEventPoint(2)
    elif count == 20:
        sm.addEventPoint(3)

if sm.getFieldID() == 910048200:
    if chr.getOxQuizCount() >= 6:
        if sm.sendAskYesNo("Yo what's up! you got " + str(chr.getOxQuizCount()) + " question(s) right for this round of the quiz. Do you want to get your reward and head back?"):
            giveRewards(chr.getOxQuizCount())
            chr.setOxQuizCount(0)
            sm.warpNoReturn(100000000, 0)
    else:
        sm.sendSayOkay("Yo what's up! You didn't meet the minimum answer(s) to get the reward... Hmm maybe next time ehh?")
else:
    sm.sendSayOkay("#eMapleStory OX Mini Game Event.#n\r\nGet more right, get more swag. Er, prices. Whatever, you know how this works.\r\nHey! Don't be hanging around the middle! That's how you get knocked OUT! Your heart-stopping OX Quiz starts... NOW! Read them carefully! If you think it's right, go to O! If you think it's wrong, go to X! Left ? Right?\r\nPick a side before your time is up, yo!")