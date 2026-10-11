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

public class QuestProgressLevelRequirement extends QuestProgressRequirement {

    private int level;

    @Override
    public void saveToSQL(Connection con, int ownerid, long questID, boolean isAccount) {
        if (getId() == 0) {
            String query = "INSERT INTO " + (isAccount ? "`questprogressrequirements_acc`" : "`questprogressrequirements`") + " (" +
                    "`orderNum`, " +
                    (isAccount ? "`accid`, " : "") +
                    "`progresstype`, " +
                    "`questid`, " +
                    "`requiredcount` " +
                    ") VALUES (" +
                    String.format("%d, ", getOrder()) +
                    (isAccount ? String.format("%d, ", ownerid) : "") +
                    String.format("'%s', ", "level") +
                    String.format("%d, ", questID) +
                    String.format("%d ", getLevel()) +
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

    public QuestProgressLevelRequirement() {
    }

    public QuestProgressLevelRequirement(int level) {
        this.level = level;
    }

    @Override
    public boolean isComplete(Char chr) {
        return chr.getLevel() >= getLevel();
    }

    @Override
    public QuestProgressRequirement deepCopy() {
        QuestProgressLevelRequirement qplr = new QuestProgressLevelRequirement();
        qplr.setLevel(getLevel());
        qplr.setOrder(getOrder());
        return qplr;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    @Override
    public void write(DataOutputStream dos) throws IOException {
        dos.writeInt(getLevel());
    }

    @Override
    public DatSerializable load(DataInputStream dis) throws IOException {
        return new QuestProgressLevelRequirement(dis.readInt());
    }


}
