let sepSlider = document.querySelector('#separation');
let alSlider = document.querySelector('#alignment');
let cohSlider = document.querySelector('#cohesion');
let visSlider = document.querySelector('#vision');
let freeSlider = document.querySelector('#free');
let spdSlider = document.querySelector('#speed');
let presSlider = document.querySelector('#precision');


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
		flock[i].senseRadius = Math.floor(visSlider.value);
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
freeSlider.addEventListener('input', () => {
	for (var i = 0; i < flock.length; i++) {
		flock[i].freewill = Math.floor(freeSlider.value);
	}
});
hlToggle.addEventListener('click', () => {
	if (flock[0].hl) {
		flock[0].hl = false;
	} else {
		flock[0].hl = true;
	}
});

canvas.addEventListener('mousedown', (event) => {
    interest = 100;
    intFac = 5;
});
canvas.addEventListener('mousemove', (event) => {
    if(interest >= 1) {
		let rect = canvas.getBoundingClientRect();
	intX = event.clientX - rect.left;
	intY = event.clientY - rect.top;

	console.log("Coordinate intX: " + intX, 
	            "Coordinate intY: " + intY,
	            "int: " +  interest);
	}
});
canvas.addEventListener('mouseup', (event) => {
    intFac = -4;
});
