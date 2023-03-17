let theHeading = document.querySelector("#headLine h1"),
    theMonk = document.querySelector(".monk"),
    puzzlePieces = document.querySelectorAll(".Audio-circles img"),
    dropZones = document.querySelectorAll('.drop-zone'),
    draggedPiece;

function handleStartDrag() { 
    console.log('started dragging this piece:', this);
    draggedPiece = this;
}

function handleDragOver(e) { 
    e.preventDefault();
    console.log('dragged over me'); 
}

function handleDrop(e) { 
    e.preventDefault();
    // Only allow one piece to be dropped in a zone at a time
    if (this.children.length > 0) {
        console.log("Already a piece here");
        return;
    }
    this.appendChild(draggedPiece);

    // Play audio associated with the dropped puzzle piece
    const audioURL = draggedPiece.getAttribute('data-audio');
    if (audioURL) {
        const audio = new Audio(audioURL);
        audio.play();
    }

    // Hide puzzle piece
    draggedPiece.style.display = 'none';
}

function newPuzzle() {
    // Remove all children from the drop zones and move them back to the puzzle piece section
    dropZones.forEach(zone => {
        while (zone.children.length > 0) {
            theMonk.appendChild(zone.children[0]);
        }
    });

    // Reset the background image
    const selectedButton = document.querySelector('.selected');
    if (selectedButton) {
        theMonk.style.backgroundImage = `url(images/backGround${selectedButton.id}.jpg)`;
    }

    const puzzlePieceContainer = document.querySelector('.Audio-circles');
    puzzlePieceContainer.innerHTML = '';
    puzzlePieces.forEach(piece => {
        puzzlePieceContainer.appendChild(piece);
    });

    // Shuffle the puzzle pieces
    shuffle(puzzlePieces);
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

const theButtons = document.querySelectorAll("#buttonHolder img");
theButtons.forEach(button => button.addEventListener("click", function() {
    theMonk.style.backgroundImage = `url(images/backGround${this.id}.jpg)`;
}));

puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));
dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));
dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));

const buttonHolder = document.querySelector('#buttonHolder');
buttonHolder.addEventListener('click', newPuzzle);