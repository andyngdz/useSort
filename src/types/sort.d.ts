type TDirection = 'asc' | 'desc'

type TSortValues = Record<string, ISort>

interface ISort {
  direction: TDirection

  active: boolean
}

interface IUseSort<T> {
  sorts: Record<keyof T, ISort>

  sortedData: Array<T>

  sortBy: (key: keyof T) => void

  loading: boolean
}

export { ISort, IUseSort, TDirection, TSortValues }
