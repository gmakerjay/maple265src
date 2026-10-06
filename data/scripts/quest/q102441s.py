# [Tera Blink] Equip Your Way to Victory!
SPIEGELMANN = 9063175

sm.removeBlowWeather()
sm.openUI(1561)
sm.setSpeakerID(SPIEGELMANN)
sm.setBoxChat()
if sm.sendAskYesNo("#face0# Trước khi bắt đầu, bạn có muốn xem hướng dẫn nhiệm vụ mà tôi đã chuẩn bị cho bạn không?\r\nNếu bạn chọn #b#eKHÔNG#k#n, bạn sẽ tiến hành nhiệm vụ ngay lập tức!"):
    if sm.getEmptyInventorySlots(1) >= 1:
        sm.setSpeakerID(SPIEGELMANN)
        sm.setBoxChat()
        sm.sendNext("#face0# Sao cậu lại...? Thôi kệ, tớ có cả triệu cái như thế này. Tặng cậu một cái vòng cổ nữa nhé.")
        sm.giveItem(1122444, 1)
        sm.gainQuestItem(1122444, 1)
        sm.createQuestWithQRValue(102441, "ruc=3")
        sm.setSpeakerID(SPIEGELMANN)
        sm.setBoxChat()
        sm.sendNext("#face0# Tôi đã tái sản xuất mẫu dây chuyền #bSpiegelmann's Ordinary Necklace#k. Hãy kiểm tra kho hàng của bạn.")
        sm.completeQuest(parentID)
    else:
        sm.systemMessage("Kiểm tra xem túi EQUIP có đủ ô chứa chưa bạn ơi")