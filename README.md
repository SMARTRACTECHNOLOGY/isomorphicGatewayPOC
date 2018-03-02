# isomorphicGatewayPOC


Client is reactApp, to launch it, simply type
```
npm install
npm start
```

Server side  (read console output for urls)
```
npm install
npm start
```


Currently, client side assets are serving from client application through localhost:3000

For redux middleware, it use port number 2000 to talk to server side.





After you launch application, you can use below command to login
```
curl -H "Content-Type: application/json" -X POST -d '{"type":"PAGE", "page": "LANDING"}'  http://localhost:2000/redux/action
```

This command just try to simulate the user swipes the tag and verified from portal backend then trigger this action.
 
