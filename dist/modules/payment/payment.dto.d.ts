export declare enum METODE {
    CASH = "CASH",
    QRIS = "QRIS",
    TRANSFER = "TRANSFER"
}
export declare class PaymentDto {
    bookingId: string;
    harga: number;
    metode: METODE;
}
