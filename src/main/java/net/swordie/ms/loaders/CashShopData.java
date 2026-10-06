package net.swordie.ms.loaders;

import net.swordie.ms.ServerConstants;
import net.swordie.ms.loaders.Etc.Commodity.CommodityInfo;
import net.swordie.ms.util.*;
import org.w3c.dom.Node;

import java.io.*;
import java.text.NumberFormat;
import java.util.*;

public class CashShopData {

    public static List<CommodityInfo> commodities = new ArrayList<>();

    public static List<CommodityInfo> getCommodities() {
        return commodities;
    }

    public static CommodityInfo getCommodityBySN(int SN) {
        for (CommodityInfo ci : getCommodities()) {
            if (ci.getSN() == SN) {
                return ci;
            }
        }
        return loadCommodityBySN(SN);
    }

    public static CommodityInfo loadCommodityBySN(int SN) {
        File file = new File(String.format("%s/Etc.wz/Commodity.img.xml", ServerConstants.WZ_DIR));
        Node root = XMLApi.getRoot(file);
        Node firstNode = XMLApi.getAllChildren(root).getFirst();
        List<Node> nodes = XMLApi.getAllChildren(firstNode);
        for (Node node : nodes) {
            int id = Integer.parseInt(XMLApi.getNamedAttribute(node, "name"));
            CommodityInfo ci = new CommodityInfo();
            ci.setId(id);
            List<Node> nodes1 = XMLApi.getAllChildren(node);
            for (Node node1 : nodes1) {
                String name = XMLApi.getNamedAttribute(node1, "name");
                String value = XMLApi.getNamedAttribute(node1, "value");
                switch (name) {
                    case "SN":
                        ci.setSN(Integer.parseInt(value));
                        break;
                    case "ItemId":
                        ci.setItemId(Integer.parseInt(value));
                        break;
                    case "Count":
                        ci.setCount(Integer.parseInt(value));
                        break;
                    case "Price":
                        ci.setPrice(Integer.parseInt(value));
                        break;
                    case "Period":
                        ci.setPeriod(Integer.parseInt(value));
                        break;
                    case "gameWorld":
                        ci.setGameWorld(value);
                        break;
                    case "originalPrice":
                        ci.setOriginalPrice(Integer.parseInt(value));
                        break;
                    case "Gender":
                        ci.setGender(Integer.parseInt(value));
                        break;
                    case "OnSale":
                        ci.setOnSale(Integer.parseInt(value));
                        break;
                    case "discount":
                        ci.setDiscount(Integer.parseInt(value));
                        break;
                    case "termStart":
                    case "termEnd":
                        ci.setTerm(1);
                        break;
                }
            }
            if (ci.getSN() == SN) {
                getCommodities().add(ci);
                return ci;
            }
        }
        return null;
    }

    public static void load() {
        File file = new File(String.format("%s/Etc.wz/Commodity.img.xml", ServerConstants.WZ_DIR));
        Node root = XMLApi.getRoot(file);
        Node firstNode = XMLApi.getAllChildren(root).getFirst();
        List<Node> nodes = XMLApi.getAllChildren(firstNode);
        for (Node node : nodes) {
            int id = Integer.parseInt(XMLApi.getNamedAttribute(node, "name"));
            CommodityInfo ci = new CommodityInfo();
            ci.setId(id);
            List<Node> nodes1 = XMLApi.getAllChildren(node);
            for (Node node1 : nodes1) {
                String name = XMLApi.getNamedAttribute(node1, "name");
                String value = XMLApi.getNamedAttribute(node1, "value");
                switch (name) {
                    case "SN":
                        ci.setSN(Integer.parseInt(value));
                        break;
                    case "ItemId":
                        ci.setItemId(Integer.parseInt(value));
                        break;
                    case "Count":
                        ci.setCount(Integer.parseInt(value));
                        break;
                    case "Price":
                        ci.setPrice(Integer.parseInt(value));
                        break;
                    case "Period":
                        ci.setPeriod(Integer.parseInt(value));
                        break;
                    case "gameWorld":
                        ci.setGameWorld(value);
                        break;
                    case "originalPrice":
                        ci.setOriginalPrice(Integer.parseInt(value));
                        break;
                    case "Gender":
                        ci.setGender(Integer.parseInt(value));
                        break;
                    case "OnSale":
                        ci.setOnSale(Integer.parseInt(value));
                        break;
                    case "discount":
                        ci.setDiscount(Integer.parseInt(value));
                        break;
                    case "termStart":
                    case "termEnd":
                        ci.setTerm(1);
                        break;
                }
            }
            getCommodities().add(ci);
        }
    }

    public static void main(String[] args) {
        StringData.loadItemStringsFromWz();
        load();
        commodities.sort(Comparator.comparingInt(CommodityInfo::getId));
        for (CommodityInfo ci : commodities) {
            if (ci.getGameWorld().equalsIgnoreCase("") || !ci.getGameWorld().contains("0") || ci.getTerm() == 1 || ci.getOnSale() == 0) {
                continue;
            }
            if (StringData.getItemStringById(ci.getItemId()) == null) {
                continue;
            }
            System.out.printf("[Id: %d] SN: %d | " +
                            "Item Id: %d | " +
                            "Item Name: %s | " +
                            "Count: %d | " +
                            "Discount: %d | " +
                            "Price: %s | " +
                            "originalPrice: %s | " +
                            "Period: %s.%n",
                    ci.getId(),
                    ci.getSN(),
                    ci.getItemId(),
                    StringData.getItemStringById(ci.getItemId()),
                    ci.getCount(),
                    ci.getDiscount(),
                    Util.getNumberFormat(ci.getPrice()),
                    Util.getNumberFormat(ci.getOriginalPrice()),
                    ci.getPeriod() == 0 ? "vĩnh viễn" : ci.getPeriod() + " ngày");
        }
    }
}
