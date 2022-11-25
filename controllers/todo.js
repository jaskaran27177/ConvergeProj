import {v4 as uuidv4} from 'uuid'
let todos =[]
let foundtodo;
let searched=[]
export const createtodo=(req,res)=>{
    const todo =req.body
    todos.push({...todo, id:uuidv4(),email:req.user.email})
    res.redirect('/todos')
}
export const gettodos=(req,res)=>{
    console.log(todos)
    res.render('todo.ejs',{todos:todos,changetodo:undefined,email:req.user.email})
    
}
export const get_a_todo=(req,res)=>{
    const {id}=req.params
    foundtodo= todos.find((todo)=>todo.id===id)
    res.render('todo.ejs',{todos:todos,changetodo:foundtodo.id,email:req.user.email})
}
export const deletetodo=(req,res)=>{
    const {id}=req.params
    todos=todos.filter((todos)=>todos.id !== id)
    res.render('todo.ejs',{todos:todos,changetodo:undefined,email:req.user.email})
}
export const changetodo=(req,res)=>{
    const {id}=req.params
    const {content}=req.body
    const update=todos.find((todos)=>todos.id===id)
    if (content){
        update.content=content
    }
    res.render('todo.ejs',{todos:todos,changetodo:undefined,email:req.user.email})

}

export const searchtodo=(req,res)=>{
    const {searchbar}=req.body
    
    searched=[]
    let foundid = todos.find((todo)=>todo.id===searchbar)
    if(foundid){
        searched.push(foundid)
    }
    todos.forEach((obj, i) => {
        if(obj.content.includes(searchbar) || obj.timeday.toUpperCase()===searchbar.toUpperCase()||obj.importance.toUpperCase()===searchbar.toUpperCase()){
            searched.push(obj)
        }
    });

    res.render('todo.ejs',{todos:searched,changetodo:undefined,email:req.user.email})
    
}