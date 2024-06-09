
export interface PersonInformation {
    phone: number,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    dob: Date,
    address: string,
    position: string
    height: number,
    weight: number,
    muscleRatio: number,
    fatRatio: number,
    visceralFatLevels: number,
    certifications: string,
    membershipTier: string,
    energyPoint: number
    packages: PackageDisplay[]
}

export interface PackageDisplay {
    packageId: number,
    packageName: string,
    packageUrl: string
}
