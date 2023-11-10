import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    ScrollView,
    Image
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getAllEvents } from "../../services/events";
import { Event } from "../../model/Events";
import { useFeedback } from "../../context/useFeedback";
import gymbrozTheme from "../../theme/gymbrozTheme";
import moment from "moment";
import { Fab } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome5'
import ModalFilters from "../ModalFilters";
import { SvgUri } from "react-native-svg";

const { width } = Dimensions.get("window");

const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const styles = StyleSheet.create({
    mapStyle: {
        width: '100%',
        height: '100%'
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    card: {
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: gymbrozTheme.palette.muted[500],
    },
    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    touch: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textTouch: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    }
});
const MapEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([] as Event[])
    const [modalVisible, setModalVisible] = useState(false);

    const _scrollView = useRef<null | ScrollView>(null);

    const { addFeedback } = useFeedback()

    let mapAnimation = new Animated.Value(0);

    moment.updateLocale('pt', {
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    });

    useEffect(() => {
        getAllEvents().then((res) => {
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

    const interpolations = events.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });

        return { scale };
    });

    const onMarkerPress = (mapEventData: any) => {
        const markerID = mapEventData._targetInst.return.key;

        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }

        _scrollView.current && _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    return (
        <>
            <Fab
                renderInPortal={false}
                bg={gymbrozTheme.palette.orange.light}
                _pressed={{ bg: gymbrozTheme.palette.orange.dark }}
                onPress={() => setModalVisible(true)}
                shadow={2}
                placement="top-right"
                size="sm"
                top={50}
                icon={
                    <Icon name="filter" size={25} color={gymbrozTheme.palette.light[50]} />
                }
            />
            <ModalFilters showModal={modalVisible} closeModal={handleCloseModal} />
            <MapView
                style={styles.mapStyle}
                initialRegion={{
                    latitude: -22.794131,
                    longitude: -45.199784,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {events ? events.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    };
                    return (
                        <Marker
                            key={index}
                            coordinate={{ latitude: marker.geocode[0], longitude: marker.geocode[1] }}
                            onPress={(e) => onMarkerPress(e)}
                        >
                            <Animated.View style={[styles.markerWrap]}>
                                {/* <Animated.Image
                                    source={{ uri: marker.eventType.eventTypeIconUrl }}
                                    style={[styles.marker, scaleStyle]}
                                    resizeMode="cover"
                                /> */}
                                {typeof marker.eventType.eventTypeIconUrl === 'string' ? (
                                    <SvgUri
                                        width="200"
                                        height="200"
                                        source={{ uri: marker.eventType.eventTypeIconUrl }}
                                    />
                                ) : (
                                    <></>
                                )}

                            </Animated.View>
                        </Marker>
                    )
                }) : null}
            </MapView>
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
            >
                {events.map((marker, index) => (
                    <View style={styles.card} key={index}>
                        <Image
                            source={{ uri: `https://picsum.photos/401/300` }}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                        <View style={styles.textContent}>
                            <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                            <Text style={styles.cardDescription}>{moment(marker.eventDate).format(`DD [de] MMMM [de] YYYY[, ]HH:mm`)}</Text>
                            <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                            <View style={styles.button}>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    style={[styles.touch, {
                                        borderColor: gymbrozTheme.palette.orange.main,
                                        borderWidth: 1
                                    }]}
                                >
                                    <Text style={[styles.textTouch, {
                                        color: gymbrozTheme.palette.orange.main
                                    }]}>Ver Mais</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>

        </>
    )
}

export default MapEvents