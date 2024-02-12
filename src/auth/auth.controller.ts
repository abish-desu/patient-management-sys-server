import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
constructor (private authService: AuthService){}

@Post('signup')
signup() {
    return 'test1';
}


@Post('signin')
signin() {
    return 'test2';

}

};
