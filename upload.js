

const {exec} = require("child_process") ;

const intervalID = setInterval( ()=>{

    const command = `git add . && git commit -m "push data to github by a nodejs script" && git push origin main` ;

    exec( command  , ( error , stdout , stderr )=>{

        if(error){
            console.log(error.message) ;
        }else if( stderr){
            console.log(stderr);
        }else{
            console.log(stdout) ;
        }

    })

} , 20000)



setTimeout( ()=>{

    clearInterval(intervalID)

} , 120000)


