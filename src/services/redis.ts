import { Redis } from 'ioredis'

import config from '@/config.js'

export class RedisService {
  private static redis = new Redis(config.redisUrl)

  static getReportById (id: string) {
    return this.redis.get(`doxgram-reports:${id}`)
  }

  static saveReport (id: string, report: any) {
    return this.redis.set(`doxgram-reports:${id}`, JSON.stringify(report))
  }
}
