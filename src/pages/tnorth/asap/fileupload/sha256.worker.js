console.log('sha256 initialized');

async function sha256(message) {
      const msgBuffer = new TextEncoder('utf-8').encode(message);                     // encode as UTF-8
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);            // hash the message
      const hashArray = Array.from(new Uint8Array(hashBuffer));                       // convert ArrayBuffer to Array
      const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join(''); // convert bytes to hex string
      return hashHex;
}

/*
sha256('abc').then(hash => console.log(hash));

(async function() {
      const hash = await sha256('abc');
}());
*/

function readAsArrayBuffer(file) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadstart = e => {
      postMessage({
        type: e.type,
        'file.name': file.name,
        loaded: e.loaded,
        total: e.total,
      });
    };
    /*
     reader.onprogress = e => {
      postMessage({
        type: e.type,
        'file.name': file.name,
        loaded: e.loaded,
        total: e.total,
      });
    };
    */
    reader.onabort = e => {
      postMessage({
        type: e.type,
        'file.name': file.name,
      });
    };
    reader.onerror = e => {
      reject(e.target.error);
      postMessage({
        type: e.type,
        'file.name': file.name,
        error: e.error.toString(),
      });
    };
    reader.onload = e => {
      resolve(e.target.result);
      postMessage({
        type: e.type,
        'file.name': file.name,
      });
    };
    reader.onloadend = e => {
      postMessage({
        type: e.type,
        'file.name': file.name,
        loaded: e.loaded,
        total: e.total,
      });
    };

    reader.readAsArrayBuffer(file);
  }).catch(e => {
    console.log(`FOOBAR abort ${file.name} reader`);
    reader.abort();
    // throw e;
  });
}

const hashCache = {};
async function hashFiles(files) {
  const hash = {};

  for (let key in files) {
    if (key in hashCache) {
      hash[key] = hashCache[key]
      continue;
    }

    const file = files[key];
    const fileBuffer = await readAsArrayBuffer(file);
    const hashBuffer = await crypto.subtle.digest('SHA-256', fileBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const digest = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');

    hashCache[key] = digest;

    postMessage({
      type: 'digest',
      name: key,
      digest: digest,
    });
  }

  return hash;
}

onmessage = (e) => {
  hashFiles(e.data);
}
