/*
 * @Descripttion: 跳转其它地址的方法
 * @Author: EdisonGu
 * @Date: 2022-04-29 10:15:48
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-07-25 12:17:13
 */
// const domain = process.env.JUMP_DOMAIN
import Router from 'next/router'
import config from '@/constants/config'
import { PAGE_KEY } from '@/constants'

interface PageUrl {
  id?: any,
  key?: string,
  query?: any,
  complete?: boolean
}

const goRouter = ({key = PAGE_KEY.HOME, id = '', query = {}}:PageUrl) => {
  switch (key) {
    case PAGE_KEY.HOME:
      Router.push(`/`)
      break;
    case PAGE_KEY.EMOTICON_INDEX:
      Router.push({
        pathname: `/emoticon/index.html`,
        query
      })
        break;
    case PAGE_KEY.EMOTICON_DETAIL:
      Router.push(`/emoticon/${id ? id : 'index'}.html`) // 没有传id默认进入表情包页面
      break
    case PAGE_KEY.EMOJI_DETAIL:
      Router.push(id ? `/emoji/${id}.html` : `/emoticon/index.html`) // 没有传id默认进入表情包页面
      break
    case PAGE_KEY.SEARCH_KEYWORD:
      Router.push({
        pathname: `/search/keyword/${query.keyword}.html`,
        query
      })
      break
    default:
      Router.push(`/`)
      break;
  }
}

/**
 * 根据传参获取相应的页面地址
 * @param param
 */
const getPageUrl = ({key = PAGE_KEY.HOME, id = '', query, complete = false }:PageUrl) => {
  const { hostDomain } = config
  let url = hostDomain
  const domain = complete ? hostDomain : ''
  let urlParams = ''
  for (const key in query) {
    urlParams += `&${key}=${query[key]}`
  }
  switch (key) {
    case PAGE_KEY.EMOTICON_INDEX:
      url = `${domain}/emoticon/index.html`
      break
    case PAGE_KEY.EMOTICON_DETAIL:
      url =  `${domain}/emoticon/${id}.html`
      break
    case PAGE_KEY.EMOJI_DETAIL:
      url =  `${domain}/emoji/${id}.html`
      break
    case PAGE_KEY.SEARCH_KEYWORD:
      url = `${domain}/search/keyword/${query.keyword}.html`
      break
    default:
      url = hostDomain
      break
  }
  return urlParams ? `${url}?${urlParams.slice(1)}` : url
}

/**
 * 如果是访问的vip域名就重定向到duck
 * todo 后续实现在nginx配置
 */
const toDuck = () => {
  const { hostDomain } = config
  const { pathname, search } = window.location
  return `${hostDomain}${pathname}${search}`
}

export {
  getPageUrl,
  goRouter,
  toDuck
}

