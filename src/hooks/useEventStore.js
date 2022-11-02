import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { eventsApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadingEventos, onSetActiveEvent, onSetEventos, onUpdateElement } from "../store";


export const useEventStore = () => {
    const dispatch = useDispatch();

    const { isLoading, eventos, activeElement } = useSelector(state => state.eventos)
    const { user } = useSelector(state => state.auth)

    const setActiveEvent = (evento) => {
        dispatch(onSetActiveEvent(evento));
    };

    const startLoadingEvent = async () => {
        try {
            dispatch(onLoadingEventos());
            const { data } = await eventsApi.get('/events');
            const resp = data.msg;
            const events = convertEventsToDateEvents(resp);
            dispatch(onSetEventos(events));
        } catch (error) {
            console.log(error);
        }
    };

    const startSavingEvent = async (evento) => {

        if (evento.id) {
            //Actualizando
            await eventsApi.put(`/events/${evento.id}`, evento);
            dispatch(onUpdateElement({ ...evento, user }));
            return;
        } else {
            //Creando Nuevo
            const { data } = await eventsApi.post('/events', evento);
            dispatch(onAddNewEvent({ ...evento, id: data.evento.id, user }));
        }
    }

    const startDeleteEvent = async (evento) => {
        try {
            await eventsApi.delete(`/events/${evento.id}`);
            dispatch(onDeleteEvent());
            Swal.fire('Se ha borrao', 'Se borro jaja', 'success');
        } catch (error) {
            console.log(error);
            Swal.fire('Ocurrió un error', error.response.data.msg, 'error');
        }
    }

    return {
        //*Propiedades
        isLoading,
        eventos,
        activeElement,

        //*Métodos
        setActiveEvent,
        startLoadingEvent,
        startSavingEvent,
        startDeleteEvent,
    }

}