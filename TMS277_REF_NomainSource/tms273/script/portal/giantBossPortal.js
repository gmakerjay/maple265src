// Created by MetaMS
// ID:[863010100]
// MapName:往培羅德
// 往培羅德

let event = stage.getEvent("boss_beidler_normal");
if (event != null) {
        let mapId = -1, portalId = 1;
        switch (map.getId()) {
                case 863010100:
                        if (ctx.getPortalId() == 8) {
                                mapId = 863010200;
                                portalId = 1;
                        } else if (ctx.getPortalId() == 7) {
                                mapId = 863010400;
                                portalId = 2;
                        } else if (ctx.getPortalId() == 6) {
                                mapId = 863010300;
                                portalId = 2;
                        } else if (ctx.getPortalId() == 9) {
                                mapId = 863010220;
                                portalId = 1;
                        }
                        break;
                case 863010300:
                        if (ctx.getPortalId() == 2) {
                                mapId = 863010100;
                                portalId = 6;
                        } else if (ctx.getPortalId() == 1) {
                                if (map.getActiveMobCount() <= 0) {
                                        mapId = 863010310;
                                        portalId = 1;
                                }
                        }
                        break;
                case  863010310:
                        if (ctx.getPortalId() == 1) {
                                mapId = 863010300;
                                portalId = 1;
                        } else if (ctx.getPortalId() == 2) {
                                if (map.getActiveMobCount() <= 0) {
                                        mapId = 863010320;
                                        portalId = 2;
                                }
                        }
                        break;
                case 863010420:
                        if (ctx.getPortalId() == 1) {
                                mapId = 863010410;
                                portalId = 2;
                        } else if (ctx.getPortalId() == 2) {
                                if (map.getActiveMobCount() <= 0) {
                                        mapId = 863010500;
                                        portalId = 5;
                                }
                        } else if (ctx.getPortalId() == 3) {
                                if (map.getActiveMobCount() <= 0) {
                                        mapId = 863010430;
                                        portalId = 1;
                                }
                        }
                        break;
                case 863010430:
                        if (ctx.getPortalId() == 1) {
                                mapId = 863010420;
                                portalId = 3;
                        } else if (ctx.getPortalId() == 3) {
                                mapId = 863010500;
                                portalId = 6;
                        }
                        break;
                case 863010330:
                        if (ctx.getPortalId() == 1) {
                                mapId = 863010320;
                                portalId = 3;
                        } else if (ctx.getPortalId() == 3) {
                                mapId = 863010500;
                                portalId = 4;
                        }
                        break;
                case 863010500:
                        if (ctx.getPortalId() == 5) {
                                mapId = 863010420;
                                portalId = 2;
                        } else if (ctx.getPortalId() == 2) {
                                mapId = 863010240;
                                portalId = 3;
                        } else if (ctx.getPortalId() == 3) {
                                mapId = 863010600;
                                portalId = 0;
                        } else if (ctx.getPortalId() == 6) {
                                mapId = 863010430;
                                portalId = 3;
                        } else if (ctx.getPortalId() == 1) {
                                mapId = 863010320;
                                portalId = 1;
                        } else if (ctx.getPortalId() == 4) {
                                mapId = 863010330;
                                portalId = 3;
                        }
                        break;
                case 863010240:
                        if (ctx.getPortalId() == 2) {
                                mapId = 863010210;
                                portalId = 2;
                        } else if (ctx.getPortalId() == 1) {
                                mapId = 863010230;
                                portalId = 2;
                        } else if (ctx.getPortalId() == 3) {
                                if (map.getActiveMobCount() <= 0) {
                                        mapId = 863010500;
                                        portalId = 2;
                                }
                        }
                        break;
                case 863010210:
                        if (ctx.getPortalId() == 1) {
                                mapId = 863010200;
                                portalId = 2;
                        } else if (ctx.getPortalId() == 2) {
                                if (map.getActiveMobCount() <= 0) {
                                        mapId = 863010240;
                                        portalId = 2;
                                }
                        }
                        break;
                case 863010200:
                        if (ctx.getPortalId() == 1) {
                                mapId = 863010100;
                                portalId = 8;
                        } else if (ctx.getPortalId() == 2) {
                                if (map.getActiveMobCount() <= 0) {
                                        mapId = 863010210;
                                        portalId = 1;
                                }
                        }
                        break;
                case 863010400:
                        if (ctx.getPortalId() == 1) {
                                if (map.getActiveMobCount() <= 0) {
                                        mapId = 863010410;
                                        portalId = 1;
                                }
                        } else if (ctx.getPortalId() == 2) {
                                mapId = 863010100;
                                portalId = 7;
                        }
                        break;
                case 863010410:
                        if (ctx.getPortalId() == 2) {
                                if (map.getActiveMobCount() <= 0) {
                                        mapId = 863010420;
                                        portalId = 1;
                                }
                        } else if (ctx.getPortalId() == 1) {
                                mapId = 863010400;
                                portalId = 1;
                        }
                        break;
                case 863010320:
                        if (ctx.getPortalId() == 2) {
                                mapId = 863010310;
                                portalId = 2;
                        } else if (ctx.getPortalId() == 1) {
                                if (map.getActiveMobCount() <= 0) {
                                        mapId = 863010500;
                                        portalId = 1;
                                }
                        } else if (ctx.getPortalId() == 3) {
                                if (map.getActiveMobCount() <= 0) {
                                        mapId = 863010330;
                                        portalId = 1;
                                }
                        }
                        break;
                case 863010230:
                        if (ctx.getPortalId() == 1) {
                                mapId = 863010220;
                                portalId = 2;
                        } else if (ctx.getPortalId() == 2) {
                                if (map.getActiveMobCount() <= 0) {
                                        mapId = 863010240;
                                        portalId = 1;
                                }
                        }
                        break;
                case 863010220:
                        if (ctx.getPortalId() == 1) {
                                mapId = 863010100;
                                portalId = 9;
                        } else if (ctx.getPortalId() == 2) {
                                if (map.getActiveMobCount() <= 0) {
                                        mapId = 863010230;
                                        portalId = 1;
                                }
                        }
                        break;
                case 863010600:
                        if (ctx.getPortalId() == 2) {
                                mapId = 863010500;
                                portalId = 3;
                        }
                        break;
        }
        if (mapId > 0) {
                usr.playPortalSE();
                stage.changeMap(mapId, portalId);
        } else {
                stage.showSystemMessage("若想經過此通道，必需擊退邪惡氣息。");
        }
}