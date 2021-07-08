var boxes =  [];
var options = ["Cats", "Thermal Paste", "Green Battery Charger Light", "Apple \"Genius\"", "SEK or DKK", "MacBook Air", "Jumper Wire", "PPBUS or PP3V42", "Shorted path or Component", "Q-Tip", "Flux", "Bad Solder joints", "Don't delay!, Buy today!", "Fanspin", "Heat Gun", "Boot Loop", "FlexBV", "Board Corrosion or Rust", "Liquid Damage", "De-Soldering Braid", "MacBook Pro", "Bad Resistor or Capacitor", "Thermal Camera", "Apple System Diagnostic", "G3HOT", "magtrometer"];
var bingo = 0;
var bingoCalled = 0;

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
for (let i = 0; i < 25; i++) {
  boxes[i] = 0;
  if (i==13-1) {
    boxes[i] = 1;
    continue; // ignore free space
  }
  let b = getBox(i);
  b.innerHTML = get();
  b.onclick = () => boxClick(b, i);
}
