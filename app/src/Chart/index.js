import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
class Chart extends Component {
    constructor(props)  {
        super(props);
        this.state = {
            
        }
        
    }

            
      render(){
          
          let data = {
            labels: this.props.labels, // array of strings
            datasets: [
            {
                label : "Public reactions", // name of label
                borderColor : '#FF8080',
                backgroundColor : 'rgba(0,0,0,0.0)',
                
                data : (this.props.trends.length) ? this.props.trends.map((el,index) => {
                    let v1 = parseFloat(el["magnitude_content"])
                    let v2 = parseFloat(el["score_content"])
                    let v3 = parseFloat(el["score_headline"])

                    let v4 = parseFloat(el["score_tweet"])
                    let v5 = parseFloat(el["magnitude_headline"])
                    let v6 = parseFloat(el["magnitude_tweet"])

                    return (v1 * v2 * 10) + (v3 * v5* 10) + (v4 * v6* 10);

                    
                }) : (this.props.trends.data), // array of strings
            },{
                label : "Stock", // name of label
                borderColor : '#FFED9F',
                backgroundColor : 'rgba(0,0,0,0.0)',
                
                data : this.props.stock["data"],
            }], // array of dicts
        }

        if (this.props.trends.length) {
            if (this.props.trends.length >= 2) {
                this.props.updateMood(data.datasets[0].data[data.datasets[0].data.length - 1] > data.datasets[0].data[data.datasets[0].data.length - 2] )
            }
        }
          
          console.log("test")
        console.log(this.props)
          let options = {
              maintainAspectRatio : false,
              legend: {
                display: true,
                position: 'right',
                labels: {
                    fontColor: '#FFF',
                    fontFamily: 'AvenirNext',
                    fontSize: 13
                }
                },
                responsive: true,
              scales: {
                  xAxes: [
                    {
                        display: true,
                        gridLines: {
                          display: false,
                          drawBorder: false
                        },
                        
                      }
                  ],
                  yAxes: [
                    {
                        display: true,
                        gridLines: {
                          display: false,
                          drawBorder: false
                        }
                      }
                  ],
              },
              
            }
        return (
        <Line 
            data = {data}
            options = {options}
            width={this.props.width}
            height={this.props.height}
        />

        );
      }
      
}

export default Chart;