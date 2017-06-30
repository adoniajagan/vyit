/*-----------------------------------------------------------------------------
This template demonstrates how to use an IntentDialog with a LuisRecognizer to add 
natural language support to a bot. 
For a complete walkthrough of creating this type of bot see the article at
http://docs.botframework.com/builder/node/guides/understanding-natural-language/
-----------------------------------------------------------------------------*/
"use strict";
var request;
var userid;
var score;
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var analyticsService = require('./models/text-analytics');
var path = require('path');
var sql = require('mssql');
var config = {
  user: 'gmi', // update me
  password: 'sa@12345', // update me
  server: 'gmidatabase.database.windows.net',
  database: 'GMI',
  options: {
	  encrypt : true
       //update me
  }
}
sql.connect(config, function (err) {
	if (err != null) {session.send(" err " + err)} ;
    request = new sql.Request();				
});

var useEmulator = (process.env.NODE_ENV == 'development');

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

var bot = new builder.UniversalBot(connector);
//bot.localePath(path.join(__dirname, './locale'));
var count = 1;
var candscore = 30;
var candiatescore = 0;
// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] })
/*
.matches('<yourIntent>')... See details at http://docs.botframework.com/builder/node/guides/understanding-natural-language/
*/
.matches('aboutcomp', (session, args) => {
    saveusersubinput(session,'1','1','AboutGMI',session.message.text,'0');
    session.send('The company is Global Mantra Innovations (GMI), located in Siruseri SIPCOT IT Park, Chennai. Our mantra is "Free Thinking".  GMI is a full life cycle Research and Innovation company focused on providing repeatable, reusable and scalable widgets.');
})
.matches('address', (session, args) => {
     saveusersubinput(session,'1','1','AboutGMI',session.message.text,'0');
    session.send('Global Mantra Innovations, the company, is located in Siruseri SIPCOT IT Park, Chennai.');
})
.matches('affir', (session, args) => {
     saveusersubinput(session,'1','1','AboutGMI',session.message.text,'0');
    session.send('Are there anything else you wish to know about the company? If yes, please continue. If not, type "menu"');
})
.matches('compcult', (session, args) => {
    session.send('Fun at work! Mantraians, our employees, are high-spirited people, who thirst for innovation and love to work as a team. Sky is the limit and we are driven by the phrase "Why not?".This is our culture.');
    if (count < 5) {
        candscore += 10
        score = 10;
        count += 1
    };
     saveusersubinput(session,'1','1','AboutGMI',session.message.text,score);
})
.matches('compdom', (session, args) => {
    session.send('Our primary domain is Healthcare. We also do a number of US federal defense projects.');
    if (count < 5) {
        candscore += 10
         score = 10;
        count += 1
    };
     saveusersubinput(session,'1','1','AboutGMI',session.message.text,score);
})
.matches('compgoal', (session, args) => {
    session.send('We are a products company! We aspire to develop a handful of globally competing tech products in cutting edge domains such as artificial intelligence, augmented reality, and block-chain technologies, by 2020.');
    if (count < 5) {
        candscore += 10
         score = 10;
        count += 1
    };
     saveusersubinput(session,'1','1','AboutGMI',session.message.text,score);
})
.matches('compprod', (session, args) => {
    session.send('Some of the products developed in our very own "Widget Factory" serve in fast-tracking the code, as security wrapper, and for transformation of data into various formats.');
    if (count < 5) {
        candscore += 10
         score = 10;
        count += 1
    };
    saveusersubinput(session,'1','1','AboutGMI',session.message.text,score);
})
.matches('compprof', (session, args) => {
    session.send('We are a profitable company. Our revenue in 2016 was USD 150 million.');
    saveusersubinput(session,'1','1','AboutGMI',session.message.text,'0');
})
.matches('compsize', (session, args) => {
    saveusersubinput(session,'1','1','AboutGMI',session.message.text,'0');
    session.send('At present, we employ about 50 professionals. We are looking to expand to about 150 techies by the end of 2017.');
})
.matches('compvalue', (session, args) => {
    session.send('Free thinking and Innovation are our core values. Our Dream is “Super BIG” Innovations and be “the industry standard”.');
    if (count < 5) {
        candscore += 10;
        count += 1;
        score = 10;
    };
    saveusersubinput(session,'1','1','AboutGMI',session.message.text,score);
})
.matches('compweb', (session, args) => {
    saveusersubinput(session,'1','1','AboutGMI',session.message.text,'0');
    session.send('The company website is http://globalmantrai.com/index.html.');
})
.matches('currtech', (session, args) => {
    session.send('We are working in cutting-edge technologies like Artificial Intelligence, Blockchain, Virtual Reality, Data Science, etc.');
    if (count < 5) {
        candscore += 10
        score =10;
        count += 1
    };
    saveusersubinput(session,'1','1','AboutGMI',session.message.text,score);
})
.matches('dresscode', (session, args) => {
    session.send('We do not have any strict dress codes. Casual office dressing is encouraged.');
    saveusersubinput(session,'1','1','AboutGMI',session.message.text,'0');
})
.matches('founder', (session, args) => {
    session.send('Ravi Kunduru is the founder and CEO of Global Mantra Innovations.');
    saveusersubinput(session,'1','1','AboutGMI',session.message.text,'0');
})
.matches('geog', (session, args) => {
    saveusersubinput(session,'1','1','AboutGMI',session.message.text,'0');
    session.send('Our headquarters is in Columbus, Ohio. We are also present in Maryland, Virginia, Iowa, New Mexico, Louisiana and Chennai. Soon we’ll extend to Singapore and Ireland.');
})
.matches('headop', (session, args) => {
    saveusersubinput(session,'1','1','AboutGMI',session.message.text,'0');
    session.send('Naresh Nagarajan is the SVP and head of operations of Global Mantra Innovations.');
})
.matches('howapp', (session, args) => {
    saveusersubinput(session,'1','1','AboutGMI',session.message.text,'0');
    session.send('For current openings and the procedure to apply, please visit http://globalmantrai.com/Careers.html.');
})
.matches('idealemp', (session, args) => {
    session.send('An ideal employee is one who is brave to think "Super BIG" and open to face challenges.');
    if (count < 5) {
        candscore += 10;
        score = 10;
        count += 1;
    };
    saveusersubinput(session,'1','1','AboutGMI',session.message.text,score);
})
.matches('pubpriv', (session, args) => {
    session.send('Global Mantra Innovations is a privately-owned company!');
    saveusersubinput(session,'1','1','AboutGMI',session.message.text,'0');
})
.matches('services', (session, args) => {
    saveusersubinput(session,'1','1','AboutGMI',session.message.text,'0');
    session.send('We do services. Center for Medicare and Medicaid is one of the clients for whom we do services.');
})
.matches('scope', (session, args) => {
    session.send('We have a vibrant atmosphere and we provide a great landscape for you to be creative and explore cutting-edge technologies.');
    if (count < 5) {
        candscore += 10;
        score = 10;
        count += 1;
    };
    saveusersubinput(session,'1','1','AboutGMI',session.message.text,score);
})
.matches('whenfound', (session, args) => {
    session.send('The company was founded in 1996 in Chennai.');
    candscore += 5;
    score = 5;
    saveusersubinput(session,'1','1','AboutGMI',session.message.text,score);
})
.matches('worktime', (session, args) => {
    session.send('We encourage Mantraians to be present between 10 am to 7 pm, when majority of team discussions and meetings take place. Work-from-home is allowed when the need arises.');
    if (count < 5) {
        candscore -= 10
        count += 1;
        score = -10;
    };
     saveusersubinput(session,'1','1','AboutGMI',session.message.text,score);
})
.onDefault((session) => {
    session.send('Sorry, I did not understand \'%s\'.', session.message.text);
});

