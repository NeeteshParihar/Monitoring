
import { exec } from "child_process";

// const {exec} = require("child_process") ;

 async function execute(command , message = ""){

    console.log(`start ${command}`)
     exec(command, (error, stdout, stderr) => {


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

    return true ;

    // console.log(res) ;
}

const intervalID = setInterval( async() => {

    const update = 'git add .';
    const commit = `git commit -m "add"`;
    const push = "git push origin main";

    const command = `
  git add . && 
  (git diff --cached --quiet || git commit -m "push data to github by a nodejs script") && 
  git push origin main
`;

//    await  execute(update );

//     await  execute(commit );
    
   await execute(command , "uploadin...");

}, 5000)



setTimeout(() => {

    clearInterval(intervalID)

}, 120000);


