export interface BaseResponseDto<T> {
    data: T;
    error: unknown;
    hasError: boolean;
}
