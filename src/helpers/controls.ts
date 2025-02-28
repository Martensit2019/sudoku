import type { ICell } from '@/stores/types'

export const getPossibleCandidates = (grid: ICell[]): string[] => Array.from({
  length: Math.sqrt(grid.length)
}, (_, idx) => (idx + 1).toString())
