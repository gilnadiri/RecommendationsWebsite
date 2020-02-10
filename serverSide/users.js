const express = require('express');
const appUsers = express();
const jwt = require('jsonwebtoken');
const DButilsAzure = require('./DButils');
secret = "gil&hodaya";

appUsers.use(express.json());

appUsers.post('/register',function(req,res){
    if( !(req.body.userName && req.body.password && req.body.firstName && req.body.lastName && req.body.city && req.body.country && req.body.email && req.body.categoryOfInterest && req.body.questions && req.body.answers) ){
        res.status(400).send("invalid parameters to the function")
        var r = request("/register")
        r.abort()
    }
    var country=req.body.country;
    DButilsAzure.execQuery("SELECT * FROM countries where name='" + country+ "'")
    .then(function(result){
        if(result.length==0){res.status(400).send("country does not exist");
         var r = request("/register")
        r.abort()
    }
        DButilsAzure.execQuery("select * from users where user_name='"+req.body.userName+"'")
        .then(function(result){
            if(result.length>0){res.status(400).send("user already exist"); 
            var r = request("/register")
            r.abort()}

        if(chek_validation(req.body.userName, req.body.password,res)){
            res.status(400).send("illegal details")
            var r = request("/register")
             r.abort()
        }
        DButilsAzure.execQuery("INSERT INTO users VALUES ('" + req.body.userName+ "', '" + req.body.password+ "','" + req.body.firstName+ "','" + req.body.lastName+ "','" + req.body.city+ "','" + req.body.country+ "','" + req.body.email+ "')")
        .then(function(result){
            DButilsAzure.execQuery("INSERT INTO questions_of_useres VALUES ('" + req.body.userName+ "', '" + req.body.questions[0]+ "','" + req.body.answers[0]+ "')")
                .then(function(result){
                    DButilsAzure.execQuery("INSERT INTO questions_of_useres VALUES ('" + req.body.userName+ "', '" + req.body.questions[1]+ "','" + req.body.answers[1]+ "')")
                })
                for(var i=0;i<req.body.categoryOfInterest.length;i++){
                DButilsAzure.execQuery("INSERT INTO user_favorit_category VALUES ('" + req.body.userName+ "', '" + req.body.categoryOfInterest[i]+ "')")    
                .then(function(result){})
                }
             res.send("user created succecfuly");
        
         })
    
})
})
    .catch(function(err){
        console.log(err)
        res.send(err)
    })
 })

appUsers.post('/restorePassword', function(req,res){
    if(!req.body.questions || !req.body.answers || !req.body.userName){
        res.status(400).send("invalid parameters to the function")
        var r = request("/restorePassword")
        r.abort()
    }

    var username=req.body.userName;
    var question1=req.body.questions[0];
    var question2=req.body.questions[1];
    var answer1=req.body.answers[0];
    var answer2=req.body.answers[1];
    var bool=true;


    DButilsAzure.execQuery("SELECT * FROM questions_of_useres where user_name ='" + username+ "' and question ='"+ question1+"'"+ "and answare='" + answer1+"'" )
    .then(function(result){
        if(result.length==0){bool=false;}
        DButilsAzure.execQuery("SELECT * FROM questions_of_useres where user_name ='" + username+ "' and question ='"+ question2+"'"+ "and answare='" + answer2+"'" )
        .then(function(result){
            if(result.length==0){bool=false;}
            DButilsAzure.execQuery("SELECT password from users where user_name='"+username+"' ")
            .then(function(result){
                if(bool){res.send(result)}
                else {res.send("your answars are incorrect")}

    })
    .catch(function(err){
        console.log(err)
        res.send(err)
    })
})

})
})

appUsers.post('/login',function(req,res){
    if(checkInput(req)){
            res.status(400).send("invalid parameters to the function")
            var r = request("/login")
            r.abort(); 
    }
    DButilsAzure.execQuery("select * from users where user_name= '" + req.body.userName+ "' and password='" + req.body.password+ "' " )
    .then(function(result){
        if(result.length==0){
            res.status(400).send("invalid userName or password")
            var r = request("/login")
         r.abort()
        }
        else{
            payload={name: req.body.userName};
            options = { expiresIn: "1d" };
            const token = jwt.sign(payload, secret, options);
            res.send(token);
        }
       
        
    })
         .catch(function(err){
        console.log(err)
        res.send(err)
    })




 })

 function checkInput(req){
    if(!req.body.userName || !req.body.password){return true}
      

}


function digitExist(userName){
    for(var i=0;i<userName.length;i++){
        if(!isNaN(parseInt(userName[i]))){return true}
    }
    return false;
}

function charExist(password){
    for(var i=0;i<password.length;i++){
        if(password[i]=='!'||password[i]=='?'||password[i]=='~'||password[i]=='@'||password[i]=='#'||password[i]=='$'||password[i]=='%'||password[i]=='^'||password[i]=='&'||password[i]=='*'||password[i]=='('||password[i]==')'||password[i]==','||password[i]=='.'||password[i]=='/'||password[i]=='['||password[i]==']'||password[i]=='{'||password[i]=='}'||password[i]=='-'||password[i]=='<'||password[i]=='>'||password[i]==':'||password[i]==';'||password[i]=='"'||password[i]=='|'||password[i]=='+'){return true}
    }
    return false;}


function chek_validation(userName,password,res){

        if(userName.length>8||userName.length<3||digitExist(userName)){
            return true;
        }
        if(password.length>10||password.length<5||charExist(password)){
            return true;
        }
    }


module.exports=appUsers;

















