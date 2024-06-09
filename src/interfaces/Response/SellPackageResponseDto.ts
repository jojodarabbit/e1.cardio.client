import { Schedule } from "../Request/CreateSellPackageRequestDto"

export interface SellPackageResponseDto {
      id: number,
      demoPackageId: number,
      demoPackages: {
        id: number,
        packageName: string,
        descriptions: string,
        numberOfDays: number,
        numberOfSessions: number,
        packagePrice: number,
        type: string,
        branch: {
          id: number,
          branchName: string,
          location: string,
          phone: string
        }
      },
      staffId: number,
      staff: {
        id: number,
        phone: number,
        firstName: string,
        lastName: string,
        email: string,
        dob: Date,
        address: string,
        position: string
      },
      customerId: number,
      customer: {
        id: number,
        phone: string,
        firstName: string,
        lastName: string,
        email: string,
        dob: Date,
        address: string,
        height: number,
        weight: number,
        muscleRatio: number,
        fatRatio: number,
        visceralFatLevels: number
      },
      createPackageTrainer: 14,
      trainPackageTrainer: 14,
      startDate: Date,
      endDate: Date,
      schedules: Schedule[],
      isReceived: boolean
  }
