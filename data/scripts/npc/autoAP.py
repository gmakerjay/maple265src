QUEST_ID = 25995

if not chr.hasQuest(QUEST_ID):
    chr.setQRValueByKey(QUEST_ID, "instantap", "0")
if chr.getQRValueByKey(QUEST_ID, "instantap") == "0":
    if sm.sendAskYesNo("Bạn có muốn bật tùy chọn phân bổ AP tức thì khi lên cấp không? Tùy chọn này sẽ tự động phân bổ AP, dựa trên nghề nghiệp hiện tại của bạn, mỗi khi lên cấp và thăng tiến nghề nghiệp.\r\n\r\n#r#eĐối với Xenon, AP sẽ được phân bổ cho chỉ số cao nhất.#k"):
        chr.setQRValueByKey(QUEST_ID, "instantap", "1")
else:
    chr.setQRValueByKey(QUEST_ID, "instantap", "0")