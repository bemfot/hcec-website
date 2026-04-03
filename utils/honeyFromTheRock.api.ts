import api from "@/utils/api";

export interface HFTRParams {
  type: "children" | "adult";
  language: "english" | "yoruba" | "french";
  lesson: string;
}

export const fetchHFTR = (params: HFTRParams) => {
  return api.get("/honey-from-the-rock", { params });
};
