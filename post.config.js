import ArticleData from './data/data.json'
const content = ArticleData.content[0]

const BASEURL = process.env.BASE_URL_PRODUCTION || '/a-year-of-covid'
const CAN_URL =
  process.env.BASE_URL_PRODUCTION === null
    ? `https://youthradio.github.io${BASEURL}`
    : `https://interactive.yr.media${BASEURL}`

const POSTCONFIG = {
  baseURL: BASEURL,
  title: content.headline,
  author: content.author,
  publishDate: content.date,
  location: content.location,
  description: content.seo_description || '',
  tweetMessage: '@itsyrmedia',
  url: CAN_URL,
  featureImage: `${CAN_URL}/social.jpg`,

  featureImagePath: 'images/template-feature-image',
  featureImageDescription: 'People Protesting BLM',
  featureImageCaption: '(Photo: Andersen Ross Photography Inc/Getty Images)',

  wpPostSlug: 'north-carolina-vs-vaping-companies',
  wpPostID: '60986',
  // you might not need to change
  fbAppID: '73080818131',
  twitterHandler: '@itsyrmedia',
  docs: [
    {
      name: 'covid- one year - backend',
      id: '1nQVa4umMalob3kwRFljX075jIn-sw4NRt9JRaEjcl-8',
    },
  ],
  dataPath: '../data/data.json',
  POLLSERVER: 'https://ee51aej7u4.execute-api.us-west-2.amazonaws.com/latest',
  POLLID: '6ac25af7-19bf-4888-a068-9be292bd37fa',
}

export default POSTCONFIG
