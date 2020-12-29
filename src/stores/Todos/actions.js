export const TodosActionTypes = {
  ADD_TODO: "ADD_TODO",
  SET_VISIBILITY_FILTER: "SET_VISIBILITY_FILTER",
  TOGGLE_TODO: "TOGGLE_TODO",
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE",
};

let nextTodoId = 0;
// export function addTodo(text){
//   return {
//     type: 'ADD_TODO',
//     id: nextTodoId++,
//     text
//   }
// }
// 同上
// export const addTodo = (text) => {
//   return{
//     type: 'ADD_TODO',
//     id: nextTodoId++,
//     text
//   }
// }
// 同上
export const addTodo = (text) => ({
  type: TodosActionTypes.ADD_TODO,
  id: nextTodoId++,
  text,
});

export const setVisibilityFilter = (filter) => ({
  type: TodosActionTypes.SET_VISIBILITY_FILTER,
  filter,
});

export const toggleTodo = (id) => ({
  type: TodosActionTypes.TOGGLE_TODO,
  id,
});

export const VisibilityFilters = {
  SHOW_ALL: TodosActionTypes.SHOW_ALL,
  SHOW_COMPLETED: TodosActionTypes.SHOW_COMPLETED,
  SHOW_ACTIVE: TodosActionTypes.SHOW_ACTIVE,
};
