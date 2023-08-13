import { useRecoilValue, useSetRecoilState } from "recoil";
import { ITodo, categoriesState, toDoState } from "../atoms";
import { styled } from "styled-components";

const LiToDo = styled.li`
  display: grid;
  grid-template-rows: 1fr 1fr;
  padding: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.boxColor};
  font-size: 20px;
  overflow-wrap: break-word;
`;

const ButtonCategory = styled.button`
  border-radius: 5px;
  border-style: solid;
  border: 1px;
  margin: 10px 3px 3px 0px;
`;

const ToDoTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

function ToDo({ text, category, id }: ITodo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);

  const createDate = new Date(id).toLocaleString("ko-KR");
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    if (name === "delete" && window.confirm("삭제하시겠습니까?")) {
      setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        return [
          ...oldToDos.slice(0, targetIndex),
          ...oldToDos.slice(targetIndex + 1),
        ];
      });
    } else if (name !== "delete") {
      setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        const newToDo = { text, id, category: name as any };
        return [
          ...oldToDos.slice(0, targetIndex),
          newToDo,
          ...oldToDos.slice(targetIndex + 1),
        ];
      });
    }
  };
  return (
    <LiToDo>
      <ToDoTitle>
        <div>{text}</div>
        <div style={{ fontSize: "9pt", color: "grey", whiteSpace: "nowrap" }}>
          {createDate}
        </div>
      </ToDoTitle>

      <div>
        <ButtonCategory
          style={{
            color: "#D32F2F",
          }}
          onClick={onClick}
          name="delete"
        >
          Delete
        </ButtonCategory>
        {categories.map((item) => (
          <ButtonCategory
            key={item}
            disabled={item === category}
            name={item}
            onClick={onClick}
          >
            {item}
          </ButtonCategory>
        ))}
      </div>
    </LiToDo>
  );
}

export default ToDo;
