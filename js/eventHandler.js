let sepSlider = document.querySelector('#separation');
let alSlider = document.querySelector('#alignment');
let cohSlider = document.querySelector('#cohesion');
let visSlider = document.querySelector('#vision');
let freeSlider = document.querySelector('#free');
let spdSlider = document.querySelector('#speed');
let presSlider = document.querySelector('#precision');

let addBtn = document.querySelector("#spawn");
let remBtn = document.querySelector("#despawn");


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

addBtn.addEventListener('click', () => {
	addBoids();
})
remBtn.addEventListener('click', () => {
	remBoids();
})

canvas.addEventListener('mousedown', (event) => {
    interest = 100;
    intFac = 5;
});
canvas.addEventListener('mousemove', (event) => {
    if(interest >= 1) {
		intX = event.clientX;
		intY = event.clientY;

// 	console.log("Coordinate intX: " + intX, 
// 	            "Coordinate intY: " + intY,
// 	            "int: " +  interest);
	}
});
canvas.addEventListener('mouseup', (event) => {
    intFac = -4;
});

// canvas.addEventListener('touchstart', (event) => {
//     interest = 100;
//     intFac = 5;
// });
// canvas.addEventListener('touchmove', (event) => {
//     if(interest >= 1) {
// 		let rect = canvas.getBoundingClientRect();
// 	intX = event.clientX - rect.left;
// 	intY = event.clientY - rect.top;

// // 	console.log("Coordinate intX: " + intX, 
// // 	            "Coordinate intY: " + intY,
// // 	            "int: " +  interest);
// 	}
// });
// canvas.addEventListener('touchend', (event) => {
//     intFac = -4;
// });
canvas.addEventListener('touchstart', process_touchstart, false);
canvas.addEventListener('touchmove', process_touchmove, false);
canvas.addEventListener('touchend', process_touchend, false);

function process_touchstart(event) {
	// Set call preventDefault()
	event.preventDefault();
	intX = event.touches[0].clientX;
	intY = event.touches[0].clientY;
	interest = 100;
	intFac = 5;
}
// touchmove handler
function process_touchmove(event) {
	// Set call preventDefault()
	event.preventDefault();
	if(interest >= 1) {
		intX = event.touches[0].clientX;
		intY = event.touches[0].clientY;
	}
}
function process_touchend(event) {
	// Set call preventDefault()
	event.preventDefault();
	intFac = -4;
}