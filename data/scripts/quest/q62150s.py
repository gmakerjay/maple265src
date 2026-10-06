from datetime import datetime

sm.createQuestWithQRValue(parentID, str("date=" + datetime.now().strftime("%y/%m/%d")))