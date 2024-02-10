import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Button} from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DateRangeSelector = ({ onSelect }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const options = [
        { label: 'Past 24 hours', value: '1' },
        { label: 'Past 2 Days', value: '2' },
        { label: 'Past 7 Days', value: '7' },
        { label: 'Past 14 Days', value: '14' },
        { label: 'Past 30 Days', value: '30' },
        { label: 'Past Year', value: '365' },
    ];

    const handleSelect = (value) => {
        onSelect(value);
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity style={styles.DropButton}  onPress={() => setModalVisible(true)} ><Text style={{fontSize: 15, color: 'black'}}>{options.value}</Text><Icon style={{marginLeft: '5%'}} size={20} name='arrow-down-drop-circle' /></TouchableOpacity>
            <Modal
            style={{backgroundColor: 'white'}}
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.optionItem}
                                onPress={() => handleSelect(option.value)}>
                                <Text style={styles.optionText}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    DropButton: {
        display: 'flex',
        width: "40%",
        flexDirection: 'row',
        backgroundColor: 'white',
        color: 'white',
        padding: 10,
        borderRadius: 100,
        marginVertical: 8,
        marginHorizontal: 16,

    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    optionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    optionText: {
        textAlign: 'center',
    },
});

export default DateRangeSelector;
