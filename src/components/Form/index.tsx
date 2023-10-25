import { ChangeEvent, FC, FormEvent, useContext, useState } from 'react';
import { AppContext } from '../../App';
import './styles.css';
import FormInput from '../FormInput';
import Button from '../Button';

const Form: FC = () => {
	const { setAppData } = useContext(AppContext);

  const [rowsNumber, setRowsNumber] = useState(1);
  const [columnsNumber, setColumnsNumber] = useState(1);
  const [xValue, setXValue] = useState(0);

  const handleRowsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsNumber(Number(event.target.value));
  };

  const handleColumnsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColumnsNumber(Number(event.target.value));
  };

  const handleXValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setXValue(Number(event.target.value));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

		setAppData({
			rowsNumber,
			columnsNumber,
			xValue,
		});
  };

  return (
    <div className='form-wrapper'>
      <h1 className='form-title'>Write Values For Your Table</h1>
      <form onSubmit={handleSubmit}>
				<FormInput
					label={'Rows Number'}
					value={rowsNumber}
					min={1}
					max={100}
					onChange={handleRowsChange}
				/>
				<FormInput
					label={'Columns Number'}
					value={columnsNumber}
					min={1}
					max={100}
					onChange={handleColumnsChange}
				/>
				<FormInput
					label={'X Value'}
					value={xValue}
					min={0}
					max={(rowsNumber * columnsNumber) - 1}
					onChange={handleXValueChange}
				/>
        <Button
					type="submit"
					label={'Generate Table'}
				/>
      </form>
    </div>
  );
}

export default Form;