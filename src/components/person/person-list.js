import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
import Modal from 'react-modal'

import Person from './person-item'
import Search from './person-search'
import PersonForm from './person-form'

const divModalStyle = {}

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '35%',
    padding: '0'
  }
}

const customFormModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    padding: '0'
  }
}

class PersonPage extends Component {
  selectedPerson = {
    id :'',
    initials: '',
    name: '',
    phone: '',
    email: '',
    org: '',
    assistant: '',
    group: '',
    location: '',
    imgsrc: ''
  }

  state = {
    modalIsOpen: false,
    modalIsFormOpen: false,
    items: [],
    limit: 5,
    hasMore: true
  }

  onDragStart = (e, index) => {
    let { displayedPersons } = this.props
    let items = displayedPersons
    this.setState({ items })
    this.draggedItem = this.state.items[index]
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.target.parentNode)
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20)
  }

  onDragOver = index => {
    let { displayedPersons } = this.props
    let items = displayedPersons
    this.setState({ items: items })
    const draggedOverItem = this.state.items[index]

    if (this.draggedItem === draggedOverItem) {
      return
    }

    let newItems = this.state.items.filter(item => item !== this.draggedItem)
    newItems.splice(index, 0, this.draggedItem)

    this.setState({ items: newItems })

    // console.log(newItems)

    this.props.setDisplayedPersons(newItems)
  }

  onDragEnd = () => {
    this.draggedIdx = null
  }

  addPerson = () => {
    this.setState({ modalIsFormOpen: true })
  }

  deletePerson = (event, index) => {
    let val = window.confirm('Do you want to delete this person?')
    if (val) {
      this.props.deletePerson(index)
    }
    event.stopPropagation()
  }

  getDetail = index => {
    let { displayedPersons } = this.props
    const arrName = displayedPersons[index].name.split(' ')
    this.selectedPerson.imgsrc = displayedPersons[index].imgsrc
    this.selectedPerson.name = displayedPersons[index].name
    this.selectedPerson.phone = displayedPersons[index].phone[0].value
    this.selectedPerson.initials =
      arrName[0].charAt(0).toUpperCase() + ( (arrName.length > 1) ? arrName[1].charAt(0).toUpperCase() : '');

    this.selectedPerson.email = displayedPersons[index]['email']
    this.selectedPerson.org =
      displayedPersons[index]['organization']
    this.selectedPerson.assistant =
      displayedPersons[index]['assistant']
    this.selectedPerson.group =
      displayedPersons[index]['group']
    this.selectedPerson.location =
      displayedPersons[index]['location']

    console.log(displayedPersons[index])
    this.openModal()
  }

  onscroll = () => {
    const {
      state: { error, isLoading, hasMore }
    } = this

    if (error || isLoading || !hasMore) return

    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.props.getPersons(0, 10)
    }
  }

  componentDidMount() {
    this.props.getPersons(0, 10)
    window.addEventListener('scroll', this.onscroll)
  }

  componentWillMount() {
    Modal.setAppElement('body');
 }

  handleSearch(event) {
    this.props.filterPersons(event.currentTarget.value)
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal = () => {
    // this.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  closeFormModal = () => {
    this.setState({ modalIsFormOpen: false })
  }

  render() {
    let { displayedPersons, isFetched, error } = this.props

    if (displayedPersons === undefined) {
      displayedPersons = this.state.items
    }

    let persons = displayedPersons.map((person, idx) => {
      if (person === undefined) {
        return null
      }
      return (
        <li
          className="persons__item"
          key={person.id}
          onDragOver={() => this.onDragOver(idx)}
          //onClick={}
        >
          <div
            className="drag"
            draggable
            onDragStart={e => this.onDragStart(e, idx)}
            onDragEnd={this.onDragEnd}
          >
            <Person
              onClick={e => this.deletePerson(e, idx)}
              getDetail={() => this.getDetail(idx)}
              person={person}
            />
          </div>
        </li>
      )
    })

    return (
      <div className="page">
        <div>List View</div>
        <div className="page__header">reactPro</div>
        <div>People's List</div>
        <div className="row">
          <div className="col-sm-12 col-md-10 page__search">
            <label>Find Person </label>
            <Search onChange={this.handleSearch.bind(this)} />
          </div>
          <div className="col-sm-12 col-md-2 page__actions">
            <button title="Create New" onClick={e => this.addPerson(e)}>
              Create
            </button>{' '}
            &nbsp;
          </div>
          <Modal
            isOpen={this.state.modalIsFormOpen}
            onRequestClose={this.closeFormModal}
            style={customFormModalStyles}
            contentLabel="Add New Person Modal"
          >
            <div className="modalHeader">
              <div className="modalTitle">Create New Person</div>
              <div
                className="modalCloseX"
                onClick={this.closeFormModal}
                title="Close"
              >
                x
              </div>
            </div>
            <PersonForm {...this.props} onAddPerson={values => this.props.addPerson(values)} />

            <div className="modalFooter">
              <div className="modalCloseButton">
                <button title="Close" onClick={this.closeFormModal}>
                  Back
                </button>
              </div>
            </div>
          </Modal>
        </div>
        {
          <div>
            <ul className="persons">{persons}</ul>
            <div style={divModalStyle}>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customModalStyles}
                contentLabel="Detail Modal"
              >
                {/* <h2 ref={subtitle => this.subtitle = subtitle}>Person Information</h2> */}
                <div className="modalHeader">
                  <div className="modalTitle">Person Information</div>
                  <div className="modalCloseX" onClick={this.closeModal}>
                    x
                  </div>
                </div>

                <div className="modalMainTop">
                  {this.selectedPerson.imgsrc === '' ? (
                    <div className="modalInitial">
                      <span className="title">
                        {this.selectedPerson.initials}
                      </span>
                    </div>
                  ) : (
                    <img
                      className="modalImage"
                      src={this.selectedPerson.imgsrc}
                      alt=""
                    />
                  )}

                  <div className="modalName">{this.selectedPerson.name}</div>
                  <div className="modalPhone">{this.selectedPerson.phone}</div>
                </div>
                <div className="continer-fluid modalMainOtherDetail">
                  <div className="row modalOtherDetailTitleValueContainer">
                    <div className="col-sm-12 col-md-4 modalOtherDetailTitle">
                      Email:
                    </div>
                    <div className="col-sm-12 col-md-8 modalOtherDetailValue">
                      {this.selectedPerson.email}
                    </div>
                  </div>
                  <div className="row modalOtherDetailTitleValueContainer">
                    <div className="col-sm-12 col-md-4 modalOtherDetailTitle">
                      Organization:
                    </div>
                    <div className="col-sm-12 col-md-8 modalOtherDetailValue">
                      {this.selectedPerson.org}
                    </div>
                  </div>
                  <div className="row modalOtherDetailTitleValueContainer">
                    <div className="col-sm-12 col-md-4 modalOtherDetailTitle">
                      Assistant:
                    </div>
                    <div className="col-sm-12 col-md-8 modalOtherDetailValue">
                      {this.selectedPerson.assistant}
                    </div>
                  </div>
                  <div className="row modalOtherDetailTitleValueContainer">
                    <div className="col-sm-12 col-md-4 modalOtherDetailTitle">
                      Group:
                    </div>
                    <div className="col-sm-12 col-md-8 modalOtherDetailValue">
                      {this.selectedPerson.group}
                    </div>
                  </div>
                  <div className="row modalOtherDetailTitleValueContainer">
                    <div className="col-sm-12 col-md-4 modalOtherDetailTitle">
                      Location:
                    </div>
                    <div className="col-sm-12 col-md-8 modalOtherDetailValue">
                      {this.selectedPerson.location}
                    </div>
                  </div>
                </div>

                <div className="modalFooter">
                  <div className="modalCloseButton">
                    <button title="Close" onClick={this.closeModal}>
                      Back
                    </button>
                  </div>
                </div>
              </Modal>
            </div>

            {isFetched ? <p>Loading...</p> : ''}

            {error && <div className="page__error">{error}</div>}
          </div>
        }

        {/* <div className="page__pager">
         <Pager />
        </div> */}
      </div>
    )
  }
}

export default PersonPage