//bot.dialog('/', intents);    

//=========================================================
// Bots Global Actions
//=========================================================

bot.endConversationAction('goodbye', 'Goodbye :)', { matches: /^goodbye/i });
bot.beginDialogAction('help', '/help', { matches: /^help/i });

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [
    function (session) {
        // Send a greeting and show help.
        var card = new builder.HeroCard(session)
            .title("Global Mantra Innovations")
            .text("Free Thinking for Global Innovations")
            .images([
                 builder.CardImage.create(session, "http://globalmantrai.com/assets/img/images/logo_new.png")
            ]);
        var msg = new builder.Message(session).attachments([card]);
        session.send(msg);
        session.send("Hi... I am the GMI_Bot. Thanks for installing me. ");		
		request = new sql.Request();
		request.query("Select Max(UserID) as UserID from SalesLT.Log")
		.then(function (recordSet) {
		    userid = recordSet.recordsets[0][0].UserID + 1;
		}).catch(function (err) {
			session.send("Insert err " + err);
		});

        session.beginDialog('/menu');

    },
    // function (session, results) {
    //     // Display menu
    //     session.beginDialog('/menu');
    // },
    function (session, results) {
        // Always say goodbye
        session.send("Ok... See you later!");
    }
]);

bot.dialog('/menu', [
    function (session) {
        var style = builder.ListStyle["button"];
        builder.Prompts.choice(session, "When you are ready to play, choose one of the options below:", "About GMI|About You|Clickn Play|(quit)", { listStyle: style });
    },
    function (session, results) {
	    saveuserinput(session,results.response,results.response.entity);
        if (results.response && results.response.entity != '(quit)') {
            // Launch demo dialog
            // session.send("The results '%s'", JSON.stringify(results.response.entity));
            session.beginDialog('/' + results.response.entity);
        } else {
            // Exit the menu
            session.endDialog();
        }
    },
    function (session, results) {
        // The menu runs a loop until the user chooses to (quit).
        session.replaceDialog('/menu');
    }
]).reloadAction('reloadMenu', null, { matches: /^menu|show menu/i });
 
