package net.swordie.ms.client.character.cards;

import net.swordie.ms.connection.hikariCP.DatabaseManager;
import net.swordie.ms.constants.ItemConstants;
import net.swordie.ms.util.DataPrinter;

import java.sql.*;
import java.util.HashMap;
import java.util.Map;

public class MonsterBookInfo {

    private int id;
    private Map<Long, Integer> cards = new HashMap<>();
    private int setID;
    private int coverID;

    public static MonsterBookInfo getMonsterBookInfoFromSQLByMonsterBookID(int monsterBookID) {
        MonsterBookInfo monsterBookInfo = null;

        String query = "SELECT mbi.*, mbc.id AS card_id, mbc.cardid " +
                "FROM monsterbookinfos mbi " +
                "LEFT JOIN monsterbookcards mbc ON mbi.id = mbc.bookid " +
                "WHERE mbi.id = ?";

        try (Connection con = DatabaseManager.getConnection();
             PreparedStatement ps = con.prepareStatement(query)) {
            ps.setInt(1, monsterBookID);
            try (ResultSet rs = ps.executeQuery()) {
                boolean firstRow = true;
                while (rs.next()) {
                    if (firstRow) {
                        monsterBookInfo = new MonsterBookInfo();
                        monsterBookInfo.setId(rs.getInt("id"));
                        monsterBookInfo.setSetID(rs.getInt("setid"));
                        monsterBookInfo.setCoverID(rs.getInt("coverid"));
                        monsterBookInfo.setCards(new HashMap<>());
                        firstRow = false;
                    }

                    // Add the card to the HashMap if it exists
                    if (rs.getObject("card_id") != null) {
                        long cardId = rs.getLong("card_id");
                        int cardValue = rs.getInt("cardid");
                        monsterBookInfo.getCards().put(cardId, cardValue);
                    }
                }
            }
        } catch (SQLException sqlException) {
            DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, sqlException);
        }
        return monsterBookInfo;
    }

    public void saveToSQL() {
        if (getId() == 0) {
            String query = "INSERT INTO `monsterbookinfos` (" +
                    "`setid`, " +
                    "`coverid` " +
                    ") VALUES (" +
                    String.format("%d, ", getSetID()) +
                    String.format("%d ", getCoverID()) +
                    ");";
            int id = (int) DatabaseManager.executeStatementReturnID(query);
            setId(id);
        } else {
            String query = "UPDATE monsterbookinfos SET " +
                    String.format("setid = %d, ", getSetID()) +
                    String.format("coverid = %d ", getCoverID()) +
                    String.format("WHERE id = %d;", getId());
            DatabaseManager.executeStatement(query);

            for (var card : getCards().entrySet()) {
                if (card.getKey() == 0) {
                    query = "INSERT INTO `monsterbookcards` (" +
                            "`bookid`, " +
                            "`cardid` " +
                            ") VALUES (" +
                            String.format("%d, ", getId()) +
                            String.format("%d ", card.getValue()) +
                            ");";
                    DatabaseManager.executeStatement(query);
                    //Should need set ID?
                } else {
                    query = "UPDATE monsterbookcards SET " +
                            String.format("cardid = %d ", card.getValue()) +
                            String.format("WHERE id = %d;", card.getKey());
                    DatabaseManager.executeStatement(query);
                }
            }
        }
    }

    public void deleteFromSQL(Connection con) throws SQLException {
        // Delete the child records first (monsterbookcards)
        String cardsQuery = "DELETE FROM `monsterbookcards` WHERE `bookid` = ?";
        try (PreparedStatement ps = con.prepareStatement(cardsQuery)) {
            ps.setInt(1, getId());
            ps.executeUpdate();
        }
        // Then, delete the parent record (monsterbookinfos)
        String infosQuery = "DELETE FROM `monsterbookinfos` WHERE `id` = ?";
        try (PreparedStatement ps = con.prepareStatement(infosQuery)) {
            ps.setInt(1, getId());
            ps.executeUpdate();
        }
    }

    public static Map<Long, Integer> getCardsFromSQLByMonsterBookID(int monsterBookID) {
        Map<Long, Integer> cards = new HashMap<>();
        try {
            String query = String.format("SELECT * FROM monsterbookcards WHERE bookid = %d", monsterBookID);
            Connection connection = net.swordie.ms.connection.hikariCP.DatabaseManager.getConnection();
            Statement st = connection.createStatement();
            ResultSet rs = st.executeQuery(query);
            while (rs.next()) {
                long id = rs.getLong("id");
                //int bookID = rs.getInt("bookid");
                int cardID = rs.getInt("cardid");

                cards.put(id, cardID);
            }
            rs.close();
            st.close();
            connection.close();
        } catch (SQLException sqlException) {
            DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, sqlException);
        }
        return cards;
    }

    public MonsterBookInfo() {
        setID = -1;
        coverID = -1;
    }

    public Map<Long, Integer> getCards() {
        return cards;
    }

    public void setCards(Map<Long, Integer> cards) {
        this.cards = cards;
    }

    public int getSetID() {
        return setID;
    }

    public void setSetID(int setID) {
        this.setID = setID;
    }

    public int getCoverID() {
        return coverID;
    }

    public void setCoverID(int coverID) {
        this.coverID = coverID;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean hasCard(int cardID) {
        return getCards().containsValue(cardID % ItemConstants.MOB_CARD_BASE_ID);
    }

    public void addCard(int itemID) {
        getCards().put(0L, itemID % ItemConstants.MOB_CARD_BASE_ID);
    }
}
