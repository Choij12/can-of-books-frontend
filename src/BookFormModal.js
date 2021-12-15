import React from "react";
import { Button } from 'react-bootstrap'
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";

export default class BookForModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const bookObj = {
            title: event.target.title.value,
            description: event.target.description.value,
            status: event.target.status.value,
            email: event.target.email.value
        }
        this.props.closeModal();
        event.target.reset();
        this.props.postBooks(bookObj);
    }

    render() {
        return (
            <>
                <Modal show={this.props.formModal} onHide={() => this.props.closeModal()}>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="title">
                                <Form.Label name="Title"></Form.Label>
                                <Form.Control type="title" placeholder="Enter a Title"/>
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label name="Description"></Form.Label>
                                <Form.Control type="description" placeholder="Enter a Description"/>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label name="Email"></Form.Label>
                                <Form.Control type="email" placeholder="Enter your Email"/>
                            </Form.Group>
                            <Form.Group controlId="status">
                                <Form.Label name="Status"></Form.Label>
                                <Form.Control type="status" placeholder="Enter a Status"/>
                            </Form.Group>
                            <Button variant="primary" type="Submit">
                                Add Book
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}