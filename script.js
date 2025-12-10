// Logic for To Do 

// Select DOM elements(like input tag, button tag etc. by locating them with their id's)
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

//Try to load saved todo's from local storage
const saved = localStorage.getItem('todos');

//This is ternary operator. 
// This line means if saved is not null then -> JSON.parse()
// and if saved is null then -> return empty array i.e. [].
const todos = saved ? JSON.parse(saved) : [];


function saveTodos() {
    //This will save the todos in local storage.
    localStorage.setItem('todos', JSON.stringify(todos));

}

//create a dom node for a todo object and append it to the list.
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    //checkbox to toggle completion of ToDo
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    // !! = this is double not operator ehich is used to 
    // convert the any value to boolean value
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        //To Do : visual feedback : strike through when completed
        textspan.style.textDecoration = todo.completed ? 'line-through' : "";
        saveTodos();
    })

    //Text of todo
    const textspan = document.createElement("span");
    textspan.textContent = todo.text;
    textspan.style.margin = '0 8px';
    if (todo.completed) {
        textspan.style.textDecoration = 'line-through';
    }
    //Add double click event listner to edit todo
    textspan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim();
            textspan.textContent = todo.text;
            saveTodos();

        }
    })

    //Delete To Do Button
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    })

    li.appendChild(checkbox);
    li.appendChild(textspan);
    li.appendChild(delBtn);
    return li;

}

//Render the whole todo list from todo array
function render() {
    list.innerHTML = '';

    //Recreate each item
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });

}

function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return
    }

    //push a new todo object
    todos.push({ text: text, completed: false });
    input.value = '';
    render()
    saveTodos()
}

addBtn.addEventListener("click", addTodo);
input.addEventListener('keydown',(e)=>{
    if(e.key=="Enter"){
        addTodo();
    }
})
render();


