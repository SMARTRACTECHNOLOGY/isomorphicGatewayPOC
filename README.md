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

