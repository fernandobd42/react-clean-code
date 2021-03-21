import { AuthenticationParams, Authentication } from '@/domain/use-cases/authentication'
import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AccountModel } from '@/domain/models/account-model'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse?.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      case HttpStatusCode.notFound: throw new UnexpectedError()
      case HttpStatusCode.serverError: throw new UnexpectedError()
      default: throw new UnexpectedError()
    }
  }
}
