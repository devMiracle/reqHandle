### Installation

###### **using npm**

```
$ npm i req-handler --save
```

###### **In Node Js**

```javascript
//You can make use of any http module of your choice
//
//using the express module for this README
const express = require('express');

//
const RequestHandler = require('req-handler');

const app = express();
app.use(express.json());
const PORT = 9000;
let schema = new RequestHandler();

// Call the setSchema Method 
// Here we set up all our schema 
schema.setSchema([
    //Example of How to set up a schema
    {name:"first_name",type:"string",required:true,length :{ min:10,max:12}},
    {name:"last_name",type:"string",required:true,length :{min:10,max:200}},
    {name:"age",type:"number",required:true,length :{ min:10,max:8700}},
    {name:"email",type:"string",required:true}
]);

app.post('/students',(req,res) => {
    let body = req.body;
    // Call the validate Method to validate all this users request
    const validator = schema.validate(body);

    // This validator will return an object with error and message as key
    // If the error value is true then an error occured get the validator.message to see the errors
    // if the error value is false then everything looks great and we can continue our action
    if(validator.error) return res.send(validator.message);

    res.send(validator);
});
// console.log(schema.getSchema());
app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`);
})

```


#### Happy Coding!!!
#### Cheers
