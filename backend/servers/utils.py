def time_in_a_week():
    from django.utils import timezone
    from datetime import timedelta
    
    return timezone.now() + timedelta(days=7)


def generate_code():
    from uuid import uuid4
    from random import randint

    length = randint(6, 8)
    
    base_code = uuid4().hex[:length]

    # apply random casing to code for lower collision chance
    return ''.join(
        c.upper() if randint(0,1) else c 
        for c in base_code
    )