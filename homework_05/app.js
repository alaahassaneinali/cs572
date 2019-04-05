let express=require('express');
let request = require("request");
const axios = require('axios');

let app=express();
// config
app.disable('etag');
app.enable('trust proxy');
app.enable('case sensitive routing');
app.set('strict routing',true);

app.get('/users',function(req,res){
    const url = "https://randomuser.me/api/?results=10";
    
    const getData = async url => {
        try {
            let result = await axios.get('https://randomuser.me/api/?results=10');
            
            let data = result.data;
            console.log('pages No:'+`${result.data.info.page}`);
            res.set({
                'Cache-control': 'private, max-age=86400',
                'Last-Modified': new Date(),
                'Link': `<https://randomuser.me/api/?page=1&results=10>; rel="first",` +
                    `<https://randomuser.me/api/?page=${result.data.info.page + 1}&results=10&seed=${result.data.info.seed}>; rel="next",` +
                    `<https://randomuser.me/api/?page=${result.data.info.page - 1}&results=10&seed=${result.data.info.seed}>; rel="prev"`
            });      
            res.send(data);
            res.end();

            
        } catch (error) {
          console.log(error);
        }
      };
      getData(url);    
}
);
app.listen(3000,()=>console.log("Listening to 3000"));