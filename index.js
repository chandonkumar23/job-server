const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6tweslj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    // Connect the client to the server	(optional starting in v4.7)
  
 const taskCollection = client.db("job").collection("Task")


 app.post('/all',async(req,res)=>{
    const add = req.body;
    const result = await taskCollection.insertOne(add);
    res.send(result);
 })



app.get('/all/:email', async(req,res) =>{
    console.log(req.params.email);
    let params = {}
    if (req.params?.email){
        params = {email: req.params.email}
    }
    const result = await taskCollection.find(params).toArray();
    res.send(result)
})






    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error

  }
}
run().catch(console.dir);





app.get('/', (req,res) =>{
    res.send('job is ready')
})
app.listen(port,()=>{
    console.log(`jobs is setting on port ${port}`)
})