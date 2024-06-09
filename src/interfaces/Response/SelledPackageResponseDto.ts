import { Schedule } from "../Request/CreateSellPackageRequestDto"

export interface SelledPackageResponseDto    {
    id: number,
    demoPackage: {
      id: number,
      imgUrl: string,
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
        phone: number;
      }
    },
    startDate: Date,
    endDate: Date
    schedules: Schedule[],
    isReceived: boolean
    consultants: {
      phone: number,
      firstName: string,
      lastName: string,
      email: string,
    },
    consultees: {
      phone: number,
      firstName: string,
      lastName: string,
      email: string,
    },
}