import './ToDoInsert.scss';
import { MdAdd } from 'react-icons/md';
import { useCallback, useState } from 'react';

function ToDoInsert({ onInsert }) {
  const [value, setValue] = useState('');
  const [dueDate, setDueDate] = useState('');

  const onChangeValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  const onChangeDueDate = useCallback((e) => {
    setDueDate(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // Check if both text and due date are provided
      if (value.trim() && dueDate.trim()) {
        onInsert(value, dueDate);
        setValue('');
        setDueDate('');
      }
    },
    [onInsert, value, dueDate],
  );
  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Write your task"
        value={value}
        onChange={onChangeValue}
      />
      <input
         type="date"
         onChange={onChangeDueDate}
         value={dueDate}
         placeholder="Due date"
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
}


export default ToDoInsert;
