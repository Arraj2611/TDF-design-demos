import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Reveal } from '@/components/shared/Reveal';

describe('Reveal', () => {
  it('renders children', () => {
    render(<Reveal><p>hello</p></Reveal>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
  it('applies data-reveal attribute for CSS hooks', () => {
    const { container } = render(<Reveal><p>hello</p></Reveal>);
    expect(container.firstElementChild).toHaveAttribute('data-reveal');
  });
});
