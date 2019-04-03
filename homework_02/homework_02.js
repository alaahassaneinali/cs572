// Version 1
const numbers=[1,2,3,4,5,6,7,8];
Array.prototype.even=async function(){

   const res= await   this.filter(n=>n%2===0);
   console.log(res);
}
Array.prototype.odd=async function(){
    const res= await   this.filter(n=>n%2!==0);
    console.log(res);
}

console.log('Start');
numbers.even();
numbers.odd();
console.log('End');


// version2
// const numbers=[1,2,3,4,5,6,7,8];
// Array.prototype.even=function(){
// return this.filter(n=>n%2===0);
// }
// Array.prototype.odd=function(){
//     return this.filter(n=>n%2!==0);
// }

// async function asyArr(nums,isEven){
//     try{
//         let res;
//         let str;
//         if(isEven===true)
//         {
//           res= await numbers.even();
//           str="Even Numbers: ";
//         }
//         if(isEven===false)
//         {
//             res= await numbers.odd();
//             str="Odd Numbers: ";        
//         }
//         console.log(res);
//     }
//     catch(error){
//      console.log(error);
//     }
// }





