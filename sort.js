import Datastore from "nedb";
import fs from "fs";

const filename = process.argv[2];
if (!fs.existsSync(filename)) {
	console.log("File not found");
	process.exit(1);
}

const db = new Datastore({ filename, autoload: true });
db.find({})
	.sort({ _id: 1 })
	.exec((_err, docs) => {
		fs.writeFileSync(filename, docs.map(o => JSON.stringify(o, Object.keys(o).sort())).join("\n"));
		console.log("Done");
	});
