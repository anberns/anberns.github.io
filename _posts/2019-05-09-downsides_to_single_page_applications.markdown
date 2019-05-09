---
layout: post
title:      "Downsides to Single Page Applications?"
date:       2019-05-09 12:57:40 +0000
permalink:  downsides_to_single_page_applications
---


I recently spoke with a software engineer at a Fintech startup who, when hearing that I was building an educational application in the form of a single page application in React and a separate API, gave me the impression that he felt that SPA's were not appropriate for many of the applications they were being used for. This caught me off guard, as I have come to love building SPA's because of their seamless user interactions and desktop application feel. So I figured that for this week's blog post I would look more closely at the pros and cons of using them when a multiple page application would do just fine (but might not be as cool).

First, the pros of single page applications that I know of before doing any further research. I've mentioned the smooth, desktop application feel that they bring to the browser. To expand on that, with an SPA, there never has to be a blank page the browser waits for html instructions from the server. In an SPA, the html for the outer presentational components can be sent once and will stay on screen as long as the developer wants them to. Content can be fetched from a server and the application page can fill and empty, but there is never the impression that the entire application is being erased and rebuilt in the way that a new page load can give. 

Another pro that I've seen again and again when learning about SPA's is that they reduce server load by transferring computation and visual element building to the user's browser and thus to their CPU. The work of rendering, adjusting and re-rendering the application is distributed rather than concentrated on the application owner's server. All of the needed html is sent in one large package, freeing the server to handle other users, or less taxing database queries.

Now the cons that I know of. First, and the largest that I'm aware of, is that the size of that initial package of html that constitutes an SPA's interface and logic. Large packages take longer to send and receive and lead to a higher likelihood of the user experiencing a pause in the action, as if many of the tiny pauses that they might encounter during the page reloads of a mutli-page application were combined and seen upfront. I've experienced this myself, and it can be a noticable problem when using slower servers like Heroku's free tier, but at the professional level, again in my experience, it's like trading the wait time of one page load for all of the others that might come from a mult-page experience. In other words, the single wait time of an SPA load isn't much longer than the average page load that would be experienced multiple times in a regular setup. 

Other cons that I can think of include the fact that an SPA's html content is all or nothing, so if a user only needs to view one 'page' worth of functionality, they will be getting much more then they require, which puts unnecessary strain on the infrastructure of the internet and, on a mobile device, the user's data monthly allocation. For this reason it's often best practice to only use SPA's for highly interactive and logically complex applications. The argument can be made that the complex overhead of necessary extension and packaging libraries, as well as the time spent learning a particular SPA library, can again result in wasted resources. That's all I got. Let's see what Google says.

Ah yes, another con that I forgot about, Search Engine Optimization. It's difficult for search engines to correctly parse SPA urls and to some extent content. According to rubygarage.org, this particular con is has been somewhat mitigated in that Google is now able to search SPA's, but developers must make sure that they follow certain steps to make this happen. Another url-related con is that the browser's back button can be useless. The chronological / sequential page visit experience of a multi-page application is chopped up into countless component renders, re-renders, and unmounts with no real state that a user can go 'back' to. This issue can be dealt with in React by using React-Router to simulate page states whose history can be navigated through. 

Rubygarage.org and threads on Stack Overflow also mention that single page applications can be less secure than their multi-page counterparts. Developers must be careful not to accidentally expose data while building an SPA. They are also giving up access control to portions of the application's 'private' internal functionality by loading them onto a user's browser instead of keeping that functionality on a server and only providing the user with the results.

Despite these considerations, I'm of the strong opinion that SPA's are the way to go for any dynamic web application in which user experience is important. The benefits far outweigh the drawbacks, which though they must be taken seriously and mitigated, are not dealbreakers.


Sources

https://rubygarage.org/blog/single-page-app-vs-multi-page-app

https://stackoverflow.com/questions/21862054/single-page-application-advantages-and-disadvantages
