package net.swordie.ms.client.character.quest.progress;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.loaders.DatSerializable;

public abstract class QuestProgressRequirement implements DatSerializable {

    private long id; // order of encoding for quest record messages
    private int order = 999;

    public abstract boolean isComplete(Char chr);

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public abstract QuestProgressRequirement deepCopy();

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public void saveToSQL(int ownerid, long questID, boolean isAccount) {
        saveToSQL(null, ownerid, questID, isAccount);
    }

    public abstract void saveToSQL(java.sql.Connection con, int ownerid, long questID, boolean isAccount);
}
