export const downloadObjectAsJson = (object, fileName) => {
  const a = document.createElement("a");
  const objectJson = JSON.stringify(object);
  const blob = new Blob([objectJson], {
    type: 'application/json',
  });
  const url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = fileName
  a.style = "display: none";
  document.body.appendChild(a);

  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
};
