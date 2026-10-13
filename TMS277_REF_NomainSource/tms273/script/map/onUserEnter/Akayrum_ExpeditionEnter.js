// Created by MetaMS
// ID:[272020200]
// MapName:阿卡伊農的祭壇

if (!"1".equals(stage.getSessionValue("Akayrum_firstIn"))) {
        stage.setSessionValue("Akayrum_firstIn", "1");
        stage.setSessionValue("Akayrum_startingTime", util.getStringDate("yy/MM/dd/HH/mm"));
        stage.startQuest(31190, "1");//Quest Name:Unknown
        stage.startQuest(31191, "0");//Quest Name:Unknown
}