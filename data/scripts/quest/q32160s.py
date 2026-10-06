# [Riena Strait] Get it Strait

mapid = 140000000

sm.setSpeakerID(1105012)
if chr.getFieldID() != mapid:
    sm.sendNext("Có một sự thay đổi trong môi trường ở đây, tại Rien, nơi bị bao phủ bởi sông băng. Dường như có chuyện bất thường đang xảy ra.\r\n\r\n#b(#eChuỗi nhiệm vụ: #rVùng Biển Riena#n#k #blà một chuỗi nhiệm vụ đặc biệt. Đối với cấp độ lên đến#k #rcấp độ 59#k#b, quái vật và kinh nghiệm của các nhiệm vụ sẽ được điều chỉnh phù hợp với cấp độ của bạn.)#k")
    sm.sendSay("....")
    if sm.sendAskYesNo("Bạn biết điều tôi đang nghĩ đến bây giờ rồi đấy. Tôi cần sự giúp đỡ của bạn cho việc này. Bạn có thể đến gặp tôi ở đây không?\r\n\r\n#b#e(Nếu bạn chấp nhận, bạn sẽ tự động được chuyển đến Rien.)#n#k"):
        sm.sendNext("Tôi sẽ gặp bạn tại Rien.")
        sm.startQuest(32160)
        sm.warp(mapid, 0)
else:
    sm.sendNext("Có một sự thay đổi trong môi trường ở đây, tại Rien, nơi bị bao phủ bởi sông băng. Dường như có chuyện bất thường đang xảy ra.\r\n\r\n#b(#eChuỗi nhiệm vụ: #rVùng Biển Riena#n#k #blà một chuỗi nhiệm vụ đặc biệt. Đối với cấp độ lên đến#k #rcấp độ 59#k#b, quái vật và kinh nghiệm của các nhiệm vụ sẽ được điều chỉnh phù hợp với cấp độ của bạn.)#k")
    sm.startQuest(32160)
