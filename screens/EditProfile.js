import * as React from "react";
import { View, Text, StyleSheet ,TextInput,Image,TouchableOpacity} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { User, updateProfile } from "firebase/auth";
import { FireBase_Auth, FireStore } from "../FirebaseConfig";
import { ref, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";

import * as ImagePicker from "expo-image-picker";
const EditProfile = (props) => {
    
  const [username, setUsername] = useState(user?.displayName);
  const [email, setEmail] = useState(user?.email);

  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState( null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = FireBase_Auth.onAuthStateChanged((user) => {
      setUser(user);
      setEmail(user.email)
      setUsername(user.displayName)
      setSelectedImage(user.photoURL)
     
    });

    return () => unsubscribe();
  }, []);

  const openImagePickerAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    //console.log('=====')
    try {
      if (user) {
        const storage = getStorage();
        const fileref = `profile_images/${Date.now()}.jpg`;
        const storageRef = ref(storage, fileref);

        const response = await fetch(selectedImage);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(storageRef);

        await updateProfile(user, {
          photoURL: downloadURL,
          displayName: username,
          email:email,
        });

        navigation.navigate("Settingdrawer");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return !user ? null :(
    <View>
      <View style={styles.topContainer}>
        <View>
          {user.photoURL == null ? (
            <Image
              style={styles.profilePicture}
             source={require("../assets/splashscreen.png")}
            />
          ) : (
            <Image
              style={styles.profilePicture}
              source={{
                uri: `${selectedImage}`,
              }}
            />
          )}

          <Icon
            name="camera"
            style={styles.cameraicon}
            size={25}
         onPress={openImagePickerAsync}
          />
        </View>
        <View style={styles.inputcontainer}>
          <View style={styles.inputFild}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              editable= {false}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputFild}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
             value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleSubmit()} 
          >
            <Text style={styles.buttonlabel}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  cameraicon: {
    alignSelf: "flex-end",
    marginTop: -30,
    color: "#BBB9B8",
  },
  inputcontainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  input: {
    height: 50,
    borderColor: "gray",
    backgroundColor: "#F9FBF9",
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 8,
    width: "100%",
    fontSize: 16,
  },
  passwordFild: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    fontSize: 16,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 10000,
    borderWidth: 5,
    borderColor: "#ffff",
  },
  passwordFildWraper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FBF9",
    borderRadius: 8,
  },
  inputFild: {
    width: "100%",
    gap: 5,
  },
  label: {
    paddingLeft: 5,
    fontSize: 16,
  },
  editButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    height: 50,
    paddingLeft: 8,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonlabel: {
    fontSize: 20,
    fontWeight: "bold",
    
  },
});







