// single file download demo via specific commandId
// const singleFileDemo = await fetch(
//   "https://retool.internal.cleartax.co/api/pages/uuids/ /query?queryName=download_staging_zip_file",
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
//       timestamp: " ",
//       "x-retool-client-version": "2.113.22-  (Build 1874)",
//       "x-xsrf-token": " ",
//       cookie:
//       Referer: "https://retool.internal.cleartax.co/",
//       "Referrer-Policy": "origin",
//     },
//     body: ''
//     method: "POST",
//   }
// );

// console.log(singleFileDemo);

const responseArray = [];
// gettling all files from intercom - erp via cleartax id and intercom - cookies and erp instance
const response = await fetch(
  "https://retool.internal.cleartax.co/api/pages/uuids/ /query?queryName=get_command_queue",
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
      timestamp: " ",
      "x-retool-client-version": "2.113.  (Build 1874)",
      "x-xsrf-token": " ",
      cookie: "",
      Referer: "https://retool.internal.cleartax.co/",
      "Referrer-Policy": "origin",
    },
    body: "",
    method: "POST",
  }
)
  .then((response) => response.json())
  .then((data) => {
    const lmtdata = data.queryData.slice(0, 5);
    responseArray.push(lmtdata);
  });

console.log(responseArray);
