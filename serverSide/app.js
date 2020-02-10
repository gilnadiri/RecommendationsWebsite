var express = require('express');
var app = express();
var DButilsAzure = require('./DButils');
app.use(express.json());
const jwt = require("jsonwebtoken");
secret = "gil&hodaya";

const users = require('./users');;
const poi = require('./poi');

var cors=require('cors')


app.use(cors())
app.options('*',cors())


app.use("/private", function(req, res,next){
    const token = req.header("x-auth-token");
    if (!token) res.status(401).send("Access denied. No token provided.");
    try {
        const decoded = jwt.verify(token, secret);
        req.decoded = decoded;
        next(); 
        } catch (exception) {
        res.status(400).send("Invalid token.");
    }
});

app.use("/private/users", users);
app.use("/users", users);
app.use("/private/poi", poi);
app.use("/poi", poi);



// class poi {
//     constructor(name,category,num_of_viewers,desc,rank,url,num_of_ranks) {
//         this.name = name;
//         this.category=category;
//         this.num_of_viewers=num_of_viewers;
//         this.desc=desc;
//         this.rank=rank;
//         this.url=url;
//         this.num_of_ranks=num_of_ranks;
//     }
// }
// function createPoi (arr){
//     return new poi(arr.poi,arr.category, arr.amount_of_viewers, arr.description, arr.rank_precents, arr.url_picture, arr.num_of_ranks );
// }


var port = 3000;
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});


// //private help func
// function divide(result){
//     var atractions=[];
//     var food=[];
//     var hotels=[];
//     var shoping=[];
//     for(var i=0;i<result.length;i++)
//     {
//        var poi=createPoi(result[i]);
//        console.log("catttttt   "+poi.category)
//        if(poi.category=='atractions'){atractions[atractions.length]=poi;}
//        if(poi.category=='food'){food.push(poi);}
//        if(poi.category=='hotels'){hotels.push(poi);}
//        if(poi.category=='shoping'){shoping.push(poi);}
//     }
//     var ans= { atractions: atractions, food: food, hotels: hotels, shoping: shoping };
//     return ans;
// }






// app.get('/getDetails/:poi', function(req,res){

//    if(!req.params.poi){
//         res.status(400).send("invalid parameters to the function")
//    }
//     DButilsAzure.execQuery("SELECT * FROM poi where poi = '" + req.params.poi+ "'" )
//     .then(function(result){
//         res.send(result)
//     })
//     .catch(function(err){
//         console.log(err)
//         res.send(err)
//     })
// })

// //לתקן+מה קורה אם יש יותר מ2 שאלות+האם צריך להיות Private
// app.post('/private/restorePassword', function(req,res){
//     if(!req.body.questions || req.body.answers){
//         res.status(400).send("invalid parameters to the function")
//     }

//     var username=req.decoded.name;
//     var question1=req.body.questions[0];
//     var question2=req.body.questions[1];
//     var answer1=req.body.answers[0];
//     var answer2=req.body.answers[1];
//     var bool=true;


//     DButilsAzure.execQuery("SELECT * FROM questions_of_useres where user_name ='" + username+ "' and question ='"+ question1+"'"+ "and answare='" + answer1+"'" )
//     .then(function(result){
//         if(result.length==0){bool=false;}
//         DButilsAzure.execQuery("SELECT * FROM questions_of_useres where user_name ='" + username+ "' and question ='"+ question2+"'"+ "and answare='" + answer2+"'" )
//         .then(function(result){
//             if(result.length==0){bool=false;}
//             DButilsAzure.execQuery("SELECT password from users where user_name='"+username+"' ")
//             .then(function(result){
//                 if(bool){res.send(result)}
//                 else {res.send("your answars are incorrect")}

//     })
//     .catch(function(err){
//         console.log(err)
//         res.send(err)
//     })
// })

// })
// })

// app.get('/getRandomPoi' ,function(req,res){
    
//     var poi1
//     DButilsAzure.execQuery("SELECT * FROM poi")
//     .then(function(result){
//         var total=result.length;
//         var rand1=Math.floor(Math.random()*(total));
//         var rand2=Math.floor(Math.random()*(total));
//         while(rand1==rand2){
//             rand2=Math.floor(Math.random()*(total));
//         }
//         var rand3=Math.floor(Math.random()*(total));
//         while(rand1==rand3 || rand2==rand3){
//             rand3=Math.floor(Math.random()*(total));
//         }

