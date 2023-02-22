export default function getWeekNumberMovie(time) {

    let tmp = new Date(time.slice(0, 10));
    let militmp = Number(tmp);

    let currentDate = new Date();
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    let micurrentDate = Number(currentDate);
    let mistartDate = Number(startDate);

    let dayNow = Math.floor((micurrentDate - mistartDate) / (24 * 60 * 60 * 1000));
    let dayMovie = Math.floor((militmp - mistartDate) / (24 * 60 * 60 * 1000));

    let weekNumber = Math.ceil(dayNow / 7)
    let weekNumberMovie = Math.ceil(dayMovie / 7);

    return (weekNumber === weekNumberMovie)
}
