const express = require("express");
const {v4: uuidv4} = require("uuid");
const {users} =require("./database")

const app = express()

app.use(express.json())

//CRUD  -Create,read, updare,delete

//Create
app.post("/users", (req , res)=>{
    try {
        const body=req.body
        const user = {id: uuidv4(),
            ...body}
        users.push(user)
    
        res.status(200).json({
            message: "yaratildi",
            user
        })
   } catch (error) {
       console.log(error);
        res.status(500).json({
           error: "xatolik boldi" 
        })
    }
});

app.get("/users", (req, res)=>{
    try {
        res.status(200).json({
            message: "ok",
            users
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:"xatolik"
        });
                
    }
})

app.get("/users/:userId",(req, res)=>{
    try {
        const userId = req.params.userId;

        const user = users.find((user)=>user.id===userId)

        if (!user) {
           return res.status(404).json({
                error: "Not found",
                
            })  
        }

        res.status(200).json({
            message: "OK",
            user
        }) 


    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:"xatolik"
        });
             
    }
})

//Update

app.put("/users/:usersId", (req, res) =>{
    try {
        const userId = req.params.usersId;

        const body = req.body
       
        const userIndex = users.findIndex(user  => user.id===userId)

        if (userIndex === -1) {
            return res.status(404).json({
                error: "Not found",
                
            })  
        }
        
        users[userIndex] = {
           ... users[userIndex],
           ...body
        }

        return res.status(200).json({
            message: "ok",
            user: users[userIndex]
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:"xatolik"
        });
    }
});

//delete

app.delete("/users/:userId", (req, res)=>{
    try {
        const userId = req.params.userId;

        const userIndex = users.findIndex(user => user.id === userId)

        if (userIndex === -1) {
            return res.status(404).json({
                error: "Not found",
                
            })    
        }

        users.splice(userIndex, 1);

        return res.status(200).json({

            message:"ok"  
          })
        


    } catch (error) {
        
    }
})

app.listen(3000, ()=>{
    console.log("Server running on port 3000");   
})