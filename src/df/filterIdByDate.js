async function logic(length, allIds, start, end, status, filterIdByDate){
  for (let i = 0; i < length; i++) {
    const entry = allIds[i];
    const scheduleDate = new Date(entry.scheduledAt);

    if (
      scheduleDate >= start &&
      scheduleDate <= end &&
      entry.status === status
    ) {
      filterIdByDate.push(entry);
    }
  }
  return filterIdByDate
}
export async function filterIdsByDateRangeAndStatus(
    data,
    startDate,
    endDate,
    status = "COMPLETED"
  ) {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (isNaN(start) || isNaN(end)) {
      throw new Error("Invalid start or end date.");
    }
  
    const length = await data.queryData.length;
    const allIds = await data.queryData;
    const filterIdByDate = [];

    // --------------------------old logic ---------------------------------------//
 
    await logic(length, allIds, start, end, status, filterIdByDate)


// new logic which includes the fromDate and toDate  

    return filterIdByDate;
  }
  