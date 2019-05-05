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