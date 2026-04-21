import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScrollNum } from '@/components/shared/ScrollNum';

describe('ScrollNum', () => {
  it('renders the target value as accessible fallback', () => {
    render(<ScrollNum from={0} to={15000} format={(n) => n.toLocaleString()} />);
    expect(screen.getByText('15,000')).toBeInTheDocument();
  });
});
