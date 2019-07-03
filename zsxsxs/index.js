const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require('path');
const fs = require('fs');

function parse(html){
	let dom = new JSDOM(html);
	let scripts = dom.window.document.querySelectorAll("script[no-parcel]");
	scripts.forEach(s => {
		s.setAttribute("src", s.getAttribute("no-parcel"));
		s.removeAttribute("no-parcel");
	});
	return dom.serialize();
}

function recursive(startPath,filter){
    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    let files = fs.readdirSync(startPath);
    for(let i=0;i<files.length;i++){
        let filename=path.join(startPath,files[i]);
        let stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            recursive(filename,filter); //recurse
        }
        else if (filename.indexOf(filter) >= 0) {
			fs.readFile(".\\" + filename, function(err, buf) {
				if (err) { console.log(err) }
				fs.writeFile(".\\" + filename, parse(buf), (e) => {
					if (e) console.log(e);
					console.log("Successfully processed " + filename);
				});
			});
        };
    };
};
recursive(process.argv[2],'.html');