var rows = 5;
var columns = 5;
var pieces = [];

var currTile;
var otherTile;
var turns = 0;

var normalImageUrls = ["./Images/Normal/Images-1/", "./Images/Normal/Images-2/", "./Images/Normal/Images-3/"];
var easyImageUrls = ["./Images/Easy/Images-1/", "./Images/Easy/Images-2/", "./Images/Easy/Images-3/"];
var hardImageUrls = ["./Images/Hard/Images-1/", "./Images/Hard/Images-2/", "./Images/Hard/Images-3/"];
var currentImageUrlIndex = 0;
var imageUrls = normalImageUrls;

window.onload = function() {
    document.getElementById("easyBtn").addEventListener("click", function() {
        rows = 3;
        columns = 3;
        imageUrls = easyImageUrls;
        setBoardSize("easy");
    });

    document.getElementById("normalBtn").addEventListener("click", function() {
        rows = 5;
        columns = 5;
        imageUrls = normalImageUrls;
        setBoardSize("normal");
    });

    document.getElementById("hardBtn").addEventListener("click", function() {
        rows = 8;
        columns = 8;
        imageUrls = hardImageUrls;
        setBoardSize("hard");
    });

    document.getElementById("startBtn").addEventListener("click", function() {
        initializeBoard();
        shufflePieces();
        createPieces();
    });

    document.getElementById("changeBtn").addEventListener("click", function() {
        currentImageUrlIndex = (currentImageUrlIndex + 1) % imageUrls.length;
        changePuzzleImage();
    });
}

function setBoardSize(level) {
    let board = document.getElementById("board");
    let piecesContainer = document.getElementById("pieces");

    let boardSize, pieceSize;

    switch(level) {
        case "easy":
            board.style.width = "241px"
            board.style.height = "245px"
            piecesContainer.style.width = "402px";
            piecesContainer.style.height = "160px";
            break;
        case "normal":
            board.style.width = "400px"
            board.style.height = "400px"
            piecesContainer.style.width = "1037px;"; 
            piecesContainer.style.height = "160px";
            break;
       case "hard":
            board.style.width = "639px"
            board.style.height = "641px"
            piecesContainer.style.width = "1757px";
            piecesContainer.style.height = "240px"; 
            break;
            }

    board.style.width = boardSize;
    board.style.height = boardSize;

    for (let tile of piecesContainer.children) {
        tile.style.width = pieceSize;
        tile.style.height = pieceSize;
    }

    for (let tile of board.children) {
        tile.style.width = pieceSize;
        tile.style.height = pieceSize;
    }
}

function initializeBoard() {
    clearBoard();
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./Images/Normal/Images-1/blank2.jpg";
     

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
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
        tile.src = imageUrls[currentImageUrlIndex] + pieces[i] + ".jpg";
   

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

function changePuzzleImage() {
    clearPieces();
    shufflePieces();
    initializeBoard();
    createPieces();
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
}
