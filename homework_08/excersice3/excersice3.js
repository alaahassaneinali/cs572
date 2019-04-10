
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

//remote
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test@cluster0-rz5ea.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

// // local
// const MongoClient = require('mongodb').MongoClient;
// const client=new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });    
let db;
let collection;
client.connect(function(err){
     db=client.db('locDB');
     collection=db.collection('locations');     
    // collection.createIndex({'name':1});
     //console.dir(collection.indexes());
    });    


app.get('/locations',function(req,res){
  collection.find({}).limit(10).toArray(function(err,docs) {
      res.json(docs);
      res.end(); 
       }); 

      
}
);

app.post('/locations',function(req,res){ 
  collection.insert(req.body, function (err, docs) {
    if (err){ 
        return console.error(err);
    } else {
      console.log("Multiple locations inserted to Collection");
    }
  });   
  }
);

app.post('/find',function(req,res){ 

  const curObj=JSON.parse(req.body);
  const  currLog=curObj.location[0];
  const  currLat=curObj.location[1];
  const query={location:{$near:currLog,currLat}};
  collection.find(query).limit(3).toArray(function(err,docs) {
      res.json(docs);
      res.end(); 
       }); 

  }
);

app.listen(3000,()=>{console.log('Listening to 3000')});