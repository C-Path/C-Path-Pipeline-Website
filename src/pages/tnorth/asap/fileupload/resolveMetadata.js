// import { fingerprint } from 'tus-js-client';
function fingerprint(file) {
  return ['tus', file.name, file.type, file.size, file.lastModified].join('-');
}

function requestUploadUrl(endpoint, file, metadata) {
  const url = localStorage.getItem(fingerprint(file));
  if (url) {
    return Promise.resolve(url);
  }

  // The following xhr is largely copied from tus-js-client _createUpload().
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint, true);
    xhr.onload = () => {
      // The Server MUST acknowledge a successful upload creation with the 201
      // Created status. The Server MUST set the Location header to the URL of
      // the created resource. This URL MAY be absolute or relative.
      // https://tus.io/protocols/resumable-upload.html#creation
      if (xhr.status !== 201) {
        reject(
          new Error(
            `requestUploadUrl for ${file.name} want status 201 have ${
              xhr.status
            }`,
          ),
        );
        return;
      }

      const location = xhr.getResponseHeader('Location');
      if (!location) {
        reject(new Error('requestUploadUrl expected Location header'));
        return;
      }
      localStorage.setItem(fingerprint(file), location);

      resolve(location);
    };
    xhr.onerror = err => {
      reject(err);
    };

    xhr.setRequestHeader('Tus-Resumable', '1.0.0');
    xhr.setRequestHeader('Upload-Length', file.size);
    xhr.setRequestHeader(
      'Upload-Metadata',
      Object.entries(metadata)
        .map(kv => {
          const [key, value] = kv;
          return `${key} ${btoa(unescape(encodeURIComponent(value)))}`;
        })
        .join(','),
    );

    xhr.send(null);
  });
}

export default function resolveMetadata(endpoint, project, sampleName, r1, r2) {
  // TODO: validate input types
  // project and sampleName should be String
  // r1 and r2 should be File
  // if (typeof r1 !== typeof File) {
  //  throw new TypeError(`resolveMetadata r1 want File have ${typeof r1}`);
  // }
  if (!r1) {
    // TODO: revise error indicating this function only supports single or paired end fastq files.
    return Promise.reject(
      new Error('resolveMetadata expects either r1 or both r1 and r2'),
    );
  }

  const metadata = {};

  metadata.R1 = {
    filename: r1.name,
    size: r1.size,
    lastModified: r1.lastModified,
    type: r1.type,
    project,
    sampleName,
    r2ID: -1,
  };

  if (r1 && r2) {
    metadata.R2 = {
      filename: r2.name,
      size: r2.size,
      lastModified: r2.lastModified,
      type: r2.type,
      project,
      sampleName,
      r2ID: 0,
    };

    return requestUploadUrl(endpoint, r2, metadata.R2).then(location => {
      const id = location.slice(location.lastIndexOf('/') + 1);
      metadata.R1.r2ID = id;
      return metadata;
    });
  }
  return Promise.resolve(metadata);
}
