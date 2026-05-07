import React from 'react'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
        <Navbar title='Sheriyans' color='pink' links={['Home','About','Account','Contact']} />
        
    </div>
  )
}

export default App