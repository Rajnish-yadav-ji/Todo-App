let tasks = [];


let mode = document.querySelector('.mode')

mode.addEventListener('click',()=>{
  changeTheme();
})

function changeTheme(){
  document.body.classList.toggle('dark')
}


function renderTask(){
  const list = document.getElementById('taskList')
  list.innerHTML = ''

  tasks.forEach((task,index)=>{
    const div = document.createElement('div')
    div.setAttribute('class','singleTask')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = task.completed
    checkbox.onchange = ()=> toggleTask(index);

    const span = document.createElement('span')
    span.textContent = task.text
    if(task.completed){
      span.style.textDecoration = 'line-through'
    }

    const delBtn = document.createElement('button')
    delBtn.textContent = 'Delete'
    delBtn.setAttribute('class','delBtn')
    delBtn.onclick = ()=> deleteTask(index);

    div.appendChild(checkbox);
    div.appendChild(span);
    div.appendChild(delBtn);

    list.appendChild(div)
  })
}

function toggleTask(index){
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function deleteTask(index){
  tasks.splice(index,1);
  saveAndRender();
  }

function saveAndRender(){
  localStorage.setItem('tasks',JSON.stringify(tasks));
  renderTask();
}


window.addEventListener('DOMContentLoaded',()=>{
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  renderTask();
})


function addTask(){
  let input = document.getElementById('taskInput')
  const text = input.value.trim();

  if(text){
    tasks.push({text:text,completed:false});
    input.value = ''
    saveAndRender();
  }
  else{
    alert('Please enter a task !');
  }
}

document.getElementById('taskInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
});
