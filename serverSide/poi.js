const express = require('express');
const appPoi = express();
const jwt = require('jsonwebtoken');
const DButilsAzure = require('./DButils');

appPoi.use(express.json());


appPoi.get('/getAllPointsOfInterest' ,function(req,res){
    DButilsAzure.execQuery("select * from  poi order by category ")
        .then(function(result){
        var ans=divide(result);
        res.send(ans);
        
    })
    .catch(function(err){
        console.log(err)
        res.send(err)
    })
})

appPoi.get('/getRandomPoi' ,function(req,res){    
    DButilsAzure.execQuery("SELECT * FROM poi WHERE rank_precents>=3.5")
    .then(function(result){
        if(result.length>=3){
            choseRandom(result,res);
        }
        else{
            DButilsAzure.execQuery("SELECT * FROM poi")
            .then(function(result2){
            choseRandom(result2,res);
            })
        }
    })
    .catch(function(err){
        console.log(err)
        res.send(err)
    })
})



//privare
appPoi.get('/getTwoPopularPoints' ,function(req,res){
    DButilsAzure.execQuery("select * from user_favorit_category,poi where user_name='"+ req.decoded.name+"'"+ " and user_favorit_category.favorit_category=poi.category order by rank_precents desc ")
    .then(function(result){
       var poi1=createPoi(result[0]);
       var poi2=createPoi(result[1]);
       var ans={poi1: poi1,poi2:poi2};
       res.send(ans)
    })
    .catch(function(err){
        console.log(err)
        res.send(err)
    })
})


appPoi.get('/getDetails/:poi', function(req,res){

    if(!req.params.poi){
         res.status(400).send("invalid parameters to the function")
         var r = request("/getDetails")
        r.abort()
    }
     DButilsAzure.execQuery("SELECT * FROM poi where poi = '" + req.params.poi+ "'" )
     .then(function(result){
         var objpoi=createPoi(result[0]);
        var ans={poi:objpoi};
        res.send(ans)
     })
     .catch(function(err){
         console.log(err)
         res.send(err)
     })
 })

//private
 appPoi.get('/getLastSavedPoi', function(req,res){
    var username=req.decoded.name;
    DButilsAzure.execQuery("SELECT top 2 poi FROM users_poi where user_name='" + username+ "' ORDER BY date_in DESC")
    .then(function(result){
        var size=result.length;
        if(size<2){
            res.status(400).send("No 2 POI saved");
            var r = request("/getLastSavedPoi")
            r.abort()
        }

        var poi1=result[0].poi;
        var poi2=result[1].poi;
        
        DButilsAzure.execQuery("SELECT * from poi where poi='" + poi1+ "'")
        .then(function(result1){
            var saved1=new poi(result1[0].poi,result1[0].category, result1[0].amount_of_viewers, result1[0].description, result1[0].rank_precents, result1[0].url_picture, result1[0].num_of_ranks );
        
        DButilsAzure.execQuery("SELECT * from poi where poi='" + poi2+ "'")
        .then(function(result2){
            var saved2=new poi(result2[0].poi,result2[0].category, result2[0].amount_of_viewers, result2[0].description, result2[0].rank_precents, result2[0].url_picture, result2[0].num_of_ranks );
            var ans={poi1:saved1 ,poi2:saved2};
            res.send(ans);
          
        })
    })
    })
    .catch(function(err){
        console.log(err)
        res.send(err)
    })


})

//private
appPoi.get('/addPointToFavorite/:poi', function(req,res){
    if(!(req.params.poi)){
        res.status(400).send("invalid parameters for the function")
        var r = request("/addPointToFavorite")
            r.abort()
    }
    DButilsAzure.execQuery("select * from poi where poi='" + req.params.poi+ "'")
    .then(function(result){
        if(result.length==0){
        res.status(400).send("this poi not exist in the system");
        var r=request('/addPointToFavorite');
        r.abort();
    }

    var username=req.decoded.name;
    var poi=req.params.poi;
    DButilsAzure.execQuery("INSERT INTO users_poi VALUES ('" + username+ "', '" + poi+ "', '1000', GETDATE())")
    .then(function(result){
        res.status(201).send("Point Of Intrest Added Seccesfuly");
    })
})
    .catch(function(err){
        console.log(err)
        res.send(err)
    })
})

