export interface DemoPackageResponseDto {
    id: number;
    imageUrl: string;
    packageName: string;
    descriptions: string;
    numberOfDays: number;
    numberOfSessions: number;
    packagePrice: number;
    type: string;
    branch: {
        id: number;
        branchName: string;
        location: string;
        phone: string;
    }
}
