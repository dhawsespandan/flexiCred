const express=require("express");
const app=express();
app.use(express.json());


app.listen(3000,() => {
    console.log("Server running on port 3000");
});

let todos=[]
let idCounter=1;

app.post("/todos",(req,res) =>{
    const todo={
        id:idCounter++,
        title:req.body.title,
        completed:false
    };
    todos.push(todo);
    res.status(201).json(todo);
});

app.get("/todos",(req,res) =>{
    res.json(todos);
});

app.put("/todos/:id",(req,res)=> {
    const todo=todos.find(t=>t.id==req.params.id);
    if(!todo){
        return res.status(404).send("Todo not found");
    }
    todo.title=req.body.title;
    res.json(todo);
});

app.delete("/todos/:id",(req,res)=>{
    todos=todos.filter(t=>t.id!=req.params.id);
    res.send("Todo deleted");
});