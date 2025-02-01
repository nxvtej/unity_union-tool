// import fetch from "node-fetch"; //
// import { createGunzip } from "zlib";
import { pipeline } from "stream";
import { promisify } from "util";
import { ACCESS_TOKEN } from "./config.js";

const pipelineAsync = promisify(pipeline);

export async function get_command_queue(ids) {
  try {
    const response = await fetch(
      `https://retool.internal.cleartax.co/api/pages/uuids/${ids.cleartax}/query?queryName=get_command_queue`,
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          timestamp: Date.now().toString(),
          "x-retool-client-version": "2.113.22 (Build 1874)",
          "x-xsrf-token": "",
          cookie: ACCESS_TOKEN,
          Referer: "https://retool.internal.cleartax.co/",
          "Referrer-Policy": "origin",
        },
        body: `{"userParams":{"fieldParams":{"length":0},"queryParams":{"0":"${ids.erpInstance}","length":1},"updateParams":{"length":0},"insertParams":{"length":0},"projectionParams":{"length":0},"optionsParams":{"length":0},"sortByParams":{"length":0},"skipParams":{"length":0},"limitParams":{"length":0},"aggregationParams":{"length":0},"collectionParams":{"length":0},"databaseParams":{},"operationsParams":{},"hintParams":{}},"queryType":"NoSqlQuery","environment":"production","showLatest":false,"isEditorMode":false,"frontendVersion":"1","releaseVersion":null,"includeQueryExecutionMetadata":true,"resourceName":""}`,
        method: "POST",
      }
    );

    if (response.status != 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(
      `total files avbaiable under this erp:- ${ids.erpInstance} are :-`,
      await data.queryData.length
    );
    // console.log("Response JSON:", JSON.stringify(data, null, 2)); // Log the decompressed and parsed JSON data
    return data;
  } catch (error) {
    console.error("Error reading response:", error);
  }
}

// get_command_queue();
