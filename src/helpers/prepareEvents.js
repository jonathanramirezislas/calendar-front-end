import moment from 'moment'

export const prepareEvents = ( events = [] ) => {
            //iterate each event
    return events.map(
        (e) => ({
            ...e,
            end: moment( e.end ).toDate(), //convert string to date
            start: moment( e.start ).toDate(),
        })
    );

}