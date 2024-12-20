document.addEventListener('DOMContentLoaded',()=>{

    const products = [
        {id:1,name:`Product1`,price: 10.99},
        {id:2,name:`Product2`,price: 11.99},
        {id:3,name:`Product3`,price: 12.99}
    ]

    let cart = []

    const list = document.getElementById('list')       
    const cartempty = document.getElementById('empty')       
    const total = document.getElementById('total')       
    const totaldisplay = document.getElementById('totaldisplay')       
    const checkout = document.getElementById('button')  
    const checkoutclass = document.getElementById('checkouti') 
    
    products.forEach(product => {
        const li = document.createElement('li')
        li.innerHTML = `
        ${product.name} : ${product.price.toFixed(2)}<button data-id = '${product.id}'>Add to cart</button></li>`
        list.appendChild(li)
    });


    list.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON'){
            const productid = parseInt(e.target.getAttribute('data-id'))
            const product = products.find(p=>p.id === productid)
            addtocart(product)
        }
    })

    function addtocart(product){
        
        cart.push(product)
        render();
    }

    function render(){
        total.innerHTML = ``
        cartempty.classList.add('hidden')
        checkoutclass.classList.remove('hidden')

        let totalprice = 0;

        cart.forEach((item,index) => {
            totalprice += item.price
            const itemadd = document.createElement('h2')

            itemadd.innerHTML=`
            ${item.name} : ${item.price}`

            totaldisplay.textContent = `Total : ${totalprice}`
            total.appendChild(itemadd)
        });

    }


})