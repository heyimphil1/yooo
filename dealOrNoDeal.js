//create an array that contains the values
var prizes = [
    "Smile", "Slap ass (5x)", "Show Feet", "Doggy With Panties", "Flash Ass", "Flash Boobs", "Ahegao", "Flash Pussy", "Spank Ass (10x)",
    "Blowjob", "Whip Spank (15x)", "Top Off (5min)", "CONTROL lush (5min)", "Nipple Clamp", "Top Off (15min)",
    "Ride Pillow (10min)", "Lotion Boobs", "Naked (10min)", "Tail Buttplug", "CONTROL lush (20min)", "Fingering pussy (5min)", "Naked (30min)","Dildo in Pussy (5 min)", "Cum Show"
];
var prizeValues = {
    "Smile": 1,
    "Slap ass (5x)": 2,
    "Show Feet": 3,
    "Doggy With Panties": 4,
	"Flash Ass": 5,
	"Flash Boobs": 6,
	"Ahegao": 7,
	"Flash Pussy": 8,
	"Spank Ass (10x)": 9,
	"Blowjob": 10,
	"Whip Spank (15x)": 11,
	"Top Off (5min)": 12,
	"CONTROL lush (5min)": 13,
	"Nipple Clamp": 14,
	"Top Off (15min)": 15,
	"Ride Pillow (10min)": 16,
	"Lotion Boobs": 17,
	"Naked (10min)": 18,
	"Tail Buttplug": 19,
	"CONTROL lush (20min)": 20,
	"Fingering pussy (5min)": 21,
	"Naked (30min)": 22,
	"Dildo in Pussy (5 min)": 23,
	"Cum Show": 24,
};
//all elements
var boxes = document.querySelectorAll(".box");
var boxNr = document.querySelectorAll(".boxNr");
var boxValue = document.querySelectorAll(".boxValue");
var moneyShow = document.querySelectorAll(".moneyShow");
var bigMoneys = document.getElementById("bigMoneys");
var bank = document.getElementById("bank");
var yesDeal = document.getElementById("yesDeal");
var noDeal = document.getElementById("noDeal")
var bankOffer = document.querySelector(".bankOffer");
var prevOffers = document.getElementById("prevOffers");
var finished = document.getElementById("finished");
var chosenBox = 0;
var previousOffers = [];
var openedBoxes = 0;
var winnings = document.getElementById("winnings");
var lastDeal = document.getElementById("lastDeal");	
var keepBox = document.getElementById("keepBox");
var changeBox = document.getElementById("changeBox");
var winningBox = 0;
var chooseBox = document.getElementById("chooseBox");
var chooseBoxButton =  document.querySelectorAll(".chooseBoxButton");
var tutorial = document.getElementById("tutorial");
var seeTutorialButton = document.getElementById("seeTutorialButton");

//option to see tutorial
seeTutorialButton.addEventListener("click", function(){
	tutorial.style.display = "block";
})
//close tutorial
tutorialButton.addEventListener("click", function(){
	tutorial.style.display = "none";
})
//choosing a box
function chooseBox(){
	chooseBox.style.display = "block";
	for(var i = 0; i < chooseBoxButton.length; i++){
		chooseBoxButton[i].addEventListener("click", function(){
			chosenBox = this.textContent;
			chooseBox.style.display = "none"; 
			addValuesNStuff();
		})
	}
}
//money displays style
var fr = 0;
var fg = 30;
var fb = 79;
var sr = 200;
var sg = 15;
var sb = 0;
for(var i = 0; i < moneyShow.length; i++){
	var moneyDisplay = "" + prizes[i];
	moneyShow[i].textContent = moneyDisplay;
	if(i < moneyShow.length/2){
		moneyShow[i].classList.add("rounded1");
		moneyShow[i].style.backgroundColor = "rgb(" + fr +", " + fg + ", " + fb + ")";
		fb += 8;
		fg += 5;
	} else {
		moneyShow[i].classList.add("rounded2");
		moneyShow[i].style.backgroundColor = "rgb(" + sr +", " + sg + ", " + sb + ")";
		sr -= 12;
		sg -= 1;
	}
}
//shuffle values
var shuffledValues = shuffleArray(prizes);
//choose a box
chooseBox.style.display = "block";
for(var i = 0; i < chooseBoxButton.length; i++){
		chooseBoxButton[i].addEventListener("click", function(){
			chosenBox = this.textContent;
			hide(chooseBox);
			addValuesNStuff();
		})
	}