function saveuserinput(session,result,resultentity){
	
	switch(resultentity) {
    case "About GMI":
           insertuserdata(session,'1',resultentity);
        break;
    case "About You":
           insertuserdata(session,'2',resultentity);
        break;
	case "Clickn Play":
        insertuserdata(session,'3',resultentity);
        break;
     
         }
	}
	
	function saveusersubinput(session,InputID,SubInput,Input,SubInputvalue,candscore){
       
	   request = new sql.Request();
	   request.query("Insert into [SalesLT].[Log] (InputID,Input,SubInput,SubInputvalue,Score,UserID) values ('"+ parseInt(InputID) +"','"+Input+"','"+ parseInt(SubInput) +"','"+SubInputvalue+"','"+parseFloat(candscore)+"','"+parseInt(userid)+"')")
	  .then(function () {
	   }).catch(function (err) {
			session.send("Insert err " + err);
	   });
	}
	function insertuserdata(session,InputID,Input){
	   request = new sql.Request();
	   request.query("Insert into [SalesLT].[Log] (InputID,Input,SubInput,SubInputvalue,UserID) values ('"+ parseInt(InputID) +"','"+Input+"',0,'','"+parseInt(userid)+"')")
	  .then(function () {
	   }).catch(function (err) {
			session.send("Insert err " + err);
	   });
	}
bot.dialog('/help', [
    function (session) {
        session.endDialog("Global commands that are available anytime:\n\n* menu - Exits a play session and returns to the menu.\n* goodbye - End this conversation.\n* help - Displays these commands.");
    }
]);

bot.dialog('/About\ GMI', [
    function (session) {
        session.send("Feel free to ask questions about the company! When you are done with questions, type 'menu' to go to the main menu.");
        session.beginDialog('/intt');
    }
    // function (session, results) {
    //      // Display menu
    //     session.send("You entered '%s'", results.response);
    // }
]);

bot.dialog('/intt', intents);
// bot.dialog('/About_GMI/intt', intents, [
//     function (session, results) {
//         .matches('compsize', (session, args) => {
//         session.send('At present, the company size is about 50 employees. We are looking to expand to about 150 techies by the end of 2017.');
//         })
//         .onDefault((session) => {
//         session.send('Sorry, I did not understand \'%s\'.', session.message.text);
//         });
//     }
// ]);

