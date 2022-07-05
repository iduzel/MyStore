import React, { useRef } from "react";
import "./styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const Inputfield: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="inputField"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef?.current?.blur();
      }}
    >
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        type="input"
        placeholder="Add a task"
        className="input__box"
      />
      <button className="input_submit" type="submit">
        ADD
      </button>
    </form>
  );
};

export default Inputfield;
