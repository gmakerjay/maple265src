# [Tera Blink] Enter the World Inside the Hat
SPIEGELMANN = 9063173
MAP = 993236800

sm.setSpeakerID(SPIEGELMANN)
if sm.hasQuestCompleted(102448) or chr.getLevel() >= 200:
    sm.sendNext("Bạn đã hoàn thành chuỗi nhiệm vụ Tera Blink rồi, hãy tiếp tục khám phá thế giới MapleStory nhé.")
else:
    sm.sendNext("Ồ! Không thể bỏ qua chiếc mũ này được, phải không?...Hehehe...")
    if sm.sendAskAccept("Hãy nhìn kỹ hơn vào bên trong chiếc mũ này!\r\n#r* Bạn sẽ được chuyển đến bản đồ khác nếu chấp nhận.#k"):
        sm.teraBlinkEff(0, "Etc/MinigameClient.img/teraBlink/FadeOut", "", 10, 25)
        sm.teraBlinkWarp(0, "WarpDrive", 1080, 0, 0, 50, 50, 35, 20)
        sm.teraBlinkWarp(0, "WarpDrive", 1080, 0, 0, 50, 50, 35, 20)
        sm.teraBlinkEff(1, "Etc/MinigameClient.img/teraBlink/FadeIn", "", 10, 25)
        sm.teraBlinkWarp(1, "WarpDrive", 480, 0, 0, 50, 50, 35, 20)
        sm.createQuestWithQRValue(102425, "rMap=100000000;start=1;dialog=1;npc=0;start1=1")
        sm.warpInstanceIn(chr, MAP, False)
        sm.setInstanceTime(1800, 100000000)
