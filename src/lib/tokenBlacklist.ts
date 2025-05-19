const blacklistedTokens = new Set<string>();

export const blacklistToken = (token: string): void => {
  blacklistedTokens.add(token);
};

export const isBlacklisted = (token: string): boolean => {
  return blacklistedTokens.has(token);
};
