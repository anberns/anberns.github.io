---
layout: post
title:      "Maintaining a Database of Unique Users with Ruby and ActiveRecord"
date:       2019-02-04 16:29:51 +0000
permalink:  maintaining_a_database_of_unique_users_with_ruby_and_activerecord
---


While the lectures and labs leading up to the Sinatra Portfolio Project laid a strong foundation for completing it, the requirement that user accounts have a unique attribute led to some engineering and Googling. 

For most of the development of my project, my Users database allowed for multiple users to have the same username. In terms of the organization of the database, this did not lead to any problems because each new user was given a unique id number when their row was created. When the Users database was queried to log users in, however, having a unique id number was not enough as it is not used as a login credential. Having multiple users with the same username and password was now a huge problem.

When multiple users can sign up with the same credentials, only the first user created with those credentials will be able to login in subsequent visits. 

```
#login user
  post '/login' do 
    user = User.find_by(:username => params[:username])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect '/releases'
    else 
      redirect to '/'
    end
  end
```

If we look the login route above, we see that the user is found using ActiveRecord's '.find_by' method, which returns the data for the first row that meets the search criteria. In this case, the first user with a given username stored in the Users table will always be the first found and all of the others with the same username will be lost forever, at least to this route. 

Aside from losing users, there are other bad things that can occur when multiple users log in with non-unique usernames. If the first user attempts to log in with their correct password, they will be successful, which is great. If a different user with the same username logs in with their password, they will, at least in this route, be forever redirected to the '/' landing page where they will be asked to signup or login again. This occurs because the .authenticate call fails. The third possibility is highly unlikely to happen, but would be very bad if it did. If a subsequent user signs up with the same username and password as the first, that subsequent user will be granted access to the first's account.

So the username must be unique. How can we make this happen? The way that I came up with, which is admittedly a little hacky, was to add an elsif clause to the signup route that queries the database for a existing user with the proposed username and sending a message if one is found.

```
#create new user
  post '/signup' do 
    if params["username"] == "" || params["email"] == "" || params["password"] == ""
      redirect '/signup'
			
->elsif User.find_by(username: params[:username])
      @message = "Username already exists, please choose another."
      erb :'users/signup'
			
    else
      @user = User.create(username: params[:username], email: params[:email], password: params[:password])
      session[:user_id] = @user.id
      redirect '/releases'
    end
  end
```

The 'users/signup' view was also given a <p> element to display the @message, which is set to a blank space when the view is rendered in the 'signup' get route.

```
#load signup form
  get '/signup' do
    if logged_in?
      redirect to '/releases'
    else
      @message = " "
      erb :'users/signup'
    end
  end
```

This works fine, but there has to be a more standard way to handle this situation right? When setting up or altering a table using SQL, you can add the UNIQUE constraint to the column definition. Can this be done in ActiveRecord migrations?

In ActiveRecord, there are ways of adding a UNIQUE constraint but it seems to be frowned upon from a philosophical standpoint. The ActiveRecord approach tends to favor having the models handle this kind of thing, so a method, 'validates_uniqueness_of' can be added to a model definition.

```
class User < ActiveRecord::Base
  validates_uniqueness_of :username
end
```

Like 'has_secure_password', this seems to be part of the metaprogramming support that Ruby provides in the background. When the User model and table combine through ActiveRecord and Ruby inheritance, unique usernames are magically enforced.

Here's how it goes down according to the command line.

When a new user's information is posted, the database checks to see if a record already exists with the same username, in this case 'dupuser'.

```
User Exists (0.1ms)  SELECT  1 AS one FROM "users" WHERE "users"."username" = 'dupuser' LIMIT 1
```

If no user is found, the creation continues.

```
SQL (0.7ms)  INSERT INTO "users" ("username", "email", "password_digest") VALUES (?, ?, ?)...
```

If a user is found, however, a new one is not created and the transaction is 'rolled back', which in my case, reloads the '/' page.

```
User Exists (0.2ms)  SELECT  1 AS one FROM "users" WHERE "users"."username" = 'dupuser' LIMIT 1
D, [2019-02-04T11:05:55.711902 #32593] DEBUG -- :    (0.1ms)  rollback transaction
```


Both my hacked solution and the official solution to the unique username problem do the same thing, but using the 'validates_uniqueness_of' method has other amenities. To learn more check out the link below.

[https://apidock.com/rails/ActiveRecord/Validations/ClassMethods/validates_uniqueness_of](http://)
