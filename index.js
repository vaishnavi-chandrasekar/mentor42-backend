const express= require("express");
const app= express();
const cors = require("cors");
const mongodb = require("mongodb")
const mongoClient= mongodb.MongoClient;
const URL= "mongodb+srv://vaishu:vaishu@cluster0.qskmh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


let options = { origin: "*" }
app.use(cors(options))
app.use(express.json())

app.post("/list", async function(req,res){
    try {
        let connection=await mongoClient.connect(URL)
        let db= connection.db("moneymanager")
        let b = await db.collection("mentorplist").insertMany(req.body)
        await connection.close()
        res.json({message:"posted"})
        
    } catch (error) {
       console.log(error) 
    }
})

app.post("/student", async function(req,res){
    try {
        let connection= await mongoClient.connect(URL)
        let db= connection.db("moneymanager")
        let b= await db.collection("mentor42").insertOne(req.body)
        await connection.close()
        res.json({message:"student created"})
    } catch (error) {
        console.log(error)
        
    }
})

app.put("/edit/:id",async function(req,res){
    try {
        let connection= await mongoClient.connect(URL)
        let db= connection.db("moneymanager")
        let objId= mongodb.ObjectId(req.params.id)
        let a= await db.collection("mentor42").findOneAndUpdate({_id:objId},{$set:req.body})
        await connection.close()
        res.json({message:"data-updated"})
    } catch (error) {
        console.log(error)
        
    }
})

app.get("/infoall", async function(req,res){
    try {
        let connection= await mongoClient.connect(URL)
        let db=connection.db("moneymanager")
        let c= await db.collection("mentor42").find({}).toArray()
        await connection.close()
        res.json(c)
        
    } catch (error) {
        console.log(error)
        
    }
})

app.delete("/delete/:id", async function(req,res){
    try {
        let connection=await mongoClient.connect(URL)
        let db= connection.db("moneymanager")
        let ObjId= mongodb.ObjectId(req.params.id)
         await db.collection("mentor42").deleteOne({_id:ObjId})
        await connection.close()
        res.json({message:"deleted"})
    } catch (error) {
        console.log(error)
        
    }
})

app.post("/pending", async function(req,res){
    try {
        let connection= await mongoClient.connect(URL)
        let db= connection.db("moneymanager")
        let b= await db.collection("mentor42").insertMany(req.body)
        await connection.close()
        res.json(b)
    } catch (error) {
        console.log(error)
        
    }
})

app.get("/info/:id", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL)
        let db = connection.db("moneymanager")
        let objId = mongodb.ObjectId(req.params.id)
        let a = await db.collection("mentor42").findOne({ _id: objId })
        await connection.close()
        res.json(a)
    } catch (error) {
        console.log(error)
    }
})

app.get("/new", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL)
        let db = connection.db("moneymanager")
        let e = await db.collection("mentorplist").find({}).toArray()
        await connection.close()
        res.json(e)
    } catch (error) {
        console.log(error)
    }
})







app.listen(process.env.PORT|| 3000)