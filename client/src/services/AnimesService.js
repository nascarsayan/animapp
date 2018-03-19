import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('animes', {
      params: {
        search: search
      }
    })
  },
  show (params) {
    if (params !== undefined) {
      let strParams = JSON.stringify(params)
      return Api().get(`animes?query=${strParams}`)
    } else {
      return Api().get(`animes`)
    }
  },
  post (song) {
    return Api().post('songs', song)
  },
  put (song) {
    return Api().put(`songs/${song.id}`, song)
  }
}
