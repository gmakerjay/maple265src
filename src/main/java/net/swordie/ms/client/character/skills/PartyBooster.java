package net.swordie.ms.client.character.skills;

import net.swordie.ms.client.character.skills.temp.TwoStateTemporaryStat;
import net.swordie.ms.connection.OutPacket;
import net.swordie.ms.util.Util;

public class PartyBooster extends TwoStateTemporaryStat {

    private int currentTime;
    private long startTime;

    public PartyBooster() {
        super(false);
        startTime = 0;
        currentTime = 0;
        expireTerm = 0;
    }

    @Override
    public int getExpireTerm() {
        return expireTerm;
    }

    @Override
    public boolean hasExpired(long now) {
        return startTime > 0 && expireTerm > 0 && (now - startTime) >= expireTerm * 1000L;
    }

    public int getCurrentTime() {
        return currentTime;
    }

    public void setCurrentTime(int currentTime) {
        this.currentTime = currentTime;
    }

    public long getStartTime() {
        return startTime;
    }

    public void setStartTime(long startTime) {
        this.startTime = startTime;
    }

    @Override
    public void reset() {
        super.reset();
        setCurrentTime(0);
    }

    @Override
    public void encode(OutPacket outPacket) {
        super.encode(outPacket);
        outPacket.encodeTime(getCurrentTime());
        outPacket.encodeShort(getExpireTerm());
    }
}
