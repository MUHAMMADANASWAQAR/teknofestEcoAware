
import confetti from 'canvas-confetti';

export const triggerConfetti = (element?: HTMLElement) => {
  const options: confetti.Options = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#4CAF50', '#03A9F4', '#FFECB3', '#689F38', '#795548'],
    disableForReducedMotion: true
  };

  // If element is provided, trigger confetti from that element's position
  if (element) {
    const rect = element.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    options.origin = { x, y };
  }

  confetti(options);
};

export const numberWithAnimation = (
  start: number,
  end: number,
  duration: number,
  onUpdate: (value: number) => void,
  onComplete?: () => void
) => {
  const startTime = performance.now();
  
  const updateNumber = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (easeOutElastic)
    const easeOutElastic = (t: number) => {
      const p = 0.3;
      return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
    };
    
    const currentValue = Math.round(start + (end - start) * easeOutElastic(progress));
    onUpdate(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else if (onComplete) {
      onComplete();
    }
  };
  
  requestAnimationFrame(updateNumber);
};
