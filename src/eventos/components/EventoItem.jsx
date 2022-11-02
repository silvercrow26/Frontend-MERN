import { format } from "date-fns";
import { useUiStore } from "../../hooks"
import { useEventStore } from "../../hooks/useEventStore";
import es from 'date-fns/locale/es';
import Swal from "sweetalert2";


export const EventoItem = (evento) => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent, startDeleteEvent, activeElement } = useEventStore();

    const inicio = format(new Date(evento.start), 'PPpp a', { locale: es });
    const final = format(new Date(evento.end), 'PPpp a', { locale: es });

    const handleEdit = (event) => {
        event.preventDefault();
        setActiveEvent(evento);
        openDateModal();
    }

    const handleRemoveModal = (event) => {
        event.preventDefault();
        setActiveEvent(evento);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await startDeleteEvent(evento);
                setActiveEvent(null);
            } else {
                setActiveEvent(null);
            }
        })
    }

    return (

        <form className="card m-5 d-flex flex-row w-50">
            <div className="card-body w-75">
                <h5 className="card-title">{evento.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Inicio: {inicio}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Fin: {final}</h6>
                <p className="card-text">{evento.notes}</p>
            </div>
            <div className="card-body d-flex justify-content-center">
                <button
                    onClick={handleEdit}
                    className="btn btn-warning botones mx-3">
                    <i className="fas fa-edit" aria-hidden="true"></i>
                </button>
                <button
                    onClick={handleRemoveModal}
                    className="btn btn-danger botones">
                    <i className="fas fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        </form>
    )
}
