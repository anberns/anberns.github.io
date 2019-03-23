---
layout: post
title:      "Getting Your Rails API Ready for Hosting on Heroku"
date:       2019-03-23 17:00:59 +0000
permalink:  getting_your_rails_api_ready_for_hosting_on_heroku
---


For my final project of the bootcamp, I chose to host my work on Heroku so that it can be accessible to potential employers. The project is based on the client-server model. In order to replicate an application that could have different frontends, say React and iOS, I chose to make the API and React frontend completely separate. Both will be hosted on Heroku as separate projects. 

Transitioning a Rails API from a local environment to a 'production', i.e. hosted, environment is relatively easy, but does involve a few changes. These changes can be found in other blogs and on stack overflow, however I thought it would be nice to have them all layed out in one place.

Step one is to build your API. If you are building from scratch, there are some options that will make life a little easier, the most important of which is to add the --api and --database=postgresql flags when creating a new rails app.
```
rails new my_api --api --database=postgresql
```
This will trim down the the installation by removing an browser related middleware, including views and cookies. The biggest change that will occur is that the database will no longer be SQLite. Heroku doesn't support it because of the way it stores information in memory. Using Postgres isn't that different, at least for the basic CRUD routes you'll most likely be creating. 

If your Rails app was created without the flags, as above, no worries. A few changes can be made to accomplish the same end. Either way, it's best, but not necessary, to have a Postgres locally installed so that your development environment mimics the production one.

The first change that needs to be made is really an addition. Specifically the addition of a gem called 'pg'. This is a little tricky because a flag is necessary to link the gem to your local installation of Postgres, the path to which may be different from the example and can be found by running 
```
sudo find / -name "pg_config"
```
in your console. Once you've found the path, add it to the install command like below.
```
gem install pg -- --with-pg-config=/Library/PostgreSQL/9.4/bin/pg_config
```
After the gem is installed, run bundle install. 

The second change to your Rails app will be swapping out the SQLite adapter in config/database.yml. The change below takes advantage of environmental variables, which will need to be stored locally and which will be provided automatically by Heroku.
```
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
  database: db/development
  username: <%= ENV['USERNAME'] %>
  password: <%= ENV['PASSWORD'] %>

# Warning: The database defined as "test" will be erased and
# re-generated from your development database when you run "rake".
# Do not set this db to the same as development or production.
test:
  <<: *default
  database: db/test

production:
  <<: *default
  database: db/<%= ENV['']
```
Once the above changes have been made, you're ready to create and migrate your database using the same rake commands and migration files that you used with SQLite. In order to do this locally, you need to have a local Postgres database up and running, which is a process that warrants a blog post much longer than this one. I was sucessful by following the steps in the linked site at the end of this blog.

So now your API is hooked up to Postgres and all of your serializers and seed data will play nice with Heroku. Once your API is hosted on Heroku, if separate from your frontend app, you will need to account for CORS or Cross-Origin Resource Sharing. You need to set up your API to have a 'whitelist' of domains that can request data. If you are going to connect a local instance of your app to the Heroku-hosted API, you will need to add a local domain as well as the production domain of your hosted frontend app.

To enable CORS in your API you need to add a gem.
```
gem 'rack-cors'
```
Next you need to create a file in the `config/initializers` folder. I called mine 'cors.rb'. This is the whitelist of domains mentioned above.
```
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:8000', 'http://localhost:8000'
    resource '*',
      headers: :any,
      methods: %i(get post put patch delete options head)
  end
end
```
The 'origins' option has both my domain as a local API server would see it as well as the way Heroku would see it, the difference being the addition of 'http://'. Any other domains can be added onto the list. If you want a competely open API, you can put an asterisk in the origins option, like in the resource option above.

If everything went as planned, your API is prepped for Heroku. If problems arose, which it seems like they always do, check out the links below for more information.


Setting up Postgres locally:
[https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb](http://)

Postgres setup with Rails:
https://yizeng.me/2015/02/09/install-and-setup-postgresql-for-ruby-on-rails-on-mac-os/

CORS:
[https://sourcey.com/articles/building-the-perfect-rails-api](http://)
