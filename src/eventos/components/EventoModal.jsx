import { useEffect, useState } from 'react';

import Modal from 'react-modal'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import es from 'date-fns/locale/es';
import { registerLocale } from 'react-datepicker';
import { differenceInSeconds, parseISO } from 'date-fns';

import Swal from 'sweetalert2';
import { useMemo } from 'react';
import { useUiStore } from '../../hooks';
import { useEventStore } from '../../hooks/useEventStore';



registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '60%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const EventoModal = () => {

    const { activeElement, startSavingEvent, startLoadingEvent } = useEventStore();
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: 'Silvercrow',
        notes: 'Si',
        start: new Date(),
        end: new Date(),
    })

    const titleClass = useMemo(() => {

        if (!formSubmitted) return '';

        return (formValues.title.length > 0)
            ? ''
            : 'is-invalid';

    }, [formValues.title, formSubmitted])

    useEffect(() => {
        if (activeElement !== null) {
            setFormValues({ ...activeElement })
        }

    }, [activeElement])


    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds(formValues.end, formValues.start)

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Error', 'Revisar las fechas ingresadas', 'error')
            return
        }

        if (formValues.title.length <= 0) return;
        
        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmitted(false);
    }
    
    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={closeDateModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={1000}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        locale="es"
                        selected={formValues.start}
                        onChange={(event) => onDateChange(event, 'start')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        locale='es'
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(event) => onDateChange(event, 'end')}
                        className="form-control"
                        dateFormat="Pp"
                        timeCaption='Hora'
                        showTimeSelect
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
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
    )
}
