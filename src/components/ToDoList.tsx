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
  width: 150px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  /* color: #d32f2f; */
  color: ${(props) => props.theme.accentColor};
  background-color: white;
  padding: 0px 10px;
  border-radius: 20px;
  border-style: solid;
  opacity: 0.7;
  cursor: pointer;
  &:disabled {
    color: ${(props) => props.theme.textColor};
    cursor: default;
    opacity: 0.5;
    background: ${(props) => props.theme.btnColor};
  }
`;

const ContainerCategory = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr;
  justify-items: flex-start;
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
  -moz-appearance: none;*/
  appearance: none;
  width: 200px;
  line-height: 1.5;
  border-radius: 20px;
  border-style: solid;
  padding: 0px 20px;
  font-size: 16px;
  font-weight: 500;
  font-family: inherit;
  background-color: ${(props) => props.theme.componentBgColor};
  color: inherit;
  background: url("./arrow.png") no-repeat 97% 50%/15px auto;
`;

function ToDoList() {
  const setDarkAtom = useSetRecoilState(isDarkMode);
  const toDos = useRecoilValue(toDoSelector);
  const setToDos = useSetRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm<ICategoryForm>();

  const toggleDark = () => setDarkAtom((prev: string) => !prev);

  const deleteCategory = () => {
    if (
      window.confirm(
        "카테고리 및 카테고리의 ToDo들이 삭제 됩니다. 계속하시겠습니까?"
      )
    ) {
      setCategories((oldCategories) => {
        const targetIndex = oldCategories.findIndex(
          (cate) => cate === category
        );
        return [
          ...oldCategories.slice(0, targetIndex),
          ...oldCategories.slice(targetIndex + 1),
        ];
      });
      setToDos((oldToDos) => {
        return oldToDos.filter((toDo) => toDo.category !== category);
      });
      setCategory(Categories.TO_DO);
    }
  };

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
              placeholder="Write a New Category"
            />
          </form>
          <div></div>
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
            Delete Category
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
