import React from 'react'

const Search = ({ onChange }) => (
   <input
    type="text"
    onChange={onChange}
    placeholder="Enter person name..."
    autoFocus
  />
)

export default Search
