let express=require('express');
let request = require("request");
const bodyParser = require('body-parser');
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
let cors=require('cors');

let app=express();
app.use(express.json());
// let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) 
// app.use(morgan('combined', { stream: accessLogStream }))
app.use(cors());

var urlencodedParser = express.urlencoded({extended: true});
app.use(urlencodedParser);

// remote
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://test:test@cluster0-rz5ea.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });

// local
const MongoClient = require('mongodb').MongoClient;
const client=new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });    
let db;
let collection;
client.connect(function(err){
     db=client.db('resrtaurantsDB');
     collection=db.collection('resrtaurants');      
    });    


//Query1
app.get('/query1',function(req,res){
  collection.find({}).limit(10).toArray(function(err,docs) {
      res.json(docs);
      res.end(); 
       }); 
}
);
//Query2
app.get('/query2', function(req,res){   
     const proj={address: 0,grades: 0};
     collection.find({}).project(proj).limit(10).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });
//Query3
app.get('/query3', function(req,res){  
     const proj={_id:0,address: 0,grades: 0};
     collection.find({}).project(proj).limit(10).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });
//Query4
app.get('/query4', function(req,res){   
     const proj={"_id":0,restaurant_id:1,name:1,district:1,cuisine:1,"address.zipcode":1};
     collection.find({}).project(proj).limit(10).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });

//Query5
app.get('/query5', function(req,res){   
     const query={district:'Bronx'};
     collection.find(query).limit(10).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });
//Query6
app.get('/query6', function(req,res){   
     const query={district:'Bronx'};
     collection.find(query).limit(5).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });
//Query7
app.get('/query7', function(req,res){   
     const query={district:'Bronx'};
     collection.find(query).skip(5).limit(5).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });

//Query8
app.get('/query8', function(req,res){   
     const query={'address.coord.0':{$lt:-95.754168}};
     collection.find(query).limit(10).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });
//Query9
app.get('/query9', function(req,res){   
     // American  is saved plus space in the Data provided 'American '
     const query={cuisine:{$ne:'American '},'grades.score':{$gt:75},'address.coord.0':{$lt:-65.754168}};
     collection.find(query).limit(10).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });

//Query10
app.get('/query10', function(req,res){   
     const query={name:{$regex:'^Wil'}};
     collection.find(query).limit(10).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });

   //Query11
app.get('/query11', function(req,res){   
     const query={name:{$regex:'ces$'}};
     const proj={"_id":0,restaurant_id:1,name:1,district:1,cuisine:1};
     collection.find(query).project(proj).limit(10).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });
   //Query12
   app.get('/query12', function(req,res){   
     const query={name:{$regex:'Reg'}};
     const proj={"_id":0,restaurant_id:1,name:1,district:1,cuisine:1};
     collection.find(query).project(proj).limit(10).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });
   //Query13
   app.get('/query13', function(req,res){   
     const query={district:'Bronx',cuisine:{$in:['American ','Chinese']}};
     const proj={"_id":0,restaurant_id:1,name:1,district:1,cuisine:1};
     collection.find(query).project(proj).limit(10).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });
   //Query14
   app.get('/query14', function(req,res){   
     const query={district:{$in:['Staten Island','Queens','Bronx','Brooklyn']}};
     const proj={"_id":0,restaurant_id:1,name:1,district:1,cuisine:1};
     collection.find(query).project(proj).limit(20).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });   
    //Query15
    app.get('/query15', function(req,res){   
     const query={district:{$nin:['Staten Island','Queens','Bronx','Brooklyn']}};
     const proj={"_id":0,restaurant_id:1,name:1,district:1,cuisine:1};
     collection.find(query).project(proj).limit(20).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });   
    //Query16
    app.get('/query16', function(req,res){   
     const query={'grades.score':{$lte:10}};
     const proj={"_id":0,restaurant_id:1,name:1,district:1,cuisine:1,'grades.score':1};
     collection.find(query).project(proj).limit(20).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });   
    //Query17
    app.get('/query17', function(req,res){   
     const query={'address.coord.1':{$gt:42,$lte:52}};
     const proj={"_id":0,restaurant_id:1,name:1,district:1,cuisine:1,'address.coord':1};
     collection.find(query).project(proj).limit(20).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });  
    //Query18
    app.get('/query18', function(req,res){        
     const sortByName={name:1};
     collection.find({}).sort(sortByName).limit(20).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });    
    //Query19
    app.get('/query19', function(req,res){        
     const sortByName={name:-1};
     collection.find({}).sort(sortByName).limit(20).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });    
    //Query20
    app.get('/query20', function(req,res){        
     const sortByCusDist={cuisine:1,district:-1};
     collection.find({}).sort(sortByCusDist).limit(20).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   });    
    //Query21
    app.get('/query21', function(req,res){        
    const query={'address.street':{$exists:false}};
     collection.find(query).limit(20).toArray().then(result =>  { 
         res.json(result);
         res.end();
     })
     .catch(err => console.log(err)); 
   }); 
    //Query22
    app.get('/query22', function(req,res){        
     const query={'address.coord':{$type:'double'}};
      collection.find(query).limit(20).toArray().then(result =>  { 
          res.json(result);
          res.end();
      })
      .catch(err => console.log(err)); 
    }); 
    //Query23
    app.get('/query23', function(req,res){        
     const query={name:{$regex:'^Mad'}};
     const proj={_id:0, name:1,district:1,cuisine:1,'address.coord':1};
      collection.find(query).project(proj).limit(20).toArray().then(result =>  { 
          res.json(result);
          res.end();
      })
      .catch(err => console.log(err)); 
    });     
app.listen(3000,()=>console.log("Listening to 3000"));
