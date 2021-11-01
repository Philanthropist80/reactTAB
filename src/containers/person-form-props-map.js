import { connect } from 'react-redux'
import * as pageActions from '../../redux/actions/person-actions'
import PersonPage from '../../components/person/person-list'


const mapDispatchToProps = {
  
  addPerson: pageActions.addPerson,

  
}

export default connect(

  mapDispatchToProps
)(PersonFormContainer)
