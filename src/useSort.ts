import produce from 'immer'
import { useState, useEffect } from 'react'
import { ISort, IUseSort, TDirection, TSortValues } from 'types/sort'
import { head, merge, orderBy } from 'lodash'

const useSort = <T extends Record<string, string>>(
  data: Array<T>,
  defaultSort: keyof T,
  defaultDirection: TDirection = 'asc'
): IUseSort<T> => {
  const defaultSorts = {
    [defaultSort]: {
      direction: defaultDirection,
      active: true,
    },
  }
  const [currentSort, setCurrentSort] = useState<keyof T>(defaultSort)
  const [sorts, setSorts] = useState<TSortValues>(defaultSorts)

  useEffect(() => {
    const newSorts: TSortValues = {}
    const firstRow = head(data)

    if (firstRow) {
      Object.keys(firstRow).forEach(
        (key) =>
          (newSorts[key] = {
            direction: defaultDirection,
            active: false,
          })
      )
    }

    setSorts((prevSorts) => merge(newSorts, prevSorts))
  }, [data, defaultDirection])

  const sortBy = (key: keyof T) => {
    const currentSortFor = currentSort as string
    const sortFor = key as string

    setSorts(
      produce((draft: TSortValues) => {
        if (currentSortFor !== sortFor) {
          draft[currentSortFor].active = false
          draft[currentSortFor].direction = defaultDirection
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

  const sortedData = orderBy(data, (item) => item[currentSort].toLowerCase(), [
    sorts[currentSort as string].direction,
  ])

  return { sortedData, sorts: sorts as Record<keyof T, ISort>, sortBy }
}

export default useSort
