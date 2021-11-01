import { connect } from 'react-redux'
import * as pageActions from '../../redux/actions/person-actions'
import PersonPage from '../../components/person/person-list'

function mapStateToProps(state) {
  const { displayedPersons, isFetched, error, isShow } = state.personPage

  return {
    displayedPersons,
    isFetched,
    error,
    isShow
  }
}

const mapDispatchToProps = {
  getPersons: pageActions.getPersons,
  deletePerson: pageActions.deletePerson,
  addPerson: pageActions.addPerson,

  filterPersons: pageActions.filterPersons,
  setDisplayedPersons: pageActions.setDisplayedPersons,
  setModal: pageActions.setModal
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonPage)
