document.addEventListener('DOMContentLoaded',()=>{

  const form = document.getElementById('expense-form')
  const expense_name = document.getElementById('expense-name')
  const amount = document.getElementById('expense-amount')
  const expense_list = document.getElementById('expense-list')
  const total = document.getElementById('total-amount')


  let expenses = JSON.parse(localStorage.getItem("expenses")) || []
  let total_amount = calculate_total()
  updatetotal()
  



  form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const name = expense_name.value.trim()
    const price = parseFloat(amount.value.trim())

    if (name !== '' && !isNaN(price) && price > 0){

      const new_expense = {
        id:Date.now(),
        name: name,
        price:price
      }

      expenses.push(new_expense)
      savetolocal();
      renderlist()
      updatetotal()

      expense_name.value = ''
      amount.value = ''
    }

  })

  function renderlist (){
    expense_list.innerHTML = ''
    
    expenses.forEach(expense => {
      let li = document.createElement('li')
      li.innerHTML = `
      ${expense.name} - $${expense.price}
      <button data-id = '${expense.id}'>Delete</button>`  
      expense_list.appendChild(li)    
    });

  }

  function savetolocal ( ){
    localStorage.setItem('expenses',JSON.stringify(expenses))
  }


  function calculate_total(){
    let ans = 0
    expenses.forEach(expense => {
      ans += expense.price
    });
    return ans
  }


  function updatetotal (){
    total_amount = calculate_total()
    total.textContent = total_amount.toFixed(2)
  }


  expense_list.addEventListener('click',(e)=>{
    if (e.target.tagName !== 'BUTTON') return;

      const expense_id = parseInt(e.target.getAttribute('data-id'))

      expenses = expenses.filter (expense => expense.id !== expense_id)

      savetolocal()
      updatetotal()
      renderlist()

  })
})