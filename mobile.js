let highestZ = 1;

class MobilePaper {
  constructor(paper) {
    this.paper = paper;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.currentX = 0;
    this.currentY = 0;

    this.init();
  }

  init() {
    // Touch Events for Mobile
    this.paper.addEventListener("touchstart", (e) => this.startDrag(e.touches[0]));
    document.addEventListener("touchmove", (e) => this.onDrag(e.touches[0]));
    document.addEventListener("touchend", () => this.endDrag());
  }

  startDrag(event) {
    this.isDragging = true;

    // Bring paper to the front
    this.paper.style.zIndex = highestZ++;
    this.startX = event.clientX - this.offsetX;
    this.startY = event.clientY - this.offsetY;
  }

  onDrag(event) {
    if (!this.isDragging) return;

    this.currentX = event.clientX - this.startX;
    this.currentY = event.clientY - this.startY;
    this.offsetX = this.currentX;
    this.offsetY = this.currentY;

    // Apply transform for movement
    this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
  }

  endDrag() {
    this.isDragging = false;
  }
}

// Initialize all papers for touch interaction
document.querySelectorAll(".paper").forEach((paper) => new MobilePaper(paper));
