from django.apps import AppConfig


class ChatMessagesConfig(AppConfig):
    name = 'chat_messages'

    def  ready(self):
        from . import signals