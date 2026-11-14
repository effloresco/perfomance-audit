import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header', () => {
  it('резервує простір для головного зображення до його завантаження', () => {
    render(<Header favoritesCount={0} total={2000} />);

    const heroImage = screen.getByRole('img');

    expect(heroImage.getAttribute('width')).toBe('2400');
    expect(heroImage.getAttribute('height')).toBe('900');
  });
});