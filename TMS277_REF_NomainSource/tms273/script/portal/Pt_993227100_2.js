// Created by MetaMS
// ID:[993227100]
// MapName:<斷崖絕壁>
// <斷崖絕壁>

let event = stage.getEvent("event_blast_frozen");
if (event != null) {
        let next = event.getVariable("Field_3");
        usr.playPortalSE();
        stage.changeMap(next, 1);
        /*
        stage.changeMap(993227200, 1);
        stage.changeMap(993227300, 1);
         */
}