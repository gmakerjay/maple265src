package net.swordie.ms.client.character;

import net.swordie.ms.Server;
import net.swordie.ms.client.character.items.Equip;
import net.swordie.ms.client.character.items.EquipAttribute;
import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.connection.OutPacket;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.constants.ItemConstants;
import net.swordie.ms.enums.InvType;
import net.swordie.ms.loaders.StringData;
import net.swordie.ms.util.DataPrinter;
import net.swordie.ms.util.container.Tuple;

import java.util.*;

public class TradeRoom {
    private int otherCharID;
    private int chrID;
    private boolean isTrade;
    private Map<Char, Byte> rpsTypes = new HashMap<>();
    private Map<Char, Long> money = new HashMap<>();
    private Set<Char> confirmedPlayers = new HashSet<>();
    private Map<Integer, List<Tuple<Integer, Item>>> offeredItems = new HashMap<>();
    private Map<Integer, List<Integer>> offeredCashItems = new HashMap<>();

    public TradeRoom(Char chr, Char other) {
        this.chrID = chr.getId();
        offeredItems.put(chr.getId(), new ArrayList<>());
        offeredCashItems.put(chr.getId(), new ArrayList<>());
        this.otherCharID = other.getId();
        offeredItems.put(other.getId(), new ArrayList<>());
        offeredCashItems.put(other.getId(), new ArrayList<>());
    }

    public int getOtherCharID() {
        return otherCharID;
    }

    public Char getOtherChar(int charID) {
        int result = (charID == getChrID() ? getOtherCharID() : getChrID());
        return Server.get().getWorld().getCharById(result);
    }

    public boolean canAddItem(Char chr) {
        return getOfferedItems().get(chr.getId()).size() < GameConstants.MAX_TRADE_ITEMS;
    }

    public int getTradeSlot(Char chr) {
        return getOfferedItems().get(chr.getId()).size() + 1;
    }

    public void addItem(Char chr, int pos, Item item) {
        List<Tuple<Integer, Item>> items = getOfferedItems().get(chr.getId());
        Tuple<Integer, Item> entry = new Tuple<>(pos, item);
        items.add(entry);
    }

    public void addCashItem(Char chr, Integer itemID) {
        List<Integer> items = getOfferedCashItems().get(chr.getId());
        items.add(itemID);
    }

    public int getChrID() {
        return chrID;
    }

    private Map<Char, Long> getMoney() {
        return money;
    }

    public long getMoney(Char chr) {
        return getMoney().getOrDefault(chr, 0L);
    }

    public void putMoney(Char chr, long money) {
        getMoney().put(chr, money);
    }

    public Map<Integer, List<Tuple<Integer, Item>>> getOfferedItems() {
        return offeredItems;
    }

    public Map<Integer, List<Integer>> getOfferedCashItems() {
        return offeredCashItems;
    }

    public Set<Char> getConfirmedPlayers() {
        return confirmedPlayers;
    }

    public void addConfirmedPlayer(Char chr) {
        getConfirmedPlayers().add(chr);
    }

    public boolean hasConfirmed(Char other) {
        return getConfirmedPlayers().contains(other);
    }

