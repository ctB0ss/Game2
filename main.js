


var canvas = initCanvas();

var backgroundImageUrl = 'http://img.photobucket.com/albums/v602/ZachsterPoke/Sprite%20Sheets/WaterforTowns.png';

canvas.rect(0, 0, 640, 480);
canvas.fillStyle = "black";
canvas.fill();

var resources = loadResources({
  backgroundImage: backgroundImageUrl,
  playerShip: 'http://ferisrv5.uni-mb.si/~md8786/SpaceShipGame/enemyRed.png',
}, startGame);

window.onkeydown = function (eventData) {
  if (eventData.keyCode == code['Left']) {
    moveShipLeft();
  }
  if (eventData.keyCode == code['Right']) {
    moveShipRight();
  }
}

var shipX = 40,
    shipY = 45;


function moveShipLeft() {
  shipX = shipX - 5;
}

function moveShipRight() {
  shipX = shipX + 5;
}


function startGame() {
  canvas.drawImage(resources.backgroundImage, 0, 0);
  canvas.drawImage(resources.backgroundImage, 0, resources.backgroundImage.height);
  canvas.drawImage(resources.backgroundImage, resources.backgroundImage.width, 0);
  canvas.drawImage(resources.backgroundImage, resources.backgroundImage.width, resources.backgroundImage.height);

  canvas.drawImage(resources.playerShip, shipX, shipY);

  requestAnimationFrame(function future() {
    startGame();
  });
}


function initCanvas() {
  var canvas = document.getElementById('game');
  canvas.width = 640;
  canvas.height = 480;
  return canvas.getContext("2d");
}

function loadResources(resources, future) {
  var loadedResources = {};
  var numberOfResources = Object.keys(resources).length;
  var loadedResourcesCounter = 0;

  for (var resource in resources) {
    loadedResources[resource] = loadResource(resources[resource], function () {
      loadedResourcesCounter += 1;
      if (loadedResourcesCounter == numberOfResources) {
        future();
      }
    });
  }

  return loadedResources;
}

function loadResource(imageAddress, future) {
  var image = new Image();
  image.onload = function () {
    future();
  };
  image.src = imageAddress;
  return image;
}
