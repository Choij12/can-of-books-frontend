import React from 'react';
import { Button } from 'react-bootstrap'

class DeleteButton extends React.Component {

  render() {
    return (
      <>
        <Button onClick={() => this.props.deleteBook(this.props.book._id)}>Delete</Button>
      </>
    )
    }
  }

export default DeleteButton;