class Level_builder{
	constructor(){
		this.level = {
			tests: [],
			tex: {},
			sfx: {},
			meta: {
				title: "",
				desc: ""
			}
		};
	}
	set_title(title){
		this.level.meta.title = title;
		return this;
	}
	set_desc(desc){
		this.level.meta.desc = desc;
		return this;
	}
	add_test(test){
		this.level.tests.push(test);
		return this;
	}
	add_sfx(name, source){
		this.level.sfx[name] = source;
		return this;
	}
	add_tex(name, source){
		this.level.tex[name] = source;
		return this;
	}
	do_func(func){
		func(this);
		return this;
	}
	finish(){
		return this.level;
	}
}
class Test_builder{
	constructor(){
		this.test = {
			entities: [],
			terrain: []
		};
	}
	set_size(width, height, in_tile){
		let generate = this._get_generator(in_tile);
		for(let x = 0;x < width;x++){
			let column = [];
			for(let y = 0;y < height;y++){
				column.push(generate());
			}
			this.test.terrain.push(column);
		}
		return this;
	}
	fill_tiles(x, y, width, height, in_tile){
		let generate = this._get_generator(in_tile);
		while(x <= width){
			let _y = y;
			while(_y <= height){
				this.set_tile(x, _y++, generate);
			}
			++x;
		}
		return this;
	}
	set_tile(x, y, in_tile){
		let generate = this._get_generator(in_tile);
		this.test.terrain[x][y] = generate();
	}
	add_entity(entity){
		this.test.entities.push(entity);
	}
	do_func(func){
		func(this);
		return this;
	}
	finish(){
		return this.test;
	}
	_get_generator(in_tile){
		switch(typeof in_tile){
			case "string":
				return () => ({ tex: in_tile });
				break;
			case "function":
				return in_tile;
			default:
				return () => in_tile;
		}
	}
}
module.exports = {Level_builder, Test_builder};
