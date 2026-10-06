package net.swordie.ms.scripts;

import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.util.DataPrinter;

import javax.script.Bindings;
import javax.script.Invocable;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import static net.swordie.ms.ServerConstants.EXPIRED_SCRIPT_TIME;
import static net.swordie.ms.scripts.ScriptManagerImpl.INTENDED_NPE_MSG;

public class ScriptInfo {
    private final Lock lock = new ReentrantLock();
    private ScriptType scriptType;
    private Bindings bindings;
    private int parentID;
    private String scriptName;
    private Invocable invocable;
    private Integer responseInteger;
    private String responseString;
    private Mob responseMob;
    private int objectID;
    private String fileDir;
    private boolean isActive;

    public ScriptInfo(ScriptType scriptType, Bindings bindings, int parentID, String scriptName) {
        this.scriptType = scriptType;
        this.parentID = parentID;
        this.scriptName = scriptName;
        this.bindings = bindings;
        this.responseInteger = null;
        this.responseString = null;
        this.responseMob = null;
    }

    public ScriptType getScriptType() {
        return scriptType;
    }

    public void setScriptType(ScriptType scriptType) {
        this.scriptType = scriptType;
    }

    public Bindings getBindings() {
        return bindings;
    }

    public void setBindings(Bindings bindings) {
        this.bindings = bindings;
    }

    public int getParentID() {
        return parentID;
    }

    public void setParentID(int parentID) {
        this.parentID = parentID;
    }

    public String getScriptName() {
        return scriptName;
    }

    public void setScriptName(String scriptName) {
        this.scriptName = scriptName;
    }

    public Invocable getInvocable() {
        return invocable;
    }

    public void setInvocable(Invocable invocable) {
        this.invocable = invocable;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        this.isActive = active;
    }

    public int getObjectID() {
        return objectID;
    }

    public void setObjectID(int objectID) {
        this.objectID = objectID;
    }

    public String getFileDir() {
        return fileDir;
    }

    public void setFileDir(String fileDir) {
        this.fileDir = fileDir;
    }

    public void reset() {
        addResponseInteger(null);
        addResponseString(null);
        addResponseMob(null);
        setParentID(0);
        setScriptName("");
        setInvocable(null);
        setActive(false);
    }

    public void addResponseInteger(Integer response) {
        this.responseInteger = response;
        synchronized (lock) {
            try {
                lock.notifyAll();
            } catch (Exception e) {
                DataPrinter.send(DataPrinter.SCRIPTS, e);
            }
        }
    }

    public void addResponseString(String response) {
        this.responseString = response;
        synchronized (lock) {
            try {
                lock.notifyAll();
            } catch (Exception e) {
                DataPrinter.send(DataPrinter.SCRIPTS, e);
            }
        }
    }

    public void addResponseMob(Mob response) {
        this.responseMob = response;
        synchronized (lock) {
            try {
                lock.notifyAll();
            } catch (Exception e) {
                DataPrinter.send(DataPrinter.SCRIPTS, e);
            }
        }
    }

    public Integer awaitResponseInteger(int timeout) {
        if (responseInteger != null) {
            return responseInteger;
        }
        long waitTime = timeout > 0 ? timeout : EXPIRED_SCRIPT_TIME;
        long start = System.currentTimeMillis();
        synchronized (lock) {
            try {
                System.out.printf("[Started Wait] script %s%n", getScriptName());
                lock.wait(waitTime);
            } catch (InterruptedException e) {
                DataPrinter.send(DataPrinter.SCRIPTS, e);
            }
        }
        Integer result = responseInteger;
        this.responseInteger = null;
        long total = System.currentTimeMillis() - start;
        System.out.printf("[Completed Wait] script %s trong %d ms%n", getScriptName(), total);
        return result;
    }

    public String awaitResponseString(int timeout) {
        if (responseString != null) {
            return responseString;
        }
        long waitTime = timeout > 0 ? timeout : EXPIRED_SCRIPT_TIME;
        long start = System.currentTimeMillis();
        synchronized (lock) {
            try {
                System.out.printf("[Started Wait] script %s%n", getScriptName());
                lock.wait(waitTime);
            } catch (InterruptedException e) {
                DataPrinter.send(DataPrinter.SCRIPTS, e);
            }
        }
        String result = responseString;
        this.responseString = null;
        long total = System.currentTimeMillis() - start;
        System.out.printf("[Completed Wait] script %s trong %d ms%n", getScriptName(), total);
        return result;
    }

    public Mob awaitResponseMob(int timeout) {
        if (responseMob != null) {
            return responseMob;
        }
        long waitTime = timeout > 0 ? timeout : EXPIRED_SCRIPT_TIME;
        long start = System.currentTimeMillis();
        synchronized (lock) {
            try {
                System.out.printf("[Started Wait] script %s%n", getScriptName());
                lock.wait(waitTime);
            } catch (InterruptedException e) {
                DataPrinter.send(DataPrinter.SCRIPTS, e);
            }
        }
        Mob result = responseMob;
        this.responseMob = null;
        long total = System.currentTimeMillis() - start;
        System.out.printf("[Completed Wait] script %s trong %d ms%n", getScriptName(), total);
        return result;
    }
}
