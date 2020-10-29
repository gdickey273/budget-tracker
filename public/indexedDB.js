const request = window.indexedDB.open("BudgetTrackerDB", 1);
var budgetEntryStore;
// Create schema
request.onupgradeneeded = event => {
  const db = event.target.result;
  
  // Creates an object store with a listID keypath that can be used to query on.
  const budgetEntryStore = db.createObjectStore("BudgetTrackerDB", {keyPath: "entryID"});
  // Creates a statusIndex that we can query on.
  budgetEntryStore.createIndex("statusIndex", "status"); 
}

// Opens a transaction, accesses the toDoList objectStore and statusIndex.
request.onsuccess = () => {
  const db = request.result;
  const transaction = db.transaction(["BudgetTrackerDB"], "readwrite");
  budgetEntryStore = transaction.objectStore("BudgetTrackerDB");
  const statusIndex = toDoListStore.index("statusIndex");

  // Return an item by index
  const getRequestIdx = statusIndex.getAll("untracked");
  getRequestIdx.onsuccess = () => {
    console.log(getRequestIdx.result); 
  }; 
};