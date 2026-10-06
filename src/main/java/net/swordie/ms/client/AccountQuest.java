package net.swordie.ms.client;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.quest.progress.*;
import net.swordie.ms.connection.hikariCP.DatabaseManager;
import net.swordie.ms.constants.QuestConstants;
import net.swordie.ms.enums.QuestStatus;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.loaders.MobData;
import net.swordie.ms.util.DataPrinter;
import net.swordie.ms.util.FileTime;
import net.swordie.ms.util.Util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.*;
import java.util.stream.Collectors;

public class AccountQuest {

    private long id;
    private int accid;
    private int QRKey;
    private String qrValue;
    private QuestStatus status;
    private List<QuestProgressRequirement> progressRequirements;
    private FileTime completedTime;
    private FileTime expireTerm;
    private Map<String, String> properties = new HashMap<>();

    public static void saveToSQL(Map<Integer, AccountQuest> questData, int accID) {
        if (questData == null || questData.isEmpty()) {
            return;
        }
        Collection<AccountQuest> quests = questData.values();
        List<AccountQuest> newQuests = new ArrayList<>();
        List<AccountQuest> existingQuests = new ArrayList<>();
        for (AccountQuest q : quests) {
            if (q.getId() == 0) {
                q.setAccId(accID);
                newQuests.add(q);
            } else {
                existingQuests.add(q);
            }
        }
        String insertSql = "INSERT INTO `quests_acc` " +
                "(`accid`, `qrkey`, `qrvalue`, `status`, `completedtime`, `expireterm`) " +
                "VALUES (?, ?, ?, ?, ?, ?)";
        String updateSql = "UPDATE quests_acc SET " +
                "accid = ?, qrkey = ?, qrvalue = ?, status = ?, completedtime = ?, expireterm = ? " +
                "WHERE id = ?";

        try (Connection con = DatabaseManager.getConnection()) {
            boolean oldAutoCommit = con.getAutoCommit();
            con.setAutoCommit(false);

            try (PreparedStatement psInsert = con.prepareStatement(insertSql, Statement.RETURN_GENERATED_KEYS);
                 PreparedStatement psUpdate = con.prepareStatement(updateSql)) {
                for (AccountQuest q : newQuests) {
                    psInsert.setInt(1, accID);
                    psInsert.setInt(2, q.getQRKey());
                    psInsert.setString(3, q.getQRValue());
                    psInsert.setInt(4, q.getStatus().getVal());
                    psInsert.setTimestamp(5, q.getCompletedTime() != null
                            ? new java.sql.Timestamp(q.getCompletedTime().toMillis())
                            : null);
                    psInsert.setTimestamp(6, q.getExpireTerm() != null
                            ? new java.sql.Timestamp(q.getExpireTerm().toMillis())
                            : null);
                    psInsert.addBatch();
                }
                if (!newQuests.isEmpty()) {
                    psInsert.executeBatch();
                    DataPrinter.send(DataPrinter.HIKARICP, psInsert.toString(), true);
                    try (ResultSet rs = psInsert.getGeneratedKeys()) {
                        int idx = 0;
                        while (rs.next() && idx < newQuests.size()) {
                            long newId = rs.getLong(1);
                            AccountQuest q = newQuests.get(idx++);
                            q.setId(newId);
                        }
                    }
                }
                for (AccountQuest q : existingQuests) {
                    psUpdate.setInt(1, accID);
                    psUpdate.setInt(2, q.getQRKey());
                    psUpdate.setString(3, q.getQRValue());
                    psUpdate.setInt(4, q.getStatus().getVal());
                    psUpdate.setTimestamp(5, q.getCompletedTime() != null
                            ? new java.sql.Timestamp(q.getCompletedTime().toMillis())
                            : null);
                    psUpdate.setTimestamp(6, q.getExpireTerm() != null
                            ? new java.sql.Timestamp(q.getExpireTerm().toMillis())
                            : null);
                    psUpdate.setLong(7, q.getId());
                    psUpdate.addBatch();
                }
                if (!existingQuests.isEmpty()) {
                    psUpdate.executeBatch();
                    DataPrinter.send(DataPrinter.HIKARICP, psUpdate.toString(), true);
                }
                for (AccountQuest q : quests) {
                    long qid = q.getId();
                    int accId = q.getAccId();
                    for (QuestProgressRequirement qpr : q.getProgressRequirements()) {
                        if (qpr instanceof QuestProgressMobRequirement qpmr) {
                            qpmr.saveToSQL(accId, qid, false);
                        } else if (qpr instanceof QuestProgressItemRequirement qpir) {
                            qpir.saveToSQL(accId, qid, false);
                        } else if (qpr instanceof QuestProgressMoneyRequirement qpmr) {
                            qpmr.saveToSQL(accId, qid, false);
                        } else if (qpr instanceof QuestProgressLevelRequirement qplr) {
                            qplr.saveToSQL(accId, qid, false);
                        }
                    }
                }
                con.commit();
            } catch (Exception e) {
                con.rollback();
                DataPrinter.send(DataPrinter.HIKARICP_ERROR, e);
            } finally {
                con.setAutoCommit(oldAutoCommit);
            }
        } catch (Exception e) {
            DataPrinter.send(DataPrinter.HIKARICP_ERROR, e);
        }
    }

