const express = require('express')
const app = express()
const http = require('http').createServer(app)
const ejs = require("ejs");
const connection = require("./db/connection");
const aChatSchema = require("./models/achat");
const OnlySchema = require("./models/chatArray");
const registerSchema = require("./models/register");

const bodyParser = require('body-parser');


// Middlewares 
app.use(express.json({
    type: ['application/json', 'text/plain']
}));
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }));


//   Ejs Template Added
app.set('view engine', 'ejs');


// Port Listening
const PORT = process.env.PORT || 3000
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});


// Socket 
const io = require('socket.io')(http)



// Routers start 

// router 1
app.get('/', (req, res) => {
    res.render("index")

});


// router 2
app.post("/startcommunity", async (req, res) => {
    const details = await registerSchema.find({});
    res.send({ details });

});




// router 3
app.post("/creategroup", async (req, res) => {



    OnlySchema.updateOne({ user_id: req.body.admin_id}, {
        $push: {
            allchats: { isgroup: req.body.isgroup, id: req.body.chat_id, chatname: req.body.person2 }
        }
    }).then(async function (result) {
        if (result.modifiedCount != 0) {
            console.log(result);
        }
        else {
            const admindocs = new OnlySchema({
                user_id: req.body.admin_id,
                allchats: [{
                    isgroup:req.body.isgroup ,
                    id: req.body.chat_id,
                    chatname: req.body.person2
                }]

            })
            await admindocs.save();
            console.log("data saved in mongodb in onlyshema");
            // OnlySchema.find({user_id: req.body.admin_id})

        }


        OnlySchema.findOne({ user_id: req.body.admin_id }).then(async function (result) {
            admin_docs = result.allchats
            res.send({ admin_docs });

        }).catch((error) => {
            //When there are errors We handle them here
            console.log("there is a error in only chatschema" + error);
        })




    }).catch((error) => {
        console.log(error)
    })

    for (let i = 1; i < req.body.members.length; i++) {
        OnlySchema.updateOne({user_id: req.body.members[i] }, {
            $push: {
                allchats: { isgroup: req.body.isgroup, id: req.body.chat_id, chatname: req.body.person1 }
            }
        }).then(async function (result) {
            if (result.modifiedCount != 0) {
                console.log(result);
            }
            else {
                const admindocs = new OnlySchema({
                    user_id: req.body.members[i],
                    allchats: [{
                        isgroup: req.body.isgroup,
                        id: req.body.chat_id,
                        chatname: req.body.person1
                    }]

                })
                await admindocs.save();
                console.log("data saved in mongodb in onlyshema");
                // OnlySchema.find({user_id: req.body.admin_id})

            }


        }).catch((error) => {
            console.log(error)
        })

    }

});




app.post("/all_chats_details",async function(req,res){
try{
    console.log("hh");
    OnlySchema.findOne({ user_id: "ravi.sinhmar28@gmai.com" }).then(async function (result) {
        all_chat = result.allchats
        res.send({ all_chat  });


    }).catch((error) => {
        //When there are errors We handle them here
        console.log("there is a error in only chatschema" + error);
    })

}catch(err){
console.log(err);
}
})


app.post("/printchats", async function(req,res){
    try {

        console.log(req.body);
        aChatSchema.findOne({chat_id:req.body.Specific_chat_id}).then(function(result){
            console.log(result.message);
            res.send(result)
        }).catch((err)=>{
   console.log("it comes here");
            console.log(err);

        })
    } catch (error) {
        console.log(error);
    }
})


































var test = 0;
// socket start 
let ChatId = "";
let Recivers = [];
let testid = "";
let ConnectedUsers = [];


io.on('connection', (socket) => {

socket.on("startchat",function(data){
    socket.join(data.id);
})


socket.on('message',  (msg) => {
    aChatSchema.updateOne({ chat_id:msg.chat_id }, { $push: { message: { sentby: msg.Senderid, chat: msg.message } }
      }).then(async function  (result) {
          if (result.modifiedCount != 0) {
              console.log(result);
          }
          else {
             const tostore=aChatSchema({
              chat_id:msg.chat_id,
              chat_name:msg.chat_name,
              message:[
                  {
                      sentby:msg.Senderid,
                      chat:msg.message
                  }
              ]
             })
             await tostore.save();
             console.log("data save in in innininij");

          }
      })
          .catch((error) => {
              //When there are errors We handle them here
              console.log("there is a error" + error);

          });

          socket.broadcast.to(msg.chat_id).emit("sendmessage", msg);
      // socket.broadcast.emit('message', msg)
  });

  
   

});
