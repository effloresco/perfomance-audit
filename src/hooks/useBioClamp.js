import { useLayoutEffect } from 'react';

export function useBioClamp(containerRef, deps) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let frameId = null;

    const update = () => {
      container.querySelectorAll('.tutor-card__bio').forEach((bio) => {
        const card = bio.closest('.tutor-card');

        bio.classList.remove('is-clamped');
        const fullHeight = bio.offsetHeight;

        bio.classList.add('is-clamped');
        const clampedHeight = bio.offsetHeight;

        card.classList.toggle('has-more', fullHeight > clampedHeight + 1);
      });
    };

    const scheduleUpdate = () => {
      if (frameId !== null) return;

      frameId = requestAnimationFrame(() => {
        frameId = null;
        update();
      });
    };

    update();
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('resize', scheduleUpdate);

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };

  }, deps);
}