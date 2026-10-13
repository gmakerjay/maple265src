const json = {
    2630030:2023913,
    2630029:2023831,
    2630028:2023830,
    2630026:2023828,
    2630024:2023827,
    2630021:2023825
};

function getBuff(itemId, stage) {
    stage.loseItem(itemId, 1);
    stage.applyItemBuff(json[`${itemId}`] );
}

export { getBuff }