import React, { Component } from 'react';
import Grid from './grid';
import Axes from './axes';
import { scaleLinear } from 'd3-scale';
import { connect } from 'react-redux';
import { addItem, removeItem, moveItem, loadList } from '../store';

function mapStateToProps (state) {
  const { title, rateableitems, xmin, xmax, ymin, ymax, description } = state
  return { title, rateableitems, xmin, xmax, ymin, ymax, description }
}

function checkHTML(markup){
  if(markup && String(markup).indexOf('<script>') < 0){
    return markup;
  }
  return '<p>&nbsp;</p>'
}

class Matrix extends Component {

  add = (title='title', x=0, y=0) => {
    const { dispatch } = this.props;
    dispatch(addItem(title, x, y))
  };

  remove = (title) => {
    const { dispatch } = this.props;
    dispatch(removeItem(title))
  };

  move = (title='title', x=0, y=0) => {
    const { dispatch } = this.props;
    dispatch(moveItem(title, x, y))
  };

  load = (id) => {
    const { dispatch } = this.props;
    dispatch(loadList(id));
  };

  handleMouseMove = (e) => {
    const x = this.hScale.invert(e.offsetX);
    const y = this.vScale.invert(e.offsetY);
    const title = e.target.getAttribute('title');
    e.stopPropagation();
    if(title && this.currentlyDragging == null){ 
      this.move(`${title}`, x, y);
    }else if(this.currentlyDragging){
      this.move(`${this.currentlyDragging}`, x, y);
    };
  }

  handleMouseDown = (e) => {
    this.currentlyDragging = e.target.getAttribute('title');
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseUp = (e) => {
    this.currentlyDragging = null;
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  render () {
    const { rateableitems, xmin, xmax, ymin, ymax, description } = this.props;
    const width = 1000;
    const height = 1000;
    const radius = 10;
    this.hScale = scaleLinear()
      .range([0, width])
      .domain([-100,100]);
    
    this.vScale = scaleLinear()
      .range([0, height])
      .domain([100,-100]);

    return (
      <div>
        <svg className="chart" viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
          <Grid className="grid" width={width} height={height} minor={5} major={50} />
          <Axes width={width} height={height} xmin={xmin} xmax={xmax} ymin={ymin} ymax={ymax} />
          {
            rateableitems.map((item, i)=>
              (<g transform={`translate(${this.hScale(item.x)},${this.vScale(item.y)})`} key={`chart-item-${i}`}>
                <text 
                  dx={(item.x > 50 ? -radius*2 : radius*2 )} 
                  dy={radius*2/3}
                  textAnchor={(item.x > 50 ? 'end' : 'start')}>{item.title}
                </text>
                <circle
                  title={item.title} 
                  cx={0} 
                  cy={0} 
                  r={radius}
                  onMouseDown={this.handleMouseDown}
                  onMouseUp={this.handleMouseUp}>
                </circle>
              </g>))
          }
        </svg>
        <div dangerouslySetInnerHTML={{__html: checkHTML(description)}}></div>
        <hr />
        {
          rateableitems.map((item, i) => (<button key={`remove-button${i}`} onClick={()=>{
              this.remove(item.title) }}>Remove {`${item.title}`}</button>)
          )
        }
        <hr />
        <a href="#" onMouseUp={()=>this.load(1)}>LOAD</a>
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
