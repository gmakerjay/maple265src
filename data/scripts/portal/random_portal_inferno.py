POLLO = 9001059
sm.setSpeakerID(POLLO)
sm.flipDialogue()
answer = sm.sendNext("My brother and I have been tracking down the legendary #rInferno Wolf#k, and we finally found its "
                "hideout! It's a really vicious monster that ruthlessly attacks Maple World's travelers... So, will"
                "you join us in bringing that beast down?#b\r\n#L0#Let's do it!#l\r\n#L1#Nah, I'm good.#l#k")
if answer == 0:
    sm.handleInfernoWolf(objectID)