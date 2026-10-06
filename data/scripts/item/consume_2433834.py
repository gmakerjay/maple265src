import random

# Rare Treasure Chest
# Black Knight's Soul Shard x 1
# Mad Mage's Soul Shard x 1
# Rampant Cyborg's Soul Shard x 1
# Vicious Hunter's Soul Shard x 1
# Bad Brawler's Soul Shard x 1
# Pure Clean Slate Scroll 10% x 1 (Interactive / Non-Reboot Worlds only)
# Innocence Scroll 50% x 1 (Interactive / Non-Reboot Worlds only)
# Chaos Scroll 60% x 1 (Interactive / Non-Reboot Worlds only)
# Basic Bonus Potential Stamp x 1 (Interactive / Non-Reboot Worlds only)
# Intermediate Bonus Potential Stamp x 1 (Interactive / Non-Reboot Worlds only)
# Advanced Bonus Potential Stamp x 1 (Interactive / Non-Reboot Worlds only)
# Chaos Scroll of Goodness 30% x 1 (Interactive / Non-Reboot Worlds only)
# Mystical Cube x 3 - 15 (GMS only)
# Epic Potential Scroll 50% x 1
# Silver Potential Stamp x 1
# Bonus Potential Scroll 70% x 1 (Interactive / Non-Reboot Worlds only)

items = [
    2432575, # Black Knight's Soul Shard
    2432576, # Mad Mage's Soul Shard
    2432577, # Rampant Cyborg's Soul Shard
    2432578, # Vicious Hunter's Soul Shard
    2432579, # Bad Brawler's Soul Shard
    2049004, # Pure Clean Slate Scroll 10%
    2049603, # Innocence Scroll 50%
    2049100, # Chaos Scroll 60%
    2048200, # Basic Bonus Potential Stamp
    2048201, # Intermediate Bonus Potential Stamp
    2048202, # Advanced Bonus Potential Stamp
    2049130, # Chaos Scroll of Goodness 30%
    2436499, # Mystical Cube (3~15)
    2049705, # Epic Potential Scroll 50%
    2049501, # Silver Potential Stamp
    2048305, # Bonus Potential Scroll 70%
]

itemId = random.choice(items)
qty = 1

# Mystical Cube: random 3 ~ 15
if itemId == 2436499:
    qty = random.randint(3, 15)

if sm.canHold(itemId, qty):
    sm.giveItem(itemId, qty)
    sm.consumeItem(parentID)
else:
    sm.chat("Bạn không đủ ô chứa trong túi USE")