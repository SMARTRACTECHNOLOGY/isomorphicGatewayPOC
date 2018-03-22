const usbDetect = require('usb-detection');
const SerialPort = require('serialport');

const barcodeTypes = {
  '*': '1D_CODE39',
  A: '1D_UPCA',
  E: '1D_UPCE',
  F: '1D_EAN13',
  FF: '1D_EAN8',
  '#': '1D_CODE128',
  QR: '2D_QRCODE',
  Dm: '2D_DATAMATRIX',
  P: '2D_PDF417',
};


class BarcodeReader {
  constructor(store) {
    this.store = store;
  }

  run() {
    console.log('Running Barcode Reader!');
    this.checkToSeeIfBarcodeReaderIsAlreadyPluggedIn();
    this.initBarcodeReaderAutoDetection();
  }

  shutDown() {
    console.log('stop monitoring');
    usbDetect.stopMonitoring();
    console.log('SUCCESS!');
  }

  initBarcodeReaderAutoDetection() {
    usbDetect.startMonitoring();
    usbDetect.on('add', (device) => {
      if (device.deviceName) {
        if (device.deviceName.startsWith('Omni-Directional')) {
          let interval;
          interval = setInterval(() => {
            console.log('listing ports');
            SerialPort.list().then((ports) => {
              const barcodePorts = ports.filter(port => ((port.manufacturer) ? port.manufacturer.startsWith('Datalogic') : false));
              if (barcodePorts && barcodePorts.length > 0) {
                clearInterval(interval);
                return barcodePorts[0].comName;
              }
            })
              .then((comportName) => {
                if (comportName) this.activateBarcodeReader(comportName);
              })
              .catch(e => console.log('error', e));
          }, 2000);
        }
      }
      // Omni-Directional_Imaging_Scanner
    });
  }

  checkToSeeIfBarcodeReaderIsAlreadyPluggedIn() {
    SerialPort.list().then((ports) => {
      const barcodePorts = ports.filter((port) => {
        console.log(port.manufacturer);
        return port.manufacturer === 'Datalogic ADC, Inc.';
      });
      if (barcodePorts && barcodePorts.length > 0) {
        return barcodePorts[0].comName;
      }
    })
      .then((comportName) => {
        if (comportName) this.activateBarcodeReader(comportName);
      })
      .catch(e => console.log(e));
  }


  activateBarcodeReader(comportName) {
    console.log('activating barcode reader!!!!');
    const port = new SerialPort(comportName);
    port.on('open', () => {
      console.log('Port Opened');
    });

    port.on('close', () => {
      console.log('Port Closed');
    });

    port.on('data', (code) => {
      const data = code.toString();

      console.log(`BEGIN${data}END`);
      if (data.includes('nfc')) {
        console.log('Sending to NFC!!!!');
        this.store.dispatch({ type: 'NFC_SCANNED' });
      } else {
        let prefix;
        if (data.startsWith('*')) {
          prefix = '*';
        } else if (data.startsWith('A')) {
          prefix = 'A';
        } else if (data.startsWith('E')) {
          prefix = 'E';
        } else if (data.startsWith('F')) {
          prefix = 'F';
        } else if (data.startsWith('FF')) {
          prefix = 'FF';
        } else if (data.startsWith('#')) {
          prefix = '#';
        } else if (data.startsWith('QR')) {
          prefix = 'QR';
        } else if (data.startsWith('Dm')) {
          prefix = 'Dm';
        } else if (data.startsWith('P')) {
          prefix = 'P';
        } else {
          console.log('undetectable barcode');
        }

        if (prefix) {
          if (barcodeTypes[prefix].startsWith('1D_')) {
            this.store.dispatch({ type: 'BARCODE_SCANNED' });
          } else if (barcodeTypes[prefix].startsWith('2D_')) {
            this.store.dispatch({ type: 'QR_SCANNED' });
          }
        }
      }
    });
  }
}

export default BarcodeReader;
