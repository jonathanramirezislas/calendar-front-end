import { useState } from 'react';
import moment from "moment"; 

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

Modal.setAppElement('#root');

const now= moment().minutes(0).seconds(0).add(1, 'hours');

const nowPlus1 =now.clone().add(1, 'hours')

export const CalendarModal = () => {
    const [dateStart, setDateStart] = useState(now.toDate());    
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());    

    const [isOpen, setIsOpen] = useState(true);

    const handleStartDateChange = (e) => {
        setDateStart(e);
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
    }


	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<Modal
			isOpen={isOpen}
			//onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			contentLabel="Example Modal"
			className="modal"
			overlayClassName="modal-background"
		>
			<h1> New Event </h1>
			<hr />
			<form className="container">
				<div className="form-group">
					<label>Start date & hour</label>
					<DateTimePicker 
                        className="form-control" 
                        onChange={handleStartDateChange} 
                        value={dateStart} 
                    />
				</div>

				<div className="form-group">
					<label>End date & hour</label>
                    <DateTimePicker 
                        className="form-control" 
                        onChange={handleEndDateChange} 
                        value={dateEnd} 
                        minDate={dateStart}
                    />			
                </div>

				<hr />
				<div className="form-group">
					<label>Tittle & Notes</label>
					<input
						type="text"
						className="form-control"
						placeholder="event tittle"
						name="title"
						autoComplete="off"
					/>
					<small id="emailHelp" className="form-text text-muted">
						Description
					</small>
				</div>

				<div className="form-group">
					<textarea type="text" className="form-control" placeholder="Notes" rows="5" name="notes"></textarea>
					<small id="emailHelp" className="form-text text-muted">
						More information
					</small>
				</div>

				<button type="submit" className="btn btn-outline-primary btn-block">
					<i className="far fa-save"></i>
					<span> Save</span>
				</button>
			</form>
		</Modal>
	);
};
