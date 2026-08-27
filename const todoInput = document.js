const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");

addButton.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  const text = todoInput.value.trim();

  if (text === "") {
    return;
  }

  const li = document.createElement("li");
  li.className = "todo-item";

  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = text;

  const actions = document.createElement("div");
  actions.className = "actions";

  const completeButton = document.createElement("button");
  completeButton.className = "complete-button";
  completeButton.textContent = "完了";
  completeButton.addEventListener("click", () => {
    span.classList.toggle("completed");
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "削除";
  deleteButton.addEventListener("click", () => {
    li.remove();
  });

  actions.appendChild(completeButton);
  actions.appendChild(deleteButton);

  li.appendChild(span);
  li.appendChild(actions);

  todoList.appendChild(li);

  todoInput.value = "";
  todoInput.focus();
}
