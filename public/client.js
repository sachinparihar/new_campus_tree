

const socket = io()
const plus = document.getElementById("plus");
const community = document.getElementById("community");
const search = document.getElementById("search");
const chat_section = document.getElementById("chat-section");
const textarea = document.getElementById("textarea");
const allchats = document.getElementById("all-chats");
let messageArea = document.querySelector('.message__area')
let groupname=document.querySelector(".groupname")
let creategroup = document.querySelector('.creategroup')
let row = document.querySelector('.row')
let content = document.querySelector('.content')
let yourProfileName = document.querySelector('.your-profile-name')
let outerchat = document.querySelector('.outer-chat')
let overchatbtn = document.querySelector('.overchatbtn')

const fname = document.getElementById("fname");
const fcollege = document.getElementById("fcollege");
const field = document.getElementById("field");
const fscore = document.getElementById("score");
const container = document.getElementById("container");


// Some Global Variables

let username="";
let members=[];
let adminid="ravi.sinhmar28@gmai.com"


// Community Section Starts

community.addEventListener("click",async function(){
 members.push(adminid) 
    row.style.display="none"
    isgroup=1;
    const request=await fetch("http://localhost:3000/startcommunity",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
       }).then((Response)=>{
           return Response.json();
       }).then((data)=>{

console.log(data);
        data.details.forEach((details)=>{
 const pbox=document.createElement("div");
 pbox.classList.add('pbox');
 container.appendChild(pbox);


 const pinnerbox=document.createElement("div");
 pinnerbox.classList.add('text-center','card-box');
 pbox.appendChild(pinnerbox);


 const numbercard=document.createElement("div");
numbercard.classList.add('number-card', 'pt-2','pb-2');
pinnerbox.appendChild(numbercard);


const pimgdiv=document.createElement("div");
pimgdiv.classList.add("thumb-lg","number-thumb","mx-auto","pimgdiv");
numbercard.appendChild(pimgdiv);


const pimg=document.createElement("Img");
pimg.classList.add("pimg");
pimg.setAttribute("src","https://images.unsplash.com/photo-1587778082149-bd5b1bf5d3fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw5NDUyNDk0fHxlbnwwfHx8fA%3D%3D&w=1000&q=80")
pimgdiv.appendChild(pimg)


const pinfodiv=document.createElement("div");
numbercard.appendChild(pinfodiv);


const pname=document.createElement("h4");
pname.setAttribute("id","fname");
pname.innerHTML=details.full_name;
pinfodiv.appendChild(pname);


const pcollege=document.createElement("h4");
pcollege.setAttribute("id","fcollege");
pcollege.innerHTML=details.college;
pinfodiv.appendChild(pcollege);



const pfield=document.createElement("p");
pfield.setAttribute("id","field");
pfield.innerHTML=details.user_id;
pinfodiv.appendChild(pfield);

const pbutton=document.createElement("button");
pbutton.classList.add('btn',"btn-primary");
pbutton.setAttribute("onclick", "hello2(value,name)");
pbutton.setAttribute("name", details.full_name);
pbutton.setAttribute("value", details.email);

pbutton.innerHTML="add"
numbercard.appendChild(pbutton)


const scoreParg=document.createElement("p");
numbercard.appendChild(scoreParg)
const pscore=document.createElement("SPAN");
scoreParg.appendChild(pscore);


const spaninner=document.createElement("p");
spaninner.innerHTML=`score:${"0"}`;
pscore.appendChild(spaninner);
        
        });


       })
}
);

let person1="Ravi";
const  hello2 =(async(v2,username)=>{
    if(isgroup==0){
        row.style="display:flex"
        content.style="display:none"
        creategroup.style.display="none"
    alert("hi bro")
       let person2=username;
        let group_id = Date.now() + Math.random();
   group_id = group_id.toString().replace(".","_");
        // let check={
        //     Sentby:From,
        //     Recivedby:To
        // }
        members.push(v2);
        

        alert("now req will start")
        const request=await fetch("oo-byop.onrender.com/creategroup",{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({chat_id:group_id,members:members,admin_id:adminid,person1:person1,person2:person2,isgroup:false})

           }).then((Response)=>{
            return Response.json();
        }).then((data)=>{
            
        //  console.log(data.admin_docs[0].chatname)
            // alert(data.allchats.length);
for(let i=0;i<data.admin_docs.length;i++){
    const groupbutton=document.createElement("button");
    groupbutton.classList.add("button","overchatbtn");
    groupbutton.setAttribute("name", data.admin_docs[i].chatname);
    groupbutton.setAttribute("title", data.admin_docs[i].isgroup);
    groupbutton.setAttribute("value", "ravi.sinhmar28@gmail.com");
    groupbutton.setAttribute("id",data.admin_docs[i].id );
    groupbutton.setAttribute("onclick", "hello(value,name,id,title)");
  
    allchats.appendChild(groupbutton)
    
    const outerchat=document.createElement("div");
    outerchat.classList.add("outer-chat")
    groupbutton.appendChild(outerchat)
    
    
    const groupphoto=document.createElement("img");
    groupphoto.classList.add("profile-img")
    
    groupphoto.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU");
    outerchat.appendChild(groupphoto);
    
    const grouph4=document.createElement("h4");
    grouph4.classList.add("profile-name")
    grouph4.innerHTML=data.admin_docs[i].chatname;
    outerchat.appendChild(grouph4);
}
location.reload();

})
     
    }
   else if(isgroup==1){
members.push(v2)

// let data={"members":members,"chat_name":username};
// console.log(JSON.stringify(data))
        // Sending post request 
    }
    else{
        alert("Error in hello2 function")
    }
});

