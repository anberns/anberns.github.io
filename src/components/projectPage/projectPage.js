import React from 'react';
import Header from '../../containers/Header/Header';
import Footer from '../../containers/Footer/Footer';
import Aux from '../../hoc/aux';
import Projects from '../../containers/Projects/Projects';
import './projectPage.css';

const ProjectPage = () => {
    return (
        <Aux >
            <Header heading="Projects" link="About Me" url="/about"/>
            <Projects />
            <Footer />
        </Aux>
    )

}

export default ProjectPage;