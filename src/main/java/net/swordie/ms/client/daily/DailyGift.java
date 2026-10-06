package net.swordie.ms.client.daily;

import net.swordie.ms.client.Account;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.connection.OutPacket;
import net.swordie.ms.connection.hikariCP.DatabaseManager;
import net.swordie.ms.connection.packet.UIContextPacket;
import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.constants.DailyGiftConstants;
import net.swordie.ms.util.Common;
import net.swordie.ms.util.DataPrinter;
import net.swordie.ms.util.FileTime;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public class DailyGift {

    private long id;

    private int accountID;

    private long date;

    private long currentDate;

    private int dateComplete = 0;

    //0 = can Receive
    //1 = You can get the following gift after midnight
    private boolean isClaim = false;

    public DailyGift() {
        currentDate = OffsetDateTime.now(ZoneOffset.UTC).toInstant().toEpochMilli();
    }

    public static DailyGift getDailyGiftFromSQLByAccountID(int accountID) {
        String query = "SELECT * FROM dailygift WHERE accountID = ?";
        DailyGift dailyGift = null;
        try (Connection connection = DatabaseManager.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, accountID);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    dailyGift = new DailyGift();
                    dailyGift.setId(rs.getLong("id"));
                    dailyGift.setAccountID(accountID);
                    dailyGift.setDate(rs.getLong("date"));
                    dailyGift.setDateComplete(rs.getInt("dateComplete"));
                    dailyGift.setClaim(rs.getByte("isClaim") == 1);
                }
            }
        } catch (Exception exception) {
            DataPrinter.send(DataPrinter.HIKARICP_ERROR, exception);
        }
        return dailyGift;
    }

    public void saveToSQL() {
        String sql;
        boolean isInsert = (getId() == 0);
        if (isInsert) {
            sql = "INSERT INTO `dailygift` (`accountID`, `date`, `dateComplete`, `isClaim`) VALUES (?, ?, ?, ?)";
        } else {
            sql = "UPDATE `dailygift` SET `accountID` = ?, `date` = ?, `dateComplete` = ?, `isClaim` = ? WHERE `id` = ?";
        }
        try (Connection con = DatabaseManager.getConnection();
             PreparedStatement ps = con.prepareStatement(sql, isInsert ? Statement.RETURN_GENERATED_KEYS : Statement.NO_GENERATED_KEYS)) {
            ps.setInt(1, getAccountID());
            ps.setLong(2, getDate());
            ps.setInt(3, getDateComplete());
            ps.setBoolean(4, isClaim());
            if (!isInsert) {
                ps.setLong(5, getId());
            }
            int affectedRows = ps.executeUpdate();
            if (isInsert && affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        setId(generatedKeys.getInt(1));
                    }
                }
            }
        } catch (Exception e) {
            DataPrinter.send(DataPrinter.HIKARICP_ERROR, e);
        }
    }

    public void deleteDailyGiftFromSQL() {
        String query = "DELETE FROM `dailygift` WHERE " +
                String.format("`id` = %d", getId());
        DatabaseManager.executeStatement(query);
        setId(0);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getAccountID() {
        return accountID;
    }

    public void setAccountID(int accountID) {
        this.accountID = accountID;
    }

    public long getDate() {
        return date;
    }

    public void setDate(long date) {
        this.date = date;
    }

    public long getCurrentDate() {
        return currentDate;
    }

    public void setCurrentDate(long currentDate) {
        this.currentDate = currentDate;
    }

    public int getDateComplete() {
        return dateComplete;
    }

    public void setDateComplete(int dateComplete) {
        this.dateComplete = dateComplete;
    }

    public void addDateComplete() {
        this.dateComplete += 1;
    }

    public boolean isClaim() {
        return isClaim;
    }

    public void setClaim(boolean claim) {
        isClaim = claim;
    }

    public String getDateString() {
        return Common.getTimeStringWidthFormat("yyyyMMdd", getDate());
    }

    public boolean isNextDate() {
        //2 type Reset
        if (Common.getDateFromCurrentTime(getCurrentDate()) != Common.getDateFromCurrentTime(getDate())) {
            return true;
        }
//        if (getCurrentDate() - getDate() >= 86400000L) {
//            return true;
//        }
        return false;
    }

    public boolean isFirstDayOfMonth() {
        if (Common.getDateFromCurrentTime(getCurrentDate()) == 1) {
            return true;
        }
        return false;
    }

    public static void init(Char chr) {
        Account account = chr.getAccount();
        if (account == null) {
            return;
        }
        DailyGift dailyGift = account.getDailyGift();
        if (dailyGift == null) {
            dailyGift = new DailyGift();
            dailyGift.setDate(dailyGift.getCurrentDate());
            dailyGift.setAccountID(account.getId());
            account.setDailyGift(dailyGift);
            dailyGift.saveToSQL();
        }
        if (!chr.hasQuest(DailyGiftConstants.MONSTER_COUNT_QR)) {
            chr.createQuestWithQRValue(DailyGiftConstants.MONSTER_COUNT_QR, String.format("date=%s;count=0;", dailyGift.getDateString()));
        }
        if (dailyGift.isFirstDayOfMonth()) {
            dailyGift.setDateComplete(0);
            dailyGift.saveToSQL();
            chr.sendPopupSay("Daily gifts have been reset at the beginning of the month");
        }
        if (dailyGift.isNextDate()) {
            dailyGift.setClaim(false);
            dailyGift.setDate(dailyGift.getCurrentDate());
            dailyGift.saveToSQL();
            chr.sendPopupSay("Your daily gift has been reset");
            chr.createQuestWithQRValue(DailyGiftConstants.MONSTER_COUNT_QR, String.format("date=%s;count=0;", dailyGift.getDateString()));
        }
        String syntax = String.format("date=%s;day=%d;count=%d;", dailyGift.getDateString(), dailyGift.getDateComplete(), dailyGift.isClaim() ? 1 : 0);
        chr.write(UserLocal.dailyGiftMessage(syntax));
        chr.write(UIContextPacket.dailyGiftInit(dailyGift, 0, 0));
    }

    public int getCurrentMonster(Char chr) {
        if (chr.getQRValue(DailyGiftConstants.MONSTER_COUNT_QR).equals("Quest is Null")) {
            return 0;
        }
        return Integer.parseInt(chr.getQRValueByKey(DailyGiftConstants.MONSTER_COUNT_QR,  "count"));
    }

    public void updateMonsterCount(Char chr, int level) {
        int minLv = chr.getLevel() - 10;
        int maxLv = chr.getLevel() + 10;
        if (level < minLv || level > maxLv) {
            return;
        }
        if (chr.getQRValue(DailyGiftConstants.MONSTER_COUNT_QR).equals("Quest is Null")) {
            return;
        }
        int currentMob = Integer.parseInt(chr.getQRValueByKey(DailyGiftConstants.MONSTER_COUNT_QR,  "count"));
        if (currentMob < 300) {
            currentMob++;
        }
        chr.setQRValueByKey(DailyGiftConstants.MONSTER_COUNT_QR, "count", String.valueOf(currentMob));
    }

    public void update(Char chr, int itemID) {
        String value = String.format("date=%s;day=%d;count=%d;", getDateString(), getDateComplete(), isClaim() ? 1 : 0);
        chr.write(UserLocal.dailyGiftMessage(value));
        chr.write(UIContextPacket.dailyGiftInit(this, 2, itemID));
        chr.write(UIContextPacket.dailyGiftInit(this, 0, itemID));
        saveToSQL();
    }

    public void encode(OutPacket outPacket) {
        outPacket.encodeFT(FileTime.currentTime());
        outPacket.encodeFT(FileTime.MAX_TIME());
        outPacket.encodeInt(28);
        outPacket.encodeInt(2);
        outPacket.encodeInt(DailyGiftConstants.MONSTER_COUNT_QR); // Custom Quest Key?
        outPacket.encodeInt(DailyGiftConstants.REQ_MONSTER); // Amount Req
        outPacket.encodeString("mvpTooltip_default");
        outPacket.encodeInt(DailyGiftConstants.items.size()); // 28
        for (DailyGiftItemInfo dailyGiftItemInfo : DailyGiftConstants.items) {
            outPacket.encodeInt(dailyGiftItemInfo.getId());
            outPacket.encodeInt(dailyGiftItemInfo.getItemId());
            outPacket.encodeInt(dailyGiftItemInfo.getQuantity());
            outPacket.encodeByte(1);
            outPacket.encodeInt((dailyGiftItemInfo.getSN() > 0) ? 0 : 10080);
            outPacket.encodeByte((dailyGiftItemInfo.getSN() > 0) ? 1 : 0);
            outPacket.encodeInt((dailyGiftItemInfo.getSN() > 0) ? 1 : 0);
            outPacket.encodeInt(0);
            outPacket.encodeByte(false);
        }
        outPacket.encodeInt(DailyGiftConstants.REQ_LEVEL);
        int size = 0;
        outPacket.encodeInt(size);
        for (int i = 0; i < size; i++) {
            outPacket.encodeInt(i);
            outPacket.encodeInt(40914);
        }
        outPacket.encodeInt(size);
        for (int i = 0; i < size; i++) {
            outPacket.encodeInt(0);
            // sub_C5C360
            outPacket.encodeInt(0);
            outPacket.encodeInt(0);
            outPacket.encodeInt(0);
            outPacket.encodeInt(0);
            outPacket.encodeInt(size);
            for (i = 0; i < size; i++) {
                // sub_C5C360
                outPacket.encodeInt(0);
                outPacket.encodeInt(0);
                outPacket.encodeInt(0);
                outPacket.encodeInt(0);
            }
        }
    }

    @Override
    public String toString() {
        return "DailyGift{" +
                "accountID=" + accountID +
                ", date=" + date +
                ", currentDate=" + currentDate +
                ", dateComplete=" + dateComplete +
                ", isClaim=" + isClaim +
                '}';
    }
}
