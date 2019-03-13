import React, { Component } from 'react';
import Grid from './grid';
import Axes from './axes';
import { scaleLinear } from 'd3-scale';
import { connect } from 'react-redux';
import { addItem, removeItem, moveItem } from '../store';

function mapStateToProps (state) {
  const { title, rateableitems } = state
  return { title, rateableitems }
}

class Matrix extends Component {

  add = (name='name', x=0, y=0) => {
    const { dispatch } = this.props;
    dispatch(addItem(name, x, y))
  };

  remove = (name) => {
    const { dispatch } = this.props;
    dispatch(removeItem(name))
  };

  move = (name='name', x=0, y=0) => {
    const { dispatch } = this.props;
    dispatch(moveItem(name, x, y))
  };

  handleMouseMove = (e) => {
    const x = this.hScale.invert(e.offsetX);
    const y = this.vScale.invert(e.offsetY);
    const name = e.target.getAttribute('name');
    e.stopPropagation();
    if(name && this.currentlyDragging == null){ 
      this.move(`${name}`, x, y);
    }else if(this.currentlyDragging){
      this.move(`${this.currentlyDragging}`, x, y);
    };
  }

  handleMouseDown = (e) => {
    this.currentlyDragging = e.target.getAttribute('name');
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseUp = (e) => {
    this.currentlyDragging = null;
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  render () {
    const { rateableitems } = this.props;
    const width = 500;
    const height = 500;
    const radius = 10;
    this.hScale = scaleLinear()
      .range([0, width])
      .domain([-1,1]);
    
    this.vScale = scaleLinear()
      .range([0, height])
      .domain([-1,1]);

    return (
      <div>
        <svg className="chart" viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
          <Grid className="grid" width={width} height={height} minor={5} major={50} />
          <Axes width={width} height={height} />
          {
            rateableitems.map((item, i)=>
              (<g transform={`translate(${this.hScale(item.x)},${this.vScale(item.y)})`} key={`chart-item-${i}`}>
                <text 
                  dx={(item.x > 0.5 ? -radius*2 : radius*2 )} 
                  dy={radius*2/3}
                  textAnchor={(item.x > 0.5 ? 'end' : 'start')}>{item.name}
                </text>
                <circle
                  name={item.name} 
                  cx={0} 
                  cy={0} 
                  r={radius}
                  onMouseDown={this.handleMouseDown}
                  onMouseUp={this.handleMouseUp}>
                </circle>
              </g>))
          }
        </svg>
        <hr />
        {
          rateableitems.map((item, i) => (<button key={`remove-button${i}`} onClick={()=>{
              this.remove(item.name) }}>Remove {`${item.name}`}</button>)
          )
        }
        <hr />

        <style jsx global>{
          `.chart{
            
          }
          circle{
            fill:white;
            stroke:black;
            stroke-width:1;
          }
          svg text{
            -webkit-touch-callout: none;
            -webkit-user-select:none;
            -khtml-user-select:none;
            -moz-user-select:none;
            -ms-user-select:none;
            -o-user-select:none;
            user-select:none;
          }
          rect.grid{
            fill:none;
            stroke:#000;
            stroke-width:10px;
          }
          line.grid.minor{
            fill:none;
            stroke:#eee;
          }
          line.grid.major{
            fill:none;
            stroke:#aaa;
          }
          .axes text{
            font-family:sans-serif;
          }
          .axes.outline{
            fill:none;
            stroke:#FFF;
            stroke-width:2;
          }`
        }</style>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Matrix);
