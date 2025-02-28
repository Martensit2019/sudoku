export interface INotesGrid {
  value: string
  isSelected: boolean
}

export interface ICell {
  id: string
  row: number
  col: number
  block: number
  value: string | null
  expectedValue: string
  hasError: boolean
  isSimilar: boolean
  isSelected: boolean
  isHighlighted: boolean
  isFilled: boolean
  notes: string[]
  notesGrid: INotesGrid[]
}

export interface IControlValueBtn {
  title: string
  remained: number
}


export interface IDifficulty {
  name: string
  value: string
  empty: number
}

export interface IActionBtns {
  img: string
  title: string
  action: string
  isActive?: boolean
}