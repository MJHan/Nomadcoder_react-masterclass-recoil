import CreateToDo from "./CreateToDo";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  categoriesState,
  categoryState,
  toDoSelector,
  toDoState,
} from "../atoms";
import ToDo from "./ToDo";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { isDarkMode } from "../atoms";
import { styled } from "styled-components";

interface ICategoryForm {
  newCategory: string;
}

const Container = styled.div`
  width: 50vw;
  height: 90vh;
  padding: 10px;
`;

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  padding-bottom: 30px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) => props.theme.accentColor};
  opacity: 0.7;
  padding: 7px 10px;
  border-radius: 20px;
  color: ${(props) => props.theme.textColor};
  a {
    display: block;
  }
  &hover {
    ${(props) => props.theme.accentColor};
  }
  cursor: pointer;
`;

const ButtonDelete = styled.button`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.btnColor};
  padding: 0px 10px;
  border-radius: 20px;
  border-style: none;
  opacity: 0.7;
  cursor: pointer;
  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: ${(props) => props.theme.bgColor};
  }
`;

const ContainerCategory = styled.div`
  display: flex;
  gap: 10px;
  padding-bottom: 10px;
`;

const InputCategory = styled.input`
  width: 200px;
  border-radius: 20px;
  border-style: solid;
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${(props) => props.theme.componentBgColor};
  color: inherit;
`;

const SelectCategory = styled.select`
  /* -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("/src/arrow.png") no-repeat right 24px center; */
  width: 200px;
  border-radius: 20px;
  border-style: solid;
  padding: 0px 10px;
  font-size: 16px;
  font-weight: 500;
  background-color: ${(props) => props.theme.componentBgColor};
  color: inherit;
  line-height: 1.5;
`;

function ToDoList() {
  const setDarkAtom = useSetRecoilState(isDarkMode);
  const toggleDark = () => setDarkAtom((prev: string) => !prev);
  const { register, handleSubmit, setValue } = useForm<ICategoryForm>();
  const toDos = useRecoilValue(toDoSelector);
  const setToDos = useSetRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const deleteCategory = () => {
    setCategories((oldCategories) => {
      const targetIndex = oldCategories.findIndex((cate) => cate === category);
      return [
        ...oldCategories.slice(0, targetIndex),
        ...oldCategories.slice(targetIndex + 1),
      ];
    });
    setToDos((oldToDos) => {
      return oldToDos.filter((toDo) => toDo.category !== category);
    });
    setCategory(Categories.TO_DO);
  };
  console.log("after delete categories: ", categories);
  console.log("after delete todos: ", toDos);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const handleValid = ({ newCategory }: ICategoryForm) => {
    setValue("newCategory", "");
    if ((categories as any[]).includes(newCategory)) {
      alert("같은 이름의 카테고리가 이미 있어서 추가할 수 없습니다.");
      return;
    }
    setCategories([...(categories as string[]), newCategory as any]);
    setCategory(newCategory as any);
  };
  return (
    <Container>
      <Helmet>
        <title>📝 To Do App by MJHan</title>
      </Helmet>
      <ButtonWrapper>
        <Button onClick={toggleDark}>Switch Theme</Button>
      </ButtonWrapper>
      <div>
        <H1>To Dos</H1>
        <ContainerCategory>
          <SelectCategory id="cate" value={category} onInput={onInput}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </SelectCategory>
          <form onSubmit={handleSubmit(handleValid)}>
            <InputCategory
              {...register("newCategory")}
              placeholder="New Category"
            />
          </form>

          <ButtonDelete
            disabled={
              category === Categories.DOING ||
              category === Categories.DONE ||
              category === Categories.TO_DO
                ? true
                : false
            }
            name={category}
            onClick={deleteCategory}
          >
            Delete '{category}' Category
          </ButtonDelete>
        </ContainerCategory>
        <hr />
        <CreateToDo />

        <ul>
          {toDos.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ul>
      </div>
    </Container>
  );
}

export default ToDoList;
