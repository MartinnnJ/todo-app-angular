export default class Todo {
  constructor(
    public text: string,
    public id: string = Math.random().toString(),
    public isComplete: boolean = false,
  ) {}
}