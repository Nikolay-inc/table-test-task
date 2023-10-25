import { FC } from 'react';
import { ITableCellProps } from '../../types';
import './styles.css';

const TableCell: FC<ITableCellProps> = ({ amount, amountWithPersentage,isRowHovered }) => {
  return (
    <div className={isRowHovered ? 'table-cell-main table-cell-gradient' : 'table-cell-main'}>
      {isRowHovered ? amountWithPersentage : amount}
    </div>
  );
}

export default TableCell;