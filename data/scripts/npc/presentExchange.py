sel = sm.sendNext("You seem troubled. How can I help you?\r\n\r\n#b#L0#I would like to get divorced.#l\r\n#L1#Nothing...I'm fine.#l")
if sel == 0:
    sm.sendNext("You're not even married! Do you know what a divorce is?")
else:
    sm.sendNext("This is a very important decision. Please make it carefully.")