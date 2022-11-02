import { useEffect } from "react"
import { useEventStore } from "../../hooks/useEventStore"
import { EventoItem } from "./EventoItem"



export const EventoCard = () => {

  const { startLoadingEvent, isLoading, eventos } = useEventStore();

  useEffect(() => {
    startLoadingEvent();
  }, [])



  return (
    <>

      <span>{isLoading ? "Cargando eventos..." :
        eventos.length === 0 ? "No hay eventos disponibles":eventos.map(evento => (
          <EventoItem key={evento.id}
            {...evento}
          />
        ))
      }</span>
    </>
  )
}
