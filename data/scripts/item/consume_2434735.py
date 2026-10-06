# Pterosaur Mount (Permanent) Coupon  |  (2434735)
if sm.getSkillByItem() == 0:# Check whether item has an vehicleID stored,  0 if false.
    sm.chat("An Error occurred whilst trying to find the mount.")
elif sm.hasSkill(sm.getSkillByItem()):
    sm.chat("You already have the 'Pterosaur' mount.")
else:
    sm.consumeItem(2434735)
    sm.giveSkill(sm.getSkillByItem())
    sm.chat("Successfully added the 'Pterosaur' mount.")
