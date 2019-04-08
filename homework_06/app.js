let express=require('express');
let request = require("request");
const bodyParser = require('body-parser');
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
let cors=require('cors');

//data
let grades=[
    {id:"1",name:'Assad Saad',course:'MWA',grade:95},
    {id:"2",name:'Alaa Ali',course:'Alogorithm',grade:92},
    {id:"3",name:'Shady',course:'BDA',grade:60}
]

let app=express();
app.use(bodyParser.json());
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) 
app.use(morgan('combined', { stream: accessLogStream }))
app.use(cors());

// var urlencodedParser = bodyParser.urlencoded({extended: false});
// app.use(urlencodedParser);


app.use('/grades',function(req,res){

    try {        
        // ERROR
        JSON.parse(req.body);
    } catch (e) {
        res.send("not Valid JSON");
        res.end();   
        console.log("not Valid JSON");

    }
}
);

//Get
app.get('/grades',function(req,res){
    res.send(grades);
    res.end();   
}
);
app.get('/grades/:id',function(req,res){    
    const id=req.params.id;
    const result = grades.find( grade => grade.id = id);
     res.send(JSON.stringify(result));
    res.end();   
}
);

// post
app.post('/grades',function(req,res){    
    grades.push(req.body);
    res.send(req.body);
    res.end();    
}
);

// Put
app.put('/grades/:id',function(req,res){    
    grades.find(grade=> {
         if(grade.id=req.params.id)
         {
             grade.id=req.body.id;
             grade.name=req.body.name;
             grade.course=req.body.course;
             grade.grade=req.body.grade;
             return grade;             
         }
     });
    
     res.send(grades.find( grade => grade.id = req.params.id));
     res.end();   
}
);

// Delete
app.delete('/grades/:id',function(req,res){  
    const filtered= grades.filter(grade=> { return grade.id !== req.params.id });
    grades=filtered;
      res.send(grades);
     res.end();   
}
);

app.listen(3000,()=>console.log("Listening to 3000"));