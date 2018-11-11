import React,  { Component } from 'react';
import './index.css';
import * as d3 from 'd3';
export default class ForceDirectedGraph extends Component {

	constructor(props) {
		super(props);

		// equivalent to getInitialState() { return {}; }
		this.state = {
      data: this.props.data,
      colors: ["","redc","yellowc","bluec","greenc"]
		}
	}

  componentDidMount() {

      const width = this.divElement.clientWidth,
            height = this.divElement.clientHeight;
      let data = this.state.data;
      let colors = this.state.colors;
      let callback = this.props.showComment;
      let callbackClick = this.props.moveToTrends;
      //Initializing chart
      const chart = d3.select('.chart')
        .attr('width', width)
        .attr('height', height);

      //Initializing force simulation
      const simulation = d3.forceSimulation()
        .force('link', d3.forceLink().distance((d) => {
          if (d.source.level == 0) {
            return 180;
          }
          return 50;
        }))
        .force('charge', d3.forceManyBody())
        .force('collide', d3.forceCollide().radius(d => {
          if (d.level == 0) return 100;
          return 30;
        }))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force("y", d3.forceY())
        .force("x", d3.forceX());


      //Drag functions
      const dragStart = d => {
        if (!d3.event.active)
        {
          simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      };

      const drag = d => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      };

      const dragEnd = d => {
        if (!d3.event.active) {
          simulation.alphaTarget(0);
        }
        if (d.level == 0 ){
          d.fx = width / 2;
          d.fy = height / 2;
        } else {
          d.fx = null;
          d.fy = null;
        }
      }

      //Creating links
      const link = chart.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(data.links).enter()
        .append('line');

      //Creating nodes
      const node = d3.select('.chart-container')
        .selectAll('div')
        .data(data.nodes).enter()
        .append('div')
        .attr('class', d => {
          var c = 'circle-node ';
          if (d.level == 0) c += 'central ';
          else if (d.level == 1) {
            c += 'group ';
            let index = d.group % this.state.colors.length
            if (index == 0) index += 1
            c += colors[index] + ' ';
          } else {
            let index = d.group % this.state.colors.length
            if (index == 0) index += 1
            c += colors[index] + ' ';
          }

          
          return c;
        })
        .text(d => {
          if (d.level == 1) {
            return d.name;
          }
          return ""
        })
        .on("mouseover", function(d)
        {
          console.log(d.name)
          callback(d);
        })
        .on("mouseclick", function(d)
        {
          console.log(d.name)
          if (d.level == 1) {
            callbackClick(d)
          }
        
        })
        .on("mouseout", function(d)
        {
          console.log(d.name)
          callback(null);
        })
        .call(d3.drag()
           .on('start', dragStart)
           .on('drag', drag)
           .on('end', dragEnd)
        );

      //Setting location when ticked
      const ticked = () => {
        node
            .attr("style", d => {
              return 'left: ' + d.x + 'px; top: ' + (d.y) + 'px';
            })

        link
          .attr("x1", d => { return d.source.x; })
          .attr("y1", d => { return d.source.y; })
          .attr("x2", d => { return d.target.x; })
          .attr("y2", d => { return d.target.y; });



      };

      //Starting simulation

      data.nodes[0].fx = width / 2;
      data.nodes[0].fy = height / 2;

      simulation.nodes(data.nodes)
        .on('tick', ticked);

      simulation.force('link')
        .links(data.links);


  }

	render(){
		return (
			<div className={ this.props.className + " chart-container" } ref={ (divElement) => this.divElement = divElement}>
        <svg className='chart'>
        </svg>
			</div>

		);
	}

}

ForceDirectedGraph.propTypes = {

}

ForceDirectedGraph.defaultProps = {

}
