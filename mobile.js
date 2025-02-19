let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  parseTransform(element) {
    const style = window.getComputedStyle(element);
    const transform = style.transform;
    if (transform === 'none') return { x: 0, y: 0 };
    
    const matrix = transform.match(/^matrix\((.+)\)$/);
    if (!matrix) return { x: 0, y: 0 };
    
    const values = matrix[1].split(', ').map(parseFloat);
    return { x: values[4], y: values[5] };
  }

  init(paper) {
    // Touch move event
    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!this.holdingPaper) return;

      this.touchMoveX = e.touches[0].clientX;
      this.touchMoveY = e.touches[0].clientY;

      this.velX = this.touchMoveX - this.prevTouchX;
      this.velY = this.touchMoveY - this.prevTouchY;

      if (!this.rotating) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      } else {
        const dirX = this.touchMoveX - this.touchStartX;
        const dirY = this.touchMoveY - this.touchStartY;
        const angle = Math.atan2(dirY, dirX);
        this.rotation = (angle * 180) / Math.PI;
      }

      this.prevTouchX = this.touchMoveX;
      this.prevTouchY = this.touchMoveY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    });

    // Touch start event
