const circles = document.querySelectorAll('.circle');
const dropZones = document.querySelectorAll('.drop-zone');

circles.forEach(circle => {
  circle.addEventListener('dragstart', dragStart);
});

dropZones.forEach(zone => {
  zone.addEventListener('dragover', dragOver);
  zone.addEventListener('drop', drop);
});

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  const draggedElement = document.getElementById(data);
  if (e.target.id === 'audio-drop-zone') {
    // Play audio if dropped in audio drop zone
    const audio = draggedElement.querySelector('audio');
    if (audio) {
      audio.play();
    }
  }
  e.target.appendChild(draggedElement);
}


const circle1 = document.getElementById('circle1');
  const circle2 = document.getElementById('circle2');
  const circle3 = document.getElementById('circle3');
  const audio1 = document.getElementById('audio1');
  const audio2 = document.getElementById('audio2');
  const audio3 = document.getElementById('audio3');

  circle1.addEventListener('dragstart', function() {
    audio1.currentTime = 0;
    audio1.play();
  });

  circle2.addEventListener('dragstart', function() {
    audio2.currentTime = 0;
    audio2.play();
  });

  circle3.addEventListener('dragstart', function() {
    audio3.currentTime = 0;
    audio3.play();
  });

  function handleDrop(event) {
    event.preventDefault();
    const circleId = event.dataTransfer.getData("text/plain");
    const circle = document.getElementById(circleId);
    if (circle.id === 'circle1') {
      audio1.pause();
    } else if (circle.id === 'circle2') {
      audio2.pause();
    } else if (circle.id === 'circle3') {
      audio3.pause();
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }