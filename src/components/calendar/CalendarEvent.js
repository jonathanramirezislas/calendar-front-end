
export const CalendarEvent = ({ event }) => {

    const { title, name } = event;

    return (
        <div>
            <strong> { title } </strong>
            <span>- { name } </span>
        </div>
    )
}