    public void deleteFromSQL() {
        String query = "DELETE FROM `quests_acc` WHERE " +
                String.format("`id` = %d", getId());
        DatabaseManager.executeStatement(query);
        setId(0);
    }

    public AccountQuest() {
        progressRequirements = new ArrayList<>();
    }

    public AccountQuest(int accid, int QRKey, QuestStatus status) {
        this();
        this.accid = accid;
        this.QRKey = QRKey;
        this.status = status;
    }

    public int getAccId() {
        return accid;
    }

    public void setAccId(int accid) {
        this.accid = accid;
    }

    public int getQRKey() {
        return QRKey;
    }

    public void setQRKey(int QRKey) {
        this.QRKey = QRKey;
    }

    public QuestStatus getStatus() {
        return status;
    }

    public void setStatus(QuestStatus status) {
        this.status = status;
    }

    public AccountQuest deepCopy() {
        AccountQuest quest = new AccountQuest();
        quest.setAccId(getAccId());
        quest.setQRKey(getQRKey());
        for (QuestProgressRequirement qpr : getProgressRequirements()) {
            quest.addQuestProgressRequirement(qpr);
        }
        quest.setStatus(getStatus());
        return quest;
    }

    public List<QuestProgressRequirement> getProgressRequirements() {
        return progressRequirements;
    }

    public void setProgressRequirements(List<QuestProgressRequirement> progressRequirements) {
        this.progressRequirements = progressRequirements;
    }

    public void addQuestProgressRequirement(QuestProgressRequirement qpr) {
        getProgressRequirements().add(qpr);
    }

    public List<QuestProgressMobRequirement> getMobReqs() {
        return getProgressRequirements().stream().filter(qpr -> qpr instanceof QuestProgressMobRequirement)
                .map(qpr -> (QuestProgressMobRequirement) qpr).collect(Collectors.toList());
    }

    public List<QuestProgressItemRequirement> getItemReqs() {
        return getProgressRequirements().stream().filter(qpr -> qpr instanceof QuestProgressItemRequirement)
                .map(qpr -> (QuestProgressItemRequirement) qpr).collect(Collectors.toList());
    }

    public QuestProgressMobRequirement getMobReqByMobID(int mobID) {
        return getMobReqs().stream().filter(qpmr -> qpmr.getMobID() == mobID).findFirst().orElse(null);
    }

    public boolean hasMobReq(int mobID) {
        return getMobReqByMobID(mobID) != null;
    }

    public FileTime getCompletedTime() {
        return completedTime;
    }

    public void setCompletedTime(FileTime completedTime) {
        this.completedTime = completedTime;
    }

    public void completeQuest() {
        setStatus(QuestStatus.Completed);
        setCompletedTime(FileTime.currentTime());
    }

