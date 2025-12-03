<template>
  <canvas ref="canvas" class="wave-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
let animationId: number;

// Blob class to manage individual organic shapes
class Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  points: number;
  offsets: number[];
  speeds: number[];
  
  constructor(w: number, h: number, color: string, radius: number) {
    // Start off-screen to the bottom-left or left
    
    // Start somewhere "behind" the bottom-left corner
    // We add some randomness so they don't all start at the exact same spot
    this.x = -Math.random() * (w/3);
    this.y = h + Math.random() * (h/3);
    
    // Move roughly towards top-right
    const speed = 0.2 + Math.random() * 0.3;
    this.vx = speed;
    this.vy = -speed; // Up is negative Y
    
    this.radius = radius;
    this.color = color;
    this.points = 24; // Increased vertices for smoother circle
    this.offsets = Array.from({ length: this.points }, () => Math.random() * 100);
    this.speeds = Array.from({ length: this.points }, () => (Math.random() - 0.5) * 0.01); // Slower mutation
  }

  reset(w: number, h: number) {
    // Respawn at bottom-left
    this.x = -this.radius * 2 - Math.random() * 200;
    this.y = h + this.radius * 2 + Math.random() * 200;
    
    const speed = 0.2 + Math.random() * 0.3;
    this.vx = speed;
    this.vy = -speed;
  }

  update(w: number, h: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Check if blob has completely left the screen (top-right)
    // Allow it to go quite far so it fully clears
    if (this.x > w + this.radius && this.y < -this.radius) {
      this.reset(w, h);
    }

    // Update organic movement
    for (let i = 0; i < this.points; i++) {
      this.offsets[i] += this.speeds[i];
    }
  }

  draw(ctx: CanvasRenderingContext2D, time: number) {
    ctx.beginPath();
    const angleStep = (Math.PI * 2) / this.points;

    // Calculate vertices
    const vertices = [];
    for (let i = 0; i < this.points; i++) {
      const angle = i * angleStep;
      // Reduced fluctuation magnitude for less "blobby", more "wavy circle" look
      const offset = Math.sin(this.offsets[i] + time * 0.002) * (this.radius * 0.05) + 
                     Math.cos(this.offsets[i] * 0.5 + time * 0.005) * (this.radius * 0.05);
      
      const r = this.radius + offset;
      const px = this.x + Math.cos(angle) * r;
      const py = this.y + Math.sin(angle) * r;
      vertices.push({ x: px, y: py });
    }

    // Draw smooth curve through vertices
    const first = vertices[0];
    const last = vertices[vertices.length - 1];
    const midLast = { x: (first.x + last.x) / 2, y: (first.y + last.y) / 2 };
    
    ctx.moveTo(midLast.x, midLast.y);

    for (let i = 0; i < vertices.length; i++) {
      const p1 = vertices[i];
      const p2 = vertices[(i + 1) % vertices.length];
      const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
      ctx.quadraticCurveTo(p1.x, p1.y, mid.x, mid.y);
    }

    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

onMounted(() => {
  if (!canvas.value) return;
  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  let width = window.innerWidth;
  let height = window.innerHeight;
  let blobs: Blob[] = [];

  const initBlobs = () => {
    blobs = [];
    // SIGNIFICANTLY increased base size to force overlap
    // Was 0.5, now 1.0 of the min dimension
    const baseSize = Math.min(width, height) * 1.0;
    
    const createBlob = (xFactor: number, yFactor: number, color: string, sizeFactor: number) => {
        const b = new Blob(width, height, color, baseSize * sizeFactor);
        // Manual positioning for initial state
        if (xFactor !== -1) b.x = width * xFactor;
        if (yFactor !== -1) b.y = height * yFactor;
        // If -1, let constructor handle off-screen
        blobs.push(b);
    }

    // Layer 1 - Huge central mass
    createBlob(0.2, 0.8, 'rgba(40, 40, 40, 0.5)', 1.5);
    // Layer 2
    createBlob(0.5, 0.5, 'rgba(30, 30, 30, 0.5)', 1.8);
    // Layer 3
    createBlob(-1, -1, 'rgba(25, 25, 25, 0.4)', 1.4); // Starts offscreen
    // Layer 4
    createBlob(0.8, 0.2, 'rgba(50, 50, 50, 0.3)', 1.3);

    // Additional Layers for density
    // Layer 5 - Start bottom
    createBlob(0.4, 0.9, 'rgba(35, 35, 35, 0.4)', 1.6);
    // Layer 6 - Start left
    createBlob(0.1, 0.6, 'rgba(45, 45, 45, 0.3)', 1.2);
    // Layer 7 - Delayed
    const b7 = new Blob(width, height, 'rgba(20, 20, 20, 0.5)', baseSize * 1.7);
    b7.x = -baseSize * 2;
    b7.y = height + baseSize * 2;
    blobs.push(b7);
  };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    if (canvas.value) {
      canvas.value.width = width;
      canvas.value.height = height;
    }
    initBlobs();
  };

  window.addEventListener('resize', resize);
  resize();

  let time = 0;

  const animate = () => {
    if (!canvas.value || !ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    
    blobs.forEach(blob => {
      blob.update(width, height);
      blob.draw(ctx, time);
    });

    time += 1;
    animationId = requestAnimationFrame(animate);
  };

  animate();

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize);
    cancelAnimationFrame(animationId);
  });
});
</script>

<style scoped>
.wave-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  filter: blur(5px); /* Increased blur to blend the large overlaps */
  transform: scale(1.2); 
}
</style>
