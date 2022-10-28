import { HYDRATE } from 'next-redux-wrapper' // 為了讓 Nextjs 專案下 SSR 能夠正常運作，需要引入 HYDRATE

const initialState = {
  count: 0,
}
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'incremented':
      return { count: state.count + 1 }
    case 'decremented':
      return { count: state.count - 1 }
    case [HYDRATE]:
      return {
        ...state,
      }
    default:
      return state
  }
}
export default counterReducer
