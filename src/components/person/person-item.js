import React, { PureComponent } from 'react'
import { FaSuitcase } from 'react-icons/fa'

class Person extends PureComponent {
  render() {
    const { person, onClick, getDetail } = this.props
    const org = person['ca3be488eca6a56b4f8de5ff7fa241260fed6a85']
    const arrName = person.name.split(' ')
    const initials = arrName[0].charAt(0).toUpperCase() + ((arrName.length > 1) ? arrName[1].charAt(0).toUpperCase() : "");
    return (
      <div className="person" onClick={getDetail}>
        <div className="leftDiv">
          <div
            className="deletePerson"
            title="Delete this person?"
            onClick={onClick}
          >
            x
          </div>
          <span className="title">{person.name}</span>
          <br />
          <span className="subtitle">
            <FaSuitcase /> {org}
          </span>
        </div>
        <div className="rightDiv">
          {person.imgsrc === '' ? (
            <div className="imgRound">
              <span className="title">{initials}</span>
            </div>
          ) : (
            <img className="listImage" src={person.imgsrc} alt="" />
          )}
        </div>
      </div>
    )
  }
}

export default Person
