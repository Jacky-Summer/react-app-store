import axios from './axios'

const getRecommendList = async () => await axios.get('/api/top-grossing/all/10/explicit.json')

// 因為沒有分頁的 api，所以用先獲取所有data再劃分的方式模擬分頁效果
const getFreeList = async () => await axios.get('/api/top-free/all/100/explicit.json')

const getRating = id => axios.get(`/app/lookup?id=${id}`)

export default { getRecommendList, getFreeList, getRating }
