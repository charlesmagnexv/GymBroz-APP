import { Badge, Box, Button, Center, HStack, Modal, Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import { getEventsTypes } from "../../services/events";
import { EventTypeDTO } from "../../model/Events";
import { useFeedback } from "../../context/useFeedback";
import gymbrozTheme from "../../theme/gymbrozTheme";

interface ModalFiltersProps {
    showModal: boolean;
    closeModal: () => void;
    refreshEvents: (id: string) => void;
}

const ModalFilters: React.FC<ModalFiltersProps> = ({ showModal, closeModal, refreshEvents }) => {
    const [eventsTypes, setEventsTypes] = useState<EventTypeDTO>({} as EventTypeDTO)
    const [loading, setLoading] = useState<Boolean>(true)
    const [typesSelected, setTypesSelected] = useState<number>()

    const { addFeedback } = useFeedback()

    useEffect(() => {
        setLoading(true)
        getEventsTypes().then(res => {
            setEventsTypes(res.data)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
            addFeedback({
                title: 'Erro',
                description: 'Infelizmente não conseguimos exibir as categorias :(',
                typeMessage: 'error'
            })
        })
    }, [])

    const changeFilterList = (id: number) => {
        setTypesSelected(id)
    }

    const filterEvents = () => {
        // if(typesSelected) refreshEvents(typesSelected)
    }
    
    return (
        <>
            <Modal isOpen={showModal} onClose={closeModal}>
                <Modal.Content maxWidth="420px">
                    <Modal.CloseButton />
                    <Modal.Header>Escolha a Categoria</Modal.Header>
                    <Modal.Body>
                        <HStack flexWrap='wrap' display='flex' space={2} justifyContent={'center'}>
                            {loading ?
                                (
                                    <Center h={180}>
                                        <Spinner size="lg" color={gymbrozTheme.palette.orange.light} />
                                    </Center>
                                ) :
                                (eventsTypes.eventTypes ? eventsTypes.eventTypes.map((types, index) => {
                                    return (
                                        <Badge
                                            key={types.id}
                                            variant="subtle"
                                            colorScheme="coolGray"
                                            mt={2}
                                            mb={2}
                                            _text={{ fontSize: 15 }}
                                            onTouchStart={() => {
                                                changeFilterList(types.id)
                                            }}
                                        >
                                            {types.title}
                                        </Badge>
                                    )
                                }) : null)
                            }
                        </HStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={closeModal}>
                                Cancelar
                            </Button>
                            <Button
                                bg={gymbrozTheme.palette.secondary.main}
                                _pressed={{ bg: gymbrozTheme.palette.secondary.dark }}
                                onPress={() => {

                                }}
                            >
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