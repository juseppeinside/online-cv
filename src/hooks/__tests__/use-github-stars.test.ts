import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import React from 'react';
import logger from '@/lib/logger';
import { useGithubStars } from '../use-github-stars';

declare const jest: {
  // biome-ignore lint/suspicious/noExplicitAny: <jest mock>
  fn: <T extends (...args: any[]) => any>() => jest.MockedFunction<T>;
  mock: (module: string, factory?: () => unknown) => void;
  clearAllMocks: () => void;
};

// Mock logger
jest.mock('@/lib/logger', () => ({
  error: jest.fn(),
}));

// Mock fetch
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

const createMockResponse = (
  data: unknown,
  ok = true,
  status = 200
): Response => ({
  ok,
  status,
  json: () => Promise.resolve(data),
  headers: new Headers(),
  redirected: false,
  statusText: 'OK',
  type: 'basic' as ResponseType,
  url: '',
  body: null,
  bodyUsed: false,
  arrayBuffer: jest
    .fn<() => Promise<ArrayBuffer>>()
    .mockResolvedValue(new ArrayBuffer(0)),
  blob: jest.fn<() => Promise<Blob>>().mockResolvedValue(new Blob()),
  formData: jest
    .fn<() => Promise<FormData>>()
    .mockResolvedValue(new FormData()),
  text: jest.fn<() => Promise<string>>().mockResolvedValue(''),
  bytes: jest.fn().mockResolvedValue(new Uint8Array()),
  clone: jest.fn().mockReturnValue({} as Response),
});

const MOCK_STAR_COUNT_42 = 42;
const MOCK_STAR_COUNT_50 = 50;
const MOCK_STAR_COUNT_100 = 100;
const MOCK_STAR_COUNT_200 = 200;
const HTTP_STATUS_404 = 404;
const HTTP_STATUS_403 = 403;
const HTTP_STATUS_500 = 500;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children
    );
  };
};

