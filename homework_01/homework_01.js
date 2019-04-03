// ES6 features
const bannWords=["house","nice"];
const str="This house is not nice !";
String.prototype.filterWords=function(Arr){
 return this.split(" ").map(wo=>bannWords.includes(wo)? "***":wo).join(" ");
}
console.log("Output ES6 features: "+ str.filterWords(bannWords));


// // Promise
const promiseFilterWords = (str, bannWords) => {
    return new Promise((resolve, reject) => {
        
      if ( str!=null ) {
        resolve(str.filterWords(bannWords));
      } else {
        reject(Error("Hi error"));
      }
    });
  };
  promiseFilterWords(str,bannWords).then(res => {
    console.log("Output Promise Success: "+ res);
  })
  .catch(err => {
    console.log("Output Promise error: "+ err);
  });
//   //console.log("After using Promise fn Executed First!");


//   // Async / Await
  async function asyWaitFilterWords(str, bannWords){
      try{
           const res= await str.filterWords(bannWords);
           console.log("Output Async/Wait: "+res);
      }
      catch(error){
       console.log(error);
      }
  }  
   asyWaitFilterWords(str, bannWords);
//   //console.log("After asyWaitFilterWords Executed First!");
 


//Observable Version1
const {from} =rxjs;
from(promiseFilterWords(str,bannWords)).subscribe((e=>console.log("Output Observable: "+e)));

   // using Observable Version2
   const { Observable } = rxjs;
   const obj$ = Observable.create(
       function(observer){
            observer.next(str.filterWords(bannWords));  
            observer.complete();
       }
   );
   const subscription = obj$.subscribe(
       function (x) {console.log(`Observable result: ${x}`);},
       function (err) {console.log(`Observable error: ${err}`);},
       function() { console.log("Done.")}
   );
   // how to make it Async
   //console.log("after Observable version2 Synchronus Version");

// Observable Version3
const {of} =rxjs;
const {map,flatMap,mergeAll,reduce}=rxjs.operators;
const ar=str.split(" ");
const ar2=[...ar];
of(...ar2)
.pipe(       
    map(wo=>bannWords.includes(wo)? "***":wo),
    reduce((w1, w2)=> w1 + ' ' + w2)    
)
.subscribe(
    (res) =>console.log("Output Obser 2: "+ res),
    null,
    ()=>console.log("Done")
)

// isWeekend function
function isWeekend(){
    const todayDate=new Date();
    const day=todayDate.getDay();
    const weekday="weekday";
    const weekend="weekend";
    const days={0:weekday,
                1:weekday,
                2:weekday,
                3:weekday,
                4:weekday,
                5:weekend,
                6:weekend,
              } 

               return days[day];
}
console.log(isWeekend());


// applyCoupon Function
const item={
    "name":"Avocado",
    "type":"Fruit",
    "category":"Food",
    "price":"200",
}
function applyCoupon(item){    
    return function(discount){
        price=0;
        item.price=item.price- (item.price *(discount/100));
    return item;
      }

}

console.log( applyCoupon(item)(10).price===180);
