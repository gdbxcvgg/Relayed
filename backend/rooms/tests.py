from django.test import TestCase
from django.contrib.auth import get_user_model
from servers.models import Server
from . import models


User = get_user_model()


class RoomTestCase(TestCase):
    def setUp(self):
        self.owner = User.objects.create_user(
            email='test.user@gmail.com',
            password='testpassword123',
            username='test.user'
        )

        self.server = Server.objects.create(
            owner=self.owner,
            name="TEST SERVER"
        )

        self.category_room = models.Room.objects.create(
            name='category', room_type=2,
            server=self.server, parent=None
        )

        self.text_room = models.Room.objects.create(
            name='text', room_type=1,
            server=self.server, parent=self.category_room
        )


    def test_category_room_creation(self):
        self.assertIsNotNone(self.category_room)
        self.assertEqual(self.category_room.server, self.server)


    def test_text_room_creation(self):
        self.assertIsNotNone(self.text_room)
        self.assertEqual(self.text_room.server, self.server)


    def test_room_pk_is_uuid(self):
        from uuid import UUID
        self.assertIsInstance(self.text_room.pk, UUID)
        self.assertIsInstance(self.category_room.pk, UUID)


    def test_room_parent(self):
        self.assertIsNotNone(self.text_room)
        self.assertEqual(self.text_room.parent, self.category_room)

    
    def test_set_parent_for_category(self):
        from django.core.exceptions import ValidationError

        new_category = models.Room.objects.create(
            name='new category', room_type=2,
            server=self.server, parent=None
        )

        self.category_room.parent = new_category
        self.assertRaises(ValidationError, self.category_room.save)

    
    def test_set_text_channel_as_parent(self):
        from django.core.exceptions import ValidationError

        other_text = models.Room.objects.create(
            name='other text', room_type=1,
            server=self.server, parent=None
        )

        self.text_room.parent = other_text
        self.assertRaises(ValidationError, self.text_room.save)

    
    def test_set_room_from_diferent_server_as_parent(self):
        from django.core.exceptions import ValidationError

        other_server = Server.objects.create(
            owner=self.owner,
            name="OTHER SERVER"
        )

        other_category = models.Room.objects.create(
            name='other category', room_type=2,
            server=other_server, parent=None
        )

        self.text_room.parent = other_category
        self.assertRaises(ValidationError, self.text_room.save)