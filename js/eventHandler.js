let sepSlider = document.querySelector('#separation');
let alSlider = document.querySelector('#alignment');
let cohSlider = document.querySelector('#cohesion');
let visSlider = document.querySelector('#vision');
let fovSlider = document.querySelector('#FOV');
let quadSlider = document.querySelector('#quad');
let spdSlider = document.querySelector('#speed');
let presSlider = document.querySelector('#precision');

let addBtn = document.querySelector("#spawn");
let remBtn = document.querySelector("#despawn");

quadHlToggle = document.querySelector("#quadHlToggle");
singleHlToggle = document.querySelector("#singleHlToggle");
shapeBtn = document.querySelector("#shapeBtn");




sepSlider.addEventListener('input', () => {
	for (var i = 0; i < flock.length; i++) {
		flock[i].sepFac = sepSlider.value / 50;
	}
});
alSlider.addEventListener('input', () => {
	for (var i = 0; i < flock.length; i++) {
		flock[i].alFac = alSlider.value / 50;
	}
});
cohSlider.addEventListener('input', () => {
	for (var i = 0; i < flock.length; i++) {
		flock[i].cohFac = cohSlider.value / 50;
	}
});
visSlider.addEventListener('input', () => {
	for (var i = 0; i < flock.length; i++) {
		flock[i].desiredNeighbors = Math.floor(visSlider.value);
	}
});
fovSlider.addEventListener('input', () => {
	for (var i = 0; i < flock.length; i++) {
		flock[i].FOV = fovSlider.value * Math.PI / 180;
	}
});
spdSlider.addEventListener('input', () => {
	for (var i = 0; i < flock.length; i++) {
		flock[i].maxspeed = Math.floor(spdSlider.value/10);
	}
});
presSlider.addEventListener('input', () => {
	for (var i = 0; i < flock.length; i++) {
		pres = Math.floor(presSlider.value);
	}
});
quadSlider.addEventListener('input', () => {
	// for (var i = 0; i < flock.length; i++) {
	// 	flock[i].freewillFac = Math.floor(quadSlider.value);
	// }
	quadCap = quadSlider.value
});
singleHlToggle.addEventListener('click', () => {
	if (flock[0].hl) {
		flock[0].hl = false;
	} else {
		flock[0].hl = true;
	}
});
quadHlToggle.addEventListener('click', () => {
	if (quadHl) {
		quadHl = false;
	} else {
		quadHl = true;
	}
});

shapeBtn.addEventListener('click', () => {
	if (shape) {
		shape = false;
	} else {
		shape = true;
	}
});

addBtn.addEventListener('click', () => {
	addBoids();
})
remBtn.addEventListener('click', () => {
	remBoids();
})

canvas.addEventListener('mousedown', (event) => {
	intX = event.clientX;
	intY = event.clientY;
    interest += 100;
    intFac = 5;

});
canvas.addEventListener('mousemove', (event) => {
	intX = event.clientX;
	intY = event.clientY;
});
canvas.addEventListener('mouseup', (event) => {
    intFac = -4;
});

canvas.addEventListener('touchstart', process_touchstart, false);
canvas.addEventListener('touchmove', process_touchmove, false);
canvas.addEventListener('touchend', process_touchend, false);

function process_touchstart(event) {
	event.preventDefault();
	intX = event.touches[0].clientX;
	intY = event.touches[0].clientY;
	interest = 100;
	intFac = 5;
}
// touchmove handler
function process_touchmove(event) {
	event.preventDefault();
	if(interest >= 1) {
		intX = event.touches[0].clientX;
		intY = event.touches[0].clientY;
	}
}
function process_touchend(event) {
	event.preventDefault();
	intFac = -4;
}