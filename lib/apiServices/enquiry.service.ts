import api from "../axios"
import type { CreateEnquiryRequest, EnquiryApiResponse } from "../../types/enquiry"

export const enquiryService = {
  async createEnquiry(enquiryData: CreateEnquiryRequest): Promise<EnquiryApiResponse> {
    try {
      const response = await api.post("/enquiry/create", enquiryData)
      return {
        success: true,
        message: "Enquiry submitted successfully",
        data: response.data,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to submit enquiry",
      }
    }
  },
}
