# [Commerci Republic] Berry Concerned 1

sm.setSpeakerID(9390201) # Mayor Berry
sm.sendNext("Hm...")

sm.flipDialoguePlayerAsSpeaker() # Has to be Player Avatar
sm.sendSay("Mayor Berry, are you all right?")

sm.setSpeakerID(9390201) # Mayor Berry
sm.sendSay("Ah... you feelin' good? Don't mind me, I'm just dealin' with a pest...")

sm.flipDialoguePlayerAsSpeaker() # Has to be Player Avatar
sm.sendSay("What's wrong? I'll help you out if I can.")

sm.setSpeakerID(9390201) # Mayor Berry
response = sm.sendAskYesNo("Really? You'd take the time to help an old fisherman?")

if response == 1:
    sm.sendNext("Well, if you really wanna help, I've got me a cat problem.")
    sm.sendSay("There's a group of them, wanderin' around, stealin' fish and gold and whatever else they can get their mangy paws on.")
    sm.sendSay("I wanna see those #b#o9390807##k get a whippin'! Could ya get 100 of them rounded up for me?")
    sm.startQuest(parentID)
else:
    sm.sendSayOkay("Oh, I know you young folk've got lots to do. I'll just wait around here until all my livelihood's been stolen.")
