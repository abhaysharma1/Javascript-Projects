document.addEventListener('DOMContentLoaded',()=>{

    const input = document.getElementById('textbox')
    const add = document.getElementById('addbut')
    const list = document.getElementById('list')

    let arr = JSON.parse(localStorage.getItem("tasks")) || []

    arr.forEach(task => {
        render(task)
    });

    add.addEventListener('click',()=>{
        const text = input.value.trim()
        if (text === '')return;

        const task = {
            id: Date.now(),
            texttask: text,
            completed: false
        }

        arr.push(task)
        save()
        render (task);
        input.value = ""
    })

    function save (){
        localStorage.setItem("tasks",JSON.stringify(arr))
    }


    function render (task){
        const li = document.createElement('li')
        li.attributes = task.id;
        li.innerHTML = `
        <span>${task.texttask}</span>
        <button>Delete</button>
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
