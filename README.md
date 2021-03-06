# React Backend Management System

Here's the <a href="http://13.59.50.112" target="_blank">Demo</a>, it is hosted by AWS. Please feel free to play around with it, since the app is using one database, you might see data coming from other users.

**Default** **username**: **admin**

**Default** **password**: **admin**

This project is full stack MERN app, it is a mock up backend for e-commerce website. Functionalities include:

1. user login

   ![login demo](https://i.ibb.co/jDFqdKL/login.gif)

2. product category management

   ![category management demo](https://i.ibb.co/m56brGp/category-management.gif)

3. product management

   ![product management demo](https://i.ibb.co/Z85dKp2/product-management.gif)

4. role management

   ![role management demo](https://i.ibb.co/F5X25fp/role-management.gif)

5. user management

   ![user management demo](https://i.ibb.co/BVqsMKc/user-management.gif)

6. menu visiablity control

   ![menu visiablity demo](https://i.ibb.co/GW9yW1m/role-management.gif)

## Getting Started

If you want to run this project locally,

1. navigate to the directory where you want to keep this project and run this command

```
git clone https://github.com/ruidashen/react-backend-managment-system.git
```

2. You need to have MongoDB up and running, or if you are using MongoDB cloud service such as Atlas, you need to

   1. open the server.js file under the project folder
   2. replace the connection string

   ```
   'mongodb://127.0.0.1:27017/'
   ```

   with your own.

3. After you clone the project and have MongoDB up and running, navigate to the project folder

```
cd react-backend-management-system
```

4. Install the dependencies

```
npm install
```

5. Run the server

```
npm start
```

6. The project will now be running on

```
http://localhost:5001
```

in your browser

### Prerequisites

In order to run this app locally, you need to have the [Node.Js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) installed.

## Deployment

If you want to build your own production build, run

```
npm run build
```

then run

```
npm start
```

The server now will automatically serve the build folder

## Built With

- Front-End: [React](https://reactjs.org/), [React Router4](https://github.com/ReactTraining/react-router), [Redux](https://redux.js.org/), [Antd](https://ant.design/docs/react/introduce),
  [Axios](https://github.com/axios/axios), [ES6/ES8](), [webpack](https://webpack.js.org/), [ECharts](), etc..

- Back-End: [Express.Js](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Node.Js](https://nodejs.org/en/), [Mongoose](https://mongoosejs.com/), [Multer](https://github.com/expressjs/multer), etc..
