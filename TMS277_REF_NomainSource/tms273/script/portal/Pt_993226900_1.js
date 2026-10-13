// Created by MetaMS
// ID:[993226900]
// MapName:<大雪覆蓋的路面>
// <大雪覆蓋的路面>

let event = stage.getEvent("event_blast_frozen");
if (event != null) {
        let next = event.getVariable("Field_2");
        usr.playPortalSE();
        stage.changeMap(next, next == 993227000 ? 3 : 1);
        /*
        stage.changeMap(993227000, 3);
        stage.changeMap(993227100, 1);
         */
}
