package net.swordie.ms.client.character.items;

import net.swordie.ms.connection.OutPacket;

public class EquipSymbol {
    private boolean isSacred;
    private short inc;
    private int arcExp;
    private int arcLevel;

    public EquipSymbol() {
    }

    public EquipSymbol(short inc, int arcExp, int arcLevel, boolean isSacred) {
        this.inc = inc;
        this.arcExp = arcExp;
        this.arcLevel = arcLevel;
        this.isSacred = isSacred;
    }

    public EquipSymbol deepCopy() {
        EquipSymbol ret = new EquipSymbol();
        ret.inc = getInc();
        ret.arcExp = getExp();
        ret.arcLevel = getLevel();
        ret.isSacred = isSacred();
        return ret;
    }

    public void reset() {
        this.inc = 0;
        this.arcExp = 0;
        this.arcLevel = 0;
    }

    public void encode(OutPacket outPacket) {
        int curLevel = getLevel();
        int costGrowth;
        long mesoCost;

        outPacket.encodeInt(0);
        outPacket.encodeInt(curLevel); // level
        if (isSacred()) {
            costGrowth = (int) (9L * curLevel * curLevel + 20L * curLevel);     // (9×L^2) + (20×L)
            mesoCost   = 100_000L * (long) Math.floor(costGrowth * (13.2 - 0.6 * curLevel));
        } else {
            costGrowth = curLevel * curLevel + 11;                       // Level^2 + 11
            mesoCost   = 10_000L * (long) Math.floor(costGrowth * (8 + 0.1 * curLevel));
        }
        outPacket.encodeInt(costGrowth);                   // Cost Growth
        outPacket.encodeLong(mesoCost);                    // Cost Required
        outPacket.encodeLong(0);
        outPacket.encodeShort(0);
        outPacket.encodeShort(0);
        outPacket.encodeShort(0);
        outPacket.encodeShort(0);
        outPacket.encodeShort(0);
        outPacket.encodeShort(0);
        outPacket.encodeShort(0);
        outPacket.encodeShort(0);
        outPacket.encodeShort(0);
        outPacket.encodeShort(0);
        outPacket.encodeShort(0);
        outPacket.encodeShort(0);
    }

    public short getInc() {
        return inc;
    }

    public void setInc(short inc) {
        this.inc = inc;
    }

    public int getExp() {
        return arcExp;
    }

    public void setExp(int arcExp) {
        this.arcExp = arcExp;
    }

    public int getLevel() {
        return arcLevel;
    }

    public void setLevel(int arcLevel) {
        this.arcLevel = arcLevel;
    }

    public boolean isSacred() {
        return isSacred;
    }

    public void setSacred(boolean isSacred) {
        this.isSacred = isSacred;
    }
}
