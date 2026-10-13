// Created by MetaMS
// ID:[993227600]
// MapName:<滾燙熔岩的洞穴>
// <滾燙熔岩的洞穴>

let event = stage.getEvent("event_blast_frozen");
if (event != null) {
        let next = event.getVariable("Field_4");
        usr.playPortalSE();
        stage.changeMap(next, 2);
        /*
        stage.changeMap(993227400, 2);
        stage.changeMap(993227500, 2);
         */
}