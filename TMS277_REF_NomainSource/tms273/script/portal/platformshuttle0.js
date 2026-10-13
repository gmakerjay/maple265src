// Created by MetaMS
// Event:Platformer

let event = stage.getEvent("platformer");
if (event != null) {
        let nextName = event.getVariable("next");
        let c = event.getVariable("count");
        if (c == null) {
                c = 0;
        }
        if ("0".equals(nextName)) {
                c += 1;
                event.setVariable("count", String(c));
        }
        if (c / 2 >= 30) {
                stage.teleportToPortalId(3, 0);
                stage.runScript("expand/platformer_done");
        }
        event.setVariable("next", "1");
}