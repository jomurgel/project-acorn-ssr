import axios from 'axios'
import { BASE_URL } from '@root/siteconfig'

export const HTTP = axios.create({
  baseURL: BASE_URL + '/wp-json/'
})
