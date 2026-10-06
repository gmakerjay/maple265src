sm.sendNext("This event has ended.")
# from net.swordie.ms.constants import EventConstants
# from java.lang import System;

# #9201290
# if chr.getUser().getAccountType().getVal() != 5:
# 	sm.sendAskAccept("Hello friends, do you want to receive daily gifts when the event April 30 - May 1 is taking place?")
# 	if sm.getEmptyInventorySlots(2) >= 1:
# 		currentTimeMillis = System.currentTimeMillis()
# 		qrValue = sm.getQRValue(300401050)
# 		if qrValue == "Quest is Null":
# 			sm.giveItem(2430016)
# 			sm.createQuestWithQRValue(300401050, "time=" + str(currentTimeMillis) + ";")
# 			chr.saveToSQL()
# 		else:
# 			oldTimeMillis = long(sm.getQRValueByKey(300401050, "time"))
# 			#sm.sendNext(str(oldTimeMillis - 86400000))
# 			if currentTimeMillis - oldTimeMillis >= 86400000:
# 				sm.giveItem(2430016)
# 				sm.createQuestWithQRValue(300401050, "time=" + str(currentTimeMillis))
# 				chr.saveToSQL()
# 			else:
# 				sm.sendSayOkay("You received your gift today!")
# 	else:
# 		sm.sendSayOkay("Please make more space in your Use inventory.")	
# #sm.dispose()