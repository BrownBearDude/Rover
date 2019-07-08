newTask("Do three laps around the map", function(data){
	if(!data.laps){
		data.laps = 0;
		data.index = 0;
		data.targets = [
			{x: 0, y: 9},
			{x: 9, y: 9},
			{x: 9, y: 0},
			{x: 0, y: 0}
		];
	}
	var botPos = entities.filter(function(e){return e.name=="rover"&&e.controllable})[0].pos;
	if(botPos.x == data.targets[data.index].x && botPos.y == data.targets[data.index].y){
		data.index++;
		if(data.index >= data.targets.length){
			data.index = 0;
			data.laps++;
		}
	}
	return data.laps >= 3;
});