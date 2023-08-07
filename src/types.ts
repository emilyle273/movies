export interface Movie {
  id: number
  title: string
  poster_path: string
  overview: string
  release_date: string
}

export interface ApiEndpoints {
  [key: string]: (query?: string) => string
}

export enum ViewMode {
  Grid,
  List
}
