import { FC, useState, createContext } from 'react';
import Form from './components/Form';
import { IAppContext } from './types';
import './App.css';
import Table from './components/Table';

export const AppContext = createContext<any>(null);

const App: FC = () => {
  const [appData, setAppData] = useState<IAppContext | null>(null);

  return (
    <AppContext.Provider value={{appData, setAppData}}>
      <div className='main-container'>
        <Form />
        <div className='divider' />
        <Table />
      </div>
    </AppContext.Provider>
  );
}

export default App;
