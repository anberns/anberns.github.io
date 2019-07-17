import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../hoc/aux';
import './homepage.css';
import Images from '../../images/index';

class Homepage extends Component {
    render() {
			
        return (
            <Link to="/projects">
                <div >
                    <table style={{cursor: "pointer"}}>
                        <tr>
                            <td><img src={Images.js} className="js"/></td>
                            <td><img src={Images.c} className="c"/></td>
                            <td><img src={Images.py} className="py"/></td>
                        </tr>
                        <tr>
                            <td><img src={Images.react} className="react"/></td>
                            <td><img src={Images.mongo} className="mongo"/></td>
                            <td><img src={Images.linux} className="linux"/></td>
                        </tr>
                    </table>
                </div>
            </Link>
        )
    }
}

export default Homepage;
