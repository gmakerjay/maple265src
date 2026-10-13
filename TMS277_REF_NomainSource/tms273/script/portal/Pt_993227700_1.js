// Created by MetaMS
// ID:[993227700]
// MapName:<熔岩流淌的洞穴>
// <熔岩流淌的洞穴>

let event = stage.getEvent("event_blast_frozen");
if (event != null) {
        let next = event.getVariable("Field_3");
        usr.playPortalSE();
        stage.changeMap(next, 2);
        /*
        stage.changeMap(993227200, 2);
        stage.changeMap(993227300, 2);
         */
}