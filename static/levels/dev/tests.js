newTask("Do three laps around the map", function(localStorage){
	log("localStorage", localStorage);
	log("globalStorage", globalStorage);
	if(localStorage.laps === undefined){
		localStorage.laps = 0;
		localStorage.index = 0;
		localStorage.targets = [
			{x: 0, y: 9},
			{x: 9, y: 9},
			{x: 9, y: 0},
			{x: 0, y: 0}
		];
		localStorage.debugCallAmount = 0;
	}
	
    var bot = entities.filter(function (e) { return e.name == "rover" && e.inherits["ControllableEntity"] })[0];
	if(bot.x == localStorage.targets[localStorage.index].x && bot.y == localStorage.targets[localStorage.index].y){
		localStorage.index++;
		if(localStorage.index >= localStorage.targets.length){
			localStorage.index = 0;
			localStorage.laps++;
		}
	}
	localStorage.debugCallAmount++;
	return localStorage.laps >= 3;
});