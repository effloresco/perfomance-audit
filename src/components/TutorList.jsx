import { useEffect, useState, useMemo } from 'react';
import TutorCard from './TutorCard';

const PAGE_SIZE = 50;

export default function TutorList({
  tutors,
  favorites,
  selectedId,
  onSelect,
  onToggleFavorite,
  style,
}) {
  const [currentNumber, setCurrentNumber] = useState(PAGE_SIZE);

  useEffect(() => {
    setCurrentNumber(PAGE_SIZE);
  }, [tutors]);

  const currentTutors = useMemo(
    () => tutors.slice(0, currentNumber),
    [tutors, currentNumber]
  );

  return (
    <>
      <div className="tutor-grid" style={style}>
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