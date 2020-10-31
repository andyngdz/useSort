type TDirection = 'asc' | 'desc'

type TSortValues = Record<string, ISort>

interface ISort {
  direction: TDirection

  active: boolean
}

interface IUseSort<T> {
  sortedData: Array<T>

  sorts: Record<keyof T, ISort>

  sortBy: (key: keyof T) => void
}

export { ISort, IUseSort, TDirection, TSortValues }
