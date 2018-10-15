const ItemList = (list)=>{
  return list.map((item,i)=>(
    <g key={`itemList${i}`}  transform={`translate(${item.position.x}, ${item.position.y})`}>
      <text>{item.label}</text>
      <circle r={5}></circle>
    </g>
  ));
}

const Axes= ({children, x, y})=>{
  return (<g>
    <text>{x[0]} - {x[1]}</text>
    <text>{y[0]} - {y[1]}</text>
    <g>{children}</g>
  </g>);
}

const Matrix = ({
  items=[{label:'a', position:{x:1,y:1}}], 
  title="Title", 
  axes={
    x:['xmin','xmax'], 
    y:['ymin','ymax']}, 
  date=new Date(), 
  author='author'
})=>{
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
};

export default Matrix;