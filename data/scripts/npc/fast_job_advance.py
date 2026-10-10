# Fast Job Advance Universal Script for MapleStory Server Runner
# Supports all 50+ classes with instant branching, level-appropriate advancement,
# skill maxing, and 5th/6th Job matrix unlocks.

from net.swordie.ms.constants import JobConstants

def open_fast_job_advance(sm, chr):
    cur_job = chr.getJob()
    level = chr.getLevel()
    sub_job = chr.getSubJob()

    # 1. 5th & 6th Job Matrix Quests Unlock
    if level >= 200 and not sm.hasQuestCompleted(1465):
        chr.completeQuest(1465)
        for q in range(1460, 1467):
            try:
                chr.completeQuest(q)
            except:
                pass
    if level >= 260 and not sm.hasQuestCompleted(1488):
        chr.completeQuest(1488)

    # 2. Check for branching paths
    branches = JobConstants.getBranchOptions(cur_job, level, sub_job)
    if branches and len(branches) > 0:
        menu_text = "#fs13##e[Fast Job Advance]#n\r\n\r\n"
        menu_text += "Current Job: #b" + JobConstants.getCleanJobName(cur_job) + "#k (ID: " + str(cur_job) + ")\r\n"
        menu_text += "Level: #r" + str(level) + "#k\r\n\r\n"
        menu_text += "Please select your desired class branch:\r\n\r\n"
        for b in branches:
            menu_text += "#L" + str(b) + "##b" + JobConstants.getCleanJobName(b) + "#k (ID: " + str(b) + ")#l\r\n"

        sel = sm.sendNext(menu_text)
        if sel > 0:
            chosen = sel
            # Check if this chosen branch also has sub-branches (e.g. Beginner -> Thief -> Assassin/Bandit)
            sub_branches = JobConstants.getBranchOptions(chosen, level, sub_job)
            if sub_branches and len(sub_branches) > 0:
                sub_menu = "#fs13##e[Specialization Choice]#n\r\n\r\n"
                sub_menu += "Please select your specialization:\r\n\r\n"
                for sb in sub_branches:
                    sub_menu += "#L" + str(sb) + "##b" + JobConstants.getCleanJobName(sb) + "#k (ID: " + str(sb) + ")#l\r\n"
                sub_sel = sm.sendNext(sub_menu)
                if sub_sel > 0:
                    chosen = sub_sel

            final_target = JobConstants.getTargetJobForLevel(chosen, level, sub_job)
            chr.setJob(final_target)
            chr.maxSkills()
            sm.sendSayOkay("#fs13##bCongratulations!#k\r\n\r\n"
                           "You have successfully advanced to #e" + JobConstants.getCleanJobName(final_target) + " (" + str(final_target) + ")#n!\r\n\r\n"
                           "All your skills (1st - 4th Job) have been refreshed and maximized!")
            return

    # 3. Linear progression
    target = JobConstants.getTargetJobForLevel(cur_job, level, sub_job)
    if target != cur_job:
        chr.setJob(target)
        chr.maxSkills()
        sm.sendSayOkay("#fs13##bCongratulations!#k\r\n\r\n"
                       "You have successfully advanced to #e" + JobConstants.getCleanJobName(target) + " (" + str(target) + ")#n!\r\n\r\n"
                       "All your skills (1st - 4th Job) have been refreshed and maximized!")
    else:
        chr.maxSkills()
        sm.sendSayOkay("#fs13#You have already reached the highest job advancement for your current level:\r\n\r\n"
                       "#e#b" + JobConstants.getCleanJobName(cur_job) + "#k (" + str(cur_job) + ")#n\r\n\r\n"
                       "All your skills (1st - 4th Job) have been refreshed and maximized!")
