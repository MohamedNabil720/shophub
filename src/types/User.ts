export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface PaginationInfo {
  total: number;
  pageSize: number;
  currentPage: number;
  startIndex: number;
  endIndex: number;
}
