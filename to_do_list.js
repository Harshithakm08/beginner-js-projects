const input=document.getElementById("task-input");
const addbtn=document.getElementById("add-btn");
const tasklist=document.getElementById("task-list");

window.addEventListener('load', loadTasks);

addbtn.addEventListener('click',addTask);

input.addEventListener('keypress', function(e){
    if((e.key)==="Enter"){
        addTask();
    }
});

function addTask(){
    const tasktext = input.value.trim();

    if(tasktext==''){
        alert('Please enter the task');
        return;
    }

    const taskItem = createTaskElement(tasktext);
    tasklist.appendChild(taskItem);
    saveTasks();

    input.value = '';
}

function createTaskElement(text){
    const li=document.createElement('li');

    li.classList.add('task-text');
    li.innerText=text;
    // const span = document.createElement('span');
    // span.className='task-text';
    // span.innerText=text;

    li.addEventListener('click', function(){
        li.classList.toggle('completed');
        saveTasks();
    });

    const deletebtn=document.createElement('button');
    deletebtn.className='delete-btn';
    deletebtn.innerText='delete';
    deletebtn.onclick=() =>{
        li.remove();
        saveTasks();
   };

   // li.appendChild(span);
    li.appendChild(deletebtn);

    return li;
}






function saveTasks(){
    try {
        const tasks = [];
        document.querySelectorAll("#task-list li").forEach((li) => {
            const text = li.firstChild.textContent.trim();
            const completed = li.classList.contains('completed');
            tasks.push({ text, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks:', error);
    }
}

function loadTasks() {
    try {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks.forEach((task) => {
            const taskItem = createTaskElement(task.text);
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            tasklist.appendChild(taskItem);
        });
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}