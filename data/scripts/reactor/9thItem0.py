# DELETE
import random
from net.swordie.ms.util import Util

mesos = random.randint(1000000,3000000)
if Util.succeedProp(10, 500):
    mesos = random.randint(3000000,10000000)
elif Util.succeedProp(5, 500):
    mesos = random.randint(20000000,30000000)
elif Util.succeedProp(2, 500):
    mesos = random.randint(30000000,50000000)
elif Util.succeedProp(1, 1000):
    mesos = random.randint(50000000,100000000)
sm.giveMesos(mesos)
chr.chatScriptMessage("You've gained " + str(mesos) + " from Special Mesos Box!")
sm.removeReactor()