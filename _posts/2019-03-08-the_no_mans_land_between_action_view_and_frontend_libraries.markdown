---
layout: post
title:      "The No Man's Land Between Action View and Frontend Libraries"
date:       2019-03-08 21:56:36 +0000
permalink:  the_no_mans_land_between_action_view_and_frontend_libraries
---


For my Rails with Javascript portfolio project I, because I had eaten my Wheaties that morning, decided to rebuild my Rails application as a single page application using only Javascript, JQuery and some Handlebars templates. It can't be that hard, I thought. People build SPA's all the time. Yes, they do in fact build them all the time and they use a frontend library like React, Ember, Vue or Angular. They do so with good reason. It takes forever to do it without one. And I learned that the hard way.

So I have to admit that I was a little confused as to how to get started on this project. The idea is to add some Javascript dynamic functionality to our Rails app. The first thing I learned is that there aren't many Google-able resources for how to accomplish this without breaking everything. A Rails API is needed, but an API doesn't serve views. As soon as you switch over to rendering JSON, your beautifully styled page becomes a printout of an object. So at this point, after hours of trying to get my head around how to make the two server styles play nice, I decided it would be easier to just start from almost scratch.

I took the lesson on templating and went to town. Every view from my Rails app would become a template. No big deal. Yes, I suspected that giving up all the Action View magic would make the undertaking more difficult. And it did. The controller actions now just serve raw data. Every time that data needs to be displayed, it needs to be massaged into Javascript Model Objects, which then need to be massaged into compiled Handlebars templates. The templates aren't that different from an erb view.

```
<script id="team-show-template" type="text/x-handlebars-template"> 
      <h1>{{ name }}</h1>
      <h2>{{ hq }}</h2>
      <div class="team_card_full">
        <img src="{{ image_url }}">
        <button class="normal_button" id="teams/{{ id }}/users">Roster</button>
      </div>
      </script>
```

Replacing the Action Controller / Action View synergy the first time around provided many learning opportunities. The next several became exercises in repeating a similar process again and again with slight changes. At this point it really hit me that libraries are born from times like these. The thrill of learning something new has worn off and we are stuck laying bricks. Not that there's anything wrong with laying bricks. I enjoy some repetitive tasks for their flow. Writing controller-action-like functions in Javascript for every stop on the CRUD train somehow was not as calming as laying bricks. 

For some context, here's a JS / JQuery equivalent of an Action Controller #show action combined with some Action View type page rendering. The functions below get and process the data, make a new div, add a listener to the link in the new div and define the action that listener will take when triggered.

```
function showTeam(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: e.target.id,
    success: (response) => {
      let teamObj = new Team(
        response.data.id,
        response.data.attributes.name,
        response.data.attributes.hq,
        response.data.attributes['image-url']
      )
      let newDiv = createNewDiv("team_page")
      let template = Handlebars.compile(document.getElementById('team-show-template').innerHTML)
      let team = template(teamObj)
      newDiv.innerHTML += team
      loadTeamShowLinks();
      }
    });
}

function createNewDiv(id) {
  let contentDiv = document.getElementById('main_content')
  contentDiv.innerHTML = "";
  let newDiv = document.createElement('div');
  newDiv.id = id; 
  contentDiv.appendChild(newDiv)
  return newDiv;
}


function loadTeamShowLinks() {
  let rosterButton = document.getElementsByClassName("normal_button")[0];
  rosterButton.addEventListener("click", (e) => { showRoster(e) }) 
}

function showRoster(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: e.target.id,
    success: (response) => {
      let newDiv = createNewDiv("users_list")
      let template = Handlebars.compile(document.getElementById('users-index-template').innerHTML)
      let users = template(response.data)
      newDiv.innerHTML += users 
    }
  });
}
```

Building out index, new and edit functionality required a comparable amount of JS ninjitsu. On a positive note, I received ample opportunity for learning to manipulate the DOM and for wrangling API data. If you're looking for a similar level of practice, then Wheatie up and dive in. You've been warned.
