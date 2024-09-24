// Method: Format the date
const max_day = 30;
const options = { year: 'numeric', month: 'short', day: 'numeric' };
export function formattedDateTime(date){
    let date1 = new Date(); //Today's date
    let date2 = new Date(date);

    //Calculate difference between 2 dates
    let diff_time = date1.getTime() - date2.getTime();
    let diff_days = Math.round(diff_time / (1000 * 60 * 60 * 24));

    if (diff_days < 7){
        return "Updated " + diff_days + " days ago"
    }
    if (diff_days >= 7 && diff_days <= max_day){
        let diff_weeks = Math.floor(diff_days / 7);
        return "Updated " + diff_weeks + " weeks ago"
    }else{
        return "Updated on " + new Date(date).toLocaleDateString('en-US', options);
    }

}