package net.swordie.ms.client.character.items;

import net.swordie.ms.connection.OutPacket;

import java.util.List;

/**
 * Created on 12/20/2017.
 */
public class MemorialCubeInfo {
    private Equip equip;
    private List<Integer> oldPotentials;
    private int cubeItemID;

    public MemorialCubeInfo() {
    }

    public MemorialCubeInfo(Equip equip, List<Integer> oldPotentials, int cubeItemID) {
        this.equip = equip;
        this.oldPotentials = oldPotentials;
        this.cubeItemID = cubeItemID;
    }

    public void encode(OutPacket outPacket) {
        Equip equip = getEquip();
        outPacket.encodeByte(equip != null);
        if (equip != null) {
            equip.encode(outPacket);
            outPacket.encodeInt(getCubeItemID());
            outPacket.encodeInt(equip.getBagIndex());
        }
    }

    public Equip getEquip() {
        return equip;
    }

    public void setEquip(Equip equip) {
        this.equip = equip;
    }

    public List<Integer> getOldPotentials() {
        return oldPotentials;
    }

    public void setOldPotentials(List<Integer> oldPotentials) {
        this.oldPotentials = oldPotentials;
    }

    public int getCubeItemID() {
        return cubeItemID;
    }

    public void setCubeItemID(int cubeItemID) {
        this.cubeItemID = cubeItemID;
    }
}
