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

// //remote
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://test:test@cluster0-rz5ea.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });

// // local
const MongoClient = require('mongodb').MongoClient;
const client=new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });    
let db;
let collection;
client.connect(function(err){
     db=client.db('zipsDB');
     collection=db.collection('zips');        
});    


app.get('/zips',function(req,res){
  collection.find({}).limit(10).toArray(function(err,docs) {
      res.json(docs);
      res.end(); 
       });      
}
);

app.get('/query1',function(req,res){
    collection.aggregate([
        {$match:{
                 state:'IA'              
                }
        },
        {$project:{_id:0,'ZipCode':'$_id','State':'$state'

                }
        }
    ]).limit(10).toArray(function(err,docs) {
        res.json(docs);
        res.end(); 
         });        
  }
  );

  app.get('/query2',function(req,res){
    collection.aggregate([
        {$match:{
                 pop:{$lt:5000}            
                }
        },
        {$project:{_id:0, ZipCode:'$_id',State:'$state',Population:'$pop'
                  }
        },
        {$sort:{ Population:-1
               }            
        }
    ]).limit(20) 
    .toArray(function(err,docs) {
        res.json(docs);
        res.end(); 
         });        
  }
  );

  app.get('/query3',function(req,res){
    collection.aggregate([
        {$group:{ 
                  _id:{state:'$state',city:'$city'},
                  zips_Numbers:{$sum:1}
                }
        },
        {$match:{ zips_Numbers:{$gt:1}
                }
        },
        {$project:{_id:0, State_City:'$_id',zips_Numbers:'$zips_Numbers'
                  }
        },
        {$sort:{zips_Numbers:-1}
        }
      
    ]).limit(20) 
    .toArray(function(err,docs) {
        res.json(docs);
        res.end(); 
         });        
  }
  );

  app.get('/query4',(req,res)=>{
collection.aggregate([
    {$group:{'_id':{'state':'$state','city':'$city'}, 'total_population':{$sum:'$pop'}        }  },
    {$sort:{'total_population':1    }    },
    {$group:{'_id':'$_id.state','city':{$first:'$_id.city'},total_population:{$first:'$total_population'} } },
    {$sort: {'_id': 1}}  
  ]).limit(20)
.toArray((err,docs)=>{
    res.json(docs);
    res.end(); 
}
)
  });

app.listen(3000,()=>{console.log('Listening to 3000')});