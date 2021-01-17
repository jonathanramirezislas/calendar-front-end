import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment"; 
import Swal from 'sweetalert2';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent } from '../../actions/events';

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

const initEvent = {
    title: 'note',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export const CalendarModal = () => {
    const { modalOpen } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar );
    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState(now.toDate());    
	const [dateEnd, setDateEnd] = useState(nowPlus1.toDate()); 
	const [titleValid, setTitleValid] = useState(true) 
	const [formValues, setFormValues] = useState( initEvent );

	const {notes,title, start, end} = formValues;

    const handleSubmitForm = (e) => {
        e.preventDefault();
		const momentStart = moment( start );
        const momentEnd = moment( end );
		//compering dates 
        if ( momentStart.isSameOrAfter( momentEnd ) ) {
			return Swal.fire('Error','The end date must be greater than the start date', 'error');
		}
        if ( title.trim().length < 2 ) {
            return setTitleValid(false);
        }
        //add new event
        dispatch( eventAddNew({
            ...formValues,
            id: new Date().getTime(),
            user: {
                _id: '123',
                name: 'Jonathan'
            }
        }) );

		setTitleValid(true); //the title is valid
		closeModal();
		console.log(formValues)
    }


    useEffect(() => {
        //Due to first time activeEvent is null we check because we can not set to form values in null
        if ( activeEvent ) {//each time when we set activeEvent by clicking(two times) on the note
            setFormValues( activeEvent );
        } else {
            setFormValues( initEvent );
        }
    }, [activeEvent, setFormValues])



	const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }
    const handleStartDateChange = (e) => {
		setDateStart(e);
		setFormValues({
			...formValues,
			start:e
		})
    }
    const handleEndDateChange = (e) => {
		setDateEnd(e);
		setFormValues({
			...formValues,
			end:e
		})
    }
	const closeModal = () => {
        dispatch(uiCloseModal()); //close modal
        dispatch(eventClearActiveEvent());//quit active note 
        setFormValues(initEvent);//reset form
	};

	return (
        <Modal
        isOpen={ modalOpen }
        onRequestClose={ closeModal }
        style={ customStyles }
        closeTimeoutMS={ 200 }
        className="modal"
        overlayClassName="modal-background"
      >
          <hr />
          <form
              className="container"
              onSubmit={ handleSubmitForm }
          >

              <div className="form-group">
                  <label>Fecha y hora inicio</label>
                  <DateTimePicker
                      onChange={ handleStartDateChange }
                      value={ dateStart }
                      className="form-control"
                  />
              </div>

              <div className="form-group">
                  <label>Fecha y hora fin</label>
                  <DateTimePicker
                      onChange={ handleEndDateChange }
                      value={ dateEnd }
                      minDate={ dateStart }
                      className="form-control"
                  />
              </div>

              <hr />
              <div className="form-group">
                  <label>Titulo y notas</label>
                  <input
                      type="text"
                      className={ `form-control ${ !titleValid && 'is-invalid' } `}
                      placeholder="Título del evento"
                      name="title"
                      autoComplete="off"
                      value={ title }
                      onChange={ handleInputChange }
                  />
                  <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
              </div>

              <div className="form-group">
                  <textarea
                      type="text"
                      className="form-control"
                      placeholder="Notas"
                      rows="5"
                      name="notes"
                      value={ notes }
                      onChange={ handleInputChange }
                  ></textarea>
                  <small id="emailHelp" className="form-text text-muted">Información adicional</small>
              </div>

              <button
                  type="submit"
                  className="btn btn-outline-primary btn-block"
              >
                  <i className="far fa-save"></i>
                  <span> Guardar</span>
              </button>

          </form>

      </Modal>
	);
};
