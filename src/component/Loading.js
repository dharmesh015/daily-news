import React, { Component } from 'react'
import loading from './loading.gif'

// export class Loading extends Component {
const Loading =()=>{
  // render() {
    return (
      <div  className='text-center'>
     
      <img src={loading} alt="loading"/> 
      </div>
    )
  // }
}

export default Loading
