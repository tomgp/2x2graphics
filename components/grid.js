import { range } from 'd3-array';


const Grid = ({width=100 , height=100, major=25, minor=5, className})=>{
  return(<g>
    {
      range(0, height, minor).map((d,i)=>{
        return (<line key={`minor-horizontal-${i}`} className={`${className} minor`} x1={0} y1={d} x2={width} y2={d}></line>)
      })
    }
    {
      range(0, width, minor).map((d,i)=>{
        return (<line key={`minor-vertical-${i}`} className={`${className} minor`} x1={d} y1={0} x2={d} y2={height}></line>)
      })
    }
    {
      range(0, height, major).map((d,i)=>{
        return (<line key={`major-horizontal-${i}`} className={`${className} major`} x1={0} y1={d} x2={width} y2={d}></line>)
      })
    }
    {
      range(0, width, major).map((d,i)=>{
        return (<line key={`major-vertical-${i}`} className={`${className} major`} x1={d} y1={0} x2={d} y2={height}></line>)
      })
    }
    <rect className={className} x="0" y="0" width={width} height={height}></rect>    
  </g>)
}

export default Grid;