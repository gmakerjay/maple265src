# Explorer Job Advancement Map
# Auto-pick Explorer 4th job NPC by job + gender

explorer_npc = {
    112: (1541035, 1541037),  # Hero
    122: (1541036, 1541038),  # Paladin
    132: (1541039, 1541040),  # Dark Knight
    212: (1541041, 1541042),  # Arch Mage FP
    222: (1541043, 1541044),  # Arch Mage IL
    232: (1541045, 1541046),  # Bishop
    312: (1541047, 1541048),  # Bowmaster
    322: (1541049, 1541050),  # Marksman
    412: (1541051, 1541052),  # Night Lord
    422: (1541053, 1541054),  # Shadower
    434: (1541059, 1541060),  # Dual Blade
    512: (1541055, 1541056),  # Buccaneer
    522: (1541057, 1541058),  # Corsair
    532: (1541061, 1541062),  # Cannoneer
}

job = chr.getJob()
gender = chr.getAvatarData().getCharacterStat().getGender()  # 0 male, 1 female

NPC = explorer_npc.get(job, (1541035, 1541035))[gender]
BOT = 1541063

def talk():
    sel = sm.sendNext("#face0##fc0xFFbfbfbf#(Tôi nên hỏi gì?)#k\r\n#b#L0#(Hỏi về giọng nói.)#l\r\n#L1#(Hỏi về sức mạnh.)#l\r\n#L2#(Hỏi về số phận.)#l")
    if sel == 0:
        sm.setSpeakerID(BOT)
        sm.setBoxChat()
        sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/16", 100)
        sm.sendNext("#face0#Tôi là một người đàn ông, người đã hiến dâng trái tim mình để dẹp yên sự hỗn loạn của thời đại, theo ý muốn của Nữ thần. Tôi tự hỏi liệu lịch sử có còn nhớ đến tôi không.")
        sm.setSpeakerID(NPC)
        sm.setBoxChat()
        sm.sendNext("#face0#Bạn có phải là nhà thám hiểm huyền thoại đó không?")
        sm.setSpeakerID(BOT)
        sm.setBoxChat()
        sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/17", 100)
        sm.sendNext("#face0#Một nhà thám hiểm huyền thoại... Giờ họ gọi tôi là vậy sao?")
        sm.setSpeakerID(BOT)
        sm.setBoxChat()
        sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/18", 100)
        sm.sendNext("#face0#Tôi sinh ra như một đứa trẻ bình thường. Tôi mồ côi, nhưng tôi không cô đơn.")
        sm.setSpeakerID(BOT)
        sm.setBoxChat()
        sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/19", 100)
        sm.sendNext("#face0##b#h0##k luôn ở bên cạnh tôi.")
        sm.setSpeakerID(BOT)
        sm.setBoxChat()
        sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/20", 100)
        sm.sendNext("#face0#Cuối cùng, tôi cũng nhận ra cô ấy là ai. Nhưng dù chúng tôi có thích thú khi ở bên nhau đến thế nào, cô ấy dường như luôn buồn bã, bị dày vò bởi cảm giác tội lỗi.")
        sm.setSpeakerID(BOT)
        sm.setBoxChat()
        sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/21", 100)
        sm.sendNext("#face0#Cô ấy đã tạo ra tôi để cứu thế giới...\r\nvà cô ấy sẽ phải chứng kiến tôi chết để làm điều đó.\r\n#bTrong số phận bi thảm ấy, chúng tôi đều gắn bó với nhau#k.")
        talk()
    elif sel == 1:
        sm.setSpeakerID(BOT)
        sm.setBoxChat()
        sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/22", 100)
        sm.sendNext("#face0#Sức mạnh của bạn bắt nguồn từ sức mạnh của tôi, cũng như nó đến với những người đàn ông và phụ nữ #bmong muốn một thế giới an toàn, ổn định#k và có tấm lòng để hiện thực hóa điều đó.")
        sm.setSpeakerID(BOT)
        sm.setBoxChat()
        sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/23", 100)
        sm.sendNext("#face0#Sức mạnh đó cũng đang tác động vào cuộc sống của bạn.")
        sm.setSpeakerID(BOT)
        sm.setBoxChat()
        sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/24", 100)
        sm.sendNext("#face0#Đá phong ấn… Tôi không quen với thứ như vậy. Nhưng chắc chắn bạn đang mang trong mình sức mạnh.")
        talk()
    elif sel == 2:
        sm.setSpeakerID(BOT)
        sm.setBoxChat()
        sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/25", 100)
        sm.sendNext("#face0#Bạn là người thừa kế vận mệnh của tôi.\r\nHãy để lòng tốt của bạn soi sáng con đường.")
        sm.setSpeakerID(NPC)
        sm.setBoxChat()
        sm.sendNext("#face0# Liệu số phận của tôi là đánh bại Pháp sư Hắc ám?")
        sm.setSpeakerID(BOT)
        sm.setBoxChat()
        sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/26", 100)
        sm.sendNext("#face0#Nếu sự hỗn loạn trong thời đại của bạn bắt đầu từ anh ta, thì đúng vậy. Nhưng #bsố phận đó diễn ra như thế nào là tùy thuộc vào bạn#k.")
        sm.setSpeakerID(BOT)
        sm.setBoxChat()
        sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/27", 100)
        sm.sendNext("#face0#Ý chí của tôi là ý chí của bạn, nhưng sự lựa chọn của tôi không phải là sự lựa chọn của bạn.")
        sm.setSpeakerID(BOT)
        sm.setBoxChat()
        sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/28", 100)
        sm.sendNext("#face0#Tôi tin rằng tôi đã kể cho bạn tất cả những gì tôi có thể.")
        sm.sendDelay(500)
        sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/29", 100)
        sm.createFieldTextEffect("#fn������� ExtraBold##fs30#Hãy bước đi trên con đường định mệnh với sức mạnh được thức tỉnh.", 0, 4000, 4, 0, -80, 0, 4, 1, 300, 300)
        sm.sendDelay(4500)
        sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/30", 100)
        sm.createFieldTextEffect("#fn������� ExtraBold##fs30#Vì sự hỗn loạn, điều đó đã phai nhạt từ lâu.", 0, 3400, 4, 0, -80, 0, 4, 1, 300, 300)
        sm.sendDelay(3900)
        sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/31", 100)
        sm.createFieldTextEffect("#fn������� ExtraBold##fs30#...đang tụ họp trở lại.", 0, 3000, 4, 0, -80, 0, 4, 1, 300, 300)
        sm.sendDelay(3500)
        sm.completeQuest(36334)
        sm.blind(0, 0, 0, 0, 0, 1000)
        sm.hideUser(False)
        sm.unlockUI()
        sm.warpNoReturn(sm.getPreviousFieldID(), 0)

