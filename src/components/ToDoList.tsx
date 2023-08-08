import CreateToDo from "./CreateToDo";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";
import ToDo from "./ToDo";
import { Helmet } from "react-helmet";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(toDos);
  return (
    <>
      <Helmet>
        <title>📝 To Do App by MJHan</title>
      </Helmet>
      <div>
        <h1>To Dos</h1>
        <hr />
        <select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing...</option>
          <option value={Categories.DONE}>Done</option>
        </select>
        <CreateToDo />
        <ul>
          {toDos.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default ToDoList;
