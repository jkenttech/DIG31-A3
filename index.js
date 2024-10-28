import express from 'express'

const app = express();
const port = 3000;

app.get('/', (req, res)=>{
    res.send("running express app");
});

app.listen(port, () =>{
    console.log(`app running on port ${port}`);
});
