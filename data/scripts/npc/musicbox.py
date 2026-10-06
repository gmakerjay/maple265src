bgms = ["BgmEvent2.img/risingStar", "Bgm01.img/MoonlightShadow", "Bgm02.img/WhenTheMorningComes", "Bgm06.img/FlyingInABlueDream", "Bgm07.img/Fantasia", "Bgm09.img/FairyTalediffvers", "Bgm13.img/Minar'sDream", "Bgm15.img/ElinForest", "Bgm16.img/TimeTemple", "Bgm18.img/QueensGarden"]

sel = sm.sendNext("A beautiful, flower-shaped Orgel manufactured in Elluel. You can play a variety of music with this Orgel.\r\nNote: To fully appreciate the wonders this music has to offer, you will need your SFX Sound Option enabled.\r\n#b#L0#RisingStar#l\r\n#L1#MoonlightShadow#l\r\n#L2#When The Morning Comes#l\r\n#L3#Flying In A Blue Dream#l\r\n#L4#Fantasia#l\r\n#L5#FairyTalediffvers#l\r\n#L6#Minar'sDream#l\r\n#L7#ElinForest#l\r\n#L8#TimeTemple#l\r\n#L9#QueensGarden#l")

if sel <= 9 and sel >= 0:
    sm.changeBGM(bgms[sel], 0, 0)