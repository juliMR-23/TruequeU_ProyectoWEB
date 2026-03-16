//export type ListingStatus = "AVAILABLE" | "RESERVED" | "SOLD";

export enum ListingStatusEnum {
    available = "AVAILABLE",
    sold = "SOLD",
    reserved = "RESERVED"
  }

export interface Listing{
    id: number;
    title: string;
    description: string;
    category: string;
    condition: string;
    price: number;
    location: string;
    status: ListingStatusEnum;
    ownerId: number;
    images: ListingImage[];
}

export interface ListingImage {
    id: number;
    url: string;
    order: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;//Opcional porque no siempre va a UI
  major: string;//Carrera del estudiante
  avatar?: string;// URL (imagen de perfil)
  createdAt?: string; 
}