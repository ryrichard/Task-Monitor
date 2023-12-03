import React, { useCallback, useEffect, useState, useMemo } from 'react';
import ToDoListItem from './ToDoListItem';
import './TodoList.scss';
import { List } from 'react-virtualized';

function TodoList({
  todos,
  onRemove,
  onToggle,
  onChangeSelectedTodo,
  onInsertToggle,
  updateDueDate,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth - 100);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth - 100);
  };
  useEffect(() => {
    // Attach event listener on component mount
    window.addEventListener('resize', updateWindowWidth);

    // Detach event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);
  const sortedTodos = useMemo(() => {
    // Sort todos based on due date in ascending order
    return [...todos].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA - dateB;
    });
  }, [todos]);
  const rowRender = useCallback(
    ({ index, key, style }) => {
      const todo = sortedTodos[index];
      return (
        <ToDoListItem
          todo={todo}
          key={key}
          onToggle={onToggle}
          onRemove={onRemove}
          onInsertToggle={onInsertToggle}
          onChangeSelectedTodo={onChangeSelectedTodo}
          updateDueDate={updateDueDate}
          style={style}
        />
      );
    },
    [sortedTodos, onRemove, onToggle, onChangeSelectedTodo, onInsertToggle],
  );

  return (
    <List
      className="TodoList"
      width={windowWidth} // 전체너비
      height={513} // 전체 높이
      rowCount={todos.length} //항목갯수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRender} //항목을 렌더링할 때 쓰는 함수
      list={sortedTodos} //배열
      style={{ outline: 'none' }} //List에 기본 적용되는 outline 스타일 제거
    />
  );
}

export default React.memo(TodoList);
