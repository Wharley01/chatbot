

var robot = {
	container: document.getElementById("container"),
	inputForm: document.getElementById("submitForm"),
	uInput: document.getElementById("userInput"),
	scroller: document.getElementById("scroll"),
	hasUnknown: false,
	unKnownQuest: "",
	dontKnowSentences:["(.)*(don't|dont)(.)+(know|knw)","(.)*no(.)*"],
	chats: [], 
	knowledge: {
		"^hello$": "hi",
		"^hello(.)+": "hi",
		"how are you doing": "I am doing fine and you?",
		"xup": "I am cool and you?",
		"(.)*(how|hw)(.)*(you|u|ya)(.)*(doing|doin|do)(.)*":"Doing great",
		"alright":"Yeah, Good"
	},
	containsDontKnow(msg){
	for(var x = 0; x < this.dontKnowSentences.length;x++){
		var regx = new RegExp(this.dontKnowSentences[x],"i");
		if(regx.test(msg)){
			return true;
		}
	}
	return false;
	},
	getObjValue: function(_key){
		for(var key in this.knowledge){ 
			var reg = new RegExp(key,"i");
			if(reg.test(_key)){
				return this.knowledge[key];
			}
		}

		return false;

	},
	generateResponse: function(){
	var resp = this.getObjValue(this.uInput.value.toLowerCase());	
	if(resp == false && !this.hasUnknown){
		this.hasUnknown = true;
		this.unKnownQuest = this.uInput.value.toLowerCase();
		var robotRsp = {
		msg: "Sorry, I don't get that, can you tell me response to that?",
		by: "robot"
	};
		var userRsp = {
		msg: this.uInput.value,
		by: "user"
	};
	this.chats.push(userRsp);
	this.chats.push(robotRsp);
	return;
	}
	console.log(this.containsDontKnow(resp));

	if (this.hasUnknown && !this.containsDontKnow(this.uInput.value)) {
		this.knowledge[this.unKnownQuest] = this.uInput.value;
		this.hasUnknown = false;
		this.unKnownQuest = "";
		var robotRsp = {
		msg: "Thank you for teaching me that! I won't forget i promise",
		by: "robot"
	};
	}else if(this.hasUnknown && this.containsDontKnow(this.uInput.value)){
		var robotRsp = {
		msg: "Oh, No problem, I will Try to learn from others then.",
		by: "robot"
	};
		this.hasUnknown = false;
		this.unKnownQuest = "";
	}else if(!this.hasUnknown){
		var robotRsp = {
		msg: resp,
		by: "robot"
	};
	}

	
	var userRsp = {
		msg: this.uInput.value,
		by: "user"
	};

	this.chats.push(userRsp);
	this.chats.push(robotRsp);

	
	},
	writeToScreen: function(){
		var temp = "";
		for(i = 0;i < this.chats.length; i++){
			if(this.chats[i].by == "robot"){
				temp += `<div class="msg-wrap">
					<div class="msg">${this.chats[i].msg}</div><br/>
				</div>
				`
			}else{
				temp += `<div class="msg-wrap">
					<div class="msg right">${this.chats[i].msg}</div><br/>
				</div>
				`
			}
			
		}

		this.container.innerHTML = temp;
		this.uInput.value = ""
	}
};

var submitForm = function (e){
	e.preventDefault();
	if(robot.uInput.value.trim().length > 0){
		robot.generateResponse();
		robot.writeToScreen();
		robot.scroller.scrollTop = robot.scroller.scrollHeight - robot.scroller.clientHeight;
	}
}


robot.inputForm.addEventListener("submit", submitForm);





 