import Api from '@/services/Api'

export default {
  index (entity, query) {
    let strQuery = JSON.stringify(query)
    return Api().get(`/${entity}?query=${strQuery}`)
  }
}
