# id 37176 ([Elodin] Another Chance!), field 101084400
sm.setSpeakerID(1501004) # Shimmer Songbird
sm.setParam(4)
sm.setSpeakerID(1501015) # Shimmer Songbird
sm.sendNext("Bạn có thể mang cho tôi thêm #i4036506# và #i4036507# không?")
sm.sendSay("Vui lòng đổ đầy Chai Nhỏ này với #r21 #i4036506##k và tìm #r10 #i4036507##k. Như vậy là đủ rồi.")
sm.sendSay("Chai này sẽ tự động đầy mỗi khi bạn lấy được #i4036506#, vì vậy bạn sẽ không phải tự mình lấy nữa.")
sm.setParam(2)
sm.sendSay("Điều đó sẽ hữu ích hơn nếu làm sớm hơn...")
sm.setParam(4)
sm.sendSay("...")
sm.sendSay("À, lúc nãy tôi không biết anh lại là một kẻ hay than vãn như vậy. Chắc tôi sẽ không đưa cho anh chai này nữa.")
sm.setParam(2)
sm.sendSay("Không! Quên mất tôi đã nói thế! Tôi thích chạy việc vặt cho anh lắm!")
sm.setParam(4)
sm.setSpeakerID(1501010) # Baby Bird
sm.sendSay("Ồ! Thêm nước và hoa nữa! Tôi không thể chờ đợi được nữa!")
sm.setParam(2)
if sm.sendAskYesNo("Tuyệt vời..."):
    sm.startQuest(parentID)
    sm.setParam(4)
    sm.setSpeakerID(1501015) # Shimmer Songbird
    sm.sendNext("Bạn nghĩ thế đã đủ chưa?")
    sm.setParam(2)
    sm.sendSay("Cầu mong điều tốt đẹp.")
    sm.setParam(4)
    sm.sendSay("Chúc may mắn.")
    sm.giveItem(4220198)
else:
    sm.sendSayOkay("Bạn không có đủ ô chứa ở tab khác.")
