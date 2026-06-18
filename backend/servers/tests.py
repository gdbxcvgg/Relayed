from django.test import TestCase
from django.contrib.auth import get_user_model
from . import models

User = get_user_model()


class ServerModelTestCase(TestCase):
    def setUp(self):
        self.OWNER_EMAIL = "test.user@gmail.com"
        self.OWNER_PASSWORD = "testpassword123"
        self.OWNER_USERNAME = "test.user"
        self.owner = User.objects.create_user(
            email=self.OWNER_EMAIL,
            password=self.OWNER_PASSWORD,
            username=self.OWNER_USERNAME,
        )
        self.NAME = "Test Server"

        self.server = models.Server.objects.create(owner=self.owner, name=self.NAME)

    def test_server_creation(self):
        from django.utils import timezone

        self.assertIsNotNone(self.server)
        self.assertIsInstance(self.server.owner, User)
        self.assertEqual(self.server.name, self.NAME)
        self.assertFalse(self.server.is_deleted)
        self.assertLess(self.server.created_at, timezone.now())

    def test_server_stringify(self):
        self.assertEqual(str(self.server), self.server.name)

    def test_server_pk_is_uuid(self):
        from uuid import UUID

        self.assertIsInstance(self.server.pk, UUID)


class ServerInviteTestCase(TestCase):
    def setUp(self):
        self.USER_EMAIL = "test.user@gmail.com"
        self.USER_PASSWORD = "testpassword123"
        self.USER_USERNAME = "test.user"

        self.user = User.objects.create_user(
            email=self.USER_EMAIL,
            password=self.USER_PASSWORD,
            username=self.USER_USERNAME,
        )

        self.SERVER_NAME = "Test Server"

        self.server = models.Server.objects.create(
            owner=self.user, name=self.SERVER_NAME
        )

        self.MAX_USES = 100

        self.invite = models.ServerInvite.objects.create(
            inviter=self.user,
            server=self.server,
            max_uses=self.MAX_USES,
        )

    def test_invite_create(self):
        self.assertIsNotNone(self.invite)
        self.assertEqual(self.invite.inviter, self.user)
        self.assertEqual(self.invite.server, self.server)
        self.assertIsNotNone(self.invite.code)
        self.assertEqual(self.invite.max_uses, self.MAX_USES)

    def test_stringify(self):
        self.assertEqual(str(self.invite), self.invite.code)

    def test_invite_pk_is_uuid(self):
        from uuid import UUID

        self.assertIsInstance(self.invite.pk, UUID)

    def test_is_expired(self):
        from django.utils import timezone
        from datetime import timedelta

        self.assertFalse(self.invite.is_expired)

        # expired 10 days ago
        self.invite.expires_at = timezone.now() - timedelta(days=10)
        self.invite.save()

        self.assertTrue(self.invite.is_expired)
