newTask("Do three laps around the map", function(local){
	local.init(function(){
		local.set("laps", 0);
		local.set("index", 0);
		local.set("target",[
			{x: 0, y: 9},
			{x: 9, y: 9},
			{x: 9, y: 0},
			{x: 0, y: 0}
		]);
	});
	local.get();
	var bot = entities.filter(function(e){return e.name=="rover"&&e.controllable})[0];
	log("TEST", bot);
	log("DATA", data)
	if(bot.x == data.targets[data.index].x && bot.y == data.targets[data.index].y){
		data.index++;
		if(data.index >= data.targets.length){
			data.index = 0;
			data.laps++;
		}
	}
	return data.laps >= 3;
});