import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import AlertFedback from "../components/AlertFeedback";
import { useToast } from "native-base";

export interface AlertContentFeed {
    title?: string;
    description?: string;
    typeMessage?: 'success' | 'error' | 'info' | 'warning';
    okButtonAction?: () => void
}

interface AlertContendDTO {
    addFeedback(content: AlertContentFeed): void
}

const FeedbackContext = createContext<AlertContendDTO>({} as AlertContendDTO)

export const useFeedback = (): AlertContendDTO => useContext(FeedbackContext)

export const FeedbackProvider = ({ children }: any) => {
    const [content, setContent] = useState<AlertContentFeed>({} as AlertContentFeed)

    const toast = useToast();

    const addFeedback = useCallback((content: AlertContentFeed) => {
        setContent(content)
    }, [])

    useEffect(() => {
        if (Object.keys(content).length !== 0) {
            toast.show({
                render: () => {
                    return <AlertFedback content={content} />
                },
                placement: "top"
            })
        }
    }, [content])

    return (
        <FeedbackContext.Provider value={{ addFeedback }}>
            {children}
        </FeedbackContext.Provider>
    )
}

export default { FeedbackProvider }