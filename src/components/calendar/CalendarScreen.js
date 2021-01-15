import React from 'react'
import moment from 'moment';
import 'moment/locale/es';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; //styles for calander
import { messages } from '../helpers/calendar-messages-es';

import { Navbar } from '../ui/Navbar'

moment.locale('es');//configure to spanish moment


const localizer = momentLocalizer(moment);

const events=[{
        title:'Cumpleaños de Jona',
        start: moment().toDate(),
        end:moment().add(2, 'hours').toDate(),
        bgcolor:'#fafafa',
}]


export const CalendarScreen = () => {

    const eventStyleGetter=(even, start, end, isSelected) =>{
        
        const style={
            backgroundColor:'#367cF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color:'white'
        }

        return {
            style
        }
    
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
                 />

            </div>
    )
}