    public boolean isComplete(Char chr) {
        if (QuestConstants.isSpecialProgressRequirementQuest(getQRKey())) {
            return getProgressRequirements().stream().anyMatch(pr -> pr.isComplete(chr));
        }
        return getProgressRequirements().stream().allMatch(pr -> pr.isComplete(chr));
    }

    public void handleMobKill(int mobID) {
        Mob mob = MobData.getMobById(mobID);
        if (mob == null) {
            return;
        }
        // get requirement for which this mob (or a containing QuestCountGroup) is a part of
        QuestProgressMobRequirement qpmr = (QuestProgressMobRequirement) getProgressRequirements()
                .stream()
                .filter(q -> q instanceof QuestProgressMobRequirement
                        && ((((QuestProgressMobRequirement) q).getMobID() == mobID)
                        || mob.getParentMobSet().contains(((QuestProgressMobRequirement) q).getMobID())))
                .findFirst().orElse(null);
        if (qpmr != null) {
            // should never return null, as this method should only be called when this quest indeed has this mob
            if (qpmr.getCurrentCount() < qpmr.getRequiredCount()) {
                qpmr.incCurrentCount(1);
                setQrValue(String.valueOf(qpmr.getCurrentCount()));
                setQRValueToProperties();
            }
        } else {
            DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, "Unable to handle monster killed, quest ID: " + getQRKey() + " on monster ID: " + mobID);
        }
    }

    @Override
    public String toString() {
        return String.format("%d, %s", getQRKey(), getQRValue());
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean hasMoneyReq() {
        return getProgressRequirements().stream().anyMatch(q -> q instanceof QuestProgressMoneyRequirement);
    }

    public void addMoney(int money) {
        getProgressRequirements().stream()
                .filter(q -> q instanceof QuestProgressMoneyRequirement)
                .map(q -> (QuestProgressMoneyRequirement) q)
                .findAny().ifPresent(qpmr -> qpmr.addMoney(money));
    }

    public String getQRValue() {
        if (qrValue != null && !qrValue.equalsIgnoreCase("")) {
            return qrValue;
        } else {
            StringBuilder sb = new StringBuilder();
            if (getProgressRequirements() == null) {
                return "";
            }
            List<QuestProgressMobRequirement> requirements = new ArrayList<>(getMobReqs());
            requirements.sort(Comparator.comparingInt(QuestProgressMobRequirement::getOrder));
            for (QuestProgressMobRequirement qpmr : requirements) {
                sb.append(Util.leftPaddedString(3, '0', qpmr.getValue()));
            }
            return sb.toString();
        }
    }

    public void setQrValue(String qrValue) {
        this.qrValue = qrValue;
    }

    public void convertQRValueToProperties() {
        String val = getQRValue();
        String[] props = val.split(";");
        for (String prop : props) {
            String[] keyVal = prop.split("=");
            if (keyVal.length == 2) {
                setProperty(keyVal[0], keyVal[1]);
            }
        }
    }

    public Map<String, String> getProperties() {
        return properties;
    }

    public void setProperty(String key, String value) {
        getProperties().put(key, value);
        setQRValueToProperties();
    }

    public void setProperty(String key, int value) {
        getProperties().put(key, String.valueOf(value));
        setQRValueToProperties();
    }

    private void setQRValueToProperties() {
        StringBuilder stringBuilder = new StringBuilder();
        for (Map.Entry<String, String> entry : getProperties().entrySet()) {
            stringBuilder.append(entry.getKey()).append("=").append(entry.getValue()).append(";");
        }
        setQrValue(stringBuilder.toString());
    }

    public String getProperty(String key) {
        return getProperties().getOrDefault(key, null);
    }

    public int getIntProperty(String key) {
        return Integer.parseInt(getProperties().getOrDefault(key, "0"));
    }

    public FileTime getExpireTerm() {
        return expireTerm;
    }

    public void setExpireTerm(FileTime expireTerm) {
        this.expireTerm = expireTerm;
    }
}