//         var poi1=new poi(result[rand1].poi,result[rand1].category, result[rand1].amount_of_viewers, result[rand1].description, result[rand1].rank_precents, result[rand1].url_picture, result[rand1].num_of_ranks );
//         var poi2=new poi(result[rand2].poi,result[rand2].category, result[rand2].amount_of_viewers, result[rand2].description, result[rand2].rank_precents, result[rand2].url_picture, result[rand2].num_of_ranks );
//         var poi3=new poi(result[rand3].poi,result[rand3].category, result[rand3].amount_of_viewers, result[rand3].description, result[rand3].rank_precents, result[rand3].url_picture, result[rand3].num_of_ranks );
//         var ans={poi1: poi1,poi2:poi2,poi3:poi3};
//         res.send(ans);

//     })
//     .catch(function(err){
//         console.log(err)
//         res.send(err)
//     })
// })

// //correct above grade 3.5 
// app.get('/private/getTwoPopularPoints' ,function(req,res){
//     DButilsAzure.execQuery("select * from user_favorit_category,poi where user_name='"+ req.decoded.name+"'"+ " and user_favorit_category.favorit_category=poi.category order by rank_precents desc ")
//     .then(function(result){
//        var poi1=createPoi(result[0]);
//        var poi2=createPoi(result[1]);
//        var ans={poi1: poi1,poi2:poi2};
//        res.send(ans)
//     })
//     .catch(function(err){
//         console.log(err)
//         res.send(err)
//     })
// })


// app.get('/getAllPointsOfInterest' ,function(req,res){
//     DButilsAzure.execQuery("select * from  poi order by category ")
//         .then(function(result){
//         var ans=divide(result);
//         res.send(ans);
        
//     })
//     .catch(function(err){
//         console.log(err)
//         res.send(err)
//     })
// })


// app.get('/private/getLastSavedPoi', function(req,res){
//     var username=req.decoded.name;
//     DButilsAzure.execQuery("SELECT top 2 poi FROM users_poi where user_name='" + username+ "' ORDER BY date_in DESC")
//     .then(function(result){
//         var size=result.length;
//         if(size==0){
//             res.send("No POI saved")
//         }
//         var poi1=result[0].poi;
//         var poi2=result[1].poi;
        
//         DButilsAzure.execQuery("SELECT * from poi where poi='" + poi1+ "'")
//         .then(function(result1){
//             var saved1=new poi(result1[0].poi,result1[0].category, result1[0].amount_of_viewers, result1[0].description, result1[0].rank_precents, result1[0].url_picture, result1[0].num_of_ranks );
        
//         DButilsAzure.execQuery("SELECT * from poi where poi='" + poi2+ "'")
//         .then(function(result2){
//             var saved2=new poi(result2[0].poi,result2[0].category, result2[0].amount_of_viewers, result2[0].description, result2[0].rank_precents, result2[0].url_picture, result2[0].num_of_ranks );
//             var ans={poi1:saved1 ,poi2:saved2};
//             res.send(ans);
          
//         })
//     })
//     })
//     .catch(function(err){
//         console.log(err)
//         res.send(err)
//     })


// })


// //TODo: validity check on user name and password. check if need to return username and pass to client. check about cities file
// app.post('/register',function(req,res){
//     if( !(req.body.userName && req.body.password && req.body.firstName && req.body.lastName && req.body.city && req.body.country && req.body.email && req.body.categoryOfInterest && req.body.questions && req.body.answers) ){
//         res.status(400).send("invalid parameters to the function")
//     }
//     DButilsAzure.execQuery("INSERT INTO users VALUES ('" + req.body.userName+ "', '" + req.body.password+ "','" + req.body.firstName+ "','" + req.body.lastName+ "','" + req.body.city+ "','" + req.body.country+ "','" + req.body.email+ "')")
//         .then(function(result){
//             DButilsAzure.execQuery("INSERT INTO questions_of_useres VALUES ('" + req.body.userName+ "', '" + req.body.questions[0]+ "','" + req.body.answers[0]+ "')")
//                 .then(function(result){
//                     DButilsAzure.execQuery("INSERT INTO questions_of_useres VALUES ('" + req.body.userName+ "', '" + req.body.questions[1]+ "','" + req.body.answers[1]+ "')")
//                 })
//                 for(var i=0;i<req.body.categoryOfInterest.length;i++){
//                 console.log(req.body.categoryOfInterest[i]);
//                 DButilsAzure.execQuery("INSERT INTO user_favorit_category VALUES ('" + req.body.userName+ "', '" + req.body.categoryOfInterest[i]+ "')")    
//                 .then(function(result){})
//             }
//              res.send("user created succecfuly");
        
