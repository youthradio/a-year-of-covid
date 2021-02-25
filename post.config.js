import ArticleData from './data/data.json'

const BASEURL =
  process.env.BASE_URL_PRODUCTION === ''
    ? process.env.BASE_URL_PRODUCTION
    : '/a-year-of-covid'
const CAN_URL =
  process.env.BASE_URL_PRODUCTION === ''
    ? `https://interactive.yr.media`
    : `https://youthradio.github.io${BASEURL}`

const POSTCONFIG = {
  baseURL: BASEURL,
  title: ArticleData.headline,
  author: ArticleData.author,

  publishDate: ArticleData.date,
  location: ArticleData.location,
  description: ArticleData.seo_description || '',
  tweetMessage: '@itsyrmedia',
  url: CAN_URL,
  featureImage: `${CAN_URL}/yriHEADWERrectangle_social.jpg`,

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
  POLLID: 'af897078-393e-4d86-bcab-ab079abfda21',
}

export default POSTCONFIG
