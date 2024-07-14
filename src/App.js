

import React, { Component } from 'react'
import Nevbar from './component/Nevbar'
import News from './component/News'
import LoadingBar from 'react-top-loading-bar'


import {
  BrowserRouter,
  Route,
  Routes,

} from "react-router-dom";


export class App extends Component {
  state={
    progress:0
  }
  setprogress=(progress)=>{
  this.setState  ({progress:progress})
  }
  render() {
    return (
      <BrowserRouter>
        <Nevbar />
        <LoadingBar
          height={3}
          color='#f12946'
          progress={this.state.progress}

        />

        <Routes>
          
          <Route exact path="/" element={<News setprogress={this.setprogress} pageSize={6} country='in' category="general" />} ></Route>


          <Route exact path="/business" element={<News setprogress={this.setprogress} key="business" pageSize={6} country='in' category="business" />} ></Route>



          <Route exact path="/entertainment" element={<News setprogress={this.setprogress} key="entertainment" pageSize={6} country='in' category="entertainment" />} ></Route>



          <Route exact path="/general" element={<News key="general" setprogress={this.setprogress} pageSize={6} country='in' category="general" />} ></Route>



          <Route exact path="/health" element={<News key="health"  setprogress={this.setprogress} pageSize={6} country='in' category="health" />} />

          <Route exact path="/scince" element={<News key="scince" setprogress={this.setprogress} pageSize={6} country='in' category="scince" />} />


          <Route exact path="/sports" element={<News key="sports" setprogress={this.setprogress} pageSize={6} country='in' category="sports" />} />


          <Route exact path="/technology" element={<News key="technology" setprogress={this.setprogress} pageSize={6} country='in' category="technology" />} />

        </Routes>

      </BrowserRouter>
    )
  }
}

export default App