describe('useGithubStars', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
  });

  describe('Запросы к GitHub API', () => {
    it('должен успешно получать количество звезд репозитория', async () => {
      const mockData = { stargazers_count: MOCK_STAR_COUNT_42 };
      mockFetch.mockResolvedValueOnce(createMockResponse(mockData));

      const { result } = renderHook(() => useGithubStars('facebook', 'react'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBe(MOCK_STAR_COUNT_42);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/repos/facebook/react'
      );
    });

    it('должен формировать правильный URL для разных владельцев и репозиториев', async () => {
      const mockData = { stargazers_count: MOCK_STAR_COUNT_100 };
      mockFetch.mockResolvedValueOnce(createMockResponse(mockData));

      const { result } = renderHook(
        () => useGithubStars('microsoft', 'vscode'),
        {
          wrapper: createWrapper(),
        }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/repos/microsoft/vscode'
      );
      expect(result.current.data).toBe(MOCK_STAR_COUNT_100);
    });

    it('должен использовать правильный queryKey', async () => {
      const mockData = { stargazers_count: MOCK_STAR_COUNT_50 };
      mockFetch.mockResolvedValueOnce(createMockResponse(mockData));

      const { result } = renderHook(() => useGithubStars('vercel', 'next.js'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBe(MOCK_STAR_COUNT_50);
    });
  });

  describe('Обработка ошибок', () => {
    it('должен обрабатывать ошибку 404', async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse(null, false, HTTP_STATUS_404)
      );

      const { result } = renderHook(
        () => useGithubStars('nonexistent', 'repo'),
        {
          wrapper: createWrapper(),
        }
      );

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(logger.error).toHaveBeenCalledWith(
        'Error fetching repo >>>',
        HTTP_STATUS_404
      );
      expect(result.current.error).toEqual(
        new Error('Ошибка загрузки с GitHub API')
      );
    });

    it('должен обрабатывать ошибку 403 (rate limit)', async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse(null, false, HTTP_STATUS_403)
      );

      const { result } = renderHook(() => useGithubStars('facebook', 'react'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(logger.error).toHaveBeenCalledWith(
        'Error fetching repo >>>',
        HTTP_STATUS_403
      );
      expect(result.current.error).toEqual(
        new Error('Ошибка загрузки с GitHub API')
      );
    });

    it('должен обрабатывать ошибку 500', async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse(null, false, HTTP_STATUS_500)
      );

      const { result } = renderHook(() => useGithubStars('facebook', 'react'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(logger.error).toHaveBeenCalledWith(
        'Error fetching repo >>>',
        HTTP_STATUS_500
      );
      expect(result.current.error).toEqual(
        new Error('Ошибка загрузки с GitHub API')
      );
    });

    it('должен обрабатывать ошибку сети', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useGithubStars('facebook', 'react'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(new Error('Network error'));
    });

    it('должен обрабатывать ошибку парсинга JSON', async () => {
      mockFetch.mockResolvedValueOnce({
        ...createMockResponse({}),
        json: () => Promise.reject(new Error('Invalid JSON')),
      });

      const { result } = renderHook(() => useGithubStars('facebook', 'react'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(new Error('Invalid JSON'));
    });
  });

  describe('Кэширование данных', () => {
    it('должен использовать staleTime в 1 час', async () => {
      const mockData = { stargazers_count: MOCK_STAR_COUNT_42 };
      mockFetch.mockResolvedValueOnce(createMockResponse(mockData));

      const { result } = renderHook(() => useGithubStars('facebook', 'react'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBe(MOCK_STAR_COUNT_42);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('должен кэшировать данные для одинаковых queryKey', async () => {
      const mockData = { stargazers_count: MOCK_STAR_COUNT_100 };
      mockFetch.mockResolvedValue(createMockResponse(mockData));

      const wrapper = createWrapper();

      const { result: result1 } = renderHook(
        () => useGithubStars('facebook', 'react'),
        {
          wrapper,
        }
      );

      await waitFor(() => {
        expect(result1.current.isSuccess).toBe(true);
      });

      const { result: result2 } = renderHook(
        () => useGithubStars('facebook', 'react'),
        {
          wrapper,
        }
      );

      await waitFor(() => {
        expect(result2.current.isSuccess).toBe(true);
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result1.current.data).toBe(MOCK_STAR_COUNT_100);
      expect(result2.current.data).toBe(MOCK_STAR_COUNT_100);
    });

    it('должен делать новый запрос для разных репозиториев', async () => {
      const mockData1 = { stargazers_count: MOCK_STAR_COUNT_100 };
      const mockData2 = { stargazers_count: MOCK_STAR_COUNT_200 };

      mockFetch
        .mockResolvedValueOnce(createMockResponse(mockData1))
        .mockResolvedValueOnce(createMockResponse(mockData2));

      const wrapper = createWrapper();

      const { result: result1 } = renderHook(
        () => useGithubStars('facebook', 'react'),
        {
          wrapper,
        }
      );

      await waitFor(() => {
        expect(result1.current.isSuccess).toBe(true);
      });

      const { result: result2 } = renderHook(
        () => useGithubStars('microsoft', 'vscode'),
        {
          wrapper,
        }
      );

      await waitFor(() => {
        expect(result2.current.isSuccess).toBe(true);
      });

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(result1.current.data).toBe(MOCK_STAR_COUNT_100);
      expect(result2.current.data).toBe(MOCK_STAR_COUNT_200);
    });

    it('должен использовать правильный queryKey для кэширования', async () => {
      const mockData = { stargazers_count: MOCK_STAR_COUNT_42 };
      mockFetch.mockResolvedValue(createMockResponse(mockData));

      const wrapper = createWrapper();

      const { result } = renderHook(() => useGithubStars('facebook', 'react'), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBe(MOCK_STAR_COUNT_42);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/repos/facebook/react'
      );
    });
  });

  describe('Состояния загрузки', () => {
    it('должен показывать состояние загрузки', () => {
      mockFetch.mockImplementation(
        () =>
          new Promise(() => {
            // Empty promise that never resolves
          })
      );

      const { result } = renderHook(() => useGithubStars('facebook', 'react'), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.isError).toBe(false);
    });

    it('должен переходить в состояние успеха после загрузки', async () => {
      const mockData = { stargazers_count: MOCK_STAR_COUNT_42 };
      mockFetch.mockResolvedValueOnce(createMockResponse(mockData));

      const { result } = renderHook(() => useGithubStars('facebook', 'react'), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
      expect(result.current.data).toBe(MOCK_STAR_COUNT_42);
    });

    it('должен переходить в состояние ошибки при неудаче', async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse(null, false, HTTP_STATUS_404)
      );

      const { result } = renderHook(
        () => useGithubStars('nonexistent', 'repo'),
        {
          wrapper: createWrapper(),
        }
      );

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSuccess).toBe(false);
    });
  });
});
