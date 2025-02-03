import React, { useEffect, useState } from 'react'

const App = () => {

  let [num, setNum] = useState(5)

  const actionClick = () => {
    setNum(num + 1)
  }

  useEffect(()=>{
    console.log(1)
  }, [])
    
  return (
    <>
      <div>{num}</div>
      <button onClick={actionClick}>up</button>
    </>
  )
}

export default App