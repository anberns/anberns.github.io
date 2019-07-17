import React, { Component } from 'react';
import './App.css';
import Homepage from './components/homepage/homepage';
import ProjectPage from './components/projectPage/projectPage';
import AboutPage from './components/aboutPage/aboutPage'
import Aux from './hoc/aux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  /*
  state = {
     home: true
  }

  homepageClickHandler= () => {
    let homeVar = this.state.home;
    if (homeVar === true) {
      homeVar = false;
    }
    this.setState({home: homeVar});
  }
  componentWillMount() {
    document.title = "Projects";
  }

  render() {

  let homepage = null;
  let projectpage = null;
  
  if (this.state.home === true) {
    homepage = (
      <Aux>
        <Homepage clicked={this.homepageClickHandler}/>
      </Aux>
    )
  }
  if (this.state.home === false) {
    projectpage = (
      <Layout />
    )
  }
  */
  render() {

    return (
      <Router>
        <Aux>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/projects" component={ProjectPage} />
          <Route exact path="/about" component={AboutPage} />
        </Aux>
      </Router>
    );
  }
}

export default App;
