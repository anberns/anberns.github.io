import React, { Component } from 'react';
import Aux from '../../hoc/aux';
import './Footer.css';

class Footer extends Component {
    sourceHandler = () => {
        window.open('https://github.com/anberns/website');
    }
    componentDidMount = () => {
        document.body.style.background = "white";
    }
    render () {
    
        return (
            <Aux >
                <div className="Footer">
                    <div style={{textAlign: "center", display: "line"}}>
                    <a className="white" onClick={this.sourceHandler} >Source</a>
                    </div>
                </div>
            </Aux>
        )
    }
}
export default Footer;