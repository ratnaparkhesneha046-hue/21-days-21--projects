import React, { useState } from 'react'
import { useMyStore} from '../store/mystore'
const TransactionForm = () => {
    const addTransaction=useMyStore((state)=> state.addTransaction)
    const [form,setForm]=useState({
        title:"",
        amount:"",
        type:"expense",
        category:""
    })
    const handleSubmit=(e)=>{
        e.preventDefault();
        addTransaction({...form,id:Date.now()})
        setForm({
        title:"",
        amount:"",
        type:"expense",
        category:""
    })
    }
  return (
    <section className='card'>
     <form onSubmit={handleSubmit}>
        <input placeholder='Title' required value={form.title} onChange={(e)=> setForm({...form,title:e.target.value})}/>
        <input type="number" placeholder='Amount' required value={form.amount} onChange={(e)=> setForm({...form,amount:e.target.value})}/>
        <select value={form.type} onChange={(e)=> setForm({...form,type:e.target.value})}>
            <option value="expense"> Expense</option>
            <option value="income"> Income</option>
        </select>
        <input placeholder='Category' required value={form.category} onChange={(e)=> setForm({...form,category:e.target.value})}/>
        <button type='submit' className='btn'> Add</button>
     </form>
    </section>
  )
}

export default TransactionForm