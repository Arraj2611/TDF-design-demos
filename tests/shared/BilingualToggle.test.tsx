import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { LangProvider } from '@/components/shared/LangProvider';
import { BilingualToggle } from '@/components/shared/BilingualToggle';

describe('BilingualToggle', () => {
  beforeEach(() => { localStorage.clear(); });

  it('shows EN / मराठी pair', () => {
    render(<LangProvider><BilingualToggle/></LangProvider>);
    expect(screen.getByRole('button', { name: /en/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /मराठी/ })).toBeInTheDocument();
  });

  it('toggles language on click', async () => {
    render(<LangProvider><BilingualToggle/></LangProvider>);
    const mrBtn = screen.getByRole('button', { name: /मराठी/ });
    await userEvent.click(mrBtn);
    expect(mrBtn).toHaveAttribute('aria-pressed', 'true');
  });
});
