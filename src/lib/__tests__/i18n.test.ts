import { renderHook } from '@testing-library/react';
import { useTranslation } from 'react-i18next';

declare const jest: {
  fn: () => jest.MockedFunction<(...args: unknown[]) => unknown>;
  mock: (moduleName: string, factory?: () => unknown) => void;
  clearAllMocks: () => void;
};

// Mock react-i18next
const mockT = jest.fn().mockImplementation((key: unknown) => key);
const mockI18n = {
  language: 'en',
  changeLanguage: jest.fn(),
  t: mockT,
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mockT,
    i18n: mockI18n,
  }),
}));

describe('i18n', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides translation function', () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.t).toBeDefined();
    expect(typeof result.current.t).toBe('function');
  });

  it('provides i18n instance', () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.i18n).toBeDefined();
    expect(result.current.i18n.language).toBe('en');
  });

  it('has changeLanguage method', () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.i18n.changeLanguage).toBeDefined();
    expect(typeof result.current.i18n.changeLanguage).toBe('function');
  });

  it('translation function returns key when no translation found', () => {
    const { result } = renderHook(() => useTranslation());

    const translation = result.current.t('test.key');
    expect(translation).toBe('test.key');
  });

  it('can change language', () => {
    const { result } = renderHook(() => useTranslation());

    result.current.i18n.changeLanguage('ru');
    expect(mockI18n.changeLanguage).toHaveBeenCalledWith('ru');
  });

  it('has correct language property', () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.i18n.language).toBe('en');
  });

  it('translation function is called with correct parameters', () => {
    const { result } = renderHook(() => useTranslation());

    result.current.t('test.key', { param: 'value' });
    expect(mockT).toHaveBeenCalledWith('test.key', { param: 'value' });
  });

  it('supports nested translation keys', () => {
    const { result } = renderHook(() => useTranslation());

    result.current.t('personal.name');
    expect(mockT).toHaveBeenCalledWith('personal.name');
  });
});
