# hontale_out - Root Crystal (Horntail's Cave Exit)
from net.swordie.ms.constants import BossConstants

dialog = "#e[Horntail's Cave Exit]#n\r\n\r\n"
dialog += "Do you want to leave Horntail's Cave and return to the entrance?\r\n"
dialog += "(ต้องการออกจากห้องบอส Horntail เพื่อกลับสู่ทางเข้าถ้ำหรือไม่?)\r\n\r\n"
dialog += "#r* Any uncollected items on the ground will be lost.#k"

if sm.sendAskYesNo(dialog):
    sm.warpInstanceOut(chr, BossConstants.HORNTAIL_ENTRANCE_MAP)
