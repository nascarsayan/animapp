import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('animes', {
      params: {
        search: search
      }
    })
  },
  show (offset) {
    if (offset !== undefined) {
      return Api().get(`animes/${offset}`)
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
