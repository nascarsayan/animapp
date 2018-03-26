import Api from '@/services/Api'

export default {
  post (data) {
    return Api().post('watch', data)
  },
  get (userId) {
    return Api().get('watch')
  }
}
