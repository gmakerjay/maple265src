# Low Rider Coupon  |  (2430339)
if sm.getSkillByItem() == 0:# Check whether item has an vehicleID stored,  0 if false.
    sm.chat("An Error occurred whilst trying to find the mount.")
elif sm.hasSkill(sm.getSkillByItem()):
    sm.chat("You already have the 'Low Rider' mount.")
else:
    sm.consumeItem(2430339)
    sm.giveSkill(sm.getSkillByItem())
    sm.chat("Successfully added the 'Low Rider' mount.")
