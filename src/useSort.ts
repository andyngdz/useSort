import produce from 'immer'
import { useState, useEffect } from 'react'
import { isString, head, merge, orderBy } from 'lodash'
import {
  ISort,
  ISortOptions,
  IUseSort,
  TDirection,
  TSortValues,
} from 'types/sort'

/**
 * @param data Array of data
 * @param initSort Default sort column
 * @param options `{ direction, onSortBy }` See two options below
 * @param direction Direction 'asc' | 'desc' - default 'asc'
 * @param onSortBy
 * Default sort function
 * orders of the iteratees to sort by. If `orders` is unspecified, all values
 * are sorted in ascending order. Otherwise, specify an order of "desc" for
 * descending or "asc" for ascending sort order of corresponding values.
 *
 * @category Collection
 * @param collection The collection to iterate over.
 * @param [iteratees=[_.identity]] The iteratees to sort by.
 * @param [orders] The sort orders of `iteratees`.
 * @param- {Object} [guard] Enables use as an iteratee for functions like `_.reduce`.
 * @returns Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 42 },
 *   { 'user': 'barney', 'age': 36 }
 * ];
 *
 * // sort by `user` in ascending order and by `age` in descending order
 * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
 */
const useSort = <T>(
  data: Array<T>,
  initSort: keyof T,
  options: ISortOptions<T> = {
    direction: 'asc',
  }
): IUseSort<T> => {
  const { direction, onSortBy } = options

  const dSorts = {
    [initSort]: {
      direction: direction,
      active: true,
    },
  }
  const [loading, setLoading] = useState(true)
  const [currentSort, setCurrentSort] = useState<keyof T>(initSort)
  const [sorts, setSorts] = useState<TSortValues>(dSorts)

  useEffect(() => {
    const newSorts: TSortValues = {}
    const firstRow = head(data)

    if (firstRow) {
      Object.keys(firstRow).forEach(
        (key) =>
          (newSorts[key] = {
            direction: direction,
            active: false,
          })
      )
    }

    setSorts((prevSorts) => merge(newSorts, prevSorts))
    setLoading((prevLoading) => !prevLoading)
  }, [data, direction])

  const sortBy = (key: keyof T) => {
    const currentSortFor = currentSort as string
    const sortFor = key as string

    setSorts(
      produce((draft: TSortValues) => {
        if (currentSortFor !== sortFor) {
          draft[currentSortFor].active = false
          draft[currentSortFor].direction = direction
        }

        if (!draft[sortFor].active) {
          draft[sortFor].active = true
        } else {
          const nextDirection =
            draft[sortFor].direction === 'desc' ? 'asc' : 'desc'
          draft[sortFor].direction = nextDirection
        }
      })
    )

    setCurrentSort(key)
  }

  const sortedData = onSortBy
    ? onSortBy(data)
    : orderBy(
        data,
        (item) => {
          const value = item[currentSort]
          if (isString(value)) {
            return value.toLocaleLowerCase()
          }
          return value
        },
        [sorts[currentSort as string].direction]
      )

  return { loading, sortedData, sorts: sorts as Record<keyof T, ISort>, sortBy }
}

export default useSort
export type { ISort, ISortOptions, IUseSort, TDirection, TSortValues }
