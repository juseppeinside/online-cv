import { useQuery } from '@tanstack/react-query';
import logger from '@/lib/logger';

type GithubRepo = {
  stargazers_count: number;
};

// biome-ignore lint/style/noMagicNumbers: <is just 1 hours cache time dude>
const STALE_TIME_MS = 1000 * 60 * 60;

export function useGithubStars(owner: string, repo: string) {
  return useQuery({
    queryKey: ['github', 'stars', owner, repo],
    queryFn: async (): Promise<number> => {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (!res.ok) {
        logger.error('Error fetching repo >>>', res.status);
        throw new Error('Ошибка загрузки с GitHub API');
      }

      const data: GithubRepo = await res.json();
      return data.stargazers_count;
    },
    staleTime: STALE_TIME_MS,
  });
}
