import React, {useState,useEffect} from 'react';;
let myInterval = false;

    const Timer = (props) => {
        const {initialMinute ,initialSeconds ,finish,setfinish} = props;
        const [ minutes, setMinutes ] = useState(initialMinute);
        const [seconds, setSeconds ] =  useState(initialSeconds);
        useEffect(() => {
            if(minutes <= 0 || (minutes === 0 && seconds === 0)){
                localStorage.removeItem("sec")
                localStorage.removeItem("min")
                localStorage.removeItem("start")
            }
            else
            {if(typeof(window)!== undefined){
                localStorage.setItem("sec",remainingTime2())
                
                localStorage.setItem("min",remainingTime())
            }}
            if(minutes === 0 && seconds === 0){
                localStorage.removeItem("sec")
                localStorage.removeItem("min")
                localStorage.removeItem("start")
            }
        }, [])
        useEffect(()=>{
            if(minutes <= 0 || (minutes === 0 && seconds === 0)){
                localStorage.removeItem("sec")
                localStorage.removeItem("min")
                localStorage.removeItem("start")
            }
        })
        const remainingTime = ()=>{
            
           var d =parseInt(localStorage.getItem("start"))
           var d1 = Date.now()
           var t = parseInt(initialMinute) - parseInt((d1 - d)/60000) 
           var s =  parseInt((d1 - d)/1000)
           return t-1
        }
        const remainingTime2 = ()=>{
            
            var d =parseInt(localStorage.getItem("start"))
            var d1 = Date.now()
            var s =  60 - parseInt((d1 - d)/1000) % 60
            return s
         }
        const func = (sec,min)=>{ if(!myInterval)
            myInterval= setInterval( async () => {
                // var sec 
                // if(minutes === 0 && seconds === 0){
                //     clearInterval(myInterval)
                // }
                    // remainingTime()
                    if (sec > 0) {
                        sec=sec-1
                    }
                    else if (sec=== 0) {
                        if (parseInt(min) === 0) {
                            sec=0
                            min=0
                        } else {
                            min=min-1
                            sec=59
                        }
                    } 
                    
                    if(typeof(window)!== undefined && localStorage.getItem("sec")){
                        console.log("func")
                        localStorage.setItem("sec",sec)
                        localStorage.setItem("min",min)
                        const news = await Promise.resolve(parseInt(localStorage.getItem("sec"))) 
                        const newm = await Promise.resolve(parseInt(localStorage.getItem("min"))) 
                        const p1 = await Promise.resolve(setMinutes(newm))
                        const p2 = await Promise.resolve(setSeconds(news))
                    }
                    console.log(minutes,"rahul bhaiya",seconds,"minutes")
                }, 1000)}
        const call = async ()=>{
                        console.log("call")
            const news = await Promise.resolve(parseInt(localStorage.getItem("sec"))) 
            const newm = await Promise.resolve(parseInt(localStorage.getItem("min"))) 
            const p1 = await Promise.resolve(setMinutes(newm))
            const p2 = await Promise.resolve(setSeconds(news))
            // const newm = await localStorage.getItem("min")
            console.log("Anshika",news,newm)
            console.log("Anshika2",news,newm)
            
            func(news,newm)
        }
        useEffect(()=>{
            console.log(minutes,typeof minutes,"debraj bhaiya",props)
            
            // return ()=> {
            //     clearInterval(myInterval);
            //   };
            
            console.log(seconds,"use")
            // func(seconds,minutes)
            call()
            
        },[]);
        
        return (
            <div>
            { minutes <= 0 || (minutes === 0 && seconds === 0)
                ? setfinish(true)
                : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
            }
            </div>
        )
    }
    
    export default Timer;