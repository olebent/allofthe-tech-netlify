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

waveButton.addEventListener('click', newContainerColor);

function newContainerColor() {
  const boksen = document.getElementById("boksen");
  const boksto = document.getElementById("boksto");
  const bokstre = document.getElementById("bokstre");
  const containerColor = randomColor();
  boksen.style.backgroundColor = containerColor;
  //boksto.style.backgroundColor = containerColor;
  bokstre.style.backgroundColor = containerColor;
}


