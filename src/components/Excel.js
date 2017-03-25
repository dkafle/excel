import React from 'react'
import './Excel.css'

class Excel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      authors: this.props.authors,
      sortBy: null,
      descending: false,
      edit: null
    }
    this._sort = this._sort.bind(this)
    this._showEditor = this._showEditor.bind(this)
  }
  _sort (event) {
    var column = event.target.cellIndex
    var data = this.state.authors.slice()
    var isDescending = this.state.sortBy === column && !this.state.descending
    data.sort(function (a, b) {
      return isDescending
        ? a[column] > b[column] ? 1 : -1
        : a[column] < b[column] ? 1 : -1
    })
    this.setState({
      authors: data,
      sortBy: column,
      descending: isDescending
    })
  }
  _showEditor (event) {
    this.setState({edit: {
      row: parseInt(event.target.dataset.row, 10),
      cell: event.target.cellIndex
    }})
  }
  render () {
    return (
      React.DOM.table(null,
        React.DOM.thead(null,
          React.DOM.tr({onClick: this._sort},
            this.props.headers.map(function (title, idx) {
              if (this.state.sortBy === idx) {
                title += this.state.descending ? ' \u2191' : ' \u2193'
              }
              return React.DOM.th({key: idx}, title)
            }, this)
          )
        ),
        React.DOM.tbody({onDoubleClick: this._showEditor},
          this.state.authors.map(function (row, idx) {
            return (
              React.DOM.tr({key: idx},
                row.map(function (cell, idx) {
                  return React.DOM.td({key: idx}, cell)
                })
              )
            )
          })
        )
      )
    )
  }
}

Excel.propTypes = {
  headers: React.PropTypes.arrayOf(
    React.PropTypes.string
  ),
  authors: React.PropTypes.array
}

export default Excel
