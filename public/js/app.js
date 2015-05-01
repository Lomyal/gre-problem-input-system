var app = angular.module('GREApp', []);



// 全局控制器
app.controller('AppController', ['$scope', '$http', function($scope, $http) {

    // 大题目模板
    var problemTemplate = {
        "exerciseId":"",
        "exerciseDiff":"",
        "sectionId":"",
        "problemId":"",
        "problemDiff":"",
        "type":"",
        "instruction":"",
        "description":"",
        "problemItems":[
            {
                "problemItemId":"",
                "descriptionDetail":"",
                "typeNumber":"",
                "choices":[
                    {
                        "choiceId":"",
                        "content":"",
                        "isRightAnswer":"",
                        "loc":"",
                        "context1":"",
                        "context2":""
                    }
                ],
                "figures": [
                    {
                        "figureName":"",
                        "figurePath":"",
                        "figureDescription":""
                    }
                ],
                "comment": {
                    "commentDetail":"",
                    "videoName":"",
                    "videoPath":""
                }
            }
        ]
    };

    // 小题目模板
    var problemItemTemplate = {
        "problemItemId":"",
        "descriptionDetail":"",
        "typeNumber":"",
        "choices":[
            {
                "choiceId":"",
                "content":"",
                "isRightAnswer":"",
                "loc":"",
                "context1":"",
                "context2":""
            }
        ],
        "figures": [
            {
                "figureName":"",
                "figurePath":"",
                "figureDescription":""
            }
        ],
        "comment": {
            "commentDetail":"",
            "videoName":"",
            "videoPath":""
        }
    };

    // 选项模板
    var choiceTemplate = {
        "choiceId":"",
        "content":"",
        "isRightAnswer":"",
        "loc":"",
        "context1":"",
        "context2":""
    };

    // 图形模板
    var figureTemplate = {
        "figureName":"",
        "figurePath":"",
        "figureDescription":""
    };

    // “实例化”模板
    function newTemplateInstance(template) {
        return JSON.parse(JSON.stringify(template));
    }

    // 大题目模型
    $scope.problem = newTemplateInstance(problemTemplate);

    // option 组件选项
    $scope.diffs = ['Easy', 'Medium', 'Hard', 'Adaptive'];
    $scope.problemTypes = [
        {
            code: '1',
            label: 'AW Issue'
        },
        {
            code: '2',
            label: 'AW Argument'
        },
        {
            code: '3',
            label: 'Verbal'
        },
        {
            code: '4',
            label: 'Math'
        }
    ];
    $scope.problemItemTypes = [
        {
            code: '1',
            label: 'itemType2'
        },
        {
            code: '2',
            label: 'itemType3'
        },
        {
            code: '3',
            label: 'itemType4'
        },
        {
            code: '4',
            label: 'itemType5'
        },
        {
            code: '5',
            label: 'itemType6'
        },
        {
            code: '6',
            label: 'itemType7'
        },
        {
            code: '7',
            label: 'itemType8'
        },
        {
            code: '8',
            label: 'itemType9'
        },
        {
            code: '9',
            label: 'itemType10'
        },
        {
            code: '10',
            label: 'itemType11'
        }
    ];
    $scope.booleanValues = ['true', 'false'];



    // 增加小题目
    $scope.addProblemItem = function() {
        var problemItem = newTemplateInstance(problemItemTemplate);
        $scope.problem.problemItems.push(problemItem);
        buttonsBlur();
    };

    // 减少小题目
    $scope.removeProblemItem = function() {
        var arr = $scope.problem.problemItems;
        if (arr.length > 1) {
            arr.pop();
        }
        buttonsBlur();
    };

    // 增加选项
    $scope.addChoiceFor = function(choices) {
        var choice = newTemplateInstance(choiceTemplate);
        choices.push(choice);
        buttonsBlur();
    };

    // 减少选项
    $scope.removeChoiceFor = function(choices) {
        if (choices.length > 1) {
            choices.pop();
        }
        buttonsBlur();
    };

    // 增加图形
    $scope.addFigureFor = function(figures) {
        var figure = newTemplateInstance(figureTemplate);
        figures.push(figure);
        buttonsBlur();
    };

    // 减少图形
    $scope.removeFigureFor = function(figures) {
        if (figures.length > 1) {
            figures.pop();
        }
        buttonsBlur();
    };

    // 提交大题目
    $scope.submit = function() {

        // 不知为何 STRUTS 的后端不能接收 anuglarJS 的 ajax，但用 jQuery 的 ajax 就可以传输了。我这里没有后端环境所以不便调试。
        //$http.post('DealJsonAction.action', JSON.stringify( { myJsonStr: angular.toJson($scope.problem) } ) )
        //    .success(function(data, status, headers, config) {
        //
        //    })
        //    .error(function(data, status, headers, config) {
        //
        //    });

        $.ajax({
            url : "DealJsonAction.action",
            data : JSON.stringify({ myJsonStr: angular.toJson($scope.problem) }),
            dataType : 'json',
            contentType : 'application/json',
            type : 'POST',
            async : true,
            success : function(res) {
                console.log(res.data.length);
            },
            error: function(res) {
                alert('error');
            }
        });

        buttonsBlur();
    };

    // 重置所有输入
    $scope.reset = function() {
        var con = confirm('是否重置所有输入？');

        if (con) {
            $scope.problem = newTemplateInstance(problemTemplate);
        }
        buttonsBlur();
    };

    // 滚动监听
    window.onscroll = function() {
        var items = $scope.problem.problemItems;
        var len = items.length;
        var bodyTop = document.body.scrollTop || document.documentElement.scrollTop;  // FF 不支持前者，Chrome 不支持后者。都支持：window.pageYOffset
        var nav = document.getElementById('navbar');

        for (; len > 0; len--) {
            if (bodyTop >= document.getElementById('problem-item-' + len).offsetTop - 200) {  // 大部分内容进入视野时，就算进入了新 item
                var lists = nav.firstElementChild.children;
                var listsLen = lists.length;

                for (var i = 0; i < listsLen; i++) {
                    if (i === len - 1) {
                        lists[i].classList.add('active');  // IE >= 10 only
                    } else {
                        lists[i].classList.remove('active');  // IE >= 10 only
                    }
                }

                break;
            }
        }
    };

    // 文件选择
    $scope.browseFile = function(inputFileCompoId) {
        var inputFileCompo = document.getElementById(inputFileCompoId);

        // 触发选择文件动作
        inputFileCompo.click();
        buttonsBlur();
    };

    // 文件选择好后的事件处理
    $scope.fileNameChanged = function(self, scope, callback) {  // scope 是响应的控制器内的 $scope
        if (self.files.length > 0) {
            var fileInfo = self.files[0];
            scope.fileName = fileInfo.name;
            scope.fileSize = fileInfo.size;
            scope.fileType = fileInfo.type;
            scope.selectFileSuccess = true;
            scope.uploadSuccess = false;

        } else {  // 应对点击但未选择文件的情况
            scope.fileName = '';
            scope.fileSize = '';
            scope.fileType = '';
            scope.selectFileSuccess = false;
            scope.uploadSuccess = false;
        }

        scope.$apply();
        document.body.focus();

        if (typeof callback === 'function') {
            callback();
        }
    };

    // 文件上传
    $scope.upload = function(inputFileCompoId, callback) {
        var file = document.getElementById(inputFileCompoId).files[0];
        var fd = new FormData();

        fd.append('name-does-not-matter', file);

        $http.post('/', fd, { headers: {'Content-Type': undefined} })
                .success(function(data, status, headers, config) {
                    callback(true, data);
                })
                .error(function(data, status, headers, config) {
                    callback(false, data);
                });
        buttonsBlur();
    };

    // 按钮失焦
    function buttonsBlur() {
        var buttons = document.getElementsByTagName('button');
        for (var i = 0, len = buttons.length; i < len; i++) {
            buttons[i].blur();
        }
    }

}]);




