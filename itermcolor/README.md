怎样改变iterm的配色呢?
命令行下进入~目录下,cd ~;
可以通过ls -a命令查看是否有.bash_profile文件,需要对此文件进行修改.
vi .bash_profile对文件进行编辑:
  export CLICOLOR='Yes'  #是否输出颜色
         CLICOLOR=1
  export LSCOLORS=gxfxcxdxegedabagacad   #sets up the color scheme for list export
  export PS1='[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;36m\]\w\[\033[00m\]\$'  #sets up the prompt color
  export TERM=xterm-color   #enable color for iterm
编辑完成,退出.
重启iterm2即可
其实配色是可以自行定义的,通过更改以上设置.
~
~
~
