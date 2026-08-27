const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const emptyState = document.getElementById("emptyState");

addButton.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addTodo();
});

function updateListState() {
  const items = todoList.querySelectorAll(".todo-item");
  const completedItems = todoList.querySelectorAll(".is-completed");

  emptyState.hidden = items.length > 0;
  todoCount.textContent = completedItems.length > 0
    ? `${items.length}件中 ${completedItems.length}件完了`
    : `${items.length}件`;
}

function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") {
    todoInput.focus();
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
  completeButton.type = "button";
  completeButton.className = "complete-button";
  completeButton.textContent = "完了";
  completeButton.setAttribute("aria-label", `「${text}」を完了にする`);
  completeButton.addEventListener("click", () => {
    const isCompleted = span.classList.toggle("completed");
    li.classList.toggle("is-completed", isCompleted);
    completeButton.textContent = isCompleted ? "戻す" : "完了";
    completeButton.setAttribute(
      "aria-label",
      `「${text}」を${isCompleted ? "未完了に戻す" : "完了にする"}`
    );
    updateListState();
  });

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "削除";
  deleteButton.setAttribute("aria-label", `「${text}」を削除する`);
  deleteButton.addEventListener("click", () => {
    li.remove();
    updateListState();
  });

  actions.appendChild(completeButton);
  actions.appendChild(deleteButton);

  content.appendChild(span);
  content.appendChild(time);

  li.appendChild(content);
  li.appendChild(actions);

  actions.append(completeButton, deleteButton);
  li.append(span, actions);
  todoList.appendChild(li);

  todoInput.value = "";
  todoInput.focus();
  updateListState();
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
updateListState();
