import modal
from app.main import app

image = modal.Image.debian_slim(python_version="3.12").pip_install_from_requirements(
    "requirements.txt"
)

app_modal = modal.App("shadowspark-ai", image=image)


@app_modal.function(
    secrets=[modal.Secret.from_name("shadowspark-ai", required=False)],
    keep_warm=1,
)
@modal.asgi_app()
def fastapi_app():
    return app
