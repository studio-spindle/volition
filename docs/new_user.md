# Creating a new user

Install [Postman](https://www.postman.com/) and import the [postman collection](./postman/Volition.postman_collection.json) for this project.

Then in postman run the 'signup' request with the following body (x-www-form-urlencoded):

```
username: Myname
password: Testing123
```

# Creating a task

Use the 'Sign in' request with the same body as used in the [creating a new user](#creating-a-new-user) task. This will return an accessToken.

Copy the value of that access token. 

Then use the 'Create task' request. In the Authorization tab set the TYPE to **Bearer Token**, and add the token received in the sign in request.

Then send the body as you like (x-www-form-urlencoded):

```
title: Some kind of title
description: My description of the task
```

That's it. In the postgress admin under Server > local > Databases > taskmanagement > schemas > public > Tables (2) you will see two tables, one for the **task** and one for the **user**.
