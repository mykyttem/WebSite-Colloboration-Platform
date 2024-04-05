from flask import Blueprint, request, jsonify

# Create a Blueprint object
auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/user/sign-up', methods=['POST'])
def sign_up():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    print(username)
    print(email)
    print(password)

    # Here you should implement your sign-up logic, like storing the user in the database.
    # For now, let's just return a success response.
    return jsonify(message='Sign up successful'), 200
