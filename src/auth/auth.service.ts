import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // Signup logic // create account
  async signup(dto: AuthDto) {
    //generate pass hash
    const hash = await argon.hash(dto.password);

    try {
      //save user to db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
        },
      });

      // return token
      return this.signToken(user.id, user.email);
    } catch (error) {
      //throw error if email already in use
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Credentials already in use.");
        }
      }
    }
  }

  //Signin logic // login with credentials
  async signin(dto: AuthDto) {
    //find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    //if user doesnt exist throw error
    if (!user) throw new ForbiddenException("Email not found");
    // compare password hashes
    const match_password = await argon.verify(user.hash, dto.password);

    //if password is wrong throw error
    if (!match_password) throw new ForbiddenException("Password incorrect");

    //return token
    return this.signToken(user.id, user.email);
  }
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get("JWT_SECRET");

    const token = await this.jwt.signAsync(payload, {
      expiresIn: "10m",
      secret: secret,
    });

    return { access_token: token };
  }
}
