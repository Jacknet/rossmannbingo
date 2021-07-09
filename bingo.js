var boxes =  [];
var options = []; // Data will be retrieved from JSON
var bingo = 0;
var bingoCalled = 0;

// Function that will load the JSON file
function loadData(callback) {
  // New XHR to submit
  var xobj = new XMLHttpRequest();

  // Set mime type override to JSON
  xobj.overrideMimeType("application/json");

  // Set on ready state change
  xobj.onreadystatechange = function() {
      // If status is okay
      if (xobj.readyState == 4 && xobj.status == "200") {
          // Call back with response data
          callback(xobj.responseText);
      }
  };

  // Get JSON file
  xobj.open('GET', 'bingo.json', true);

  // Keep CORS relaxed
  xobj.setRequestHeader("Access-Control-Allow-Origin","*");

  // Send the request
  xobj.send(null);
};

function getBox(num) {
  //num++;
  return document.getElementById("box " + ++num);
}
function checkBingo() {
  // check rows
  for (let i = 0; i < 25; i += 5) {
    if (boxes[i] && boxes[i+1] && boxes[i+2] && boxes[i+3] && boxes[i+4]) {
      // bingo
      bingo = 1;
      // change boxes
      for (let n = 0; n < 5; n++) getBox(i+n).className = "bingoBox";
    }
  }
  // check columns
  for (let i = 0; i < 5; i++) {
    if (boxes[i] && boxes[i+5] && boxes[i+10] && boxes[i+15] && boxes[i+20]) {
      //bingo
      bingo = 1;
      // change boxes
      for (let n = 0; n < 21; n += 5) getBox(i+n).className = "bingoBox";
    }
  }
  // check diagonals
  // /
  if (boxes[20] && boxes[16] && boxes[8] && boxes[4]) {
      //bingo
      bingo = 1;
      // change boxes
      for (let n = 4; n < 21; n += 4) getBox(n).className = "bingoBox";
  }
  // \
  if (boxes[0] && boxes[6] && boxes[18] && boxes[24]) {
      //bingo
      bingo = 1;
      // change boxes
      for (let n = 0; n < 25; n += 6) getBox(n).className = "bingoBox";
  }

  // check if bingo was called
  if (bingo && !bingoCalled) {
    bingoCalled = 1;
    alert("Bingo!!!");
  }
}
function boxClick(box, num) {
  box.className = "boxClicked";
  boxes[num] = 1;
  checkBingo();
}
function get() { // helper funcion
  let number = Math.floor(Math.random() * options.length)
  let out = options[number];
  delete options[number];
  options = options.filter((e) => {return e != null;});
  return out;
}
function getCardUrl() {
  // add this later maybe
}

// Retrieve the JSON data
loadData(function(response) {
  // Parse JSON string into an object
  var bingoData = JSON.parse(response);

  // If puzzle list returned, run actions
  if (bingoData) {
    // Store bingo data
    options = bingoData.options;

    // Remove loading message from free box
    document.getElementsByClassName("freeBox")[0].innerText = "Free Space";

    // Run bingo code
    for (let i = 0; i < 25; i++) {
      boxes[i] = 0;
      if (i==13-1) {
        boxes[i] = 1;
        continue; // ignore free space
      }
      let b = getBox(i);
      b.innerHTML = get(); // Pass data to helpter
      b.onclick = () => boxClick(b, i);
    }
  }
});
