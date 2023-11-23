import { 
    Button, 
    Center, 
    HStack, 
    VStack,
    Modal, 
    Spinner,
    Text 
} from "native-base";
import React, { useEffect, useState } from "react";
import gymbrozTheme from "../../theme/gymbrozTheme";

interface ModalUserImage {
    showModal: boolean;
    closeModal: () => void
}

const ModalUserImage: React.FC<ModalUserImage> = ({ showModal, closeModal }) => {
    const [loading, setLoading] = useState<Boolean>(true)

    return (
        <>
            <Modal isOpen={showModal} onClose={closeModal}>
                <Modal.Content maxWidth="450px">
                    <Modal.CloseButton />
                    <Modal.Header>
                        <VStack space={1}>
                            <Text></Text>
                            <Text bold fontSize={15} color={gymbrozTheme.palette.primary.main}>
                                Escolha uma Nova Imagem de Perfil
                            </Text>
                        </VStack>
                    </Modal.Header>
                    <Modal.Body>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <HStack space={2}>
                            <Button 
                                width={120} 
                                variant="ghost" 
                                colorScheme="blueGray"
                                bg={gymbrozTheme.palette.muted[300]} 
                                onPress={closeModal}>
                                Cancelar
                            </Button>
                            <Button
                                bg={gymbrozTheme.palette.secondary.main}
                                width={120}
                                _pressed={{ bg: gymbrozTheme.palette.secondary.dark }}
                                onPress={() => {
                                }}
                            >
                                Aplicar
                            </Button>
                        </HStack>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default ModalUserImage