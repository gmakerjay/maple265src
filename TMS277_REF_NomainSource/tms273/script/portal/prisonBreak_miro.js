/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * 
 */

let event = ctx.getEvent("party_prison_break");
if (event != null) {
    let members = event.getVariable("members");
    if (map.getActiveMobCount() <= 0) {
        let clear_random = Math.random() > 0.1;
        if (clear_random) {
            for (let i in members) {
                members[i].changeMap(921160400, 0);
            }
        } else {
            stage.changeMap(921160300 + ((Math.floor(Math.random() * 6) | 0) * 10), 0);
        }
    } else {
        map.blowWeather(5120053, "請消滅守護們的警衛!", 5);
    }
}