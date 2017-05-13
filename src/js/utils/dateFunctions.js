export function addDays(startDate,numberOfDays) {
		const returnDate = new Date(
								startDate.getFullYear(),
								startDate.getMonth(),
								startDate.getDate()+numberOfDays,
								startDate.getHours(),
								startDate.getMinutes(),
								startDate.getSeconds());
		return returnDate;
}

export function getDateStringOnly(ISOString) {
  const date = new Date(ISOString);
  const year = date.getFullYear();
  let month = date.getMonth()+1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  
  if (month < 10) {
    month = '0' + month;
  }

  return year + '-' + month + '-' + dt;
}