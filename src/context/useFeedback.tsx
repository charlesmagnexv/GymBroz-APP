import React, { ReactNode, createContext, useCallback, useContext, useState } from "react";
import AlertFedback from "../components/AlertFeedback";

export interface AlertContentFeed {
    title?: string;
    description?: string;
    typeMessage?: 'error' | 'success';
    okButtonAction?: () => void
}

interface AlertContendDTO {
    addFeedback(content: AlertContentFeed): void
}

const FeedbackContext = createContext<AlertContendDTO>({} as AlertContendDTO)

export const useFeedback = (): AlertContendDTO => useContext(FeedbackContext)

export const FeedbackProvider = ({ children }: any) => {
    const [content, setContent] = useState<AlertContentFeed>({} as AlertContentFeed)

    const addFeedback = useCallback((content: AlertContentFeed) => {
        setContent(content)
    }, [])

    return (
        <FeedbackContext.Provider value={{ addFeedback }}>
            {children}
            <AlertFedback content={content} />
        </FeedbackContext.Provider>
    )
}

export default { FeedbackProvider }