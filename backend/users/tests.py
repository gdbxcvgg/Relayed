from django.contrib.auth import get_user_model
from django.test import TestCase

User = get_user_model()


class UserModelTestCase(TestCase):
    def setUp(self):
        self.EMAIL = "test.user@gmail.com"
        self.PASSWORD = "testpassword123"
        self.USERNAME = "test.user"

        self.user = User.objects.create_user(
            email=self.EMAIL, password=self.PASSWORD, username=self.USERNAME
        )

    def test_user_creation(self):
        self.assertIsNotNone(self.user)
        self.assertEqual(self.user.email, self.EMAIL)
        self.assertEqual(self.user.username, self.USERNAME)
        self.assertTrue(self.user.is_active)
        self.assertFalse(self.user.is_staff)
        self.assertFalse(self.user.is_superuser)

    def test_superuser_creation(self):
        superuser = User.objects.create_superuser(
            email="test.superuser@gmail.com",
            password=self.PASSWORD,
            username="test.superuser",
        )

        self.assertIsNotNone(superuser)
        self.assertEqual(superuser.email, "test.superuser@gmail.com")
        self.assertEqual(superuser.username, "test.superuser")
        self.assertTrue(superuser.is_active)
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)

    def test_user_stringify(self):
        self.assertEqual(str(self.user), self.EMAIL)

    def test_user_pk_is_uuid(self):
        from uuid import UUID

        self.assertIsInstance(self.user.pk, UUID)

    def test_user_username_normalization(self):
        self.user.username = self.USERNAME.upper()
        self.user.save()
        self.assertEqual(self.user.username, self.USERNAME)

    def test_user_username_length_constraints(self):
        from django.core.exceptions import ValidationError

        VERY_LONG_USERNAME = "A" * 100
        VERY_SHORT_USERNAME = "A"

        self.user.username = VERY_LONG_USERNAME
        self.assertRaises(ValidationError, self.user.save)

        self.user.username = VERY_SHORT_USERNAME
        self.assertRaises(ValidationError, self.user.save)

    def test_user_username_disallowed_characters_validation(self):
        from django.core.exceptions import ValidationError

        self.user.username = "!;"
        self.assertRaises(ValidationError, self.user.save)

        self.user.username = "-()asd"
        self.assertRaises(ValidationError, self.user.save)

        self.user.username = "+=-fdj"
        self.assertRaises(ValidationError, self.user.save)

        self.user.username = "ghdfgf_213_+<>?"
        self.assertRaises(ValidationError, self.user.save)

    def test_user_password_hashing(self):
        self.assertTrue(self.user.check_password(self.PASSWORD))

    def test_user_authentication(self):
        from django.contrib.auth import authenticate

        auth_user = authenticate(email=self.EMAIL, password=self.PASSWORD)

        self.assertIsNotNone(auth_user)
        self.assertTrue(auth_user.is_authenticated)
        self.assertFalse(auth_user.is_anonymous)

    def test_user_username_unique_constraint(self):
        from django.core.exceptions import ValidationError

        def create_user_with_same_username():
            User.objects.create_user(
                email="other.user@gmail.com",
                password=self.PASSWORD,
                username=self.USERNAME,
            )

        self.assertRaises(ValidationError, create_user_with_same_username)

    def test_user_email_unique_constraint(self):
        from django.core.exceptions import ValidationError

        def create_user_with_same_email():
            User.objects.create_user(
                email=self.EMAIL, password=self.PASSWORD, username="other.user"
            )

        self.assertRaises(ValidationError, create_user_with_same_email)

    def test_user_removed_fields(self):
        self.assertIsNone(self.user.first_name)
        self.assertIsNone(self.user.last_name)

    def test_user_required_fields(self):
        self.assertIn("username", User.REQUIRED_FIELDS)

    def test_user_get_full_name(self):
        self.assertEqual(self.user.get_full_name(), self.USERNAME)
