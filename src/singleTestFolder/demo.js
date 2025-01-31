const res = await fetch("https://retool.internal.cleartax.co/api/pages/uuids/4f6547d2-c0c6-11ee-b230-ab48450c39f7/query?queryName=download_staging_zip_file", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\", \"Google Chrome\";v=\"132\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "timestamp": "1738316771542",
    "x-retool-client-version": "2.113.22-9dddc16 (Build 1874)",
    "x-xsrf-token": "efd9e842-54db-4ecd-948e-a75d8526f888"
  },
  "referrer": "https://retool.internal.cleartax.co/",
  "referrerPolicy": "origin",
  "body": "{\"userParams\":{\"bucketNameParams\":{\"length\":0},\"fileKeyParams\":{\"0\":\"7f1481df-e73f-4c3f-b590-c15e08f617d5/410808f6-863f-4b20-a20f-ab4b509b0ce9/2024/AUGUST/28/66cda9dcfa224c5f5c8837c7/data_extraction/7f1481df-e73f-4c3f-b590-c15e08f617d5/data.zip\",\"length\":1},\"delimiterParams\":{\"length\":0},\"maxKeysParams\":{\"length\":0},\"prefixParams\":{\"length\":0},\"signedOperationNameParams\":{\"length\":0},\"signedOperationOptionsParams\":{\"length\":0},\"uploadFileNameParams\":{\"length\":0},\"uploadFileTypeParams\":{\"length\":0},\"copySourceParams\":{\"length\":0},\"tagSetParams\":{\"length\":0}},\"queryType\":\"S3Query\",\"environment\":\"production\",\"showLatest\":false,\"isEditorMode\":false,\"frontendVersion\":\"1\",\"releaseVersion\":null,\"includeQueryExecutionMetadata\":true,\"resourceName\":\"779072eb-70da-480a-b275-dc5dd9e17500\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});