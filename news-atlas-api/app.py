from chalice import Chalice
from chalice import CORSConfig
import requests
import urllib.parse

app = Chalice(app_name='news-atlas-api')

cors_config = CORSConfig(
    allow_origin='*',
    allow_headers=['X-Special-Header'],
    max_age=600,
    expose_headers=['X-Special-Header']
)

exclude_terms = [
    'sports',
    'cricket',
    'football',
    'soccer',
    '"World Cup"',
    'Sweepstakes',
    'Contest',
    'Tennis'
]

sources = [
    'al-jazeera-english',
    'bbc-news',
    'google-news',
    'the-washington-post',
    'the-globe-and-mail',
    'independent'
]

def build_q(keyword):
    q = keyword
    for term in exclude_terms:
        q = q + ' AND NOT ' + term
    return urllib.parse.quote(q)

def get_by_keyword(keyword):
    source_list = ','.join(sources)
    q = build_q(keyword)
    html_url = ('http://newsapi.org/v2/everything?apiKey=&sources=' +
        source_list + '&q=' + q + '&pageSize=5&sortBy=relevancy&language=en')
    response = requests.get(
        html_url
    );
    articles = response.json()
    return articles

@app.route('/news', cors=cors_config)
def news():
    keyword = app.current_request.query_params.get('k')
    return get_by_keyword(keyword)
