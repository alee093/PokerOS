import { api } from "./api";

import type { PokerSite } from "../types/poker-site";

export async function getPokerSites(): Promise<PokerSite[]> {
  const response = await api.get<PokerSite[]>(
    "/poker-sites"
  );

  return response.data;
}