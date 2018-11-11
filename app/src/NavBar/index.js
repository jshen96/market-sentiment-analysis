import React, { Component } from 'react'
import SearchBar from '../SearchBar';
import Arrow from '../Arrow';
import {Link} from 'react-router-dom';
import './index.css';
import {setNavbarRef} from './NavBarService';
import Lottie from 'react-lottie';
import fever from './fever.json';
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            returnHome: false
        }

        setNavbarRef(this);
    }
    returnHome = (atHome) => {
        console.log(atHome)
        this.setState({returnHome: atHome})
    }

      render() {
        const defaultOptions2 = {
            loop: true,
            autoplay: true, 
            animationData: fever,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };
          let appName = "Headlines"
        if (this.state.returnHome) {
            return (
                <div className="navbar">
                  <Link to="/">
                  <div className="left-nav-list" onClick={() => {this.returnHome(false)}}>
                  <div className="back">
                    <Arrow />
                  </div>
                  <div className="mini">{appName}</div>  
                  </div>
                  </Link>
            
                </div>
              )
        }
        return (
          <div className="navbar">
            <div className="left-nav-list">
            <Lottie options={defaultOptions2}
                height={200}
                width={200}
                />
                <div className="title leftadjustment">{appName}</div>
            </div>
            
            <SearchBar /> 
          </div>
        )
      }
}

export default NavBar;
