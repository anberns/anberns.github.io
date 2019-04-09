---
layout: post
title:      "Saying Goodbye to Classes: The Future of React, Part 1"
date:       2019-04-09 13:20:11 +0000
permalink:  saying_goodbye_to_classes_the_future_of_react_part_1
---


During the most recent React Conference in October of last year, React team developers presented a proposal that calls for a shift away from using class components in favor of functional components with hooks. To summarize one of the presentations from the conference, React classes have come to be viewed as too difficult and verbose, with too many tradeoffs to justify their main selling point, state. 

The proposed alternative is to use functional components along with new React api's that provide the benefits of state without the downsides of classes. The new api's are labeled as 'hooks' and provide similar functionality. In this blog post, I'll walk through the first of two major aspects of hook functionality: state variables. A subsequent post will detail the hooks implementation of lifecycle methods.

The major benefit of using classes is that they give us the ability to maintian stateful components, or components with a store of mutable data that can be updated to change the appearance and functionality of a given React component. Class component states are initialized inside of a component's constructor function and updated through calls to the setState() method.

```
import React from 'react'

class Student extends React.component {
  state = {
	  name: "Default Student",
		major: "Default Major"
	}
	...
  changeName = (newName) => {
	  this.setState( {
      name: newName
	})
		
  changeMajor = (newMajor) => {
	  this.setState( {
      major: newMajor
	})
}
```

The new way of maintaining stateful components takes a different path to achieve the same results. The new React hook method 'useState()' creates state variables and grant access to them inside of a functional component. 

```
import React, { useState } from 'react'

const Student = (props) => {
  const [name, setName] = useState("Default Name");
	
  const changeName = (newName) => {
	 setName(newName);
  }
}

```
In the example above, Student becomes a functional component and it is given the ability to have a state variable, 'name', through the inclusion of the 'useState()' hook, which is imported from the React library. The single call to 'useState()' sets up the 'name' variable with the default value it is passed. The 'name' variable is declared inside of an unnamed array along with a setter function, 'setName'. This setter function acts as expected in that it is passed a value and updates the variable accordingly. The 'useState()' hook provides the behind the scenes actions of changing the value of the stateful variable.

To have more than one stateful variable, simply pass another array with the variable and setter function to an additional call to 'useState()'.

```
import React, { useState } from 'react'

const Student = (props) => {

  const [ name, setName] = useState("Default Name");
  const [ major, setMajor] = useState("Default Major");
	
  const changeName = (newName) => {
	  setName(newName);
  }
	
  const changeMajor = (newMajor) => {
	  setMajor(newMajor);
  }
}
```
That's all it takes to give a functional component access to stateful variables. While this may not seem revolutionary, when used with other hooks, such as 'useEffect()' that restructures class lifecycle methods for use in functional components, these components are instantly cleaner and more straightforward while maintaining the functionality of classes. I'll go into more detail about 'useEffect()' and other hooks in a subsequent post. There's much more to learn about 'useState()' and other hooks and I highly suggest that you take a look at the documentation and presentation linked below.

[https://reactjs.org/docs/hooks-overview.html](http://)

[https://www.youtube.com/watch?v=dpw9EHDh2bM&t=3960s](http://)