//     })
//     .catch(function(err){
//         console.log(err)
//         res.send(err)
//     })

//  })


//  app.post('/login',function(req,res){
//     checkInput(req);
//     checkLoginOnTable(req);
//     payload={name: req.body.userName};
//     options = { expiresIn: "1d" };
//     const token = jwt.sign(payload, secret, options);
//     res.send(token);

//  })

//  function checkInput(req){
//      if(!req.body.userName || !req.body.password)
//         res.status(400).send("invalid parameters to the function")
//  }
// function checkLoginOnTable(req){
//     DButilsAzure.execQuery("select from users where poi= '" + req.body.userName+ "' and password='" + req.body.password+ "' " )
//         .then(function(result){
//         if(result.length==0){
//             res.status(400).send("invalid userName or password")
//         }
       
        
//     })
//          .catch(function(err){
//         console.log(err)
//         res.send(err)
//     })
// }

// app.get('/private/getLastSavedPoi', function(req,res){
//     var username=req.decoded.name;
//     DButilsAzure.execQuery("SELECT top 2 poi FROM users_poi where user_name='" + username+ "' ORDER BY date_in DESC")
//     .then(function(result){
//         var size=result.length;
//         if(size==0){
//             res.send("No POI saved")
//         }
//         var poi1=result[0].poi;
//         var poi2=result[1].poi;
        
//         DButilsAzure.execQuery("SELECT * from poi where poi='" + poi1+ "'")
//         .then(function(result1){
//             var saved1=new poi(result1[0].poi,result1[0].category, result1[0].amount_of_viewers, result1[0].description, result1[0].rank_precents, result1[0].url_picture, result1[0].num_of_ranks );
        
//         DButilsAzure.execQuery("SELECT * from poi where poi='" + poi2+ "'")
//         .then(function(result2){
//             var saved2=new poi(result2[0].poi,result2[0].category, result2[0].amount_of_viewers, result2[0].description, result2[0].rank_precents, result2[0].url_picture, result2[0].num_of_ranks );
//             var ans={poi1:saved1 ,poi2:saved2};
//             res.send(ans);
          
//         })
//     })
//     })
//     .catch(function(err){
//         console.log(err)
//         res.send(err)
//     })


// })

// app.get('/private/addPointToFavorite/:poi', function(req,res){
//     if(!(req.params.poi)){
//         res.status(400).send("invalid parameters for the function")
//     }
//     var username=req.decoded.name;
//     var poi=req.params.poi;
//     DButilsAzure.execQuery("INSERT INTO users_poi VALUES ('" + username+ "', '" + poi+ "', '1000', GETDATE())")
//     .then(function(result){
//         res.status(201).send("Point Of Intrest Added Seccesfuly");
//     })
//     .catch(function(err){
//         console.log(err)
//         res.send(err)
//     })
// })

// app.get('/private/removePointFromFavorite/:poi', function(req,res){
//    if(!(req.params.name)){
//     res.status(400).send("invalid parameters for the function")
//    }
//     var username=req.decoded.name;
//     var poi=req.params.poi;
//     DButilsAzure.execQuery("DELETE FROM users_poi WHERE user_name='" + username+ "' AND poi='" + poi+ "'")
//     .then(function(result){
//         res.send("Point Of Intrest Deleted Seccesfuly");
//     })
//     .catch(function(err){
//         console.log(err)
//         res.send(err)
//     })
// })

