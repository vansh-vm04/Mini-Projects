function getSavedData() {
  console.log(localStorage.length);
  if (localStorage.length !== 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let div = document.createElement("div");
      div.id = "todo";
      document.querySelector("#main").appendChild(div);
      let savedData = localStorage.getItem(localStorage.key(i));
      let arr = JSON.parse(savedData)
      let title = arr[0];
      let desc = arr[1];
      let todo = document.getElementById("main").lastElementChild;
      todo.innerHTML = `<h2>${title}</h2>
    <p id="delete-desc">${desc}</p>
    <button  class="delete" id="delete">Delete</button>`;
    }
  }
}

let submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  let div = document.createElement("div");
  div.id = "todo";
  document.querySelector("#main").appendChild(div);
  let titlec = title.value;
  let descc = desc.value;
  localStorage.setItem(localStorage.length, JSON.stringify([titlec, descc]));
  let todo = document.getElementById("main").lastElementChild;
  todo.innerHTML = `<h2>${titlec}</h2>
   <p>${descc}</p>
   <button  class="delete" id="delete">Delete</button>`;
});
let del = document.getElementById("clr");
del.addEventListener("click", (e) => {
  e.preventDefault();
  title.value = "";
  desc.value = "";
});
const main = document.getElementById("main");
main.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    const todoItem = event.target.parentElement;
    let text = todoItem.firstElementChild.innerText;
    console.log(text+' Deleted')
      for(let i =0;i<localStorage.length;i++){
        let savedData = localStorage.getItem(localStorage.key(i));
      let arr = JSON.parse(savedData)
        if(arr[0]==text){
          localStorage.removeItem(localStorage.key(i));
          break;
        }
      }
    todoItem.remove();
  }
});
const icon = document.getElementById("icon");
const e = document.body;
const nav = document.getElementById("nav");
const darkbtn = document.querySelector(".darkbtn");
darkbtn.addEventListener("click", () => {
  icon.classList.toggle("active");
  e.classList.toggle("dark");
  main.classList.toggle("dark");
  nav.classList.toggle("dark");
  darkbtn.classList.toggle("dark");
});
