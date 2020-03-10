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
    }, () => { this.loadCharacters() })
  }

  loadCharacters = () => {

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
      <Col sm="6" md="4" lg="3" xl="3" className="portrait-card">
        <PortraitCard id={card.id} name={card.name} thumbnail={card.thumbnail} />
      </Col>

    );
    return (<Row>{dispList}</Row>);
  }



  render() {
    return (

      <div>
        <Row className="header">
          <Col >
            <h1>MARVEL TROMBINOSCOPE</h1>
          </Col>
        </Row>

        <div className="content" >
          {this.state.isLoading ?
            (
              <Row className="justify-content-center loading-bar">
                <Col className="justify-content-center">
                  <ReactLoading className="center-align" type={"cylon"} color={"red"} height="50vh" width="40vw" align="center" />

                </Col>
              </Row>  
            ) : (

              <Row className="trombinoscope">
                <Col className="justify-content-center" >
                  <Container className="trombi-container" >
                    {this.displayCards()}
                  </Container>
                </Col>
              </Row>

            )}
        </div>
        <Row className="navigation-bar">
          <Col className="justify-content-center" >
            <Container>
              <Row>
                <Col >
                  <Button className="button-page" size="xl" key={this.state.currentPage - 1} id={this.state.currentPage - 1} onClick={this.handlePageChange} disabled={this.state.currentPage <= 1 ? true : false} >{"<"}</Button>
                  <Button className="button-page" size="xl"  >{this.state.currentPage}</Button>
                  <Button className="button-page" size="xl" key={this.state.currentPage + 1} id={this.state.currentPage + 1} onClick={this.handlePageChange} >{">"}</Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>


    );
  }

}

export default Trombinoscope;