// app.get('/private/getNumberOfFaviritePOints', function(req,res){
//     var username=req.decoded.name;
//     DButilsAzure.execQuery("SELECT * FROM users_poi WHERE user_name='"+username+"'")
//     .then(function(result){
//         var ans={numOfFavotitePoints: result.length}
//         res.send(ans);
//     })
//     .catch(function(err){
//         console.log(err)
//         res.send(err)
//     })
// })

// app.get('/private/getAllFavoritePOints', function(req,res){
//     var username=req.decoded.name;
//     var poiArray=[];
//     DButilsAzure.execQuery("select poi.poi,category,amount_of_viewers,description,rank_precents,url_picture,num_of_ranks from poi, users_poi where users_poi.user_name='"+username+"' and users_poi.poi=poi.poi")
//     .then(function(result){//get the details on the user poi
//         for(var i=0;i<result.length;i++){
//             poiArray.push(createPoi(result[i]));
//         }
//         var ans={pois: poiArray};
//         res.send(ans);
//     })
//     .catch(function(err){
//         console.log(err)
//         res.send(err)
//     })
// })

// app.get('/private/saveFavoritsPOints/:poiArray', function(req,res){
//     if(!(req.params.poiArray)){
//         res.status(400).send("invalid parameters for the function")
//     }
//     var username=req.decoded.name;
//     var poiArray=req.params.poiArray.split("-");
//     for(var i=0;i<poiArray.length;i++){
//         DButilsAzure.execQuery("INSERT INTO users_poi VALUES ('" + username+ "', '" + poiArray[i]+ "', '1000', GETDATE())")
//         .then(function(result){ })
//         .catch(function(err){
//             console.log(err)
//             res.send(err)
//         })
//     }
//     res.status(201).send("Point Of Intrest Added Seccesfuly");
// })

// app.get('/private/rankAndReviewPOint/:poi/:rank/:review', function(req,res){
//     if(!(req.params.poi && req.params.rank && req.params.review)){
//         res.status(400).send("invalid parameters to the function")
//     }
//     var poi=req.params.poi;
//     var rank=req.params.rank;
//     var review=req.params.review;
//     DButilsAzure.execQuery("SELECT * from reviews_of_poi")
//     .then(function(result){ 
//         var id=result.length+1;
   
//     DButilsAzure.execQuery("INSERT INTO reviews_of_poi VALUES ('"+id+"','" + poi+ "', '" + review+ "', GETDATE() ,'"+rank+"')")
//     .then(function(result){  })
//     .catch(function(err){
//         console.log(err)
//         res.send(err)
//     })

//     DButilsAzure.execQuery("SELECT rank_precents, num_of_ranks FROM poi WHERE poi='"+poi+"'")
//     .then(function(result){ 
//         var avg=parseFloat(result[0].rank_precents);
//         var rankers=parseInt(result[0].num_of_ranks);
//         var newRankers=rankers+1;
//         var a=parseFloat(avg*rankers);
//         var b=parseFloat(a+parseFloat(rank));
//         var newRank=parseFloat(b/newRankers);
//         DButilsAzure.execQuery("UPDATE poi SET rank_precents='"+newRank+"' , num_of_ranks='"+newRankers+"' WHERE poi='"+poi+"'")
//         .then(function(result){  })
//         .catch(function(err){
//             console.log(err)
//             res.send(err)
//         })
//     })
//     .catch(function(err){
//         console.log(err)
//         res.send(err)
//     })
//     res.send("review&rank saved")

// })
// .catch(function(err){
//     console.log(err)
//     res.send(err)
// })

    
// })

// app.get('/private/rankByUser/:poiArray', function(req,res){
//     if(!(req.params.poiArray)){
//         res.status(400).send("inValid parametrs to the function")
//     }
//     var username=req.decoded.name;
//     var poiArray=req.params.poiArray.split("-");  
//     var rank=1000;  
//     for(var i=0;i<poiArray.length;i++){
//         rank=i+1;
//         DButilsAzure.execQuery("UPDATE users_poi SET rank_by_user_sort='"+rank+"' WHERE user_name='"+username+"' and poi='"+poiArray[i]+"'")
//         .then(function(result){ })
//         .catch(function(err){
//             console.log(err)
//             res.send(err)
//         })
//     }
//     res.send("Ranked Seccesfuly");
// })
