const prefix = 'gridbox';

// create initial 16x16 grid
let randomizeColor = false;

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
document.querySelector("#black_color_button").disabled = true;
document.querySelector("#randomize_color_button").disabled = false;

document.querySelector("#randomize_color_button").addEventListener('click', () => {
    document.querySelector("#randomize_color_button").disabled = true;
    document.querySelector("#black_color_button").disabled = false;
    randomizeColor = true;
    enableHoverEffect();
})

document.querySelector("#black_color_button").addEventListener('click', () => {
    document.querySelector("#randomize_color_button").disabled = false;
    document.querySelector("#black_color_button").disabled = true;
    randomizeColor = false;
    enableHoverEffect();
})

function enableHoverEffect() {
    const gridboxElements = document.querySelectorAll(`[id^="${prefix}"]`);
    gridboxElements.forEach(element => {
       
        let mouseoverCount = .1;
        
        element.addEventListener('mouseover',(event) => {
            if (randomizeColor == true) {
                event.target.style.backgroundColor = random_rgba();
            }
            else {
                event.target.style.backgroundColor = "black";
            }

            // make square progressively darker
            if (mouseoverCount < 1) {
                mouseoverCount = mouseoverCount + .1;
                element.style.opacity = mouseoverCount;
                event.target.style.opacity = mouseoverCount;
             }
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

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}