    public boolean completeTrade() {
        Char chr = Server.get().getWorld().getCharById(getChrID());
        Char other = Server.get().getWorld().getCharById(getOtherCharID());
        if (chr == null || other == null) {
            System.out.println("Giao dịch không thành công giữa 02 nhân vật : " + getChrID() + " và " + getOtherCharID());
            return false;
        }
        List<Item> items = new ArrayList<>();
        for (Tuple<Integer, Item> entry : getOfferedItems().get(getOtherCharID())) {
            items.add(entry.getRight());
        }
        if (!chr.canHold(items)) {
            chr.chatMessage("You do not have space in your inventory.");
            other.chatMessage(chr.getName() + " does not have space in their inventory.");
            return false;
        }
        for (Tuple<Integer, Item> entry : getOfferedItems().get(getChrID())) {
            items.add(entry.getRight());
        }
        if (!other.canHold(items)) {
            other.chatMessage("You do not have space in your inventory.");
            chr.chatMessage(chr.getName() + " does not have space in their inventory.");
            return false;
        }
        // Add all the items + money
        for (Tuple<Integer, Item> entry : getOfferedItems().get(getChrID())) {
            if (entry.getRight().getInvType().equals(InvType.EQUIP)) {
                Equip equip = (Equip) entry.getRight();
                if (equip.hasAttribute(EquipAttribute.UnTradableAfterTransaction)) {
                    equip.setTradeBlock(true);
                    equip.removeAttribute(EquipAttribute.UnTradableAfterTransaction);
                    equip.addAttribute(EquipAttribute.UnTradable);
                }
            }
            Item item = entry.getRight();
            if (item.getQuantity() <= 0 && !ItemConstants.isThrowingItem(item.getItemId())) {
                cancelTrade();
                chr.getClient().close();
                continue;
            }
            for (Integer itemId : getOfferedCashItems().get(getChrID())) {
                if (itemId == item.getItemId()) {
                    item.setCash(true);
                    break;
                }
            }
            other.addItemToInventory(item);
            //item.saveToSQL();
            DataPrinter.send(DataPrinter.LOG_TRADE, String.format("Nhân vật %s nhận vật phẩm %s | ID vật phẩm: %d | số lượng: %d từ %s", other.getName(), StringData.getItemStringById(item.getItemId()), item.getItemId(), item.getQuantity(), chr.getName()));
        }
        if (GameConstants.applyTax(getMoney(chr)) > 0) {
            other.addMoney(GameConstants.applyTax(getMoney(chr)));
            DataPrinter.send(DataPrinter.LOG_TRADE, String.format("Nhân vật %s nhận %d Meso từ %s", other.getName(), GameConstants.applyTax(getMoney(chr)), chr.getName()));
        }
        for (Tuple<Integer, Item> entry : getOfferedItems().get(getOtherCharID())) {
            if (entry.getRight().getInvType().equals(InvType.EQUIP)) {
                Equip equip = (Equip) entry.getRight();
                if (equip.hasAttribute(EquipAttribute.UnTradableAfterTransaction)) {
                    equip.setTradeBlock(true);
                    equip.removeAttribute(EquipAttribute.UnTradableAfterTransaction);
                    equip.addAttribute(EquipAttribute.UnTradable);
                }
            }
            Item item = entry.getRight();
            for (Integer itemId : getOfferedCashItems().get(getOtherCharID())) {
                if (itemId == item.getItemId()) {
                    item.setCash(true);
                    break;
                }
            }
            chr.addItemToInventory(item);
            //item.saveToSQL();
            DataPrinter.send(DataPrinter.LOG_TRADE, String.format("Người chơi %s nhận vật phẩm %s | ID vật phẩm: %d | Số lượng: %d từ %s", chr.getName(), StringData.getItemStringById(item.getItemId()), item.getItemId(), item.getQuantity(), other.getName()));
        }
        if (GameConstants.applyTax(getMoney(other)) > 0) {
            chr.addMoney(GameConstants.applyTax(getMoney(other)));
            DataPrinter.send(DataPrinter.LOG_TRADE, String.format("Người chơi %s nhận %d meso từ %s", chr.getName(), GameConstants.applyTax(getMoney(other)), other.getName()));
        }
        return true;
    }

    public boolean canHold() {
        Char chr = Server.get().getWorld().getCharById(getChrID());
        Char other = Server.get().getWorld().getCharById(getOtherCharID());
        if (chr == null || other == null) {
            System.out.println("Giao dịch không thể nhận đồ giữa 02 nhân vật : " + getChrID() + " và " + getOtherCharID());
            return false;
        }
        List<Item> items = new ArrayList<>();
        for (Tuple<Integer, Item> entry : getOfferedItems().get(getOtherCharID())) {
            items.add(entry.getRight());
        }
        for (Tuple<Integer, Item> entry : getOfferedItems().get(getChrID())) {
            items.add(entry.getRight());
        }
        if (!chr.canHold(items) || !other.canHold(items)) {
            chr.chatMessage("One of the two does not have space to receive the item when winning.");
            other.chatMessage("One of the two does not have space to receive the item when winning.");
            return false;
        }
        return true;
    }

