import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
// import logo from './logo.svg';
import './App.css';
import  Home from './Home';
import TrendDashboard from './TrendDashboard';
import  NavBar from './NavBar';
import axios from 'axios';
import Lottie from 'react-lottie';
import {Route, Switch} from 'react-router';
import {withRouter} from 'react-router-dom'
import {returnHome} from './NavBar/NavBarService';
import noti from './notification.json';


class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      companyData: [],
      hasNotification: false
    }
    this._var1 = 0;
    this._notificationContent = {}
  }

  componentDidMount(){
    this.retrieveData();
  }

  renderNotification = () => {
    const defaultOptions = {
      loop: false,
      autoplay: true, 
      animationData: noti,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    return (
      <div className="notificationCard">
        <div className="notificationCard-content">
           <Lottie options={defaultOptions}
              height={90}
              width={90}
            />
         
          {
            this._notificationContent.message
          }
        </div>
      </div>
    )
  }

  updateNotification = (data) => {
    this._notificationContent = data;
    this.setState({hasNotification: true})
  }

  resetNotification = () => {
    this.setState({hasNotification: false})
    this._notificationContent = {}
  }

  getData = async () => {
    try {
      return await axios.get('http://localhost:3000/data')
    } catch (error) {
      console.error(error)
    }
  }
  
  retrieveData = async () => {
    const responseFromServer = await this.getData()
    console.log(responseFromServer)
  }
  

  toggle_outside = (e)  => {
    this.setState({is_checked: false, is_user_checked: false});
  }

  render() {
    return (
      <div className="App-header">
    
          <NavBar />
          {(this.state.hasNotification) && (this.renderNotification())}
          <div className="site-content" onClick={this.toggle_outside}>
          <Switch onChange={this.onRouteChange}>
            <Route path='/trends' render={(props) => <TrendDashboard />}/>
            <Route path='/' component={Home}/>
          </Switch>
          </div>
      </div>


    );
  }
}

export default App;
