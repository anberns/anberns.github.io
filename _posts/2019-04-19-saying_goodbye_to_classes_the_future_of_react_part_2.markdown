---
layout: post
title:      "Saying Goodbye to Classes: The Future of React, Part 2"
date:       2019-04-19 14:46:26 +0000
permalink:  saying_goodbye_to_classes_the_future_of_react_part_2
---


As a continuation of my last post about an impactful paradigm shift in React development, namely the beginning of the end of class components in favor of stateful functional components, I'd like to focus now on component lifecycles. As I stated in the previous post, class components have been utilized in order to take advantage of state and lifecycle methods. Class component lifecycle methods such as componentDidMount() allow developers to designate specific actions during specific stages of component rendering. A classic example is fetching data from an API after a component has partially rendered so that the user sees something while the data is in transit and is less likely to become confused or agitated while waiting for the full presentation.

If we are to move away from using class components, as React team developers are suggesting that we should, we have to give up access to the lifecycle methods that we've come to rely on. Of course, just as functional components can now implement state using the newly introduced 'Hooks' methods, they can also implement lifecycle methods in a similar fashion. 

The 'Hook' method for approximating the utility of lifecycle methods is call 'Effect'. The Effect Hook combines the abilities of the class methods 'componentDidMount', 'componentWillUnmount' and 'componentDidUpdate' and is accessed by importing 'useEffect' from the React library inside of the functional component.

```
import React, { useEffect } from 'react';
```

To tap into the 'useEffect' method, define the action(s) that you want to happen when the functional component renders and re-renders. This approximates the utility of 'componentDidUpdate' and 'componentDidMount'. 

```
function someComponent() {
  ...
  useEffect( () => {
    SomeAPI.subscribeToFeed();
  });
	...
}
```
In the example above, the useEffect method is passed an anonomous function which subscribes to a data feed when the component renders. Pretty simple right? But we have to also 'clean up' when a component unmounts, which in this case means unsubscribing from the data feed. The way to do this with 'useEffect' is to provide a function to be executed when useEffect() returns.

```
function someComponent() {
  ...
	
  useEffect( () => {
	
	// subscribe
    SomeAPI.subscribeToFeed();
		
    // unsubscribe
    return () => {
      SomeAPI.unsubscribeToFeed();
    };
  });
	...
}
```
So to restate what's happening here, when 'someComponent' mounts, useEffect() is called and any functions within are called. The useEffect() method runs throughout the component's lifecycle and returns when the component begins to unmount, calling whatever cleanup functions are necessary. 

So in it's simplest form, that's how lifecycle methods work inside newly empowered functional components. For more information be sure to read the official explanation at the link below.

https://reactjs.org/docs/hooks-overview.html
