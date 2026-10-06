sel = sm.sendNext("What is it?\r\n\r\n#b#L0#Talk to Roo-D.#l\r\n#L1#Ask for Roo-D's help with your gift-giving.#l#k")

if sel == 0:
    sm.sendNext("Welcome to the Veritas labs! I am Roo-D, the official lab mascot-slash-assistant. Everybody's busy right now, so please keep your hands away from the equipment.")
elif sel == 1:
    sm.sendSayOkay("Hmm I want to help you but you are not Xenon. You want to give out gifts too?")