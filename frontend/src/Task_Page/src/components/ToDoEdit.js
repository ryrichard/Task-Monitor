import { useCallback, useEffect, useState } from 'react';
import './ToDoEdit.scss';

function ToDoEdit({ insertToggle, selectedTodo, onUpdate }) {
  const [value, setValue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  const onChangeDueDate = useCallback((e) => {
    setDueDate(e.target.value);
  }, []);
  const onSubmit = useCallback(
    (e) => {
      onUpdate(selectedTodo.id, value, dueDate);
      setValue(''); //Initialize value
      setDueDate('');
      //Prevent refresh
      e.preventDefault();
    },
    [onUpdate, value, dueDate],
  );
  useEffect(() => {
    if (selectedTodo) {
      setValue(selectedTodo.text);
      setDueDate(selectedTodo.dueDate || '');
    }
  }, [selectedTodo]);
  return (
    <div className="background">
      <form onSubmit={onSubmit} className="todoedit__insert">
        <h2>Edit</h2>
        <input
          onChange={onChange}
          value={value}
          placeholder="Put your task"
        />
        <input
          type="date"
          onChange={onChangeDueDate}
          value={dueDate}
          placeholder="Due date"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default ToDoEdit;
