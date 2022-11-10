# -*- coding: utf-8 -*-

import praw
import time
import os
import sys

reddit = praw.Reddit(client_id='M7bRhUcIxNV_Ag',
                     client_secret='v-RNbsK2um8NSy5RmOp9QYFxms_y5A',
                     username='effchap',
                     password='effchap123123',
                     user_agent='massDmv1')

subreddit = reddit.subreddit('wallstreetbets')

hot_python = subreddit.new(limit=100)

users = ['Pazluz', 'JigBizz313']

delay = 3

title = 'Join this discord!'
message = 'Looking for even more action? Join this discord now, for more crypto pump events!\n\nhttps://discord.gg/3sqSBCsKFR 🚀\n\nWe are currently recruiting Degenerates to build one almighty pump community 😄'

# for submission in hot_python:
#     if not submission.stickied:
#         comments = submission.comments
#         for comment in comments:
#             users.append(comment.author)

users = list(dict.fromkeys(users))

for user in users:
    try:
        reddit.redditor(user.name).message(title, message)
        print('Sent PM to : ' + user.name)
        time.sleep(delay)
    except Exception as e:
        print(e)
        if "RATELIMIT" in str(e):
            x = str(e).split("in ")
            
            sleep_time = 0
            if "seconds" in str(e):
                final = x[2].split(" seconds")
                sleep_time = int(final[0]) + 3
            if "minutes" in str(e):
                final = x[2].split(" minutes")
                sleep_time = int(final[0]) * 60 + 1
            print("Sleeping for : " + str(sleep_time) + " seconds")
            time.sleep(sleep_time)

os.system("python3 " + sys.argv[0])
