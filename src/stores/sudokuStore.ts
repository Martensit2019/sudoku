import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import actions from './actions'
import { getPossibleCandidates } from './helpers'
import type { ICell, IControlValueBtn, IDifficulty } from '@/stores/types'
import { initGrid000 } from './initData'  // временное состояние игры

export const useSudokuStore = defineStore('sudoku-store', () => {

  const initialGrid = ref<ICell[]>([])
  const grid = ref<ICell[]>([])
  const stack = ref([])
  const possibleCandidates = ref<string[]>()
  const controlValueBtns = ref<IControlValueBtn[]>()

  const game = reactive({
    isStart: true,
    hasBegun: false,
    boardSize: 9,
    difficulty: () => {},
    isShowNotes: false,
    isPaused: false,
    mistakes: 0,
    maxMistakes: 3,
    hints: 3,
    maxHints: 3,
    results: ''
  })

  const selectedCell = computed(() => grid.value?.length ? grid.value?.find(cell => cell.isSelected) : null)
  const selectedCellIdx = computed(() => selectedCell.value ? grid.value?.findIndex((cell) => cell.id === selectedCell.value?.id) : null)

  const startGame = (boardSize: number, difficulty: IDifficulty) => {
    grid.value = actions.createGrid(boardSize, difficulty.empty)
    // grid.value = initGrid000  // временное состояние игры
    if (grid.value) {
      initialGrid.value = [...grid.value]
      possibleCandidates.value = getPossibleCandidates(grid.value)
      controlValueBtns.value = actions.setControlValueBtns(grid.value, possibleCandidates.value)
      game.hasBegun = true
      game.difficulty = difficulty as any
    }
  }

  const startOver = () => {
    grid.value = [...initialGrid.value]
    game.mistakes = 0
    game.hints = 3
    game.results = ''
  }

  const newGame = () => {
    game.isStart = false
    game.hasBegun = false
    game.isShowNotes = false
    game.mistakes = 0
    game.hints = 3
    game.results = ''
  }

  const setSelectedCell = (cell: ICell) => {
    grid.value = actions.setSelectedCell(grid.value, cell)
  }

  const setNotesCell = (val: string) => {
    if (!game.isShowNotes || !grid.value.length || selectedCellIdx.value === null || !val) return
    if (grid.value[selectedCellIdx.value].notes.includes(val)) {
      const idx = grid.value[selectedCellIdx.value].notes.indexOf(val)
      if (idx !== -1) grid.value[selectedCellIdx.value].notes.splice(idx, 1)
      if (!grid.value[selectedCellIdx.value].notes.length) grid.value[selectedCellIdx.value].value = null
    } else {
      grid.value[selectedCellIdx.value].notes.push(val)
    }
  }

  const updateNotesCell = (notes: string[], val: string) => {
    const res = [...notes]
    const idx = res.indexOf(val)
    if (idx !== -1) res.splice(idx, 1)
    return res
  }

  const setNotesCellGrid = () => {
    if (!game.isShowNotes || !grid.value.length || selectedCellIdx.value === null) return
    if (selectedCell.value) grid.value[selectedCellIdx.value].notesGrid = actions.setNotesCellGrid(selectedCell.value) as any
  }

  const addMistake = () => {
    if (game.mistakes < game.maxMistakes) game.mistakes++
    if (game.mistakes === game.maxMistakes) {
      game.results = "lost"
    }
  }


  const setCellValue = (val: string | null) => {
    if (!selectedCell.value || selectedCell.value?.isFilled || game.isPaused) return
    if (game.isShowNotes && val) {
      if (selectedCell.value.value) return
      setNotesCell(val)
      setNotesCellGrid()
    } else {
      grid.value![selectedCellIdx.value!].notes = []
      grid.value = grid.value!.map(cell => ({
        ...cell,
        value: cell.id === selectedCell.value?.id ? val : cell.value,
      }))
      grid.value = grid.value!.map(cell => ({
        ...cell,
        hasError: Boolean(cell.value && cell.value !== cell.expectedValue)
      }))
      if (selectedCell.value?.value === selectedCell.value?.expectedValue) {
        grid.value = grid.value!.map((cell) => ({
          ...cell,
          isSimilar: Boolean(cell.value && cell.value === val),
          notes: Boolean(cell.isHighlighted && cell.notes.length) ? updateNotesCell(cell.notes, val!) : cell.notes
        }))
        grid.value = grid.value!.map((cell) => ({
          ...cell,
          notesGrid: Boolean(cell.isHighlighted && cell.notes.length) ? actions.updateNotesCellGrid(cell.notes, val!) : cell.notesGrid
        })) as any
      }
      if (grid.value.every((cell) => cell.value !== "" && cell.value === cell.expectedValue)) {
        game.results = "won"
      }
      if (possibleCandidates.value) controlValueBtns.value = actions.setControlValueBtns(grid.value, possibleCandidates.value)
    }
    if (selectedCell.value.value !== null && val !== selectedCell.value.expectedValue && !game.isShowNotes) {
      addMistake()
    }
  }

  const undo = () => {
    stack.value.pop()
    const aa = stack.value.pop()
    grid.value = JSON.parse(aa as any)
    
    
  }

  const clearCellValue = () => {    
    if(!selectedCell.value || selectedCell.value.value === selectedCell.value.expectedValue) return
    setCellValue(null)
  }

  const setCellValueByHint = () => {    
    if(!selectedCell.value || !game.hints || game.isShowNotes) return
    setCellValue(selectedCell.value.expectedValue)
    game.hints--
    
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (!selectedCell.value || game.isPaused) return
    const { row, col, isFilled, expectedValue } = selectedCell.value
    const key = e.key
    if (['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].includes(key)) {
      if (key === 'ArrowUp' && row !== 1) {
        grid.value = grid.value!.map((cell) => ({
          ...cell,
          isSelected: cell.row === row - 1 && cell.col === col
        }))
      }
      if (key === 'ArrowDown' && row !== 9) {
        grid.value = grid.value!.map((cell) => ({
          ...cell,
          isSelected: cell.row === row + 1 && cell.col === col
        }))
      }
      if (key === 'ArrowLeft' && col !== 1) {
        grid.value = grid.value!.map((cell) => ({
          ...cell,
          isSelected: cell.row === row && cell.col === col - 1
        }))
      }
      if (key === 'ArrowRight' && col !== 9) {
        grid.value = grid.value!.map((cell) => ({
          ...cell,
          isSelected: cell.row === row && cell.col === col + 1
        }))
      }
    }
    if (isFilled) return
    if (e.key === "Delete" || e.key === "Backspace") {
      setCellValue(null)
    }
    if (/[1-9]/.test(key)) {
      setCellValue(key)
      // if (key !== expectedValue && !game.isShowNotes) {
      //   addMistake()
      // }
    }
  }

  const changeStatusNotes = (status: boolean) => {
    game.isShowNotes = status
  }

  return {
    grid,
    game,
    possibleCandidates,
    controlValueBtns,
    selectedCell,
    selectedCellIdx,
    stack,
    startGame,
    startOver,
    newGame,
    setSelectedCell,
    setCellValue,
    handleKeydown,
    changeStatusNotes,
    clearCellValue,
    setCellValueByHint,
    undo
  }
})
