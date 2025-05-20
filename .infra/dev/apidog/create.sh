docker pull apidog/self-hosted-general-runner && \
docker run --name apidog_rioni \
  -e TZ=Europe/Moscow \
  -e SERVER_APP_BASE_URL=https://api.apidog.com \
  -e TEAM_ID=260489 \
  -e RUNNER_ID=10799 \
  -e ACCESS_TOKEN=TSHGR-VE1cJc5TbQFTAFx8r8sTkVc3JZTnhRtJ \
  -p 81:4524 \
  -d apidog/self-hosted-general-runner