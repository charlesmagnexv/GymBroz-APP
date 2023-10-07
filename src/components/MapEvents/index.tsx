import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { getAllEvents } from "../../services/events";
import { Event } from "../../model/Events";
import { View, Text } from "native-base";
import { useFeedback } from "../../context/useFeedback";

const styles = StyleSheet.create({
    mapStyle: {
        width: '100%',
        height: '100%'
    },
});
const MapEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([] as Event[])

    const { addFeedback } = useFeedback()

    useEffect(() => {
        getAllEvents().then((res) => {
            console.warn("Retornou ao then ")
            if (res.events) {
                setEvents(res.events)
            }
        }).catch((err) => {
            setEvents([])
            console.error("Erro evento", err)
            addFeedback({
                title: "Erro",
                description: `Erro ao exibir eventos`,
                typeMessage: 'error'
            })
        })
    }, [])

    return (
        <>
            <MapView
                style={styles.mapStyle}
                initialRegion={{
                    latitude: -22.794131,
                    longitude: -45.199784,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {events ? events.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: marker.geocode[0], longitude: marker.geocode[1] }}
                        title={marker.title}
                        description={marker.description}
                    />
                )) : null}
            </MapView>
        </>
    )
}

export default MapEvents