# [Tera Blink] Learn
from net.swordie.ms.scripts import ScriptType

SPIEGELMANN = 9063173

def start():
    sm.setSpeakerID(SPIEGELMANN)
    sel = sm.sendNext("#b#eBạn có câu hỏi nào về <Tera Blink>#k#n không?\r\n#L1##bHãy kể cho tôi nghe về #e<Tera Blink>#n.#k#l\r\n#L2##bHãy kể cho tôi nghe về #e<Thế giới bên trong chiếc mũ>#n.#k#l\r\n#L3#Hãy kể cho tôi nghe về #b#esự kiện Tera Blink#n.#k#l\r\n#L99#Tôi không còn câu hỏi nào nữa.#l")
    if sel == 1:
        sm.sendNext("#bTera Blink#k là một #bsự kiện#k được chuẩn bị dành cho những chiến binh mới gia nhập Maple World.")
        sm.sendNext("Bạn sẽ có những trải nghiệm đa dạng và sự phát triển nhanh chóng thông qua các nhiệm vụ có thể hoàn thành trong trò chơi, bao gồm cả các tính năng mới.")
        sm.sendNext("Chưa hết đâu! Khi bạn hoàn thành tất cả các nhiệm vụ trong chiếc mũ, tôi sẽ tặng bạn\r\n#i3019187:# #b#e#t3019187:##n#k và\r\n#i5010321:# #b#e#t5010321:##n#k.")
        start()
    elif sel == 2:
        sm.sendNext("#bThế Giới Trong Chiếc Mũ#k là một thế giới tồn tại hoàn toàn bên trong chiếc mũ này! Nó có rất nhiều tính năng mới.")
        sm.sendNext("Trong #bThế Giới Trong Chiếc Mũ#k, bạn có thể thực hiện các loại nhiệm vụ #bTẤT CẢ#k.")
        sm.sendNext("Bằng cách hoàn thành nhiệm vụ, bạn có thể nhận được một lượng EXP khổng lồ, cũng như một số kiến thức cần thiết để thành công trong Maple World.")
        sm.sendNext("Bạn có thể du hành đến Thế giới Bên trong Chiếc Mũ bằng cách nói chuyện với tôi ở #bHenesys#k hoặc #bNameless Town#k.")
        sm.sendNext("Vậy bạn có muốn cùng tôi khám phá chiếc mũ không?")
        start()
    elif sel == 3:
        sm.sendNext("Bạn có thể kiểm tra chức năng của chiếc mũ cho đến khi sự kiện #bHYPER BURNING MAX#k..kết thúc!....\r\n\r\n#r#e[Thời gian Sự kiện]#n..\r\n- Cho đến 23:59 ngày 31/12/2026 (Thứ Năm)")
        start()
start()
