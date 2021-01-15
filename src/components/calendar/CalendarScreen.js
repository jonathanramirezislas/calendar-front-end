import { useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; //styles for calander
import { messages } from '../helpers/calendar-messages-es';

import { Navbar } from '../ui/Navbar';
import { CalendarModal } from './CalendarModal';
import { CalendarEvent } from './CalendarEvent';

moment.locale('es'); //configure to spanish moment

const localizer = momentLocalizer(moment);

const events = [
	{
		title: 'Cumpleaños de Jona',
		start: moment().toDate(),
		end: moment().add(2, 'hours').toDate(),
		bgcolor: '#fafafa',
	},
];

export const CalendarScreen = () => {
	//in order to save the view if the user reload page
	const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

	//this events are from BigCalendar
	const onDoubleClick = (e) => {
		console.log(e);
	};

	const onSelectEvent = (e) => {
		console.log(e);
	};

	const onViewChange = (e) => {
		setLastView(e);
		localStorage.setItem('lastView', e);
	};

	const onSelectSlot = (e) => {
		console.log(e);
	};

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
            
            <CalendarModal/>

		</div>
	);
};
