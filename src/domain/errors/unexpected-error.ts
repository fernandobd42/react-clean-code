export class UnexpectedError extends Error {
  constructor () {
    super('Something wrong happened. Try gain')
    this.name = 'UnexpectedError'
  }
}
