import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hour-string";

const prisma = new PrismaClient({
  log: ["query"],
});

const app = express();

app.use(express.json());

app.use(cors());

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return res.json(games);
});

app.get("/games/:id/ads", async (req, res) => {
  const gameId = await req.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearPlaying: true,
      hourEnd: true,
      hourStart: true,
    },
    where: {
      gameId: gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    })
  );
});

app.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const body: any = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId: gameId,
      name: body.name,
      yearPlaying: body.yearPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
      createdAt: body.createdAt,
    },
  });

  return res.json(ad);
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return res.json({
    discord: ad.discord,
  });
});

app.listen(1212, () => {
  console.log("server started on localhost:1212");
});
