let express=require('express');
let request = require("request");
const bodyParser = require('body-parser');
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
let cors=require('cors');

let app=express();
app.use(express.json());
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) 
app.use(morgan('combined', { stream: accessLogStream }))
app.use(cors());

var urlencodedParser = express.urlencoded({extended: true});
app.use(urlencodedParser);


const MongoClient = require('mongodb').MongoClient;
const client=new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });    
let db;
let collection;
client.connect(function(err){
     db=client.db('homework07');
     collection=db.collection('lectures');      
    }); 
   

//Get
app.get('/lectures',function(req,res){
    let data=[];
    collection.find({}).forEach(function(doc) {
       // console.log(Object.prototype.toString.call(doc));
       console.log(doc);
      // data.push(doc);
      }); 
 res.send(data);
 res.end(); 
}
);

app.get('/lectures/:course',function(req,res){   
    const cou=req.params.course; 
   collection.find({course:cou}).forEach(function(doc) {   
   console.log(doc);  
  }); 
}
);


app.post('/lectures',function(req,res){ 
    collection.save(req.body);
    console.log(req.body);
}
);

// Put
app.put('/lectures/:course',function(req,res){  
    
    const myquery={course:req.params.course};
    var newvalues = { $set: req.body };

    collection.updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;

        console.log("UpdateOne:");
        console.log(req.body);
       
      });
}
);

// Delete
app.delete('/lectures/:course',function(req,res){  
    const myquery={course:req.params.course};
    collection.deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("deleteOne:");
        console.log(req.body);
       });
}
);


app.get('/search/:q',function(req,res){   
    const cou=req.params.q; 
   collection.find({course:cou}).forEach(function(doc) {   
   console.log(doc);  
  }); 
}
);

app.listen(3000,()=>console.log("Listening to 3000"));
