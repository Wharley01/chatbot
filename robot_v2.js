var chatBot = {
	loopcontainer: document.getElementById("lcontainer"), //This is the container for my loop
	uInput: document.getElementById("userText"),	//This is the box that holds user input
	uForm: document.getElementById("enterClick"), 	 //This is the event that will trigger when "enter" is clicked
	scroller: document.getElementById("scroll"),
	hasUnknown: false,
	unKnownQuest: "",
	dontKnowSentences:["(.)*(don't|dont)(.)+(know|knw)","(.)*no(.)*"],
	messages: [],
	knowledge: {	
		"what is your name": "My name is Robocom",				//This is the robot memeory that holds chats between robot and user
		""
		"^hello(.)*": "Hi",
		"(^hello$|helo|elo)": "Hi",
		"how are you doing": "I am doing great",
		"hey robot": "hi",
		"(how are you doing|ao re u dng)": "I amd doing great",
		"xup": "I am cool and you?",
		"same": "ok",
		"same here": "ok",
		"hi": "hello",
		"who created you": "I don't know",
		"what is the date of your creation": "19-20-2018",
		"who is okiki": "okiki is from Ajibola's family, he is short, chocolate in complexion and loves eating so much",
		"who is Jumoke": "Jumoke is from Ajibola's family",
		"^hello$": "hi",
		"^hello(.)+": "hi",
		"how are you doing": "I am doing fine and you?",
		"xup": "I am cool and you?",
		"(.)*(how|hw)(.)*(you|u|ya)(.)*(doing|doin|do)(.)*":"Doing great",

	},
	containsDontKnow(msg){
	for(var x = 0; x < this.dontKnowSentences.length;x++){
		var regx = new RegExp(this.dontKnowSentences[x]);
		if(regx.test(msg)){
			return true;
		}
	}
	return false;
	},
	getObjValue: function(_key){
		for(var key in this.knowledge){ 
			var reg = new RegExp(key);
			if(reg.test(_key)){
				return this.knowledge[key];
			}
		}

		return false;

	},
	responseGenerator: function(){			//This is the function that will push robot and user input into array and check what the user inputted
		var conv = this.getObjValue(this.uInput.value.toLowerCase());
		if(!conv){
				//This will change what the user pressed to lowercase to the , because the Robot is case sensitive.
		var robotConv = {		
			msg: "Please I don't know it, I am still learning",		
			by: "robot"					//This is the object which holds robot conversation that will be pushed to the array
		} 
		var userConv = {					//This is the object which holds user conversation that will be pushed to the array
			msg: this.uInput.value,
			by: "user"
		}
	}else{
		var robotConv = {		
			msg: conv,		
			by: "robot"					//This is the object which holds robot conversation that will be pushed to the array
		} 
		var userConv = {					//This is the object which holds user conversation that will be pushed to the array
			msg: this.uInput.value,
			by: "user"
		}
	}
		this.messages.push(userConv);
		this.messages.push(robotConv);		//This is where the robot object is pushed to the array "messages".
	
		console.log("Push my chats to messages");
	},
	printScreen: function(){				//This is the function that will loop through the array of chats i.e "messages" by both user and robot
		var temp = "";
		for(i = 0;i < this.messages.length; i++){		//This is where our loop start
			if(this.messages[i].by == "robot"){			//This conditional statement will loop through the array and check if the conversation is by robot and will show the robot chat but if it is not by robot, it will go the next condition
				temp += `								
				<div class="msg-wrap">
					<div class="msg">${this.messages[i].msg}</div>
				</div>
				`		//This "temp" is our temporary memory that will save the loop by robot 
			}else{		//This is the conditional statement that will trigger if the conversation is not by the robot
				temp += `<div class="msg-wrap">
							<div class="msg right">${this.messages[i].msg}</div>
						</div>`
			}			//This will trigger when when the conversation is by the user
		}
		this.loopcontainer.innerHTML = temp;		//This will finally show the temp that is working in background
		this.uInput.value = "";	
		console.log("This will now show the html")					//This will empty the input field when the user have entered their chats
	}

	
};

var uInput =  function(e){							//This is function of the parameter of the event chatBot.uForm, it is put here so that it will be re-useable
	e.preventDefault();			
	if(chatBot.uInput.value.trim().length > 0){
						//This will prevent the page from reloading.
	chatBot.responseGenerator();					//This will show the function of responseGenerator and generate response for the user
	chatBot.printScreen();						//This function will show the loop in function when sumbit button is clicked
	chatBot.scroller.scrollTop = chatBot.scroller.scrollHeight - chatBot.scroller.clientHeight;
}
}

chatBot.uForm.addEventListener('submit', uInput);		//This is the event that is attached to our form: onsubmit and the function that will trigger.