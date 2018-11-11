import React, { Component } from 'react'
import './index.css';
import ForceDirectedGraph from '../ForceDirectedGraph';
import {returnHome} from '../NavBar/NavBarService';
import {connect} from 'react-redux';
import fever from './fever.json';
import Lottie from 'react-lottie';
import {populateChart} from '../features/chart/actions';
import {resetPopulation, populateData} from '../features/population/actions';
class Home extends Component {

    constructor(props) {
      super(props);
      this.state = {
        message: false
      }

      this.messageContent = null
      this.props.populateData()
    }
      showComment = (data) => {
        if (data == null ) {
          this.messageContent = null
          this.setState({message:false})
        } else {
          if (data.level == 1) {
            this.messageContent =  (
              <div onPress={this.moveToTrends(data)}>
              </div>
            )
          } else {
            this.messageContent = (
              <div className="infocard-content ">
              </div>
            )
          }
          
  
          this.setState({message: true})
        }
        
      }

      componentDidMount() {
        returnHome(false)
      }

      moveToTrends = (data) => {
        //this.props.populateChart(data.id);
        //this.props.populateChart(1)
        this.props.history.push('/trends');
        returnHome(true)
      }

      render() {
        let data = this.props.system
        const defaultOptions2 = {
          loop: true,
          autoplay: true, 
          animationData: fever,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        };
        return (
          <div className="home-content">
            <ForceDirectedGraph  data={data} showComment={this.showComment} moveToTrends={this.moveToTrends}/>
            <div className="central-logo"><Lottie options={defaultOptions2}
                height={150}
                width={150}
                />

              </div>
            {(this.state.message) && (this.messageContent != null) && (this.messageContent)}
          </div>
        )
      }
}

const mapStateToProps = (state,props) => {
  return {
    system: state.population.companies,
    
  }
}


const mapDispatchToProps = dispatch => {
  return {
    populateData: () => {
      dispatch(populateData())
    },
    resetPopulation: () => {
      dispatch(resetPopulation())
    },
    populateChart: (id)=> {
      dispatch(populateChart(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
