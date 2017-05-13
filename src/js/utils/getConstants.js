export function getDialogApiUrl() {
  const hostname = window.location.hostname;
  // const sApiUrlBase = `http://${hostname}:8080/api/datalogs/`;
  const sApiUrlBase = `http://${hostname}:50993/api/datalogs/`;
  // const sApiUrlBase = `http://192.168.147.34:8080/api/datalogs/`; 
  return sApiUrlBase; 
}