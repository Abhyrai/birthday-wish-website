class Paper {
  constructor(paperElement) {
    this.paperElement = paperElement;
    this.init();
  }

  init() {
    this.paperElement.addEventListener('click', () => {
      this.moveToRandomCorner();
    });
  }

  moveToRandomCorner() {
    // Get the dimensions of the window
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Generate random positions for the corners
    const randomX = Math.random() * (windowWidth - this.paperElement.offsetWidth);
    const randomY = Math.random() * (windowHeight - this.paperElement
