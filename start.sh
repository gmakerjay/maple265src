#!/bin/bash

# Các biến cấu hình
JAVA_MEMORY="-Xmx30G -Xms1G"
SERVER_JAR="maplestory.jar"
ACTION="$1"

# Kiểm tra xem file JAR có tồn tại không
if [ ! -f "$SERVER_JAR" ]; then
    echo "Lỗi: Không tìm thấy file $SERVER_JAR."
    exit 1
fi

clear
echo "====================================================="
echo "VietMaple Server Manager"
echo "====================================================="
echo ""

case "$ACTION" in
    start)
        echo "Bắt đầu khởi động server..."
        nohup java $JAVA_MEMORY -jar $SERVER_JAR nogui &
        echo "Server đã được khởi động trong chế độ nền."
        echo "Kiểm tra log bằng: tail -f nohup.out"
        ;;
    stop)
        echo "Đang tìm và dừng server..."
        PIDS=$(ps aux | grep java | grep $SERVER_JAR | awk '{print $2}')
        if [ -z "$PIDS" ]; then
            echo "Không tìm thấy tiến trình server nào đang chạy."
        else
            kill $PIDS
            echo "Server đã được dừng lại."
        fi
        ;;
    restart)
        $0 stop
        sleep 5
        $0 start
        ;;
    *)
        echo "Cách sử dụng: ./start.sh [start|stop|restart]"
        exit 1
        ;;
esac