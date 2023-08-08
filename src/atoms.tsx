import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum Categories {
  "TO_DO" = "ToDo",
  "DOING" = "Doing",
  "DONE" = "Done",
}

const { persistAtom: themePersist } = recoilPersist({
  key: "themeMJ",
  storage: localStorage,
});

const { persistAtom: toDoPersist } = recoilPersist({
  key: "toDoMJ",
  storage: localStorage,
});

const { persistAtom: categoryPersist } = recoilPersist({
  key: "categoryMJ",
  storage: localStorage,
});

export interface ITodo {
  text: string;
  id: number;
  category: Categories;
}

export const isDarkMode = atom({
  key: "isDark",
  default: true,
  effects_UNSTABLE: [themePersist],
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const categoriesState = atom<Categories[]>({
  key: "categories",
  default: [Categories.TO_DO, Categories.DOING, Categories.DONE],
  effects_UNSTABLE: [categoryPersist],
});

export const toDoState = atom<ITodo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [toDoPersist],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
