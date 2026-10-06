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
sel = sm.sendNext("Xin chào Hãy làm ấm cơ thể của bạn tại Luxe Sauna\r\n\r\n"
                      "#eThời gian sử dụng có thể nạp trong tuần này: #b" + str(maxIncCountWeek) + "/48#k#n\r\n\r\n"
                      "#eThời gian sử dụng Luxe Sauna: #b" + str(hours) + " giờ " + str(minutes) + " phút " + str(seconds) + " giây #n#k\r\n\r\n"
                      "#L1##bTôi muốn nạp #e<Luxe Sauna Time>#n.#k#l\r\n\r\n"
                      "#L2##bHãy cho tôi biết về #e<Luxe Sauna>#n.#k#l\r\n"
                      "#L3##bTôi muốn vào #e<Luxe Sauna>#n.#k#l\r\n"
                      "#L4##bHãy cho tôi biết về #eThời gian diễn ra sự kiện#n.#k#l")
if sel == 1:
    num = sm.sendAskNumber("Vui lòng nhập #bthời gian sử dụng Luxe Sauna#k mà bạn muốn nạp.\r\n"
                    "#b#eCó thể nạp tối đa 48 giờ#n.#k\r\n\r\n"
                    "#eMaple Points cần để nạp 1 giờ:#n #e#r3,000#k#n\r\n"
                    "#eMaple Points hiện có: #n#e#b"+str(maplepoints)+"#k#n\r\n\r\n"
                    "#r* Bạn có thể nạp tối đa 48 giờ thời gian sử dụng Luxe Sauna\r\n"
                    "mỗi tuần bằng Maple Points.\r\n"
                    "#r* Thời gian sử dụng Luxe Sauna đã nạp được dùng chung cho tất cả nhân vật trong tài khoản.#k", 1, 1, 48)
    reqAmount = num * 3000
    if reqAmount > maplepoints:
        sm.sendNext("Bạn không đủ Maple Points để nạp thời gian Luxe Sauna.")
    elif maxIncCountWeek >= 48 or (maxIncCountWeek + num) > 48:
        sm.sendNext("Bạn không thể nạp thêm thời gian Luxe Sauna")
    else:
        chr.getUser().deductMaplePoints(reqAmount)
        newTotalIncCount = totalIncCount + num * 3600
        newMaxIncCountWeek = maxIncCountWeek + num
        sm.setQRValueByKey(questID, "totalIncCount", str(newTotalIncCount))
        sm.setQRValueByKey(questID, "maxIncCountWeek", str(newMaxIncCountWeek))
        sm.setQRValueByKey(questID, "lastWeek", str(currentWeekNum))
        sm.sendNext("Bạn đã nạp thêm " + str(num) + " giờ cho Luxe Sauna")
elif sel == 2:
    sm.sendNext("Xin chào, chào mừng bạn đến với Luxe Sauna.\r\n"
                    "Khi ở trong Phòng Luxe Sauna, bạn sẽ nhận được #bEXP dựa trên cấp độ của mình mỗi 5 giây#k.\r\n\r\n"
                    "#r* EXP chỉ có thể nhận được bởi nhân vật\r\n"
                    "từ Lv. 101–300,\r\n"
                    "hoặc nhân vật Zero đã hoàn thành Nhiệm vụ Cốt truyện Chương 2.")
    sm.sendNext("Nếu bạn muốn sử dụng Luxe Sauna, bạn có thể dùng #r3,000 Maple Points#k "
                    "để sử dụng Luxe Sauna trong 1 giờ.\r\n\r\n"
                    "#r* Thời gian sử dụng Luxe Sauna được dùng chung cho tất cả nhân vật trong tài khoản.\r\n"
                    "* Bạn có thể nạp tối đa 48 giờ thời gian sử dụng Luxe Sauna mỗi tuần bằng Maple Points.")
    sm.sendNext("Ngoài ra, bạn có thể sử dụng #i2638457:# #b#t2638457:##k,\r\n"
                    "để nạp thêm 30 phút thời gian sử dụng.\r\n\r\n"
                    "Tuy nhiên, hãy lưu ý rằng bạn sẽ không thể vào khi sự kiện kết thúc,\r\n"
                    "kể cả khi vẫn còn thời gian sử dụng.\r\n\r\n"
                    "#r#e[Thời gian sự kiện]#n\r\n"
                    " - Đến hết 23:59 (UTC+7) Thứ Năm, ngày 31/12/2026#k")
elif sel == 3:
    if sm.sendAskYesNo("Bạn có muốn chuyển đến Luxe Sauna ngay bây giờ không?"):
        totalIncCount = int(sm.getQRValueByKey(questID, "totalIncCount")) # sec
        if totalIncCount < 0:
            sm.sendNext("Vui lòng nạp thêm thời gian nhé.")
        elif chr.getFieldID() == 993263300 or chr.getInstance() is not None:
            sm.sendNext("Bạn không thể vào Luxe Sauna ở tình hình hiện tại.")
        else:
            sm.setQRValueByKey(518, "visit", "1")
            sm.warp(993263300)
elif sel == 4:
    sm.sendNext("#r#e[Thời gian sự kiện]#n\r\n"
                    " - Đến hết 23:59 (UTC+7) Thứ Năm, ngày 31/12/2026#k")
