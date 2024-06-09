
export interface CreatePackageRequestDto {
    imageUrl: string,
    packageName: string,
    descriptions: string,
    numberOfDays: number,
    numberOfSessions: number,
    sessions: session[],
    startDate: Date,
    endDate: Date,
    schedules: Schedule[]
    branchId: number
  }
  export interface Schedule {
    day: number;
    time: {
      hour: number,
      minute: number
    };
}
  export interface session
  {
    title: string,
    outcome: string,
    descriptions: string,
    energyPoint: number,
    sessionItems: sessionItems[]
  }
  export interface sessionItems {
    title: string,
    description: string,
    imageUrl: string
}
export interface UpdatePackageRequestDto 
{
  id: number,
  hasCustomer: boolean;
  imageUrl: string,
  packageName: string,
  descriptions: string,
  numberOfDays: number,
  numberOfSessions: number,
  packagePrice: number,
  type: string,
  sessions: sessionUpdate[],
  status: number,
  startDate: Date,
  endDate: Date,
  schedules: Schedule[],
  branchId: number,
  branch: {
    id: number,
    branchName: string,
    location: string,
    phone: string
  },
  packageCreator: UserDTO,
  packageTrainerId: number,
  packageTrainer: UserDTO,
  packageFollowerId: number,
  packageFollower: UserDTO
}

export interface UserDTO {
  id: number,
  phone: string,
  firstName: string,
  lastName: string,
  email: string
}

export interface sessionItemsUpdate {
  title: string,
  description: string,
  imageUrl: string
}

export interface sessionUpdate {
  id: number,
  isActive: boolean,
  title: string,
  outcome: string,
  descriptions: string,
  energyPoint: number,
  sessionItems: sessionItemsUpdate[],
  branchId: number,
  branch: {
    id: number,
    branchName: string,
    location: string,
    phone: string
  },
  sessionTrainerId: number,
  sessionTrainer: UserDTO,
  isFinished: number
}