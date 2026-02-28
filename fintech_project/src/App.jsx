import React from 'react'
import Header from './components/Header'
import SummaryExpenses from './components/SummaryExpenses'
import TransactionForm from './components/TransactionForm'
import TransactionsList from './components/TransactionsList'

const App=() => {
  return (
    <main className='container'>
      <Header />
      <SummaryExpenses />
      <TransactionForm />
      <TransactionsList />
      


    </main>
  )
}

export default App