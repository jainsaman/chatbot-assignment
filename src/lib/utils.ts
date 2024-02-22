import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { responses } from "./chatbotConfig/sampleData";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const userImage =
  "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";

export const botImage = "https://github.com/shadcn.png";

export function generateResponse(query: string): string {
  const sanitizedQuery = query.replace(/[^\w\s]/g, "");
  const words = sanitizedQuery.toLowerCase().split(" ");

  for (const response of responses) {
    if (typeof response.keyword === "string") {
      if (words.includes(response.keyword)) {
        return response.response;
      }
    } else {
      if (response.keyword.some((keyword) => words.includes(keyword))) {
        return response.response;
      }
    }
  }

  // If no keyword matches, return a default response
  return "Sorry, I didn't understand your query.";
}
