#!/usr/bin/env python
import random
import sys
 
import praw
import time
import csv

from webbot import Browser
from requests import Session

def main():
    session = Session()
    proxies = [
        'us.proxiware.com:5953',
        'us.proxiware.com:14113',
        'us.proxiware.com:18441',
        'us.proxiware.com:16142',
        'us.proxiware.com:13872',
        'us.proxiware.com:11176',
        'us.proxiware.com:4417',
        'us.proxiware.com:17786',
        'us.proxiware.com:8376',
        'us.proxiware.com:9086',
        'us.proxiware.com:9095',
        'us.proxiware.com:16105',
        'us.proxiware.com:13366',
        'us.proxiware.com:7104',
        'us.proxiware.com:15230',
        'us.proxiware.com:7407',
        'us.proxiware.com:13855',
        'us.proxiware.com:8793',
        'us.proxiware.com:2279',
        'us.proxiware.com:13048',
        'us.proxiware.com:5331',
        'us.proxiware.com:6416',
        'us.proxiware.com:12278',
        'us.proxiware.com:10128',
        'us.proxiware.com:10123',
        'us.proxiware.com:2561',
        'us.proxiware.com:12858',
        'us.proxiware.com:15402',
        'us.proxiware.com:12046',
        'us.proxiware.com:16682',
        'us.proxiware.com:7333',
        'us.proxiware.com:21555',
        'us.proxiware.com:3969',
        'us.proxiware.com:15839',
        'us.proxiware.com:8002',
        'us.proxiware.com:20126',
        'us.proxiware.com:12137',
        'us.proxiware.com:21523',
        'us.proxiware.com:7980',
        'us.proxiware.com:16824',
        'us.proxiware.com:9635',
        'us.proxiware.com:13370',
        'us.proxiware.com:10642',
        'us.proxiware.com:14698',
        'us.proxiware.com:17874',
        'us.proxiware.com:19292',
        'us.proxiware.com:7001',
        'us.proxiware.com:3878',
        'us.proxiware.com:19196',
        'us.proxiware.com:5135',
        'us.proxiware.com:12579',
        'us.proxiware.com:11762',
        'us.proxiware.com:11958',
        'us.proxiware.com:9358',
        'us.proxiware.com:8175',
        'us.proxiware.com:21910',
        'us.proxiware.com:13724',
        'us.proxiware.com:5345',
        'us.proxiware.com:8517',
        'us.proxiware.com:7379',
        'us.proxiware.com:5673',
        'us.proxiware.com:16611',
        'us.proxiware.com:10891',
        'us.proxiware.com:14116',
        'us.proxiware.com:16382',
        'us.proxiware.com:13544',
        'us.proxiware.com:9149',
        'us.proxiware.com:3462',
        'us.proxiware.com:3062',
        'us.proxiware.com:20283',
        'us.proxiware.com:11744',
        'us.proxiware.com:21853',
        'us.proxiware.com:8553',
        'us.proxiware.com:10162',
        'us.proxiware.com:7139',
        'us.proxiware.com:17820',
        'us.proxiware.com:7983',
        'us.proxiware.com:15684',
        'us.proxiware.com:14049',
        'us.proxiware.com:14280',
        'us.proxiware.com:20734',
        'us.proxiware.com:21355',
        'us.proxiware.com:6666',
        'us.proxiware.com:21141',
        'us.proxiware.com:12871',
        'us.proxiware.com:14433',
        'us.proxiware.com:3929',
        'us.proxiware.com:17608',
        'us.proxiware.com:15058',
        'us.proxiware.com:18486',
        'us.proxiware.com:20888',
        'us.proxiware.com:3627',
        'us.proxiware.com:19734',
        'us.proxiware.com:14607',
        'us.proxiware.com:11579',
        'us.proxiware.com:13402',
        'us.proxiware.com:19558',
        'us.proxiware.com:15535',
        'us.proxiware.com:11291',
        'us.proxiware.com:2450',
        'us.proxiware.com:6742',
        'us.proxiware.com:10991',
        'us.proxiware.com:2309',
        'us.proxiware.com:21124',
        'us.proxiware.com:9944',
        'us.proxiware.com:5448',
        'us.proxiware.com:13018',
        'us.proxiware.com:15470',
        'us.proxiware.com:6079',
        'us.proxiware.com:4839',
        'us.proxiware.com:8472',
        'us.proxiware.com:10724',
        'us.proxiware.com:18994',
        'us.proxiware.com:17588',
        'us.proxiware.com:8713',
        'us.proxiware.com:19658',
        'us.proxiware.com:16796',
        'us.proxiware.com:2393',
        'us.proxiware.com:16720',
        'us.proxiware.com:5663',
        'us.proxiware.com:20887',
        'us.proxiware.com:15566',
        'us.proxiware.com:9681',
        'us.proxiware.com:6020',
        'us.proxiware.com:19557',
        'us.proxiware.com:10980',
        'us.proxiware.com:5752',
        'us.proxiware.com:2169',
        'us.proxiware.com:8480',
        'us.proxiware.com:19719',
        'us.proxiware.com:4716',
        'us.proxiware.com:13051',
        'us.proxiware.com:2408',
        'us.proxiware.com:19202',
        'us.proxiware.com:7619',
        'us.proxiware.com:6569',
        'us.proxiware.com:12390',
        'us.proxiware.com:21476',
        'us.proxiware.com:8391',
        'us.proxiware.com:10323',
        'us.proxiware.com:6644',
        'us.proxiware.com:18238',
        'us.proxiware.com:12887',
        'us.proxiware.com:2829',
        'us.proxiware.com:14458',
        'us.proxiware.com:11853',
        'us.proxiware.com:19796',
        'us.proxiware.com:10235',
        'us.proxiware.com:21752',
        'us.proxiware.com:3150',
        'us.proxiware.com:10860',
        'us.proxiware.com:15625',
        'us.proxiware.com:5625',
        'us.proxiware.com:5040',
        'us.proxiware.com:6798',
        'us.proxiware.com:2887',
        'us.proxiware.com:6324',
        'us.proxiware.com:20690',
        'us.proxiware.com:12551',
        'us.proxiware.com:9009',
        'us.proxiware.com:11110',
        'us.proxiware.com:14977',
        'us.proxiware.com:8062',
        'us.proxiware.com:19163',
        'us.proxiware.com:5836',
        'us.proxiware.com:18924',
        'us.proxiware.com:20706',
        'us.proxiware.com:21619',
        'us.proxiware.com:3216',
        'us.proxiware.com:4597',
        'us.proxiware.com:17041',
        'us.proxiware.com:10199',
        'us.proxiware.com:13029',
        'us.proxiware.com:8389',
        'us.proxiware.com:15444',
        'us.proxiware.com:21870',
        'us.proxiware.com:6178',
        'us.proxiware.com:13497',
        'us.proxiware.com:10688',
        'us.proxiware.com:6049',
        'us.proxiware.com:11082',
        'us.proxiware.com:21608',
        'us.proxiware.com:13818',
        'us.proxiware.com:6052',
        'us.proxiware.com:3603',
        'us.proxiware.com:2344',
        'us.proxiware.com:16222',
        'us.proxiware.com:18947',
        'us.proxiware.com:14868',
        'us.proxiware.com:9124',
        'us.proxiware.com:9955',
        'us.proxiware.com:12178',
        'us.proxiware.com:14837',
        'us.proxiware.com:19137',
        'us.proxiware.com:20501',
        'us.proxiware.com:10919',
        'us.proxiware.com:10542',
        'us.proxiware.com:5242',
        'us.proxiware.com:17010',
        'us.proxiware.com:12625',
        'us.proxiware.com:21744',
        'us.proxiware.com:17152',
        'us.proxiware.com:18765',
        'us.proxiware.com:5632',
        'us.proxiware.com:4286',
        'us.proxiware.com:12684',
        'us.proxiware.com:20851',
        'us.proxiware.com:21959',
        'us.proxiware.com:5932',
        'us.proxiware.com:3347',
        'us.proxiware.com:13492',
        'us.proxiware.com:16206',
        'us.proxiware.com:18210',
        'us.proxiware.com:11656',
        'us.proxiware.com:14077',
        'us.proxiware.com:7300',
        'us.proxiware.com:7834',
        'us.proxiware.com:7127',
        'us.proxiware.com:13279',
        'us.proxiware.com:6958',
        'us.proxiware.com:2792',
        'us.proxiware.com:17245',
        'us.proxiware.com:10327',
        'us.proxiware.com:6237',
        'us.proxiware.com:11503',
        'us.proxiware.com:20070',
        'us.proxiware.com:9824',
        'us.proxiware.com:12333',
        'us.proxiware.com:7230',
        'us.proxiware.com:16503',
        'us.proxiware.com:15095',
        'us.proxiware.com:8760',
        'us.proxiware.com:8925',
        'us.proxiware.com:7495',
        'us.proxiware.com:21841',
        'us.proxiware.com:8928',
        'us.proxiware.com:13133',
        'us.proxiware.com:15956',
        'us.proxiware.com:4524',
        'us.proxiware.com:11151',
        'us.proxiware.com:12623',
        'us.proxiware.com:20420',
        'us.proxiware.com:8212',
        'us.proxiware.com:9538',
        'us.proxiware.com:14481',
        'us.proxiware.com:4990',
        'us.proxiware.com:8939',
        'us.proxiware.com:21389',
        'us.proxiware.com:4594',
        'us.proxiware.com:8810'
    ]
    selectedProxy = random.choice(proxies)

    session.proxies['https'] = selectedProxy

    reddit = praw.Reddit(
        client_id="lSlIXuxM-nVK4VKvHCuNIQ",
        client_secret="3XhIqFMLlSI1Lk6JHgFI52K7CC1hiQ",
        requestor_kwargs={'session': session},
        redirect_uri="https://www.onlybands.xyz/api/authorize_callback_bot",
        user_agent="praw_refresh_token_example",
    )
    state = str(random.randint(0, 65000))
    url = reddit.auth.url('*', state, "permanent")

    with open('./bots.csv', newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        for row in spamreader:
            for col in row:
                split = col.split(',')
                username = split[0]
                password = split[1]

                web = Browser(showWindow=False, proxy=selectedProxy)
                print('Loggin in: ')
                print(username)
                web.go_to(url) 
                web.click('Log in')
                time.sleep(2)
                web.type(username)
                web.press(web.Key.ENTER)
                time.sleep(2)
                web.type(password)
                web.press(web.Key.ENTER)
                time.sleep(5)
                web.click('toestaan')
                web.click('allow')
                print(web.get_current_url())
                time.sleep(5)


 
if __name__ == "__main__":
    sys.exit(main())