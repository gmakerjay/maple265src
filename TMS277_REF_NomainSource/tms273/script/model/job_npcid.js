let demo = exports;

demo.JobNpc = function (stage) {
        let Gender = parseInt(stage.getGender());
        let Job = stage.getJob();
        let NpcId = 1541033 + Gender;
        switch (Job) {
                case 110:
                case 111:
                case 112:
                        NpcId = 1541035 + Gender;
                        break;
                case 120:
                case 121:
                case 122:
                        NpcId = 1541037 + Gender;
                        break;
                case 130:
                case 131:
                case 132:
                        NpcId = 1541039 + Gender;
                        break;
                case 210:
                case 211:
                case 212:
                        NpcId = 1541041 + Gender;
                        break;
                case 220:
                case 221:
                case 222:
                        NpcId = 1541043 + Gender;
                        break;
                case 230:
                case 231:
                case 232:
                        NpcId = 1541045 + Gender;
                        break;
                case 310:
                case 311:
                case 312:
                        NpcId = 1541049 + Gender;
                        break;
                case 320:
                case 321:
                case 322:
                        NpcId = 1541047 + Gender;
                        break;
                case 330:
                case 331:
                case 332:
                        NpcId = 1013359 - Gender;
                        break;
                case 410:
                case 411:
                case 412:
                        NpcId = 1541053 + Gender;
                        break;
                case 420:
                case 421:
                case 422:
                        NpcId = 1541051 + Gender;
                        break;
                case 430:
                case 431:
                case 432:
                case 433:
                case 434:
                        NpcId = 1541055 + Gender;
                        break;
                case 510:
                case 511:
                case 512:
                        NpcId = 1541057 + Gender;
                        break;
                case 520:
                case 521:
                case 522:
                        NpcId = 1541059 + Gender;
                        break;
                case 530:
                case 531:
                case 532:
                        NpcId = 1541061 + Gender;
                        break;
        }
        return NpcId;
}