import Api from '@/services/Api'

export default {
  index (query) {
    if (query !== undefined) {
      if (query['rating']) {
        query['rating'] = query['rating'].replace('&', 'and')
        console.log(query['rating'])
      }
      let strQuery = JSON.stringify(query)
      console.log(strQuery)
      return Api().get(`animes?query=${strQuery}`)
    } else {
      return Api().get(`animes`)
    }
  },
  show (animeId) {
    return Api().get(`anime/${animeId}`)
  }
}
