const express = require ('express');
const cors = require ('cors');
const app=express();

app.use(express.json())
app.use(cors())

app.post('/new-task', (req, res) => {
    console.log(req.body)
})

app.listen(8080, ()=>{
    console.log("Sever started")
})