import "./App.css";
import React, { useState } from 'react'
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = ()=>{
  const apikey = "11d27f6291bc49909dca4bfaa4da1054" 
  // const apikey = "dbe57b028aeb41e285a226a94865f7a7";
  // const apikey = process.env.REACT_APP_NEWS_API_KEY;
  const country = "in";
  const pageSize = 9;

  const [progress, setProgress] = useState(0);
  

    return (
      <div>
      <Router>
        <Navbar />
        <LoadingBar color='#f11946' height={3} progress={progress}/>
        <Switch>
          <Route exact path="/">
            <News setProgress={setProgress}  country={country} category="general" pageSize={pageSize} apikey={apikey} key="general"/>
          </Route>
          <Route exact path="/general">
            <News setProgress={setProgress}  country={country} category="general" pageSize={pageSize} apikey={apikey} key="general"/>
          </Route>
          <Route exact path="/business">
            <News setProgress={setProgress}  country={country} category="business" pageSize={pageSize} apikey={apikey} key="business"/>
          </Route>
          <Route exact path="/entertainment">
            <News setProgress={setProgress}  country={country} category="entertainment" pageSize={pageSize} apikey={apikey} key="entertainment"/>
          </Route>
          <Route exact path="/health">
            <News setProgress={setProgress}  country={country} category="health" pageSize={pageSize} apikey={apikey} key="health"/>
          </Route>
          <Route exact path="/science">
            <News setProgress={setProgress}  country={country} category="science" pageSize={pageSize} apikey={apikey} key="science"/>
          </Route>
          <Route exact path="/sports">
            <News setProgress={setProgress}  country={country} category="sports" pageSize={pageSize} apikey={apikey} key="sports"/>
          </Route>
          <Route exact path="/technology">
            <News setProgress={setProgress}  country={country} category="technology" pageSize={pageSize} apikey={apikey} key="technology"/>
          </Route>
        </Switch>
      </Router>
      </div>
    )
  }

  export default App;
