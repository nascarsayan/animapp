import Api from '@/services/Api'

export default {
  index (params) {
    if (params !== undefined) {
      let strParams = JSON.stringify(params)
      return Api().get(`animes?query=${strParams}`)
    } else {
      return Api().get(`animes`)
    }
  },
  show (animeId) {
    return Api().get(`anime/${animeId}`)
  }
}
