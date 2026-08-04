import hmac
import hashlib


def verify_hmac_signature(
    secret: str,
    payload: bytes,
    signature: str,
    algorithm: str = "sha256",
    prefix: str = "",
) -> bool:
    if not secret or not signature:
        return False

    if prefix and signature.startswith(prefix):
        signature = signature[len(prefix) :]

    expected = hmac.new(
        secret.encode("utf-8"),
        payload,
        getattr(hashlib, algorithm),
    ).hexdigest()

    if len(signature) != len(expected):
        return False
    return hmac.compare_digest(signature.encode("utf-8"), expected.encode("utf-8"))


def verify_github_signature(secret: str, payload: bytes, signature: str) -> bool:
    return verify_hmac_signature(secret, payload, signature, "sha256", "sha256=")


def verify_vercel_signature(secret: str, payload: bytes, signature: str) -> bool:
    return verify_hmac_signature(secret, payload, signature, "sha1")


def verify_meta_signature(secret: str, payload: bytes, signature: str) -> bool:
    return verify_hmac_signature(secret, payload, signature, "sha1", "sha1=")
