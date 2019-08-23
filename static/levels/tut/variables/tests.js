newTask("namespace", function(localStorage){
	return {
		"task": "Do three laps around the map (" + localStorage.laps + "/3)",
		"passed": false,
	};
});