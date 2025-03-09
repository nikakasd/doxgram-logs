export class DoxgramService {
  private static BASE_HEADERS = {
    Accept: '*/*',
    'Accept-Encoding': 'gzip',
    'User-Agent': 'okhttp/4.12.0',
  }

  private static DOXGRAM_BASE_URL = 'https://doxgram.com'

  static createUser (id: number) {
    return fetch(`${DoxgramService.DOXGRAM_BASE_URL}/api/public/user/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.BASE_HEADERS,
      },
      body: JSON.stringify({
        telegramId: id,
      }),
    })
  }

  static getAttack (userId: number) {
    return fetch(`${this.DOXGRAM_BASE_URL}/api/public/attack/get?userId=${userId}`, {
      headers: this.BASE_HEADERS,
    }).then((r) => r.json()).catch(() => null)
  }
}
