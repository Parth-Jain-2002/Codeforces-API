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

function updateUserInfo(response){
    document.getElementById("mrating").textContent = response.result[0]["maxRating"]
    document.getElementById("crating").textContent = response.result[0]["rating"]
    document.getElementById("mrank").textContent = response.result[0]["maxRank"]
    document.getElementById("mrank").textContent = document.getElementById("mrank").textContent.toUpperCase()
    document.getElementById("crank").textContent = response.result[0]["rank"]
    document.getElementById("crank").textContent = document.getElementById("crank").textContent.toUpperCase()
}

async function SubmitForm(){
    let x = document.getElementById("userHandle").value;
    const url=`https://codeforces.com/api/user.info?handles=${x}`
    const data = await fetch(url);
    const response = await data.json();
    updateUserInfo(response)
}
getData();