if sm.hasQuest(36334):
    sm.lockUI()
    sm.hideUser(True)
    sm.blind(1, 255, 0, 0)
    sm.sendDelay(1200)
    sm.setSpeakerID(BOT)
    sm.setBoxChat()
    sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/13", 100)
    sm.sendNext("#face0#Chiến binh trên con đường định mệnh...")
    sm.sendDelay(1200)
    sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/14", 100)
    sm.sendNext("#face0#Bạn vẫn chưa nhận ra con đường mình đang đi dẫn đến đâu sao?")
    sm.sendDelay(1200)
    sm.setSpeakerID(NPC)
    sm.setBoxChat()
    sm.sendNext("#face0#Bạn là ai?")
    sm.sendDelay(1200)
    sm.setSpeakerID(BOT)
    sm.setBoxChat()
    sm.playExclSoundWithDownBGM("Voice6.img/adventure/24/15", 100)
    sm.sendNext("#face0#Ta là ý chí của ngươi, cũng như ngươi là ý chí của ta. Ngươi đã thức tỉnh tiềm năng trọn vẹn của mình... và vì vậy, đây sẽ là cuộc gặp gỡ cuối cùng của chúng ta. Nếu có điều gì ngươi muốn biết, ta sẽ trả lời.")
    sm.setSpeakerID(NPC)
    sm.setBoxChat()
    talk()
    sm.blind(0, 0, 0, 0, 0, 1000)
    sm.hideUser(False)
    sm.unlockUI()
else:
    sm.warp(100000000)