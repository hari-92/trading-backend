// src/common/utils/pagination.util.ts
import { Repository } from 'typeorm';

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export async function paginate<T>(
  repository: Repository<T>,
  options: PaginationOptions,
  searchOptions: any = {},
): Promise<PaginatedResult<T>> {
  const { page = 1, limit = 20 } = options;
  const skip = (page - 1) * limit;

  const [data, total] = await repository.findAndCount({
    ...searchOptions,
    take: limit,
    skip: skip,
  });

  return {
    data,
    total: +total,
    page: +page,
    limit: +limit,
    total_pages: Math.ceil(total / limit),
  };
}
