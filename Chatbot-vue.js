var app = new Vue({
    el:"#app",
    data:{
        chats:[],
        welcomeMessages:[
            {
                msg: "Hello, Welcome to Prisci Bot",
                by: "robot"
            },
            {
                msg: "I am always happy to meat strangers",
                by: "robot"
            },
            {
                msg: "can you tell me your name ?",
                by: "robot"
            }
        ],
        userInput:"",
        hasUnknown: false,
        unKnownQuest: "",
        dontKnowSentences:[
            "(.)*(don't|dont)(.)+(know|knw)",
            "(.)*no(.)*"
        ],
        knowledge: {
            "hello": "hi",
            "hi": "hello, What's your name?",
            "^hello(.)+": "hi",
            "how are you doing": "I am doing fine and you?",
            "xup": "I am cool and you?",
            "(.)*(how|hw)(.)*(you|u|ya)(.)*(doing|doin|do)(.)*":"Doing great",
            "alright":"Yeah, Good"
        },
    },
    mounted: function() {
        console.log(this.welcomeMessages);
        for(var i = 0;i < this.welcomeMessages.length;i++){
            console.log(this.welcomeMessages[i].msg);
  
                this.pushMsg(this.welcomeMessages[i],i*1000);
        }

    },

    methods:{
        pushMsg: function(msg,delay){
            setTimeout(() =>{
                this.chats.push(msg)
            },delay)
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
        containsDontKnow(msg){
            for(var x = 0; x < this.dontKnowSentences.length;x++){
                var regx = new RegExp(this.dontKnowSentences[x],"i");
                if(regx.test(msg)){
                    return true;
                }
            }
            return false;
            },

        generateResponse: function(){
            var resp = this.getObjValue(this.userInput.toLowerCase());	
            if(resp == false && !this.hasUnknown){
                this.hasUnknown = true;
                this.unKnownQuest = this.userInput.toLowerCase();
                var robotRsp = {
                msg: "Sorry, I don't get that, can you tell me response to that?",
                by: "robot"
            };
                var userRsp = {
                msg: this.userInput,
                by: "user"
            };
            this.chats.push(userRsp);
            this.chats.push(robotRsp);
            return;
            }
            console.log(this.containsDontKnow(resp));
        
            if (this.hasUnknown && !this.containsDontKnow(this.userInput)) {
                this.knowledge[this.unKnownQuest] = this.userInput;
                this.hasUnknown = false;
                this.unKnownQuest = "";
                var robotRsp = {
                msg: "Thank you for teaching me that! I won't forget i promise",
                by: "robot"
            };
            }else if(this.hasUnknown && this.containsDontKnow(this.userInput)){
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
                msg: this.userInput,
                by: "user"
            };
        
            this.chats.push(userRsp);
            setTimeout(() => {
                this.chats.push(robotRsp);
            },1000)
        
            
            },
        submitForm: function(e) {
            e.preventDefault();
            this.generateResponse();
            this.userInput = "";

            setTimeout(() => {
                this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight - this.$refs.scroll.clientHeight;
            },500)

            setTimeout(() => {
                this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight - this.$refs.scroll.clientHeight;
            },1500)

        }    
    }
})