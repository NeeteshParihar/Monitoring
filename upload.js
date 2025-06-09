
import { exec } from "child_process";

// const {exec} = require("child_process") ;

async function execute(command , message = ""){

    console.log(`start ${command}`)
     const res =  exec(command, (error, stdout, stderr) => {


        if (error) {
            console.log(error.message);
        } else if (stderr) {
            console.log(stderr);
        } else {
            console.log(message);
            console.log(stdout);
        }

    })

    console.log(`finish ${command}`) ;


    // console.log(res) ;
}

const intervalID = setInterval( async() => {

    const update = 'git add .';
    const commit = `git commit -m "add"`;
    const push = "git push origin main";

    execute(update );

    execute(commit );
    
    execute(push , "uploadin...");

}, 5000)



setTimeout(() => {

    clearInterval(intervalID)

}, 120000);


