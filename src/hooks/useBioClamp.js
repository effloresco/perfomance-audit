import { useLayoutEffect } from 'react';

export function useBioClamp(containerRef, deps) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let frameId = null;

    const update = () => {
      const bios = Array.from(
        container.querySelectorAll('.tutor-card__bio')
      );

      if (!bios.length) return;

      const cards = bios.map((bio) =>
        bio.closest('.tutor-card')
      );

      bios.forEach((bio) => {
        bio.classList.remove('is-clamped');
      });

      const fullHeights = bios.map((bio) => bio.offsetHeight);

      bios.forEach((bio) => {
        bio.classList.add('is-clamped');
      });

      const clampedHeights = bios.map((bio) => bio.offsetHeight);

      bios.forEach((bio, index) => {
        const card = cards[index];

        if (!card) return;

        card.classList.toggle(
          'has-more',
          fullHeights[index] > clampedHeights[index] + 1
        );
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