function ajaxSearch(artist) {
    fetch(`https://wadweek-dtbnq.run-eu-central1.goorm.io/songs/artist/${artist}`)
        .then(response => response.json())
        .then(artists => {
			// loop through the array of json objects and add the results to a div
			let html = `<table> 
					<tr>
						<th>Title</th>
						<th>Artist</th>
						<th>Day</th>
						<th>Month</th>
						<th>Year</th>
						<th>Chart</th>
						<th>Likes</th>
						<th>Downloads</th>
						<th>Review</th>
						<th>Quantity</th>
						<th></th>
					</tr>`;
		document.getElementById('results').innerHTML=""
		
		
			artists.forEach ( song => {
				var div = document.createElement('div');
				div.setAttribute('id', song.ID);
				
				var txt = '';

				if (song.year < 2000) {
					txt += 'CLASSIC HIT!! ';
				}
				
				txt += `${song.title} - ${song.artist} - ${song.day} - ${song.month} - ${song.year} - ${song.quantity}`;
				
				var p = document.createElement('p');
				p.innerText = txt;
				
				var buyBtn = document.createElement('input');
				buyBtn.setAttribute('type', 'button');
				buyBtn.setAttribute('value', 'Buy this song');
				
				buyBtn.addEventListener('click', buySong.bind(this, song.ID));
				
				div.appendChild(p);
				div.appendChild(buyBtn);
				
				document.getElementById('results').appendChild(div);
				
				// html += `
				// 	<tr>
				// 		<td>${song.title}</td>
				// 		<td>${song.artist}</td>
				// 		<td>${song.day}</td>
				// 		<td>${song.month}</td>
				// 		<td>${song.year}</td>
				// 		<td>${song.chart}</td>
				// 		<td>${song.likes}</td>
				// 		<td>${song.downloads}</td>
				// 		<td>${song.review}</td>
				// 		<td>${song.quantity}</td>`;
				// if (song.year < 2000) {
				// 	html += `<td>CLASSIC HIT!</td></tr>`;
				// } else {
				// 	html += `<td></td></tr>`;
				// }
				
				// document.getElementById('results').innerHTML = html;
			});
        });
}

function buySong(songID) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', `https://wadweek-dtbnq.run-eu-central1.goorm.io/songs/buy/${songID}`);
	
	xhr.onload = function() {
		if (xhr.status === 200) {
			alert('Song Bought');
		}else if(xhr.status === 401){
			alert('Error. user is not logged in.');
		} else {
			alert('Error, something went wrong!');
		}
	}
	
	xhr.send();
}

// Make the AJAX run when we click a button
document.getElementById('ajaxButton').addEventListener('click', () => {
    // Read the artist from a text field
    const artist = document.getElementById('Artist').value;
    ajaxSearch(artist);
});

document.getElementById('ajaxButton3').addEventListener('click', () => {
	const username = document.getElementById("Username").value;
	const password = document.getElementById("Password").value;
	login(username, password);
});



function login(username, password){
	const user = {
		username: username,
		password: password
	};
	
	const response = fetch('https://wadweek-dtbnq.run-eu-central1.goorm.io/login', {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify(user)
		
	}).then(response => {
		if (response.status == 401){
			document.getElementById('login2').innerHTML = "Wrong Login details";
		}else{
			console.log("Login Complete! response:", response);
			document.getElementById('login2').innerHTML = `
			Logged in! <input type='button' value='Logout' id='logoutBtn' />`;
			
			document.getElementById('logoutBtn').addEventListener('click', () => {
				const logoutResponse = fetch('https://wadweek-dtbnq.run-eu-central1.goorm.io/logout', {
					method: 'POST'
				}).then(logoutResponse => {
					if (logoutResponse.status == 200){
						console.log("logout complete.")
						document.getElementById('login2').innerHTML = `logout successful.`
					}else{
						alert('Error! Something went wrong.')
					}
				})
	
			});
			
		}
		
	});
	

	
}