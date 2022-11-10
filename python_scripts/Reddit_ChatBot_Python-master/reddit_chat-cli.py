from Reddit_ChatBot_Python import ChatBot, RedditAuthentication
import time
import sys

if(len(sys.argv) > 3):
    users = []
    n = len(sys.argv)
    for i in range(4, n):
        users.append(sys.argv[i])

    message = sys.argv[3]

    reddit_authentication = RedditAuthentication.PasswordAuth(reddit_username=sys.argv[1], reddit_password=sys.argv[2])

    chatbot = ChatBot(print_chat=True, store_session=True, log_websocket_frames=False, authentication=reddit_authentication)
    
    users = list(dict.fromkeys(users))

    print("-----------[ Reddit Mass CHAT By David K]-----------")
    print("Compiling usernames...")
    time.sleep(0.2)
    print("Starting bot...")
    time.sleep(0.2)
    print("Starting DMs!!!")
    print("")
            
    @chatbot.event.on_ready
    def test(_):
        for user in users:
            try:
                dm_channel = chatbot.create_direct_channel(user)
                chatbot.send_message(message, dm_channel.channel_url)
                time.sleep(5)
            except Exception as e:
                print(e)
        time.sleep(1)
        print("")
        print("Finished.")
        print("--------------------------------------------------")
        exit()

    chatbot.run_4ever(disable_ssl_verification=True)