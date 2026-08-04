import hmac
import hashlib

from app.lib.webhook_verify import (
    verify_hmac_signature,
    verify_github_signature,
    verify_meta_signature,
)

SECRET = "super-secret"
PAYLOAD = b'{"event":"test"}'


def test_verify_hmac_signature_valid():
    expected = hmac.new(SECRET.encode(), PAYLOAD, hashlib.sha256).hexdigest()
    assert verify_hmac_signature(SECRET, PAYLOAD, expected, "sha256") is True


def test_verify_hmac_signature_invalid():
    assert verify_hmac_signature(SECRET, PAYLOAD, "deadbeef", "sha256") is False


def test_verify_github_signature():
    expected = "sha256=" + hmac.new(SECRET.encode(), PAYLOAD, hashlib.sha256).hexdigest()
    assert verify_github_signature(SECRET, PAYLOAD, expected) is True


def test_verify_meta_signature():
    expected = "sha1=" + hmac.new(SECRET.encode(), PAYLOAD, hashlib.sha1).hexdigest()
    assert verify_meta_signature(SECRET, PAYLOAD, expected) is True
