import Axes from './Axes';

function mouseDown(event) {
  console.log('down', event.clientX, event.clientY);
}

function mouseUp(event) {
  console.log('up', event.clientX, event.clientY);
}

const ItemList = (list)=>{
  return list.map((item,i)=>(
    <g
      onMouseDown={mouseDown} 
      onMouseUp={mouseUp}
      key={`itemList${i}`}  
      transform={`translate(${item.position.x}, ${item.position.y})`}
      draggable="true">
      <text dy={12}>{item.label}</text>
      <rect x="0" y="0" width={70} height={12} fill="rgba(0,0,0,0)" stroke="#000" strokeWidth="1"></rect>
      <circle r={5}></circle>
    </g>
  ));
}

class Matrix extends React.Component {
  render() {
    const{ items, axes } = this.props;
    const height = 500;
    const width = 500;
    const scaledItems = items.map((d)=>{
      return {
        label:d.label,
        position:{
          x:(d.position.x + 1) * (width/2),
          y:(d.position.y + 1) * (height/2)
        }
      }
    });
    return (<svg width={width} height={height} viewBox={`0, 0, ${width}, ${height}`}>
        <Axes x={axes.x} y={axes.y}>
          {ItemList(scaledItems)}
        </Axes>
      </svg>);
  }
}

export default Matrix;
