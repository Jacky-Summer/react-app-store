import listApi from '@api/list'

// Actions
const SET_RECOMMEND_LIST = 'SET_RECOMMEND_LIST'
const SET_ALL_FREE_LIST = 'SET_ALL_FREE_LIST'
const SET_FREE_LIST = 'SET_FREE_LIST'
const SET_LOAD_END = 'SET_LOAD_END'
const NEXT_PAGE = 'NEXT_PAGE'
const SET_RESULT_LIST = 'SET_RESULT_LIST'
const CHANGE_SEARCH_STATUS = 'CHANGE_SEARCH_STATUS'

const initState = {
  recommendList: [],
  allFreeList: [],
  freeList: [],
  page: 1,
  pageSize: 10,
  maxPage: 1,
  noMore: false,
  searchKeyword: '',
  searchStatus: false,
}

// reducer
export function list(state = initState, action) {
  switch (action.type) {
    case SET_RECOMMEND_LIST:
      return { ...state, recommendList: action.payload }
    case SET_ALL_FREE_LIST:
      const total = action.payload
      const maxPage = Math.ceil(total.length / state.pageSize)
      return { ...state, maxPage, allFreeList: action.payload }
    case SET_FREE_LIST:
      return { ...state, freeList: action.payload }
    case SET_LOAD_END:
      return { ...state, noMore: true }
    case NEXT_PAGE:
      return { ...state, page: state.page + 1 }
    case SET_RESULT_LIST:
      return { ...state, searchResult: action.payload }
    case CHANGE_SEARCH_STATUS:
      return { ...state, searchStatus: action.payload }
    default:
      return state
  }
}

// Action Creators
function setRecommendList(data) {
  return { type: SET_RECOMMEND_LIST, payload: data }
}

function setAllFreeList(data) {
  return { type: SET_ALL_FREE_LIST, payload: data }
}

function setFreeList(data) {
  return { type: SET_FREE_LIST, payload: data }
}

function changeSearchStatus(status) {
  return { type: CHANGE_SEARCH_STATUS, payload: status }
}

export function getFreeList() {
  return (dispatch, getState) => {
    const {
      list: { page, pageSize, maxPage, searchStatus, freeList, allFreeList },
    } = getState()

    let newFreeList = []
    if (!searchStatus) {
      if (page === 1) {
        newFreeList = allFreeList.slice(0, pageSize)
        dispatch(setFreeList(newFreeList))
      } else {
        if (page <= maxPage) {
          newFreeList = [...freeList, ...allFreeList.slice((page - 1) * 10, page * pageSize)]
          dispatch(setFreeList(newFreeList))
        }
      }
    }

    if (!searchStatus) {
      newFreeList.length === allFreeList.length ? dispatch({ type: SET_LOAD_END }) : dispatch({ type: NEXT_PAGE })
    }
  }
}

export function getRecommendList() {
  return dispatch => {
    listApi.getRecommendList().then(res => {
      dispatch(setRecommendList(res.data.feed.results))
    })
  }
}

export function getAllFreeList() {
  return dispatch => {
    listApi.getFreeList().then(res => {
      dispatch(setAllFreeList(res.data.feed.results))
      dispatch(getFreeList())
    })
  }
}

// 没有 search 的 api，所以用过滤全部数据代替
export function searchApp(keyword) {
  return (dispatch, getState) => {
    const {
      list: { allFreeList, freeList, searchStatus },
    } = getState()
    let newKeyword = keyword.replace(/\s*/g, '')
    if (!newKeyword) {
      if (searchStatus && freeList.length > 0) {
        let newFreeList = [...allFreeList.slice(0, 10)]
        dispatch(setFreeList(newFreeList))
      }
      dispatch(changeSearchStatus(false))
      return
    }
    dispatch(changeSearchStatus(true))

    let result = []
    // eslint-disable-next-line
    result = allFreeList.filter(appItem => {
      if (appItem.name.indexOf(keyword) !== -1) {
        return appItem
      }
    })
    dispatch(setFreeList(result))
  }
}
