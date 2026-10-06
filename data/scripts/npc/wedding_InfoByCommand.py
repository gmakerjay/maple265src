sel = sm.sendNext("Got questions? My boyfriend and I have answers\r\n#b#L0#How do I get married in the House Wedding Hall?#l\r\n#L1#How do I propose?#l\r\n#L2#How do I participate in a wedding?#l")

if sel == 0:
    sm.sendNext("The House Wedding Hall is the perfect place to get married! You'll just need the #b#t5250500##k from the cash shop, and the bride and groom both need to be in this House Wedding Hall. How else would they kiss?")
    sm.sendSay("Face each other and double-click on the #b#t5250500##k to propose. When you're in love, everything is simple!")
elif sel == 1:
    sm.sendNext("You can enter a name when you double-click on #b#t5250500##k. You must be facing your fiance-to-be in #bthe House Wedding Hall#k. Trust me, it's more romantic when they actually see you proposing.")
    sm.sendPrev("When your lover accepts the proposal, you'll be teleported to a small wedding hall. Don't forget to contact your wedding guests before the proposal so they get to be a part of your special day! I'm already contacting all my friends in anticipation.")
elif sel == 2:
    sm.sendNext("A wedding arch will go up for the bride and groom in the House Wedding Hall after a succesful proposal.\r\nWedding guest can join the wedding by #bdouble-clicking on the wedding arch's name#k.")
    sm.sendSay("#bUp to 6#k guests may enter the Wedding Hall, and no one may exit #buntil the wedding is over#k. Who would ever want to leave a wedding anyway?")
    sm.sendPrev("The bride, groom, and guests will all receive a #bspecial buff#k when the wedding is over. #bOne lucky person#k, overwhelmed by the power of love, will receive an #bespecially potent buff#k! I'm always a little overwhelmed at the weddings I attend.")