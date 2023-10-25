import { FC, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import './styles.css';
import { ICell, Matrix } from '../../types';
import {
	calculateColumnAverages,
	calculateCellValues,
	calculateRowSums,
	createMatrix,
	findClosestCells,
	getFlattedMatrix
} from '../../utils';
import TableCell from '../TableCell';
import Button from '../Button';

const Table: FC = () => {
	const { appData } = useContext(AppContext);

	const [matrix, setMatrix] = useState<Matrix | null>(null);
	const [rowSumsArr, setRowSumsArr] = useState<any>(null);
	const [columnAveragesArr, setColumnAveragesArr] = useState<any>(null);
	const [hoveredCellId, setHoveredCellId] = useState<any>(null);
	const [hoveredRow, setHoveredRow] = useState(-1);

	const incrementCellValue = (rowIndex: number, cellId: number) => {
		if (!matrix) return;

    const updatedMatrix = [...matrix];
    updatedMatrix[rowIndex] = updatedMatrix[rowIndex].map((cell) =>
      cell.id === cellId ? { ...cell, amount: cell.amount + 1 } : cell
    );

    setMatrix(updatedMatrix);
  };

	const closestCells = findClosestCells(
		matrix,
		hoveredCellId ? getFlattedMatrix(matrix, hoveredCellId) : null,
		appData
	);

	const removeRow = (index: number) => {
		if (!matrix) return;

    const newMatrix = [...matrix];
    newMatrix.splice(index, 1);
    setMatrix(newMatrix);
  };

	const addNewRow = () => {
		if (!matrix) return;

    const newRow = [];
    for (let i = 0; i < appData?.columnsNumber; i++) {
      const cell = {
        id: matrix.length * appData?.columnsNumber + i + 1,
        amount: Math.floor(Math.random() * 900 + 100),
      };
      newRow.push(cell);
    }
    setMatrix([...matrix, newRow]);
  };

	useEffect(() => {
		if(appData?.rowsNumber > 0 && appData?.columnsNumber > 0) {
			const matrix = createMatrix(appData?.rowsNumber, appData?.columnsNumber);
			setMatrix(matrix);
		}
	}, [appData?.rowsNumber, appData?.columnsNumber, appData?.xValue]);

	useEffect(() => {
		const rowSumsArr = calculateRowSums(matrix);
		setRowSumsArr(rowSumsArr);

		const columnAveragesArr = calculateColumnAverages(matrix);
		setColumnAveragesArr(columnAveragesArr);
	}, [matrix]);

	const getTableCell = (cell: ICell, rowIndex: number, hoveredRow: number ) => {
		const isRowHovered = hoveredRow === rowIndex
		return (
			<td
				key={cell.id}
				onClick={() => incrementCellValue(rowIndex, cell.id)}
				className={`
					table-cell-wrapper
					${cell.id === hoveredCellId ? 'hovered-cell' : ''}
					${closestCells && closestCells?.length > 0 &&
						closestCells?.some((closestCell: ICell) => closestCell.id === cell.id) ? 'closest-cell' : ''}
				`}
				onMouseEnter={() => setHoveredCellId(cell.id)}
				onMouseLeave={() => setHoveredCellId(null)}
			>
				<TableCell
					amount={cell.amount}
					amountWithPersentage={cell.amountWithPersentage}
					isRowHovered={isRowHovered}
				/>
			</td>
		)
	};

  return (
    <>
			{matrix && matrix?.length > 0 ? (
				<div>
					<h3 className='table-title'>Your magic table is here!</h3>
					<div  className='table-wrapper'>
						<table className='table'>
							<tbody>
								<tr className='table-row'>
									<td className='table-cell'>-</td>
									{columnAveragesArr && columnAveragesArr?.map((_column: number, rowIndex: number) => (
										<td className='table-cell' key={rowIndex}>{rowIndex + 1}</td>
									))}
									<td className='table-cell'>Sum values</td>
								</tr>
								{matrix.map((row: ICell[], rowIndex: number) => (
									<tr
										key={rowIndex}
										className={`${rowIndex === hoveredRow ? 'hovered' : ''}`}
									>
										<td className='table-cell'>
											<Button
												onClick={() => removeRow(rowIndex)}
												label={'Remove Row'}
												disabled={matrix?.length < 2}
											/>
										</td>
										{calculateCellValues(row).map((cell: ICell) => (
											getTableCell(cell, rowIndex, hoveredRow)
										))}
										<td
											className={`table-cell gradient ${rowIndex === hoveredRow ? 'hovered' : ''}`}
											onMouseEnter={() => setHoveredRow(rowIndex)}
											onMouseLeave={() => setHoveredRow(-1)}
										>
											{rowSumsArr ? rowSumsArr[rowIndex] : 0}
										</td>
									</tr>
								))}
								<tr className='table-row'>
									<td className='table-cell'>Average values</td>
									{columnAveragesArr && columnAveragesArr?.map((columnAvg: number, columnIndex: number) => (
										<td className='table-cell' key={columnIndex}>{columnAvg}</td>
									))}
									<td className='table-cell'>-</td>
								</tr>
							</tbody>
						</table>
					</div>
					<Button onClick={addNewRow} label={'Add New Row'} />
				</div>
				) : (
				<h3 className='table-title'>Your magic table will right be here!</h3>
			)}
    </>
  );
}

export default Table;