import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { connect } from 'react-redux';
import { addItem, removeItem, moveItem } from '../store';

function mapStateToProps (state) {
  const { title, items } = state
  return { title, items }
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
    const { items } = this.props;
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
          {
            items.map((item, i)=>
              (<g transform={`translate(${this.hScale(item.x)},${this.vScale(item.y)})`} key={`chart-item-${i}`}>
                <circle
                  name={item.name} 
                  cx={0} 
                  cy={0} 
                  r={radius}
                  onMouseDown={this.handleMouseDown}
                  onMouseUp={this.handleMouseUp}></circle>
                <text dx={radius*2} dy={radius}>{item.name}</text>
              </g>))
          }
        </svg>
        <hr />
        {
          items.map((item, i) => (<button key={`remove-button${i}`} onClick={()=>{
              this.remove(item.name) }}>Remove {`${item.name}`}</button>)
          )
        }
        <hr />

        <button onClick={()=>{
          this.add('new', 0.5, -0.5)
        }}>Add</button>

        <style jsx global>{
          `.chart{
            border:1px solid black;
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
          }`
        }</style>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Matrix);
