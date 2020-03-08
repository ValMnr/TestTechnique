import React, { Component } from 'react';
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Container } from 'reactstrap';



class PortraitCard extends Component {
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
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <CardImg className="thumbnail"
                                    src={this.props.thumbnail}
                                    alt={this.props.name} >
                                </CardImg>
                                <CardBody>
                                    <CardText>{this.props.name}</CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        )
    };
};

export default PortraitCard;