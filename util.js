function random(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function swap(array, elem1, elem2){
  let elem1Index = array.indexOf(elem1);
  let elem2Index = array.indexOf(elem2);
  [array[elem1Index].x, array[elem2Index].x]  = [array[elem2Index].x, array[elem1Index].x];
  [array[elem1Index].y, array[elem2Index].y]  = [array[elem2Index].y, array[elem1Index].y];
  [array[elem1Index], array[elem2Index]]  = [array[elem2Index], array[elem1Index]];
}

function getMousePos(element, evt) {
  var rect = element.getBoundingClientRect();
  return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
}

function nepali(n){
  n = n + '';
  var nepaliDigits = {
    '0': '०',
    '1': '१',
    '2': '२',
    '3': '३',
    '4': '४',
    '5': '५',
    '6': '६',
    '7': '७',
    '8': '८',
    '9': '९'
  };
  let result = '';
  n.split('').forEach(n => result += nepaliDigits[n]);
  return result;
}