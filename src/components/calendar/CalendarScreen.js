import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; //styles for calander
import { messages } from '../../helpers/calendar-messages-es';
import { useDispatch, useSelector } from 'react-redux';

import { Navbar } from '../ui/Navbar';
import { CalendarModal } from './CalendarModal';
import { CalendarEvent } from './CalendarEvent';
import { uiOpenModal } from '../../actions/ui';
import { AddNewFab } from '../ui/AddNewFab';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es'); //configure to spanish moment

const localizer = momentLocalizer(moment);



export const CalendarScreen = () => {

	//get events from store
    const { events, activeEvent } = useSelector( state => state.calendar );


	//in order to save the view if the user reload page
	const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
	const dispatch = useDispatch();
	


	useEffect(() => {
		//GET EVENTS
        dispatch( eventStartLoading() );

    }, [ dispatch ])



	//this events are from BigCalendar
	const onDoubleClick = (e) => {
		dispatch( uiOpenModal() );  //to open modal
		
	};

	const onSelectEvent = (e) => {
	//	console.log(e);
		dispatch( eventSetActive( e ) );
	};

	const onViewChange = (e) => {
		setLastView(e);
		localStorage.setItem('lastView', e);
	};

	const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() ); //clear event active
    }

	//Styles for the events
	const eventStyleGetter = (even, start, end, isSelected) => {
		const style = {
			backgroundColor: '#367cF7',
			borderRadius: '0px',
			opacity: 0.8,
			display: 'block',
			color: 'white',
		};
		return {
			style,
		};
	};

	return (
		<div className="calendar-screen">
			<Navbar />

			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 500 }}
				messages={messages}
				eventPropGetter={eventStyleGetter}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelectEvent}
				onView={onViewChange}
				onSelectSlot={onSelectSlot}
				selectable={true}
				view={lastView}
				components={{ event: CalendarEvent }}
			/>
				<AddNewFab />
            {/*if there is a active note we show the component delete (button) */}
            {
                (activeEvent) && <DeleteEventFab />
            }
            <CalendarModal/>

		</div>
	);
};
