
import styled from "styled-components"

const H1= styled.h1`
  color: red;
  background-color: blue;
  padding: 10px;
  margin: 10px;
  `

function App() {

  return (
    <div className="App">
      <H1>Hello World</H1>
      <h2 className="bg-primary text-red-500">hicham</h2>
      <button className="btn btn-active btn-secondary">Secondary</button>
      </div>
  )
}

export default App
