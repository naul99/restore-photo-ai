import { Ratelimit } from "@upstash/ratelimit";
import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import redis from "../../utils/redis";

type Data = string;
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    imageUrl: string;
  };
}

// Create a new ratelimiter, that allows 5 requests per day
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(5, "1440 m"),
      analytics: true,
    })
  : undefined;

const replicateModel = {
  faceRestoration: ({
    imgUrl,
    version = "v1.4",
    scale = 2,
  }: {
    imgUrl: string;
    version?: "v1.2" | "v1.3" | "v1.4" | "RestoreFormer";
    scale?: number;
  }) => ({
    data: [imgUrl, version, scale],
  }),
};

interface ApiResponse {
  data: [
    string, // base64
    {
      name: string;
      size: number;
      data: string; // base64
    }
  ];
  duration: number;
  average_duration: number;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  // Rate Limiter Code
  if (ratelimit) {
    const identifier = requestIp.getClientIp(req);
    const result = await ratelimit.limit(identifier!);
    res.setHeader("X-RateLimit-Limit", result.limit);
    res.setHeader("X-RateLimit-Remaining", result.remaining);

    if (!result.success) {
      res
        .status(429)
        // .json("Too many uploads in 1 day. Please try again after 24 hours.");
        .json(
          "Bạn đã tải lên quá nhiều ảnh trong 1 ngày. Vui lòng thử lại sau 24 giờ nữa nhé. Cảm ơn bạn đã ủng hộ."
        );
      return;
    }
  }

  const imageBase64 = req.body.imageUrl;
  // POST request to Replicate to start the image restoration generation process
  let startResponse = await fetch(
    "https://xintao-gfpgan.hf.space/api/predict",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
      body: JSON.stringify(
        replicateModel.faceRestoration({ imgUrl: imageBase64 })
      ),
    }
  );

  let jsonStartResponse: ApiResponse = await startResponse.json();
  console.log(
    "🚀 ~ file: generate.ts:81 ~ jsonStartResponse:",
    jsonStartResponse
  );

  // GET request to get the status of the image restoration process & return the result when it's ready
  let restoredImage: string | null = jsonStartResponse.data?.[0] || null;
  res
    .status(200)
    .json(restoredImage ? restoredImage : "Failed to restore image");
}

export const config = {
  api: {
    responseLimit: false,
  },
};
