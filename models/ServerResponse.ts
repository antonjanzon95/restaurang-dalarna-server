export default class ServerResponse<T = null> {
  constructor(
    public message: string,
    public success: boolean,
    public body?: T
  ) {}
}
