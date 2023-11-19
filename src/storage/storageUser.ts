import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "./storageConfig";
import { User } from "../@types/user";


export async function userStorageSave(user: User) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function userStorageGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE);

  const user = storage ? JSON.parse(storage) : {}
  return user;
}

export async function userStorageRemove() {
  await AsyncStorage.removeItem(USER_STORAGE)
}