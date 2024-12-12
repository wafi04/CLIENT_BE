import { PrismaService } from "src/prisma/prisma.service";
import { CreateGedungDto, GedungImages } from "./dto/create.gedung.dto";
export declare class GedungService {
    private db;
    constructor(db: PrismaService);
    create(data: CreateGedungDto): Promise<{
        id: string;
        name: string;
        alamat: string;
        harga: import("@prisma/client/runtime/library").Decimal;
        deskripsi: string | null;
        kapasitas: number | null;
        ketersediaan: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAll(): Promise<{
        id: string;
        name: string;
        alamat: string;
        harga: import("@prisma/client/runtime/library").Decimal;
        deskripsi: string | null;
        kapasitas: number | null;
        ketersediaan: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getById(id: string): Promise<{
        images: {
            id: string;
            url: string;
            gedungId: string;
        }[];
    } & {
        id: string;
        name: string;
        alamat: string;
        harga: import("@prisma/client/runtime/library").Decimal;
        deskripsi: string | null;
        kapasitas: number | null;
        ketersediaan: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    Edit(id: string, data: CreateGedungDto): Promise<{
        id: string;
        name: string;
        alamat: string;
        harga: import("@prisma/client/runtime/library").Decimal;
        deskripsi: string | null;
        kapasitas: number | null;
        ketersediaan: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getBookedDatesByGedungId(gedungId: string): Promise<{
        startDate: Date;
        endDate: Date;
    }[]>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        alamat: string;
        harga: import("@prisma/client/runtime/library").Decimal;
        deskripsi: string | null;
        kapasitas: number | null;
        ketersediaan: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    CreateGedungImages(data: GedungImages): Promise<{
        id: string;
        url: string;
        gedungId: string;
    }>;
    getAllGedungWithImages(): Promise<({
        images: {
            id: string;
            url: string;
            gedungId: string;
        }[];
    } & {
        id: string;
        name: string;
        alamat: string;
        harga: import("@prisma/client/runtime/library").Decimal;
        deskripsi: string | null;
        kapasitas: number | null;
        ketersediaan: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getAllGedungImages(gedungId: string): Promise<{
        id: string;
        url: string;
        gedungId: string;
    }[]>;
    deleteGedungImage(id: string): Promise<{
        id: string;
        url: string;
        gedungId: string;
    }>;
    getAvailableGedung(inputDate?: Date, alamat?: string, daysRange?: number): Promise<{
        availableGedung: ({
            images: {
                id: string;
                url: string;
                gedungId: string;
            }[];
        } & {
            id: string;
            name: string;
            alamat: string;
            harga: import("@prisma/client/runtime/library").Decimal;
            deskripsi: string | null;
            kapasitas: number | null;
            ketersediaan: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
        searchParams: {
            inputDate: Date;
            startDate: Date;
            endDate: Date;
            alamat: string;
            daysRange: number;
        };
    }>;
}
