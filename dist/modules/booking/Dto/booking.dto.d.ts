export declare enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED"
}
export declare class CreateBookingDto {
    gedungId: string;
    userId: number;
    startDate: Date;
    endDate: Date;
    totalHarga: number;
    status?: BookingStatus;
}
