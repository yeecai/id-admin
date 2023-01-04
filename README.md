### with docker-compose:
    docker-compose build
    docker-compose up

### without docker-compose:
    yarn
    yarn start
    #(change db to localhost in app.module.ts)
    start mysql service: 
        mysql -u root 
        source path/user.sql

Form page
http://localhost:3000/

Admin page
http://localhost:3000/admin