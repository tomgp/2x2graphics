import { connect } from 'react-redux'
import Matrix from './matrix'

function Examples ({ title }) {
  return (
    <div>
      <h1>{ title }</h1>
      <Matrix />
    </div>
  )
}

function mapStateToProps (state) {
  const { title } = state;
  return { title };
}

export default connect(mapStateToProps)(Examples)
