import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ActivityIndicator,Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { getToken } from './auth';
import { Link } from '@react-navigation/native';

const SkillAdd = ({ navigation }) => {
    
  const [Skill, SetSkill] = useState('');
  const [link, Setlink] = useState('');
  const [loading, setLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [keys, setKeys] = useState([]);

    const renderPicker = () => {
        if (loading) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        } 
    };


    // Function to add data
const addData = async () => {
  try {
    const token = await getToken(); // Get the token
    const response = await axios.post('https://portfolio-backend-4-ahwz.onrender.com/add', {
      topic: selectedValue,
      data: Skill,
      link: link
    }, {
      headers: {
        'authorization': `Bearer ${token}` // Include the token in the request headers
      }
    });
    console.log('Add data response:', response.data);
    if (response.data.status=="success"){
      Alert.alert('Info','Data Added Success');
    }
    else{
      
      Alert.alert('Info','Data Added Failed !');

    }
    return response.data;
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
};

    const SkillAddToDB=()=>{
     
      if(selectedValue){
  
        addData();
        
      }else{
        Alert.alert('Failed', 'Select Value !');
   
      }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token=await getToken();
                const response = await axios.get('https://portfolio-backend-4-ahwz.onrender.com/getkeys', {
                  headers: {
                    'authorization': `Bearer ${token}` // Include the token in the request headers
                  }});
                const filteredKeys = response.data.filter(key => key !== '_id');
                setKeys(filteredKeys);
              
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <View style={style.container}>
            
            <TextInput 
                style={style.InputBox} 
                value={Skill}
                onChangeText={(text) => SetSkill(text)}
                placeholder="Enter new skill"
            />
            <TextInput 
                style={style.InputBox} 
                value={link}
                onChangeText={(text) => Setlink(text)}
                placeholder="Enter Link"
                
                
            />
            {renderPicker()}

            {!loading ? (
                <Picker 
                    style={style.SelectBox} 
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Select a skill" value="" />
                    {keys.map((data, i) => (
                        <Picker.Item key={i} label={data} value={data} />
                    ))}
                </Picker>
            ) : (
                <Text>Categories Loading...</Text>
            )}
            
            <TouchableOpacity style={style.button}  onPress={() => {
              SkillAddToDB()

    }} >
                <Text style={style.buttonText}>Add</Text>
            </TouchableOpacity >
        </View>
    );
};

const style = StyleSheet.create({
    InputBox: {
        height: 40,
        width: 300,
        borderWidth: 1,
        padding: 10,
        margin: 20,
        borderRadius: 10,
        fontSize: 16,
    },

    SelectBox: {
        height: 40,
        width: 300,
        padding: 10,
        margin: 20,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 40,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {
        height: 50,
        width: 200,
    },
});

export default SkillAdd;
