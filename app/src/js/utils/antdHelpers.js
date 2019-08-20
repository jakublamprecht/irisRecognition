// Helper for list of objects to allow displaying images
export const fileToObject = (file) => (
  Object.assign({}, file, {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    percent: 0,
    originFileObj: file
  })
);
