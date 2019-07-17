import React from 'react';
import Header from '../../containers/Header/Header';
import Footer from '../../containers/Footer/Footer';
import Aux from '../../hoc/aux';
import About from '../about/about';
import './aboutPage.css';

const AboutPage = () => {
    return (
        <Aux >
            <Header heading="About Me" link="Projects" url="/projects"/>
            <About />
            <Footer />
        </Aux>
    )

}

export default AboutPage;