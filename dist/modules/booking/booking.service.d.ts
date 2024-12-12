import { PrismaService } from "src/prisma/prisma.service";
import { CreateBookingDto } from "./Dto/booking.dto";
export declare class BookingService {
    private readonly db;
    private logger;
    constructor(db: PrismaService);
    create(data: CreateBookingDto): Promise<{
        id: string;
        userId: number;
        gedungId: string;
        startDate: Date;
        endDate: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        totalHarga: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    GetBookingById(id: string): Promise<{
        id: string;
        userId: number;
        gedungId: string;
        startDate: Date;
        endDate: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        totalHarga: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getBookingByUserId(id: number): Promise<({
        gedung: {
            images: {
                id: string;
                gedungId: string;
                url: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            alamat: string;
            harga: import("@prisma/client/runtime/library").Decimal;
            deskripsi: string | null;
            kapasitas: number | null;
            ketersediaan: string;
        };
    } & {
        id: string;
        userId: number;
        gedungId: string;
        startDate: Date;
        endDate: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        totalHarga: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    updateStatusBooking(bookingId: string): Promise<{
        id: string;
        userId: number;
        gedungId: string;
        startDate: Date;
        endDate: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        totalHarga: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteBooking(bookingId: string): Promise<{
        id: string;
        userId: number;
        gedungId: string;
        startDate: Date;
        endDate: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        totalHarga: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getBookingStatusConfirmed(adminId: number, role: "admin" | "user"): Promise<({
        gedung: {
            images: {
                id: string;
                gedungId: string;
                url: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            alamat: string;
            harga: import("@prisma/client/runtime/library").Decimal;
            deskripsi: string | null;
            kapasitas: number | null;
            ketersediaan: string;
        };
    } & {
        id: string;
        userId: number;
        gedungId: string;
        startDate: Date;
        endDate: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        totalHarga: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getAllBooking(): Promise<{
        id: string;
        userId: number;
        gedungId: string;
        startDate: Date;
        endDate: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        totalHarga: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
