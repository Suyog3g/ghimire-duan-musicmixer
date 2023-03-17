let theMonk = document.querySelector(".monk"),
    audioBox = document.querySelectorAll(".Audio-circles img"),
    dropZones = document.querySelectorAll('.drop-zone'),
    draggedBox;

function handleStartDrag() { 
    console.log('started dragging this box:', this);
    draggedBox = this;
}

function handleDragOver(e) { 
    e.preventDefault();
    console.log('dragged over me'); 
}

function handleDrop(e) { 
    e.preventDefault();
   
    if (this.children.length > 0) {
        console.log("Already a box here");
        return;
    }
    this.appendChild(draggedBox);

    
    const audioURL = draggedBox.getAttribute('data-audio');
    if (audioURL) {
        const audio = new Audio(audioURL);
        audio.play();
    }

    draggedBox.style.display = 'none';
}


function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

audioBox.forEach(box => box.addEventListener("dragstart", handleStartDrag));
dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));
dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));

