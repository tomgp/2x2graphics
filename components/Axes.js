const Axes= ({children, x, y})=>{
  return (<g>
    <text>{x[0]} - {x[1]}</text>
    <text>{y[0]} - {y[1]}</text>
    <g>{children}</g>
  </g>);
}


export default Axes;