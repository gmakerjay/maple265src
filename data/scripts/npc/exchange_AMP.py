sel = sm.sendNext("Hello! What can I do for you?\r\n\r\n#b#L0#I want to put anti-magic into Inverse Codex.#l\r\n#L1#I would like to exchange my anti-magic and anti-magic stones to either a Kritias Commemorative Coin or a Anheim Coin.#l")

if sel == 0:
    sm.sendSayOkay("Eh? I don't think you have the Inverse Codex equipped.\r\nPlease check again as you can only put in anti-magic while you're equipping it.")
elif sel == 1:
    sm.sendSayOkay("I don't think you have enough anti-magic or anti-magic stones. You need 700 anti-magic to get one. #bAnheim Coin and 1 anti-magic stone and 1200 anti-magic to get a Kritias Commemorative Coin. Please check again.#k")