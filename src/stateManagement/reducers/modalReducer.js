export const modalState = {
    modalIsOpen: false,
    modalTitle: '',
    modalId: '',
    modalDescription: '',
}

export const modalReducer = (state = modalState, action) => {
    switch (action.type) {
        case 'CLOSE_MODAL':
            return {
                modalIsOpen: false,
                modalTitle: '',
                modalId: '',
                modalDescription: ''
            }
        case 'OPEN_MODAL':
            return {
                modalIsOpen: true,
                modalTitle: action.payload.title,
                modalId: action.payload.id,
                modalDescription: action.payload.description
            }
        default: return state
    }
}