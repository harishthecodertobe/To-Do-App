const input = document.getElementById("todo-written-area");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-area");

// Load saved todos
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Create a todo item
function createTodoNode(todo, index) {
    const li = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    // Todo text
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = "0 10px";

    if (todo.completed) {
        textSpan.style.textDecoration = "line-through";
    }

    // Toggle complete
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        textSpan.style.textDecoration = todo.completed
            ? "line-through"
            : "none";
        saveTodos();
    });

    // Edit on double click
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit Todo:", todo.text);

        if (newText !== null && newText.trim() !== "") {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";

    delBtn.addEventListener("click", () => {
        todos.splice(index, 1);
        saveTodos();
        render();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return li;
}

// Render all todos
function render() {
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        list.appendChild(createTodoNode(todo, index));
    });
}

// Add new todo
function addTodo() {
    const text = input.value.trim();

    if (text === "") {
        return;
    }

    todos.push({
        text: text,
        completed: false
    });

    input.value = "";
    saveTodos();
    render();
}

// Button click
addBtn.addEventListener("click", addTodo);

// Enter key
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

// Initial render
render();