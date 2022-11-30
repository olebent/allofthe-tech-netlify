const clapButton = document.getElementById('clap-button');

clapButton.addEventListener('click', switchBackground);

function randomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const color = `rgb(${red}, ${green}, ${blue})`
  return color;
}

function switchBackground() {
  const backgroundColor = randomColor();
  document.body.style.backgroundColor = backgroundColor;
}

//samme bare for vulcan wave

const waveButton = document.getElementById('wave-button');

clapButton.addEventListener('click', newTopBorderColor);

function newTopBorderColor() {
  const borderTopColor = randomColor();
  document.body.style.borderTopColor = borderTopColor;
}
