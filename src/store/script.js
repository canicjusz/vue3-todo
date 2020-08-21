import { createStore } from 'vuex'

import idb from '@/api/idb';

let removeShow

export default createStore({
    state: {
        elements: [],
        newElementVal: '',
        show: false
    },
    //heard that mutations have to be synchronous but even if they are not it works xD
    mutations: {
        async addNewElement(state){
            //get upcoming id
            let upCommingID = this.getters.upCommingID,
            //add element to IDB
            valid = await idb.addToDB(state.newElementVal, upCommingID)
            //if operation successed, show the alert, add element to an array and reset input value
            if(valid()){
                state.elements.push({id: upCommingID, value: state.newElementVal})
                state.newElementVal = ''
                this.commit("showTransiton")
            }
        },
        
        async updateFromDB(state){
            //get the elements from IDB and set them as elements array
            state.elements = await idb.addToObject()
        },

        async removeElement(state, id){
            //remove the element from IDB
            let valid = await idb.removeFromDB(id)
            //if operation successed, show the alert
            if(valid()){
                this.commit("showTransiton")
            }
        },
        //gotta use destructuration, since you cant pass more than one argument (I guess?)
        async changeVal(state, {id, val}){
            //set new value to an existing element 
            let valid = await idb.addToDB(val, id)
            //if operation successed, show the alert
            if(valid()){
                this.commit("showTransiton")
            }
        },
        //this is not working as expected
        showTransiton(state){
            state.show = true
            clearTimeout(removeShow)
            removeShow = setTimeout(()=>state.show = false, 1000)
        }
    },
    getters: {
        upCommingID(state){
            //return last elements id with one added to it or if no elements return 0
            let lastEl = state.elements[state.elements.length - 1]
            return lastEl ? lastEl.id + 1 : 0
        }
    }
})