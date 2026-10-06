# [Legion] Artifact of Mysterious Power
NPC = 9010106

sm.setSpeakerID(NPC)
sm.setBoxChat()

sm.sendNext("#face0##b#h0##k! Bạn đến rồi.\r\nTôi vừa tìm thấy một #eArtifact#n mang #rnguồn sức mạnh bí ẩn#k, và nó phản ứng rất mạnh với bạn.")
sm.sendNext("#face0#Artifact này có thể #elưu giữ dấu ấn phiêu lưu#n của bạn.\r\nMỗi nhiệm vụ, mỗi chiến thắng… tất cả sẽ biến thành sức mạnh giúp #bLegion#k của bạn lớn mạnh hơn.")
sm.sendNext("#face0#Hãy mang theo Artifact và tiếp tục hành trình.\r\nKhi sức mạnh tích lũy, bạn sẽ mở khóa thêm hiệu ứng mới.")
sm.sendNext("#face0#Được rồi, tôi đã ghi nhận việc này.\r\nGiờ hãy đi và chứng minh sức mạnh của bạn.")
sm.completeQuest(parentID)
chr.initUnionArtifact()