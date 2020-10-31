import produce from 'immer'
import { useState, useEffect } from 'react'
import { isString, head, merge, orderBy } from 'lodash'
import { ISort, IUseSort, TDirection, TSortValues } from 'types/sort'

const useSort = <T>(
  data: Array<T>,
  initSort: keyof T,
  direction: TDirection = 'asc',
  onSortBy = orderBy
): IUseSort<T> => {
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

  const sortedData = onSortBy(
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
export type { ISort, IUseSort, TDirection, TSortValues }
