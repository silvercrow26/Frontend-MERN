import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal, onSetActiveEvent } from "../store";



export const useUiStore = () => {

    const dispatch = useDispatch();

    //UseSelector permite usar una función del store
    const { isDateModalOpen } = useSelector(state => state.ui);


    const openDateModal = () => {
        dispatch(onOpenDateModal());
    }

    const closeDateModal = () => {
        dispatch(onSetActiveEvent(null));
        dispatch(onCloseDateModal());
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
        ? openDateModal()
        : closeDateModal();
    }

    return {
        //*Propiedades
        isDateModalOpen,

        //*Métodos
        openDateModal,
        closeDateModal,
        toggleDateModal,
    }
}
