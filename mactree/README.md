Mac系统下安装tree命令教程:

这里讲的是tree v1.7.0 (c) 1996 - 2014 by Steve Baker, Thomas Moore, Francesc Rocher, Florian Sesser, Kyosuke Tokoro这个版本的安装.

本来可以直接使用一句brew install tree就可以轻松搞定,但是,我多次使用此命令安装都报错下载失败.无奈才有此方法.

•可以在这里这个网址下下载想要的文件:http://mama.indstate.edu/users/ice/tree/(可能需要翻墙,如无法实现可联系我,我有文件备份)

• 命令行下,进入文件所在的目录,使用tar xzvf tree-1.7.0.tgz解压文件;

•进入解压后的文件cd tree-1.7.0/ ,列出所有子文件ls -al;

•vi Makefile,编辑Makefile文件,注释掉默认的linux的部分,还原OSX的部分,具体的文件修改内容如下,对应修改即可:


# Linux defaults:

#CFLAGS=-ggdb -Wall -DLINUX -D_LARGEFILE64_SOURCE -D_FILE_OFFSET_BITS=64

#CFLAGS=-O2 -Wall -fomit-frame-pointer -DLINUX -D_LARGEFILE64_SOURCE -D_FILE_OFFSET_BITS=64

#LDFLAGS=-s


# Uncomment for OS X:

CC=cc

CFLAGS=-O2 -Wall -fomit-frame-pointer -no-cpp-precomp
LDFLAGS=XOBJS=strverscmp.o


•编辑完成退出后,使用make命令编译;

•现在需要将tree的二进制文件复制到系统的可执行目录下;(先给文件改个名字,我这里去掉了版本号,文件夹tree)如下

sudo mkdir -p /usr/local/bin

sudo cp tree /usr/local/bin/tree

•ok!现在可以试下tree命令是不是已经可用了.噢耶!!!

•输入tree --help可以查看tree命令的详细帮助信息.

