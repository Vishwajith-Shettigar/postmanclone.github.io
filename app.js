// const Prism = require("./prism");

// const Prism = require("./prism");

function getelementfromtstring(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}







let parametersBox = document.getElementById('parametersBox');

parametersBox.style.display = 'none';

let requestJsonBox = document.getElementById('requestJsonBox');

requestJsonBox.style.display = 'none';

// if user click on json display json block;

let jsonradio = document.getElementById('json');



jsonradio.addEventListener('click', () => {
    requestJsonBox.style.display = 'block';
    parametersBox.style.display = 'none';


});


// if user click on parameter display params as block

let paramradio = document.getElementById('params');


paramradio.addEventListener('click', () => {
    parametersBox.style.display = 'block';
    requestJsonBox.style.display = 'none';
})

let paramcount = 0;

// if the user clicks on plus button add more parameneters
let addParam = document.getElementById('addParam');

addParam.addEventListener('click', () => {

    let paramsnew = document.getElementById('paramsnew')
    // console.log(paramsnew);

    let string = `
<div class="form-row my-2">
<label for="url" class="col-sm-2 col-form-label">Parameter ${paramcount+2}</label>
<div class="col-md-4">
    <input type="text" class="form-control" id="parameterKey${paramcount+2}" placeholder="Enter Parameter ${paramcount+2} Key">
</div>
<div class="col-md-4">
    <input type="text" class="form-control" id="parameterValue${paramcount+2}" placeholder="Enter Parameter ${paramcount+2} Value">
</div>
<button  class="btn btn-primary deleteparam">-</button>
</div>`;

    let paramelement = getelementfromtstring(string);
    console.log(paramelement);
    paramsnew.appendChild(paramelement);

// add event listener to delete parameters


let deleteparam= document.getElementsByClassName('deleteparam');

for(item of deleteparam)
{
    item.addEventListener('click',(e)=>{

        // if(confirm('do you want to delete ')==true)
        // {
        e.target.parentElement.remove();
//         }
// item=0;
    });
}


    paramcount++;




});


// if user clicks on submit button

let submit= document.getElementById('submit');

submit.addEventListener('click',()=>{

    // waiting 
let responseJsonText= document.getElementById('responseJsonText');

document.getElementById('responsePrism').innerHTML="Please wait fetching response";




// fetching 

let url= document.getElementById('urlfield').value;
console.log(url);
let requesttype= document.querySelector(" input[name='type']:checked").value;

let contenttype= document.querySelector(" input[name='contenttype']:checked").value;


console.log(requesttype);
console.log(contenttype);





// if user choose parameters than collect all parameters 
let data={};
if(contenttype=='param')
{
   
console.log("inside parameter")
    for(i=0;i<paramcount+1;i++)
    {
        if(document.getElementById('parameterKey'+(i+1))!=undefined )
        {
        let key= document.getElementById('parameterKey'+(i+1)).value;
        let values= document.getElementById('parameterValue'+(i+1)).value;
        
        data[key]=values;
       
        }

        data=JSON.stringify(data);
    }
    console.log(data)

}
else{
    data= document.getElementById('requestJsonText').value;
    console.log(data)
    




}

// if rwquest type is post

if(requesttype=="POST")
{
    console.log("post requesttype");


 fetch(url,{
        method:'POST',
        body:data,
        headers:{
            "content-type":"application/json; charset=UTF-8"

        }
      
    })
.then(response=> response.text())
.then((text)=>{

    // document.getElementById('responseJsonText').value=text;

    document.getElementById('responsePrism').innerHTML=text;
    Prism.highlightAll();


});

}
else{

    console.log("Get request");

    fetch(url,{
        method:'GET',
      
    })
.then(response=> response.text())
.then((text)=>{

    document.getElementById('responsePrism').innerHTML=text;
    Prism.highlightAll();

})


}
})