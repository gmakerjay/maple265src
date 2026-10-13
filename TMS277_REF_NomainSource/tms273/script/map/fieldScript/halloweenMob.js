// Created by MetaMS

let date = util.getStringDate("yyyMMdd");
let show = "20231224".equals(date) || "20231225".equals(date) || "20231226".equals(date);
stage.setFieldScene(2);
stage.setBackgroundByTag("2022Xmas", show ? 1 : 0, 0);
stage.setMapTaggedObjectVisible("2022Xmas", show, 0, 0);
stage.setFieldWeather("2022Xmas", show, false, 0);

stage.setFieldScene(1);
stage.setBackgroundByTag("22Halloween", 0, 0);
stage.setMapTaggedObjectVisible("22Halloween", false, 0, 0);
stage.setBackgroundByTag("22HalloweenOff", 1, 0);
stage.setMapTaggedObjectVisible("h", false, 0, 0);
stage.setMapTaggedObjectVisible("2023Strawberry", false, 0, 0);