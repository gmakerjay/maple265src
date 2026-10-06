# Spiegelmann - Monster Carnival

sel = sm.sendNext("#e<Competition: Monster Carnival>#n\r\nIf you're itching for some action, then the Monster Carnivals is the place for you!\r\n\r\n#b#L0#I want to participate in the Monster Carnival.#l\r\n#L1#Tell me more about the Monster Carnival.#l\r\n#L2#I want to trade in my shiny Maple Coins.#l#k")

if sel == 0:
    sm.sendSayOkay("The Monster Carnival's had to close its door for a bit. Why don't you go find something else to entertain you for now?")
elif sel == 1:
    sm.sendNext("The #bMonster Carnival#k is that magical place where you team up with others to obliterate hordes of monsters faster than the other folks.")
    sm.sendPrev("Don't think you can do it alone? Worry not, my friend, i will enlist others to join you! All you have to tell me is, are you game? If you are, I'll give a holler when I have your group ready.\r\n#e-Level:#n 110 - 130\r\n#e- Rewards:#n\r\n#v1012373# #t1012373#\r\n#v1102556# #t1102556#\r\n#v1122248# #t1122248#")
elif sel == 2:
    sm.sendSayOkay("What? You don't have a single Shiny Maple Coin! If you want #v1012373# #t1012373#, #v1102556# #t1102556#, or #v1122248# #t1122248#, then bring me more #v4001254# #b#t4001254##k!")