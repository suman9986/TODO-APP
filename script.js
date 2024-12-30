window.addEventListener('load',()=>{
    let form  = document.querySelector("#newForm")
    let input  = document.querySelector("#newInput")
    let list_el  = document.querySelector("#tasks")

    let addSound  =  document.getElementById("add")
    let deleteSound = document.getElementById("delete")
    // Load tasks from localStorage on page load
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            createTaskElement(task.text , task.read);
        });
    };

      // Save tasks to localStorage
      const saveTasks = () => {
        const tasks = Array.from(document.querySelectorAll(".task")).map(task_el => {
            return {
                text: task_el.querySelector(".text").value,
                read: task_el.querySelector(".checkbox").checked
            };
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
let createTaskElement = (taskText , isRead = false)=>{
    let task_el = document.createElement("div")
        task_el.classList.add("task")
        let task_content_el = document.createElement("div")
        task_content_el.classList.add("content")
        task_el.appendChild(task_content_el)

        let task_checkbox_wrapper = document.createElement("label")
        task_checkbox_wrapper.classList.add("custom-checkbox")

        let task_checkbox_el = document.createElement("input")
        task_checkbox_el.type = "checkbox"
        task_checkbox_el.classList.add("checkbox")
        task_checkbox_el.checked = isRead

        let checkmark_span = document.createElement("span")
        checkmark_span.classList.add("checkmark")
        
        let task_input_el = document.createElement("input")
        task_input_el.classList.add("text")
        task_input_el.type = "text"
        task_input_el.value = taskText
        task_input_el.setAttribute("readonly", "readonly")

        if(isRead) task_input_el.classList.add("read")
        task_checkbox_wrapper.appendChild(task_checkbox_el);
        task_checkbox_wrapper.appendChild(checkmark_span);
        task_content_el.appendChild(task_checkbox_wrapper);
        task_content_el.appendChild(task_input_el);

        let task_action_el = document.createElement("div")
        task_action_el.classList.add("action")

        let task_edit_el = document.createElement("button")
        task_edit_el.classList.add("edit")
        task_edit_el.innerHTML = "Edit"

        let task_delete_el = document.createElement("button")
        task_delete_el.classList.add("delete")
        task_delete_el.innerHTML = "Delete"

        task_action_el.appendChild(task_edit_el)
        task_action_el.appendChild(task_delete_el)
        task_el.appendChild(task_action_el)

        list_el.appendChild(task_el)
        task_checkbox_el.addEventListener('click' , ()=>{
            if(task_checkbox_el.checked){
                task_input_el.classList.add("read")
            }
            else{
                task_input_el.classList.remove("read")
            }
            saveTasks()
        })

        task_edit_el.addEventListener('click', ()=>{
            if(task_edit_el.innerText.toLowerCase() == "edit"){
                task_input_el.removeAttribute("readonly")
                task_input_el.focus()
                task_edit_el.innerText = "Save"  
            }
            else{
                task_input_el.setAttribute("readonly","readonly")
                task_edit_el.innerText = "Edit"
                saveTasks()
            }
            addSound.play()
        })
        task_delete_el.addEventListener('click', ()=>{
            list_el.removeChild(task_el)
            saveTasks()
            deleteSound.play()
        })
}
form.addEventListener("submit",(e)=>{
    e.preventDefault()   // refreshing the page

    let task = input.value
    if(!task){
        alert("please fill out the task")
        return
    }
    createTaskElement(task)
    saveTasks()
    input.value = ""
    addSound.play()
})
loadTasks()
})
