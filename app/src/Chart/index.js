import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
class Chart extends Component {
    constructor(props)  {
        super(props);
        this.state = {
            data : {
                labels: this.props.trends["labels"], // array of strings
                datasets: [
                {
                    label : this.props.trends["name"], // name of label
                    borderColor : '#FF8080',
                    backgroundColor : 'rgba(0,0,0,0.0)',
                    
                    data : this.props.trends["data"], // array of strings
                },{
                    label : this.props.stock["name"], // name of label
                    borderColor : '#FFED9F',
                    backgroundColor : 'rgba(0,0,0,0.0)',
                    
                    data : this.props.stock["data"],
                }], // array of dicts
            }
        }
        console.log("test")
        console.log(this.props.trends)
    }

            
      render(){
          let options = {
              maintainAspectRatio : false,
              legend: {
                display: false,
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
            data = {this.state.data}
            options = {options}
            width={this.props.width}
            height={this.props.height}
        />

        );
      }
      
}

export default Chart;