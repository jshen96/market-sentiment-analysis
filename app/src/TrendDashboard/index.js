import React, { Component } from 'react'
import Chart from '../Chart';
import './index.css';
import { Grid, Image } from 'semantic-ui-react'
import ContentItem from '../ContentItem';
import CompanyTag from '../CompanyTag';
import Lottie from 'react-lottie';
import angery from './angery.json';
import laugh from './laugh.json';
import wow from './wow.json';
import fever from './fever.json';
import {connect} from 'react-redux';
import {returnHome} from '../NavBar/NavBarService';
import {resetChart} from '../features/chart/actions';
class TrendDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMood: angery
    }
  }
  componentDidMount() {
    console.log("Mount")
    returnHome(true)
    console.log(this.refs.button.getBoundingClientRect())
  }
  renderGridNews =() => {
    let data = this.props.articles

    if (data == null) {
      return (
        <div className="card">

        </div>
      )
    } else {
      if (data.length > 4) {
        data = data.slice(0, 4)
      }
      return (
        <div className="card flex-col">
        {
          data.map((el, index) => {
            return (
              <ContentItem counter={index + 1} content={data[index].content}/>
            )
          })
        }
      </div>
      )
    }
    
  }

    updateEmoji = (happy) => {
      if (happy) {
        this.setState({currentMood: laugh})
      }
    }
      render() {
        const defaultOptions = {
          loop: true,
          autoplay: true, 
          animationData: this.state.currentMood,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        };

        const defaultOptions2 = {
          loop: true,
          autoplay: true, 
          animationData: fever,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        };

        return (
          <div className="content">
            <div ref="button" className="background-chart">
               <Chart trends={this.props.trends} articles={this.props.articles} labels={this.props.date_labels} stock={this.props.stock} updateMood={this.updateEmoji}/>
            </div>
            <CompanyTag name={this.props.company_name}/>
    
              {this.renderGridNews()}
   
           
            <div className="animation-card">
            <Lottie options={defaultOptions}
              height={300}
              width={300}
              />
              <div className="animation-trending">
                <Lottie options={defaultOptions2}
                height={150}
                width={150}
                />
                <div className="animation-text">{this.props.articles.length}</div>
              </div>
            </div>
          </div>
        )
      }
}

const mapStateToProps = (state,props) => {
  let c = state.chart.articles.map((el, index) => {return el["dob"]})
  console.log ("c is" + JSON.stringify(c))
  return {
    articles: state.chart.articles,
    trends: state.chart.trends,
    stock: state.chart.stock,
    company_name: state.chart.name,
    id: state.chart.id,
    date_labels: c
  }
}


const mapDispatchToProps = dispatch => {
  return {
    resetChart: () => {
      dispatch(resetChart())
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TrendDashboard);
