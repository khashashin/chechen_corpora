import requests
from django.conf import settings
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

User = get_user_model()


class AppwriteAuthBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        project_endpoint = settings.APPWRITE["PROJECT_ENDPOINT"]
        project_id = settings.APPWRITE["PROJECT_ID"]
        appwrite_endpoint = f"{project_endpoint}/account/sessions/email"
        headers = {
            "Content-Type": "application/json",
            "X-Appwrite-Project": project_id,
        }
        data = {
            "email": username,
            "password": password
        }

        session_response = requests.post(appwrite_endpoint, json=data, headers=headers)

        if session_response.status_code == 201:  # HTTP 201 Created
            # Fetch user profile information from Appwrite
            user_info_response = self.get_appwrite_user_info(project_endpoint, session_response.cookies, project_id)
            if user_info_response.status_code == 200:
                user_info = user_info_response.json()
                # Process user information to create or update Django user
                return self.get_or_create_django_user(user_info, username)

        # Handle authentication failure
        return None

    def get_appwrite_user_info(self, project_endpoint, session_cookies, project_id):
        user_info_endpoint = f"{project_endpoint}/account"
        headers = {
            "X-Appwrite-Project": project_id
        }
        return requests.get(user_info_endpoint, cookies=session_cookies, headers=headers)

    def get_or_create_django_user(self, user_info, email):
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Create a new user in Django if not exists
            user = User.objects.create_user(
                username=email,  # Adjust as per your model
                email=email,
                # Add additional fields if necessary
            )
            # Set an unusable password
            user.set_unusable_password()
            user.save()

        user_prefs = user_info.get("prefs", {})
        is_staff = user_prefs.get("isStaff", False)
        is_superuser = user_prefs.get("isSuperuser", False)

        user.is_staff = True if is_staff == "true" else False
        user.is_superuser = True if is_superuser == "true" else False
        user.save()

        return user

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
