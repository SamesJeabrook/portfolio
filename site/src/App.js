import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import './generic/styles/icons.css';

// page components
import Homepage from './home/Homepage';
import Projects from './projects/Projects';
import Project from './project/Project';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminBio from './admin/AdminBio';
import ErrorPage from './404/404';

import Defaults from './default.json';

class App extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      isAuth : false
    }
    this.toggleAuth = this.toggleAuth.bind(this);
  }

  retrieveUserBio(){
    axios.get('/api/user/bio/samesJeabrook').then((res) => {
      this.setState({
          userBio: res.data.data
      });
    }, (res) => {
        this.setState({
          userBio: Defaults.data
        });
        console.warn("Failed to load from API so using predefined user defaults");
    })
  }

  toggleAuth(){
    let authState = this.state.isAuth ? false : true;
    this.setState({
      isAuth: authState
    });
  }

  componentWillMount(){
    this.retrieveUserBio();
  }

  render() {

    let {userBio, isAuth} = this.state;
    
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route 
        {...rest} 
        render={props =>
          isAuth ? (<Component {...props} /> ): (<Redirect to={{
            pathname: "/admin",
            state : {from : props.location }
          }}/>
        )}
      />
    )

    const HomePageRoute = () => {
      return(<Homepage userBio={userBio} />)
    }

    const LoginRoute = () => (
      <AdminLogin toggleAuth={this.toggleAuth} isAuth={isAuth}/>
    )

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePageRoute} />
          <Route exact path="/projects" component={Projects} />
          <Route path="/project/:id" component={Project} />
          <Route exact path="/admin" component={LoginRoute} />
          <PrivateRoute path="/admin/dashboard" component={AdminDashboard} />
          {/* <PrivateRoute path="/admin/profile" component={AdminBio} /> */}
          <Route path="/admin/profile/:id" component={AdminBio} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
