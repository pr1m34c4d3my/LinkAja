exports.retDayBoundary = (withSeconds = true) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  var startTime = year + '-' + month + '-' + date
  var endTime = year + '-' + month + '-' + date

  if (withSeconds) {
    startTime = startTime + ' 00:00:00';
    endTime = endTime + ' 23:59:59';
  }

  return {
    startTime: startTime,
    endTime: endTime
  }
}

exports.retWeekBoundaryToNow = (withSeconds = true) => {
  let ts = Date.now();
  let ts_end = new Date(ts);
  let ts_dow = ts_end.getDay() > 0 ? ts_end.getDay() - 1 : 6;
  let ts_start = new Date(new Date(ts).getTime() - (ts_dow * 60 * 60 * 24 * 1000));

  let date_end = ("0" + ts_end.getDate()).slice(-2);
  let month_end = ("0" + (ts_end.getMonth() + 1)).slice(-2);
  let year_end = ts_end.getFullYear();

  let date_start = ("0" + ts_start.getDate()).slice(-2);
  let month_start = ("0" + (ts_start.getMonth() + 1)).slice(-2);
  let year_start = ts_start.getFullYear();

  var startTime = year_start + '-' + month_start + '-' + date_start
  var endTime = year_end + '-' + month_end + '-' + date_end

  if (withSeconds) {
    startTime = startTime + ' 00:00:00';
    endTime = endTime + ' 23:59:59';
  }

  return {
    startTime: startTime,
    endTime: endTime
  }
}

exports.retYMD = (time) => {
  var date_ob = new Date(time)

  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();

  return year + '-' + month + '-' + date;
}
