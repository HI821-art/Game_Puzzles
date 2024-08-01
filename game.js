var rows, columns;
var pieces = [];
var currTile;
var otherTile;
var turns = 0;
var selectedImageUrl = '';
var selectedImageId = '';
var difficulty = '';

const images = {
    easy: ['./Images/Easy/Images-1/', './Images/Easy/Images-2/', './Images/Easy/Images-3/'],
    normal: ['./Images/Normal/Images-1/', './Images/Normal/Images-2/', './Images/Normal/Images-3/'],
    hard: ['./Images/Hard/Images-1/', './Images/Hard/Images-2/', './Images/Hard/Images-3/']
};

function selectImage(selectedDifficulty) {
    difficulty = selectedDifficulty;
    document.getElementById('button-container').style.display = 'none';
    document.getElementById('image-selection').style.display = 'block';

    const carouselIndicators = document.getElementById('carousel-indicators');
    const carouselInner = document.getElementById('carousel-inner');
    carouselIndicators.innerHTML = '';
    carouselInner.innerHTML = '';

    images[difficulty].forEach((url, index) => {
        const indicator = document.createElement('li');
        indicator.setAttribute('data-target', '#carouselExampleIndicators');
        indicator.setAttribute('data-slide-to', index);
        if (index === 0) indicator.classList.add('active');
        carouselIndicators.appendChild(indicator);

        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) carouselItem.classList.add('active');

        const img = document.createElement('img');
        img.src = url + 'full.jpg'; // Display the full image
        img.classList.add('d-block', 'w-100');
        img.alt = `Image ${index + 1}`;

        // Додано запуск гри при натисканні на фото
        img.onclick = () => {
            selectedImageId = index + 1;
            selectedImageUrl = url;
            startGame();
        };

        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
    });
}

function startGame() {
    if (!selectedImageId) {
        alert('Please select an image!');
        return;
    }

    if (difficulty === 'easy') {
        rows = 3;
        columns = 3;
    } else if (difficulty === 'normal') {
        rows = 5;
        columns = 5;
    } else if (difficulty === 'hard') {
        rows = 8;
        columns = 8;
    }

    document.getElementById('image-selection').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';

    initializeBoard();
    shufflePieces();
    createPieces();
}

function goBack() {
    window.location.href = "game.html";
}

function reset() {
    initializeBoard();
    shufflePieces();
    createPieces();

    turns = 0;
    document.getElementById("turns").innerText = turns;
}

function initializeBoard() {
    clearBoard();
    const board = document.getElementById('board');
    const piecesContainer = document.getElementById('pieces');
    
    let boardWidth, boardHeight, piecesContainerWidth, piecesContainerHeight;
    
    if (difficulty === 'easy') {
        boardWidth = '249px';
        boardHeight = '245px';
        piecesContainerWidth = '409px';
        piecesContainerHeight = '165px';
    } else if (difficulty === 'normal') {
        boardWidth = '400px';
        boardHeight = '400px';
        piecesContainerWidth = '1040px';
        piecesContainerHeight = '160px';
    } else if (difficulty === 'hard') {
        boardWidth = '445px';
        boardHeight = '445px';
        piecesContainerWidth = '1040px';
        piecesContainerHeight = '140px';
    }
    
    board.style.width = boardWidth;
    board.style.height = boardHeight;
    piecesContainer.style.width = piecesContainerWidth;
    piecesContainer.style.height = piecesContainerHeight;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = selectedImageUrl + "blank2.jpg"; // default blank image

            if (difficulty === 'easy') {
                tile.style.width = '81px';
                tile.style.height = '81px';
            } else if (difficulty === 'normal') {
                tile.style.width = '79px';
                tile.style.height = '79px';
            } else if (difficulty === 'hard') {
                tile.style.width = '55px';
                tile.style.height = '55px';
            }

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            board.append(tile);
        }
    }
}

function shufflePieces() {
    pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString());
    }
    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }
}

function createPieces() {
    clearPieces();
    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = selectedImageUrl + pieces[i] + ".jpg";

        if (difficulty === 'easy') {
            tile.style.width = '81px';
            tile.style.height = '81px';
        } else if (difficulty === 'normal') {
            tile.style.width = '79px';
            tile.style.height = '79px';
        } else if (difficulty === 'hard') {
            tile.style.width = '45px';
            tile.style.height = '45px';
        }

        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        document.getElementById("pieces").append(tile);
    }
}

function clearBoard() {
    let board = document.getElementById("board");
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
}

function clearPieces() {
    let piecesContainer = document.getElementById("pieces");
    while (piecesContainer.firstChild) {
        piecesContainer.removeChild(piecesContainer.firstChild);
    }
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
    
    checkWin(); // Виклик функції перевірки виграшу
}

let winningConfiguration = [];
for (let i = 1; i <= rows * columns; i++) {
    winningConfiguration.push(selectedImageUrl + i + ".jpg");
}

function checkWin() {
    const board = document.getElementById('board');
    const tiles = board.getElementsByTagName('img');
    let currentConfiguration = [];
    for (let i = 0; i < tiles.length; i++) {
        currentConfiguration.push(tiles[i].src);
    }
    if (currentConfiguration.join() === winningConfiguration.join()) {
        document.getElementById('game-container').style.display = 'none';
        document.getElementById('win-container').style.display = 'block';
    }
}
