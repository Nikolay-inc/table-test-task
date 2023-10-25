import { FC } from 'react';
import { IButtonProps } from '../../types';
import './styles.css';

const Button: FC<IButtonProps> = ({ onClick, label, disabled = false, type = 'button' }) => {
  return (
    <button
			className='base-button'
			onClick={onClick}
			disabled={disabled}
			type={type}
		>
			{label}
		</button>
  );
};

export default Button;
