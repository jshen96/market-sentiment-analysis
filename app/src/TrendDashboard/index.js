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

  componentDidMount() {
    console.log("Mount")
    returnHome(true)
    console.log(this.refs.button.getBoundingClientRect())
  }
  renderGridNews =() => {
    let data = this.props.articles

    return (
      <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column>
          <ContentItem counter={1} content={data[0].content}/>
        </Grid.Column>
        <Grid.Column>
          <ContentItem counter={2} content={data[1].content}/>  
        </Grid.Column>
      
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <ContentItem counter={3} content={data[2].content}/>
        </Grid.Column>
        <Grid.Column>
        <ContentItem counter={4} content={data[3].content}/>
        </Grid.Column>
       
      </Grid.Row>
    </Grid>
    )
  }
      render() {
        const defaultOptions = {
          loop: true,
          autoplay: true, 
          animationData: angery,
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
               <Chart trends={this.props.trends} articles={this.props.articles} stock={this.props.stock}/>
            </div>
            <CompanyTag name={this.props.company_name}/>
            <div className="card">
              {this.renderGridNews()}
            </div>
           
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
  return {
    articles: state.chart.articles,
    trends: state.chart.trends,
    stock: state.chart.stock,
    company_name: state.chart.name,
    id: state.chart.id
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
