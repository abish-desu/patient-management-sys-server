import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { PatientDataService } from "./patient-data.service";
import { PatientDto } from "./dto";
@Controller()
export class PatientDataController {
  constructor(private patientDataService: PatientDataService) {}

  @Post("add-patient-data")
  addPatientData(@Body() dto: PatientDto) {
    return this.patientDataService.addPatientData(dto);
  }

  @Get("get-patient-data")
  getPatientData() {
    return this.patientDataService.getPatientData();
  }

  @Get("get-patient-data/:id")
  getPatientDataById(@Param("id") id: number) {
    const idAsNumber = Number(id);
    return this.patientDataService.getPatientDataById(idAsNumber);
  }

  @Put("update-patient-data/:id")
  updatePatientDataById(@Param("id") id: number, @Body() dto: PatientDto) {
    const idAsNumber = Number(id);
    return this.patientDataService.updatePatientDataById(idAsNumber, dto);
  }

  @Delete("delete-patient-data/:id")
  deletePatientDataById(@Param("id") id: number) {
    const idAsNumber = Number(id);
    return this.patientDataService.deletePatientDataById(idAsNumber);
  }
}
