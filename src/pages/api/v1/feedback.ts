import type { APIRoute } from "astro";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    let image = formData.get("image") as File;
    let message = formData.get("message") as string;
    if (!image) {
      return new Response(JSON.stringify({ error: "Image data missing" }), {
        status: 400,
      });
    }

    const result = await generateObject({
      model: openai("gpt-4o-mini"),
      maxTokens: 512,
      schema: z.object({
        modernDesign: z.object({
          advice: z.string(),
          name: z.string(),
          imageUrl: z
            .string()
            .default(
              "https://cdn.domestika.org/c_fit,dpr_2.0,f_auto,q_80,t_base_params,w_820/v1596361357/content-items/005/385/780/planta_ilustracio%25CC%2581n2-original.jpg?1596361357"
            ),
        }),
        eclecticStyle: z.object({
          advice: z.string(),
          name: z.string(),
        }),
        plantLover: z.object({
          advice: z.string(),
          name: z.string(),
        }),
        minimalistSpaces: z.object({
          advice: z.string(),
          name: z.string(),
        }),
        /*playfulInteriors: z.object({
          advice: z.string(),
          name: z.string(),
        }),*/
      }),
      messages: [
        {
          role: "system",
          content:
            "Analyze this interior design image and provide concise, super short, persona-specific advice. For each persona (Modern Designer, Eclectic Stylist, Plant Lover, Minimalist, and Playful Interior Enthusiast), offer a unique perspective on how to enhance the space. Keep the tone friendly and engaging, as if commenting on social media. Focus on practical suggestions that align with each persona's style preferences. Be critic but friendly. Make the responses more conversational, example 'That wall looks a little empty! How about adding a large painting or floor lamp to liven it up?'",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: message,
            },
            {
              type: "image",
              image: `data:${image.type};base64,${Buffer.from(
                await new Response(image).arrayBuffer()
              ).toString("base64")}`,
            },
          ],
        },
      ],
    });
    console.log(result);
    return new Response(JSON.stringify({ data: result.object }));
  } catch (error) {
    console.error("Error getting document:", error);
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
};
