import { FC } from 'react';
import './styles.css';
import { IFormInputProps } from '../../types';

const FormInput: FC<IFormInputProps> = ({label, value, min, max, onChange }) => {
  return (
		<div className='input-wrapper'>
			<label>{label}</label>
			<input
				type="number"
				value={value}
				min={min}
				max={max}
				onChange={onChange}
			/>
		</div>
  );
}

export default FormInput;