// After Clicking Create Group Button

creategroup.addEventListener("click",  async function(){
isgroup=1;
 let group_id = Date.now() + Math.random();
 group_id = group_id.toString().replace(".","_");
let group_name=groupname.value;
        row.style="display:flex"
        content.style="display:none"
        creategroup.style.display="none"
    groupname.style.display="none"
        const request=await fetch("oo-byop.onrender.com/creategroup",{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({chat_id:group_id,members:members,admin_id:adminid,person1:group_name,person2:group_name,isgroup:true})

           }).then((Response)=>{
            return Response.json();
        }).then((data)=>{
            
        //  console.log(data.admin_docs[0].chatname)
            // alert(data.allchats.length);
for(let i=0;i<data.admin_docs.length;i++){
    const groupbutton=document.createElement("button");
    groupbutton.classList.add("button","overchatbtn");
    
    groupbutton.setAttribute("name", data.admin_docs[i].chatname);
    groupbutton.setAttribute("title", data.admin_docs[i].isgroup);
    groupbutton.setAttribute("value", "ravi.sinhmar28@gmail.com");
    groupbutton.setAttribute("id",data.admin_docs[i].id );
    groupbutton.setAttribute("onclick", "hello(value,name,id,title)");
   


    allchats.appendChild(groupbutton)
    const outerchat=document.createElement("div");
    outerchat.classList.add("outer-chat")
    groupbutton.appendChild(outerchat)
    
    
    const groupphoto=document.createElement("img");
    groupphoto.classList.add("profile-img")
    
    groupphoto.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU");
    outerchat.appendChild(groupphoto);
    
    const grouph4=document.createElement("h4");
    grouph4.classList.add("profile-name")
    grouph4.innerHTML=data.admin_docs[i].chatname;
    outerchat.appendChild(grouph4);
}
    
})
location.reload();
})


// community section Ends



// Single chat section start

plus.addEventListener("click",async function(){
groupname.style.display="none"
creategroup.style.display="none"
    isgroup=0;
    members.push(adminid) 
       row.style.display="none"
       const request=await fetch("oo-byop.onrender.com/startcommunity",{
           method:"POST",
           headers:{
             "Content-Type":"application/json",
           },
          }).then((Response)=>{
              return Response.json();
          }).then((data)=>{
   
   console.log(data);
           data.details.forEach((details)=>{
    const pbox=document.createElement("div");
    pbox.classList.add('pbox');
    container.appendChild(pbox);
   
   
    const pinnerbox=document.createElement("div");
    pinnerbox.classList.add('text-center','card-box');
    pbox.appendChild(pinnerbox);
   
   
    const numbercard=document.createElement("div");
   numbercard.classList.add('number-card', 'pt-2','pb-2');
   pinnerbox.appendChild(numbercard);
   
   
   const pimgdiv=document.createElement("div");
   pimgdiv.classList.add("thumb-lg","number-thumb","mx-auto","pimgdiv");
   numbercard.appendChild(pimgdiv);
   
   
   const pimg=document.createElement("Img");
   pimg.classList.add("pimg");
   pimg.setAttribute("src","https://images.unsplash.com/photo-1587778082149-bd5b1bf5d3fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw5NDUyNDk0fHxlbnwwfHx8fA%3D%3D&w=1000&q=80")
   pimgdiv.appendChild(pimg)
   
   
   const pinfodiv=document.createElement("div");
   numbercard.appendChild(pinfodiv);
   
   
   const pname=document.createElement("h4");
   pname.setAttribute("id","fname");
   pname.innerHTML=details.full_name;
   pinfodiv.appendChild(pname);
   
   
   const pcollege=document.createElement("h4");
   pcollege.setAttribute("id","fcollege");
   pcollege.innerHTML=details.college;
   pinfodiv.appendChild(pcollege);
   
   
   
   const pfield=document.createElement("p");
   pfield.setAttribute("id","field");
   pfield.innerHTML=details.user_id;
   pinfodiv.appendChild(pfield);
   
   const pbutton=document.createElement("button");
   pbutton.classList.add('btn',"btn-primary");
   pbutton.setAttribute("onclick", "hello2(value,name)");
   pbutton.setAttribute("name", details.full_name);
   pbutton.setAttribute("value", details.email);
   
   pbutton.innerHTML="add"
   numbercard.appendChild(pbutton)
   
   
   const scoreParg=document.createElement("p");
   numbercard.appendChild(scoreParg)
   const pscore=document.createElement("SPAN");
   scoreParg.appendChild(pscore);
   
   
   const spaninner=document.createElement("p");
   spaninner.innerHTML=`score:${"0"}`;
   pscore.appendChild(spaninner);
           
           });
          })
   }
   );
