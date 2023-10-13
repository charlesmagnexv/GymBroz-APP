import { Button, FormControl, Input, Modal } from "native-base";
import React, { useEffect, useState } from "react";
import { getEventsTypes } from "../../services/events";
import { EventTypeDTO } from "../../model/Events";

interface ModalFiltersProps {
    showModal: boolean;
    closeModal: () => void
}

const ModalFilters: React.FC<ModalFiltersProps> = ({ showModal, closeModal }) => {
    const [eventsTypes, setEventsTypes] = useState<EventTypeDTO>({} as EventTypeDTO)

    useEffect(() => {
        getEventsTypes().then(res => {
            setEventsTypes(res.data)

        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <Modal isOpen={showModal} onClose={closeModal}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Escolha a Categoria aa</Modal.Header>
                    <Modal.Body>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={closeModal}>
                                Cancelar
                            </Button>
                            <Button onPress={() => {
                            }}>
                                Aplicar
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default ModalFilters