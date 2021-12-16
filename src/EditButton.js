import React from 'react';
import { Button } from 'react-bootstrap'

export default class EditButton extends React.Component {
  render() {
    return (
      <>
        <Button onClick={() => this.props.showUpdateModal(this.props.book)}>Edit Book</Button>
      </>
    )
  }
}

