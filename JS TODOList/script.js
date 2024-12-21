document.addEventListener('DOMContentLoaded', ()=>{



    const input = document.getElementById(`textbox`)
    const addbut = document.getElementById(`addbut`)
    const list = document.getElementById(`list`)

    let arr = JSON.parse(localStorage.getItem("tasks")) || [ ]

    arr.forEach(task => {
            rendertasks(task) 
    });

    addbut.addEventListener('click',()=>{
        const text = input.value.trim()
        if (text === ""){return}

        const task = {
            id : Date.now(),
            completed: false,
            text: text
        }
        
        rendertasks(task)
        arr.push(task)
        save()
        input.value = ""
    })


    function save () {
        localStorage.setItem("tasks",JSON.stringify(arr))
    }

    function rendertasks (task){
        const li = document.createElement("li")
        li.setAttribute = task.id

        if (task.completed){
            li.classList.add('completed')
        }
        li.innerHTML = `
        <span>${task.text}</span>
        <button> Delete </button>
        `

        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed
            li.classList.toggle('completed')
            save ()
        })


        li.querySelector('button').addEventListener('click',(e) => {
            e.stopPropagation() //prevent toggle from firing

            arr = arr.filter(t => t.id !== task.id)
            li.remove()
            save()
            rendertasks()
        })

        list.appendChild(li) 
    }




})
