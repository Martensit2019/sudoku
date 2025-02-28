
import { generateSudoku } from '@/utils/sudoku/sudokuGenerator'
import { getCellBlock } from './helpers'
import type { ICell, IControlValueBtn } from '@/stores/types'


// generateSudoku = (size = 9, difficulty = 30) ==================> удалить

const createGrid = (size: number, difficulty: number) => {
  console.log('startGameAction from ACT')
  const { startGrid, solvedGrid } = generateSudoku(size, difficulty)
  return solvedGrid.map((row, rowIdx) => {
    return row.map((col, colIdx) => {
      return {
        id: `${rowIdx + 1}-${colIdx + 1}`,
        row: rowIdx + 1, // number
        col: colIdx + 1, // number
        block: getCellBlock(rowIdx + 1, colIdx + 1, Math.sqrt(size)), // number
        value: col !== startGrid[rowIdx][colIdx] ? "" : col,  //string
        expectedValue: col as string,  //string
        hasError: false,
        isSimilar: false,
        isSelected: false,
        isHighlighted: false,
        isFilled: col === startGrid[rowIdx][colIdx],
        notes: [],
        notesGrid: []
      }
    })
  }).flat()
}

const setControlValueBtns = (grid: ICell[], candidates: string[]) => {
  if ((grid && !grid.length) || !candidates?.length) return
  const btns: IControlValueBtn[] = []
  const gridWithoutNull = grid?.map((cell) => {
    if (!cell.hasError) return cell.value
  }).filter(cell => cell)
  candidates.forEach((title => {
    const remained = 9 - gridWithoutNull!.filter(it => it === title).length
    btns.push({ title, remained })
  }))
  return btns
}

const setSelectedCell = (grid: ICell[], cell: ICell) => {
  const { id, row, col, block, value } = cell
  return grid.map((cell) => ({
    ...cell,
    isSelected: cell.id === id,
    isHighlighted: cell.row === row || cell.col === col || cell.block === block,
    isSimilar: Boolean(cell.value && cell.value === value),
    notesGrid: cell.notesGrid?.length ? cell.notesGrid.map(note => {
      return {
        ...note,
        isSelected: note.value === value
      }
    }) : []
  }))
}

const setNotesCellGrid = (selectedCell: ICell) => {
  const initial = [
    {
      value: '1',
      position: 1,
      isSelected: false
    },
    {
      value: '2',
      position: 2,
      isSelected: false
    },
    {
      value: '3',
      position: 3,
      isSelected: false
    },
    {
      value: '4',
      position: 4,
      isSelected: false
    },
    {
      value: '5',
      position: 5,
      isSelected: false
    },
    {
      value: '6',
      position: 6,
      isSelected: false
    },
    {
      value: '7',
      position: 7,
      isSelected: false
    },
    {
      value: '8',
      position: 8,
      isSelected: false
    },
    {
      value: '9',
      position: 9,
      isSelected: false
    }
  ]
  return initial.map((it) => ({
    ...it,
    value: selectedCell.notes.includes(it.value) ? it.value : null
  }))
}

const updateNotesCellGrid = (notes: any, val: any) => {
  const initial = [
    {
      value: '1',
      position: 1,
      isSelected: false
    },
    {
      value: '2',
      position: 2,
      isSelected: false
    },
    {
      value: '3',
      position: 3,
      isSelected: false
    },
    {
      value: '4',
      position: 4,
      isSelected: false
    },
    {
      value: '5',
      position: 5,
      isSelected: false
    },
    {
      value: '6',
      position: 6,
      isSelected: false
    },
    {
      value: '7',
      position: 7,
      isSelected: false
    },
    {
      value: '8',
      position: 8,
      isSelected: false
    },
    {
      value: '9',
      position: 9,
      isSelected: false
    }
  ]

  return initial.map((it) => ({
    ...it,
    value: notes.includes(it.value) ? it.value : null
  }))



}






export default {
  createGrid,
  setControlValueBtns,
  setSelectedCell,
  setNotesCellGrid,
  updateNotesCellGrid
}