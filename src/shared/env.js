let isServer, isClient = false;

function isNodeEnvironment() {
  return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
}

isServer = isNodeEnvironment();
isClient = !isServer;

console.log("isClient: " + isClient);

export { isServer, isClient }

