export type TodoModel = {
  id: string;
  text: string,
  important: boolean,
  urgent: boolean,
};

export type AreaName = "Do" | "Schedule" | "Delegate" | "Eliminate";

export type AreaModel = {
  name: AreaName,
  important: boolean,
  urgent: boolean,
}

export const initialAreas: AreaModel[] = [
  { name: "Do", important: true, urgent: true },
  { name: "Schedule", important: true, urgent: false },
  { name: "Delegate", important: false, urgent: true },
  { name: "Eliminate", important: false, urgent: false },
]