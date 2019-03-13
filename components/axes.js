const Axes = ({xMax='X Max', xMin='X Min', yMax='Y Max', yMin='Y Min', height=100, width=100, className='axes'}) => {
  return (<g className={className}>
    <g transform={`translate(${width-25}, ${height/2}) rotate(90)`} textAnchor='middle'>
      <text className={`${className} outline`}>{xMax}</text>
      <text className={className}>{xMax}</text>
    </g>

    <g transform={`translate(${25}, ${height/2}) rotate(270)`} textAnchor='middle'>
      <text className={`${className} outline`}>{xMin}</text>
      <text className={className}>{xMin}</text>
    </g>

    <g transform={`translate(${width/2}, ${25})`} textAnchor='middle'>
      <text className={`${className} outline`}>{yMax}</text>
      <text className={className}>{yMax}</text>
    </g>

    <g transform={`translate(${width/2}, ${height-10})`} textAnchor='middle'>
      <text className={`${className} outline`}>{yMin}</text>
      <text className={className}>{yMin}</text>
    </g>
  </g>)
}

export default Axes;