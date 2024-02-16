import { Module } from '@nestjs/common';
import { PatientDataController } from './patient-data.controller';
import { PatientDataService } from './patient-data.service';

@Module({
  controllers: [PatientDataController],
  providers: [PatientDataService]
})
export class PatientDataModule {}
