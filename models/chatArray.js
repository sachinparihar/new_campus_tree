
const mongoose = require("mongoose");

const idChatSchema = mongoose.Schema({
    user_id:{
        type:String,
        requied:true
    },

    allchats:[
        {
            isgroup:{
                 type:Boolean,
                default:false
            },
        id:{
            type:String,
            requied:true  
        },
        chatname:{
            type:String,
            requied:true  
        },
        message:[
            {
                sentby:{
                    type:String,
            requied:true
                },
                chat:{
                    type:String,
            requied:true
                }
            }
        ] 
    }
],
 
});
module.exports=new mongoose.model("onlyschema",idChatSchema); 