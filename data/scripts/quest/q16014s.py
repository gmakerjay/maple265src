from net.swordie.ms.constants import QuestConstants

DAME = 9010106
sm.setSpeakerID(DAME)
sm.flipDialogue()
if not sm.hasQuest(QuestConstants.UNION_START_QUEST) and not sm.hasQuestCompleted(QuestConstants.UNION_START_QUEST):
    if sm.getUnionLevel() < 500 or sm.getUnionCharacterCount() < 3:
        sm.sendSayOkay("Bạn chưa sẵn sàng tham gia Legion, chiến binh. Legion chỉ dành cho những chiến binh dày dạn kinh nghiệm với "
                       "#b#eTổng cấp độ#n ít nhất 500#k, và yêu cầu #r#etối thiểu 3 nhân vật#n#k.\r\n\r\n#eTổng cấp độ là gì?#n\r\n"
                       "#bTổng cấp độ là tổng level của tất cả nhân vật trong cùng thế giới "
                       "#rđạt Lv. 60+ và đã hoàn thành Chuyển Chức lần 2#k. Nếu bạn có từ 40 nhân vật trở lên, "
                       "chỉ #r40 nhân vật có level cao nhất#k được tính. Tuy nhiên, #rZero#k là trường hợp đặc biệt. "
                       "Chỉ Zero có level cao nhất của bạn sẽ được tính.")
    else:
        sm.createQuestWithQRValue(QuestConstants.UNION_QUEST,
                                 "q0=1q1=0pq=0q2=0q1Date=" + sm.getCurrentDateAsString()
                                 + "pqDate=" + sm.getCurrentDateAsString()
                                 + "q2Date=" + sm.getCurrentDateAsString())  # Quest Legion

        rank = chr.getUnion().getUnionRank()
        if rank == 0:
            rank = 101
        sm.createQuestWithQRValue(QuestConstants.UNION_RANK, "rank=" + str(rank))  # Rank Legion
        sm.completeQuestNoRewards(QuestConstants.UNION_START_QUEST)

        sm.sendNext("Xin chào #b#h0##k. Rất vui được gặp lại bạn.")
        sm.setPlayerAsSpeaker()
        sm.sendSay("Chúng ta đã gặp nhau chưa nhỉ?")
        sm.setSpeakerID(DAME)
        sm.sendSay("Ta-da! Là tôi đây, #b#eCô Thu Hồi!#n#k Ngạc nhiên chưa? Chán ngấy cảnh giấy tờ công việc mỗi ngày, "
                   "tôi đã dành thời gian rảnh để tập luyện cơ bắp và săn rồng. Và giờ tôi đã được Nữ Hoàng Cygnus phong tước hiệp sĩ rồi!")
        sm.sendSay("Trong một thời gian, tôi đã ghép các Mapler vào đủ loại #bcông việc bán thời gian#k để giúp họ rèn luyện "
                   "bản thân và lên cấp.\r\n\r\nKhởi đầu cũng ổn, nhưng hệ thống đó không hoạt động như tôi mong đợi. "
                   "Quá nhiều thủ tục rườm rà.")
        sm.sendSay("#b#eNhưng giờ, TÔI là người phụ trách.#n#k Wahahaha!\r\nVà hệ thống mới tôi phát triển tốt hơn "
                   "gấp trăm lần, phần thưởng cũng ngon hơn! Muốn nghe không?")
        sm.sendSay("Vài tháng trước, tôi có chuyến nghỉ phép đầu tiên sau nhiều năm. Nhưng tàu du lịch của chúng tôi mắc "
                   "cạn trên một #bhòn đảo chưa được khám phá#k đầy #rnhững con rồng đáng sợ#k.\r\nSau khi thuyền trưởng "
                   "và thủy thủ bị kéo vào rừng rồi ăn thịt, hành khách chúng tôi nhận ra chỉ có một cách để sống sót...")
        sm.sendSay("Chúng tôi cầm bất cứ vũ khí nào có thể tìm thấy. Nồi niêu, dao, thậm chí cả thanh đại kiếm trong "
                   "hành lý ai đó. Khi lũ rồng quay lại bắt chúng tôi, tất cả cùng lao lên và đánh chúng đến chết!")
        sm.sendSay("Tối hôm đó chúng tôi ăn no. Ngồi quanh đống lửa nhớ về những người đã mất, tôi chợt ngộ ra.\r\n\r\n"
                   "Trong số chúng tôi có người là chiến binh lão luyện, nhưng cũng nhiều người chỉ là khách du lịch yếu ớt. "
                   "Chúng tôi sống sót được là vì đã đoàn kết.")
        sm.sendSay("Lúc đó tôi nhận ra điểm sai cốt lõi của hệ thống công việc bán thời gian.")
        sm.sendSay("Một mình thì chẳng làm nên chuyện. Nhưng làm việc theo nhóm, điểm mạnh người này bù điểm yếu người kia.\r\n\r\n"
                   "#bKhi mọi người cùng hợp sức#k, ngay cả khách du lịch bụng bia cũng có thể hạ gục rồng khổng lồ.")
        sm.sendSay("Sau vài tháng trên đảo, chúng tôi thuần hóa đủ rồng để đưa những người còn sống bay về đất liền. "
                   "Khi trở lại văn minh, tôi biết mình phải làm gì.\r\n\r\nĐầu tiên, tôi bảo sếp biến đi rồi nghỉ việc. "
                   "Sau đó, tôi bắt đầu #bdự án vĩ đại mới#k.")
        sm.sendSay("Và dự án đó chính là #b#eHệ Thống Legion!#n#k Tôi sẽ giúp những Mapler yếu ớt đạt đến tiềm năng "
                   "thực sự bằng cách ghép họ với những chiến binh khác!\r\n\r\nKết quả? Ai cũng khỏe như tôi và lên cấp nhanh hơn!")
        sm.sendSay("#h0#! Bạn có muốn xây dựng một #bLegion#k gồm những chiến hữu cơ bắp để đấm rồng và mở khóa "
                   "chỉ số không?\r\nNếu quan tâm hoặc có câu hỏi, hãy nói chuyện với tôi hoặc cận vệ của tôi, "
                   "Pancho Sanza.")
        sm.progressMessageFont(3, 20, 20, 0, "Giờ bạn có thể quản lý Legion từ Menu.")