let gptype="";
let Specific_chat_id="";
let Specific_chat_name="";








const hello = ( async (value,name,id,title) => {
    yourProfileName.innerHTML=name;
    socket.emit("startchat",{value:value,name:name,id:id,title:title})
    alert("socket emited")
   gptype=title;
   Specific_chat_id=id;
Specific_chat_name=name;
   alert(gptype)

   const request=await fetch("oo-byop.onrender.com/printchats",{
           method:"POST",
           headers:{
             "Content-Type":"application/json",
           },
           body:JSON.stringify({Specific_chat_id:Specific_chat_id})
          }).then((Response)=>{
              return Response.json();
          }).then((data)=>{


for(let i=0; i<data.message.length;i++){
if(data.message[i].sentby="ravi.sinhmar28@gmai.com"){
    let message=data.message[i].chat;
  
    let msg={
        message:message
    }
    appendMessage(msg, 'outgoing')
    scrollToBottom()
}
else {
    appendMessage(msg, 'incoming')
    scrollToBottom()
}

}

          })

});

textarea.addEventListener("keyup" , (e) => {
    if (e.key == 'Enter') {
        sendMessage(e.target.value);
        
    }
});

function sendMessage(message) {
    if(gptype=="0"||gptype==false||gptype=="false"){
        alert("not a grooup chat")
       
        let msg = {
            Senderid:adminid,
           chat_id:Specific_chat_id,
           chat_name:Specific_chat_name,
            message: message.trim()
        } 
         // Append 
     appendMessage(msg, 'outgoing')
     textarea.value = ''
     scrollToBottom()
     // Send to server 
     socket.emit('message', msg)
       
    }
    else if(gptype=="1"||gptype==true||gptype=="true"){
        alert("group chat")
        let msg={
            Senderid:adminid,
           chat_id:Specific_chat_id,
           chat_name:Specific_chat_name,
            message:message.trim()
        }
        
 // Append 
 appendMessage(msg, 'outgoing')
 textarea.value = ''
 scrollToBottom()
 // Send to server 
 socket.emit('message', msg)
    }
}


function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('testm', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})
socket.on("sendmessage",function(msg){
    appendMessage(msg, 'incoming')
    scrollToBottom()
})
socket.on("Senderside",function(chat){
    let msg={
        message:chat
    }
    appendMessage(msg, 'outgoing')
    scrollToBottom()
})
socket.on("Reciverside",function(chat2){
    let msg={
        message:chat2
    }
    appendMessage(msg, 'incoming')
    scrollToBottom()
})
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}





//my code


window.onload=(async()=>{
const request= await
fetch("oo-byop.onrender.com/all_chats_details",{
    method:"POST",
     headers:{
        "Content-Type":"application/json",
      }
}).then((Response)=>{
    return Response.json();
}).then((data)=>{
    for(let i=0;i<data.all_chat.length;i++){
        const groupbutton=document.createElement("button");
        groupbutton.classList.add("button","overchatbtn");
   
        groupbutton.setAttribute("name", data.all_chat[i].chatname);
    groupbutton.setAttribute("title", data.all_chat[i].isgroup);
    groupbutton.setAttribute("value", "ravi.sinhmar28@gmail.com");
    groupbutton.setAttribute("id",data.all_chat[i].id );
    groupbutton.setAttribute("onclick", "hello(value,name,id,title)");
        allchats.appendChild(groupbutton)
        const outerchat=document.createElement("div");
        outerchat.classList.add("outer-chat")
        groupbutton.appendChild(outerchat)
        
        
        const groupphoto=document.createElement("img");
        groupphoto.classList.add("profile-img")
        
        groupphoto.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU");
        outerchat.appendChild(groupphoto);
        
        const grouph4=document.createElement("h4");
        grouph4.classList.add("profile-name")
        grouph4.innerHTML=data.all_chat[i].chatname;
        outerchat.appendChild(grouph4);
        
if(groupbutton.title==true||groupbutton.title=="true"||groupbutton.title==1||groupbutton.title=="1"){
    const icon=document.createElement("i");
    icon.classList.add("fa","fa-users")
    icon.setAttribute("aria-hidden","true" );
    icon.style="color:white;font-size:2rem;margin-left:15rem;margin-top:1rem;margin-right:2rem"
    outerchat.appendChild(icon)
    
}
    }
        
    })

})
