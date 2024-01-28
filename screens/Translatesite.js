import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firestore = getFirestore();
const Translatesite = () => {

  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('English');
  const [toLanguage, setToLanguage] = useState('Hindi');
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

//   const API_KEY = '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';
//   //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
//  // https://api.dictionaryapi.dev/api/v2/entries/en/hello
//   const translateText = async () => {
//     try {
//       const response = await axios.post(
//         'https://api.openai.com/v1/chat/completions',
//         {
//           messages: [
//             { role: 'user', content: 'Translate the following ${fromLanguage} text into ${toLanguage}: "${inputText}"' },

//             { role: 'assistance', content: 'translate' }
//           ],
//           max_tokens: 500,
//           model: 'gpt-3.5-turbo'
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ${API_KEY}',
//           },
//         }
//       );

//       setTranslatedText(response.data.choices[0].message.content);

//       Keyboard.dismiss();
//     } catch (error) {
//       console.error('Error translating text : ', error.response.data);
//     }
//   }

const [pairData, setPairData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pairCollection = await getDocs(collection(firestore, "pairs"));
        const data = pairCollection.docs.map(doc => doc.data());
        setPairData(data);
      } catch (error) {
        console.error('Error fetching pair data:', error);
      }
    };

    fetchData();
  }, []);

  // console.log("Pair", pairData);
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Android Translate</Text>
      <View style={styles.dropdowncontainer}>
        <DropDownPicker
          open={openFrom}
          value={fromLanguage}
          setOpen={setOpenFrom}
          setValue={setFromLanguage}
          items={[
            { label: 'English', value: 'English' },
            { label: 'French', value: 'French' },
            { label: 'German', value: 'German' },
            { label: 'Hindi', value: 'Hindi' },
          ]}
          defaultValue={fromLanguage}
          style={styles.dropdown}
          containerStyle={{ flex: 1, alignItems: 'center' }}
          onChangeItem={(item) => {
            setFromLanguage(item.value)
          }}
        />
        <DropDownPicker
          open={openTo}
          value={toLanguage}
          setOpen={setOpenTo}
          setValue={setToLanguage}
          items={[
            { label: 'English', value: 'english' },
            { label: 'French', value: 'french' },
            { label: 'German', value: 'german' },
            { label: 'Hindi', value: 'hindi' },
          ]}
          defaultValue={toLanguage}
          style={styles.dropdown}
          containerStyle={{ flex: 1, alignItems: 'center' }}
          onChangeItem={(item) => {
            setToLanguage(item.value)
          }}
        />
      </View>
      <TextInput style={styles.input}
        onChangeText={text => setInputText(text)}
        value={inputText}
        multiline>
      </TextInput>
      
      <TouchableOpacity
        onPress={async () => {
          try {
            const pair = pairData.find(item => item[fromLanguage.toLowerCase()].toLowerCase() === inputText.toLowerCase());

            if (pair) {
              setTranslatedText(pair[toLanguage.toLowerCase()]);
            } else {
              setTranslatedText('Translation not found');
            }

            Keyboard.dismiss();
          } catch (error) {
            console.error('Error translating text:', error);
          }
        }}
        style={{
          backgroundColor: '#2BB789',
          borderRadius: 100,
          alignItems: 'center',
          width: 300,
          paddingVertical: 5,
          marginVertical: 10
        }}
      >
        <Text style={{ color: '#006A42', fontSize: 25, fontWeight: 'bold' }}>
          Translate
        </Text>
      </TouchableOpacity>

      <Text style={styles.title2}>Translated Text</Text>
      <Text style={styles.text}>{translatedText}</Text>
    </View>
  )
}

export default Translatesite

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 30,
    color: '#fff',
    marginTop: 1
  }, dropdowncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }, dropdown: {
    backgroundColor: '#fff',
    width: 200,

    marginTop: 50,
    color: '#fff'
  },
  input: {
    height: 60,
    width: '100%',
    color: '#2BB789',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fff',
    padding: 10,
    marginTop: 100,
    
  }, buttontext: {
    color: '#2BB789',
    fontSize: 20,
    fontWeight: 'bold'
  }, button: {
    backgroundColor: '#2BB789',
    width: 200, 
    height: 50,
    marginTop: 50,
    borderRadius:10,
    justifyContent:'center',
    alignItems: 'center'
  },title2: {
    fontWeight:'bold',
    fontSize: 32,
    marginBottom: 20,
    color: '#fff',
    marginTop:50
  },text: {
    color: '#fff',
    fontSize: 50
  }
});