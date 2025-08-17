import { usePagination } from 'vue-request'
import type { PaginationOptions } from 'vue-request'

export const useFetchData = ({
  request,
  requestOptions = {},
}: {
  request?: (params: any) => Promise<any>
  requestOptions?: PaginationOptions<any, any>
} = {}) => {
  // 如果没有提供 request 函数，返回一个默认的空分页对象
  if (!request) {
    return {
      data: {
        data: [],
        total: 0,
      },
      loading: false,
      current: 1,
      pageSize: 10,
      total: 0,
      run: () => Promise.resolve(),
      refresh: () => Promise.resolve(),
      mutate: () => {},
    }
  }

  const action = usePagination(request, {
    ...requestOptions,
  })
  
  return action
}