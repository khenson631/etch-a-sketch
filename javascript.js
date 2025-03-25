const prefix = 'gridbox';
// const gridboxElements = document.querySelectorAll(`[id^="${prefix}"]`);

// create initial 16x16 grid
createGrid(16);
enableHoverEffect();

// creates grid dynamically
function createGrid(newGridSize) {
    const containerSize = 960;
    const boxSize = containerSize / newGridSize;
    const gridContainer = document.querySelector(".grid_container");
    clearGrid();
    
    for (let i = 0; i < (newGridSize * newGridSize); i++) {
        
        const newDiv = document.createElement('div');
        
        newDiv.id = "gridbox" + i;
        newDiv.style.width = `${boxSize}px`; 
        newDiv.style.height = `${boxSize}px`;
        newDiv.style.backgroundColor = "white";
        gridContainer.appendChild(newDiv);
    }
}

function enableHoverEffect() {
    const gridboxElements = document.querySelectorAll(`[id^="${prefix}"]`);
    gridboxElements.forEach(element => {
        element.addEventListener('mouseover',(event) => {
            event.target.style.backgroundColor = "black";
        });
    });
}

// Prompt for and apply grid size
const gridSizeButton = document.querySelector("#grid_size_button");
let newGridSize = 0;

gridSizeButton.addEventListener('click', () => {
    
        const gridSizePrompt = prompt('Enter grid size per side (max = 100',16);
        newGridSize = parseInt(gridSizePrompt);

        if (isNaN(newGridSize)) {
            alert("Invalid input. Please enter a number.");
        } else if (newGridSize < 1) {
            alert("Number is too low. Please enter a number greater than or equal to 1.");
        } else if (newGridSize > 100) {
            alert("Number is too high. Please enter a number less than or equal to 100.");
        }
        else {
            clearGrid();
            createGrid(newGridSize);
            enableHoverEffect();
        }
});

function clearGrid() {
 const gridContainer = document.querySelector(".grid_container");
 gridContainer.textContent = '';
}

let resetGridButton = document.querySelector("#reset_grid_button");
resetGridButton.addEventListener('click', () => {
    const gridboxElements = document.querySelectorAll(`[id^="${prefix}"]`);
    gridboxElements.forEach(element => {
            element.style.backgroundColor = "white";
    })
})
