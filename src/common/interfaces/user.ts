export type UserData = {
  name: string;
  email: string;
  id: number;
  Nik: string;
  alamat: string;
  tempatLahir: string;
  jenisKelamin: string;
  tanggalLahir: string;
  noTelp: string;
} & { role: "user" };

export type AdminData = {
  name: string;
  id: number;
  email: string;
  noTelp: string;
} & { role: "admin" };

export interface AuthenticatedRequest extends Request {
  user: {
    sub: number;
    email: string;
    Nik?: string;
    noTelp?: string;
    role: "admin" | "user";
  };
}
