import React from 'react'

const SampleComponent = () => {
  const myObject = { name: 'John Doe', age: 30, city: 'New York' }

  const { name, age, city } = myObject

  return (
    <div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <p>{`Name: ${name}, Age: ${age}, City: ${city}`}</p>
      <button>Click me!</button>
    </div>
  )
}

export default SampleComponent
