import { useCallback, useEffect, useState } from 'react';
import './ToDoEdit.scss';

function ToDoEdit({ insertToggle, selectedTodo, onUpdate }) {
  const [value, setValue] = useState('');
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  const onSubmit = useCallback(
    (e) => {
      onUpdate(selectedTodo.id, value);
      setValue(''); //Initialize value
      //Prevent refresh
      e.preventDefault();
    },
    [onUpdate, value],
  );
  useEffect(() => {
    if (selectedTodo) {
      setValue(selectedTodo.text);
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
        <button type="submit">Edit</button>
      </form>
    </div>
  );
}

export default ToDoEdit;
