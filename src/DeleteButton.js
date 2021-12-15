import React from 'react';
import { Button } from 'react-bootstrap'

class DeleteButton extends React.Component {

    handleClick = () => {
        this.props.deleteBook(this.props.id, this.props.email);
    }
  render() {
    return (
      <>
        <Button onClick={() => this.props.deleteBook(this.props.book)}>Delete</Button>
      </>
    )
  }
}

export default DeleteButton;