import { sha256 } from 'hash.js';

export default class Helpers {
  static get salt(): string {
    return process.env.SALT || '~nof#'
  }
  static hash(email: string): string {
    return sha256()
      .update(`${this.salt}-${email}-${this.salt}`)
      .digest('hex')
      .slice(9, 20)
  }
  static isValidHash(email: string, hash: string): boolean {
    return hash === this.hash(email)
  }
  static link(email: string, host: string): string {
    return `${host}/confirm?email=${encodeURIComponent(email)}&hash=${this.hash(email)}`
  }
}
