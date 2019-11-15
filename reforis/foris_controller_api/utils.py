from http import HTTPStatus

from flask import request, current_app, jsonify


class APIError(Exception):
    """
    Raised when an error occurred during processing request.
    """

    def __init__(self, data, status_code=HTTPStatus.BAD_REQUEST):
        super().__init__(self)
        self.data = data
        self.status_code = status_code


def _foris_controller_settings_call(module):
    """
    "Translate" typical ``foris-controller`` module to HTTP endpoint with ``GET`` and ``POST`` methods.

    **It works only inside the request context!**
    """
    response = None
    if request.method == 'GET':
        response = current_app.backend.perform(module, 'get_settings')
    elif request.method == 'POST':
        data = request.json
        response = current_app.backend.perform(module, 'update_settings', data)
    return jsonify(response)


def log_error(message):
    """
    Report error using logger from current application. Request URL and data are added to the message.
    """
    current_app.logger.error('%s; URL: %s; data: %s', message, request.url, request.data)


def validate_json(json_data, expected_fields=None):
    """
    Raise APIError when json_data is not valid.
    """
    if not json_data:
        raise APIError('Invalid JSON', HTTPStatus.BAD_REQUEST)

    if not expected_fields:
        return

    errors = {}
    for field_name, field_type in expected_fields.items():
        field = json_data.get(field_name)
        if field is None:
            errors[field_name] = 'Missing data for required field.'
        elif not isinstance(field, field_type):
            errors[field_name] = f'Expected data of type: {field_type.__name__}'
    if errors:
        raise APIError(errors, HTTPStatus.BAD_REQUEST)
