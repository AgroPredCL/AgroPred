const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/tshirt',(req,res)=>{
    res.status(200).send({
        tshirt:'dia',
        size:'large'
    })
});

app.post('/tshirt/:id', function (req, res) {
    const {id} = req.params;
    const {logo} =req.body;

    if(!logo){
        res.status(418).send({message: 'We need a logo!'})
    }
    res.send({
        tshirt: `love with your ${logo} and ID of${id}`,
    })
});


  