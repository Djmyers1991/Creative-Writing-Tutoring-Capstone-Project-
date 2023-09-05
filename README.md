<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Application Overview
Rare is a content management application for users to create/edit/delete posts as well as comment on others' posts via comments, tags, and reactions. To contextualize the content, categories are applied to each post to ensure the users are perusing insights relatable to their interests. As such, admins and authors can create/edit/delete categories as well as individual comments, tags, and reactions. To ensure that the content is appropriate, only admins are allowed to edit and delete pre-existing tags and categories. As authors are able to delete their own comments and posts, an individual page will proliferate with the logged in user's posts. The overall purpose of our app is to allow users to interact with like-minded individuals and bond over shared communal interests. Our app is less about managing content than it is about fostering life-long relationships.   

## Technologies Used

 ![HTML5](https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Git](https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white) ![JSON Server](https://img.shields.io/badge/JSON_Server%20-%232a2e2a.svg?&style=for-the-badge&logo=JSON&logoColor=white) 
![Visual Studio Code](https://img.shields.io/badge/VSCode%20-%23007ACC.svg?&style=for-the-badge&logo=visual-studio-code&logoColor=white)

## Getting Started

### Server Side
1. Clone this repository for the server side:
```sh
git clone git@github.com:Djmyers1991/Creative-Writing-Website-Database.git
```
2. Check into the right file
```sh
cd Creative-Writing-Website-Database```
3. Ensure that the JSON server is running
```sh
json-server database.json -p 8088
```
### Client Side
To run this program, please do the following.
1. Clone this repository for the client side:
```sh
git clone git@github.com:Djmyers1991/Creative-Writing-Tutoring-Capstone-Project-.git
cd Creative-Writing-Tutoring-Capstone-Project-
```
2. Install dependencies: 
```sh
npm install
```
3. Run the code 
```sh
npm start
```
4. Sign in as one of the following users.
   ```sh {  "users": [
    {
      "name": "Daniel Myers",
      "email": "DanielM@gmail.com",
      "isStaff": true,
      "isChiefAdmin": true
    },
    {
      "name": "Steve Brownlee",
      "email": "steviewondersoften@aol.com",
      "isStaff": true,
      "isChiefAdmin": false
    },
    {
      "name": "Lance Lancey",
      "email": "Lance@lance.lance",
      "isStaff": false,
      "isChiefAdmin": false
    }

5. To view the entire database, please click the following link.
```sh
 https://github.com/Djmyers1991/Creative-Writing-Website-Database/blob/main/database.json
```

## ERD

https://dbdiagram.io/d/64812bc5722eb7749497e575

## Wireframe

https://miro.com/app/board/uXjVMAz1gJ8=/?share_link_id=532942704386

## Features
