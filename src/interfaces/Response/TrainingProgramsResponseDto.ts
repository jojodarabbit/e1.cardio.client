export type TrainingProgramsStatus = 'Completed' | 'Processing' | 'Rejected';

export interface TrainingProgramsResponseDto {
    id: number;
    name: string;
    createdAt: Date;
    createdBy: string;
    duration: number;
    status: TrainingProgramsStatus;
    rating: number;
}
