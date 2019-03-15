const Axes = ({xmax='X Max', xmin='X Min', ymax='Y Max', ymin='Y Min', height=100, width=100, className='axes'}) => {
  return (<g className={className}>
    <g transform={`translate(${width-25}, ${height/2}) rotate(90)`} textAnchor='middle'>
      <text className={`${className} outline`}>{xmax}</text>
      <text className={className}>{xmax}</text>
    </g>

    <g transform={`translate(${25}, ${height/2}) rotate(270)`} textAnchor='middle'>
      <text className={`${className} outline`}>{xmin}</text>
      <text className={className}>{xmin}</text>
    </g>

    <g transform={`translate(${width/2}, ${25})`} textAnchor='middle'>
      <text className={`${className} outline`}>{ymax}</text>
      <text className={className}>{ymax}</text>
    </g>

    <g transform={`translate(${width/2}, ${height-10})`} textAnchor='middle'>
      <text className={`${className} outline`}>{ymin}</text>
      <text className={className}>{ymin}</text>
    </g>
  </g>)
}

export default Axes;