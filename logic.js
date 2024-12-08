let input=document.querySelector(".input")
let submit=document.querySelector(".add")
let taskDiv=document.querySelector(".tasks")

//empty Array to Store The Tasks
let arrayOfTasks=[]

//check if local storage 
if(localStorage.getItem("tasks")){
    arrayOfTasks=JSON.parse(localStorage.getItem("tasks"))
}
//trigger get data from local storage function
getDataFromLocalStorage()

//Click on Task Element
taskDiv.addEventListener("click",function(e){
//delete Button
if(e.target.classList.contains("del")){
//remove from Local Storage
deleteTasksWith(e.target.parentElement.getAttribute("data-id"))
//remove Element From Page
e.target.parentElement.remove()
//task Element
if(e.target.classList.contains("task")){
    //Toggle Completed for The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"))
    //Toggle Done Class
    e.target.classList.toggle("done")
}
}
})
//Add Task 
submit.onclick=function(){
if(input.value !== ""){
    addTaskToArray(input.value)//add Task To Array Of Tasks
    input.value=" "//Empty Input Field   
}
}

function addTaskToArray(taskText){
//Task data
const task={
    id:Date.now(),
    title:taskText,
    completed:false
};
//push Task To Array Of Tasks
if(task.title!==" "){
    arrayOfTasks.push(task)
}
//Add Task To Page
addTasksToPageFrom(arrayOfTasks)
//Add Task To Local Storage
addDataToLocalStorageFrom(arrayOfTasks)
}

function addTasksToPageFrom(arrayOfTasks){
    //Empty Task Div 
    taskDiv.innerHTML=" "
    //Looping on Array of Task
    arrayOfTasks.forEach((task)=>{
        let div=document.createElement("div")
        div.className="task"
        //check if task is Done
        if(task.completed){
           div.className="task done"
        }
        div.setAttribute("data-id",task.id)
        div.appendChild(document.createTextNode(task.title))
      // create delete Button
      let span=document.createElement("span")
      span.className="del"
      span.appendChild(document.createTextNode("delete"))
      //append Button To Main Div
      div.appendChild(span)
      //Add Task Div To Tasks Container
      taskDiv.appendChild(div)
      console.log(div)
    })
}

function addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks))
}

function  getDataFromLocalStorage(){
    let data=window.localStorage.getItem("tasks")
    if(data){
        let tasks=JSON.parse(data)
        addTasksToPageFrom(tasks)
    }
}

function deleteTasksWith(taskId){
    arrayOfTasks=arrayOfTasks.filter((task)=> task.id != taskId)
    addDataToLocalStorageFrom(arrayOfTasks)
}

function toggleStatusTaskWith(taskId){
    for(var i=0 ;i<addTaskToArray.length ;i++){
      if(arrayOfTasks[i].id == taskId){
        arrayOfTasks[i].id==false ? arrayOfTasks[i].id=true:arrayOfTasks[i].id =true
      }
    }
    addDataToLocalStorageFrom(arrayOfTasks)
}