import type { Ffetch } from '@fuman/fetch'
import { ffetchBase } from '@fuman/fetch'

export class FunstatService {
  private static FUNSTAT_API_BASE_URL = 'https://funstat.info/api/v1'
  private static FUNSTAT_BASE_URL = 'https://t.me/fustatmirror_bot'
  fetch: Ffetch<object, object>

  constructor (token: string) {
    this.fetch = ffetchBase.extend({
      baseUrl: FunstatService.FUNSTAT_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  static makeFunstatUrl (id: number) {
    return `${this.FUNSTAT_BASE_URL}/?start=0102${this.encodeUserId(id)}`
  }

  private static encodeUserId (id: number) {
    return id.toString(16).padStart(16, '0').match(/[a-fA-F0-9]{2}/g)!.reverse().join('').toUpperCase()
  }

  getChat (id: number) {
    return this.fetch.get(`/groups/${id}`).json().catch(() => null)
  }

  getUser (id: number) {
    return this.fetch.get(`/users/${id}/stats_min`).json().catch(() => null)
  }
}
