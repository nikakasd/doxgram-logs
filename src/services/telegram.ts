import { Telegram } from 'wrappergram'

import config from '@/config.js'

export class TelegramService {
  private static client = new Telegram(config.bot.botToken)

  static sendMessage (message: string) {
    return this.client.api.sendMessage({
      chat_id: config.bot.chatId,
      text: message,
      parse_mode: 'HTML',
      link_preview_options: {
        is_disabled: true,
      },
    })
  }
}
