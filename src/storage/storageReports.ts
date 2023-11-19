import AsyncStorage from "@react-native-async-storage/async-storage";
import { REPORTS_STORAGE } from "./storageConfig";
import { Report } from "../@types/report";

export async function reportStorageSave(report: Report) {
  const storedReports = await reportStorageGet();
    storedReports.unshift(report)
  const storage = JSON.stringify(storedReports);
  await AsyncStorage.setItem(REPORTS_STORAGE, storage);
}

export async function reportStorageGet() {
  const storage = await AsyncStorage.getItem(REPORTS_STORAGE);

  const report: Report[] = storage ? JSON.parse(storage) : [];
  return report;
}

export async function reportStorageRemove() {
  await AsyncStorage.removeItem(REPORTS_STORAGE);
}
