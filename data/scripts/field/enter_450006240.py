if sm.hasQuestCompleted(34257) and not sm.hasQuestCompleted(34265):
	sm.createQuestWithQRValue(34271, "20=h0;21=h0;22=h0;23=h1;28=h1;29=h1;30=h0;31=h0;32=h1;33=h0;36=h0;53=h1;54=h1")
	sm.removeNpc(3003428)
	sm.spawnNpc(3003428, -312, -48)
elif sm.hasQuestCompleted(34272) and sm.hasQuestCompleted(34243):
	sm.createQuestWithQRValue(34271, "20=h0;21=h0;22=h0;23=h1;28=h0;29=h0;30=h0;31=h0;32=h1;33=h0;36=h0;53=h0;54=h0")
	sm.createQuestWithQRValue(34245, "69=h1")
	sm.setMapTaggedObjectVisible("thana_jail", False, 0, 0)
elif sm.hasQuestCompleted(34266) and not sm.hasQuest(34267):
	sm.createQuestWithQRValue(34271, "20=h0;21=h0;22=h0;23=h0;28=h0;29=h0;30=h0;31=h0;32=h1;33=h2;36=h0;53=h0;54=h0")
	sm.createQuestWithQRValue(34245, "69=h0")
	sm.setMapTaggedObjectVisible("thana_jail", False, 0, 0)