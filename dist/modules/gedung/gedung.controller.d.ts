import { CreateGedungDto, GedungImages } from "./dto/create.gedung.dto";
import { GedungService } from "./gedung.service";
export declare class GedungController {
    private readonly gedungService;
    private logger;
    constructor(gedungService: GedungService);
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
    GetGedungById(id: string): Promise<{
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
    GetGedungBooked(id: string): Promise<{
        startDate: Date;
        endDate: Date;
    }[]>;
    GetAvailable(alamat?: string, dateString?: string, rangeDays?: string): Promise<{
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
    getallWithImages(): Promise<({
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
    edit(id: string, data: CreateGedungDto): Promise<{
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
    createImage(data: GedungImages): Promise<{
        id: string;
        url: string;
        gedungId: string;
    }>;
    getImages(id: string): Promise<{
        id: string;
        url: string;
        gedungId: string;
    }[]>;
    deleteImages(id: string): Promise<{
        id: string;
        url: string;
        gedungId: string;
    }>;
}
