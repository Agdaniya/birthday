document.addEventListener("DOMContentLoaded", () => {
    const puzzleContainer = document.getElementById("puzzle-container");
    
    // Create celebration container
    const celebrationContainer = document.createElement("div");
    celebrationContainer.id = "celebration-container";
    celebrationContainer.style.display = "none"; // Start hidden
    celebrationContainer.style.position = "absolute";
    celebrationContainer.style.top = "50%";
    celebrationContainer.style.left = "50%";
    celebrationContainer.style.transform = "translate(-50%, -50%)";
    celebrationContainer.style.backgroundColor = "rgba(255, 192, 203, 0.9)"; // Pink background with opacity
    celebrationContainer.style.padding = "30px";
    celebrationContainer.style.borderRadius = "15px";
    celebrationContainer.style.boxShadow = "0 0 20px rgba(255, 0, 0, 0.5)";
    celebrationContainer.style.zIndex = "100";
    celebrationContainer.style.textAlign = "center";
    celebrationContainer.style.width = "80%";
    celebrationContainer.style.maxWidth = "400px";
    
    // Create message
    const message = document.createElement("h1");
    message.innerText = "Challenge completed!!";
    message.style.color = "#FF0000"; // Red color
    message.style.fontSize = "28px";
    message.style.marginBottom = "10px";
    celebrationContainer.appendChild(message);
    
    // Add love message
    const loveMessage = document.createElement("h1");
    loveMessage.innerText = "Happy Birthday Love 💖";
    loveMessage.style.color = "#FF0000"; // Red color
    loveMessage.style.fontSize = "36px";
    loveMessage.style.fontWeight = "bold";
    celebrationContainer.appendChild(loveMessage);
    
    // Add emoji decorations
    const emojiContainer = document.createElement("div");
    emojiContainer.innerHTML = "🎂 🎁 🎉 🎈 🎊";
    emojiContainer.style.fontSize = "32px";
    emojiContainer.style.margin = "20px 0";
    celebrationContainer.appendChild(emojiContainer);
    
    // Add container to body instead of puzzle container for better positioning
    document.body.appendChild(celebrationContainer);

    const size = 3; // 3x3 grid
    let pieces = [];
    let emptyX = size - 1, emptyY = size - 1; // Last piece is empty

    function createPuzzle() {
        puzzleContainer.style.display = "grid";
        puzzleContainer.style.gridTemplateColumns = `repeat(${size}, 80px)`;
        puzzleContainer.style.gridTemplateRows = `repeat(${size}, 80px)`;
        puzzleContainer.style.gap = "2px";
        puzzleContainer.style.width = `${size * 80}px`;
        puzzleContainer.style.height = `${size * 80}px`;
        puzzleContainer.style.position = "relative";

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (i === size - 1 && j === size - 1) continue; // Leave one space empty

                let piece = document.createElement("img");
                piece.src = `puzzle_pieces/puzzle_piece_${i}_${j}.png`;
                piece.classList.add("puzzle-piece");
                piece.dataset.row = i;
                piece.dataset.col = j;
                piece.dataset.originalRow = i; // Store original position
                piece.dataset.originalCol = j; // Store original position
                piece.style.width = "80px";
                piece.style.height = "80px";
                piece.style.cursor = "pointer";

                piece.addEventListener("click", () => movePiece(piece));

                puzzleContainer.appendChild(piece);
                pieces.push(piece);
            }
        }
        shuffle(); // Shuffle when the puzzle is created
    }

    function movePiece(piece) {
        let row = parseInt(piece.dataset.row);
        let col = parseInt(piece.dataset.col);

        let dx = Math.abs(emptyX - row);
        let dy = Math.abs(emptyY - col);

        if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
            piece.dataset.row = emptyX;
            piece.dataset.col = emptyY;
            emptyX = row;
            emptyY = col;

            renderPuzzle();
            checkWin();
        }
    }

    function renderPuzzle() {
        pieces.forEach(piece => {
            let row = parseInt(piece.dataset.row);
            let col = parseInt(piece.dataset.col);
            piece.style.gridRow = row + 1;
            piece.style.gridColumn = col + 1;
        });
    }

    function shuffle() {
        // Reset positions first
        pieces.forEach(piece => {
            piece.dataset.row = piece.dataset.originalRow;
            piece.dataset.col = piece.dataset.originalCol;
        });
        
        // Reset empty position
        emptyX = size - 1;
        emptyY = size - 1;
        
        // Perform many random moves to shuffle
        for (let i = 0; i < 200; i++) {
            // Find pieces adjacent to empty space
            let movablePieces = pieces.filter(piece => {
                let row = parseInt(piece.dataset.row);
                let col = parseInt(piece.dataset.col);
                let dx = Math.abs(emptyX - row);
                let dy = Math.abs(emptyY - col);
                return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
            });
            
            // Move a random adjacent piece
            if (movablePieces.length > 0) {
                let randIndex = Math.floor(Math.random() * movablePieces.length);
                movePiece(movablePieces[randIndex]);
            }
        }
        
        // Render the initial shuffled state
        renderPuzzle();
    }

    function checkWin() {
        let isCorrect = pieces.every(piece => {
            let row = parseInt(piece.dataset.row);
            let col = parseInt(piece.dataset.col);
            let originalRow = parseInt(piece.dataset.originalRow);
            let originalCol = parseInt(piece.dataset.originalCol);
            
            return row === originalRow && col === originalCol;
        });

        if (isCorrect && emptyX === size - 1 && emptyY === size - 1) {
            // Show celebration container only when puzzle is solved
            celebrationContainer.style.display = "block";
            
            // Add animation to make it more festive
            celebrationContainer.animate(
                [
                    { transform: 'translate(-50%, -50%) scale(0.8)', opacity: 0 },
                    { transform: 'translate(-50%, -50%) scale(1.1)', opacity: 1 },
                    { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 }
                ],
                {
                    duration: 600,
                    easing: 'ease-out'
                }
            );
        }
    }

    createPuzzle();
});