import { connect } from 'react-redux'
import Matrix from './matrix'

function mapStateToProps (state) {
  const { title } = state;
  return { title };
}

function TwoByTwo ({ title }) {
  return (
    <div>
      <h1>{ title }</h1>
      <Matrix />
    </div>
  )
}

export default connect(mapStateToProps)(TwoByTwo)
