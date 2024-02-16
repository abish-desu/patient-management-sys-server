import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PatientDto } from "./dto";
@Injectable()
export class PatientDataService {
  constructor(private prisma: PrismaService) {}
  // add patient data
  async addPatientData(dto: PatientDto) {
    try {
      const patient = await this.prisma.patient.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          dob: new Date(dto.dob).toISOString(),
          contact: dto.contact,
          workdays: dto.workDays,
          startTime: new Date(dto.startTime).toISOString(),
          endTime: new Date(dto.endTime).toISOString(),
        },
      });
      return patient;
    } catch (error) {
      console.log(error);
    }
  }

  // get patient data
  async getPatientData() {
    try {
      const patients = await this.prisma.patient.findMany();
      return patients;
    } catch (error) {
      console.log(error);
    }
  }

  //get patient data by id

  async getPatientDataById(id: number) {
    try {
      const patient = await this.prisma.patient.findUnique({
        where: {
          id: id,
        },
      });
      return patient;
    } catch (error) {
      console.log(error);
    }
  }

  // update patient data by id
  async updatePatientDataById(id: number, dto: PatientDto) {
    try {
      const patient = await this.prisma.patient.update({
        where: { id: id },
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          dob: new Date(dto.dob).toISOString(),
          contact: dto.contact,
          workdays: dto.workDays,
          startTime: new Date(dto.startTime).toISOString(),
          endTime: new Date(dto.endTime).toISOString(),
        },
      });
      return patient;
    } catch (error) {
      console.log(error);
    }
  }

  // delete patient data by id
  async deletePatientDataById(id: number) {
    try {
      const patient = await this.prisma.patient.delete({
        where: { id: id },
      });
      return { message: "Patient data deleted successfully" };
    } catch (error) {
      console.log(error);
    }
  }
}
