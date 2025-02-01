import { get_command_queue } from "./commandQueue.js";
import { requestRetoool } from "./commandDownload.js";
import { filterIdsByDateRangeAndStatus } from "./filterIdByDate.js";
import values from "../query-config.json" assert { type: "json" };

const ids = {
  workspaceId: "",
  erpInstance: "",
  commandId: "",
  year: "",
  month: "",
  date: "",
  cleartax: "",
};
async function testCommandDownload() {
  // get the ids, via config or just for demo here
  ids.cleartax = " ";
  ids.commandId = " ";
  ids.date = "4";
  ids.month = "SEPTEMBER";
  ids.year = "2024";
  ids.workspaceId = " ";
  ids.erpInstance = " - ";

  // test it for downloading
  console.log(ids);
  await requestRetoool(ids);
}

async function testCommandQueue() {
  // list all the ids via instances,
  ids.cleartax = " ";
  ids.workspaceId = " ";
  ids.erpInstance = " ";

  // ids.workspaceId = values.workspaceId
  // ids.erpInstance = values.erpInstanceId

  // test for all command to get listed
  // console.log(ids);
  const response = await get_command_queue(ids);
  return response;
}

// working
// testCommandQueue();

// create one scrpt
async function main() {
  const data = await testCommandQueue();

  const startDate = "2024-06-22";
  const endDate = "2024-08-31";

  const idsInRangeAndStatus = await filterIdsByDateRangeAndStatus(
    data,
    startDate,
    endDate
  );
  console.log("Filtered IDs:", JSON.stringify(idsInRangeAndStatus, null, 2));

  // now download all thesea into input folder under one
  console.log(
    `filtered result length from ${startDate} to ${endDate}`,
    idsInRangeAndStatus.length
  );
  // console.log("ids within the filter", idsInRangeAndStatus)
  await tryDownloadingAll(idsInRangeAndStatus);
  console.log("Done!");
}

main();

async function tryDownloadingAll(idsInRangeAndStatus) {
  ids.cleartax = " ";
  ids.workspaceId = " ";
  ids.erpInstance = " ";

  // ids.workspaceId = values.workspaceId
  // ids.erpInstance = values.erpInstanceId

  const success = [];
  const failed = [];
  for (let i = 0; i < idsInRangeAndStatus.length; i++) {
    const entry = idsInRangeAndStatus[i];
    ids.commandId = entry._id;
    const { year, month, day } = extractDate(entry.createdAt);
    ids.date = day;
    ids.month = month;
    ids.year = year;
    const status = await requestRetoool(ids);

    if (status === 200) {
      success.push(ids.commandId);
    } else {
      failed.push({
        commandIdx: ids.commandId,
        response: JSON.stringify(status, null, 2),
      });
    }
    console.log(`down;loaded command id :- ${ids.commandId} `);
  }

  console.log("failed files ids are:-", failed);
  console.log("d success are: -", success);
}

function extractDate(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) {
    throw new Error("Invalid date string");
  }

  const year = date.getUTCFullYear();
  const monthNames = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();

  return { year, month, day };
}
