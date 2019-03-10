# Angular 7 reactive architecture

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4.

### Basic Concepts

This project summarize concepts explained in these articles (thanks to the authors).


- [Understanding Angular modules (NgModule) and their scopes](https://medium.com/@cyrilletuzi/understanding-angular-modules-ngmodule-and-their-scopes-81e4ed6f7407) by Cyrille Tuzi 

- [Architecture in Angular projects](https://medium.com/@cyrilletuzi/architecture-in-angular-projects-242606567e40) by Cyrille Tuzi

- [Redux (@ngrx/store) best practices](https://blog.strongbrew.io/Redux-best-practices) by Brecht Billiet
 
- [A scalable Angular 2 architecture](https://blog.strongbrew.io/A-scalable-angular2-architecture) by Brecht Billiet

### Live demo

[Live Demo on Heroku](https://alemarte-master-mind.herokuapp.com)

### Run Locally

In order to run locally you'll need to create a new Google Firebase project and populate these properties with your own values:

   ```javascript
   // environment.ts
   const firebaseProjectId = 'xxx';
   const firebaseApiKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
   ```
   
   ```bash
    $ npm install
   ```
   
   ```bash
    $ ng serve
   ```

