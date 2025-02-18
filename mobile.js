(() => {
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
      this.paper.addEventListener("touchstart", (e) => {
        e.preventDefault(); // Prevent default scrolling behavior
        this.startDrag(e.touches[0]);
      });
      document.addEventListener("touchmove", (e) => {
        e.preventDefault(); // Prevent default touch move
        this.onDrag(e.touches[0]);
      });
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

      // Calculate current position
      this.currentX = event.clientX - this.startX;
      this.currentY = event.clientY - this.startY;

      // Boundary check (optional)
      this.currentX = Math.max(0, Math.min(window.innerWidth - this.paper.offsetWidth, this.currentX));
      this.currentY = Math.max(0, Math.min(window.innerHeight - this.paper.offsetHeight, this.currentY));

      // Update offsets
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
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".paper").forEach((paper) => new MobilePaper(paper));
  });
})();
