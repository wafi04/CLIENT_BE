import { AuthenticatedRequest } from "src/common/interfaces/user";
import { BookingService } from "./booking.service";
import { CreateBookingDto } from "./Dto/booking.dto";
export declare class BookingController {
    private readonly BookingService;
    private logger;
    constructor(BookingService: BookingService);
    Create(data: CreateBookingDto, request: AuthenticatedRequest): Promise<{
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
    GetById(id: string): Promise<{
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
    GetAll(): Promise<{
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
    getBookingStatusConfirmed(request: AuthenticatedRequest): Promise<({
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
    updateStatus(id: string): Promise<{
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
    Delete(id: string): Promise<{
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
    GetBookingByUser(request: AuthenticatedRequest, id: string): Promise<({
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
}
