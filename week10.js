const express = require('express');
const app = express();

const fs = require('fs');

async function readWholeFile() {
	try{
		const wholeFile = await fs.readFile('restaurants.csv', (err, data) => {
			//console.log(data.toString());
			const wholeFileText = data.toString();
			const fileLines = wholeFileText.split("\n");
			for(let i in fileLines){
				const fileCommas = fileLines[i].split(",");
				const [name, address, town, cuisine, latitude, longitude] = fileCommas;
				console.log(`Name: ${name}
Address: ${address}
Town: ${town}
Cuisine: ${cuisine}
Latitude: ${latitude}
Longitude: ${longitude}
--------`)
			}
			
		
        }
 	)
	}catch(err) {
  		console.log(err);
	}
}

readWholeFile();

app.get('*', (req,res) => {
	console.log("working");
});

app.listen(3000)