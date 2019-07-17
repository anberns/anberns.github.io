import React from 'react';
import Aux from '../../hoc/aux';
import Images from '../../images/index';
import './about.css';

const About = () => {
  const writeup = "I'm a former teacher and I got interesting in coding through the educational apps I employed in my classroom. My first experience was with MIT's scratch and I knew pretty quickly that coding's combination of language and problem solving was a really good fit for me. I've recently earned a second batchelors in Computer Science and am finishing Flatiron's Web Development Bootcamp because I'm interested in the growing complexity of browser-based applications. I hope to find a job where I can contribute and continue to grow."
  return (
    <Aux>
      <div class="row">
          <div class="column smallify-left">
              <img src={Images.me} className="img" alt="Aaron Berns"/>
          </div>
          <div class="column smallify-right">
              <h2>Aaron Berns</h2>
              <p>{writeup}</p>
              
          </div>
      </div>
  </Aux> 
  )
}

export default About;