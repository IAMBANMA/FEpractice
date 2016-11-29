fis3学习笔记:
例子引入:假设现在有一个前端的小项目,在终端使用进入项目根目录,执行命令,进行构建.
***项目根目录:FIS3配置文件(默认fis-conf.js)所在的目录就是项目根目录***
构建发布命令: fis3 release.详细细节如下:
****Usage: fis3 release [media name]
//
// Options:
//
//   -h, --help                print this help message
//   -d, --dest <path>         release output destination
//   -l, --lint                with lint
//   -w, --watch               monitor the changes of project
//   -L, --live                automatically reload your browser
//   -c, --clean               clean compile cache
//   -u, --unique              use unique compile caching
//   -r, --root <path>         specify project root
//   -f, --file <filename>     specify the file path of `fis-conf.js`
//   --no-color                disable colored output
//   --verbose                 enable verbose mode
****
使用示例:fis3 release :直接发布到本地服务器目录www下.
fis3 release -d <path>  :构建发布到指定的path下.
其他选项待续....

现在对比查看构建结构和源码的区别,会发现,构建过程中对资源uri替换成了url(通俗点讲,就是相对路径换成了绝对路径)
资源定位是FIS3的很重要的特性!!!
资源定位能力可以有效地分离开发路径与部署路径之间的的关系,工程师不再关心资源部部署到线上之后去了哪里,变成了什么名字,这些都可以通过配置来指定.工程师只需要使用相对路径来定位自己的开发资源即可!