//private
appPoi.get('/removePointFromFavorite/:poi', function(req,res){
    if(!(req.params.poi)){
     res.status(400).send("invalid parameters for the function")
     var r = request("/removePointFromFavorite")
            r.abort()
    }
     var username=req.decoded.name;
     var poi=req.params.poi;
     DButilsAzure.execQuery("DELETE FROM users_poi WHERE user_name='" + username+ "' AND poi='" + poi+ "'")
     .then(function(result){
         res.send("Point Of Intrest Deleted Seccesfuly");
     })
     .catch(function(err){
         console.log(err)
         res.send(err)
     })
 })
 

 //private
 appPoi.get('/getNumberOfFaviritePOints', function(req,res){
     var username=req.decoded.name;
     DButilsAzure.execQuery("SELECT * FROM users_poi WHERE user_name='"+username+"'")
     .then(function(result){
         var ans={numOfFavotitePoints: result.length}
         res.send(ans);
     })
     .catch(function(err){
         console.log(err)
         res.send(err)
     })
 })
 

 //private
 appPoi.get('/getAllFavoritePOints', function(req,res){
     var username=req.decoded.name;
     var poiArray=[];
     DButilsAzure.execQuery("select poi.poi,category,amount_of_viewers,description,rank_precents,url_picture,num_of_ranks from poi, users_poi where users_poi.user_name='"+username+"' and users_poi.poi=poi.poi ORDER BY users_poi.rank_by_user_sort")
     .then(function(result){//get the details on the user poi
         for(var i=0;i<result.length;i++){
             poiArray.push(createPoi(result[i]));
         }
         var ans={pois: poiArray};
         res.send(ans);
     })
     .catch(function(err){
         console.log(err)
         res.send(err)
     })
 })
 
 //private 
 appPoi.get('/saveFavoritsPOints/:poiArray', function(req,res){
     if(!(req.params.poiArray)){
         res.status(400).send("invalid parameters for the function")
         var r = request("/saveFavoritsPOints")
            r.abort()
     }
     var username=req.decoded.name;
     var poiArray=req.params.poiArray.split("-");
     for(var i=0;i<poiArray.length;i++){
         DButilsAzure.execQuery("INSERT INTO users_poi VALUES ('" + username+ "', '" + poiArray[i]+ "', '1000', GETDATE())")
         .then(function(result){ })
         .catch(function(err){
             console.log(err)
             res.send(err)
         })
     }
     res.status(201).send("Point Of Intrest that has been identified Added Seccesfuly.");
 })

 appPoi.get('/getTwoLastReview/:poi',function(req,res){
    DButilsAzure.execQuery("SELECT TOP (2) * FROM reviews_of_poi WHERE poi='" + req.params.poi+ "' ORDER BY date_of_review DESC ;")
    .then(function(result){
        if(result.length<2){res.send("No Review Givven")}
        else{
            var r1=result[0].review+", "+result[0].date_of_review;
            var r2=result[1].review+", "+result[1].date_of_review;
            var ans={rev1: r1,rev2:r2};
            res.send(ans)}
      })
    .catch(function(err){
        console.log(err)
        res.send(err)
    })
 })
 

 //private 
 appPoi.get('/rankAndReviewPOint/:poi/:rank/:review', function(req,res){
     if(!(req.params.poi && req.params.rank && req.params.review)){
         res.status(400).send("invalid parameters to the function")
         var r = request("/rankAndReviewPOint")
            r.abort()
     }
     var poi=req.params.poi;
     var rank=req.params.rank;
     var review=req.params.review;
     DButilsAzure.execQuery("SELECT * from reviews_of_poi")
     .then(function(result){ 
         var id=result.length+1;
    
     DButilsAzure.execQuery("INSERT INTO reviews_of_poi VALUES ('"+id+"','" + poi+ "', '" + review+ "', GETDATE() ,'"+rank+"')")
     .then(function(result){  })
     .catch(function(err){
         console.log(err)
         res.send(err)
     })
 
     DButilsAzure.execQuery("SELECT rank_precents, num_of_ranks FROM poi WHERE poi='"+poi+"'")
     .then(function(result){ 
         var avg=parseFloat(result[0].rank_precents);
         var rankers=parseInt(result[0].num_of_ranks);
         var newRankers=rankers+1;
         var a=parseFloat(avg*rankers);
         var b=parseFloat(a+parseFloat(rank));
         var newRank=parseFloat(b/newRankers);
         DButilsAzure.execQuery("UPDATE poi SET rank_precents='"+newRank+"' , num_of_ranks='"+newRankers+"' WHERE poi='"+poi+"'")
         .then(function(result){  })
         .catch(function(err){
             console.log(err)
             res.send(err)
         })
     })
     .catch(function(err){
         console.log(err)
         res.send(err)
     })
     res.send("review&rank saved")
 
 })
 .catch(function(err){
     console.log(err)
     res.send(err)
 })
 
     
 })
 

 //private 
 appPoi.get('/rankByUser/:poiArray', function(req,res){
     if(!(req.params.poiArray)){
         res.status(400).send("inValid parametrs to the function")
         var r = request("/rankByUser")
         r.abort()
     }
     var username=req.decoded.name;
     var poiArray=req.params.poiArray.split("-");  
     var rank=1000;  
     for(var i=0;i<poiArray.length;i++){
         rank=i+1;
         DButilsAzure.execQuery("UPDATE users_poi SET rank_by_user_sort='"+rank+"' WHERE user_name='"+username+"' and poi='"+poiArray[i]+"'")
         .then(function(result){ })
         .catch(function(err){
             console.log(err)
             res.send(err)
         })
     }
     res.send("Ranked Seccesfuly");
 })



 function pointExist(poi){
    DButilsAzure.execQuery("SELECT * FROM poi where poi = '" + poi+ "'" )
    .then(function(result){
        if(result.length>1){return true;}
    return false;
    })
    .catch(function(err){
        console.log(err)
        res.send(err)
    })

 }

 
