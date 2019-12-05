newTask("namespace", function (localStorage) {
    function average_of_group(group){
		var avg = 0;
		for(var i = 0; i < group.length; i++){
			var rand = random();
			avg += rand;
			group[i].tile.visible_properties.iron_content = rand;
			update_tile(group[i]);
		}
		return avg / group.length;
	}
	if (!localStorage.init) {
		var group1avg = average_of_group(get_tiles_from_tag("rock0"));
		var group2avg = average_of_group(get_tiles_from_tag("rock1"));
		localStorage.avg = group1avg > group2avg ? group1avg : group2avg;
        localStorage.init = true;
    }
	log(sent_data);
	return {
        "task": "For each corner, average the iron content of each rock and send the larger value between the two corners",
        "passed": sent_data === localStorage.avg
	};
});