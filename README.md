# Enablement Station



## Development Work Flow 
> Why do we have different flow here? That's becaue developer's experience is also super important.
Before we can figure out hot reload through express.static load, we'd better run server and client in seperately.
So that react client still have hot reload which is super convenient for development.

```
npm install   // first time or any package changed.
npm startClient   // Then access http://localhost:3000 ( websocket is using 2000 )
npm startServer
```


## Production Work Flow
```
npm install   // first time or any package changed.
npm run buildAll:run   // need to set NODE_ENV=production or development before build
```
The build and run process will do below things:
1) Build Client React Code, and put them into dist/public folder
2) Build Server Code to a single index.js, including transpilation and include all imported files except node modules.
3) Copy only node_modules included in "dependencies" to dist/node_modules  (devDependencies will not be copied) 
4) Run server with command "node dist/index.js"


> The tricky part is that, our server app is serving two purposes
  1) It will serves our react app static files from relative "public" folder, thus, no additional http server is required
  2) It is also a websocket server, which will listen to the redux actions. 


in our RPM, we should simply do a buildAll and then zip all files under dist folder, then after installed in linux machine,
we should simply run "node index.js" and everything should work out of box.

## Things are pending
We will need to make our application more configurable, for example, we should be able to configure
 * Different port number for http server & websocket
 * local pouchDB
 * remote couch DB url
 * credential for remote couch DB


## Flow Support
### Why Flow for this project? 

1. Flow is a type checking solution backed up by Facebook
2. Flow can be used for any javascript projects including React Apps or Nodejs Applications
3. Flow should not have performance impacts on compiled code but propTypes impacts performance badly when development.
4. Comparing to PropTypes, Flow can support the entire React Codebase
5. Flow has great IDE support, with it, you will get better auto completion and type checks during coding. 

### Enable Flow in Intellij IDEA
https://www.jetbrains.com/help/idea/flow.html


## TO BE DELETED  ( This is for sample application right now )

Currently, client side assets are serving from client application through localhost:3000

For redux middleware, it use port number 2000 to talk to server side.



After you launch application, you can use below commands  (Open multiple browsers to see isomorphic behavior)
```
//This command just try to simulate the user swipes the tag and verified from portal backend then trigger this action.
curl -H "Content-Type: application/json" -X POST -d '{"type":"PAGE", "page": "LANDING"}'  http://localhost:2000/redux/action
 
// this is the page for new mvp screen
curl -H "Content-Type: application/json" -X POST -d '{"type":"PAGE", "page": "PROCESS_LIST"}'  http://localhost:2000/redux/action
```


If you toggled all 3 steps with tick mark, it will be automatically upload the data through PouchDB to server side
There are some purposely made animations to make ppl actually give user right feedback.

BTW: Joe has integrated barcode reader for barcode and QR code scan, each scan will simply toggle the tick mark right now.
However, if you don't have barcode reader, you can still run below commands to simulating the scanning.
```
// it will toggle the flag for nfc scanned right now.
curl -H "Content-Type: application/json" -X POST -d '{"type":"NFC_SCANNED"}'  http://localhost:2000/redux/action

// it will toggle the flag for qr scanned right now.
curl -H "Content-Type: application/json" -X POST -d '{"type":"QR_SCANNED"}'  http://localhost:2000/redux/action

// it will toggle the flag for barcode scanned right now.
curl -H "Content-Type: application/json" -X POST -d '{"type":"BARCODE_SCANNED"}'  http://localhost:2000/redux/action

```
