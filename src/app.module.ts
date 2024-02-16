import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { PatientDataModule } from "./patient-data/patient-data.module";
@Module({
  imports: [AuthModule, PrismaModule, PatientDataModule],
})
export class AppModule {}
