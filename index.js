const express = require("express")
const app = express();
//Request : To access API
const request = require("request");
require("dotenv/config");

//Default engine was specified 
app.use(express.static("public"));
//Extension was provided.
app.set("view engine","ejs");
//JSON File Reader
app.use(express.json());


app.get("/",(req,res)=>{
    res.render("home");
});

//dotenv file
const appID = process.env.access_key


//API to Our Server
app.get("/:id",(req,res)=>{
    var id = req.query.city;
    var API = "https://api.openweathermap.org/data/2.5/weather?q="+id+"&appid="+appID+"&units=metric";
    request(API,(err,response,data)=>{
        if(err){
            console.log("Error with API");
        }else{
            res.render("report",{weather : JSON.parse(data)})
        }
    });
});

//API URL
app.get("/view/url",(req,res)=>{
    var API = "https://api.openweathermap.org/data/2.5/weather?q=thanjavur&appid="+appID+"&units=metric";
    request(API,(err,response,data)=>{
        if(err){
            console.log("Error with API");
        }else{
            res.send(data)
        }
    })
})




app.listen(8080,(err)=>{
    if(err){console.log("Error Occured");
}else{
    console.log("Server Started...");
}
})