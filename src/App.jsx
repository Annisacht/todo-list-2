import { useState } from 'react'
import  TodoList  from "./components/TodoList"
import FilterBtn from "./components/FilterBtn"
import './App.css'

function App() {

  return (
    <>
      <div>
        <h1>My Todo List</h1>
        <FilterBtn />
        <TodoList />
      </div>
    </>
  )
}

export default App
