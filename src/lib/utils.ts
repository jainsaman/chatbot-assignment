import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { responses } from "./chatbotConfig/sampleData";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Images used for avatars in the chat/
export const userImage =
  "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";

export const botImage = "https://github.com/shadcn.png";

//Function to generate a response based on the user's input by matching words from the user query to the keywords in the response maintained in the mock datasheet.
export function generateResponse(query: string): string {
  // Function to remove special characters from the query and convert it to lowercase and then split it into words.
  const sanitizedQuery = query.replace(/[^\w\s]/g, "");
  const words = sanitizedQuery.toLowerCase().split(" ");

  // Loop through each response object in the responses array
  for (const response of responses) {
    // Check if the keyword property of the response is a string
    if (typeof response.keyword === "string") {
      // If the keyword is a string, check if it exists in the words array
      if (words.includes(response.keyword)) {
        // If the keyword is found, return the corresponding response
        return response.response;
      }
    } else {
      // If the keyword property is an array, check if any of its elements exist in the words array
      if (response.keyword.some((keyword) => words.includes(keyword))) {
        // If any keyword is found, return the corresponding response
        return response.response;
      }
    }
  }

  // If no keyword matches, return a default response
  return "Sorry, I didn't understand your query.";
}
