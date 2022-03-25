const map = L.map ("map1");

const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";

L.tileLayer
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: attrib } ).addTo(map);
            
const pos = [50.718395,  -1.883377]
map.setView([50.908,-1.4], 14);

L.marker(pos).addTo(map)

map.on("click", async(e) => {
	//alert(`You clicked at: ${e.latlng.lat} ${e.latlng.lng}. Added a marker to the map.`);
	
	const pos2 = [e.latlng.lat, e.latlng.lng]
	
	const name = prompt('Please enter Artists name.');
	const town = prompt('Please enter Artists town.');
	
	const artist = {
		name: name,
		lat: e.latlng.lat,
		lon: e.latlng.lng,
		hometown: town
	};
	
	const response = await fetch('https://wadweek-dtbnq.run-eu-central1.goorm.io/songs/hometown/create', {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify(artist)
	});
	
	const response2 = await fetch(`https://wadweek-dtbnq.run-eu-central1.goorm.io/songs/hometown/${name}`);
	if(response.status == 404){
		alert("the artist was not found!");
	} else {
		const marker = L.marker(pos2).addTo(map)
		marker.bindPopup(town)
	}
	
});


function ajaxSearch(hometown){
	fetch(`https://wadweek-dtbnq.run-eu-central1.goorm.io/songs/hometown/${hometown}`)
		.then(response => response.json())
		.then(hometown => {
		
			
			const pos3 = [hometown.lat, hometown.lon]
			map.setView(pos3, 14);
			const artistMarker = L.marker(pos3).addTo(map)
			artistMarker.bindPopup(hometown.hometown)
			
		});
		
	
};


document.getElementById('ajaxButton2').addEventListener('click', () => {
	const hometown = document.getElementById('hometown').value;
	ajaxSearch(hometown);
});