export class URLBuilder {
  static queryParams<T extends Record<string, any>>(params: T): string {
    return Object.entries(params)
      .filter(([_key, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
  }
}