else:
    if sm.getUnionLevel() < 500 or sm.getUnionCharacterCount() < 3 or sm.getUnionRank() == 0:
        sm.sendSayOkay("Bạn chưa sẵn sàng tham gia Legion, chiến binh. Legion chỉ dành cho những chiến binh dày dạn "
                       "kinh nghiệm với #b#eTổng cấp độ#n ít nhất 500#k, và yêu cầu #r#etối thiểu 3 nhân vật#n#k.\r\n\r\n"
                       "#eTổng cấp độ là gì?#n\r\n#bTổng cấp độ là tổng level của các nhân vật "
                       "#rLv. 60+ và đã hoàn thành Chuyển Chức lần 2#k trong cùng thế giới. Nếu có hơn 40 nhân vật, "
                       "chỉ tính #r40 nhân vật level cao nhất#k. #rZero#k là trường hợp đặc biệt, "
                       "chỉ tính Zero có level cao nhất.")
    else:
        nSel = sm.sendSay("Hôm nay là ngày đẹp để diệt rồng!\r\nBạn đến vì #e#bLegion#k#n phải không?\r\n"
                          "#L0##b1. Thông tin Legion của tôi#l\r\n"
                          "#L1##b2. Tăng hạng Legion#l\r\n"
                          "#L2##b3. Giới thiệu Legion#k#l\r\n"
                          "#L3##b4. Xếp hạng Coin tuần#k#l")

        if nSel == 0:
            sm.sendSayOkay("Đây là tình trạng #eLegion#n của bạn.\r\n\r\n"
                           "#eBậc Legion:#n #b#e" + str(sm.getUnionRankName())
                           + "#n#k\r\n#eTổng cấp độ Legion:#n #b#e" + str(sm.getUnionLevel())
                           + "#n#k\r\n#eNhân vật đủ điều kiện:#n #b#e"
                           + str(sm.getUnionCharacterCount())
                           + "#n#k\r\n#eThành viên đang xếp:#n #b#e"
                           + str(sm.getUnionAssignedCharacterCount()) + " / "
                           + str(sm.getUnionAssignedMaxCharacterCount())
                           + "#n#k")

        elif nSel == 1:
            rank = chr.getUnion().getUnionRank()
            if rank == 405:
                sm.sendSayOkay("Bạn đã đạt hạng Legion tối đa.")
            elif sm.sendAskYesNo("Bạn muốn #enâng Legion lên hạng tiếp theo#n?\r\n\r\n"
                                 "#eHạng hiện tại:#n #b#e" + str(sm.getUnionRankName())
                                 + "#n#k\r\n#eHạng tiếp theo:#n #b#e"
                                 + str(sm.getUnionNextRankName())
                                 + "#n#k\r\n#eSố thành viên tối đa sau khi nâng:#n #b#e"
                                 + str(sm.getUnionAssignedMaxCharacterCount()) + " lên "
                                 + str(sm.getUnionAssignedNextMaxCharacterCount())
                                 + "#n#k\r\n\r\n#eYêu cầu:#n\r\n\r\n"
                                 "#eTổng cấp độ: #r#e" + str(sm.getUnionLevelReq())
                                 + "#n#k\r\n#eCoin cần: #b#e#t4310229# x "
                                 + str(sm.getUnionCoinReq())
                                 + "#n#k\r\n\r\n#eBạn có muốn nâng hạng không?#n"):
                if sm.getQuantityOfItem(4310229) < sm.getUnionCoinReq():
                    sm.sendSayOkay("Bạn cần thêm #rLegion Coin#k để nâng hạng.\r\n\r\n"
                                   "#eCoin hiện có:#n #r"
                                   + str(sm.getQuantityOfItem(4310229))
                                   + "#k\r\n#eCoin cần:#n #b"
                                   + str(sm.getUnionCoinReq()) + "#k")
                elif sm.getUnionLevel() < sm.getUnionLevelReq():
                    sm.sendSayOkay("Tổng cấp độ của bạn chưa đủ.\r\n\r\n"
                                   "#eHiện tại:#n #r"
                                   + str(sm.getUnionLevel())
                                   + "#k\r\n#eYêu cầu:#n #b"
                                   + str(sm.getUnionLevelReq()) + "#k")
                else:
                    if sm.hasItem(4310229, sm.getUnionCoinReq()):
                        sm.consumeItem(4310229, sm.getUnionCoinReq())
                        sm.addUnionCoin(-sm.getUnionCoinReq())
                        sm.incrementUnionRank()
                        sm.sendSayOkay("(Vỗ tay nhiệt liệt)\r\n#eLegion của bạn đã thăng hạng#n!\r\n\r\n"
                                       "#eHạng mới:#n #b#e"
                                       + str(sm.getUnionNextRankName())
                                       + "#n#k\r\n#eThành viên tối đa:#n #b#e"
                                       + str(sm.getUnionAssignedMaxCharacterCount())
                                       + "#n#k\r\n\r\nHãy tiếp tục cố gắng!")
                    else:
                        sm.sendSayOkay("Đã xảy ra lỗi, vui lòng thử lại.")
            else:
                sm.sendSayOkay("Khi nào muốn nâng hạng Legion thì quay lại gặp tôi.")

        elif nSel == 2:
            sm.sendSayOkay("Hệ thống Legion cho phép bạn dùng tất cả nhân vật đủ điều kiện "
                           "trong cùng thế giới để tạo thành một đội.\r\n\r\n"
                           "Xếp nhân vật lên bảng Legion để nhận bonus chỉ số, "
                           "tham gia Legion Raid và kiếm Legion Coin.")

        elif nSel == 3:
            sm.sendSayOkay("Hãy quay lại sau...")