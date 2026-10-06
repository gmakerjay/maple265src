# Once you drop the White Essence, Capt. Latanica will appear

White_Essence = 4000381
Capt_Latanica = 9420513

drop = sm.getDropInRect(White_Essence, 50)
if drop is not None:
    field.removeDrop(drop.getObjectId(), 0, False, -1)
    sm.spawnMob(Capt_Latanica, -146, 220, False)
    sm.removeReactor()