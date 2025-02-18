let highestZ = 1;

class MobilePaper {
  constructor(paper) {
    this.paper = paper;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.offsetX = 0;
    this.offsetY = 0;

    this.init();
  }

  init() {
    // Attach touchstart, touchmove, and touchend event listeners
    this.paper.addEventListener("touchstart", (e) => this.handleTouchStart(e), { passive: false });
    document.addEventListener("touchmove", (e) => this.handleTouchMove(e), { passive: false });
    document.addEventListener("touchend", () => this.handleTouchEnd(), { passive: false });
  }

  handleTouchStart(e) {
    e.preventDefault(); // Prevent scrolling while dragging

    this.isDragging = true;
    this.paper.style.zIndex = highestZ++; // Bring the paper to the front

    // Record initial touch position
    const touch = e.touches[0];
    this.startX = touch.clientX - this.offsetX;
    this.startY = touch.clientY - this.offsetY;
  }

  handleTouchMove(e) {
    if (!this.isDragging) return;

    e.preventDefault(); // Prevent accidental scrolling

    // Calculate new position
    const touch = e.touches[0];
    const moveX = touch.clientX - this.startX;
    const moveY = touch.clientY - this.startY;

    this.offsetX = moveX;
    this.offsetY = moveY;

    // Apply transform for smooth dragging
    this.paper.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }

  handleTouchEnd() {
    this.isDragging = false; // Reset dragging state
  }
}

// Initialize all papers for touch interaction
document.querySelectorAll(".paper").forEach((paper) => new MobilePaper(paper));
