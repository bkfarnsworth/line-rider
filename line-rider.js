
function getLineSegementsForParabola(a, b, c, xIncrementor, bbox) {

	const polaritySwitch = -1;//had to switch because game coords are backwards
	const {left, right, top, bottom} = bbox;
	const canvasWidth = right - left;
	const canvasHeight = bottom - top;
	const canvasCenter = {x: left + (canvasWidth/2), y: top + (canvasHeight/2) };
	const xIncrement = canvasWidth * xIncrementor;
	c = c || canvasCenter.y;
	const getY = x => (a * Math.pow(x, 2)) + (b * x) + c;

	let allPoints = [];
	let x = canvasCenter.x;
	let y;
	while(y > (top * polaritySwitch) || y === undefined) {
		y = getY(x) * polaritySwitch
		allPoints.push({x, y})
		x += xIncrement;
	}

	// since the center point isn't at 0, go the other way now
	y = undefined
	x = canvasCenter.x - xIncrement;
	while(y > (top * polaritySwitch) || y === undefined) {
		y = getY(x) * polaritySwitch
		allPoints.unshift({x, y})
		x -= xIncrement;
	}

	let segments = [];
	let startId = 1;
	allPoints.forEach((point, i) => {

		//don't draw a line leaving from the last point;
		if(i === allPoints.length - 1) {return}

		segments.push({
			"id": startId + i,
			"type": 0,
			"x1": point.x,
			"y1": point.y,
			"x2": allPoints[i + 1].x,
			"y2": allPoints[i + 1].y,
			"flipped":true,
			"leftExtended":false,
			"rightExtended":false
		})
	})

	return segments;

}


//act like the center point is 0,0
let segments = getLineSegementsForParabola(0.0001, 0, null, 1/30, {
	left: -350,
	right: 4481, 
	top: 825, //switched
	bottom: -2312
});



// console.log(segments);
console.log(JSON.stringify(segments, null, '\t'))
console.log(JSON.stringify(segments))

