import React, { Component } from 'react';
import './App.css';
import { Button } from 'reactstrap';
import { Row, Col, Container } from 'reactstrap';
import PortraitCard from './PortraitCard';
import ReactLoading from 'react-loading';

class Trombinoscope extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listCharacters: [],
      isLoading: true,
      currentPage: 1
    }

    this.handlePageChange = this.handlePageChange.bind(this);


  }


  componentDidMount() {
    try {
      this.loadCharacters();
    } catch (e) {
      console.log("error" + e)
    }

  }


  handlePageChange(event) {
    this.setState({
      currentPage: Number(event.target.id),
      isLoading: true
    }, () => {
      this.loadCharacters()
      console.log("before req page :" + this.state.currentPage)

    })


  }

  loadCharacters = () => {
    console.log("before req page :" + this.state.currentPage)

    fetch('http://localhost:8080/api?page=' + this.state.currentPage)
      .then(res => res.json())
      .then((data) => {
        this.setState({ listCharacters: [] })
        this.setState({ listCharacters: data['characters'], isLoading: false })
      })
      .catch(console.log)
  }

  displayCards = () => {


    let dispList = this.state.listCharacters.map((card, index) =>
  <Col sm="6" md="4" lg="3" xl="3">

        <PortraitCard id={card.id} name={card.name} thumbnail={card.thumbnail} />
      </Col>

    );

    return (<Row>{dispList}</Row>);

  }



  render() {
    return (

      <div>

        <Row className="header">
          <Col>
            <h1>MARVEL TROMBINOSCOPE</h1>
          </Col>
        </Row>

        <Row>
          <Col>

        <div className="trombi-container">
          <Container>

            {this.state.isLoading ?
              (<Row>
                  <ReactLoading type={"spinningBubbles"} color={"blue"} height="40vh" width="40vw" margin="0"/>
                </Row>) 
                : this.displayCards()}

          </Container>
        </div>
        </Col>
        </Row>

    

          <Row className="navigation-bar">
            <Col xs="5">
            </Col>

            <Col >
              <div>
                <Button key={this.state.currentPage - 1} id={this.state.currentPage - 1} onClick={this.handlePageChange} disabled={this.state.currentPage <= 1 ? true : false} >{this.state.currentPage - 1}</Button>
              </div>
            </Col>
            <Col>
              <div>
                <Button  >{this.state.currentPage}</Button>
              </div>
            </Col>
            <Col>
              <div>
                <Button size="lg" key={this.state.currentPage + 1} id={this.state.currentPage + 1} onClick={this.handlePageChange} >{this.state.currentPage + 1}</Button>
              </div>
            </Col>
            <Col xs="5" ></Col>
          </Row>


      </div>


    );
  }

}

export default Trombinoscope;