bot.dialog('/About\ You', [
    function (session) {
        session.send("Okay, let's chat!");
        builder.Prompts.text(session, "Could you please tell me about yourself in two sentences?");
         
    },
    function (session, results) {
        analyticsService.getScore(results.response).then(score => {
            saveusersubinput(session,'2','1','About_You',results.response,score);
            //session.send("Your score is %s", score);
        })
        .catch((error) => {
            console.error(error);
            next();
        });
        builder.Prompts.text(session, "Thanks! Could you define success?");
    },
    function (session, results) {
	 session.send("Got it!");
        var style = builder.ListStyle["button"];
		saveusersubinput(session,'2','2','About You',results.response,'0');
    	builder.Prompts.choice(session, "Who is the most inspirational personality to you among these 4?", "Narayana Murthi|Steve Jobs|Bill Gates|Elon Musk", { listStyle: style });
    },
    function (session, results) {
        if (results.response.entity === 'Elon Musk') {
            candscore += 20;
            score = 20;
        } else if (results.response.entity === 'Narayana Murthi') {
            candscore += 15;
            score = 15;
        } else {
            candscore += 10;
            score = 10;
        }
		saveusersubinput(session,'2','3','About You',results.response.entity,score);
        builder.Prompts.text(session, "What is the single quality in " + results.response.entity + " that inspires you the most?");
    },
    function (session, results) {
        var style = builder.ListStyle["button"];
        session.send("Ok! noted! '%s'", results.response);
		saveusersubinput(session,'2','4','About You',results.response,'0');
        builder.Prompts.choice(session, "How comfortable would you be to work in an R&I environment?", "Very comfortable|Okay|Not comfortable", { listStyle: style });
    },
    function (session, results) {
        if (results.response.entity === 'Very comfortable') {
            candscore += 20;
            score = 20;
        } else if (results.response.entity === 'Okay') {
            candscore += 5;
             score = 5;
        } else {
            candscore -= 10;
            score = -10;
        }
		saveusersubinput(session,'2','4','About You',results.response.entity,score);
        var style = builder.ListStyle["button"];
    //    session.send("Ok! noted! '%s'", results.response);
        builder.Prompts.choice(session, "If the job is offered, will you be willing to relocate closer to Siruseri?", "Yes|No", { listStyle: style });
    },
    function (session, results) {
        if (results.response.entity === 'Yes') {
            candscore += 20;
            score = 20;
        } else {
            candscore -= 20;
            score = -20;
        }
		saveusersubinput(session,'2','5','About\ You',results.response.entity,score);
        
        if (candscore > 50) {
            session.send("Based on our conversation, we assess a fit. Our HR representative will contact you to schedule for the next round of interview.", candscore);
        } else {
            session.send("Our HR team will review and let you know of their decision.")
        }
    },
    function (session, results) {
    //    session.send("You said:", JSON.stringify(LuiModelUrl + results.response));
        session.send("Thanks for the resonses! Type 'menu' to go to the main menu.");
    }
]);

bot.dialog('/Clickn_Play', [
    function (session) {
        var style = builder.ListStyle["button"];
        session.send("Let's Play!");
    	builder.Prompts.choice(session, "Who is the most inspirational personality to you among these 4?", "Narayana Murthi|Steve Jobs|Bill Gates|Elon Musk", { listStyle: style });
    },
    function (session, results) {
        if (results.response.entity === 'Elon Musk') {
            candscore += 20;
        } else if (results.response.entity === 'Narayana Murthi') {
            candscore += 15;
        } else {
            candscore += 10;
        }
        builder.Prompts.text(session, "What is the single quality in " + results.response.entity + " that inspires you the most?");
    },
    function (session, results) {
        var style = builder.ListStyle["button"];
        session.send("Ok! noted! '%s'", results.response);
        builder.Prompts.choice(session, "How comfortable would you be to work in an R&I environment?", "Very comfortable|Okay|Not comfortable", { listStyle: style });
    },
    function (session, results) {
        if (results.response.entity === 'Very comfortable') {
            candscore += 20;
        } else if (results.response.entity === 'Okay') {
            candscore += 5;
        } else {
            candscore -= 10
        }
        var style = builder.ListStyle["button"];
    //    session.send("Ok! noted! '%s'", results.response);
        builder.Prompts.choice(session, "If the job is offered, will you be willing to relocate closer to Siruseri?", "Yes|No", { listStyle: style });
    },
    function (session, results) {
        if (results.response.entity === 'Yes') {
            candscore += 20;
        } else {
            candscore -= 20;
        }
        session.send("Thanks for your responses.");
        if (candscore > 50) {
            session.send("Based on our conversation, we assess a fit (%s/100). Our HR representative will contact you to schedule for the next round of interview.", candscore);
        } else {
            session.send("We do not see a fit here. Our HR team will review and let you know of their decision.")
        }
    }
	
]);

if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}