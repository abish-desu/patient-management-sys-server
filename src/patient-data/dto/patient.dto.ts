import { IsEmail, IsNotEmpty } from "class-validator";

export class PatientDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  dob: Date;

  @IsNotEmpty()
  contact: string;

  @IsNotEmpty()
  workDays: string;

  @IsNotEmpty()
  startTime: Date;

  @IsNotEmpty()
  endTime: Date;
}
