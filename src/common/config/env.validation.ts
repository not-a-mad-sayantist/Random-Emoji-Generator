export function validate(config: Record<string, unknown>) {
  if (!config.API_KEY) {
    throw new Error('API_KEY is missing in .env file');
  }
  return config;
}
