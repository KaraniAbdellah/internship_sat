import { DatasetType } from "@/global/types/DatasetType";
import { DB_CONFIG } from "../constants/conts";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_CONFIG.NAME, DB_CONFIG.VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(DB_CONFIG.STORE)) {
        db.createObjectStore(DB_CONFIG.STORE, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getStoredDatasets(): Promise<DatasetType[]> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_CONFIG.STORE, "readonly");
    const store = tx.objectStore(DB_CONFIG.STORE);
    const req = store.getAll();

    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

export async function persistDataset(dataset: DatasetType): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_CONFIG.STORE, "readwrite");
    const store = tx.objectStore(DB_CONFIG.STORE);
    store.put(dataset);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function persistPolicy(id: string, policy: string): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_CONFIG.STORE, "readwrite");
    const store = tx.objectStore(DB_CONFIG.STORE);
    const getReq = store.get(id);

    getReq.onsuccess = () => {
      const record: DatasetType = getReq.result;
      if (record) {
        record.policy = policy;
        store.put(record);
      }
      resolve();
    };
    tx.onerror = () => reject(tx.error);
  });
}

export async function removeDataset(id: string): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_CONFIG.STORE, "readwrite");
    const store = tx.objectStore(DB_CONFIG.STORE);
    store.delete(id);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
