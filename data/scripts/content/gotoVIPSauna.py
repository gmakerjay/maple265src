from java.util import Calendar

maplepoints = chr.getUser().getMaplePoints()
questID = 518

if not sm.hasQuest(518):
    sm.createQuestWithQRValue(518, "totalCnt=0;totalIncCount=0;visit=0;lastWeek=0;maxIncCountWeek=0")

cal = Calendar.getInstance()
currentWeekNum = cal.get(Calendar.WEEK_OF_YEAR)

lastWeekStr = sm.getQRValueByKey(questID, "lastWeek")
lastWeek = int(lastWeekStr) if lastWeekStr and lastWeekStr != "" else 0

maxIncCountWeekStr = sm.getQRValueByKey(questID, "maxIncCountWeek")
maxIncCountWeek = int(maxIncCountWeekStr) if maxIncCountWeekStr is not None and maxIncCountWeekStr != "" else 0

# if new week -> reset weekly counter
if lastWeek < currentWeekNum:
    maxIncCountWeek = 0
    sm.setQRValueByKey(questID, "maxIncCountWeek", "0")
    sm.setQRValueByKey(questID, "lastWeek", str(currentWeekNum))
elif lastWeek == 0:
    sm.setQRValueByKey(questID, "lastWeek", str(currentWeekNum))

totalIncCountStr = sm.getQRValueByKey(questID, "totalIncCount")
totalIncCount = int(totalIncCountStr) if totalIncCountStr is not None and totalIncCountStr != "" else 0  # sec

totalCntStr = sm.getQRValueByKey(questID, "totalCnt")
totalCnt = int(totalCntStr) if totalCntStr is not None and totalCntStr != "" else 0  # sec

hours = totalCnt // 3600
minutes = (totalCnt % 3600) // 60
seconds = totalCnt % 60

sm.setSpeakerID(9063353)
sm.flipDialogue()
sel = sm.sendNext("Hello! Warm up and relax your body at Luxe Sauna.\r\n\r\n"
                      "#eRechargeable time available this week: #b" + str(maxIncCountWeek) + "/48 hours#k#n\r\n\r\n"
                      "#eCurrent Luxe Sauna time: #b" + str(hours) + "h " + str(minutes) + "m " + str(seconds) + "s #n#k\r\n\r\n"
                      "#L1##bI want to recharge #e<Luxe Sauna Time>#n.#k#l\r\n\r\n"
                      "#L2##bTell me about #e<Luxe Sauna>#n.#k#l\r\n\r\n"
                      "#L3##bI want to enter #e<Luxe Sauna>#n.#k#l\r\n\r\n"
                      "#L4##bTell me about the #eEvent Duration#n.#k#l")
if sel == 1:
    num = sm.sendAskNumber("Please enter the amount of #bLuxe Sauna time (in hours)#k you want to recharge.\r\n"
                    "#b#eMaximum rechargeable: 48 hours/week#n.#k\r\n\r\n"
                    "#eMaple Points required per 1 hour:#n #e#r3,000#k#n\r\n"
                    "#eYour current Maple Points: #n#e#b"+str(maplepoints)+"#k#n\r\n\r\n"
                    "#r* You can recharge up to 48 hours of Luxe Sauna time each week using Maple Points.\r\n"
                    "#r* Recharged Luxe Sauna time is shared across all characters in your account.#k", 1, 1, 48)
    reqAmount = num * 3000
    if reqAmount > maplepoints:
        sm.sendNext("You do not have enough Maple Points to recharge Luxe Sauna time.")
    elif maxIncCountWeek >= 48 or (maxIncCountWeek + num) > 48:
        sm.sendNext("You cannot recharge any more Luxe Sauna time this week.")
    else:
        chr.getUser().deductMaplePoints(reqAmount)
        newTotalIncCount = totalIncCount + num * 3600
        newMaxIncCountWeek = maxIncCountWeek + num
        sm.setQRValueByKey(questID, "totalIncCount", str(newTotalIncCount))
        sm.setQRValueByKey(questID, "maxIncCountWeek", str(newMaxIncCountWeek))
        sm.setQRValueByKey(questID, "lastWeek", str(currentWeekNum))
        sm.sendNext("Successfully recharged " + str(num) + " hour(s) for Luxe Sauna!")
elif sel == 2:
    sm.sendNext("Welcome to the Luxe Sauna.\r\n"
                    "While inside the Luxe Sauna Room, you will receive #bEXP based on your level every 5 seconds#k.\r\n\r\n"
                    "#r* EXP is available for characters Lv. 101–300,\r\n"
                    "or Zero characters who have completed Story Quest Chapter 2.")
    sm.sendNext("You can spend #r3,000 Maple Points#k "
                    "to recharge 1 hour of Luxe Sauna time.\r\n\r\n"
                    "#r* Recharged time is shared account-wide.\r\n"
                    "* You can recharge up to 48 hours per week with Maple Points.")
    sm.sendNext("Additionally, you can use #i2638457:# #b#t2638457:##k\r\n"
                    "to add 30 minutes of sauna time.\r\n\r\n"
                    "#r#e[Event Duration]#n\r\n"
                    " - Event is active until 23:59 (UTC+7) Thursday, 31/12/2026#k")
elif sel == 3:
    if sm.sendAskYesNo("Would you like to move to Luxe Sauna right now?"):
        totalIncCount = int(sm.getQRValueByKey(questID, "totalIncCount")) # sec
        if totalIncCount <= 0:
            sm.sendNext("You don't have enough sauna time. Please recharge first.")
        elif chr.getFieldID() == 993263300 or chr.getInstance() is not None:
            sm.sendNext("You cannot enter Luxe Sauna under current conditions.")
        else:
            sm.setQRValueByKey(518, "visit", "1")
            sm.warp(993263300)
elif sel == 4:
    sm.sendNext("#r#e[Event Duration]#n\r\n"
                    " - Event is active until 23:59 (UTC+7) Thursday, 31/12/2026#k")
