//export type ListingStatus = "AVAILABLE" | "RESERVED" | "SOLD";

export enum ListingStatusEnum {
    available = "AVAILABLE",
    sold = "SOLD",
    reserved = "RESERVED"
}
export enum Condicion { Nuevo = "Nuevo", Usado = "Usado" }
export enum Estado { Disponible = "Disponible", Reservado = "Reservado", Intercambiado = "Intercambiado" }
export enum Categoria { Libros = "Libros", Utiles = "Utiles", Tecnologia = "Tecnologia", Accesorios = "Accesorios", Otro = "Otro" }
export enum Ubicacion { SedePalmas = "SedePalmas", SedeZuniga = "SedeZuniga" }

export interface CreateListingDTO {
    titulo: string;
    descripcion: string;
    condicion: Condicion;
    categoria: Categoria;
    precio: number;
    ubicacion: Ubicacion;
    imageUrls: string[];
}
export interface ListingCardDTO {
    idListing: string;
    titulo: string;
    condicion: Condicion;
    estado: Estado;
    categoria: Categoria;
    precio: number;

    ownerName: string;
    previewImageUrl?: string;
}
// export interface Listing {
//     idListing: string;
//     titulo: string;
//     descripcion: string;
//     condicion: Condicion;
//     estado: Estado;
//     categoria: Categoria;
//     precio: number;
//     ubicacion: Ubicacion;
//     isActive: boolean;
//     ownerId: string;
//     previewImageUrl?: string;
// }
export interface ListingDetailDTO extends ListingCardDTO {
    descripcion: string;
    ubicacion: Ubicacion;
    ownerId: string;

    allImagesUrls: string[];
}

// export interface ListingImage {
//     id: number;
//     url: string;
//     order: number;
// }

export interface AuthUser {
    email: string;
    clientId: string;
    role: string;
}

export interface Client {
    clientId: string;
    nombreCliente: string;
    carrera: string;
    puntuacion: number;
    isActive: boolean;
}

export interface ChatSummary {
    chatId: string;
    createdAt: string;
    otherParticipantId: string;
    otherParticipantName: string;
    otherParticipantPuntuacion: number;
    lastMessagePreview: string | null;
    lastMessageAt: string | null;
    unreadCount: number;
}

export interface ChatDetail {
    chatId: string;
    createdAt: string;
    buyerId: string;
    buyerName: string;
    buyerPuntuacion: number;
    sellerId: string;
    sellerName: string;
    sellerPuntuacion: number;
}

export interface Message {
    messageId: string;
    chatId: string;
    senderId: string;
    senderName: string;
    content: string;
    createdAt: string;
    isRead: boolean;
}

export enum ReportReason {
    ContenidoInapropiado = 0,
    Spam = 1,
    FraudeOEstafa = 2,
    ProductoFalso = 3,
    AcosoOAbuso = 4,
    Otro = 5
}

export interface CreateReportDto {
    reportedUserId?: string;
    reportedListingId?: string;
    reason: ReportReason;
    comment?: string;
}

export interface Report {
    reportId: string;
    reportedBy: string;
    reporterName: string;
    reportedUserId: string | null;
    reportedUserName: string | null;
    reportedListingId: string | null;
    reportedListingTitulo: string | null;
    reason: string;
    comment: string | null;
    status: string;
    createdAt: string;
}
export interface ModerationLog {
    logId: string;
    userId: string;
    userEmail: string;
    userRole: string;
    action: string;
    resultCode: number;
    createdAt: string;
}