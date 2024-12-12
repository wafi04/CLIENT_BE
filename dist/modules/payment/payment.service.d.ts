import { PrismaService } from "src/prisma/prisma.service";
import { PaymentDto } from "./payment.dto";
export declare class PaymentService {
    private db;
    constructor(db: PrismaService);
    create(payment: PaymentDto): Promise<{
        id: string;
        bookingId: string;
        cretedAt: Date;
        harga: number;
        metode: import(".prisma/client").$Enums.METODE;
    }>;
}
