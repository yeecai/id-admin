import * as crypto from 'crypto'

export function makeSalt(): string {
    return crypto.randomBytes(3).toString('base64')
}

export function encrptyPassword(passwd: string, salt: string): string {
    if (!passwd || !salt) return ''
    const tempSalt = Buffer.from(salt, 'base64')
    return crypto.pbkdf2Sync(passwd, tempSalt, 10000, 16, 'sha1').toString('base64')
}