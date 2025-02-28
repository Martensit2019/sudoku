/**
 * Создаем пустую квадратную сетку заданного размера
 * @param size Размер сетки (количество строк и столбцов)
 * @returns Двумерный массив заполненный null значениями
 */
const createEmptyGrid = (size: number): (null[])[] => new Array(size).fill(null).map(() => new Array(size).fill(null))

/**
 * Перемешиваем массив случайным образом используя алгоритм Фишера-Йейтса
 * @param array Исходный массив для перемешивания
 * @returns Перемешанный массив
 */

const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i >= 0; i--) {
    const rndIdx = Math.floor(Math.random() * (i + 1));
    [array[i], array[rndIdx]] = [array[rndIdx], array[i]]
  }
  return array
}

/**
 * Создаем и перемешиваем массив строковых значений от 1 до size
 * @param size Размер массива
 * @returns Перемешанный массив строковых значений
 */
const getRandomValuesSet = (size: number): string[] => {
  const arr = Array.from({ length: size }, (_, idx) => (idx + 1).toString())
  return shuffleArray(arr)
}

/**
 * Инициализирум сетку случайным образом заданными значениями
 * @param grid Двумерный массив для инициализации
 * @param values Массив значений для заполнения сетки
 * @returns Заполненная сетка
 */
const getInitialGrid = (grid: (null | string)[][], values: string[]): (null | string)[][] => {
  // console.log('grid', grid);
  // console.log('values', values);
  
  
  const size = grid.length
  let i = 0

  while (i < size) {
    // Генерируем случайные координаты в пределах размера сетки
    const rndRow = Math.floor(Math.random() * size)
    const rndCol = Math.floor(Math.random() * size)

    // Если ячейка пуста (null), заполняем её текущим значением
    if (grid[rndRow][rndCol] === null) {
      grid[rndRow][rndCol] = values[i]
      i++
    }
  }

  return grid
}

/**
 * Решаем судоку методом рекурсии с обратным ходом
 * @param grid Двумерный массив с пустыми ячейками (null) и заполненными числами
 * @returns Заполненную доску Судоку
 */
const getSolveSudoku = (grid: (string | null)[][]): (string | null)[][] => {
  const EMPTY: null = null
  const GRID_SIZE: number = grid.length
  const BOX_SIZE: number = Math.sqrt(GRID_SIZE)

  // Возможные значения для ячеек Судоку
  const possibleCandidates: string[] = Array.from({
    length: grid.length
  }, (_, idx) => (idx + 1).toString())

  // Поиск всех пустых ячеек
  const emptyCells: { row: number; col: number }[] = []

  // Инициализация списка пустых ячеек
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === EMPTY) {
        emptyCells.push({ row, col })
      }
    }
  }

  /**
   * Проверяем, можно ли разместить число в данной позиции
   * @param grid Сетка Судоку
   * @param row Номер строки
   * @param col Номер столбца
   * @param number Число для проверки
   * @returns true если число можно разместить, false если нет
   */
  const isValid = (
    grid: (string | null)[][],
    row: number,
    col: number,
    number: string
  ): boolean => {
    // Проверка строки и столбца
    for (let i = 0; i < GRID_SIZE; i++) {
      if (grid[row][i] === number || grid[i][col] === number) {
        return false
      }

      // Проверка квадрата
      const startRow = Math.floor(row / BOX_SIZE) * BOX_SIZE
      const startCol = Math.floor(col / BOX_SIZE) * BOX_SIZE

      for (let i = startRow; i < startRow + BOX_SIZE; i++) {
        for (let j = startCol; j < startCol + BOX_SIZE; j++) {
          if (grid[i][j] === number) return false
        }
      }
    }
    return true
  }

  /**
   * Рекурсивная функция решения с обратным ходом
   * @param emptyCellIdx Индекс текущей пустой ячейки
   * @returns true если решение найдено, false если нет
   */
  const recurse = (emptyCellIdx: number): boolean => {
    // Базовый случай: все ячейки заполнены
    if (emptyCellIdx >= emptyCells.length) return true

    const { row, col } = emptyCells[emptyCellIdx]

    // Попытка каждого возможного числа
    for (let i = 0; i < possibleCandidates.length; i++) {
      const num = possibleCandidates[i]

      if (isValid(grid, row, col, num)) {
        grid[row][col] = num

        // Рекурсивная попытка заполнить остальные ячейки
        if (recurse(emptyCellIdx + 1)) return true

        // Обратный ход если решение не найдено
        grid[row][col] = EMPTY
      }
    }
    return false
  }

  // Запуск процесса решения
  recurse(0)
  return grid
}

/**
 * Создаем судоку путем случайного удаления значений из решенной доски
 * @param grid Решенная доска Судоку
 * @param difficulty Количество ячеек для удаления
 * @returns Доска Судоку с удаленными значениями
 */
const removeRandomValues = (
  grid: (string | null)[][],
  difficulty: number
): (string | null)[][] => {
  // Создаем глубокую копию доски
  const resultGrid = [...grid].map(row => [...row])

  let i = 0
  while (i < difficulty) {
    // Генерируем случайные координаты
    const rowRnd = Math.floor(Math.random() * grid.length)
    const columnRnd = Math.floor(Math.random() * grid.length)

    // Удаляем значение только если ячейка не пуста
    if (resultGrid[rowRnd][columnRnd] !== null) {
      resultGrid[rowRnd][columnRnd] = null
      i++
    }
  }

  return resultGrid
}

export const generateSudoku = (size = 9, difficulty = 30) => {
  const sudoku = createEmptyGrid(size)
  // console.table(sudoku)
  const randomValuesSet = getRandomValuesSet(size)
  // console.log('randomValuesSet', randomValuesSet)
  const initialGrid = getInitialGrid(sudoku, randomValuesSet)
  console.table(initialGrid)
  const solvedGrid = getSolveSudoku(initialGrid)
  // console.table(solvedGrid)
  const startGrid = removeRandomValues(solvedGrid, difficulty)
  console.table(startGrid)
  console.log('ddd startGrid', startGrid);
  console.log('ddd solvedGrid', solvedGrid);
  
  return {
    startGrid,
    solvedGrid
  }
}