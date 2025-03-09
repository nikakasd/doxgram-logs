import { randomInt } from 'node:crypto'

import { oneLine } from 'common-tags'

import config from '@/config.js'

import { DoxgramService } from './services/doxgram.js'
import { FunstatService } from './services/funstat.js'
import { RedisService } from './services/redis.js'
import { TelegramService } from './services/telegram.js'
import { provideLogger } from './utilities/logger.js'

const init = async () => {
  provideLogger('index').info(oneLine`
    starting
    ${config.package.name}
    (${config.package.version})
    in ${config.package.mode} mode...
  `)

  setInterval(async () => {
    provideLogger('index').info('checking doxgram reports...')

    const randomId = randomInt(1_000_000_000)
    await DoxgramService.createUser(randomId)
    const report = await DoxgramService.getAttack(randomId)

    if (!report) {
      provideLogger('index').info('no report found')
      return
    }

    let message = ''
    if (report.messageId) {
      const chatInfo = await new FunstatService(config.funstatToken).getChat(report.chatId) as any

      if (chatInfo) {
        message = oneLine`
          👹 someone has reported message with id <code>${report.messageId}</code> in chat <a href="${chatInfo.info.link}">${chatInfo.info.title}</a> <i>(${report.chatId}, <a href="${FunstatService.makeFunstatUrl(report.chatId)}">open in funstat</a>)</i>
        `
      } else {
        message = oneLine`
          👹 someone has reported message with id <code>${report.messageId}</code> in chat <code>${report.chatId}</code> <i>(${report.chatId}, <a href="${FunstatService.makeFunstatUrl(report.chatId)}">open in funstat</a>)</i>
        `
      }
    } else {
      const userInfo = await new FunstatService(config.funstatToken).getUser(report.chatId) as any

      console.log(userInfo)

      if (userInfo) {
        const displayName = `${userInfo.first_name || ''} ${userInfo.last_name || ''}`.trim()

        message = oneLine`
          👹 someone has reported user <code>${displayName}</code> <i>(${report.chatId})</i> <i>(${report.chatId}, <a href="${FunstatService.makeFunstatUrl(report.chatId)}">open in funstat</a>)</i>
        `
      } else {
        message = oneLine`
          👹 someone has reported user <code>${report.chatId}</code> <i>(${report.chatId}, <a href="${FunstatService.makeFunstatUrl(report.chatId)}">open in funstat</a>)</i>
        `
      }
    }

    await Promise.all([
      RedisService.saveReport(report.id, report),
      TelegramService.sendMessage(message),
    ])
  }, 10_000)
}

init()
