
function createTodoHtml(id, text, checked) {
    
    const article = document.createElement('article');
    article.setAttribute("id", id);

    var checkBox = document.createElement('input');
    checkBox.setAttribute("type", 'checkbox');
    checkBox.setAttribute("id", id);
    checkBox.setAttribute("value", checked);
    checkBox.setAttribute("onclick",'getCheckValueAndParentId(this)');
    if (checkBox.value=true){
        checkBox.checked=true;
    }else{
        checkBox.checked=false;
    }
    const buttonDel = document.createElement('button');
    buttonDel.setAttribute('id', id);
    buttonDel.setAttribute("onclick", 'replyId(this)')
    buttonDel.setAttribute("class", 'del-btn');
    buttonDel.innerText = "Delete";


    article.innerHTML = `
   <h2 id="text" value=${id}> ${text}</h2>
   
   `
   
   
    article.append(checkBox, buttonDel);

    return article;

}



async function getTodos() {
    try {
        const response = await fetch('http://localhost:3000/todos');
        return response.json();
    } catch (err) {
        console.log(err);
    }
    

}
const displayTodos = (todos) => {
    const todoList = document.getElementById('todo-list');
    const todoHtml = todos.map((todo) => createTodoHtml(todo.id, todo.text, todo.checked));
    todoList.append(...todoHtml);

}

async function showTodos() {
    const todos = await getTodos();
    displayTodos(todos);
}





const textInp = document.getElementById("new");
var string="true";
var todoId = Math.floor(Math.random() * 1000, 1);
async function todoServer() {

    const todo = {text: textInp.value,checked:Boolean(string)}
    try {
        const todoServerSide = await fetch('http://localhost:3000/todos/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo),


        })

            .then(response => { return response.json() })


    } catch (err) {
        console.log(err)

    }
    location.reload();
}


function replyId(obj){
    var id=obj.id;
    console.log(id);

    deleteTodo(id);
    return id;
}


async function deleteTodo(id) {


    const delTodo = await fetch('http://localhost:3000/todos/'+id, {
        method: "DELETE",

    })
    location.reload()
}





function getCheckValueAndParentId(obj){
    var val=obj.value;
    var id=obj.id;
    
    var todo={id:id,checked:val}

    if(obj.checked===false){
        val=obj.checked;
        
    }
    editTodo(todo.id,todo.checked);
    
    console.log(id ,val);
}


async function editTodo(id){

    const edTodo=await fetch('http://localhost:3000/todos/'+id,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify()
        
    })
    
}




