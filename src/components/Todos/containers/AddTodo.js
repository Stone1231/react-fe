import React from "react";
import { connect } from "react-redux";
import { addTodo } from "stores/Todos/actions";
import { useDispatch } from "stores/index";

const AddTodo = () => {
  const dispatch = useDispatch();
  let input;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addTodo(input.value));
          input.value = "";
        }}
      >
        <input ref={(node) => (input = node)} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
