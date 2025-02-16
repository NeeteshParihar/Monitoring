import fs from 'fs';
import psList from 'ps-list';
import os from 'os'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




const loggingPATH =  `${__dirname}/activity_logs.json` ;
let knownProcesses = new Map();



const SYSTEM_PROCESSES = new Set([
    "ps",
    "bash",
    "sh",
    "zsh",
    "ttm",
    "u17",
    "systemd",
    "dbus-daemon",
    "snapd",
    "Xorg",
    "gnome-session",
    "gdm",
    "pulseaudio",
    "pipewire",
    "chrome_crashpad",
    "crashpad_handle",
    "sleep" ,
    "spuUsage.sh",
    "u16:2-events_power_efficient",
    "0:2-cgroup_destroy ",
    "u17:6-ttm ",
    "0:2 "

]);

let flag = 0 ;


const lastProcessTriggerd = new Map() ;

const LOG_INTERVAL = 5000; // 5 seconds buffer

const isUserProcess = (process)=>{

    const { ppid, uid, name } = process;

    if(SYSTEM_PROCESSES.has(name))
            return false ;
    if(ppid === 1  || uid === 0)
            return false ;
        
    return true ; 


}




const logToFile = (app, pid) => {

    const currTime = Date.now() ;


    if(lastProcessTriggerd.has(pid) && currTime - lastProcessTriggerd.get(pid) < LOG_INTERVAL){
        return ;
    }

    lastProcessTriggerd.set(pid , app) ;

    const logMessage = {
        time: new Date().toISOString(),
        application: `${app} - PID : ${pid} `
    };

    fs.appendFile(loggingPATH, JSON.stringify(logMessage) + "\n", (err) => {
        if (err) console.error("Error writing to file:", err);
    });
};

const monitorProcesses = async () => {
    const currentProcesses = new Map();
    const processList = await psList();

    // console.log("Fetching current processes...");

    for (let process of processList) {
        if (isUserProcess(process)) {
            currentProcesses.set(process.pid, process.name);
        }
    }

    
    if(flag === 0){
    knownProcesses = currentProcesses;
    flag ++ ;
    return ;
    

    }

    // Check for newly started applications
    for (let [pid, name] of currentProcesses) {
        if (!knownProcesses.has(pid)) {
            logToFile(`${name} : Opened` , pid);
        }
    }

    // Check for closed applications
    for (let [pid, name] of knownProcesses) {
        if (!currentProcesses.has(pid)) {
            logToFile(`${name} : closed ` , pid);
        }
    }

    knownProcesses = currentProcesses;
};

setInterval(monitorProcesses, 5000);
console.log(`Process monitoring started. Logging file path: ${loggingPATH}`);
