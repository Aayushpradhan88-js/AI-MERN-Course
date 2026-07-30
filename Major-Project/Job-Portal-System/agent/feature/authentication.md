Description: This is an authentication file

Flow

User stories

- we have to see the admin also with email and password
  - email: admin@jps.com
  - password: adminJPS12345

- First user open the website. he goes to the register section and fill the three fields (email, password, role). 
- when his registration process is done then he will redirected to the login section with (email & password) then we have to redirect him to the dashboard.

APIs (/api)

- for register -> /auth/register (packages: bcrypt, jwt)
- for login -> /auth/login (
                                - we have to generate access & refresh token,
                                - send user data(id, name, email, role) that should be send in the frontend.
                            )
- for logout -> /logout (from the frontend localstorage we have to delete the tokens & user data)


