function handleEvent() {
    let event = stage.getEvent();
    if (event != null) {
        if (event.getVariable("random_slice") == null) {
            setSliceVariables(event, 0, marin_random(1, 5));
            event.setVariable("random_slice", true);
        }
        let map_stage = parseInt((map.getId() - 920010000) / 100);
        let map_judge = event.getVariable(`stage_${map_stage}_clear`);
        let {slice, slice_count} = getSliceVariables(event);
        if (map_judge == null) {
            let memer = event.getVariable("members");
            if (stage.hasItem(4001053, 1)) {
                stage.loseItem(4001053, 1);
                slice += 1;
                setSliceVariables(event, slice);
                if (slice === slice_count) {
                    map.spawnMob(9300937, ctx.getEntityPosX(), ctx.getEntityPosY());
                    for (let i in memer) {
                        memer[i].showBalloonMsg("#b似乎黑食人花出現了!!!快擊殺了它!", 250, 10);
                    }
                    event.setVariable(`stage_${map_stage}_clear`, true);
                } else {
                    stage.showBalloonMsg("#r什麼也沒有種出來~", 250, 10);
                    stage.dropMessage(0x16, `count : ${slice_count}`);
                    stage.dropMessage(0x15, `slice : ${slice}`);
                }
            }
        }
    }
}

function getSliceVariables(event) {
    let slice = parseInt(event.getVariable("slice") || 0);
    let slice_count = parseInt(event.getVariable("slice_count") || 0);
    return {slice, slice_count};
}

function setSliceVariables(event, slice, slice_count) {
    event.setVariable("slice", slice);
    if (slice_count > 0) {
        event.setVariable("slice_count", slice_count);
    }
}

function marin_random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

handleEvent();
