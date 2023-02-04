FROM clickhouse/clickhouse-server

COPY *.sh /docker-entrypoint-initdb.d
COPY /data/*.txt .