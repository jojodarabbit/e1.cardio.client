export interface CreatePackageRequestDto {
    packageName: string;
    descriptions: string;
    numberOfDays: number;
    numberOfSessions: number;
    packagePrice: number;
    type: string;
    branchId: number;
}

export const defaultRequest: CreatePackageRequestDto = {
    packageName: '',
    descriptions: '',
    numberOfDays: 0,
    numberOfSessions: 0,
    packagePrice: 0,
    type: '',
    branchId: 0,
};

export interface UpdatePackageRequestDto {
    imageUrl: string,
    packageName: string;
    descriptions: string;
    numberOfDays: number;
    numberOfSessions: number;
    packagePrice: number;
    type: string;
    branchId: number;
}
