const rxjs= require('rxjs');
const os = require('os');

   // using Observable 
   const { Observable } = rxjs;
   const obj$ = Observable.create(
       function(observer){           
            observer.next("Checking your system..");  
            if (os.freemem() < 4294967296) { 
                observer.error("This app needs at least 4 GB of RAM.");
        
            } 
            else if (os.cpus().length < 2) {
                observer.error("Processor is not supported.");        
            } 
           observer.complete();
       }
   );
   const subscription = obj$.subscribe( 
       (res) => console.log(res),
       (err) => console.log(err),
       ()=>console.log('System is checked successfully.')  
       );

  