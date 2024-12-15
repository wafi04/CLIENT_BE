import { PaymentDto } from "./payment.dto";
import { PaymentService } from "./payment.service";
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    Create(data: PaymentDto): Promise<{
        id: string;
        harga: number;
        bookingId: string;
        metode: import(".prisma/client").$Enums.METODE;
        cretedAt: Date;
    }>;
}
