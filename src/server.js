import "dotenv/config";
import express from "express";
import fs from "node:fs/promises";

import {
  searchContent,
  getMetadata
} from "./provider.js";

const app = express();
const PORT = Number(process.env.PORT || 7000);

const manifest = JSON.parse(
  await fs.readFile(
    new URL("../manifest.json", import.meta.url),
    "utf8"
  )
);

app.disable("x-powered-by");

app.get("/", (_req, res) => {
  res.json({
    name: manifest.name,
    version: manifest.version,
    status: "online"
  });
});

app.get("/manifest.json", (_req, res) => {
  res.json(manifest);
});

app.get(
  "/catalog/:type/:catalogId/:extra.json",
  async (req, res) => {
    try {
      const { type, extra } = req.params;

      const params = new URLSearchParams(extra);
      const query = params.get("search") || "";

      const metas = await searchContent(query, type);

      res.json({ metas });
    } catch (error) {
      console.error(error);

      res.status(502).json({
        metas: [],
        error: "Provider unavailable"
      });
    }
  }
);

app.get(
  "/catalog/:type/:catalogId.json",
  async (req, res) => {
    try {
      const { type } = req.params;

      const metas = await searchContent("", type);

      res.json({ metas });
    } catch (error) {
      console.error(error);

      res.status(502).json({
        metas: [],
        error: "Provider unavailable"
      });
    }
  }
);

app.get("/meta/:type/:id.json", async (req, res) => {
  try {
    const { type, id } = req.params;

    const result = await getMetadata(id, type);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(404).json({
      meta: null,
      error: "Metadata not found"
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Nuvio addon running on http://localhost:${PORT}`
  );
});