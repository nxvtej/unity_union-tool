import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { ACCESS_TOKEN } from "./config.js";
import { json } from "stream/consumers";

// import { workerData } from "worker_threads";
// import { os } from "os";
// import { monitorEventLoopDelay } from "perf_hooks";
// import { count } from "";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let count = 0;
let flag = true;
export async function requestRetoool(config) {
  // previous request

  //   const response = await fetch(
  //     "https://retool.internal.cleartax.co/api/pages/uuids//query?queryName=download_staging_zip_file",
  //     {
  //       headers: {
  //         accept: "*/*",
  //         "accept-language": "en-US,en;q=0.9",
  //         "content-type": "application/json",
  //         priority: "u=1, i",
  //         "sec-ch-ua":
  //           '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
  //         "sec-ch-ua-mobile": "?0",
  //         "sec-ch-ua-platform": '"Windows"',
  //         "sec-fetch-dest": "empty",
  //         "sec-fetch-mode": "cors",
  //         "sec-fetch-site": "same-origin",
  //         timestamp: "",
  //         "x-retool-client-version": "2.113.22 (Build 74)",
  //         "x-xsrf-token": "",
  //         cookie:
  //         Referer: "https://retool.internal.cleartax.co/",
  //         "Referrer-Policy": "origin",
  //       },
  //       body: '{"userParams":{"bucketNameParams":{"length":0},"fileKeyParams":{"0"     }
  //   );

  // console.log(config);
  const response = await fetch(
    `https://retool.internal.cleartax.co/api/pages/uuids/${config.cleartax}/query?queryName=download_staging_zip_file`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        // priority: "u=1, i",
        // "sec-ch-ua":
        //   '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
        // "sec-ch-ua-mobile": "?0",
        // "sec-ch-ua-platform": '"Windows"',
        // "sec-fetch-dest": "empty",
        // "sec-fetch-mode": "cors",
        // "sec-fetch-site": "same-origin",
        // timestamp: "",
        timestamp: Date.now().toString(),
        "x-retool-client-version": "2.113.22-9dddc16 (Build 1874)",
        "x-xsrf-token": "",
        cookie: ACCESS_TOKEN,
        // Referer: "https://retool.internal.cleartax.co/",
        // "Referrer-Policy": "origin",
      },
      body: `{"userParams":{"bucketNameParams":{"length":0},"fileKeyParams":{"0":"${config.workspaceId}/${config.erpInstance}/${config.year}/${config.month}/${config.date}/${config.commandId}/data_extraction/${config.workspaceId}/data.zip","length":1},"delimiterParams":{"length":0},"maxKeysParams":{"length":0},"prefixParams":{"length":0},"signedOperationNameParams":{"length":0},"signedOperationOptionsParams":{"length":0},"uploadFileNameParams":{"length":0},"uploadFileTypeParams":{"length":0},"copySourceParams":{"length":0},"tagSetParams":{"length":0}},"queryType":"S3Query","environment":"production","showLatest":false,"isEditorMode":false,"frontendVersion":"1","releaseVersion":null,"includeQueryExecutionMetadata":true,"resourceName":""}`,
      method: "POST",
    }
  );
  const result = await response.json();

  console.log(response.status);

  if (result && result.queryData && result.queryData.Body) {
    const base64Data = result.queryData.Body;
    const bufferData = Buffer.from(base64Data, "base64");

    // crate /input oif not present tyhen create
    const inputDir = path.join(__dirname, "..", "input");
    if (!fs.existsSync(inputDir)) {
      fs.mkdirSync(inputDir, { recursive: true });
    }

    const outputFilePath = path.join(
      __dirname,
      "..",
      "input",
      `dloadNo${count}.zip`
    );

    count++;
    fs.writeFileSync(outputFilePath, bufferData);
    console.log(
      `File downloaded with date ${config.year}/${config.month}/${config.date} successfully to ${outputFilePath}`
    );
    if (flag) {
      flag = !flag;
      console.log(response);
    }
    return 200;
  } else {
    console.error("Unexpected response structure or missing Body in queryData");
    console.log(response);
    console.log(JSON.stringify(response, null, 2));
    return 400;
  }
}

// requestRetoool(workspaceId, erpInstance, year, month, date, commandId);

/**
 *
 * work id
 * erp insta.
 * command
 *
 *
 * workspace/erp_instance/YR/MONTH/DATE/Command_Id(66d03c6e)/data_extraction/workspace/data.zip
 */
