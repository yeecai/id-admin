import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { encrptyPassword } from 'src/utils/cryptogram';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: AdminService, private readonly jwtService: JwtService) { }

    async validateUser(name: string, passwd: string): Promise<any> {
        console.log('jwt validateUser step2')

        const user = await this.usersService.findOneByName(name)
        if (user) {
            const hashedPassword = user.passwd
            const salt = user.salt;

            const hashPassword = encrptyPassword(passwd, salt)
            if (hashedPassword === hashPassword) {
                return {
                    code: 200, user
                }
            } else {
                return {
                    code: 500,
                    msg: 'wrong account or password'
                }
            }
        } else {
            return {
                code: 500,
                msg: "user doesn't existed"
            }
        }
    }

    async certificate(user: any) {
        console.log('step3 jwtSerivce sign')
        const payload = { name: user.name }
        try {
            const token = this.jwtService.sign(payload)
            return {
                code: 200,
                data: {
                    token
                }
            }
        } catch (error) {
            return {
                code: 500,
                msg: 'wrong password or username'
            }
        }
    }
}
