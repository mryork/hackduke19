<p align="center"><img src="https://raw.githubusercontent.com/mryork/hackduke19/master/frontend/imgs/win.PNG" width="30%"/></p>

![Logo](frontend/imgs/careloglogo.png)
<br>
**carelog (n.)** - a 24-hour hackathon project made at [HackDuke 2019 (Code for Good)](http://hackduke.org/) by Adam Cogdell, Kenan Poole, (frontend) and Michael York (backend); a project aiming to lower the barriers to mental health care for everybody

<hr>

**Our Goal:** Make mental health care logging easily accessible to everybody through a simple, easy to use webapp to connect patients with providers. By completing daily wellness checks, patients are able to more easily communicate with their providers--allowing for day-to-day updates regarding their mental health.

**How We Did It:** We created a web application separated only by two folders: frontend and backend. Our frontend was written in mostly custom HTML/JS, using Bulma as a CSS framework. Our backend used many modern web technologies to create an extensible framework: ExpressJS, mongoDB Atlas, and Google Cloud Platform. During the hackathon, our website was available at [carelog.online](carelog.online).

**Running carelog Locally:** To run carelog, you will need a mongoDB Server (we used Atlas, provided by a sponsorship through MLH), and a server compatible with NPM. In the backend, you will need to create a `.env` file to store your mongoDB server information (as  `MONGO_HOST=mongodb...`), and a private key for password encryption (as `PRIVATEKEY=...`). Then, run `npm install` in both the frontend and backend folders. Finally, simply run `npm run start` in the backend. carelog will be available at port 80, running both the backend and frontend.

**Special Thanks:** We would like to thank HackDuke 2019 for hosting this event, and MLH for their continued support of hackathons everywhere. Particularly, we would like to thank Google Cloud Platform, mongoDB Atlas, and Domain.com for their sponsorship and for providing resources for us to use.
