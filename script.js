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

  const postedAt = new Date();

  const li = document.createElement("li");
  li.className = "todo-item";

  const content = document.createElement("div");
  content.className = "todo-content";

  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = text;

  const time = document.createElement("time");
  time.className = "todo-time";
  time.dateTime = postedAt.toISOString();
  time.textContent = `投稿時間: ${formatPostedTime(postedAt)}`;

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

  content.appendChild(span);
  content.appendChild(time);

  li.appendChild(content);
  li.appendChild(actions);

  todoList.appendChild(li);

  todoInput.value = "";
  todoInput.focus();
}

function formatPostedTime(date) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
