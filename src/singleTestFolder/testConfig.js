/**
 * deafult are set for integration-clear.in with geneis, data
 */
import { readFile } from "fs/promises";

async function testConfig() {
  try {
    const idsData = await readFile(
      new URL("../ids.json", import.meta.url),
      "utf-8"
    );
    const ids = JSON.parse(idsData);

    ids.year = 2024;
    ids.month = "AUGUST";
    ids.date = "28";
    ids.commandId = "66cda9dcfa224c5f5c8837c7";
    // all other modifications

    console.log(ids);
    // const response = await fetch(
    //   `https://retool.internal.cleartax.co/api/pages/uuids/${ids.cleartax}/query?queryName=download_staging_zip_file`,
    //   {
    //     headers: {
    //       accept: "*/*",
    //       "accept-language": "en-US,en;q=0.9",
    //       "content-type": "application/json",
    //       priority: "u=1, i",
    //       "sec-ch-ua":
    //         '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
    //       "sec-ch-ua-mobile": "?0",
    //       "sec-ch-ua-platform": '"Windows"',
    //       "sec-fetch-dest": "empty",
    //       "sec-fetch-mode": "cors",
    //       "sec-fetch-site": "same-origin",
    //       timestamp: Date.now().toString(),
    //       "x-retool-client-version": "2.113.22-9dddc16 (Build 1874)",
    //       "x-xsrf-token": ids.x_xsrf_token,
    //     },
    //     referrer: "https://retool.internal.cleartax.co/",
    //     referrerPolicy: "origin",
    //     body: `{"userParams":{"bucketNameParams":{"length":0},"fileKeyParams":{"0":"${ids.workspaceId}/${ids.erpInstance}/${ids.year}/${ids.month}/${ids.date}/${ids.commandId}/data_extraction/${ids.workspaceId}/data.zip","length":1},"delimiterParams":{"length":0},"maxKeysParams":{"length":0},"prefixParams":{"length":0},"signedOperationNameParams":{"length":0},"signedOperationOptionsParams":{"length":0},"uploadFileNameParams":{"length":0},"uploadFileTypeParams":{"length":0},"copySourceParams":{"length":0},"tagSetParams":{"length":0}},"queryType":"S3Query","environment":"production","showLatest":false,"isEditorMode":false,"frontendVersion":"1","releaseVersion":null,"includeQueryExecutionMetadata":true,"resourceName":${ids.resourceName}}`,
    //     method: "POST",
    //     mode: "cors",
    //     credentials: "include",
    //   }
    // );

    const response = await fetch(
      `https://retool.internal.cleartax.co/api/pages/uuids/${ids.cleartax}/query?queryName=download_staging_zip_file`,
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
          "x-retool-client-version": "2.113.22-9dddc16 (Build 1874)",
          "x-xsrf-token": ids.x_xsrf_token,
          cookie: ids.accessToken,
          Referer: "https://retool.internal.cleartax.co/",
          "Referrer-Policy": "origin",
        },
        body: `{"userParams":{"bucketNameParams":{"length":0},"fileKeyParams":{"0":"${ids.workspaceId}/${ids.erpInstance}/${ids.year}/${ids.month}/${ids.date}/${ids.commandId}/data_extraction/${ids.workspaceId}/data.zip","length":1},"delimiterParams":{"length":0},"maxKeysParams":{"length":0},"prefixParams":{"length":0},"signedOperationNameParams":{"length":0},"signedOperationOptionsParams":{"length":0},"uploadFileNameParams":{"length":0},"uploadFileTypeParams":{"length":0},"copySourceParams":{"length":0},"tagSetParams":{"length":0}},"queryType":"S3Query","environment":"production","showLatest":false,"isEditorMode":false,"frontendVersion":"1","releaseVersion":null,"includeQueryExecutionMetadata":true,"resourceName":"${ids.resourceName}"}`,

        method: "POST",
      }
    );

    if (response.status === 200) {
      console.log("Request successfull status: ", response.status);
      console.log("here is response", response);
      const jsonData = await response.json();
      console.log("Json data ", jsonData);
      // const data = JSON.stringify(jsonData, null, 2);
      // console.log("Here is stringified version", data);
    } else {
      console.log(response);
      throw new Error(`request failed with status code ${response.status}`);
    }
  } catch (e) {
    console.log(
      "error in testconfig two cases of error either thrown by else from status !200 or fetch error",
      e
    );
  }
}

await testConfig();