function divide(result){
    var atractions=[];
    var food=[];
    var hotels=[];
    var shoping=[];
    for(var i=0;i<result.length;i++)
    {
       var poi=createPoi(result[i]);
       if(poi.category=='atractions'){atractions[atractions.length]=poi;}
       if(poi.category=='food'){food.push(poi);}
       if(poi.category=='hotels'){hotels.push(poi);}
       if(poi.category=='shoping'){shoping.push(poi);}
    }
    var ans= { atractions: atractions, food: food, hotels: hotels, shoping: shoping };
    return ans;
}

function createPoi (arr){
    return new poi(arr.poi,arr.category, arr.amount_of_viewers, arr.description, arr.rank_precents, arr.url_picture, arr.num_of_ranks );
}


function choseRandom(result,res){
    var total=result.length;
    var rand1=Math.floor(Math.random()*(total));
    var rand2=Math.floor(Math.random()*(total));
    while(rand1==rand2){
        rand2=Math.floor(Math.random()*(total));
    }
    var rand3=Math.floor(Math.random()*(total));
    while(rand1==rand3 || rand2==rand3){
        rand3=Math.floor(Math.random()*(total));
    }

    var poi1=new poi(result[rand1].poi,result[rand1].category, result[rand1].amount_of_viewers, result[rand1].description, result[rand1].rank_precents, result[rand1].url_picture, result[rand1].num_of_ranks );
    var poi2=new poi(result[rand2].poi,result[rand2].category, result[rand2].amount_of_viewers, result[rand2].description, result[rand2].rank_precents, result[rand2].url_picture, result[rand2].num_of_ranks );
    var poi3=new poi(result[rand3].poi,result[rand3].category, result[rand3].amount_of_viewers, result[rand3].description, result[rand3].rank_precents, result[rand3].url_picture, result[rand3].num_of_ranks );
    var ans={poi1: poi1,poi2:poi2,poi3:poi3};
    res.send(ans);
}


class poi {
    constructor(name,category,num_of_viewers,desc,rank,url,num_of_ranks) {
        this.name = name;
        this.category=category;
        this.num_of_viewers=num_of_viewers;
        this.desc=desc;
        this.rank=rank;
        this.url=url;
        this.num_of_ranks=num_of_ranks;
    }
}





module.exports=appPoi;