// Problem Item 控制器 (内含 comment、video)
app.controller('ProblemItemController', ['$scope', function($scope) {

    $scope.selectFileSuccess = false;
    $scope.uploadSuccess = false;
    $scope.fileName = '';
    $scope.fileSize = '';
    $scope.fileType = '';
    var id = 'upload-form-video-' + $scope.$index;

    // 选择视频
    $scope.browseVideo = function() {
        $scope.$parent.browseFile(id);
    };

    // 视频选择好后的事件处理
    $scope.videoNameChanged = function(self) {
        $scope.$parent.fileNameChanged(self, $scope);
    };

    // 上传视频
    $scope.uploadVideo = function() {

        $scope.$parent.upload(id, function(succeed, data) {
            if (succeed) {

                // 更新显示
                $scope.uploadSuccess = true;
                $scope.selectFileSuccess = false;

                // 更新模型
                $scope.problemItem.comment.videoName = data.name;
                $scope.problemItem.comment.videoPath = data.path;

            } else {
                alert('上传失败，请重试');
                $scope.uploadSuccess = false;
            }
        });
    };

}]);

// Figure 控制器
app.controller('FigureController', ['$scope', function($scope) {

    $scope.selectFileSuccess = false;
    $scope.uploadSuccess = false;
    $scope.isImage = false;
    $scope.fileName = '';
    $scope.fileSize = '';
    $scope.fileType = '';
    var id = 'upload-form-figure-' + $scope.$parent.$index + '-' + $scope.$index;  // input-file 组件 id
    var cid = 'image-canvas-figure-' + $scope.$parent.$index + '-' + $scope.$index;  // 缩略图 canvas 组件 id
    var imageExtReg = /\.(JPG|JPEG|JFIF|EXIF|TIFF|RIF|GIF|BMP|PNG|WEBP|PPM|PGM|PBM|PNM|BPG)/i;

    // 选择图形
    $scope.browseFigure = function() {
        $scope.$parent.browseFile(id);
    };

    // 图形选择好后的事件处理
    $scope.figureNameChanged = function(self) {
        $scope.$parent.$parent.fileNameChanged(self, $scope, function() {

            // 根据文件后缀名判断是否是常见图片格式
            $scope.isImage = imageExtReg.test($scope.fileName);
            $scope.$apply();

            // 显示缩略图
            if ($scope.isImage) {
                showThumbnail(id, cid);
            }
        });
    };

    // 上传图形
    $scope.uploadFigure = function() {

        $scope.$parent.upload(id, function(succeed, data) {
            if (succeed) {

                // 更新显示
                $scope.uploadSuccess = true;
                $scope.selectFileSuccess = false;

                // 更新模型
                $scope.figure.figureName = data.name;
                $scope.figure.figurePath = data.path;

            } else {
                alert('上传失败，请重试');
                $scope.uploadSuccess = false;
            }
        });
    };

    // 显示图像缩略图
    function showThumbnail(imageLoaderId, imageCanvasId) {
        var imageLoader = document.getElementById(imageLoaderId);
        var canvas = document.getElementById(imageCanvasId);
        var ctx = canvas.getContext('2d');
        var reader = new FileReader();

        reader.onload = function(event) {
            var img = new Image();
            img.onload = function() {
                var magicWidth = 674;  // 容器的宽度
                var scale = magicWidth / img.width;  // 变换系数
                canvas.width = magicWidth;  // 原则：等宽，不限高
                canvas.height = img.height * scale;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(imageLoader.files[0]);
    }

}]);

// Choice 控制器
app.controller('ChoiceController', ['$scope', function($scope) {

    var index = $scope.$index + 1 + '';
    $scope.choice.choiceId = index;
    $scope.choice.loc = index;

}]);