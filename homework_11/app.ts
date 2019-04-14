class university{
    constructor(public name:string,public dept:string){    }
    graduation(year:number):void{
        // next line not working why?
//console.log('Graduating ${this.dept} ${year} students');
console.log('Graduating '+this.dept+ ' '+year+' students');
    }    
}

let mum=new university('MUM','Computer Science');
mum.graduation(2019);

// testing import ts file not working 