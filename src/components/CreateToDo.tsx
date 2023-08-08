import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";

interface IForm {
  toDo: string;
}

const ContainerCreateToDo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
`;

const ErrorSpan = styled.span`
  padding: 5px 10px;
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => props.theme.accentColor};
`;

const InputToDo = styled.input`
  width: 92%;
  border-radius: 15px;
  border-style: solid;
  padding: 10px 5px 5px 5px;
  font-size: 16px;
  background-color: transparent;
  color: inherit;
`;

const FormToDo = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px;
`;

const ButtonAdd = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 500;
  background-color: ${(props) => props.theme.btnColor};
  opacity: 0.7;
  padding: 7px 10px;
  border-radius: 20px;
  border-width: 0px;
  color: ${(props) => props.theme.bgColor};
  a {
    display: block;
  }
  &hover {
    ${(props) => props.theme.textColor};
  }
  cursor: pointer;
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <ContainerCreateToDo>
      <FormToDo onSubmit={handleSubmit(handleValid)}>
        <InputToDo
          {...register("toDo", { required: "Please write a To Do" })}
          placeholder="Write a to do"
        />
        <ButtonAdd>Add</ButtonAdd>
      </FormToDo>
      <ErrorSpan>{errors?.toDo?.message}</ErrorSpan>
    </ContainerCreateToDo>
  );
}

export default CreateToDo;
