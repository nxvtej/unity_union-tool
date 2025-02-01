/**
 * make it configurable
 *
 * things that are dynamic and static
 *
 * static:- cleartaxId,
 *
 * dynamic:- workspaceid, erpinstanceid, date, commandid
 *
 * (note:- node -v20 < , doesnt support json import like this so rather get it via sync)
 * securityRelated :- dateStamp, accessToken, cookies, xSurfToken
 */

import { readFile } from "fs/promises";
import { get_command_queue } from "./downloadAllFiles/get_all_files_from_Erp.js";

// writing base script
async function main() {
  // first step get all the commandIds from erpId
  try {
    const idsData = await readFile(
      new URL("./ids.json", import.meta.url),
      "utf-8"
    );
    const ids = JSON.parse(idsData);

    // getting all files but this will require erpInstance, workspace, so sending the config files here
    // set erpIds or let it be default
    const allFiles = await get_command_queue(ids);
  } catch (e) {
    console.log("error", e);
  }
}

main();
