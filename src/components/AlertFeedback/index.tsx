import {
    Alert,
    Box,
    CloseIcon,
    HStack,
    IconButton,
    VStack,
    Text,
    Slide,
    useToast,
    View,
} from 'native-base'
import gymbrozTheme from '../../theme/gymbrozTheme';
import React, { useEffect, useState } from 'react'
import { AlertContentFeed } from '../../context/useFeedback';
import { Dimensions } from 'react-native';

interface AlertFeedback {
    content: AlertContentFeed
}

interface FeedbackTypeContent {
    backgroudColor: string;
}

export type FeedbackType = 'success' | 'error' | 'info' | 'warning';

const AlertFedback: React.FC<AlertFeedback> = (contentProps) => {
    const toast = useToast();
    const { content } = contentProps

    const windowWidth = Dimensions.get('window').width;

    const FEEDBACK_BY_TYPE: { [key: string]: FeedbackTypeContent } = {
        error: {
            backgroudColor: gymbrozTheme.palette.error[200],
        },
        success: {
            backgroudColor: gymbrozTheme.palette.success[200],
        }
    }

    const getFeedbackStyle = (type: FeedbackType): FeedbackTypeContent => {
        return FEEDBACK_BY_TYPE[type];
    };

    return (
        <View width={windowWidth} display='flex' alignItems='center'>
            <Alert w="90%" status={content.typeMessage}
                style={{
                    elevation: 3,
                    backgroundColor: `${getFeedbackStyle(content.typeMessage!)?.backgroudColor}`
                }}
            >
                <VStack space={2} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={1} alignItems="center" justifyContent="space-between">
                        <HStack space={2} flexShrink={1} alignItems="center">
                            <Alert.Icon />
                            <Text fontSize="md" fontWeight="medium" _dark={{
                                color: "coolGray.800"
                            }}>
                                {content.title ? content.title : ''}
                            </Text>
                        </HStack>
                    </HStack>
                    <Box pl="6" _dark={{
                        _text: {
                            color: "coolGray.600"
                        }
                    }}>
                        {content.description ? content.description : ''}
                    </Box>
                </VStack>
            </Alert>
        </View>
    )
}

export default AlertFedback