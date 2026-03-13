export type ListingStatus = "AVAILABLE" | "RESERVED" | "SOLD";

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
    status: ListingStatus;
    ownerId: number;
    images: ListingImage[];
}

export interface ListingImage {
    id: number;
    url: string;
//order: number;
}