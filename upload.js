
import {exec} from "child_process";

// const {exec} = require("child_process") ;


const intervalID = setInterval( ()=>{

    const command = `git add . && git commit -m "add logs" && git remote -v` ;

    exec( command  , ( error , stdout , stderr )=>{


        if(error){
            console.log(error.message) ;
        }else if( stderr){
            console.log(stderr);
        }else{
            console.log("uploaing...");
            console.log(stdout) ;
        }

    })

} , 5000)



setTimeout( ()=>{

    clearInterval(intervalID)

} , 120000) ;


