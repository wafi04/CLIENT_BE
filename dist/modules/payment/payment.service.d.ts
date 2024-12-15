import { PrismaService } from "src/prisma/prisma.service";
import { PaymentDto } from "./payment.dto";
export declare class PaymentService {
    private db;
    constructor(db: PrismaService);
    create(payment: PaymentDto): Promise<{
        id: string;
        harga: number;
        bookingId: string;
        metode: import(".prisma/client").$Enums.METODE;
        cretedAt: Date;
    }>;
}
