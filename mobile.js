let highestZ = 1;

class Paper {
  constructor(paperElement) {
    this.paperElement = paperElement;
    this.init();
  }

  init() {
    this.paperElement.addEventListener('click', () => {
      this.moveAside();
    });
  }

  moveAside() {
    // Move the paper aside
    const currentTransform = getComputedStyle(this.paperElement).transform;
    const matrix = currentTransform === 'none' ? [1, 0, 0, 1, 0, 0] : currentTransform.match(/matrix.*\((.+)\)/)[1].split(', ');
    const currentX = parseFloat(matrix[4]) || 0; // Get current translateX
    const newX = currentX + 320; // Move it aside (adjust as needed)

    this.paperElement.style.transform = `translateX(${newX}px)`;
    this.paperElement.style.zIndex = highestZ; // Bring to front
    highestZ += 1; // Increment z-index for the next paper
  }
}

// Initialize all papers
const papers = Array
