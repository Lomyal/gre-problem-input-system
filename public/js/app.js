var app = angular.module('GREApp', []);



// 全局控制器
app.controller('AppController', ['$scope', '$http', function($scope, $http) {

    // 大题目模型
    $scope.problem = {
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

    // option 组件选项
    $scope.diffs = ['Easy', 'Medium', 'Hard', 'Adaptive'];
    $scope.problemTypes = [
        {
            code: 0,
            label: 'AW Issue'
        },
        {
            code: 1,
            label: 'AW Argument'
        },
        {
            code: 2,
            label: 'Verbal'
        },
        {
            code: 3,
            label: 'Math'
        }
    ];
    $scope.problemItemTypes = [
        {
            code: 0,
            label: 'itemType1'
        },
        {
            code: 1,
            label: 'itemType2'
        },
        {
            code: 2,
            label: 'itemType3'
        },
        {
            code: 3,
            label: 'itemType4'
        },
        {
            code: 4,
            label: 'itemType5'
        },
        {
            code: 5,
            label: 'itemType6'
        },
        {
            code: 6,
            label: 'itemType7'
        },
        {
            code: 7,
            label: 'itemType8'
        },
        {
            code: 8,
            label: 'itemType9'
        },
        {
            code: 9,
            label: 'itemType10'
        }
    ];
    $scope.booleanValues = ['true', 'false'];

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

    // 增加小题目
    $scope.addProblemItem = function() {
        var problemItem = newTemplateInstance(problemItemTemplate);
        $scope.problem.problemItems.push(problemItem);
    };

    // 减少小题目
    $scope.removeProblemItem = function() {
        var arr = $scope.problem.problemItems;
        if (arr.length > 1) {
            arr.pop();
        }
    };

    // 增加选项
    $scope.addChoiceFor = function(choices) {
        var choice = newTemplateInstance(choiceTemplate);
        choices.push(choice);
    };

    // 减少选项
    $scope.removeChoiceFor = function(choices) {
        if (choices.length > 1) {
            choices.pop();
        }
    };

    // 增加图形
    $scope.addFigureFor = function(figures) {
        var figure = newTemplateInstance(figureTemplate);
        figures.push(figure);
    };

    // 减少图形
    $scope.removeFigureFor = function(figures) {
        if (figures.length > 1) {
            figures.pop();
        }
    };

    // 提交大题目
    $scope.submit = function() {
        $http.post('DealJsonAction', JSON.stringify( { myJsonStr: angular.toJson($scope.problem) } ) )
            .success(function(data, status, headers, config) {

            })
            .error(function(data, status, headers, config) {

            });
    };

    // 重置所有输入
    $scope.reset = function() {
        var con = confirm('是否重置所有输入？');

        if (con) {
            $scope.problem = {
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
        }
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
    };

}]);




// Problem Item 控制器
app.controller('ProblemItemController', ['$scope', function($scope) {

    $scope.uploadSuccess = false;

    // 上传视频
    $scope.uploadVideo = function() {
        var formId = 'upload-form-video-' + $scope.$index;

        $scope.$parent.upload(formId, function(succeed, data) {
            if (succeed) {

                // 更新显示
                $scope.uploadSuccess = true;

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

    $scope.uploadSuccess = false;

    // 上传图形
    $scope.uploadFigure = function() {
        var formId = 'upload-form-figure-' + $scope.$parent.$index + '-' + $scope.$index;

        $scope.$parent.upload(formId, function(succeed, data) {
            if (succeed) {

                // 更新显示
                $scope.uploadSuccess = true;

                // 更新模型
                $scope.figure.figureName = data.name;
                $scope.figure.figurePath = data.path;

            } else {
                alert('上传失败，请重试');
                $scope.uploadSuccess = false;
            }
        });
    };

}]);

// Choice 控制器
app.controller('ChoiceController', ['$scope', function($scope) {

    var index = $scope.$index + 1;
    $scope.choice.choiceId = index;
    $scope.choice.loc = index;

}]);