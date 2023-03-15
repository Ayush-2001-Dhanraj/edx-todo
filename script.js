const classNames = {
  TODO_ITEM: "todo-container",
  TODO_CHECKBOX: "todo-checkbox",
  TODO_TEXT: "todo-text",
  TODO_DELETE: "todo-delete",
};

const list = document.getElementById("todo-list");
const input = document.getElementById("todo-input");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");

function updateCount() {
  const listItems = list.querySelectorAll("li");
  itemCountSpan.innerText = listItems.length;
  let uncheckedCount = 0;
  for (let i = 0; i < listItems.length; i++) {
    if (!listItems[i].classList.contains(classNames.TODO_CHECKBOX)) {
      uncheckedCount++;
    }
  }
  uncheckedCountSpan.innerText = uncheckedCount;
}

function newTodo() {
  if (!input.value) return;
  const listItem = document.createElement("li");
  listItem.className = classNames.TODO_ITEM;
  listItem.id = Math.floor(Math.random() * 100);
  const text = document.createTextNode(input.value);
  listItem.appendChild(text);
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.className = classNames.TODO_DELETE;
  deleteBtn.onclick = function (e) {
    e.stopPropagation();
    list.removeChild(listItem);
    updateCount();
  };
  listItem.onclick = function () {
    if (listItem.classList.contains(classNames.TODO_CHECKBOX)) {
      listItem.classList.remove(classNames.TODO_CHECKBOX);
    } else {
      listItem.classList.add(classNames.TODO_CHECKBOX);
    }
    updateCount();
  };
  listItem.appendChild(deleteBtn);
  list.appendChild(listItem);
  updateCount();
  input.value = input.getAttribute("value");
}
