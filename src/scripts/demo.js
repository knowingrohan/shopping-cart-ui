function getMax(arr) {
  var myFinalOutPut = -1;

  for (var i = 0; i < arr.length; i++) {
    if (myFinalOutPut < arr[i]) {
      myFinalOutPut = arr[i];
    }
  }

return myFinalOutPut;
}

getMax([
1,
2,
3
]);
