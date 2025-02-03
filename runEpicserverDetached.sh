#!/bin/bash

if ! ps aux | grep -v grep | grep -q "SCREEN -dmS epicserver ./run.sh"
then
  cd /home/pseudo/minecraft/Epicserver  
  screen -dmS epicserver ./run.sh
fi
