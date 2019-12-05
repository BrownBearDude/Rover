newTask("namespace", function(localStorage){
	return {
		"task": "Get to the other side of the map.",
		"passed": entities.filter(function(e){return e.name == "rover" && e.inherits["Rover"]})[0].x == 8,
	};
});