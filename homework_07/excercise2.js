let express=require('express');
let request = require("request");
let app=express();
app.use(express.json());
app.listen(3000,()=>console.log("Listening to 3000"));

const MongoClient = require('mongodb').MongoClient;
const client=new MongoClient('mongodb://homework01:homework01@ds233806.mlab.com:33806/homework01', { useNewUrlParser: true });    

let msg;
  client.connect(function(err){
    const db=client.db('homework01');
    const collection=db.collection('data');

       collection.findOne({},{key:1,message:1},function(err,doc){
        const encryptor=require('simple-encryptor')(doc.key); 
         client.close();
         msg=encryptor.decrypt(doc.message);        
    }); 
    }    
);

app.use('/secret',function(req,res){
    res.send(msg);
    res.end();
}
);



// app.use('/',function(req,res,next){   
//     const MongoClient = require('mongodb').MongoClient;
//     const client=new MongoClient('mongodb://homework01:homework01@ds233806.mlab.com:33806/homework01', { useNewUrlParser: true });    
    
//       client.connect(function(err){
//         const db=client.db('homework01');
//         const collection=db.collection('data');
    
//            collection.findOne({},{key:1,message:1},function(err,doc){
//             const encryptor=require('simple-encryptor')(doc.key); 
//              client.close();
//          next(encryptor.decrypt(doc.message));
//        ;          
//         }); 
//         }    
//     );
// }
// );

// app.use('/secret',function(req,res){
//     res.send(req.body);
//     res.end();

// }
// );


