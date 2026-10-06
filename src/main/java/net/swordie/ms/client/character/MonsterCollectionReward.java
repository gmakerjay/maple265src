package net.swordie.ms.client.character;

import java.io.Serializable;

public class MonsterCollectionReward implements Serializable {

    private int region;
    private int session; // -1 == region (medal)
    private int group; // -1 == session

    public int getRegion() {
        return region;
    }

    public void setRegion(int region) {
        this.region = region;
    }

    public int getSession() {
        return session;
    }

    public void setSession(int session) {
        this.session = session;
    }

    public int getGroup() {
        return group;
    }

    public void setGroup(int group) {
        this.group = group;
    }
}
