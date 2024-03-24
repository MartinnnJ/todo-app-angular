export default class TodoCheckboxUpdate {
  constructor(
    public todoId: string,
    public oldCheckboxValue: boolean,
  ) {}
}