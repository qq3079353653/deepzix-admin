declare namespace BusinessCommon {
  /** 分页记录 */
  interface PaginatingRecord<T> {
    // 列表数据
    records: T[];
    // 总记录数
    total: number;
    // 总页数
    totalPages: number;
    // 当前页
    pageNumber: number;
    // 分页大小
    pageSize: number;
  }
}
