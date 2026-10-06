# Fairy Forest : King's Seat

if sm.hasQuest(24005):  # Cursed Slumber
    sm.completeQuest(24005)  # Cursed Slumber
    sm.jobAdvance(2300)  # Mercedes
    sm.giveItem(1142336)
    if chr.hasSkill(20021166):
        sm.removeSkill(20021166)  # Remove the Beginner Stunning Strike Skill
    if chr.hasSkill(20021181):
        sm.removeSkill(20021181)  # Remove the Beginner Flash Jump Skill
