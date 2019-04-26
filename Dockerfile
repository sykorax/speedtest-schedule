FROM tianon/speedtest

ADD ./speedtest.crontab /speedtest.crontab
RUN crontab -l | { cat /speedtest.crontab; } | crontab -

ENTRYPOINT []
CMD crond -f
