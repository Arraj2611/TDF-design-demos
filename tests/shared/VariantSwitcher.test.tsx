import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { VariantSwitcher } from '@/components/shared/VariantSwitcher';

describe('VariantSwitcher', () => {
  it('renders a toggle button', () => {
    render(<VariantSwitcher currentSlug="v1" />);
    expect(screen.getByRole('button', { name: /editions?/i })).toBeInTheDocument();
  });
  it('opens the panel with all 10 variants on click', async () => {
    render(<VariantSwitcher currentSlug="v1" />);
    await userEvent.click(screen.getByRole('button', { name: /editions?/i }));
    expect(screen.getAllByRole('link')).toHaveLength(10);
  });
  it('marks the current variant', async () => {
    render(<VariantSwitcher currentSlug="v2" />);
    await userEvent.click(screen.getByRole('button', { name: /editions?/i }));
    const links = screen.getAllByRole('link');
    const current = links.find((l) => l.getAttribute('aria-current') === 'page');
    expect(current?.textContent).toMatch(/Workshop/);
  });
});
