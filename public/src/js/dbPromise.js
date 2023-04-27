var dbPromise = idb.open("posts-store", 1, (dataBASE) => {
  if (dataBASE.objectStoreNames.contains("posts")) {
    dataBASE.createObjectStore("posts", { keyPath: "id" });
  }
});

function writeData(storeName, data) {
  return dbPromise.then((db) => {
    var tx = db.transaction(storeName, "readwrite");
    var store = tx.objectStore(storeName);
    store.put(data);
    return tx.complete;
  });
}

function readAllData(storeName) {
    return dbPromise.then((db) => {
      var tx = db.transaction(storeName, "readonly");
      var store = tx.objectStore(storeName);
      return store.getAll();
    });
  }
  
function clearAllData(storeName) {
    return dbPromise.then((db) => {
      var tx = db.transaction(storeName, "readwrite");
      var store = tx.objectStore(storeName);
      store.clear();
      return tx.complete;
    });
  }