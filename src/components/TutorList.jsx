import { useRef, useEffect, useState } from 'react';
import TutorCard from './TutorCard';
import { useBioClamp } from '../hooks/useBioClamp';

const PAGE_SIZE = 50;

export default function TutorList({
  tutors,
  favorites,
  selectedId,
  onSelect,
  onToggleFavorite,
  style,
}) {
  const containerRef = useRef(null);
  const [currentNumber, setCurrentNumber] = useState(PAGE_SIZE);

  useEffect(() => {
    setCurrentNumber(PAGE_SIZE);
  }, [tutors]);

  const currentTutors = tutors.slice(0, currentNumber);

  useBioClamp(containerRef, [currentTutors]);

  return (
    <>
      <div className="tutor-grid" ref={containerRef} style={style}>
        {currentTutors.map((tutor) => (
          <TutorCard
            key={tutor.id}
            tutor={tutor}
            isFavorite={favorites.includes(tutor.id)}
            isSelected={tutor.id === selectedId}
            onSelect={() => onSelect(tutor.id)}
            onToggleFavorite={() => onToggleFavorite(tutor.id)}
          />
        ))}
      </div>

      {currentNumber < tutors.length && (
        <button
          type="button"
          className="load-more-button"
          onClick={() => setCurrentNumber((count) => count + PAGE_SIZE)}
        >
          Показати ще
        </button>
      )}
    </>
  );
}
