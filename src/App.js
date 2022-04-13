import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Header from './components/Header';
import Home from './components/Home';
import React, { useEffect } from 'react';
import { getUserAuth } from './actions';
import { connect } from 'react-redux';

function App(props) {
  useEffect(()=>{
    // console.log("App :", props)
    props.getUserAuth();
  },[])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
        </Switch>
        <Route path="/home">
          <Header/>
          <Home/>
        </Route>
      </Router>
    </div>
  );
}

const mapStateToprops = (state)=> {
  // console.log(state)
  return {};
}
const mapDispatchToProps=(dispatch)=>({
  getUserAuth: ()=> dispatch(getUserAuth()),
});
export default connect(mapStateToprops, mapDispatchToProps )(App);
