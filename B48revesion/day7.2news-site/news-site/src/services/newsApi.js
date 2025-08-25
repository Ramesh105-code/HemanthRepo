import axios from 'axios'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const BASE_URL = 'https://newsapi.org/v2'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'X-Api-Key': API_KEY },
})

/**
  @param {Object} params 
 */
export async function fetchTopHeadlines(params) {
  const { data } = await api.get('/top-headlines', { params })

  if (data.status !== 'ok') throw new Error('NewsAPI error')
  return data
}

/**
 * @param {Object} params 
 */
export async function fetchEverything(params) {
  const { data } = await api.get('/everything', { params })
  if (data.status !== 'ok') throw new Error('NewsAPI error')
  return data
}