//main game logic
function addValuesNStuff(){
	for(var i = 0; i < boxes.length; i++){
		//assign values to boxes and hide them
		boxValue[i].textContent = "" + shuffledValues[i];
		boxValue[i].classList.add("hideValue");
		//open box
		(function(j){
			if(chosenBox !== boxNr[j].textContent){
				//opening boxes logic
				boxes[j].addEventListener("click", function(){
					boxValue[j].classList.remove("hideValue"); 
 					boxValue[j].classList.add("showValue");
 					boxNr[j].classList.add("hideValue");
					this.classList.add("openedBox");
					openedBoxes++;
					//remove opened boxes amounts from the array
					for(var i = 0; i < shuffledValues.length; i++){
						if("$" + shuffledValues[i] === boxValue[j].textContent){
							shuffledValues.splice([i], 1);
						}
					}
					//remove opened boxes amounts from display
					for(var i = 0; i < moneyShow.length; i++){
						if(moneyShow[i].textContent === boxValue[j].textContent){
							if(i < moneyShow.length/2){
								moneyShow[i].classList.add("hideValueLeft");
								} else {
								moneyShow[i].classList.add("hideValueRight");
							}
						}
					}
					//show bank offer
					if (openedBoxes === 5 || openedBoxes === 10 || openedBoxes === 15 || openedBoxes === 18 || openedBoxes === 21) {
    show(bank);
    var offerAmount = calcOffer();
    var prizeName = getPrizeNameFromValue(offerAmount);
    bankOffer.textContent = prizeName;
}

// Function to get the prize name from its value
function getPrizeNameFromValue(value) {
    for (var prize in prizeValues) {
        if (prizeValues[prize] === value) {
            return prize;
        }
    }
    return "Unknown Prize"; // Default value if no match is found
}
					//if two boxes remain, prompt user to pick one of the boxes
					if(openedBoxes === 22){
						winnings.textContent = winningBox;
						lastDeal.style.display = "block";
					}
				}, {once: true});
			} else {
				boxes[j].classList.add("chosenBox");
				winningBox = boxValue[j].textContent;
				console.log("what");
			}
		})(i);	
	}
}
//bank offer logic
noDeal.addEventListener("click", function(){
	bank.style.display = "none";
	previousOffers.push(bankOffer.textContent);
	prevOffers.textContent = "Previous Offers: " + previousOffers;
});
yesDeal.addEventListener("click", function(){
	bank.style.display = "none";
	winnings.textContent = bankOffer.textContent;
	finish();
});
//keeping or changing box logic
keepBox.addEventListener("click", function(){
	lastDeal.style.display = "none";
	finish();
});

changeBox.addEventListener("click", function(){
	lastDeal.style.display = "none";
	for(var i = 0; i < shuffledValues.length; i++){
		if(shuffledValues[i] !== winningBox)
			winnings.textContent = "$" + shuffledValues[i];
	}
	finish();
})
//bank offer logic function
//bank offer logic function
function calcOffer() {
    var remainingValues = shuffledValues.map(function(prize) {
        return prizeValues[prize];
    });

    var valuesSum = remainingValues.reduce(function(a, b) { return a + b; }, 0);
    var averageValue = valuesSum / shuffledValues.length;

    var adjustment = Math.floor(Math.random() * 6); // Random value between 0 and 5 (inclusive)
    var sign = Math.random() < 0.5 ? -1 : 1; // Randomly choose to add or subtract

    var offer = Math.round(averageValue + (adjustment * sign));

    return offer;
}
// Display the offerPrize in your game interface
function show(div){
	div.style.display = "block";
}

function hide(div){
	div.style.display = "none"
}

function finish(){
	finished.style.display = "block";
}
//shuffling the array
function shuffleArray(array){
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

//FUNCTION FROM STACK OVERFLOW. CREDITS: jfriend00 on Stack Overflow!
function animateValue(id, start, end, duration) {    
    var obj = id;
    var range = end - start;
    var minTimer = 50;
    var stepTime = Math.abs(Math.floor(duration / range));
    
    stepTime = Math.max(stepTime, minTimer);

    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;
  
    function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(end - (remaining * range));
        obj.innerHTML = "" + value;
        if (value == end) {
            clearInterval(timer);
        }
    }    
    timer = setInterval(run, stepTime);
    run();
}
