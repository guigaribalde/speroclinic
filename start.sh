#!/bin/zsh
eval `ssh-agent -s`
ssh-add
ssh-agent -s
ssh-add ~/.ssh/gitssh
exec zsh