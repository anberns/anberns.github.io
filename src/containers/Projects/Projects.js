import React, { Component } from 'react';
import Aux from '../../hoc/aux';
import './Projects.css';
import Project from '../../components/project/project';

class Projects extends Component {
    state = {
        graphical: {
            heading: "Graphical Webcrawler",
            img: "graphical",
            text: "My Post-Baccalaureate capstone project that I completed with two fellow students. Built using Javascript, d3.js, Jinja and Bootstrap on the frontend and Python with Flask on the backend, it takes a starting website and follows a specified number of random links if a depth-first search is chosen, or all links for each page if a breadth-first search is chosen. As the links are visited, their page data is sent to the frontend of the application through a websocket, allowing the d3.js graph to update in real time. Crawls are stored in a MongoDB database and can be retrieved and re-displayed. I was responsible for creating the backend as well as getting the application hosted, connecting the database, and connecting the visualizer with the webcrawler application via a websocket.",
            languages: "Javascript, Python, Flask, MongoDB, Flask-sockets, d3.js, Heroku",
            appUrl: "https://graphicalwebcrawler.herokuapp.com",
            buttonValue: "Run App",
            buttonState: "enabled",
            docs: "https://github.com/anberns/technicalWriting/blob/master/Graphical%20Web%20Crawler%20Final%20Report.pdf", 
            code: "https://github.com/anberns/grus"
        },
        monitor: {
            heading: "Room Monitor",
            img: "monitor",
            text: "This personal project allowed me to explore the intersection of hardware and software by using two Raspberry Pi's connected over an ad hoc network to monitor and report room conditions. One unit is equipped with several sensors including temperature, smoke, motion and sound. It monitors the environment concurrently by connecting the sensors to the Raspberry Pi's GPIO pins, which are able to trigger kernel interrupts. Sensor signals are sent to the display unit, which reports conditions on a small OLED screen, and sounds a small buzzer in the event of an emergency. A menu function allows the user to adjust the sensor sensitivity as well as the acceptable room temperature range. The display unit software is written in Python and concurrently monitors and responds to sensor messages while also running the settings function.",
            languages: "C, Python, Linux, Raspberry Pi, RPi.GPIO",
            appUrl: "https://vimeo.com/292714070",
            buttonValue: "Demonstration",
            buttonState: "enabled",
            docs: "https://github.com/anberns/pi/blob/master/wireless_room_monitor_description.pdf", 
            code: "https://github.com/anberns/pi"
        },
        rapid: {
            heading: "Rapid Exchange",
            img: "rapid",
            text: "In order to round out my web development knowledge, I'm currently completing Flatiron School's Web Development online bootcamp. This educational application that helps students with dyslexia learn to recognize and blend together individual phonemes, or letter sounds, is the culmination of what I've learned from the program. It uses Rails on the backend and React with Redux on the frontend. Authentication is handled by Google's OAuth and user data is stored and accessed using Postgres.",
            languages: "Javascript, React, Redux, Ruby on Rails, Postgres",
            appUrl: "https://rapid-exchange.herokuapp.com",
            buttonValue: "Run App",
            buttonState: "enabled",
            docs: null, 
            code: "https://github.com/anberns/rapid_exchange"
        },
        freestyle_spa: {
            heading: "Freestyle: Javascript SPA",
            img: "freestyle_spa",
            text: "In order to practice DOM manipulation with Javascript and jQuery, I implemented a basic single page application using a Rails API based on Active Model Serializers and Handlebars.js. The app stores a swim league's events and teams and features dynamic index and show pages as well as dynamic form submition.",
            languages: "Javascript, jQuery, Ruby on Rails, Active Model Serializers, Handlebars.js",
            appUrl: "https://vimeo.com/322304157",
            buttonValue: "Demonstration",
            buttonState: "enabled",
            docs: null, 
            code: "https://github.com/anberns/freestyle"
        },
        freestyle_rails: {
            heading: "Freestyle: Rails",
            img: "freestyle_rails",
            text: "This project called for extensive use of Active Record and Action Views by having several models and many relationships between them. Nested resources, nested routes and form helpers were all utilized.",
            languages: "Ruby on Rails, Active Record, Action Views",
            appUrl: "https://vimeo.com/318622005",
            buttonValue: "Demonstration",
            buttonState: "enabled",
            docs: null, 
            code: "https://github.com/anberns/rails_project_final"
        },
        techno_delivery: {
            heading: "Techno Delivery CLI",
            img: "techno",
            text: "This project makes life easier for the techno dj or collector by scraping the new release data of the website of the infamous Berlin record store, Hard Wax. OpenURI fetches the HTML and Nokogiri is used to pull out essential album information, which is then categorized. The user is able to choose distinct genres of the week's new releases to view album information. The CLI can also download and play song samples in the background.",
            languages: "Ruby, Nokogiri, OpenURI",
            appUrl: "https://vimeo.com/312274386",
            buttonValue: "Demonstration",
            buttonState: "enabled",
            docs: null, 
            code: "https://github.com/anberns/flatiron-project1"
        }
    }
   
    
    render () {
    
        return (
            <Aux >
                <Project data={this.state.rapid} />
                <hr className="hr"/>
                <Project data={this.state.monitor} />
                <hr className="hr"/>
                <Project data={this.state.graphical} />
                <hr className="hr"/>
                <Project data={this.state.freestyle_spa} />
                <hr className="hr"/>
                <Project data={this.state.freestyle_rails} />
                <hr className="hr"/>
                <Project data={this.state.techno_delivery} />
            </Aux>
        )
    }
}
export default Projects;