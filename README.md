# Otso Codecamp Winter 2015 group 3
App is running here: https://otso-cc-lasshi.c9users.io

#### [Poster](./doc/poster.svg)

###[Course Report](https://docs.google.com/document/d/1NsvPyfmmsD1wCs2x39Vm1WNjHJE0ldgjEl0gVZvLLyA/edit?usp=sharing)

# Team members

| Team member    | Main responsibility  |
| :------------- | :-------------       |
| Otto Laitinen  | Backen               |
| Lassi Lääti    | In between           |
| Anna Osipova   | Fronend              |

# Idea
Local IT company LTC Otso provided us with a case that we had to solve. They had a few criteria what they wanted to see, and we planned to implement them all, since we felt quite confident in our programming skills. We also wanted to make our final application completely functional, with real client - server communication.

# Features
In the end we were able to implement all of our planned features, with some extra features. We have functionality for basic customers, subcontractors and manufacturers. The basic logic of the application is that a manufacturer can make an order and assign it to chosen subcontractors. After the work is done, a custom feedback link is sent to the customer as an email, and the given feedback is connected to the relative subcontractor. After this loop has ran a few times, the manufacturer can review their subcontractors based on given feedbacks. Manufacturers can also sort their subcontractors in different orders, to see e.g who has the best ratings.

# Screenshots

![screenshot1.png](./doc/screenshot1.png)
![screenshot2.png](./doc/screenshot2.png)
![screenshot3.png](./doc/screenshot3.png)
![screenshot4.png](./doc/screenshot4.png)
![screenshot5.png](./doc/screenshot5.png)
![screenshot6.png](./doc/screenshot6.png)

# Technology
Server uses node.js REST architecture, and all data passed between client and server are pure JSON. Also numerous node modules are used, like Express and Jade.  
Client is based on HTML5 principles (JavaScript, jQuery, Ajax-calls) and ReactJS is used for making the client look like a native mobile application

We have data specification at [server/data/README.md](https://github.com/lasshi/otso-cc/tree/master/server/data)

# Build info
webpack -w to rebuild bundle.js on js changes
