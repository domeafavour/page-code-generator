import { act, fireEvent, render, renderHook } from '@testing-library/react';
import { Counter, useCounter } from './Counter';

describe('useCounter', () => {
  it('default count is 0', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current[0]).toBe(0);
  });

  it('should return the value given', () => {
    const { result } = renderHook(() => useCounter(1));
    expect(result.current[0]).toBe(1);
  });

  it('should be 1 after increment', () => {
    const { result, rerender } = renderHook(() => useCounter());
    expect(result.current[0]).toBe(0);
    act(() => {
      result.current[1].increment();
    });
    expect(result.current[0]).toBe(1);
    rerender();
    expect(result.current[0]).toBe(1);
  });
});

describe('Counter', () => {
  it('should render without crash', () => {
    const result = render(<Counter />);
    expect(result.container).toMatchSnapshot();
  });

  it('should render without crash while `initialCount` is given', () => {
    const result = render(<Counter initialCount={1} />);
    expect(result.container).toMatchSnapshot();
  });

  it('should increment the count', () => {
    const result = render(<Counter />);
    expect(result.getByText('0')).toBeTruthy();
    act(() => {
      fireEvent.click(result.getByRole('button'));
    });
    expect(result.getByText('1')).toBeTruthy();
  });
});
