# The Great Gachapierrot

from net.swordie.ms.world.gach.result import GachaponDlgType

answer = sm.sendNext("Welcome to the Great Gachapierrot! What kind of ticket would you like to use?\r\n#b#L0#Use Regular Gachapon Ticket.#l\r\n#e#r#L1#Use Powergacha Ticket.#k#n")

if answer == 0:
    sm.sendGachaponDlg(GachaponDlgType.TOWN)
elif answer == 1:
    sm.sendGachaponDlg(GachaponDlgType.SPECIAL)