import { CellId, CellValue, ICell, Matrix } from "../types";

export const createMatrix = (rowsNumber: number, columnsNumber: number): Matrix | null => {
    if (rowsNumber <= 0 || columnsNumber <= 0 || rowsNumber > 100 || columnsNumber > 100) {
        return null;
    }

    const matrix: Matrix = [];
    let cellIdCounter: CellId = 1;

    for (let i = 0; i < rowsNumber; i++) {
        const row: ICell[] = [];
        for (let j = 0; j < columnsNumber; j++) {
            const cell: ICell = {
                id: cellIdCounter,
                amount: Math.floor(Math.random() * 900 + 100),
            };
            cellIdCounter++;
            row.push(cell);
        }
        matrix.push(row);
    }

    return matrix;
};

export const calculateColumnAverages = (matrix: Matrix | null) => {
    if (!matrix) return null;
    const columnSums = new Array(matrix[0].length).fill(0);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            columnSums[j] += matrix[i][j].amount;
        }
    }

    const columnAverages = columnSums.map((sum) => parseFloat((sum / matrix.length).toFixed(1)));
    return columnAverages;
};

export const calculateRowSums = (matrix: Matrix | null) => {
    if (!matrix) return null;

    const rowSums = matrix.map((row) => {
        return row.reduce((sum, cell) => sum + cell.amount, 0);
    });
    return rowSums;
};

export const findClosestCells = (matrix: any, hoveredAmount: CellValue | null, appData: any) => {
    if (!matrix || !hoveredAmount) return;

    return matrix.flat()
        .sort((a: ICell, b: ICell) => Math.abs(a.amount - hoveredAmount) - Math.abs(b.amount - hoveredAmount))
        .slice(0, appData?.xValue + 1);
};

export const getFlattedMatrix = (matrix: any, hoveredCellId: number) => {
    if (!matrix) return;
    return matrix.flat().find((cell: ICell) => cell.id === hoveredCellId).amount
};

export const calculateCellValues = (row: any) => {
    const totalAmount = row.reduce((total: number, cell: ICell) => total + cell.amount, 0);

    return row.map((cell: ICell) => ({
      id: cell.id,
      amountWithPersentage: ((cell.amount / totalAmount) * 100).toFixed(2) + '%',
      amount: cell.amount,
    }));
};