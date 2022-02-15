//player object
function Player(){
    this.Choose = ""
    this.Play = function(){
        if (this.Choose=="batu" && computer.Choose=="batu")this.changeStatus("draw");
        if (this.Choose=="batu" && computer.Choose=="gunting")this.changeStatus("win");
        if (this.Choose=="batu" && computer.Choose=="kertas")this.changeStatus("lose");
        if (this.Choose=="kertas" && computer.Choose=="batu")this.changeStatus("win");
        if (this.Choose=="kertas" && computer.Choose=="gunting")this.changeStatus("lose");
        if (this.Choose=="kertas" && computer.Choose=="kertas")this.changeStatus("draw");
        if (this.Choose=="gunting" && computer.Choose=="batu")this.changeStatus("lose");
        if (this.Choose=="gunting" && computer.Choose=="gunting")this.changeStatus("draw");
        if (this.Choose=="gunting" && computer.Choose=="kertas")this.changeStatus("win");
        if (this.Choose=="" && computer.Choose=="")this.changeStatus("");
    }
    this.changeBG = function(){
        if(this.Choose== "batu"){
            player_batu.style.backgroundColor = "rgb(196, 196, 196)";
            player_kertas.style.backgroundColor = "rgb(156, 131, 95)";
            player_gunting.style.backgroundColor = "rgb(156, 131, 95)";
        }
        if(this.Choose == "gunting"){
            player_batu.style.backgroundColor = "rgb(156, 131, 95)";
            player_kertas.style.backgroundColor = "rgb(156, 131, 95)";
            player_gunting.style.backgroundColor = "rgb(196, 196, 196)";
        }
        if(this.Choose == "kertas"){
            player_batu.style.backgroundColor = "rgb(156, 131, 95)";
            player_kertas.style.backgroundColor = "rgb(196, 196, 196)";
            player_gunting.style.backgroundColor = "rgb(156, 131, 95)";
        }
        if(this.Choose == ""){
            player_batu.style.backgroundColor = "rgb(156, 131, 95)";
            player_kertas.style.backgroundColor = "rgb(156, 131, 95)";
            player_gunting.style.backgroundColor = "rgb(156, 131, 95)";
        }
    }
    this.changeStatus = function(status){
        if (status == "win"){
            stat.innerHTML = "PLAYER 1 <br> WIN";
            stat.classList.add('rectangle');
            stat.style.backgroundColor = "rgb(76, 150, 84)";
            console.log("==PLAYER 1 WIN==");
        }
        if (status == "lose") {
            stat.innerHTML = "COM <br> WIN"
            stat.classList.add('rectangle');
            stat.style.backgroundColor = "rgb(76, 150, 84)";
            console.log("==COMPUTER WIN==");
        }
        if (status == "draw") {
            stat.innerHTML = "DRAW";
            stat.classList.add('rectangle');
            stat.style.backgroundColor = "rgb(3, 91, 12)";
            console.log("== DRAW ==");
        }
        if (status == "") {
            stat.innerHTML = "VS";
            stat.classList.remove('rectangle');
            stat.style.backgroundColor = "rgb(156, 131, 95)";
            console.log("==RESET MATCH==");
        }
    }
}

//computer object
function Computer(){
    this.Choose = ""
    this.changeBG = function(){
        if(this.Choose== "batu"){
            com_batu.style.backgroundColor = "rgb(196, 196, 196)";
            com_kertas.style.backgroundColor = "rgb(156, 131, 95)";
            com_gunting.style.backgroundColor = "rgb(156, 131, 95)";
        }
        if(this.Choose == "gunting"){
            com_batu.style.backgroundColor = "rgb(156, 131, 95)";
            com_kertas.style.backgroundColor = "rgb(156, 131, 95)";
            com_gunting.style.backgroundColor = "rgb(196, 196, 196)";
        }
        if(this.Choose == "kertas"){
            com_batu.style.backgroundColor = "rgb(156, 131, 95)";
            com_kertas.style.backgroundColor = "rgb(196, 196, 196)";
            com_gunting.style.backgroundColor = "rgb(156, 131, 95)";
        }
        if(this.Choose == ""){
            com_batu.style.backgroundColor = "rgb(156, 131, 95)";
            com_kertas.style.backgroundColor = "rgb(156, 131, 95)";
            com_gunting.style.backgroundColor = "rgb(156, 131, 95)";
        }
    }
    this.randomPick = function(){
        let random = Math.floor(Math.random() * 3);
        if (random == 0) return "batu";
        if (random == 1) return "gunting";
        if (random == 2) return "kertas";
    }
}

let player1 = new Player();
let computer = new Computer();

document.getElementById("player_batu").onclick = function(){
    player1.Choose = "batu";
    console.log("player 1 = "+player1.Choose);
    player1.changeBG();
    computer.Choose = computer.randomPick();
    console.log("computer = "+computer.Choose);
    player1.Play();
    computer.changeBG();
}

document.getElementById("player_kertas").onclick = function(){
    player1.Choose = "kertas";
    console.log("player 1 = "+player1.Choose);
    player1.changeBG();
    computer.Choose = computer.randomPick();
    console.log("computer = "+computer.Choose);
    player1.Play();
    computer.changeBG();
}

document.getElementById("player_gunting").onclick = function(){
    player1.Choose = "gunting";
    console.log("player 1 = "+player1.Choose);
    player1.changeBG();
    computer.Choose = computer.randomPick();
    console.log("computer = "+computer.Choose);
    player1.Play();
    computer.changeBG();
}

document.getElementById("refresh").onclick = function(){
    player1.Choose = "";
    console.log("player 1 = "+player1.Choose);
    player1.changeBG();
    computer.Choose = "";   
    console.log("computer = "+computer.Choose);
    computer.changeBG();
    player1.Play();
    console.log("refresh");
}