import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/db/db.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name); 
  constructor(
    private db: DatabaseService,
    private jwtService: JwtService,
  ) {}
  
  async login(email: string, password: string) {
    const result = await this.db.query(
      `SELECT u.id, u.email, u.password_hash, r.key as role
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE u.email = $1`,
      [email],
    );

    if (result.rows.length === 0) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
    };
  }
}
