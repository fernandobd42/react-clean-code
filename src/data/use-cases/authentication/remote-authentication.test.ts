import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClient } from './../../protocols/http/http-post-client'
describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct URL', async () => {
    const url = 'any_url'
    class HttpPostClientSpy implements HttpPostClient {
      url?: string

      async post (url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
