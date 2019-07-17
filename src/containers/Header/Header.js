import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
    gitHandler = () => {
        window.open('https://github.com/anberns');
    }
    linkedHandler = () => {
        window.open('https://linkedin.com/in/aaron-berns-70128355');
    }
    render () {

        return (
            <div className="header">
                <div className="overlay">
                    <div className="text">
                        <h1>{this.props.heading}</h1>
                        <Link className="no-dec" to={this.props.url}>
                            <h3>{this.props.link}</h3>
                        </Link>
                        <input type="image" src={require("../../images/github.png")} className="Thumb" onClick={this.gitHandler}/>
                        <input type="image" src={require("../../images/linkedin.dms")} className="Thumb" onClick={this.linkedHandler}/>    
                        <a href="mailto:anberns@gmail.com"><img src={require("../../images/email.png")} className="Thumb"/></a>
                    </div>
                </div>

            </div>
        );
    }
}

export default Header;