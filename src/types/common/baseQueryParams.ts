interface BaseQueryParam {
  _page?: number;
  _per_page?: number;
  search?: string;
}
interface BaseQueryParamsWithSearch extends BaseQueryParam {
  search?: string;
}

export type { BaseQueryParam, BaseQueryParamsWithSearch };
