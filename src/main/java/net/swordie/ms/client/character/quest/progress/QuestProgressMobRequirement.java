package net.swordie.ms.client.character.quest.progress;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.connection.hikariCP.DatabaseManager;
import net.swordie.ms.loaders.DatSerializable;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import net.swordie.ms.util.DataPrinter;

public class QuestProgressMobRequirement extends QuestProgressRequirement implements QuestValueRequirement {

    private int mobID;
    private int requiredCount;
    private int currentCount;

    @Override
    public void saveToSQL(Connection con, int ownerid, long questID, boolean isAccount) {
        if (getId() == 0) {
            String query = "INSERT INTO " + (isAccount ? "`questprogressrequirements_acc`" : "`questprogressrequirements`") + " (" +
                    "`orderNum`, " +
                    (isAccount ? "`accid`, " : "") +
                    "`progresstype`, " +
                    "`questid`, " +
                    "`unitid`, " +
                    "`requiredcount` " +
                    ") VALUES (" +
                    String.format("%d, ", getOrder()) +
                    (isAccount ? String.format("%d, ", ownerid) : "") +
                    String.format("'%s', ", "mob") +
                    String.format("%d, ", questID) +
                    String.format("%d, ", getMobID()) +
                    String.format("%d ", getRequiredCount()) +
                    ");";
            if (con != null) {
                try (PreparedStatement ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
                    ps.executeUpdate();
                    try (ResultSet rs = ps.getGeneratedKeys()) {
                        if (rs.next()) {
                            setId(rs.getLong(1));
                        }
                    }
                } catch (SQLException e) {
                    DataPrinter.send(DataPrinter.HIKARICP_ERROR, e);
                }
            } else {
                long id = DatabaseManager.executeStatementReturnID(query);
                setId(id);
            }
        }
    }

    public QuestProgressMobRequirement() {
    }

    public int getMobID() {
        return mobID;
    }

    public void setMobID(int mobID) {
        this.mobID = mobID;
    }

    public int getRequiredCount() {
        return requiredCount;
    }

    public void setRequiredCount(int requiredCount) {
        this.requiredCount = requiredCount;
    }

    public void incCurrentCount(int amount) {
        currentCount += amount;
        if (currentCount < 0) {
            currentCount = 0;
        }
    }

    public int getCurrentCount() {
        return currentCount;
    }

    public void setCurrentCount(int currentCount) {
        this.currentCount = currentCount;
    }

    @Override
    public boolean isComplete(Char chr) {
        return getCurrentCount() >= getRequiredCount();
    }

    @Override
    public QuestProgressRequirement deepCopy() {
        QuestProgressMobRequirement qpmr = new QuestProgressMobRequirement();
        qpmr.setMobID(getMobID());
        qpmr.setRequiredCount(getRequiredCount());
        qpmr.setCurrentCount(getCurrentCount());
        qpmr.setOrder(getOrder());
        return qpmr;
    }

    @Override
    public void write(DataOutputStream dos) throws IOException {
        dos.writeInt(getMobID());
        dos.writeInt(getRequiredCount());
        dos.writeInt(getOrder());
    }

    @Override
    public DatSerializable load(DataInputStream dis) throws IOException {
        QuestProgressMobRequirement qpmr = new QuestProgressMobRequirement();
        qpmr.setMobID(dis.readInt());
        qpmr.setRequiredCount(dis.readInt());
        qpmr.setOrder(dis.readInt());
        return qpmr;
    }

    @Override
    public String getValue() {
        return String.valueOf(getCurrentCount());
    }
}
