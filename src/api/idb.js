let 

DB,

request = window.indexedDB.open("ToDoList", 1)

export default {

    startDB(){
        return new Promise((res, /*rej*/)=>{
            //if DB exists return it, if not create it
            if(DB){
                return res(DB)
            }
            request.onsuccess = () => {
                DB = request.result;
                res(request.result);
            };
            request.onupgradeneeded = () => {
                request.result.createObjectStore('todo', {autoIncrement: true});
            };
        })
    },

    async addToObject(){
        let db = await this.startDB(),
        store = db.transaction(['todo'], 'readwrite').objectStore('todo'),
        arr = []
        return new Promise((res, /*rej*/)=>{
            //just loop over the elements in the store and push its content to an array
            store.openCursor().onsuccess = e=> {
                let cursor = e.target.result;
                if(cursor){
                    arr.push({id: cursor.primaryKey, value: cursor.value})
                    cursor.continue();
                }else{
                    //if looped then return array
                    res(arr)
                }
            };
        })
    },

    async removeFromDB(id){
        //remove element from db, if successed return function, which returns true
        let db = await this.startDB()
        return db.transaction(['todo'], 'readwrite').objectStore('todo').delete(id)
            .onsuccess = () => true
    },

    async addToDB({value, id}){
        //put element into db, if successed return function, which returns true
        let db = await this.startDB()
        return db.transaction(['todo'], 'readwrite').objectStore('todo').put(value, id)
           .onsuccess = () => true
    },


}