const sheetId = '1TLE-bldBZfzbd7LqR1Vl-RFh10J2f-OMsfNsVcf0tFc';

export const apiRoot = `https://rocky-bayou-56650.herokuapp.com/data/${sheetId}`;
export const indexURL = `https://rocky-bayou-56650.herokuapp.com/data/${sheetId}.json`;
export const getItemsURL = (worksheet) => 
  `https://rocky-bayou-56650.herokuapp.com/data/${sheetId}/${worksheet}.json`;