const BASEURL = process.env.BASE_URL_PRODUCTION || '2021-inauguration-yri'
const CAN_URL = process.env.BASE_URL_PRODUCTION
  ? `https://interactive.yr.media/${BASEURL}`
  : `https://youthradio.github.io/${BASEURL}`

module.exports = {
  baseURL: `/${BASEURL}`,
  title: `Opinion - A Soundtrack for the Trump-Free White House`,
  author: 'YR Arts & Interactive Team',
  publishDate: 'Jan. 19, 2021',
  location: 'Oakland, CA',
  description:
    'Every big life event needs a playlist, and the Biden-Harris inauguration — and first 100 days — are no exception. We asked people celebrating the new administration to co-produce a music line-up for this next phase in American politics. Vote here!',
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
      name: '2021-inauguration-yri - backend',
      id: '1na5DSfBATVAgtImO5mcoZdTtHfD-IDrdq9MePFKCXM8',
    },
  ],
  dataPath: 'data/data.json',
  POLLSERVER: 'https://ee51aej7u4.execute-api.us-west-2.amazonaws.com/latest',
  POLLID: 'af897078-393e-4d86-bcab-ab079abfda21',
}