    public void winRPS(Char winner, Char loser) {
        for (Map.Entry<Integer, List<Tuple<Integer, Item>>> items : getOfferedItems().entrySet()) {
            for (Tuple<Integer, Item> entry : items.getValue()) {
                if (entry.getRight().getInvType().equals(InvType.EQUIP)) {
                    Equip equip = (Equip) entry.getRight();
                    if (equip.hasAttribute(EquipAttribute.UnTradableAfterTransaction)) {
                        equip.setTradeBlock(true);
                        equip.removeAttribute(EquipAttribute.UnTradableAfterTransaction);
                        equip.addAttribute(EquipAttribute.UnTradable);
                    }
                }
                Item item = entry.getRight();
                for (Integer itemId : getOfferedCashItems().get(winner.getId())) {
                    if (itemId == item.getItemId()) {
                        item.setCash(true);
                        break;
                    }
                }
                winner.addItemToInventory(item);
                //item.saveToSQL();
                DataPrinter.send(DataPrinter.LOG_RPS, String.format("Người chơi %s đã thắng oẳn tù tì và nhận vật phẩm %s | ID vật phẩm: %d | Số lượng: %d từ %s", winner.getName(), StringData.getItemStringById(item.getItemId()), item.getItemId(), item.getQuantity(), loser.getName()));
            }
        }
        long meso = 0;
        for (Map.Entry<Char, Long> entry : getMoney().entrySet()) {
            meso += entry.getValue();
        }
        if (GameConstants.applyTax(meso) > 0) {
            winner.addMoney(GameConstants.applyTax(meso));
            DataPrinter.send(DataPrinter.LOG_RPS, String.format("Người chơi %s đã thắng oẳn tù tì và nhận %d meso từ %s", winner.getName(), GameConstants.applyTax(meso), loser.getName()));
        }
        winner.setTradeRoom(null);
        loser.setTradeRoom(null);
    }

    public void cancelTrade() {
        Char chr = Server.get().getWorld().getCharById(getChrID());
        if (chr != null) {
            chr.setTradeRoom(null);
        }
        Char other = Server.get().getWorld().getCharById(getOtherCharID());
        if (other != null) {
            other.setTradeRoom(null);
        }
        int[] charIds = new int[]{getChrID(), getOtherCharID()};
        for (int charID : charIds) {
            Char receiver = Server.get().getWorld().getCharById(charID);
            for (Tuple<Integer, Item> entry : getOfferedItems().get(charID)) {
                Item item = entry.getRight();
                for (Integer itemId : getOfferedCashItems().get(charID)) {
                    if (itemId == item.getItemId()) {
                        item.setCash(true);
                        break;
                    }
                }
                receiver.addItemToInventory(item);
            }
            receiver.addMoney(getMoney(receiver));
        }
    }

    public boolean isTrade() {
        return isTrade;
    }

    public void setTrade(boolean trade) {
        isTrade = trade;
    }

    public Map<Char, Byte> getRpsTypes() {
        return rpsTypes;
    }

    public void putRPSType(Char chr, byte rpsType) {
        getRpsTypes().put(chr, rpsType);
    }

    public byte getRPSType(Char chr) {
        return getRpsTypes().getOrDefault(chr, (byte) 3);
    }

    public final byte getResult(byte rps1, byte rps2) {
        switch (rps1) {
            case 0:
                if (rps2 == 1)
                    return 2;
                if (rps2 == 2)
                    return 0;
                break;
            case 1:
                if (rps2 == 2)
                    return 2;
                if (rps2 == 0)
                    return 0;
                break;
            case 2:
                if (rps2 == 0)
                    return 2;
                if (rps2 == 1)
                    return 0;
                break;
        }
        return 1;
    }
}