配置文件:
默认配置文件是fis-conf.js,FIS3编译的整个流程都是通过配置来控制的,FIS3使用了一种类似CSS的配置方式.
设置规则的配置接口:fis.match(selector,props);
selector:FIS3把匹配文件路径作为selector,匹配到的文件会分配props设置的属性;selector语法,遵循Glob.
****Glob说明:
//   FIS3中支持glob规则,FIS3使用node-glob提供的glob支持.
//常用用法说明:
//• *匹配0或多个除了/以外的字符
//• ?匹配单个除了/以外的字符
//• **匹配多个字符包括/
//• {}可以让多个规则用,逗号分隔起到或者的作用
//• !出现在规则的开头,表示取反.即匹配不命中后面规则的文件.
//注意!!!fis中的文件路径都是以/开头的,所以编写规则时,请尽量严格以/开头.比如a.js如果没有以/开头,它匹配所有目录下的a.js文件.以/开头的话,就匹配根目录下的/a.js
•••扩展规则:
1.假设匹配a目录下以及其子目录下的所有js文件,使用node-glob需要这样写: a/{*.js,**/*.js};
这样写比较麻烦,所以扩展了这块语法,这样写: a/**.js;
2.node-glob中没有捕获分组,而fis中经常用到分组信息,如下这种正则用法:
   //让a目录下面的js发布到b目录下面,波流原始文件名.
   fis.match(/^\/a\/(.*\.js$)/i,{
      release:"/b/$1"
    });
所以这里做了对括号用法的扩展,如下用法和正则用法等价
   //让a目录下的js发布到b目录下面,保留原始的文件名
   fis.match('/a/(**.js)' ,{
     release:'/b/$1'
    });
props:编译规则属性;包括文件属性和插件属性.

捕获分组:
使用node-glob捕获分组,可以用于其他属性的设定,如release,URL,id等. 使用的方式与正则替换类似,我们可以用$1,$2,$3来代表相应的捕获分组.其中$0代表的是match到的整个字符串.
   fis.match('/a/(**.js)',{
    release:'/b/$1'  //$1代表(**.js)匹配的内容
   });

   fis.match('/a/(**.js)',{
    release:'/b/$0'  //$0代表/a/(**.js)匹配的内容
    });

特殊用法(类CSS伪类)
1. ::package用来匹配fis的打包过程.
2. ::text用来匹配文本文件.
默认识别这类后缀的文件:
[
'css', 'tpl', 'js', 'php',
'txt', 'json', 'xml', 'htm',
'text', 'xhtml', 'html', 'md',
'conf', 'po', 'config', 'tmpl',
'coffee', 'less', 'sass', 'jsp',
'scss', 'manifest', 'bak', 'asp',
'tmp', 'haml', 'jade', 'aspx',
'ashx', 'java', 'py', 'c', 'cpp',
'h', 'cshtml', 'asax', 'master',
'ascx', 'cs', 'ftl', 'vm', 'ejs',
'styl', 'jsx', 'handlebars'
]  
如果你希望命中的文件类型不在列表中,请通过fis.set('project.fileType.text')扩展,多个后缀用","分隔.
  fis.set('project.fileType.text','cpp,hhp');
3. ::image用来匹配文件类型为图片的文件.
默认识别这类后缀的文件.
[
'svg', 'tif', 'tiff', 'wbmp',
'png', 'bmp', 'fax', 'gif',
'ico', 'jfif', 'jpe', 'jpeg',
'jpg', 'woff', 'cur', 'webp',
'swf', 'ttf', 'eot', 'woff2'
]  
如果你希望命中的文件类型不在列表中,请通过fis.set('project.fileType.image')扩展,多个后缀使用","分隔.
  fis.set('project.fileType.image','raw,bpg');
4.  *.html:js 用来匹配命中html文件中的内嵌的js部分.
fis3 htmlLike的文件内嵌的js内容也会走单文件编译流程,默认只做标准处理,如果想压缩,可以进行如下配置:
  fis.match('*.html:js',{
   optimizer:fis.plugin('uglify-js')
   });
5.  *.html:css用来匹配命中html文件中内嵌的css部分.
fis3 htmlLike的文件内嵌的css内容也会走单文件编译流程,默认只做标准化处理,如果想压缩,可以进行如下配置:
  fis.match('*.html:css',{
   optimizer:fis.plugin('clean-css')
    });
6.  *.html:inline-style用来匹配命中的html文件中的内联样式.
7.  *.html:scss用来命中html文件中的scss部分.

重要特性:
•规则覆盖:假设有两条规则A和B,它俩同时命中了文件test.js,如果A在B前面,B的属性会覆盖A的同名属性.不同名属性追加到test.js的file对象上.
   //A
    fis.match('*',{
   release:'/dist/$0'
   });
  //B
    fis.match('test.js',{
     useHash:true,
     release:'/dist/js/$0'
   });
那么最终分配到test.js的属性是:
 {
 useHash:true,  //B
  release:'/dist/js/$0'   //B
}
•fis.media()
fis.media()接口提供多种状态的功能,比如有些配置是仅仅供开发环境下使用的,有些是供生产环境使用的.
 fis.match('*',{   //默认media是Dev
 useHash:false
});       

fis.media('prod').match('*.js',{
 optimizer:fis.plugin('uglify-js')
});

然后构建发布时:fis3 release <media> 
fis3 release prod 
编译时使用prod指定的编译配置,对js进行压缩.
如上,fis.media()可以使配置文件变为多份(多个状态,一个状态一个配置)
eg: fis.media('rd').match('*',{
 deploy:fis.plugin('http-push',{
   receiver:'http://remote-rd-host/receiver.php'
 })
});
fis.media('qa').match('*',{
 deploy:fis.plugin('http-push',{
  receiver:'http://remote-qa-host/receiver.php'
 })
});

fis3 release rd //push到RD的远端机器上
fis3 release qa //push到QA的远端机器上

更多配置接口
我们执行fis3 inspect来查看文件命中属性的情况.fis3 inspect是一个非常重要的命令,可以查看文件分配到的属性,这些属性决定了文件将被如何编译处理.
fis3 inspect <media>查看特定media的分配情况

文件指纹
文件指纹,唯一标识一个文件.在开启强缓存的情况下,如果文件的url不发生变化,无法刷新浏览器的缓存.一般都需要通过一些手段来强刷缓存,一种方式是添加时间戳,每次上线更新,给这个资源文件的url添加上时间戳.
eg: <img src='a.png?t=12012121'>
而fis3选择的是添加MD5戳,直接修改文件的url,而不是在其后添加query.对js,css,png图片引用url添加md5戳,配置如下:
eg:   fis.match('*.{js,css,png}',{useHash:true});
构建结果是:构建出的文件携带了md5戳,对应的url也带上了md5戳.

压缩资源
为了减少资源网络传输的大小,通过压缩器对js,css,图片进行压缩是一直以来前端工程优化的选择.在FIS3中这个过程非常简单,通过为文件配置压缩器即可.
eg:  //情书其他配置,只保留如下配置
     fis.match('*.js',{
      optimizer:fis.plugin('uglify-js')  //fis-optimizer-uglify-js插件进行压缩,已内置
    });
    fis.match('*.css',{
    optimizer:fis.plugin('clean-css')  //fis-optimizer-clean-css 插件进行压缩,已内置
   });
   fis.match('*.png',{
    optimizer:fis.plugin('png-compressor')   //fis-optimizer-png-compressor插件进行压缩,已内置
   });
构建结果是:查看文件已经被压缩.

CssSprite图片合并
压缩了静态资源,我们还可以对图片进行合并来减少请求数量.
FIS3提供了比较简易,使用方便的图片合并工具.通过配置即可调用此工具对资源进行合并.FIS3构建会对CSS中,路径带?__sprite的图片进行合并.分配到useSprite:true的css文件才会被处理.
eg:  li.list-1::before{
      background-image:url('./img/list-1.png?__sprite');
  }
    li.list-2::before{
     background-image:url('./img/list-2.png?__sprite');
  }
fis3配置:
  fis.match('::package',{    //启用fis-spriter-csssprites插件
  spriter:fis.plugin('csssprites')
  });
  fis.match('*.css',{     //对css进行图片合并
  useSprite:true   //给匹配到的文件分配属性'useSprite'
  });

功能合并:
我们学习了如何用FIS3做压缩,文件指纹,图片合并,资源定位,现在把他们组合起来,配置如下:
eg:  //加md5
fis.match('*.{js,css,png}',{
useHash:true
});
//启用fis-spriter-csssprites插件
fis.match('::package',{
spriter:fis.plugin('csssprites')
});
//对css进行图片合并
fis.match('*.css',{}
useSprite:true   //给匹配的文件分配属性useSprite
);
//fis-optimizer-uglify-js插件进行压缩,内置
fis.match('*.js',{
optimizer:fis.plugin('uglify-js')
});
//fis-optimizer-clean-css插件进行压缩,内置
fis.mathc('*.css',{}
optimizer:fis.plugin('clean-css')
);
//fis-optimizer-png-compressor插件进行压缩,内置
fis.match('*.png',{
optimizer:fis.plugin('png-compressor')
});
如上构建结果是:fis3 release 时添加md5,静态资源压缩,css文件应用图片进行合并.
可能有时候开发的时候不需要压缩,合并图片,也不需要hash.那么给上面配置追加如下配置:
fis.media('debug').match('*.{js,css,png}',{
useHash:false,
useSprite:false,
optimizer:null
})
以上配置在fis3 release debug构建时,启用media debug的配置,覆盖上面的配置,把诸多功能关掉.

内置语法:
1.嵌入资源:嵌入资源即内容嵌入,可以为工程师提供诸如图片base64嵌入到css,js里,前端模板编译到js文件中,将js,css,html拆分成几个文件最后合并到一起的能力.有了这项能力,可以有效地减少http请求数量,提升工程的可维护性.  !!!!注意 fis不建议用户使用内容嵌入能力作为组件化拆分的手段,因为声明依赖能力会更适合组件化开发.
html中嵌入资源:可以在资源定位的基础上,给资源加?__inline参数来标记资源嵌入需求.
eg:html中嵌入图片base64
•源码
<img title='百度logo' src='images/logo.gif?__inline'/>
•编译后
  <img title="百度logo" src="data:image/gif;base64,R0lGODlhDgGBALMAAGBn6eYxLvvy9PnKyfO...Jzna6853wjKc850nPeoYgAgA7"/>
html中嵌入样式文件
•源码
<link rel='stylesheet' type='text/css' href='demo.css?__inline'>
•编译后
<style>img{border:5px solid #ccc;}</style>
html中嵌入脚本资源
•源码
<script type='text/javascript' src='demo.js?__inline'></script>
•编译后
<script type='text/javascript'>cosole.log('inline file');</script>
html中嵌入页面文件
•源码(推荐使用)
<link rel='import' href='demo.html?__inline'>
•编译后
<h1>demo.html content</h1>

在js中嵌入资源
在js中,使用编译函数__inline()来提供内容嵌入的能力.可以利用这个函数嵌入图片的base64编码,嵌入其他js或者前端模板文件的编译内容,这些处理对html中script标签里的内容同样有效.
在js中嵌入js文件
•源码
__inline('demo.js');
•编译后
console.log('demo.js content');
在js中嵌入图片base64
•源码
var img=__inline('images/logo.gif');
•编译后
var img='data:image/gif;base64,R0lGODlhDgGBALMAAGBn6eYxLvvy9PnKyfO...Jzna6853wjKc850nPeoYgAgA7';


在css中嵌入资源
与html类似,凡是命中了资源定位能力的编译标记,除了src='xxx'之外,都可以通过添加?__inline编译标记把文件内容嵌入进来.src='xxx'被用在ie支持的filter内,该属性不支持base64字符串,因此未作处理.
css中嵌入css文件
•源码
@import url('demo.css?__inline');
•编译后
img{border:5px solid #ccc};
css中嵌入图片的base64
•源码
.style{
background:url(images/logo.gif?__inline);
•编译后
.style{
background:url(data:image/gif;base64,R0lGODlhDgGBALMAAGBn6eYxLvvy9PnKyfO...Jzna6853wjKc850nPeoYgAgA7);
  }


配置属性
全局属性:全局属性通过fis.set设置,通过fis.get获取
内置的默认配置:
var DEFAULT_SETTINGS={
project:{
charset:'utf8',  //指定项目编译后产出文件的编码,用法:在项目的fis-conf.js里可以覆盖为 fis.set('project.charset','gbk');
md5Length:7,    //文件MD5戳长度,用法:在项目非fis-conf.js里可以修改为   fis.set('project.md5Length',8);
md5Connector:'_',//设置MD5与文件的连字符,用法:在项目的fis-conf.js里可以修改为 fis.set('project.md5Connector','.');
files:['**'],    //设置项目源码文件过滤器,用法:fis.set('project.files',['*.html']);
ignore:['node_modules/**','output/**','.git/**','fis-conf.js']  //排除某些文件,用法:fis.set('project.ignore',['*.bak']);
},
component:{
skipRoadmapCheck:true,
protocol:'github',
author:'fis-components'
},
modules:{
hook:'components',
packager:'map'
},
options:{}
};

•project.fileType.text:追加文本文件后缀列表.用法:编辑项目的fis-conf.js配置文件 fis.set('project.fileType.text','tpl,js,css');

•project.fileType.image:追加图片类二进制文件后缀列表.用法:编辑项目fis-conf.js配置文件 fis.set('project.fileType.image','swf,cur,ico');


文件属性:
fis3以文件属性控制文件的编译合并以及各种操作;文件属性包括基本属性和插件属性,插件属性是为了方便在不同的插件扩展点设置插件
•基本属性
release          //设置文件的产出路径.默认是文件相对项目根目录的路径,以/开头.还可以设置为false,表示为不产出文件
packTp 		//分配到这个属性的文件将会合并到这个属性配置的文件中.
packOrder	//用来控制合并时的顺序,值越小越在前面.配合packTo一起使用 fis.match('/*.js',{packTo:'pkg/script.js'});fis.match('/mod.js',{packOrder:-100});
query  		//指定文件的资源定位路径之后的query,比如'?t=12012121'.  fis.set('new date',Date.now());fis.match('*.js',{query:'?t='+fis.get('new date')});
id		//指定文件资源的id,默认是namespace+subpath.
eg:假设/static/lib/jquery.js设定了特定的id jquery,那么在使用这个组件的时候,可以直接使用这个id
fis.match('/static/lib/jquery.js',{
id:'jquery',
isMod:true
})
使用
var $=require('jquery');


moduleid  //指定文件资源的模块id.在插件fis3-hook-module里面自动包裹define的时候会用到,默认是id的值.
fis.match('/static/lib/a.js',{
id:'a',
moduleId:'a',
isMod:true
})
•编译前
exports.a=10
•编译后
define('a',function(require,exports,module){
exports.a=10
})


url      //指定文件的资源定位路径,以/开头.默认是release的值,url可以与发布路径release不一致.
charset   //指定文本文件的输出编码.默认是utf8.
isHtmlLike   //指定对文件进行html相关语言能力处理
isCssLike    //指定对文件进行css相关的语言能力的处理
isJsLike    //指定对文件进行js相关的语言能力处理
useHash    //文件是否携带md5戳 ,文件分配到此属性后,其url及其产出带md5戳
domain    //给文件url设置domain信息.说明:如果需要给某些资源添加cdn,分配到此属性的资源url会被添加domain
fis.media('prod').match('*.js',{
domain:'http://cdn.baidu.com/'
});   //fis3 release prod时添加cdn.

rExt		//设置最终文件产出后的后缀fis.match('*.less',{rExt:'.css'});   //源码为.less文件产出后修改为.css文件
useMap   //文件信息是否添加到map.json  说明:分配到从属性的资源出现在静态资源表中,现在对js,css等文件默认加入了静态资源表中.
isMod    //标示文件是否为组件化文件   说明:被标记成组件化的文件会入map.json表.并且会对js文件进行组件化包装.
extras   //在静态资源映射表中的附加信息,用于扩展静态资源映射表的功能 .fis.match('',{extras:{isPage:true}})
requires    //默认依赖的资源id表 fis.match('',{requires:['static/lib/jquery.js']})
useSameNameRequire   //开启同名依赖  说明:当设置开启同名依赖,模板会依赖同名css,js;js会依赖同名css,不需要显示引用.
useCache   //文件是否使用编译缓存  说明:当设置使用编译缓存,每个文件的编译结果均会在磁盘中保存下来供下次编译使用.设置false后,文件每次都会被编译.
fis.match('**.html',{useCache:false})

插件属性:
插件属性决定了匹配的文件进行哪些插件的处理
lint //启用lint插件进行代码检查  fis.match('*.js',{lint:fis.plugin('js',{})})
parser //启用parser插件对文件进行处理.eg:fis.match('*.less',{parser:fis.plugin('less'),rExt:'.css'});
preprocessor  //标准化前处理
standard   //自定义标准化,可以自定义uri,embed,require等三种能力,可以自定义三种语言能力的语法
postprocessor//标准化后处理
optimizer//启用优化处理插件,并配置其属性

打包阶段插件
打包阶段插件设置时必须分配给所有文件,设置时必须match ::package,不然不做处理.fis.match('::package',{packager:fis.plugin('map'),spriter:fis.plugin('csssprites')});
prepackager//打包预处理插件 用法:fis.match('::package',{prepackager:fis.plugin('plugin-name')});
packager //打包插件  用法:fis.match('::package',{packager:fis.plugin('map')});
spriter //打包后处理csssprite的插件  用法:fis.match('::package',{spriter:fis.plugin('csssprites')});
postpackager//打包后处理插件   用法:fis.match('::package',{postpackager:fis.plugin('plugin-name')})


deploy
deploy//设置项目的发布方式,编译打包后,新增发布阶段,这个阶段主要决定了资源的发布方式,而这些方式都是以插件的方式提供的.
用法:fis.match('**',{
deploy:fis.plugin('http-push',{
receiver:'http://target-host/receiver.php', //接收端
to:'/home/work/www'   //将部署到服务器的这个目录下
})
})


其他常用插件:
local-deliver
http-push
replace
encoding

