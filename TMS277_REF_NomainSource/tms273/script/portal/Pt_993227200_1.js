// Created by MetaMS
// ID:[993227200]
// MapName:<荒廢的樹林>
// <荒廢的樹林>

let event = stage.getEvent("event_blast_frozen");
if (event != null) {
        let next = event.getVariable("Field_2");
        usr.playPortalSE();
        stage.changeMap(next, next == 993227000 ? 4 : 2);
        /*
        stage.changeMap(993227000, 4);
        stage.changeMap(993227100, 2);
         */
}