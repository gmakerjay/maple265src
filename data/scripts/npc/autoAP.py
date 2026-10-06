QUEST_ID = 25995

if not chr.hasQuest(QUEST_ID):
    chr.setQRValueByKey(QUEST_ID, "instantap", "0")
if chr.getQRValueByKey(QUEST_ID, "instantap") == "0":
    if sm.sendAskYesNo("Would you like to enable the instant AP auto-assignment option upon leveling up? This option will automatically allocate AP based on your current job every time you level up or advance your job.\r\n\r\n#r#eFor Xenon, AP will be allocated to your highest stat.#k"):
        chr.setQRValueByKey(QUEST_ID, "instantap", "1")
        sm.sendSayOkay("Instant AP auto-allocation has been #benabled#k.")
else:
    chr.setQRValueByKey(QUEST_ID, "instantap", "0")
    sm.sendSayOkay("Instant AP auto-allocation has been #rdisabled#k.")