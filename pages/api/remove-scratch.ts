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
  // https://replicate.com/tencentarc/gfpgan
  faceRestoration: (input: {
    img: string;
    version?: "v1.2" | "v1.3" | "v1.4" | "RestoreFormer";
    scale?: number;
  }) => ({
    version: "9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
    input: { ...input, version: "v1.4", scale: 2 },
  }),
  removeScratches: (input: {
    image: string;
    HR?: boolean;
    with_scratch?: boolean;
  }) => ({
    version: "c75db81db6cbd809d93cc3b7e7a088a351a3349c9fa02b6d393e35e0d51ba799",
    input: { ...input, HR: false, with_scratch: true },
  }),
};

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

  const imageUrl = req.body.imageUrl;
  // POST request to Replicate to start the image restoration generation process
  let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + process.env.REPLICATE_API_KEY,
    },
    body: JSON.stringify(replicateModel.removeScratches({ image: imageUrl })),
  });

  let jsonStartResponse = await startResponse.json();
  let endpointUrl = jsonStartResponse.urls.get;

  // GET request to get the status of the image restoration process & return the result when it's ready
  let restoredImage: string | null = null;
  while (!restoredImage) {
    // Loop in 1s intervals until the alt text is ready
    console.log("polling for result...");
    let finalResponse = await fetch(endpointUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
    });
    let jsonFinalResponse = await finalResponse.json();

    if (jsonFinalResponse.status === "succeeded") {
      restoredImage = jsonFinalResponse.output;
    } else if (jsonFinalResponse.status === "failed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  res
    .status(200)
    .json(restoredImage ? restoredImage : "Failed to restore image");
}
