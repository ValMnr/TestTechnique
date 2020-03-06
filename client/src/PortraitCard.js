import React, { Component } from 'react';
import { Container, Row, Col, Media } from 'reactstrap';



export class PortraitCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            name: this.props.name,
            thumbnail: this.props.thumbnail
        }
    }

    render() {
        return (
            <div>
                <Row >
                    <Col>
                        <img
                            src={this.props.thumbnail}
                            alt={this.props.name} ></img>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>{this.props.name}</h1>
                    </Col>
                </Row>
            </div>

        )
    };
};
