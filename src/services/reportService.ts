import { api } from "./api";
import type { Report, CreateReportDto } from "../types";

export const reportService = {

    createReport: async (dto: CreateReportDto): Promise<Report> => {
        return await api.post("/reports", dto);
    },

    getMyReports: async (): Promise<Report[]> => {
        return await api.get("/reports/me");
    },

    getAllReports: async (): Promise<Report[]> => {
        return await api.get("/reports");
    },

    getReportById: async (reportId: string): Promise<Report> => {
        return await api.get(`/reports/${reportId}`);
    },

    resolveReport: async (reportId: string, status: number): Promise<Report> => {
        return await api.patch(`/reports/${reportId}/resolve`, { status });
    },

    deleteReport: async (reportId: string): Promise<void> => {
        return await api.delete(`/reports/${reportId}`);
    }
};