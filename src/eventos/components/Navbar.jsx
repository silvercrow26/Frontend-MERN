import { addHours } from "date-fns";
import { useSelector } from "react-redux";
import { useAuthStore, useUiStore } from "../../hooks"
import { useEventStore } from "../../hooks/useEventStore";

export const Navbar = () => {

  const { user, startLogout } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useEventStore();

  const handleClickEvent = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 1),
      user: {
        _id: '',
        name: ''
      }
    })
    
    openDateModal();
  }

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-user"></i>
        &nbsp;
        {user.name}
      </span>

      <button
        className="btn btn-outline-success"
        onClick={handleClickEvent}
      >
        <span>Nuevo</span>
        &nbsp;
        <i className="fas fa-add"></i>
      </button>

      <button className="btn btn-outline-danger" onClick={startLogout}>
        <span>Salir</span>
        &nbsp;
        <i className="fas fa-sign-out-alt"></i>
      </button>
    </div>
  )
}
