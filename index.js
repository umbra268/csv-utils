import { csvFormat } from 'd3-dsv';

const contentType = "text/csv;charset=utf-8";
// <a href={smallCsvLink([{idx: 1}, {idx: 2}])} />
export function smallCsvLink(data) {
  var csv = csvFormat(data);
  return encodeURI(`data:${contentType},\uFEFF${csv}`)
}

function csvToBlob(data) {
  var csv = csvFormat(data);
  return new Blob(["\uFEFF", csv], {type: contentType});
}

// <a href={largeCsvLink([{idx: 1}, {idx: 2}])} download />
// <a href={largeCsvLink([{idx: 1}, {idx: 2}])} download='filename.csv' />
export function largeCsvLink(data) {
  return URL.createObjectURL(csvToBlob(data));
}

// <button onClick={() => {
//   downloadCsv(data, filename);
// }} />
export function downloadCsv(data, filename) {
  saveAs(csvToBlob(data), filename); // depending on browser you'll need to polyfill this (https://github.com/eligrey/FileSaver.js/)
}
