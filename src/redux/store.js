// 目前 createStore 已經被列為棄用狀態，官方建議使用 configureStore 來代替 createStore
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/redux/reducers/counter'

const store = configureStore({
  reducer: {
    // 這邊故意不用 createSlice 的方式建立，測試一下原本 Reducer、Action 的方式
    // 不需實作 combineReducers，因為 configureStore 已經幫我們做了
    counter: counterReducer,
  },
})

console.log('123', store.getState())
store.dispatch({ type: 'incremented' })
console.log('456', store.getState())
export default store
