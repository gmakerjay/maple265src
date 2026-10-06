# Mu Lung Dojo Entrance (925020000) | Used for dojo weather notice

from net.swordie.ms.enums import WeatherEffNoticeType
import random

messages = ["If you want to taste the bitterness of defeat, come on in!",
"I'll make you regret coming to Mu Lung Dojo! Now, onward!",
"I admire your bravery for entering Mu Lung Dojo!",
"You've got guts! But don't confuse wisdom and confidence!",
"Enter if you are willing to walk the path of defeat!",
"I have been waiting for you! Enter if you have any courage left!"]

sm.showWeatherNotice(messages[random.randint(0, 5)], WeatherEffNoticeType.MuLungDojo)
