export interface ResponseFormat<T> {
  data: T;
  meta?: {
    count?: number;
    page?: number;
    totalPages?: number;
    totalCount?: number;
  };
  links?: {
    self?: string;
    first?: string;
    prev?: string;
    next?: string;
    last?: string;
    related?: Record<string, string>;
  };
}

export function formatResponse<T>(
  data: T,
  meta?: ResponseFormat<T>['meta'],
  links?: ResponseFormat<T>['links']
): ResponseFormat<T> {
  return {
    data,
    ...(meta && { meta }),
    ...(links && { links }),
  };
}
