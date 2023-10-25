import { ChangeEvent } from "react";

export type CellId = number;
export type CellValue = number;
export type CellPersantageValue = number;
export type Matrix = ICell[][];

export interface IAppContext {
    appData: any;
    setAppData: React.Dispatch<React.SetStateAction<any>>;
}

export interface ICell {
    id: CellId;
    amount: CellValue;
    amountWithPersentage?: CellPersantageValue;
};

export interface IFormInputProps {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IButtonProps {
    onClick?: () => void;
    label: string;
    disabled?: boolean;
    type?: "button" | "reset" | "submit" | undefined;
}

export interface ITableCellProps {
    amount: CellValue;
    amountWithPersentage: CellPersantageValue | undefined;
    isRowHovered: boolean;
}