package net.swordie.ms.client.jobs.shine;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.CharacterStat;
import net.swordie.ms.client.character.items.BodyPart;
import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.client.jobs.Job;
import net.swordie.ms.constants.FieldConstants;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.loaders.ItemData;
import net.swordie.ms.scripts.ScriptManagerImpl;

import static net.swordie.ms.enums.InvType.EQUIPPED;

public class SiaAstelle extends Job {

    // V Skills
    public static final int SHINE = 400021142;
    public static final int STELLAR_XI_SIRIUS = 400021143;
    public static final int STELLAR_XII_SADALSUUD = 400021147;
    public static final int SAVIOR_CIRCLE = 400021149;
    public static final int TIME_BLINDER = 400021152;

    public SiaAstelle(Char chr) {
        super(chr);
    }

    @Override
    public boolean isHandlerOfJob(short id) {
        return JobConstants.isSiaAstelle(id);
    }

    @Override
    public void setCharCreationStats(Char chr) {
        CharacterStat cs = chr.getAvatarData().getCharacterStat();
        cs.setPosMap(FieldConstants.HOME_MAP);
        cs.setJob(JobConstants.JobEnum.SIA_1.getJobId());
        cs.setLevel(10);
        cs.setInt(45);
        cs.setStr(4);
        cs.setDex(4);
        cs.setLuk(4);
        cs.setHp(1000);
        cs.setMaxHp(1000);
        cs.setMp(500);
        cs.setMaxMp(500);
        cs.getExtendSP().addSpToJobLevel(1, 5);
    }

    @Override
    public void addItemToNewCharacter(Char chr) {
        super.addItemToNewCharacter(chr);
        // Secondary Weapon: Constellation (1352870)
        Item secondary = ItemData.getItemDeepCopy(1352870);
        if (secondary != null) {
            chr.addItemToInventoryToNewCharacter(EQUIPPED, secondary, true);
            secondary.setInventoryID(chr.getInventoryByType(EQUIPPED).getId());
            secondary.setCharID(chr.getId());
            secondary.setInvType(EQUIPPED);
            secondary.setBagIndex(BodyPart.Shield.getVal());
            secondary.saveToSQL();
            chr.getAvatarData().getAvatarLook().getHairEquips().add(secondary.getItemId());
            chr.getAvatarData().getAvatarLook().updateAvatarLookToSQL();
        }

        // Primary Weapon: Basic Celestial Light (1253000)
        if (chr.getEquippedItemByBodyPart(BodyPart.Weapon) == null) {
            Item weapon = ItemData.getItemDeepCopy(1253000);
            if (weapon != null) {
                chr.addItemToInventoryToNewCharacter(EQUIPPED, weapon, true);
                weapon.setInventoryID(chr.getInventoryByType(EQUIPPED).getId());
                weapon.setCharID(chr.getId());
                weapon.setInvType(EQUIPPED);
                weapon.setBagIndex(BodyPart.Weapon.getVal());
                weapon.saveToSQL();
                chr.getAvatarData().getAvatarLook().setWeaponId(weapon.getItemId());
                chr.getAvatarData().getAvatarLook().updateAvatarLookToSQL();
            }
        }
    }

    @Override
    public void handleLevelUp(short level) {
        super.handleLevelUp(level);
        var sm = chr.getScriptManager();
        if (level == 30) {
            sm.setJob(JobConstants.JobEnum.SIA_2.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_2.getJobId(), 3);
            sm.giveAndEquip(1352871);
        } else if (level == 60) {
            sm.setJob(JobConstants.JobEnum.SIA_3.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_2.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_3.getJobId(), 3);
            sm.giveAndEquip(1352872);
        } else if (level == 100) {
            sm.setJob(JobConstants.JobEnum.SIA_4.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_3.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_4.getJobId(), 3);
            sm.giveAndEquip(1352873);
        }
    }

    @Override
    public void handleInitAfterMigrate(Char chr) {
        super.handleInitAfterMigrate(chr);
        if (chr.getLevel() < 30) {
            ScriptManagerImpl sm = chr.getScriptManager();
            sm.levelUntil(30);
            sm.setJob(JobConstants.JobEnum.SIA_2.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_2.getJobId(), 3);
            sm.giveAndEquip(1253000);
            sm.giveAndEquip(1352871);
            sm.warp(FieldConstants.HOME_MAP);
        }
    }
}
