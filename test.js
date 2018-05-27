const express = require('express');

//
const RequestHandler = require('./index');

const app = express();
app.use(express.json());
const PORT = 9000;
let schema = new RequestHandler();
 
schema.setSchema([
    //Example of How to set up a schema
    {name:"first_name",type:"string",required:true,length :{ min:10,max:12}},
    {name:"last_name",type:"string",required:true,length :{min:10,max:200}},
    {name:"age",type:"number",required:true,length :{ min:10,max:8700}},
    {name:"email",type:"string",required:true}
]);

app.post('/students',(req,res) => {
    let body = req.body;
    const validator = schema.validate(body);
    if(validator.error) return res.send(validator.message);

    res.send(validator);
});
app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`);
})