const
	lineup = document.querySelector('.lineUp'),
	dropbox = document.querySelector('.drop-box'),
	dropZones = document.querySelectorAll('.drop-zone'),
	dragZones = document.querySelectorAll('.drag-zone');
	playPauseButton = document.querySelector('.play-pause-button');
let
	resetButton = document.querySelector('.reset'),
	draggableChars = document.querySelectorAll('.drop-image');

	draggableChars.forEach(piece => {
		piece.addEventListener("dragstart", function(e) {
			e.dataTransfer.setData("text/plain", this.id);
		});
	});

	playPauseButton.addEventListener('click', function() {
		const audioFile = document.querySelector('#audio-file');
		
		// If the audio is playing, pause it and change the button to show "Play"
		if (!audioFile.paused) {
		  audioFile.pause();
		  playPauseButton.innerHTML = 'Play';
		}
		// If the audio is paused, play it and change the button to show "Pause"
		else {
		  audioFile.play();
		  playPauseButton.innerHTML = 'Pause';
		}
	  });

  dropZones.forEach(zone =>{
      zone.addEventListener("dragover", function(e) {
          e.preventDefault();
      	});
      zone.addEventListener("drop", function(e) {
          e.preventDefault();

          let draggedElement = e.dataTransfer.getData("text/plain");
          console.log(draggedElement);
        	if (zone.childElementCount == 0 ) {
//set audio
	newAudio = document.createElement('audio');
	newAudio.loop = 'true';
	newAudio.src = (`audio/${draggedElement}.mp3`);
	newAudio.setAttribute('id', 'audio-file');

	zone.classList.remove();
	zone.classList.add("drag-zone");

    e.target.appendChild(document.querySelector(`#${draggedElement}`));
	document.querySelector(`#${draggedElement}`).setAttribute("draggable", "false");

	zone.appendChild(newAudio);
	};

	let audioFile = document.querySelectorAll('#audio-file');
		audioFile.forEach(file =>{
		file.currentTime = 0;
	});

	newAudio.play();
    });
  });


  (() => {
	console.log('link successful')

	function reset(e) {
		dropZones.forEach(zone => {
			zone.classList.remove("drag-zone");
			zone.classList.add("drop-zone");

			if (zone.childElementCount !== 0 ){

				zone.removeChild(document.getElementById('audio-file'));

				piece = zone.firstElementChild;
	
				piece.setAttribute("draggable", "true");

				zoneId = (piece.getAttribute('id')+"zone");
				dZone = document.querySelector(`#${zoneId}`);

				dZone.appendChild(piece)};
			});
		};

	resetButton.addEventListener("click", reset);

})();
