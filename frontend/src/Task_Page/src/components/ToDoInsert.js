import './ToDoInsert.scss';
import { MdAdd } from 'react-icons/md';
import { useCallback, useState } from 'react';

function ToDoInsert({ onInsert }) {
  const [value, setValue] = useState('');
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onInsert(value);
      setValue(''); //Initialize Value
      //Prevent refresh
      e.preventDefault();
    },
    [onInsert, value],
  );
  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input onChange={onChange} value={value} placeholder="Write your task" />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
}

export default ToDoInsert;
