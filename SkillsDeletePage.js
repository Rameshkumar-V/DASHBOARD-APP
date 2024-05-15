import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { getToken } from './auth';

const SkillDeletePage = ({ navigation }) => {
    const [topics, Settopics] = useState([]); //Keys are stored
    const [Data, SetData] = useState({}); // All data stored
    const [seltopic, Setseltopic] = useState(''); //Selected topic stored
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const gettopics = async () => {
            try {
                const token=await getToken();
                
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const req = await axios.get('https://portfolio-backend-4-ahwz.onrender.com/data');
                const response = req.data;
                SetData(response[0]);

                const keys = Object.keys(response[0]);
                const keysfiltered = keys.filter((d) => d !== '_id' && d !== 'name');

                Settopics(keysfiltered);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };

        gettopics();
    }, []);

    async function SkillDelToDB(names) {
        // Add your code to delete the skill from the database
        setLoading(true);
        // console.log(names);
        const token=await getToken();

        try {
            console.log('jhh',token)
            
            axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
            const req = await axios.post('https://portfolio-backend-4-ahwz.onrender.com/delete', {
                topic: seltopic,
                name: names
            });

            const res = req.data;
            // console.log(res);

            if (res.status == 'success') {
                const updatedData = Data[seltopic].filter((d) => d.name !== names);
                SetData({ ...Data, [seltopic]: updatedData });
                Alert.alert('Info', 'Deleted Success');
            } else {
                Alert.alert('Info', 'Deletion Failed !');
            }

        } catch (err) {

        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    selectedValue={seltopic}
                    onValueChange={(itemValue, itemIndex) => Setseltopic(itemValue)}>
                    <Picker.Item label='Select' value='' />
                    {topics.map((data, i) => (
                        <Picker.Item key={i} label={data} value={data} />
                    ))}
                </Picker>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={styles.skillContainer}>
                    {Data[seltopic] &&
                        Data[seltopic].map((value, i) => (
                            <View key={i} style={styles.skillItem}>
                                <Text style={styles.skillText}>{value.name}</Text>
                                <TouchableOpacity style={styles.deleteButton}
                                    onPress={() => SkillDelToDB(value.name)}>
                                    <Text>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    pickerContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    skillContainer: {
        marginTop: 20,
    },
    skillItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    skillText: {
        fontSize: 18,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
});

export default SkillDeletePage;
