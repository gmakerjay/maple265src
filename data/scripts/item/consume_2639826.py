# VIP Booster
sm.setSpeakerID(9010000)
sm.flipDialogue()

QUEST_ID = 101717
MAX_USE = 10
count = 0

if chr.hasQuest(QUEST_ID):
    val = sm.getQRValueByKey(QUEST_ID, "useCount")
    if val is not None:
        count = int(val)

# vượt quá giới hạn
if count >= MAX_USE:
    sm.sendSay("Hôm nay bạn đã sử dụng hết số lần VIP Booster.")
    chr.dispose()

response = sm.sendAskYesNo(
    "Sử dụng #r#eVIP Booster#n#k?\r\n"
    "Vật phẩm sẽ triệu hồi thêm quái vật, mang lại\r\n"
    "một lượng EXP #bcực lớn#k trong #b#e100 giây.#n#k\r\n\r\n"
    "#eSố lần sử dụng hôm nay: #r" + str(count) + "#k/10 lần#n\r\n\r\n"
    "#e<Không hoạt động trong:>\r\n"
    "1. Thị trấn hoặc bản đồ không có quái vật gần với cấp độ của bạn.\r\n"
    "2. Khi bạn đã có VIP Booster đang hoạt động.\r\n"
    "3. Khi người chơi khác đang sử dụng VIP Booster hoặc HEXA Booster.\r\n"
    "4. Khi đã vượt quá giới hạn sử dụng trong ngày.\r\n\r\n"
    "#r* Có thể sử dụng trong bản đồ instanced ngay cả khi\r\n"
    "người chơi khác đang dùng HEXA Booster hoặc VIP Booster.#k"
)

if response:
    sm.startFieldBooster(parentID)