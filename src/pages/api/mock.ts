import { NextApiRequest, NextApiResponse } from "next";
import { generateResponse } from "@/lib/utils"; // function used to generate a response based on the user's input.

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { input } = req.query;

  const response = generateResponse(input as string);

  if (response === "Sorry, I didn't understand your query.") {
    // If no keyword matches, return an error status code along with the default response
    res.status(400).json({
      response: response,
      userType: "bot",
    });
  } else {
    // If a keyword matches, return the response with a success status code
    res.status(200).json({
      response: response,
      userType: "bot",
    });
  }
}
