import moment from 'moment';

export const timeRangeFormatter = (time: number | string): string => {
    const date = moment.unix(Number(time));
    const now = moment();

    const seconds = now.diff(date, 'seconds');
    const minutes = now.diff(date, 'minutes');
    const hours = now.diff(date, 'hours');
    const days = now.diff(date, 'days');

    if (seconds < 60) {
        return seconds + ' second' + (seconds === 1 ? '' : 's') + ' ago';
    }
    if (minutes < 60) {
        return minutes + ' minute' + (minutes === 1 ? '' : 's') + ' ago';
    }
    if (hours < 24) {
        return hours + ' hour' + (hours === 1 ? '' : 's') + ' ago';
    }
    return days + ' day' + (days === 1 ? '' : 's') + ' ago';
};

export const dateConverter = (timestamp: number) => {
    return moment(timestamp).format('YYYY-MM-DD');
};
