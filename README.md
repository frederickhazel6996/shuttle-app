<h1 align="center">
:sunny: Shuttle Tracking Web App
</h1>
<p align="center">
MongoDB, Express JS, React JS, Node JS and Redux
</p>
s
## clone or download

```terminal
$ git clone https://github.com/frederickhazel6996/shuttle-tracker-app.git
$ npm i
```

## Pre-requirementsssss

-   [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
-   [Node](https://nodejs.org/en/download/) ^10.0.0
-   [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)

```terminal
$ cd client   // go to client folder
$ npm i       // npm install pacakges
$ npm run dev // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## Server-side usage(PORT: 3001||process.env.PORT)

### Start

```terminal

$ npm i       // npm install pacakges
$ npm run start // run it locally

```

https://shuttle-app-legon.herokuapp.com/
