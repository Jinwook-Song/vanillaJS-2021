const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = []; // 해야할 일을 생성했을 때 array에 추가되도록
let idNumbers = 1;

function deleteToDo(event) {
  // 브라우져 화면, element에서 삭제
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  // storage에 남아있는 리스트 삭제
  const cleanToDos = toDos.filter(function (toDo) {
    // forEach와 마찬가지로 하나씩 실행
    return toDo.id !== parseInt(li.id); // string을 int로 변환
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // JSON.stringify 자바스크립트 object를 string으로 바꿔줌
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = idNumbers++;

  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); // string을 object로 변환
    parsedToDos.forEach(function (
      toDo // array 하나하나에 대해서 실행
    ) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
