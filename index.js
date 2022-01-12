const url= "https://codeforces.com/api/contest.list";
const upcoming = [];
async function getData(){
    const data = await fetch(url);
    const response = await data.json();
    console.log(response.result);
    for(let i of response.result){
        if(i.phase=="BEFORE"){
            upcoming.push(i);
        }
    }
    console.log(upcoming);
}

async function updateUserInfo(x){
    const url=`https://codeforces.com/api/user.info?handles=${x}`
    const data = await fetch(url);
    const response = await data.json();
    document.getElementById("mrating").textContent = response.result[0]["maxRating"]
    document.getElementById("crating").textContent = response.result[0]["rating"]
    document.getElementById("mrank").textContent = response.result[0]["maxRank"]
    document.getElementById("mrank").textContent = document.getElementById("mrank").textContent.toUpperCase()
    document.getElementById("crank").textContent = response.result[0]["rank"]
    document.getElementById("crank").textContent = document.getElementById("crank").textContent.toUpperCase()
}


async function updateUserProblem(x,y){
    const url=`https://codeforces.com/api/user.status?handle=${x}`
    const data = await fetch(url);
    const response = await data.json();
    const dat = response.result;
    const ctime = Math.floor(new Date().getTime()/1000);
    let AC = 0, WA =0, TLE = 0 , MLE =0 , RE=0;
    console.log(dat.length);
    for(let i of dat){
        if(ctime-i["creationTimeSeconds"]<86400*y){
            console.log("HI");
            if(i["verdict"]=="MEMORY_LIMIT_EXCEEDED"){
                MLE++;
            }
            if(i["verdict"]=="TIME_LIMIT_EXCEEDED"){
                TLE++;
            }
            if(i["verdict"]=="RUNTIME_ERROR"){
                RE++;
            }
            if(i["verdict"]=="WRONG_ANSWER"){
                WA++;
            }
            if(i["verdict"]=="OK"){
                AC++;
            }
        }
    }
    document.getElementById("AC").textContent = AC
    document.getElementById("WA").textContent = WA
    document.getElementById("TLE").textContent = TLE
    document.getElementById("MLE").textContent = MLE
    document.getElementById("RE").textContent = RE
}

async function SubmitForm(){
    let x = document.getElementById("userHandle").value;
    let y = document.getElementById("days").value;
    y = parseInt(y);
    updateUserProblem(x,y);
    updateUserInfo(x);
}

getData();