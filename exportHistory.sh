#!/bin/bash
if ps aux | grep -v grep | grep -q "SCREEN -dmS epicserver ./run.sh"
then
  screen -S epicserver -X hardcopy /usr/local/bin/minitor/recent
else
  echo "Server is not running." > /usr/local/bin/minitor/recent
fi
sed -i '1s/^/<pre>\n/' /usr/local/bin/minitor/recent
  echo "</pre>" >> /usr/local/bin/minitor/recent
  cat /usr/local/bin/minitor/recent