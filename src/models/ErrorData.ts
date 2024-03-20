export default class ErrorData {
  constructor(
    public isLoadingError: boolean = false,
    public errorStatusCode: number | null = null,
    public errorStatusText: string | null = null,
    public errorMessage: string | null = null,
  ) {}
}