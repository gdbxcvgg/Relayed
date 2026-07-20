def time_in_a_week():
    from datetime import timedelta

    from django.utils import timezone

    return timezone.now() + timedelta(days=7)


def generate_code():
    from random import randint
    from uuid import uuid4

    length = randint(6, 8)

    base_code = uuid4().hex[:length]

    # apply random casing to code for lower collision chance
    return "".join(c.upper() if randint(0, 1) else c for c in base_code)
