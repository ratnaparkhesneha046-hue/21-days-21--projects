import React from 'react'
import { useMyStore} from '../store/mystore'
const SummaryExpenses = () => {
  return (
    
    <section className='flex'>
        <aside className='card'>
            <h1>Total Income</h1>
            <p className='income'> ₹ 250000</p>
        </aside>
        <aside className='card'>
            <h1>Total Expenses</h1>
            <p className='expense'> ₹ 50000</p>

        </aside>
        <aside className='card'>
            <h1>Balance</h1>
            <p className='balance'> ₹ 200000</p>
            
        </aside>
    </section>
  )
}

export default SummaryExpenses
