import { createStore } from 'vuex'

import idb from '@/api/idb';

let removeShow

export default createStore({
    state: {
        elements: [],
        show: false
    },
    mutations: {
        addNewElement(state, obj){
            state.elements.push(obj)
        },
        
        updateFromDB(state, arr){
            state.elements = arr
        },

        changeShow(state, bool){
            state.show = bool
        }
    },
    actions: {
        async addNewElementAsync({commit, dispatch, getters}, value){
            //create an element object
            let obj = {value, id: getters.upCommingID},
            //add element to IDB
            valid = await idb.addToDB(obj),
            success = valid()
            //if operation successed, show the alert, add element to an array
            dispatch('showTransition', success)
            if(success){
                commit('addNewElement', obj)
            }
        },

        async updateFromDBAsync({commit}){
            //get array of the elements from IDB
            let arr = await idb.addToObject()
            commit('updateFromDB', arr)
        },

        async changeValAsync({dispatch}, obj){
            //set new value to an existing element 
            let valid = await idb.addToDB(obj),
            success = valid()
            //if operation successed, show the alert
            dispatch('showTransition', success)
            
        },

        async removeElementAsync({dispatch}, id){
            //remove the element from IDB
            let valid = await idb.removeFromDB(id),
            success = valid()
            //if operation successed, show the alert
            dispatch('showTransition', success)
        },

        showTransition({commit}, success){
            if(success){
                //show an alert
                commit('changeShow', true)
                clearTimeout(removeShow)
                //hide alert after 1s if showTransition is not recalled
                removeShow = setTimeout(()=>commit('changeShow', false), 1000)
            }
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